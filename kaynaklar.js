/* =========================================================
   FİYAT BİL — CANLI ÜRÜN KAYNAKLARI
   Her sabah scripts/urun-topla.mjs bu sayfaları açar, her birinden
   rastgele "adet" kadar ürün seçer, ürün sayfasından adını, fotoğrafını
   ve GÜNCEL fiyatını okur ve urun-havuzu.json'a yazar.
   Her oyun bu havuzdan yeni, dengeli bir ürün seti çeker.

   kategori : oyundaki kategori adı
   url      : bir kategori / ilan listesi sayfası (ürün değil, liste)
   adet     : bu sayfadan kaç ürün alınsın
   etiket   : (isteğe bağlı) açıklamanın başına eklenir — ilanlarda konum
              bilgisi için önemli, ör. "Çankaya, Ankara · Satılık"
   min, max : (isteğe bağlı) bu aralık dışındaki fiyatlar alınmaz

   vatanbilgisayar.com, dermoeczanem.com. Başka bir site eklenebilir;
   ürün sayfasında fiyat (JSON-LD / meta) varsa genelde çalışır.
   Bir kaynak sürekli ⚠️ veriyorsa GitHub Actions kaydında görünür.
   ========================================================= */
window.KAYNAKLAR = [
  // ---- Elektronik ----
  { kategori: "Elektronik", url: "https://www.vatanbilgisayar.com/cep-telefonu-modelleri/", adet: 5 },
  { kategori: "Elektronik", url: "https://www.vatanbilgisayar.com/notebook/", adet: 4 },

  // ---- Kozmetik ----
  { kategori: "Kozmetik", url: "https://www.dermoeczanem.com/cilt-bakimi", adet: 5 },

  // ---- Market ----

  // ---- Spor ----

  // ---- Giyim ----

  // ---- Hırdavat ----

  // ---- Emlak (ilanlar) ----
  { kategori: "Emlak", url: "https://www.emlakjet.com/satilik-daire/ankara-cankaya", adet: 3, etiket: "Çankaya, Ankara · Satılık", min: 300000 },
  { kategori: "Emlak", url: "https://www.emlakjet.com/satilik-daire/istanbul-kadikoy", adet: 3, etiket: "Kadıköy, İstanbul · Satılık", min: 300000 },
  { kategori: "Emlak", url: "https://www.emlakjet.com/satilik-daire/izmir-karsiyaka", adet: 2, etiket: "Karşıyaka, İzmir · Satılık", min: 300000 },
  { kategori: "Emlak", url: "https://www.emlakjet.com/satilik-daire/antalya-muratpasa", adet: 2, etiket: "Muratpaşa, Antalya · Satılık", min: 300000 },
  { kategori: "Emlak", url: "https://www.emlakjet.com/satilik-daire/eskisehir-tepebasi", adet: 2, etiket: "Tepebaşı, Eskişehir · Satılık", min: 300000 },
  { kategori: "Emlak", url: "https://www.emlakjet.com/kiralik-daire/istanbul-besiktas", adet: 2, etiket: "AYLIK kira — Beşiktaş, İstanbul", min: 3000, max: 1000000 },
  { kategori: "Emlak", url: "https://www.emlakjet.com/kiralik-daire/ankara-cankaya", adet: 2, etiket: "AYLIK kira — Çankaya, Ankara", min: 3000, max: 1000000 },

  // ---- Araba (ilanlar) ----

  // ---- Akakçe (Cimri 403 verdiği için) ----
  { kategori: "Elektronik", url: "https://www.akakce.com/televizyon.html", adet: 3 },
  { kategori: "Elektronik", url: "https://www.akakce.com/cep-telefonu.html", adet: 3 },
  { kategori: "Elektronik", url: "https://www.akakce.com/notebook.html", adet: 3 },
  { kategori: "Elektronik", url: "https://www.akakce.com/dikey-supurge.html", adet: 3 },
  { kategori: "Elektronik", url: "https://www.akakce.com/kahve-makinesi.html", adet: 2 },
  { kategori: "Elektronik", url: "https://www.akakce.com/camasir-makinesi.html", adet: 2 },
  { kategori: "Kozmetik", url: "https://www.akakce.com/parfum.html", adet: 5 },
  { kategori: "Kozmetik", url: "https://www.akakce.com/sampuan,47.html", adet: 3 },
  { kategori: "Kozmetik", url: "https://www.akakce.com/ruj.html", adet: 3 },
  { kategori: "Market", url: "https://www.akakce.com/peynir.html", adet: 2, max: 5000 },
  { kategori: "Market", url: "https://www.akakce.com/zeytin.html", adet: 2, max: 5000 },
  { kategori: "Market", url: "https://www.akakce.com/aycicek-yagi.html", adet: 2, max: 5000 },
  { kategori: "Market", url: "https://www.akakce.com/kahve.html", adet: 2, max: 5000 },
  { kategori: "Market", url: "https://www.akakce.com/gofret.html", adet: 2, max: 5000 },
  { kategori: "Market", url: "https://www.akakce.com/toz-deterjan.html", adet: 2, max: 5000 },
  { kategori: "Market", url: "https://www.akakce.com/seker,28.html", adet: 2, max: 5000 },
  { kategori: "Market", url: "https://www.akakce.com/kedi-mamasi.html", adet: 2, max: 10000 },
  { kategori: "Spor", url: "https://www.akakce.com/protein-tozu.html", adet: 2 },
  { kategori: "Spor", url: "https://www.akakce.com/dag-bisikleti.html", adet: 2 },
  { kategori: "Spor", url: "https://www.akakce.com/basketbol-topu.html", adet: 2 },
  { kategori: "Giyim", url: "https://www.akakce.com/mont.html", adet: 3 },
  { kategori: "Giyim", url: "https://www.akakce.com/palto.html", adet: 3 },
  { kategori: "Giyim", url: "https://www.akakce.com/sweatshirt.html", adet: 3 },
  { kategori: "Giyim", url: "https://www.akakce.com/kot-pantolon.html", adet: 2 },
  { kategori: "Hırdavat", url: "https://www.akakce.com/matkap.html", adet: 4 },
  { kategori: "Hırdavat", url: "https://www.akakce.com/akulu-matkap.html", adet: 3 },
  { kategori: "Hırdavat", url: "https://www.akakce.com/testere.html", adet: 2 },

  // Marka siteleri: ürün adresleri sitemap'ten rastgele seçilir
  { kategori: "Spor",  url: "https://www.newbalance.com.tr/#sitemap", sitemap: "https://www.newbalance.com.tr", adet: 3 },
  { kategori: "Spor",  url: "https://tr.puma.com/#sitemap", sitemap: "https://tr.puma.com", adet: 3 },
  { kategori: "Giyim", url: "https://tr.tommy.com/#sitemap", sitemap: "https://tr.tommy.com", adet: 3 },
  { kategori: "Giyim", url: "https://www.timberland.com.tr/#sitemap", sitemap: "https://www.timberland.com.tr", adet: 2 },

  // FLO (giyim ve ayakkabı; indirimliyse indirimli fiyat okunur)
  { kategori: "Giyim", url: "https://www.flo.com.tr/#sitemap", sitemap: "https://www.flo.com.tr", adet: 4 },

  // ---- Elektronik: akıllı saat ve kulaklık (kulaklık sayfası adı tahmin; 404 verirse silinebilir) ----
  { kategori: "Elektronik", url: "https://www.akakce.com/akilli-saat.html", adet: 2 },
  { kategori: "Elektronik", url: "https://www.akakce.com/kulaklik.html", adet: 2 },

  // ---- Yemek: Yemeksepeti Ankara şubeleri (menü ürünleri; fiyat şubeye göre değişir) ----
  { kategori: "Yemek", emoji: "🍔", url: "https://www.yemeksepeti.com/#menu-burger-king", menu: "yemeksepeti", sehir: "Ankara", marka: "Burger King", min: 150, adet: 6,
    urller: [
      "https://www.yemeksepeti.com/restaurant/zmj9/burger-king-zmj9",
      "https://www.yemeksepeti.com/restaurant/k0jo/burger-king-k0jo",
      "https://www.yemeksepeti.com/restaurant/g2ne/burger-king-g2ne",
      "https://www.yemeksepeti.com/restaurant/m4b9/burger-king-m4b9",
      "https://www.yemeksepeti.com/restaurant/gcu3/burger-king-gcu3",
      "https://www.yemeksepeti.com/restaurant/wed5/burger-king-wed5",
      "https://www.yemeksepeti.com/restaurant/sb6i/burger-king-sb6i",
      "https://www.yemeksepeti.com/restaurant/ckv9/burger-king-ckv9"
    ] },
  { kategori: "Yemek", emoji: "🍟", url: "https://www.yemeksepeti.com/#menu-mcdonalds", menu: "yemeksepeti", sehir: "Ankara", marka: "McDonald's", min: 150, adet: 6,
    urller: [
      "https://www.yemeksepeti.com/restaurant/c4hx/mcdonalds-c4hx",
      "https://www.yemeksepeti.com/restaurant/vr48/mcdonalds-vr48",
      "https://www.yemeksepeti.com/restaurant/wojh/mcdonalds-wojh",
      "https://www.yemeksepeti.com/restaurant/wnk4/mcdonalds-wnk4",
      "https://www.yemeksepeti.com/restaurant/xl2z/mcdonalds-xl2z",
      "https://www.yemeksepeti.com/restaurant/jsna/mcdonalds-jsna",
      "https://www.yemeksepeti.com/restaurant/irsr/mcdonalds-irsr",
      "https://www.yemeksepeti.com/restaurant/ur1e/mcdonalds-ur1e"
    ] },
];
