const { WebcastPushConnection } = require("tiktok-live-connector");
const player = require("play-sound")();
const connection = new WebcastPushConnection("siigudel");

let doughnutGiftPlayed = false; // Flag untuk memastikan sound "jumpscare" hanya diputar sekali
let indonesiaRayaPlayed = false; // Flag untuk memastikan lagu Indonesia Raya hanya diputar sekali

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);

  // Memutar sound untuk gift "doughnut"
  if (data.giftName.toLowerCase() === "doughnut" && !doughnutGiftPlayed) {
    doughnutGiftPlayed = true; // Tandai bahwa sound sudah diputar
    console.log("Menerima gift doughnut, memutar sound effect.");
    player.play("./Sound/jumpscare.mp3", (err) => {
      if (err) {
        console.error("Gagal memutar sound effect:", err);
      }
    });
  }

  // Memutar lagu Indonesia Raya untuk gift "coffee"
  if (data.giftName.toLowerCase() === "miskha bear" && !indonesiaRayaPlayed) {
    indonesiaRayaPlayed = true; // Tandai lagu sudah diputar
    console.log("Menerima gift coffee, memutar lagu Indonesia Raya.");
    player.play("./Sound/indonesia.mp3", (err) => {
      if (err) {
        console.error("Gagal memutar lagu Indonesia Raya:", err);
      }
    });
  }
});

// Bersihkan flag setelah interval tertentu agar bisa memutar ulang
setInterval(() => {
  doughnutGiftPlayed = false;
  indonesiaRayaPlayed = false;
  console.log(
    "Flags untuk gift telah direset, sound dan lagu dapat diputar kembali."
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
