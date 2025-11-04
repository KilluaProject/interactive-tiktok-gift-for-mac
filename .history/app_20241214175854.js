const { WebcastPushConnection } = require("tiktok-live-connector");
const robot = require("robotjs");
const connection = new WebcastPushConnection("@bangkulgaming");

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);
  console.log(`Gift diterima: ${data.giftName}`);

  if (data.giftName.toLowerCase() === "Coffee") {
    console.log("Menerima gift coffee, menekan tombol P, U, dan K.");

    // Menekan tombol P, U, dan K
    robot.keyTap("p");
    robot.keyTap("u");
    robot.keyTap("k");
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
