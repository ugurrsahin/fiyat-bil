#!/usr/bin/env node
/* =========================================================
   FİYAT BİL — GÜNLÜK ÜRÜN HAVUZU
   kaynaklar.js'deki liste sayfalarını açar, her birinden rastgele
   ürünler seçer, ürün sayfasından ad / fotoğraf / güncel fiyat okur
   ve urun-havuzu.json dosyasını yazar. Oyun her oyunun başında
   bu havuzdan yeni bir ürün seti çeker.

   Çalıştırma:  node scripts/urun-topla.mjs
   (GitHub'da her sabah fiyat-guncelle.mjs'den sonra otomatik çalışır)
   ========================================================= */
import fs from "node:fs/promises";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fiyatSec, sayfaGetir } from "./fiyat-guncelle.mjs";

const KOK = process.env.FIYATBIL_KOK || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CIKTI = path.join(KOK, "urun-havuzu.json");
const ESKI_GUN = 7;   // bir kaynak okunamazsa en fazla kaç günlük eski ürünler tutulur

/* aynı siteye art arda istek atmamak için bekleme süresi (ms) */
const BEKLEME = { "cimri.com": 3000, default: 1500 };
const SITE_ADI = {
  "cimri.com": "Cimri (en ucuz fiyat)", "emlakjet.com": "Emlakjet ilanı", "arabam.com": "arabam.com ilanı",
  "vatanbilgisayar.com": "Vatan Bilgisayar", "dermoeczanem.com": "Dermoeczanem", "mediamarkt.com.tr": "MediaMarkt",
};
const KAT_SINIR = { Emlak: [1000, 2e9], Araba: [5000, 2e8] };   // varsayılan [5, 5e6]

/* ---------- yardımcılar ---------- */
const bekle = ms => new Promise(r => setTimeout(r, ms));
const hostAdi = u => new URL(u).hostname.replace(/^www\./, "");
const karistir = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function kisaHash(s) { let h = 0x811c9dc5; for (const ch of s) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(36); }
const varlik = s => String(s ?? "")
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
  .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

/* ---------- liste sayfasından ürün linklerini bul ---------- */
const LINK_KURALI = {
  "cimri.com": (yol, kaynakYol) => /^\/[a-z0-9-]+\/en-ucuz-[a-z0-9-]+-fiyatlari,\d+$/.test(yol) && yol.startsWith(kaynakYol.replace(/\/$/, "") + "/"),
  "emlakjet.com": yol => /^\/ilan\/[a-z0-9-]+-\d+\/?$/.test(yol),
  "arabam.com": yol => /^\/ilan\/[a-z0-9-]+\/[a-z0-9-]+\/\d+\/?$/.test(yol),
  "vatanbilgisayar.com": yol => /^\/[a-z0-9]+(-[a-z0-9]+){3,}\.html$/.test(yol),
};
const GENEL_KURAL = yol => /^\/[a-z0-9]+(-[a-z0-9]+){4,}(\.html?)?\/?$/.test(yol) && !/(kampanya|kategori|marka|blog|yardim|iletisim|hakkimizda|sozlesme|politika|giris|uye)/.test(yol);

