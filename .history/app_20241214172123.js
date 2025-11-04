const { WebcastPushConnection } = require("tiktok-live-connector");
const robot = require("robotjs");
const connection = new WebcastPushConnection("@yhoe.familyrjp");

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);

  if (data.giftName.toLowerCase() === "mawar") {
    console.log("Menerima gift Mawar, menekan tombol R");
    robot.keyTap("r");
  }

  if (data.giftName.toLowerCase() === "crown") {
    console.log("Menerima gift Crown, menekan tombol C");
    robot.keyTap("c"); //
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
