#!/usr/bin/env node
/* =========================================================
   FİYAT BİL — GÜNLÜK FİYAT GÜNCELLEME
   urunler.js'deki her ürünün "kaynak" sayfasını açar, sayfadaki
   fiyatı okur ve sonucu fiyatlar.json dosyasına yazar.
   Oyun açılırken fiyatlar.json'u okur.

   Çalıştırma:  node scripts/fiyat-guncelle.mjs
   (GitHub'da her sabah 06:00'da otomatik çalışır — bkz. .github/workflows)

   Kurallar:
   - otomatik:false olan ürünler (haber/broşür kaynakları) atlanır,
     urunler.js'deki fiyat geçerli kalır.
   - Sayfadan fiyat okunamazsa son bilinen fiyat korunur, durum "eski" olur.
   - Okunan fiyat bariz yanlışsa (kayıtlı fiyatın 0,4 katından az ya da
     2,5 katından fazla, veya dünkü fiyatın yarısından az / iki katından
     fazla) kabul edilmez.
   ========================================================= */
import fs from "node:fs/promises";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const KOK = process.env.FIYATBIL_KOK || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CIKTI = path.join(KOK, "fiyatlar.json");
const ESZAMANLI = 4;          // aynı anda açılan sayfa sayısı
const ZAMAN_ASIMI = 25000;    // ms
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

/* ---------- ürünleri yükle ---------- */
export async function urunleriYukle(kok = KOK) {
  const ctx = { window: {}, globalThis: {} };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(await fs.readFile(path.join(kok, "urun-id.js"), "utf8"), ctx);
  vm.runInContext(await fs.readFile(path.join(kok, "urunler.js"), "utf8"), ctx);
  const urunId = ctx.window.urunId || ctx.urunId;
  const liste = (ctx.window.URUNLER_KAYNAKLI || []).map(u => ({ ...u, id: urunId(u) }));
  const gorulen = new Map();
  for (const u of liste) {
    if (gorulen.has(u.id)) console.warn(`⚠️  Aynı kimlikte iki ürün var: "${u.baslik}" — birine id: verin.`);
    gorulen.set(u.id, u);
  }
  return liste;
}

/* ---------- fiyat metnini sayıya çevir ---------- */
export function fiyatCoz(v) {
  if (typeof v === "number") return isFinite(v) && v > 0 ? v : null;
  if (typeof v !== "string") return null;
  let s = v.replace(/[^\d.,]/g, "");
  if (!s || !/\d/.test(s)) return null;
  const sonNokta = s.lastIndexOf("."), sonVirgul = s.lastIndexOf(",");
  if (sonNokta >= 0 && sonVirgul >= 0) {
    // ikisi de var: en sondaki ondalık ayracıdır
    const ond = sonNokta > sonVirgul ? "." : ",";
    const bin = ond === "." ? "," : ".";
    s = s.split(bin).join("").replace(ond, ".");
  } else if (sonVirgul >= 0) {
    // sadece virgül: sonunda 1-2 hane varsa ondalık, yoksa binlik
    s = /,\d{1,2}$/.test(s) && (s.match(/,/g) || []).length === 1 ? s.replace(",", ".") : s.replace(/,/g, "");
  } else if (sonNokta >= 0) {
    // sadece nokta: 3'erli gruplar ise binlik (1.499.900), değilse ondalık (1499.90)
    s = /^\d{1,3}(\.\d{3})+$/.test(s) ? s.replace(/\./g, "") : s;
    if ((s.match(/\./g) || []).length > 1) return null;
  }
  const n = parseFloat(s);
  return isFinite(n) && n > 0 ? n : null;
}

/* ---------- sayfadan fiyat adaylarını çıkar ---------- */
const decode = s => s.replace(/&quot;/g, '"').replace(/&#34;/g, '"').replace(/&amp;/g, "&").replace(/&#39;/g, "'");

function jsonLdAdaylari(html) {
  const out = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    let data;
    try { data = JSON.parse(m[1].trim()); } catch { try { data = JSON.parse(decode(m[1].trim())); } catch { continue; } }
    const tipler = t => [].concat(t || []).map(String);
    const gez = (node, derinlik, anaUrun) => {
      if (!node || typeof node !== "object" || derinlik > 8) return;
      if (Array.isArray(node)) { node.forEach(n => gez(n, derinlik + 1, anaUrun)); return; }
      const tip = tipler(node["@type"]);
      const teklifMi = tip.some(t => /Offer/i.test(t));
      if (teklifMi) {
        for (const k of ["price", "lowPrice"]) {
          const p = fiyatCoz(node[k] ?? node.priceSpecification?.price);
          if (p) { out.push({ fiyat: p, para: node.priceCurrency || node.priceSpecification?.priceCurrency || "", yontem: "json-ld", ana: anaUrun }); break; }
        }
      }
      // ilan siteleri bazen fiyatı doğrudan ürüne yazar
      if (!teklifMi && node.price != null && !node.offers) {
        const p = fiyatCoz(node.price);
        if (p) out.push({ fiyat: p, para: node.priceCurrency || "", yontem: "json-ld", ana: anaUrun });
      }
      const urunMu = tip.some(t => /Product|Car|Vehicle|Residence|Apartment|House|RealEstate|Offer|Accommodation|SingleFamily/i.test(t));
      for (const [k, v] of Object.entries(node)) {
        if (k === "@context") continue;
        // ilişkili ürünler (isRelatedTo, isSimilarTo, itemListElement…) ana ürün sayılmaz
        const ana = anaUrun && !/related|similar|ListElement|accessor/i.test(k);
        gez(v, derinlik + 1, ana && (urunMu || derinlik < 2));
      }
    };
    gez(data, 0, true);
  }
  return out;
}

