const { TikTokLiveConnection } = require("tiktok-live-connector");
const keySender = require("node-key-sender");

// Ganti 'username_tiktok_anda' dengan username TikTok Anda
const username = "username_tiktok_anda";
let connection = new TikTokLiveConnection(username);

// Event listener ketika gift diterima
connection.on("gift", (data) => {
  console.log(
    `${data.uniqueId} memberikan gift: ${data.giftName} x${data.repeatCount}`
  );

  // Contoh: jika gift adalah "Mawar", kirimkan tombol 'R'
  if (data.giftName.toLowerCase() === "mawar") {
    console.log("Menerima gift Mawar, menekan tombol R");
    keySender.sendKey("r");
  }
});

// Event listener untuk koneksi
connection
  .connect()
  .then(() => {
    console.log("Terhubung ke TikTok Live");
  })
  .catch((err) => {
    console.error("Gagal terhubung:", err);
  });
