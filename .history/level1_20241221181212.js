const { WebcastPushConnection } = require("tiktok-live-connector");
const robot = require("robotjs");
const player = require("play-sound")();
const connection = new WebcastPushConnection("siigudel");

let isProcessingGift = false;

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);

  if (isProcessingGift) {
    console.log("Gift sudah diproses, mengabaikan eksekusi berikutnya.");
    return;
  }

  isProcessingGift = true;

  // Gift untuk restart
  if (data.giftName.toLowerCase() === "finger heart") {
    console.log("Menerima gift finger heart, menekan tombol P, U, dan K.");
    // Tambahkan logika untuk "finger heart" di sini jika diperlukan
  }
  // Gift untuk donat
  else if (data.giftName.toLowerCase() === "donat") {
    console.log("Menerima gift donat, memutar sound effect.");
    player.play("donut-sound.mp3", (err) => {
      if (err) {
        console.error("Gagal memutar sound effect:", err);
      }
    });
  }

  isProcessingGift = false;
});

connection
  .connect()
  .then(() => {
    console.log("Terhubung ke TikTok Live!");
  })
  .catch((err) => {
    console.error("Gagal terhubung:", err);
  });
