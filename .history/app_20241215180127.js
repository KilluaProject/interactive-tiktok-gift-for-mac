const { WebcastPushConnection } = require("tiktok-live-connector");
const robot = require("robotjs");
const connection = new WebcastPushConnection("@siigudel");

let isProcessingGift = false;

connection.on("gift", (data) => {
  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);
  console.log(`Gift diterima: ${data.giftName}`);

  if (isProcessingGift) {
    console.log("Gift sudah diproses, mengabaikan eksekusi berikutnya.");
    return;
  }

  isProcessingGift = true;

  // Gift untuk restart
  if (data.giftName.toLowerCase() === "hi bear") {
    console.log("Menerima gift hi bear, menekan tombol P, U, dan K.");

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
        isProcessingGift = false;
      }, 200);
    }, 1000);
  } else {
    isProcessingGift = false;
  }
  // if (data.giftName.toLowerCase() === "doughnut") {
  //   console.log("Menerima gift doughnut, menekan tombol P, U, dan K.");

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
  //     robot.keyToggle("k", "down");
  //     console.log("Tombol K ditekan (down)");
  //     setTimeout(() => {
  //       robot.keyToggle("k", "up");
  //       console.log("Tombol K dilepas (up)");
  //       isProcessingGift = false;
  //     }, 200);
  //   }, 1000);
  // } else {
  //   isProcessingGift = false;
  // }
  // Gift untuk nengok belakang
  if (data.giftName.toLowerCase() === "finger heart") {
    console.log(
      "Menerima gift finger heart, menekan tombol o selama 10 detik "
    );

    robot.keyToggle("o", "down");
    console.log("Tombol o ditekan (down)");

    setTimeout(() => {
      robot.keyToggle("o", "up");
      console.log("tombol o dilepas (up)");
    }, 10000);
  }
  // Gift untuk ngerem
  if (data.giftName.toLowerCase() === "gg") {
    console.log("Menerima gift gg, menekan tombol s selama 10 detik.");

    robot.keyToggle("s", "down");
    console.log("Tombol S ditekan (down)");

    setTimeout(() => {
      robot.keyToggle("s", "up");
      console.log("Tombol S dilepas (up)");
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
