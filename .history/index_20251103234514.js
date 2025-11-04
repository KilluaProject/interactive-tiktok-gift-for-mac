// index.js
const fs = require("fs");
const inquirer = require("inquirer");
let giftMap = require("./gifts.json");
let connection = null;
let isProcessing = false;

// Fungsi untuk menyimpan giftMap ke JSON
function saveGifts() {
  fs.writeFileSync("gifts.json", JSON.stringify(giftMap, null, 2));
}

// ==================== TikTok Connect ====================
async function connectTikTok() {
  const { WebcastPushConnection } = require("tiktok-live-connector");
  const robot = require("robotjs");

  const { username } = await inquirer.prompt({
    type: "input",
    name: "username",
    message: "Masukkan username TikTok:",
  });

  connection = new WebcastPushConnection(username);

  connection.on("gift", (data) => {
    console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
    const gift = giftMap[data.giftName.toLowerCase()];
    if (!gift) return;

    gift.keys.forEach((key, i) => {
      setTimeout(() => {
        robot.keyToggle(key, "down");
        setTimeout(() => {
          robot.keyToggle(key, "up");
        }, gift.durations[i]);
      }, i * 500);
    });

    if (gift.sounds && gift.sounds.length) {
      const player = require("play-sound")({});
      gift.sounds.forEach((s) => {
        player.play(s.file, { afplay: ["-v", s.volume] }, (err) => {
          if (err) console.log("Error play sound:", err);
        });
      });
    }
  });

  connection
    .connect()
    .then(() => {
      console.log("✅ Berhasil terhubung ke TikTok Live!");
    })
    .catch((err) => {
      console.error("❌ Gagal terhubung:", err);
      connection = null;
    });
}

// ==================== Kelola Gift ====================
async function manageGift() {
  let exit = false;
  while (!exit) {
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "Pilih aksi gift:",
      choices: ["Tambah/Update Gift", "Hapus Gift", "List Gift", "Kembali"],
    });

    if (action === "Tambah/Update Gift") {
      const { name, keys, durations, sounds } = await inquirer.prompt([
        { type: "input", name: "name", message: "Nama gift:" },
        { type: "input", name: "keys", message: "Key bind (pisah koma):" },
        { type: "input", name: "durations", message: "Durasi ms (pisah koma):" },
        { type: "input", name: "sounds", message: "Sounds (file:volume, pisah koma, optional):", default: "" },
      ]);

      giftMap[name.toLowerCase()] = {
        keys: keys.split(",").map((k) => k.trim()),
        durations: durations.split(",").map((d) => parseInt(d.trim())),
        sounds: sounds
          ? sounds.split(",").map((s) => {
              const [file, vol] = s.split(":");
              return { file: file.trim(), volume: vol ? parseFloat(vol.trim()) : 1 };
            })
          : [],
      };
      saveGifts();
      console.log("✅ Gift berhasil disimpan!");
    } else if (action === "Hapus Gift") {
      const { name } = await inquirer.prompt({
        type: "list",
        name: "name",
        message: "Pilih gift untuk dihapus:",
        choices: Object.keys(giftMap),
      });
      delete giftMap[name];
      saveGifts();
      console.log("🗑 Gift berhasil dihapus!");
    } else if (action === "List Gift") {
      console.log(Object.keys(giftMap));
    } else exit = true;
  }
}

// ==================== Menu Utama ====================
async function mainMenu() {
  let exit = false;
  while (!exit) {
    const { menu } = await inquirer.prompt({
      type: "list",
      name: "menu",
      message: "=== MENU UTAMA ===",
      choices: ["Sambungkan ke TikTok", "Kelola Gift", "Keluar"],
    });

    if (menu === "Sambungkan ke TikTok") {
      await connectTikTok();
    } else if (menu === "Kelola Gift") {
      await manageGift();
    } else exit = true;
  }
  console.log("👋 Bye!");
}

// ==================== Start App ====================
mainMenu();
