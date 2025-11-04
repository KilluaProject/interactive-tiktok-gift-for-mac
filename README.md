🎬 TikTok Gift to Keyboard Trigger for mac os

A simple Node.js app that connects to TikTok Live and automatically triggers keyboard actions or sound effects whenever a gift is received during a livestream.

Perfect for streamers who want to make their streams more interactive — e.g. when someone sends a rose 🌹, your app can press a keyboard key or play a funny sound effect!

**🚀 Features**

- 🎁 Auto Trigger: Execute keyboard actions when TikTok gifts are received.
- 🔊 Sound Effects: Play custom sounds (e.g. “fart.mp3” 😆) for each gift.
=🕹 Keyboard Simulation: Uses robotjs to press and release keys.
- 💾 Gift Manager UI (Terminal):
- Add / Update / Delete gifts.
Configure multiple keys, durations, and sounds.
- 🌐 TikTok Live Integration: Connect and listen for real-time gifts.
- 🧠 Smart Queue System: Ensures gifts are processed one-by-one (no overlap).
- 🪄 Persistent Config: Gifts stored in gifts.json.

**📦 Requirements**
1. Install Node.js

Recommended: Node.js v20+
👉 https://nodejs.org/en/download/

2. Dependencies

Run this inside your project folder:
npm install

**Main dependencies:**

**tiktok-live-connector**
 – for TikTok Live connection
**inquirer**
 – interactive terminal UI
**robotjs**
 – simulate keyboard presses
**play-sound**
 – play audio files
**fs**
 – built-in file system

 3. macOS dependencies for robotjs
If you’re on macOS, make sure to install Xcode Command Line Tools first:

xcode-select --install

Then rebuild robotjs (important if Node version changes):
npm rebuild robotjs

⚙️ Configuration

All gift mappings are stored in gifts.json.
📁 Put your sound files in the same directory (e.g. fart.mp3, coffee.mp3).

🧩 How to Run ?

node index.js

Then follow the on-screen menu:
=== MENU UTAMA ===
> Sambungkan ke TikTok
> Kelola Gift
> Keluar

💡 Notes

- Gifts trigger key press and sound simultaneously.
- Each key has its own duration (in milliseconds).
- Gifts are executed sequentially to avoid overlapping triggers.
- You can edit gifts manually via the terminal (Add / Update / Delete).






