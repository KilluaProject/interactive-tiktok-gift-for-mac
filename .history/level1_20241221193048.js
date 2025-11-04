const { WebcastPushConnection } = require("tiktok-live-connector");
const player = require("play-sound")();
const connection = new WebcastPushConnection("fantsyy_");

let doughnutGiftPlayed = false; // Flag untuk memastikan sound hanya diputar sekali

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);

  if (data.giftName.toLowerCase() === "doughnut" && !doughnutGiftPlayed) {
    coffeeGiftPlayed = true; // Tandai bahwa sound sudah diputar
    console.log("Menerima gift coffee, memutar sound effect.");
    player.play("./Sound/jumpscare.mp3", (err) => {
      if (err) {
        console.error("Gagal memutar sound effect:", err);
      }
    });
  }

  if (data.giftName.toLowerCase() === "coffe" && !indonesiaRayaPlayed) {
    console.log("Menerima gift Mishka Bear, memutar lagu Indonesia Raya.");
    indonesiaRayaPlayed = true; // Tandai lagu sudah diputar
    player.play("./Sound/indonesia.mp3", (err) => {
      if (err) {
        console.error("Gagal memutar lagu Indonesia Raya:", err);
      }
    });
  }
});

// Bersihkan flag setelah interval tertentu agar bisa memutar ulang
setInterval(() => {
  coffeeGiftPlayed = false;
  console.log(
    "Flag untuk gift coffee telah direset, sound dapat diputar kembali."
  );
}, 60000); // Reset setiap 1 menit

connection
  .connect()
  .then(() => {
    console.log("Terhubung ke TikTok Live!");
  })
  .catch((err) => {
    console.error("Gagal terhubung:", err);
  });
