/* =========================================================
   FİYAT BİL — ÜRÜN LİSTESİ
   Bu dosyayı GitHub'da tarayıcıdan düzenleyebilirsin.
   ========================================================= */

/* ---------------------------------------------------------
   1) KAYNAKLI ÜRÜNLER — fiyatı bir siteden kontrol edildi.
   foto: ürün fotoğrafının adresi (sitede fotoğrafa sağ tık →
         "Resim adresini kopyala"). Boş bırakılırsa emoji görünür.
   kaynak: fiyatın alındığı sayfanın linki (fiyat açılınca görünür).
           Her sabah bu sayfa açılıp güncel fiyat okunur (fiyatlar.json).
           En iyi sonuç tek bir ürünün sayfasıyla alınır: mağaza ürün
           sayfası, Cimri/Akakçe ürün sayfası, emlakjet/arabam ilanı.
   otomatik: false → kaynak bir haber/broşür/liste sayfasıysa yaz;
           günlük okuma atlanır, buradaki fiyat kullanılır.
   --------------------------------------------------------- */
window.URUNLER_KAYNAKLI = [
  {
    kategori: "Elektronik", emoji: "📱",
    baslik: "Apple iPhone 17 Pro",
    aciklama: "256 GB, Apple Türkiye garantili",
    fiyat: 111999,
    foto: "https://images.migrosone.com/elektronik/product/39186744/39186744_1-86ca0a-1650x1650.jpg",
    kaynak: "https://www.mediamarkt.com.tr/tr/product/_apple-iphone-17-pro-256-gb-apple-turkiye-garantili-gumus-166347631.html",
    kaynakAdi: "MediaMarkt"
  },
  {
    kategori: "Elektronik", emoji: "🎮",
    baslik: "Sony PlayStation 5 Slim Dijital",
    aciklama: "Dijital sürüm, 1 DualSense kol",
    fiyat: 52999,
    foto: "https://images.migrosone.com/sanalmarket/product/39380569/39380569_1-70c92f-1650x1650.jpg",
    kaynak: "https://www.vatanbilgisayar.com/sony-playstation-5-slim-digital-surum-oyun-konsolu-154947.html",
    kaynakAdi: "Vatan Bilgisayar"
  },
  {
    kategori: "Elektronik", emoji: "🖱️",
    baslik: "Logitech MX Master 3S",
    aciklama: "Kablosuz performans mouse, siyah",
    fiyat: 6259,
    foto: "https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-top-view-graphite-new-1.png",
    kaynak: "https://www.vatanbilgisayar.com/logitech-mx-master-3s-kablosuz-performans-mouse-siyah.html",
    kaynakAdi: "Vatan Bilgisayar"
  },
  {
    kategori: "Elektronik", emoji: "🎧",
    baslik: "Apple AirPods 4",
    aciklama: "Aktif Gürültü Engelleme özellikli",
    fiyat: 8799,
    foto: "https://images.migrosone.com/sanalmarket/product/39289759/39289759_1-3bc3ea-1650x1650.jpg",
    kaynak: "https://www.mediamarkt.com.tr/tr/product/_apple-airpods-4-bluetooth-kulak-ici-kulaklik-mxp93tua-1239694.html",
    kaynakAdi: "MediaMarkt"
  },
  {
    kategori: "Kozmetik", emoji: "👁️",
    baslik: "Maybelline Lash Sensational Sky High maskara",
    aciklama: "6 ml, siyah",
    fiyat: 1050,
    foto: "https://www.cloud10beauty.com/cdn/shop/files/maybelline-lash-sensational-sky-high-mascara-8383497.jpg?v=1784795236",
    kaynak: "https://www.dermoeczanem.com/maybelline-lash-sensational-sky-high-maskara-6-ml",
    kaynakAdi: "Dermoeczanem"
  },
  {
    kategori: "Kozmetik", emoji: "🧴",
    baslik: "Nivea Soft krem",
    aciklama: "200 ml kavanoz",
    fiyat: 177,
    foto: "",
    kaynak: "https://www.dermoeczanem.com/nivea-soft-nemlendirici-bakim-kremi-200-ml",
    kaynakAdi: "Dermoeczanem"
  },
  {
    kategori: "Emlak", emoji: "🏢",
    baslik: "Göztepe, Kadıköy · Satılık 3+1",
    aciklama: "140 m² brüt, 6. kat, 31+ yaşında bina, Bağdat Caddesi'ne 400 m",
    fiyat: 17750000, foto: "",
    kaynak: "https://www.emlakjet.com/ilan/bagdat-caddesine-yurume-mesafesinde-satilik-daire-19646437",
    kaynakAdi: "Emlakjet ilanı"
  },
  {
    kategori: "Emlak", emoji: "🏢",
    baslik: "Ayrancı, Çankaya · Satılık 3+1",
    aciklama: "130 m², 4. kat, Güvenlik Caddesi",
    fiyat: 7250000, foto: "",
    kaynak: "https://www.emlakjet.com/ilan/ayranci-guvenlik-cad-satilik-31-daire-19368353",
    kaynakAdi: "Emlakjet ilanı"
  },
  {
    kategori: "Emlak", emoji: "🏢",
    baslik: "Bahçelievler, Karşıyaka · Satılık 2+1",
    aciklama: "İzmir, Karşıyaka",
    fiyat: 3700000, foto: "",
    kaynak: "https://www.emlakjet.com/ilan/6-karsiyaka-bahcelievler-de-21-satilik-daire-18965533",
    kaynakAdi: "Emlakjet ilanı"
  },
  {
    kategori: "Emlak", emoji: "🏗️",
    baslik: "Talatpaşa, Esenyurt · Satılık 2+1",
    aciklama: "100 m² brüt, 3. kat, asansörsüz",
    fiyat: 2750000, foto: "",
    kaynak: "https://www.emlakjet.com/ilan/esenyurt-talatpasa-da-satilik-21-daire-19545563",
    kaynakAdi: "Emlakjet ilanı"
  },
  {
    kategori: "Araba", emoji: "🚗",
    baslik: "Fiat Egea Sedan 1.6 Multijet Easy",
    aciklama: "Sıfır, dizel, manuel, Kasım 2026 liste fiyatı",
    fiyat: 1499900,
    foto: "https://shiftdelete.net/static/img/content/26-11/08/fiat-fiyat-listesi-kasim-2026.jpg",
    kaynak: "https://shiftdelete.net/fiat-fiyat-listesi",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "ShiftDelete.Net"
  },
  {
    kategori: "Market", emoji: "🥛",
    baslik: "Pınar tam yağlı süt",
    aciklama: "1 litre",
    fiyat: 60,
    foto: "https://cdn.akakce.com/pinar/pinar-1-lt-x.jpg",
    kaynak: "https://www.akakce.com/pinar,1.html",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Akakçe (en ucuz fiyat)"
  },
  {
    kategori: "Market", emoji: "🍫",
    baslik: "Nutella",
    aciklama: "750 g kavanoz",
    fiyat: 261, foto: "",
    kaynak: "https://www.trendyol.com/nutella-x-b107764",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Trendyol"
  },
  {
    kategori: "Market", emoji: "🥚",
    baslik: "Yumurta",
    aciklama: "30'lu koli, L boy, zincir market",
    fiyat: 210, foto: "",
    kaynak: "https://www.endeks24.com/yumurta-zammi-market-raflarina-ne-zaman-yansiyacak",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Endeks24 (CarrefourSA fiyatı)"
  },
  {
    kategori: "Market", emoji: "🍵",
    baslik: "Çaykur Rize Turist çay",
    aciklama: "1 kg paket",
    fiyat: 349, foto: "",
    kaynak: "https://www.iscihaber.net/gundem/cay-fiyatlarinda-son-durum-1-kilo-cay-ne-kadar-oldu/259886",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "İşçi Haber (Eylül 2026)"
  },
  {
    kategori: "Market", emoji: "🥤",
    baslik: "Coca-Cola",
    aciklama: "2,5 litre pet şişe",
    fiyat: 100, foto: "",
    kaynak: "https://www.karekod.org/blog/icecek-fiyatlari-2022/",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Karekod (Eylül 2026 market fiyatı)"
  },
  {
    kategori: "Market", emoji: "🥫",
    baslik: "Red Bull",
    aciklama: "250 ml kutu",
    fiyat: 58, foto: "",
    kaynak: "https://www.karekod.org/blog/icecek-fiyatlari-2022/",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Karekod (Eylül 2026 market fiyatı)"
  },
  {
    kategori: "Market", emoji: "🌻",
    baslik: "Yudum ayçiçek yağı",
    aciklama: "5 litre pet",
    fiyat: 587, foto: "",
    kaynak: "https://www.karekod.org/blog/yag-fiyatlari/",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Karekod (normal fiyat)"
  },
  {
    kategori: "Market", emoji: "🧀",
    baslik: "Pınar beyaz peynir",
    aciklama: "900 g",
    fiyat: 219, foto: "",
    kaynak: "https://www.karekod.org/blog/bim-fiyatlari-2022/",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Karekod (BİM fiyatı)"
  },
  {
    kategori: "Market", emoji: "🥩",
    baslik: "Balıkesir Höyük dana kıyma",
    aciklama: "300 g paket",
    fiyat: 219, foto: "",
    kaynak: "https://www.habergazetesi.com.tr/a101-19-agustos-2026-aktuel-katalogu-temel-gida-temizlik-ve-atistirmaliklarda-indirimler-suruyor",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "A101 aktüel (Ağustos 2026)"
  },
  {
    kategori: "Market", emoji: "🫒",
    baslik: "Rem siyah zeytin",
    aciklama: "2 kg",
    fiyat: 215, foto: "",
    kaynak: "https://www.haberturk.com/bilgi/foto/yarin-satista-bim-18-19-21-agustos-2026-aktuel-katalogu-bu-hafta-bim-markette-indirimli-urunler-neler-tv-cep-telefonu-elektrikli-bisiklet-geliyor-3906958",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "BİM aktüel (Ağustos 2026)"
  },
  {
    kategori: "Market", emoji: "🧺",
    baslik: "Ariel toz deterjan",
    aciklama: "9 kg, Dağ Esintisi",
    fiyat: 499, foto: "",
    kaynak: "https://www.istiklal.com.tr/editorun-sectikleri/bim-11-eylul-2026-aktuel-urunler-katalogu-fiyatlari-1104227h",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "BİM aktüel (Eylül 2026)"
  },
  {
    kategori: "Market", emoji: "🍞",
    baslik: "Fırın ekmeği",
    aciklama: "230 g, büyükşehir fırın tarifesi",
    fiyat: 20, foto: "",
    kaynak: "https://www.evrensel.net/haber/5977680/sofradaki-yangin-buyuyor-ekmege-zam-geldi",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Evrensel (Nisan 2026 tarifesi)"
  },
  {
    kategori: "Market", emoji: "🥔",
    baslik: "Lay's Klasik",
    aciklama: "Parti boy paket",
    fiyat: 75, foto: "https://cdn.akakce.com/lays/lays-klasik-150-gr-parti-boy-patates-x.jpg",
    kaynak: "https://www.karekod.org/blog/?p=36656",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Karekod (2026 cips fiyatları)"
  },
  {
    kategori: "Market", emoji: "🍬",
    baslik: "Tarım Kredi Birlik toz şeker",
    aciklama: "5 kg paket",
    fiyat: 250, foto: "",
    kaynak: "https://www.akakce.com/seker,28.html",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Akakçe (en ucuz fiyat)"
  },
  {
    kategori: "Market", emoji: "🍌",
    baslik: "İthal muz",
    aciklama: "1 kg, zincir market",
    fiyat: 120, foto: "",
    kaynak: "https://www.gzt.com/ekonomi/mersinde-yerli-muz-ithalden-yuzde-50-ucuz-ureticiler-destek-istedi-4244324",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "GZT (Temmuz 2026 market fiyatı)"
  },
  {
    kategori: "Market", emoji: "🍝",
    baslik: "Barilla No.5 spagetti",
    aciklama: "500 g",
    fiyat: 48, foto: "",
    kaynak: "https://www.akakce.com/barilla.html",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Akakçe (en ucuz fiyat)"
  },
  {
    kategori: "Market", emoji: "🐱",
    baslik: "Pro Plan Adult tavuklu kedi maması",
    aciklama: "3 kg, yetişkin kedi",
    fiyat: 1492, foto: "https://cdn.akakce.com/x/pro-plan/pro-plan-adult-tavuklu-ve-pirincli-3-kg-yetiskin.jpg",
    kaynak: "https://www.cimri.com/kuru-kedi-mamasi/en-ucuz-purina-pro-plan-adult-tavuklu-3-kg-yetiskin-kedi-mamasi-fiyatlari,1428596768",
    kaynakAdi: "Cimri (idefix fiyatı)"
  },
  {
    kategori: "Market", emoji: "🍫",
    baslik: "Ülker Çikolatalı Gofret",
    aciklama: "36 g, tek paket",
    fiyat: 17, foto: "",
    kaynak: "https://www.cimri.com/gofret/cikolatali",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Cimri (en ucuz fiyat)"
  },
  {
    kategori: "Market", emoji: "💧",
    baslik: "Erikli damacana su",
    aciklama: "19 litre, eve teslim (Ankara bayi)",
    fiyat: 251, foto: "",
    kaynak: "https://www.yeniankara.com.tr/ekonomi/ankaralilarin-gizli-faturasi-ayda-kac-lira-damacana-suya-gidiyor-188385",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Yeni Ankara (Ekim 2026)"
  },
  {
    kategori: "Araba", emoji: "⚡",
    baslik: "Togg T10X V1 RWD Standart Menzil",
    aciklama: "Sıfır, elektrikli SUV, Kasım 2026 anahtar teslim fiyatı",
    fiyat: 1909048, foto: "https://shiftdelete.net/static/img/content/26-11/08/togg-fiyat-listesi-kasim-2026.jpg",
    kaynak: "https://shiftdelete.net/togg-fiyat-listesi",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "ShiftDelete.Net (Kasım 2026)"
  },
  {
    kategori: "Araba", emoji: "⚡",
    baslik: "Tesla Model Y Arkadan Çekiş",
    aciklama: "Sıfır, Kasım 2026 Türkiye anahtar teslim fiyatı",
    fiyat: 2474985, foto: "",
    kaynak: "https://www.webtekno.com/tesla-kasim-2026-fiyat-listesi-h228466.html",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Webtekno (Kasım 2026)"
  },
  {
    kategori: "Araba", emoji: "🚗",
    baslik: "Renault Clio 1.0 TCe Touch · 2020",
    aciklama: "50.000 km, beyaz, sahibinden, Ankara",
    fiyat: 1189000, foto: "",
    kaynak: "https://www.arabam.com/ilan/sahibinden-satilik-renault-clio-1-0-tce-touch/sahibinden-emsalsiz-temizlikte-clio-v-touch-100-hp/42170862",
    kaynakAdi: "arabam.com ilanı"
  },
  {
    kategori: "Araba", emoji: "🚙",
    baslik: "Volkswagen Passat 1.6 TDI Highline · 2018",
    aciklama: "160.000 km, gri, DSG, boyasız-değişensiz",
    fiyat: 1765000, foto: "",
    kaynak: "https://www.arabam.com/ilan/galeriden-satilik-volkswagen-passat-1-6-tdi-bluemotion-highline/orijinal-highline-passat/40546691",
    kaynakAdi: "arabam.com ilanı"
  },
  {
    kategori: "Araba", emoji: "🚗",
    baslik: "Toyota Corolla 1.4 D-4D Active · 2015",
    aciklama: "150.000 km, beyaz, manuel, tramersiz",
    fiyat: 1090750, foto: "",
    kaynak: "https://www.arabam.com/ilan/sahibinden-satilik-toyota-corolla-1-4-d-4d-active/sahibinden-toyota-corolla-1-4-d-4d-active-2015-model/42510306",
    kaynakAdi: "arabam.com ilanı"
  },
  {
    kategori: "Araba", emoji: "🏎️",
    baslik: "BMW 320i Sport Line · 2023",
    aciklama: "104.000 km, beyaz, head-up, elektrikli bagaj",
    fiyat: 3125000, foto: "",
    kaynak: "https://www.arabam.com/ilan/galeriden-satilik-bmw-3-serisi-320i-sport-line/4s-auto-2023-bmw-3-20-i-hatasiz-tablet-e-bgj-keyless-head-up/40029077",
    kaynakAdi: "arabam.com ilanı"
  },
  {
    kategori: "Araba", emoji: "🚘",
    baslik: "Tofaş Doğan SLX · 1994",
    aciklama: "209.950 km, bordo, sahibinden",
    fiyat: 240000, foto: "",
    kaynak: "https://www.arabam.com/ilan/sahibinden-satilik-tofas-dogan-slx/sahibinden-tofas-dogan-slx-1994-model/42629693",
    kaynakAdi: "arabam.com ilanı"
  },
  {
    kategori: "Araba", emoji: "🚐",
    baslik: "Ford Transit Courier 1.5 TDCi Trend · 2017",
    aciklama: "271.000 km, panel van, tek değişen",
    fiyat: 485000, foto: "",
    kaynak: "https://www.arabam.com/ilan/galeriden-satilik-ford-transit-courier-1-5-tdci-trend/ugur-motors-dan-tek-degisenli-courier/42167078",
    kaynakAdi: "arabam.com ilanı"
  },
  {
    kategori: "Araba", emoji: "🛵",
    baslik: "Yamaha NMAX 155 · 2023",
    aciklama: "7.820 km, gri, sahibinden motosiklet",
    fiyat: 215000, foto: "",
    kaynak: "https://www.arabam.com/ilan/sahibinden-satilik-yamaha-n-max-155/sahibinden-yamaha-n-max-155/42510625",
    kaynakAdi: "arabam.com ilanı"
  },
  {
    kategori: "Araba", emoji: "🚙",
    baslik: "Mercedes-AMG G 63 Performance",
    aciklama: "Sıfır, Eylül 2026 Türkiye liste fiyatı",
    fiyat: 31361000, foto: "",
    kaynak: "https://www.sondakika.com/otomobil/haber-mercedes-benz-eylul-2026-fiyatlarini-acikladi-en-u-20219962/",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Sondakika (Mercedes Eylül 2026 listesi)"
  },
  {
    kategori: "Emlak", emoji: "🏢",
    baslik: "Yazır, Selçuklu (Konya) · Satılık 3+1",
    aciklama: "130 m² net, manzaralı",
    fiyat: 4750000, foto: "",
    kaynak: "https://www.emlakjet.com/ilan/yazir-da-mukemmel-manzarali-31-satilik-daire-19395739",
    kaynakAdi: "Emlakjet ilanı"
  },
  {
    kategori: "Emlak", emoji: "🏢",
    baslik: "Sütlüce, Tepebaşı (Eskişehir) · Satılık 2+1",
    aciklama: "100 m² brüt, 3 katlı binanın 3. katı",
    fiyat: 2680000, foto: "",
    kaynak: "https://www.emlakjet.com/ilan/sutluce-mh-satilik-21-daire-19668140",
    kaynakAdi: "Emlakjet ilanı"
  },
  {
    kategori: "Emlak", emoji: "🏢",
    baslik: "Hilalkent, Yakutiye (Erzurum) · Satılık 3+1",
    aciklama: "145 m² net, 5. kat, merkezi doğalgaz",
    fiyat: 3650000, foto: "",
    kaynak: "https://www.emlakjet.com/ilan/piramit-gm-den-hilalkent-te-satilik-31-daire-19220825",
    kaynakAdi: "Emlakjet ilanı"
  },
  {
    kategori: "Emlak", emoji: "🏝️",
    baslik: "Geriş, Yalıkavak (Bodrum) · Satılık villa 4+1",
    aciklama: "Pera Evleri, deniz manzaralı, müstakil",
    fiyat: 90000000, foto: "",
    kaynak: "https://www.emlakjet.com/ilan/bodrum-yalikavak-pera-evleri-satilik-41-villa-19618484",
    kaynakAdi: "Emlakjet ilanı"
  },
  {
    kategori: "Emlak", emoji: "🔑",
    baslik: "Fethiye Mah., Nilüfer (Bursa) · Kiralık 2+1",
    aciklama: "AYLIK kira — 120 m², 2. kat",
    fiyat: 23000, foto: "",
    kaynak: "https://www.emlakjet.com/kiralik-daire/bursa-nilufer/emlakcidan?sayfa=11",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Emlakjet (ilan listesi)"
  },
  {
    kategori: "Emlak", emoji: "🔑",
    baslik: "Liman Mah., Konyaaltı (Antalya) · Kiralık 1+1",
    aciklama: "AYLIK kira — 75 m², eşyalı, havuzlu site",
    fiyat: 35000, foto: "",
    kaynak: "https://daire.trovit.com.tr/kiral%C4%B1k-antalya-konyaalt%C4%B1-ev/10",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Trovit (ilan listesi)"
  },
  {
    kategori: "Emlak", emoji: "🔑",
    baslik: "Ortaköy, Beşiktaş · Kiralık 2+1",
    aciklama: "AYLIK kira — ana cadde üzeri, balkonlu, asansörlü",
    fiyat: 65000, foto: "",
    kaynak: "https://daire.trovit.com.tr/kiral%C4%B1k-villa-besiktas/14",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Trovit (ilan listesi)"
  },
  {
    kategori: "Emlak", emoji: "🌲",
    baslik: "Sapanca · Satılık arsa",
    aciklama: "456 m², göl manzaralı, %60 imarlı",
    fiyat: 8550000, foto: "",
    kaynak: "https://www.emlakjet.com/emlak-ofisleri/re-max-klas-381885",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Emlakjet (RE/MAX Klas ilanları)"
  },
  {
    kategori: "Kozmetik", emoji: "💄",
    baslik: "MAC Macximal Silky Matte ruj",
    aciklama: "Ruby Woo serisi, tam boy",
    fiyat: 1449, foto: "",
    kaynak: "https://yandex.com.tr/shopping/t/mac-ruj",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Yandex Alışveriş (Trendyol / Hepsiburada fiyatı)"
  },
  {
    kategori: "Kozmetik", emoji: "🧴",
    baslik: "Elseve şampuan",
    aciklama: "400 ml",
    fiyat: 150, foto: "",
    kaynak: "https://www.akakce.com/sampuan/loreal-paris,18.html",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Akakçe (market broşür fiyatı)"
  },
  {
    kategori: "Kozmetik", emoji: "🌬️",
    baslik: "Dior Sauvage Eau de Parfum",
    aciklama: "100 ml erkek parfümü",
    fiyat: 8250, foto: "",
    kaynak: "https://www.beymenbeautystudio.com/en/p_dior-sauvage-eau-de-spray-100-ml-edp-parfum_488374",
    kaynakAdi: "Beymen Beauty Studio"
  },
  {
    kategori: "Kozmetik", emoji: "💋",
    baslik: "Chanel Rouge Allure Velvet ruj",
    aciklama: "3,5 g, mat",
    fiyat: 4235, foto: "",
    kaynak: "https://yandex.com.tr/shopping/t/ruj",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Yandex Alışveriş (Trendyol fiyatı)"
  },
  {
    kategori: "Kozmetik", emoji: "🧴",
    baslik: "La Roche-Posay Effaclar Duo+M",
    aciklama: "40 ml bakım kremi",
    fiyat: 1450, foto: "",
    kaynak: "https://www.dermoeczanem.com/la-roche-posay-effaclar-duo-krem-40-ml",
    kaynakAdi: "Dermoeczanem (liste fiyatı)"
  },
  {
    kategori: "Kozmetik", emoji: "💇",
    baslik: "Dyson Airwrap Co-anda2x",
    aciklama: "saç şekillendirme ve kurutma seti",
    fiyat: 44999, foto: "",
    kaynak: "https://www.teknosa.com/dyson-kampanya-c-5368",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Teknosa"
  },
  {
    kategori: "Kozmetik", emoji: "🪒",
    baslik: "Gillette Fusion yedek tıraş bıçağı",
    aciklama: "4'lü paket",
    fiyat: 808, foto: "",
    kaynak: "https://www.trendyol.com/gillette-erkek-x-b947-g2?pi=2",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Trendyol"
  },
  {
    kategori: "Kozmetik", emoji: "💄",
    baslik: "Flormar yarı parlak stick ruj",
    aciklama: "007 Pinky",
    fiyat: 209, foto: "",
    kaynak: "https://yandex.com.tr/shopping/t/ruj",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Yandex Alışveriş (n11 fiyatı)"
  },
  {
    kategori: "Kozmetik", emoji: "👄",
    baslik: "NYX Soft Matte Lip Cream",
    aciklama: "likit mat ruj, Montreal",
    fiyat: 890, foto: "",
    kaynak: "https://yandex.com.tr/shopping/t/ruj",
    otomatik: false, // haber/liste sayfası: günlük okunamaz, fiyat elle güncellenir
    kaynakAdi: "Yandex Alışveriş (Hepsiburada fiyatı)"
  },
];