function metaAdaylari(html) {
  const out = [];
  const anahtarlar = "product:price:amount|og:price:amount|price|twitter:data1";
  const re1 = new RegExp(`<meta[^>]+(?:property|name|itemprop)=["'](?:${anahtarlar})["'][^>]*content=["']([^"']+)["']`, "gi");
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name|itemprop)=["'](?:${anahtarlar})["']`, "gi");
  for (const re of [re1, re2]) { let m; while ((m = re.exec(html))) { const p = fiyatCoz(m[1]); if (p) out.push({ fiyat: p, yontem: "meta" }); } }
  // <span itemprop="price" content="123.45">
  const re3 = /itemprop=["']price["'][^>]*?(?:content=["']([^"']+)["'])?[^>]*>([^<]*)/gi;
  let m; while ((m = re3.exec(html))) { const p = fiyatCoz(m[1] || m[2]); if (p) out.push({ fiyat: p, yontem: "microdata" }); }
  return out;
}

/* Sayfaya gömülü JSON'daki "price": 1234 alanları — son çare, en çok güvenilmeyen yöntem */
function gomuluAdaylar(html) {
  const out = [];
  const re = /"(?:price|salePrice|sellingPrice|discountedPrice|currentPrice|finalPrice|ilanFiyati|fiyat)"\s*:\s*"?(\d[\d.,]*)"?/gi;
  let m; while ((m = re.exec(html)) && out.length < 400) { const p = fiyatCoz(m[1]); if (p) out.push({ fiyat: p, yontem: "gomulu" }); }
  return out;
}

/* Sitelere özel ipuçları: sayfa yapısı bilinen siteler için kesin seçiciler.
   Bir site değişirse buraya yeni bir düzenli ifade eklemek yeterli. */
const SITE_IPUCLARI = [
  { alan: /arabam\.com$/, re: [/"price"\s*:\s*"?(\d[\d.,]*)/i, /class="[^"]*product-price[^"]*"[^>]*>\s*([\d.,]+)\s*TL/i] },
  { alan: /emlakjet\.com$/, re: [/"price"\s*:\s*\{?\s*"?(?:value"?\s*:\s*)?"?(\d[\d.,]*)/i] },
  { alan: /akakce\.com$/, re: [/<span class="pt_v8">([\d.,]+)/i, /class="pt_v8"[^>]*>([\d.,]+)/i] },
  { alan: /cimri\.com$/, re: [/"lowPrice"\s*:\s*"?(\d[\d.,]*)/i, /content="[^"]*?([\d.]+,\d{2}) TL'den başlayan/i] },
  { alan: /akakce\.com$/, re: [/En [Uu]cuz\s*([\d.]+,\d{2})\s*TL/] },
];
function siteAdaylari(html, host) {
  const out = [];
  for (const ip of SITE_IPUCLARI) if (ip.alan.test(host))
    for (const re of ip.re) { const m = html.match(re); const p = m && fiyatCoz(m[1]); if (p) out.push({ fiyat: p, yontem: "site" }); }
  return out;
}

/* Adaylardan en güvenilir ve makul olanı seç */
export function fiyatSec(html, host, referans, onceki) {
  const makul = p => {
    if (referans && (p < referans * 0.4 || p > referans * 2.5)) return false;
    if (onceki && (p < onceki * 0.5 || p > onceki * 2)) return false;
    return true;
  };
  const ld = jsonLdAdaylari(html).filter(a => !a.para || /TRY|TL/i.test(a.para));
  const gruplar = [
    ld.filter(a => a.ana),           // sayfanın asıl ürünü
    siteAdaylari(html, host),
    metaAdaylari(html),
    ld.filter(a => !a.ana),
    gomuluAdaylar(html),
  ];
  for (const [i, grup] of gruplar.entries()) {
    const uygun = grup.filter(a => makul(a.fiyat));
    if (!uygun.length) continue;
    // güçlü yöntemlerde ilk makul aday; zayıf yöntemlerde kayıtlı fiyata en yakın aday
    if (i < 3) return uygun[0];
    const hedef = onceki || referans;
    return uygun.sort((a, b) => Math.abs(Math.log(a.fiyat / hedef)) - Math.abs(Math.log(b.fiyat / hedef)))[0];
  }
  const hepsi = gruplar.flat();
  return hepsi.length ? { hata: `sayfada ${hepsi.length} fiyat bulundu ama hiçbiri makul aralıkta değil (ör. ${hepsi[0].fiyat})` } : { hata: "sayfada fiyat bulunamadı" };
}

/* ---------- sayfa indir ---------- */
async function sayfaGetir(url) {
  let sonHata;
  for (let deneme = 0; deneme < 2; deneme++) {
    try {
      const r = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(ZAMAN_ASIMI),
        headers: { "User-Agent": UA, "Accept": "text/html,application/xhtml+xml", "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.5" },
      });
      if (r.status === 404 || r.status === 410) return { kaldirildi: true, durumKodu: r.status };
      if (!r.ok) throw new Error("HTTP " + r.status);
      return { html: await r.text(), sonUrl: r.url };
    } catch (e) { sonHata = e; await new Promise(res => setTimeout(res, 2000)); }
  }
  throw sonHata;
}

/* ---------- ana akış ---------- */
async function main() {
  const urunler = await urunleriYukle();
  let eski = { urunler: {} };
  try { eski = JSON.parse(await fs.readFile(CIKTI, "utf8")); } catch {}
  const simdi = new Date().toISOString();
  const sonuc = {};
  const kuyruk = [...urunler];

  async function isci() {
    while (kuyruk.length) {
      const u = kuyruk.shift();
      const once = eski.urunler?.[u.id];
      // urunler.js'de fiyat elle değiştirildiyse eski otomatik fiyat yerine onu esas al
      const oncekiGecerli = once && once.referans === u.fiyat ? once : null;
      const kayit = {
        fiyat: oncekiGecerli?.fiyat ?? u.fiyat,
        referans: u.fiyat,
        kontrol: oncekiGecerli?.kontrol ?? null,
        durum: "eski",
        yontem: oncekiGecerli?.yontem ?? null,
      };
      if (u.otomatik === false || !u.kaynak) {
        Object.assign(kayit, { fiyat: u.fiyat, durum: "elle", kontrol: null, yontem: null });
      } else {
        try {
          const s = await sayfaGetir(u.kaynak);
          if (s.kaldirildi) { kayit.durum = "kaldirildi"; kayit.hata = `sayfa artık yok (HTTP ${s.durumKodu})`; }
          else {
            const host = new URL(s.sonUrl || u.kaynak).hostname.replace(/^www\./, "");
            const sec = fiyatSec(s.html, host, u.fiyat, oncekiGecerli?.fiyat);
            if (sec.hata) kayit.hata = sec.hata;
            else Object.assign(kayit, { fiyat: Math.round(sec.fiyat), kontrol: simdi, durum: "guncel", yontem: sec.yontem });
          }
        } catch (e) { kayit.hata = String(e.message || e); }
      }
      sonuc[u.id] = kayit;
      const isaret = { guncel: "✅", eski: "⚠️ ", elle: "📝", kaldirildi: "🗑️ " }[kayit.durum];
      console.log(`${isaret} ${u.baslik.padEnd(48).slice(0, 48)} ${String(kayit.fiyat).padStart(10)} ₺  ${kayit.yontem || ""}${kayit.hata ? "  — " + kayit.hata : ""}`);
    }
  }
  await Promise.all(Array.from({ length: ESZAMANLI }, isci));

  const say = d => Object.values(sonuc).filter(k => k.durum === d).length;
  const cikti = {
    guncelleme: simdi,
    ozet: { toplam: urunler.length, guncel: say("guncel"), eski: say("eski"), elle: say("elle"), kaldirildi: say("kaldirildi") },
    urunler: Object.fromEntries(urunler.map(u => [u.id, sonuc[u.id]])),
  };
  await fs.writeFile(CIKTI, JSON.stringify(cikti, null, 1) + "\n");
  console.log(`\nToplam ${cikti.ozet.toplam}: ${cikti.ozet.guncel} güncel, ${cikti.ozet.eski} okunamadı, ${cikti.ozet.elle} elle, ${cikti.ozet.kaldirildi} kaldırılmış.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(e => { console.error(e); process.exit(1); });
}
