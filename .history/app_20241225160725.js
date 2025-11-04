const { WebcastPushConnection } = require("tiktok-live-connector");
const robot = require("robotjs");
const player = require("play-sound")(); // Library untuk memutar suara
const connection = new WebcastPushConnection("@siigudel");

let hasPlayedIndonesiaRaya = false;
let fingerHeartPlayed = false;

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);

  // Gift untuk restart (finger heart)
  // if (data.giftName.toLowerCase() === "finger heart") {
  //   console.log(
  //     "Menerima gift finger heart, memutar suara dan menekan tombol P, U, dan K."
  //   );

  //   if (!fingerHeartPlayed) {
  //     player.play("./Sound/goblok.mp3", (err) => {
  //       if (err) {
  //         console.error("Gagal memutar sound:", err);
  //       } else {
  //         console.log("Sound effect diputar.");
  //       }
  //     });
  //     fingerHeartPlayed = true; // Set variabel agar sound tidak diputar lagi
  //   }

  //   setTimeout(() => {
  //     robot.keyToggle("p", "down");
  //     console.log("Tombol P ditekan (down)");
  //     setTimeout(() => {
  //       robot.keyToggle("p", "up");
  //       console.log("Tombol P dilepas (up)");
  //     }, 200);
  //   }, 0);

  //   setTimeout(() => {
  //     robot.keyToggle("u", "down");
  //     console.log("Tombol U ditekan (down)");
  //     setTimeout(() => {
  //       robot.keyToggle("u", "up");
  //       console.log("Tombol U dilepas (up)");
  //     }, 200);
  //   }, 500);

  //   setTimeout(() => {
  //     robot.keyToggle("b", "down");
  //     console.log("Tombol b ditekan (down)");
  //     setTimeout(() => {
  //       robot.keyToggle("b", "up");
  //       console.log("Tombol b dilepas (up)");
  //     }, 200);
  //   }, 1000);
  // }

  // Gift untuk nengok belakang
  if (data.giftName.toLowerCase() === "coffee") {
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
  //restart game
  if (data.giftName.toLowerCase() === "gg") {
    console.log(
      "Menerima gift gg, memutar suara dan menekan tombol S selama 5 detik."
    );
    robot.keyToggle("t", "down");
    console.log("Tombol k ditekan (down)");

    setTimeout(() => {
      robot.keyToggle("t", "up");
      console.log("Tombol k dilepas (up)");
    }, 500);
  }

  //Reset Emu
  if (data.giftName.toLowerCase() === "confetti") {
    if (!hasPlayedIndonesiaRaya) {
      console.log("Menerima gift confetti, memutar lagu Indonesia Raya.");

      // Memutar lagu Indonesia Raya
      player.play("./Sound/tanahairku.mp3", (err) => {
        if (err) console.error("Gagal memutar lagu Indonesia Raya:", err);
      });

      // Menekan tombol 'n' selama 0.5 detik
      console.log("Menekan tombol 'n' selama 0.5 detik.");
      robot.keyToggle("n", "down"); // Tekan tombol 'n'
      setTimeout(() => {
        robot.keyToggle("b", "up"); // Lepaskan tombol 'n' setelah 0.5 detik
      }, 500);

      // Set flag to true to prevent the song from playing again
      hasPlayedIndonesiaRaya = true;
    } else {
      console.log(
        "Lagu Indonesia Raya sudah diputar, mengabaikan gift Hi Bear."
      );
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
