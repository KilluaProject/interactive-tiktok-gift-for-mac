const { WebcastPushConnection } = require("tiktok-live-connector");
const robot = require("robotjs");
const connection = new WebcastPushConnection("siigudel");

let isProcessingGift = false;

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);
  console.log(`Gift diterima: ${data.giftName}`);

  if (isProcessingGift) {
    console.log("Gift sudah diproses, mengabaikan eksekusi berikutnya.");
    return;
  }

  isProcessingGift = true;

  // // Gift untuk restart
  if (data.giftName.toLowerCase() === "doughnut") {
    console.log("Menerima gift doughnut , menekan tombol P, U, dan K.");
    player.play("donut-sound.mp3", (err) => {
      if (err) {
        console.error("Gagal memutar sound effect:", err);
      }
  } else {
    isProcessingGift = false;
  }
});

connection
  .connect()
  .then(() => {
    console.log("Terhubung ke TikTok Live!");
  })
  .catch((err) => {
    console.error("Gagal terhubung:", err);
  });
