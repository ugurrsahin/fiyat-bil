/* Her ürünün kalıcı kimliği: kategori + başlıktan üretilir.
   Hem oyun (index.html) hem de günlük fiyat betiği (scripts/fiyat-guncelle.mjs) bunu kullanır.
   Bir ürünün başlığını değiştirirsen kimliği de değişir; istersen ürüne elle  id: "..."  verebilirsin. */
(function (root) {
  function urunId(u) {
    if (u.id) return String(u.id);
    return (u.kategori + "-" + u.baslik)
      .toLocaleLowerCase("tr")
      .replace(/ı/g, "i")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  root.urunId = urunId;
})(typeof window !== "undefined" ? window : globalThis);
