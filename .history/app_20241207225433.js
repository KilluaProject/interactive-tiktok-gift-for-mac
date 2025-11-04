const { TikTokLiveConnection } = require("tiktok-live-connector");
const robot = require("robotjs");

// Ganti 'username_tiktok_anda' dengan username TikTok Anda
const connection = new TikTokLiveConnection("username_tiktok_anda");

// Event listener untuk gift
connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);

  // Contoh: jika gift adalah "Mawar", kirimkan tombol 'R'
  if (data.giftName.toLowerCase() === "mawar") {
    console.log("Menerima gift Mawar, menekan tombol R");
    robot.keyTap("r"); // Menekan tombol 'R'
  }

  // Aksi lain berdasarkan gift
  // Contoh: jika gift adalah "Crown", kirimkan tombol 'C'
  if (data.giftName.toLowerCase() === "crown") {
    console.log("Menerima gift Crown, menekan tombol C");
    robot.keyTap("c"); // Menekan tombol 'C'
  }
});

// Event listener untuk koneksi
connection
  .connect()
  .then(() => {
    console.log("Terhubung ke TikTok Live!");
  })
  .catch((err) => {
    console.error("Gagal terhubung:", err);
  });