/* ---------------------------------------------------------
   2) TAHMİNİ ÜRÜNLER — henüz kaynakla doğrulanmadı.
   [kategori, emoji, başlık, açıklama, fiyat]
   Doğruladıkça yukarıdaki listeye taşıyacağız.
   --------------------------------------------------------- */
window.URUNLER_TAHMINI = [
  // ---- Emlak ----

  // ---- Araba ----

  // ---- Market ----

  // ---- Kozmetik ----

  // ---- Spor ----
  ["Spor","🏋️","Ayarlanabilir dambıl seti","20 kg, Decathlon",2200],
  ["Spor","⚽","Büyük kulüp orijinal forması","2026/27 iç saha, isimsiz",3800],
  ["Spor","⌚","Garmin Forerunner 265","koşu saati",18000],
  ["Spor","🏟️","Spor salonu üyeliği","büyük zincir, 12 ay, İstanbul",32000],
  ["Spor","🏀","Molten BG4500 basketbol topu","resmi maç topu",2200],
  ["Spor","🚵","Dağ bisikleti","27,5 jant, 21 vites, giriş seviyesi",15000],
  ["Spor","🧘","Yoga matı","8 mm, Decathlon",450],
  ["Spor","💪","Whey protein tozu","2,3 kg, yerli marka",3200],
  ["Spor","🎾","Padel raketi","orta seviye, bilinen marka",5500],
  ["Spor","⚽","Halı saha","1 saat, akşam, İstanbul",3000],

  // ---- Yemek ----
  ["Yemek","🍔","Burger King Whopper Menü","orta boy",340],
  ["Yemek","🍔","McDonald's Big Mac Menü","orta boy",350],
  ["Yemek","🍕","Domino's orta boy Karışık pizza","menü fiyatı, kampanyasız",400],
  ["Yemek","☕","Starbucks Caffè Latte","Grande",175],
  ["Yemek","🥙","İskender","1 porsiyon, orta segment kebapçı",550],
  ["Yemek","🥯","Simit","İstanbul, seyyar tezgah",20],
  ["Yemek","🫖","Çay","kahvehanede 1 ince belli",20],
  ["Yemek","🦪","Midye dolma","10 adet, sokak midyecisi",150],
  ["Yemek","☕","Türk kahvesi","Kahve Dünyası, tek",110],
  ["Yemek","🫓","Lahmacun","1 adet, mahalle lahmacuncusu",120],
  ["Yemek","🌯","Tavuk döner dürüm","1 adet, orta segment",180],
  ["Yemek","🥟","Kayseri mantısı","1 porsiyon, restoranda",350],
  ["Yemek","🍣","Sushi seti","16 parça, AVM sushi restoranı",900],

  // ---- Tamir & Hırdavat ----
  ["Hırdavat","🔩","Bosch GSR 180-LI akülü vidalama","2 akülü set",4500],
  ["Hırdavat","🪴","Bahçe hortumu","25 metre, 1/2 inç",600],
  ["Hırdavat","💡","Philips LED ampul","9W, E27 duy",60],
  ["Hırdavat","🔌","Uzatma kablosu","3'lü, topraklı, 3 metre",250],
  ["Hırdavat","🎨","Filli Boya iç cephe boyası","2,5 litre, silinebilir",1000],
  ["Hırdavat","🔥","Kombi yıllık bakımı","yetkili servis ücreti",2000],
  ["Hırdavat","🪛","İzeltaş tornavida seti","6 parça",600],
  ["Hırdavat","🚰","Lavabo sifonu","plastik, standart",200],
  ["Hırdavat","🛠️","Matkap ucu seti","metal + beton, 15 parça",450],
  ["Hırdavat","🔧","Musluk tamiri","mahalle tesisatçısı, ev ziyareti + işçilik",1000],

  // ---- Elektronik ----
  ["Elektronik","📺","Samsung 55\" 4K televizyon","Crystal UHD serisi",22000],
  ["Elektronik","📱","Xiaomi Redmi Note 14","8 GB / 256 GB",13000],
  ["Elektronik","🧹","Dyson V15 Detect","dikey süpürge",33000],
  ["Elektronik","🧊","No-Frost buzdolabı","540 litre, yerli marka",40000],
  ["Elektronik","💻","MacBook Air 13\" M4","16 GB / 256 GB",55000],

  // ---- Giyim ----
  ["Giyim","👖","Levi's 501 jean","orijinal kesim",3500],
  ["Giyim","👕","Basic tişört","LC Waikiki, tek adet",200],
  ["Giyim","🧥","The North Face Nuptse mont","şişme mont",13000],
  ["Giyim","👔","Zara erkek gömlek","basic model",1500],
  ["Giyim","🧢","Kapüşonlu sweatshirt","DeFacto",700],

  // ---- Hizmet & diğer ----
  ["Hizmet","🚄","YHT bileti İstanbul–Ankara","ekonomi, tam bilet",950],
  ["Hizmet","🎬","Netflix Standart","aylık abonelik",280],
  ["Hizmet","🎵","Spotify Premium Bireysel","aylık abonelik",130],
  ["Hizmet","💈","Berber","saç + sakal, orta segment",500],
  ["Hizmet","🚌","İstanbulkart tam bilet","tek biniş",35],
  ["Hizmet","⛽","Benzin","1 litre kurşunsuz 95",58],
  ["Hizmet","🪪","B sınıfı ehliyet","kurs + sınav, toplam masraf",30000],
  ["Hizmet","🐈","Kedi kısırlaştırma","özel veteriner, dişi kedi",4000],
  ["Hizmet","🍿","Sinema bileti","AVM, hafta sonu, tam",320],
];