export function urunLinkleri(html, kaynakUrl) {
  const kaynak = new URL(kaynakUrl);
  const host = kaynak.hostname.replace(/^www\./, "");
  const kural = LINK_KURALI[host] || GENEL_KURAL;
  const out = new Set();
  const re = /(?:href=|"url":|"link":)\s*["']([^"'#\s]+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    let u;
    try { u = new URL(varlik(m[1]).replace(/\\\//g, "/"), kaynak); } catch { continue; }
    if (u.hostname.replace(/^www\./, "") !== host) continue;
    if (kural(u.pathname, kaynak.pathname)) out.add(u.origin + u.pathname);
  }
  // Next.js/JSON içinde kaçışlı yollar ("\/ilan\/...")
  const re2 = /["'](\\?\/[a-z0-9\\\/,.-]{10,})["']/gi;
  while ((m = re2.exec(html))) {
    const yol = m[1].replace(/\\\//g, "/");
    if (kural(yol, kaynak.pathname)) out.add(kaynak.origin + yol);
  }
  return [...out];
}

/* ---------- ürün sayfasından bilgi çıkar ---------- */
function jsonLdDugumleri(html) {
  const out = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    let d; try { d = JSON.parse(m[1].trim()); } catch { continue; }
    const gez = (n, k) => { if (!n || typeof n !== "object" || k > 6) return; if (Array.isArray(n)) return n.forEach(x => gez(x, k + 1)); if (n["@type"]) out.push(n); if (n["@graph"]) gez(n["@graph"], k + 1); if (n.mainEntity) gez(n.mainEntity, k + 1); if (n.itemOffered) gez(n.itemOffered, k + 1); };
    gez(d, 0);
  }
  return out;
}
const meta = (html, ad) => {
  const r1 = new RegExp(`<meta[^>]+(?:property|name)=["']${ad}["'][^>]*content=["']([^"']*)["']`, "i");
  const r2 = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${ad}["']`, "i");
  const m = html.match(r1) || html.match(r2); return m ? varlik(m[1]) : "";
};
const tipUyar = (n, re) => [].concat(n["@type"] || []).some(t => re.test(String(t)));
const deger = v => (v && typeof v === "object") ? (v.value ?? v.name ?? v["@value"] ?? "") : (v ?? "");
const resim = v => typeof v === "string" ? v : Array.isArray(v) ? resim(v[0]) : (v && (v.url || v.contentUrl)) || "";

/* Başlık/açıklamadan fiyatı ele veren her şeyi temizle */
export function fiyatsiz(metin, fiyat) {
  let s = String(metin || "");
  s = s.replace(/(?:₺|TL)\s*\d[\d.,]*/gi, "").replace(/\d[\d.,]*\s*(?:₺|TL\b|tl\b|lira\b|bin\s*TL|milyon)/gi, "");
  if (fiyat) {
    const n = Math.round(fiyat);
    const bicimler = [String(n), n.toLocaleString("tr-TR"), n.toLocaleString("en-US")];
    for (const b of bicimler) s = s.split(b).join("");
  }
  return s.replace(/(?<![\p{L}\d])(en ucuz|fiyatları|fiyatı|fiyat|satın al|ve özellikleri|özellikleri|yorumları|kampanyalı|indirimli)(?![\p{L}\d])/giu, "")
          .replace(/\s*[|·,:-]\s*(?=[|·,:-]|$)/g, "").replace(/\(\s*\)/g, "").replace(/\s{2,}/g, " ").replace(/^[\s|·,:-]+|[\s|·,:-]+$/g, "").trim();
}
function siteEkiniAt(ad, host) {
  const kok = host.split(".")[0];
  return ad.split(/\s+[|–—-]\s+/).filter((p, i, a) => !(i > 0 && (p.toLowerCase().includes(kok) || /\.com|bilgisayar|eczane|ilan(lar)?ı?$/i.test(p)))).join(" - ");
}
const kisalt = (s, n) => s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…";

export function urunBilgisi(html, url, kaynak) {
  const host = hostAdi(url);
  const sec = fiyatSec(html, host, null, null);
  if (sec.hata) return { hata: sec.hata };
  const fiyat = Math.round(sec.fiyat);
  const [alt, ust] = [kaynak.min ?? (KAT_SINIR[kaynak.kategori] || [5])[0], kaynak.max ?? (KAT_SINIR[kaynak.kategori] || [5, 5e6])[1]];
  if (fiyat < alt || fiyat > ust) return { hata: `fiyat aralık dışında (${fiyat})` };

  const dugumler = jsonLdDugumleri(html);
  const ana = dugumler.find(n => tipUyar(n, /Product|Car|Vehicle|Motorcycle|Residence|Apartment|House|RealEstate|Accommodation/i) && n.name)
           || dugumler.find(n => n.name && n.offers) || {};
  let ad = varlik(ana.name || meta(html, "og:title") || (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "");
  ad = kisalt(fiyatsiz(siteEkiniAt(ad, host), fiyat), 90);
  if (ad.length < 4) return { hata: "ürün adı bulunamadı" };

  // açıklama: yapısal bilgilerden (yıl, km, oda, m²…), yoksa marka; ilan sitelerinde og:description
  const parca = [];
  if (kaynak.etiket) parca.push(kaynak.etiket);
  const yil = deger(ana.vehicleModelDate || ana.modelDate || ana.productionDate);
  const km = deger(ana.mileageFromOdometer);
  const oda = deger(ana.numberOfRooms), m2 = deger(ana.floorSize);
  if (yil) parca.push(String(yil).slice(0, 4) + " model");
  if (km) parca.push(Number(km).toLocaleString("tr-TR") + " km");
  if (ana.fuelType) parca.push(deger(ana.fuelType));
  if (ana.vehicleTransmission) parca.push(deger(ana.vehicleTransmission));
  if (oda) parca.push(oda + " oda");
  if (m2) parca.push(m2 + " m²");
  const marka = varlik(deger(ana.brand));
  if (parca.length <= (kaynak.etiket ? 1 : 0) && marka && !ad.toLowerCase().includes(marka.toLowerCase())) parca.push(marka);
  if (parca.length <= (kaynak.etiket ? 1 : 0) && /emlakjet|arabam/.test(host)) {
    const od = fiyatsiz(meta(html, "og:description") || meta(html, "description"), fiyat);
    if (od) parca.push(kisalt(od, 90));
  }
  const aciklama = fiyatsiz(parca.join(" · "), fiyat);

  let foto = resim(ana.image) || meta(html, "og:image");
  if (foto) { try { foto = new URL(varlik(foto), url).href; } catch { foto = ""; } }
  return { ad, fiyat, foto, aciklama, yontem: sec.yontem };
}

/* ---------- ana akış ---------- */
async function kaynaklariYukle() {
  const ctx = { window: {} }; vm.createContext(ctx);
  vm.runInContext(await fs.readFile(path.join(KOK, "kaynaklar.js"), "utf8"), ctx);
  return ctx.window.KAYNAKLAR || [];
}

async function main() {
  const kaynaklar = await kaynaklariYukle();
  let eski = { urunler: [] };
  try { eski = JSON.parse(await fs.readFile(CIKTI, "utf8")); } catch {}
  const simdi = new Date().toISOString();
  const urunler = [], rapor = [];
  const gorulenUrl = new Set();

  // her site kendi sırasında, siteler paralel
  const siteler = {};
  for (const k of kaynaklar) (siteler[hostAdi(k.url)] ||= []).push(k);

  await Promise.all(Object.entries(siteler).map(async ([host, liste]) => {
    const ara = BEKLEME[host] ?? BEKLEME.default;
    const getir = async u => { const s = await sayfaGetir(u); await bekle(ara + Math.random() * 500); return s; };
    for (const k of liste) {
      const r = { kategori: k.kategori, url: k.url, istenen: k.adet || 4, alinan: 0, link: 0, hatalar: [] };
      try {
        const s = await getir(k.url);
        if (s.kaldirildi) throw new Error(`liste sayfası yok (HTTP ${s.durumKodu})`);
        const linkler = karistir(urunLinkleri(s.html, s.sonUrl || k.url)).filter(u => !gorulenUrl.has(u));
        r.link = linkler.length;
        if (!linkler.length) throw new Error("sayfada ürün linki bulunamadı");
        for (const u of linkler.slice(0, r.istenen * 2 + 2)) {
          if (r.alinan >= r.istenen) break;
          try {
            const p = await getir(u);
            if (p.kaldirildi) continue;
            const b = urunBilgisi(p.html, p.sonUrl || u, k);
            if (b.hata) { r.hatalar.push(b.hata); continue; }
            gorulenUrl.add(u);
            urunler.push({ id: "h" + kisaHash(u), c: k.kategori, e: k.emoji || "", t: b.ad, d: b.aciklama, p: b.fiyat, f: b.foto, k: u, kn: SITE_ADI[host] || host, kontrol: simdi, liste: k.url });
            r.alinan++;
          } catch (e) { r.hatalar.push(String(e.message || e)); }
        }
      } catch (e) { r.hatalar.unshift(String(e.message || e)); }

      // bu kaynak bugün hiç ürün vermediyse, son 7 günün ürünlerini koru
      if (!r.alinan) {
        const sinir = Date.now() - ESKI_GUN * 864e5;
        const kalan = (eski.urunler || []).filter(x => x.liste === k.url && Date.parse(x.kontrol) > sinir && !gorulenUrl.has(x.k));
        kalan.forEach(x => { gorulenUrl.add(x.k); urunler.push({ ...x, eski: true }); });
        r.eskiden = kalan.length;
      }
      rapor.push(r);
      const isaret = r.alinan >= r.istenen ? "✅" : r.alinan ? "🟡" : "⚠️ ";
      console.log(`${isaret} ${k.kategori.padEnd(11)} ${String(r.alinan).padStart(2)}/${r.istenen}  ${k.url}${r.eskiden ? `  (dünden ${r.eskiden} ürün korundu)` : ""}${!r.alinan && r.hatalar[0] ? "  — " + r.hatalar[0] : ""}`);
    }
  }));

  const sayac = {};
  urunler.forEach(u => sayac[u.c] = (sayac[u.c] || 0) + 1);
  const cikti = { guncelleme: simdi, ozet: { toplam: urunler.length, yeni: urunler.filter(u => !u.eski).length, kategoriler: sayac }, kaynaklar: rapor, urunler };
  await fs.writeFile(CIKTI, JSON.stringify(cikti, null, 1) + "\n");
  console.log(`\nHavuz: ${urunler.length} ürün (${cikti.ozet.yeni} bugün okundu) — ` + Object.entries(sayac).map(([c, n]) => `${c} ${n}`).join(", "));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(e => { console.error(e); process.exit(1); });
}
