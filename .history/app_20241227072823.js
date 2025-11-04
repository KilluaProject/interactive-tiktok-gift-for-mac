const { WebcastPushConnection } = require("tiktok-live-connector");
const robot = require("robotjs");
const player = require("play-sound")(); // Library untuk memutar suara
const connection = new WebcastPushConnection("@tetehbalap");

let isProcessing = false;

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);

  //rewind
  if (data.giftName.toLowerCase() === "corgi" && !isProcessing) {
    isProcessing = true;
    console.log("Memproses gift...");

    // Logika keyboard terlebih dahulu
    robot.keyToggle("b", "down");
    console.log("Tombol B ditekan (down)");

    setTimeout(() => {
      robot.keyToggle("b", "up");
      console.log("Tombol B dilepas (up)");

      // Setelah tombol dilepas, setel musik
      player.play("./sound/sad.mp3", (err) => {
        if (err) {
          console.error("Error memutar suara:", err);
        } else {
          console.log("Suara diputar dengan sukses.");
        }
        // Reset setelah musik selesai
        isProcessing = false;
      });
    }, 100);
  }

  //Nengol belakang
  if (data.giftName.toLowerCase() === "gg") {
    console.log(
      "Menerima gift gg, memutar suara dan menekan tombol S selama 5 detik."
    );
    robot.keyToggle("p", "down");
    console.log("Tombol p ditekan (down)");

    setTimeout(() => {
      robot.keyToggle("p", "up");
      console.log("Tombol p dilepas (up)");
    }, 3000);
  }
  // Gift Rem
  if (data.giftName.toLowerCase() === "finger heart") {
    console.log(
      "Menerima gift coffee, memutar suara dan menekan tombol S selama 5 detik."
    );
    robot.keyToggle("s", "down");
    console.log("Tombol s ditekan (down)");

    setTimeout(() => {
      robot.keyToggle("s", "up");
      console.log("Tombol s dilepas (up)");
    }, 3000);
  }
  //restart
  if (data.giftName.toLowerCase() === "doughnut") {
    console.log(
      "Menerima gift doughnut, memutar suara dan menekan tombol S selama 5 detik."
    );
    robot.keyToggle("e", "down");
    console.log("Tombol e ditekan (down)");

    setTimeout(() => {
      robot.keyToggle("e", "up");
      console.log("Tombol e dilepas (up)");
    }, 500);
  }

  //Reset Emu
  if (data.giftName.toLowerCase() === "corgi" && !isProcessing) {
    isProcessing = true;
    console.log("Memproses gift...");

    // Logika keyboard terlebih dahulu
    robot.keyToggle("b", "down");
    console.log("Tombol B ditekan (down)");

    setTimeout(() => {
      robot.keyToggle("b", "up");
      console.log("Tombol B dilepas (up)");

      // Setelah tombol dilepas, setel musik
      player.play("./sound/sad.mp3", (err) => {
        if (err) {
          console.error("Error memutar suara:", err);
        } else {
          console.log("Suara diputar dengan sukses.");
        }
        // Reset setelah musik selesai
        isProcessing = false;
      });
    }, 100);
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
