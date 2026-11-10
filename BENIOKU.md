# Fiyat Bil! — yeni özellikler

## 0. Canlı ürünler (her oyunda yeni set)
- Sabit ürün listesi yerine ürünler **her sabah e-ticaret ve ilan sitelerinden** toplanır:
  `scripts/urun-topla.mjs`, `kaynaklar.js`'deki liste sayfalarını (Cimri, Vatan, Dermoeczanem,
  emlakjet, arabam…) açar, her birinden rastgele ürünler seçer, ürün sayfasından **ad, fotoğraf,
  güncel fiyat ve link** okur ve `urun-havuzu.json`'a yazar (~150 ürün).
- Oyun **her oyunun başında** bu dosyayı yeniden yükler ve havuzdan dengeli, daha önce
  gösterilmemiş ürünler seçer. Yani ürünler hem günden güne hem oyundan oyuna değişir.
- Başlık ve açıklamalarda fiyatı ele veren her şey (ör. "5.400.000 TL") otomatik silinir.
- Bir kaynak o gün okunamazsa, o kaynağın son 7 gündeki ürünleri korunur (fiyat notunda
  "son kontrol" tarihi görünür).
- `urunler.js` artık **yedek liste**: canlı havuzda 4'ten az ürünü olan kategoriler
  (şu an Yemek ve Hizmet) ve havuz dosyası hiç yoksa kullanılır.
- Yeni kaynak eklemek için `kaynaklar.js`'e bir satır eklemek yeter. Kaynak başına sonuç
  GitHub Actions kaydında görünür: ✅ tamam, 🟡 kısmen, ⚠️ okunamadı.

## 1. Dengeli kategoriler, her oyunda farklı ürünler
- Tur sayısı seçilen kategorilere **eşit** dağıtılır (10 tur, 5 kategori → her kategoriden 2 ürün).
  Artan turlar rastgele kategorilere gider. Aynı kategori art arda gelmez.
- Her kategoride önce **hiç gösterilmemiş**, sonra en uzun süredir gösterilmemiş ürünler seçilir.
  Bu geçmiş oda sahibinin tarayıcısında tutulur (`localStorage`, anahtar `fiyatbil-gecmis-v1`).
- Lobide her kategorinin yanında ürün sayısı ve turların nasıl dağıtılacağı görünür.
- Bir kategorideki ürün sayısı, oyun başına o kategoriden gelen ürün sayısından ne kadar fazlaysa
  tekrar o kadar geç gelir. Az ürünlü kategorilere (ör. Giyim) ürün eklemek iyi olur.

## 2. Günlük fiyatlar
- `scripts/fiyat-guncelle.mjs` her ürünün `kaynak` sayfasını açar, fiyatı okur
  (JSON-LD → siteye özel kural → meta etiketleri → sayfa içi JSON) ve `fiyatlar.json`'a yazar.
- `.github/workflows/fiyat-guncelle.yml` bunu ve ürün toplamayı **her sabah 06:00'da** (TR)
  GitHub'da çalıştırır, `fiyatlar.json` + `urun-havuzu.json`'u depoya kaydeder ve siteyi
  GitHub Pages'e yeniden yayınlar.
  Actions sekmesinden "Run workflow" ile elle de çalışır.
- **Gerekli ayar:** Settings → Pages → Source: **"GitHub Actions"** ("Deploy from a branch" değil;
  o modda botun push'u siteyi yeniden derlemez ve oyun eski fiyatları gösterir).
- Oyun açılırken `fiyatlar.json`'u okur. Okunamayan ürünlerde son bilinen fiyat kullanılır.
- Güvenlik kuralları: okunan fiyat kayıtlı fiyatın 0,4 katından az / 2,5 katından fazlaysa ya da
  dünküne göre yarıya inmiş / iki katına çıkmışsa reddedilir. Silinmiş ilanlar (404) oyundan çıkar.
- `otomatik: false` olan ürünler (kaynağı haber, broşür veya liste sayfası olanlar) atlanır,
  `urunler.js`'teki fiyatları geçerlidir.

Elle çalıştırmak için (Node 20+ yeterli, paket kurulumu yok):

```
node scripts/urun-topla.mjs      # canlı ürün havuzu
node scripts/fiyat-guncelle.mjs  # yedek listenin fiyatları
```

Çıktıda her ürün için ✅ okundu / ⚠️ okunamadı / 📝 elle / 🗑️ ilan silinmiş görünür.

**Önemli:** Bazı Türk e-ticaret siteleri veri merkezlerinden (GitHub sunucuları dahil) gelen
istekleri engelliyor. İlk çalıştırmadan sonra hangi sitelerin ⚠️ verdiğine bakın. Çok sayıda ⚠️
varsa betiği kendi bilgisayarınızda zamanlanmış görev olarak çalıştırıp `fiyatlar.json`'u
push etmek daha güvenilir olur (ev interneti engellenmez).

## 3. Kaynak gösterimi
- Tahmin sırasında: "Fiyat kaynağı: MediaMarkt" (link yok, kopya çekilmesin diye).
- Fiyat açıklanınca: kaynak linki + "Fiyat bugün siteden alındı (saat 06:04)" ya da
  "Bugün siteden okunamadı · son kontrol …" notu.
- Lobideki eski "sadece doğrulanmış" seçeneği artık **"Sadece fiyatı bugün siteden alınan ürünler"**.

## Ürün eklerken
`urunler.js`'te `URUNLER_KAYNAKLI` listesine ekleyin. `kaynak` olarak **tek bir ürünün sayfasını**
verin (mağaza ürün sayfası, Cimri/Akakçe ürün sayfası, emlakjet/arabam ilanı). Marka ya da kategori
listesi verirseniz yanlış fiyat okunabilir; öyle kaynaklara `otomatik: false` yazın.
