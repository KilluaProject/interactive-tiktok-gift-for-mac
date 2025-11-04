const { WebcastPushConnection } = require("tiktok-live-connector");
const robot = require("robotjs");
const player = require("play-sound")();
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const giftJsonPath = path.join(__dirname, "gifts.json");
let giftMap = JSON.parse(fs.readFileSync(giftJsonPath, "utf8"));

const connection = new WebcastPushConnection("@suryainimas");

let giftQueue = [];
let isProcessing = false;

// play sounds
function playSounds(sounds) {
  if (!sounds) return;
  sounds.forEach(sound => {
    const soundPath = path.join(__dirname, "sounds", sound.file);
    player.play(soundPath, { afplay: ["-v", sound.volume] }, err => {
      if (err) console.log("Error mainin suara:", err);
    });
  });
}

// proses gift queue
function processGiftQueue() {
  if (giftQueue.length === 0 || isProcessing) return;

  isProcessing = true;
  const gift = giftQueue.shift();

  gift.keys.forEach((key, i) => {
    setTimeout(() => {
      robot.keyToggle(key, "down");
      setTimeout(() => robot.keyToggle(key, "up"), gift.durations[i]);
    }, i * 500);
  });

  playSounds(gift.sounds);

  setTimeout(() => {
    isProcessing = false;
    processGiftQueue();
  }, Math.max(...gift.durations) + 500);
}

// TikTok Live listener
connection.on("gift", (data) => {
  const giftName = data.giftName.toLowerCase();
  const mapping = giftMap[giftName];
  if (!mapping) return;

  console.log(`Gift diterima: ${data.giftName} dari ${data.uniqueId}`);
  giftQueue.push({ ...mapping, name: giftName });
  processGiftQueue();
});

connection.connect()
  .then(() => console.log("Terhubung ke TikTok Live!"))
  .catch(err => console.error("Gagal terhubung:", err));

// ==========================
// TERMINAL UI
// ==========================
async function startUI() {
  while (true) {
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "Apa yang ingin dilakukan?",
      choices: [
        "Trigger Gift Manual",
        "Lihat Semua Gift",
        "Tambah Gift Baru",
        "Keluar"
      ]
    });

    if (action === "Keluar") break;

    if (action === "Lihat Semua Gift") {
      console.log("Daftar Gift:");
      Object.keys(giftMap).forEach(g => console.log(`- ${g}`));
      continue;
    }

    if (action === "Trigger Gift Manual") {
      const { giftName } = await inquirer.prompt({
        type: "list",
        name: "giftName",
        message: "Pilih gift untuk trigger:",
        choices: Object.keys(giftMap)
      });

      const gift = { ...giftMap[giftName] };

      for (let i = 0; i < gift.keys.length; i++) {
        const { duration } = await inquirer.prompt({
          type: "input",
          name: "duration",
          message: `Durasi tombol '${gift.keys[i]}' (ms, default: ${gift.durations[i]}):`
        });
        if (duration) gift.durations[i] = parseInt(duration);
      }

      giftQueue.push({ ...gift, name: giftName });
      processGiftQueue();
      console.log(`Gift '${giftName}' sudah ditambahkan ke queue!`);
      continue;
    }

    if (action === "Tambah Gift Baru") {
      const { newName } = await inquirer.prompt({
        type: "input",
        name: "newName",
        message: "Masukkan nama gift baru:"
      });

      const { keys } = await inquirer.prompt({
        type: "input",
        name: "keys",
        message: "Masukkan key bind (pisahkan dengan koma, contoh p,u,b):"
      });

      const { durations } = await inquirer.prompt({
        type: "input",
        name: "durations",
        message: "Masukkan durasi tiap key (ms, pisahkan dengan koma, contoh 200,300,250):"
      });

      const { sounds } = await inquirer.prompt({
        type: "input",
        name: "sounds",
        message: "Masukkan suara dan volume (format: file.mp3:volume, pisahkan koma jika lebih dari satu):"
      });

      const soundArr = sounds.split(",").map(s => {
        const [file, vol] = s.split(":");
        return { file: file.trim(), volume: parseFloat(vol) || 1 };
      });

      giftMap[newName.toLowerCase()] = {
        keys: keys.split(",").map(k => k.trim()),
        durations: durations.split(",").map(d => parseInt(d.trim())),
        sounds: soundArr
      };

      // Simpan ke gifts.json
      fs.writeFileSync(giftJsonPath, JSON.stringify(giftMap, null, 2), "utf8");
      console.log(`Gift '${newName}' berhasil ditambahkan dan disimpan!`);
    }
  }

  console.log("UI terminal ditutup.");
}

startUI();
