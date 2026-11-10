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

   Desteklenen siteler: cimri.com, emlakjet.com, arabam.com,
   vatanbilgisayar.com, dermoeczanem.com. Başka bir site eklenebilir;
   ürün sayfasında fiyat (JSON-LD / meta) varsa genelde çalışır.
   Bir kaynak sürekli ⚠️ veriyorsa GitHub Actions kaydında görünür.
   ========================================================= */
window.KAYNAKLAR = [
  // ---- Elektronik ----
  { kategori: "Elektronik", url: "https://www.vatanbilgisayar.com/cep-telefonu-modelleri/", adet: 5 },
  { kategori: "Elektronik", url: "https://www.vatanbilgisayar.com/notebook/", adet: 4 },
  { kategori: "Elektronik", url: "https://www.cimri.com/televizyonlar", adet: 4 },
  { kategori: "Elektronik", url: "https://www.cimri.com/sarjli-supurgeler", adet: 3 },
  { kategori: "Elektronik", url: "https://www.cimri.com/kahve-makineleri", adet: 3 },
  { kategori: "Elektronik", url: "https://www.cimri.com/camasir-makineleri", adet: 3 },

  // ---- Kozmetik ----
  { kategori: "Kozmetik", url: "https://www.dermoeczanem.com/cilt-bakimi", adet: 5 },
  { kategori: "Kozmetik", url: "https://www.cimri.com/kadin-parfumleri", adet: 4 },
  { kategori: "Kozmetik", url: "https://www.cimri.com/erkek-parfumleri", adet: 4 },
  { kategori: "Kozmetik", url: "https://www.cimri.com/sampuan-ve-sac-kremi", adet: 4 },

  // ---- Market ----
  { kategori: "Market", url: "https://www.cimri.com/peynir", adet: 3, max: 5000 },
  { kategori: "Market", url: "https://www.cimri.com/zeytin", adet: 3, max: 5000 },
  { kategori: "Market", url: "https://www.cimri.com/sivi-yag", adet: 3, max: 5000 },
  { kategori: "Market", url: "https://www.cimri.com/hazir-kahve", adet: 3, max: 5000 },
  { kategori: "Market", url: "https://www.cimri.com/gofret", adet: 3, max: 5000 },
  { kategori: "Market", url: "https://www.cimri.com/toz-deterjan", adet: 3, max: 5000 },
  { kategori: "Market", url: "https://www.cimri.com/kuru-kedi-mamasi", adet: 2, max: 10000 },

  // ---- Spor ----
  { kategori: "Spor", url: "https://www.cimri.com/spor-ayakkabi", adet: 5 },
  { kategori: "Spor", url: "https://www.cimri.com/protein-tozlari", adet: 3 },
  { kategori: "Spor", url: "https://www.cimri.com/dag-bisikletleri", adet: 3 },
  { kategori: "Spor", url: "https://www.cimri.com/basketbol-topu", adet: 2 },
  { kategori: "Spor", url: "https://www.cimri.com/fitness-kondisyon-aksesuarlari", adet: 3 },

  // ---- Giyim ----
  { kategori: "Giyim", url: "https://www.cimri.com/erkek-mont", adet: 5 },
  { kategori: "Giyim", url: "https://www.cimri.com/mont", adet: 4 },
  { kategori: "Giyim", url: "https://www.cimri.com/erkek-palto", adet: 3 },

  // ---- Hırdavat ----
  { kategori: "Hırdavat", url: "https://www.cimri.com/matkaplar", adet: 5 },
  { kategori: "Hırdavat", url: "https://www.cimri.com/akulu-vidalama-makinesi", adet: 5 },

  // ---- Emlak (ilanlar) ----
  { kategori: "Emlak", url: "https://www.emlakjet.com/satilik-daire/ankara-cankaya", adet: 3, etiket: "Çankaya, Ankara · Satılık", min: 300000 },
  { kategori: "Emlak", url: "https://www.emlakjet.com/satilik-daire/istanbul-kadikoy", adet: 3, etiket: "Kadıköy, İstanbul · Satılık", min: 300000 },
  { kategori: "Emlak", url: "https://www.emlakjet.com/satilik-daire/izmir-karsiyaka", adet: 2, etiket: "Karşıyaka, İzmir · Satılık", min: 300000 },
  { kategori: "Emlak", url: "https://www.emlakjet.com/satilik-daire/antalya-muratpasa", adet: 2, etiket: "Muratpaşa, Antalya · Satılık", min: 300000 },
  { kategori: "Emlak", url: "https://www.emlakjet.com/satilik-daire/eskisehir-tepebasi", adet: 2, etiket: "Tepebaşı, Eskişehir · Satılık", min: 300000 },
  { kategori: "Emlak", url: "https://www.emlakjet.com/kiralik-daire/istanbul-besiktas", adet: 2, etiket: "AYLIK kira — Beşiktaş, İstanbul", min: 3000, max: 1000000 },
  { kategori: "Emlak", url: "https://www.emlakjet.com/kiralik-daire/ankara-cankaya", adet: 2, etiket: "AYLIK kira — Çankaya, Ankara", min: 3000, max: 1000000 },

  // ---- Araba (ilanlar) ----
  { kategori: "Araba", url: "https://www.arabam.com/ikinci-el/otomobil", adet: 6, etiket: "İkinci el", min: 50000 },
  { kategori: "Araba", url: "https://www.arabam.com/ikinci-el/arazi-suv-pick-up", adet: 3, etiket: "İkinci el SUV", min: 50000 },
  { kategori: "Araba", url: "https://www.arabam.com/ikinci-el/motosiklet", adet: 2, etiket: "İkinci el motosiklet", min: 5000 },
];
