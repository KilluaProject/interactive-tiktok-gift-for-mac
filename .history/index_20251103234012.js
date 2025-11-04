const { WebcastPushConnection } = require("tiktok-live-connector");
const robot = require("robotjs");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const play = require("play-sound")(); // npm install play-sound

const GIFT_FILE = path.join(__dirname, "gifts.json");

// Load gift mapping dari JSON
let giftMap = {};
if (fs.existsSync(GIFT_FILE)) {
  giftMap = JSON.parse(fs.readFileSync(GIFT_FILE, "utf-8"));
}

// Connect ke akun TikTok
const connection = new WebcastPushConnection("@suryainimas");

connection.on("gift", async (data) => {
  console.log(`\n🎁 Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  console.log(`Jumlah: ${data.repeatCount}, Harga Koin: ${data.diamondCount}`);

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

  if (gift.sounds) {
    gift.sounds.forEach(sound => {
      play.play(sound.file, { afplay: ['-v', sound.volume] }, err => {
        if (err) console.log("Error play sound:", err);
      });
    });
  }
});

connection.connect()
  .then(() => {
    console.log("✅ Terhubung ke TikTok Live!");
  })
  .catch((err) => {
    console.error("❌ Gagal terhubung:", err);
  });

// Terminal UI untuk tambah/edit gift
async function startUI() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Pilih aksi:",
        choices: ["Tambah gift", "Edit gift", "Hapus gift", "Lihat gift", "Keluar"]
      }
    ]);

    if (action === "Keluar") process.exit(0);

    if (action === "Lihat gift") {
      console.log("\n📦 Gift list:");
      console.log(JSON.stringify(giftMap, null, 2));
      continue;
    }

    const { name } = await inquirer.prompt({
      type: "input",
      name: "name",
      message: "Nama gift (misal: rose):"
    });

    if (action === "Hapus gift") {
      delete giftMap[name.toLowerCase()];
      console.log(`Gift "${name}" dihapus`);
    } else {
      const { keys } = await inquirer.prompt({
        type: "input",
        name: "keys",
        message: "Tombol yang ingin di-trigger (pisah koma, misal: s,d,f):"
      });
      const { durations } = await inquirer.prompt({
        type: "input",
        name: "durations",
        message: "Durasi setiap tombol dalam ms (pisah koma, misal: 3000,200,200):"
      });
      const { sounds } = await inquirer.prompt({
        type: "input",
        name: "sounds",
        message: "File suara dengan volume (format: file.mp3:1,other.mp3:0.7), kosong jika tidak ada:"
      });

      giftMap[name.toLowerCase()] = {
        keys: keys.split(",").map(k => k.trim()),
        durations: durations.split(",").map(d => parseInt(d.trim())),
        sounds: sounds
          ? sounds.split(",").map(s => {
              const [file, vol] = s.split(":");
              return { file: file.trim(), volume: parseFloat(vol) };
            })
          : []
      };

      console.log(`Gift "${name}" berhasil diupdate/ditambah`);
    }

    fs.writeFileSync(GIFT_FILE, JSON.stringify(giftMap, null, 2), "utf-8");
  }
}

startUI();
