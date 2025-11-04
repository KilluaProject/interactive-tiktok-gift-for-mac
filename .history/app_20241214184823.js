const { WebcastPushConnection } = require("tiktok-live-connector");
const robot = require("robotjs");
const connection = new WebcastPushConnection("@sagarnotsugar");

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);
  console.log(`Gift diterima: ${data.giftName}`);

  if (data.giftName.toLowerCase() === "coffee") {
    console.log("Menerima gift coffee, menekan tombol P, U, dan K.");

    setTimeout(() => {
      robot.keyToggle("p", "down");
      console.log("Tombol P ditekan (down)");
      setTimeout(() => {
        robot.keyToggle("p", "up");
        console.log("Tombol P dilepas (up)");
      }, 200);
    }, 0);

    setTimeout(() => {
      robot.keyToggle("u", "down");
      console.log("Tombol U ditekan (down)");
      setTimeout(() => {
        robot.keyToggle("u", "up");
        console.log("Tombol U dilepas (up)");
      }, 200);
    }, 500);

    setTimeout(() => {
      robot.keyToggle("k", "down");
      console.log("Tombol K ditekan (down)");
      setTimeout(() => {
        robot.keyToggle("k", "up");
        console.log("Tombol K dilepas (up)");
      }, 200);
    }, 1000);
  } else if (data.giftName.toLowerCase() === "heart me") {
    console.log("Menerima gift heart me, menekan tombol O selama 10 detik.");

    robot.keyToggle("o", "down");
    console.log("Tombol O ditekan (down)");

    setTimeout(() => {
      robot.keyToggle("o", "up");
      console.log("Tombol O dilepas (up)");
    }, 10000);
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
