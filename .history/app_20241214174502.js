const { WebcastPushConnection } = require("tiktok-live-connector");
const robot = require("robotjs");
const connection = new WebcastPushConnection("@bangkulgaming");

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);

  if (data.giftName.toLowerCase() === "doughnut") {
    console.log("Menerima gift Doughnut, menekan tombol P, U, dan K.");

    // Tekan tombol "P"
    setTimeout(() => {
      robot.keyToggle("p", "down");
      console.log("Tombol P ditekan (down)");
      setTimeout(() => {
        robot.keyToggle("p", "up");
        console.log("Tombol P dilepas (up)");
      }, 200); // Tahan tombol "p" selama 200ms
    }, 0); // Tekan tombol P segera setelah menerima gift

    // Tekan tombol "U"
    setTimeout(() => {
      robot.keyToggle("u", "down");
      console.log("Tombol U ditekan (down)");
      setTimeout(() => {
        robot.keyToggle("u", "up");
        console.log("Tombol U dilepas (up)");
      }, 200); // Tahan tombol "u" selama 200ms
    }, 500); // Mulai menekan "u" setelah 500ms

    // Tekan tombol "K"
    setTimeout(() => {
      robot.keyToggle("k", "down");
      console.log("Tombol K ditekan (down)");
      setTimeout(() => {
        robot.keyToggle("k", "up");
        console.log("Tombol K dilepas (up)");
      }, 200); // Tahan tombol "k" selama 200ms
    }, 1000); // Mulai menekan "k" setelah 1000ms
  }

  if (data.giftName.toLowerCase() === "crown") {
    console.log("Menerima gift Crown, menekan tombol C");
    robot.keyToggle("c", "down"); // Tekan tombol C
    robot.keyToggle("c", "up"); // Lepaskan tombol C
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
