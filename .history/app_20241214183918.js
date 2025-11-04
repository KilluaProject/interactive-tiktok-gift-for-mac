const { WebcastPushConnection } = require("tiktok-live-connector");
const robot = require("robotjs");
const connection = new WebcastPushConnection("@senotudraq");

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);
  console.log(`Gift diterima: ${data.giftName}`);

  if (data.giftName.toLowerCase() === "coffee") {
    console.log("Menerima gift coffee, menekan tombol P, U, dan K.");

    // Menekan tombol P, U, dan K menggunakan keyToggle
    setTimeout(() => {
      robot.keyToggle("p", "down");
      console.log("Tombol P ditekan (down)");
      setTimeout(() => {
        robot.keyToggle("p", "up");
        console.log("Tombol P dilepas (up)");
      }, 200); // Tahan tombol "p" selama 200ms
    }, 0);

    setTimeout(() => {
      robot.keyToggle("u", "down");
      console.log("Tombol U ditekan (down)");
      setTimeout(() => {
        robot.keyToggle("u", "up");
        console.log("Tombol U dilepas (up)");
      }, 200); // Tahan tombol "u" selama 200ms
    }, 500); // Mulai menekan "u" setelah 500ms

    setTimeout(() => {
      robot.keyToggle("k", "down");
      console.log("Tombol K ditekan (down)");
      setTimeout(() => {
        robot.keyToggle("k", "up");
        console.log("Tombol K dilepas (up)");
      }, 200); // Tahan tombol "k" selama 200ms
    }, 1000); // Mulai menekan "k" setelah 1000ms
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
