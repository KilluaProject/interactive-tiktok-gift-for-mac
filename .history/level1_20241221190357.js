const { WebcastPushConnection } = require("tiktok-live-connector");
const player = require("play-sound")();
const connection = new WebcastPushConnection("breadcalz");

let isProcessingGift = false;

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);

  if (isProcessingGift) {
    console.log("Gift sudah diproses, mengabaikan eksekusi berikutnya.");
    return;
  }

  isProcessingGift = true;

  if (data.giftName.toLowerCase() === "doughnut") {
    console.log("Menerima gift doughnut, memutar sound effect.");
    player.play("./Sound/jumpscare.mp3", (err) => {
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
