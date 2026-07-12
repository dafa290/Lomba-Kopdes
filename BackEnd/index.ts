// Suppress annoying Bun WebSocket warnings from legacy 'ws' library
const originalStderrWrite = process.stderr.write;
// @ts-ignore
process.stderr.write = function (chunk: any, encoding?: any, callback?: any) {
  const str = chunk.toString();
  if (
    str.includes("ws.WebSocket 'upgrade'") || 
    str.includes("ws.WebSocket 'unexpected-response'")
  ) {
    if (callback) callback();
    return true;
  }
  return originalStderrWrite.apply(this, arguments);
};

import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { connectWhatsApp, getSocket, getLatestQR, simulateMessage, getSimulatedReplies, clearSimulatedReplies } from "./whatsapp.js";
import QRCode from "qrcode";
import { Route } from "./src/routes/Route.ts";
import { startCronJobs } from "./src/services/CronService.ts";
import { prisma } from "./lib/db.ts";

// Start WhatsApp bot (session tersimpan, tidak perlu scan ulang)
connectWhatsApp();

const app = new Elysia()
  .use(cors())
  .use(Route)
  .get("/", () => ({
    status: "ok",
    message: "Kopdes API is running 🚀",
  }))

  // Tampilkan QR Code di browser — scan dari sini!
  .get("/wa/qr", async ({ set }) => {
    const qr = getLatestQR();

    set.headers["Content-Type"] = "text/html";

    if (!qr) {
      return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WhatsApp QR - Kopdes</title>
  <style>
    body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0d1117; color: #fff; flex-direction: column; gap: 12px; }
    .icon { font-size: 64px; }
    h2 { margin: 0; font-size: 1.4rem; color: #e6edf3; }
    p { margin: 0; color: #8b949e; }
  </style>
</head>
<body>
  <div class="icon">✅</div>
  <h2>WhatsApp sudah terhubung!</h2>
  <p>Tidak ada QR Code yang perlu di-scan.</p>
</body>
</html>`;
    }

    const qrDataUrl = await QRCode.toDataURL(qr, { scale: 6, margin: 2 });

    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="20">
  <title>Scan QR - Kopdes Bot</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #0d1117;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh;
      color: #fff;
    }
    .card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      max-width: 380px;
      width: 100%;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    .logo { font-size: 40px; margin-bottom: 12px; }
    h1 { font-size: 1.4rem; margin-bottom: 6px; color: #e6edf3; }
    p { font-size: 0.85rem; color: #8b949e; margin-bottom: 24px; }
    .qr-wrap {
      background: #fff;
      border-radius: 12px;
      padding: 16px;
      display: inline-block;
      margin-bottom: 24px;
    }
    .qr-wrap img { display: block; width: 220px; height: 220px; }
    .steps { text-align: left; background: #0d1117; border-radius: 10px; padding: 16px; list-style: decimal; list-style-position: inside; }
    .steps li { font-size: 0.82rem; color: #8b949e; margin-bottom: 6px; }
    .steps li strong { color: #58a6ff; }
    .refresh { margin-top: 16px; font-size: 0.75rem; color: #484f58; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">📱</div>
    <h1>Scan QR Code</h1>
    <p>Hubungkan WhatsApp kamu ke Kopdes Bot</p>
    <div class="qr-wrap">
      <img src="${qrDataUrl}" alt="WhatsApp QR Code" />
    </div>
    <ol class="steps">
      <li>Buka <strong>WhatsApp</strong> di HP kamu</li>
      <li>Tap <strong>⋮</strong> → <strong>Linked Devices</strong></li>
      <li>Tap <strong>Link a Device</strong></li>
      <li>Scan QR Code di atas</li>
    </ol>
    <p class="refresh">🔄 Auto-refresh tiap 20 detik</p>
  </div>
</body>
</html>`;
  })

  // Cek status koneksi WhatsApp
  .get("/wa/status", () => {
    const sock = getSocket();
    const connected = sock?.user != null;
    return {
      connected,
      user: sock?.user ?? null,
    };
  })

  // Simulator Endpoints
  .get("/wa/simulator/users", async () => {
    try {
      const users = await prisma.anggota.findMany({
        include: { koperasi: true },
        orderBy: { nama: "asc" }
      });
      return { success: true, users };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  })

  .post("/wa/simulate-receive", async ({ body }) => {
    const { from, text } = body as { from: string; text: string };
    if (!from || !text) {
      return { success: false, message: "from dan text wajib diisi" };
    }
    try {
      // Clear old replies before simulation so we only capture the new ones
      clearSimulatedReplies();
      
      await simulateMessage(from, text);
      
      const replies = getSimulatedReplies();
      return { success: true, replies };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  })

  .get("/wa/simulate-replies", () => {
    return { success: true, replies: getSimulatedReplies() };
  })

  .post("/wa/simulator/reset", () => {
    clearSimulatedReplies();
    return { success: true };
  })

  .get("/wa/simulator", ({ set }) => {
    set.headers["Content-Type"] = "text/html; charset=utf-8";
    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KopDes WA Simulator</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #0b0f19; }
    .font-outfit { font-family: 'Outfit', sans-serif; }
    .whatsapp-bg { background-color: #efeae2; background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'); background-blend-mode: overlay; opacity: 0.95; }
    .scrollbar-thin::-webkit-scrollbar { width: 6px; }
    .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
    .scrollbar-thin::-webkit-scrollbar-thumb { background: #3b4252; border-radius: 3px; }
  </style>
</head>
<body class="text-slate-200 min-h-screen flex flex-col overflow-hidden">
  <!-- Header -->
  <header class="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10">
    <div class="flex items-center gap-3">
      <div class="text-3xl">🤖</div>
      <div>
        <h1 class="text-lg font-bold font-outfit text-emerald-400">KopDes WA Bot Simulator</h1>
        <p class="text-xs text-slate-400">Simulasi Interaksi Petani & SPPG Tanpa Kuota WA</p>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        Simulasi Aktif
      </div>
      <button onclick="resetSimulator()" class="px-4 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg border border-slate-700 transition">
        Reset Chat
      </button>
    </div>
  </header>

  <!-- Content Grid -->
  <div class="flex-1 flex overflow-hidden">
    <!-- Panel 1: Petani / Farmer POV -->
    <div class="flex-1 flex flex-col border-r border-slate-800">
      <div class="bg-slate-850 p-4 border-b border-slate-800 flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-400">POV: Petani (Supplier)</label>
          <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono" id="farmer-status">Belum Dipilih</span>
        </div>
        <div class="flex gap-2">
          <select id="farmer-select" onchange="selectUser('farmer')" class="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500">
            <option value="">-- Pilih Petani --</option>
          </select>
        </div>
        <!-- Profile summary card -->
        <div id="farmer-profile" class="hidden grid grid-cols-3 gap-2 bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-xs">
          <div><p class="text-slate-500">Saldo</p><p class="font-bold text-emerald-400" id="farmer-balance">Rp 0</p></div>
          <div><p class="text-slate-500">Credit Score</p><p class="font-bold text-sky-400" id="farmer-score">0</p></div>
          <div><p class="text-slate-500">Koperasi</p><p class="font-bold text-slate-300 truncate" id="farmer-koperasi">-</p></div>
        </div>
      </div>
      <!-- WhatsApp screen -->
      <div class="flex-1 whatsapp-bg overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin" id="farmer-chat">
        <!-- System greeting -->
        <div class="mx-auto bg-slate-900/90 border border-slate-800 rounded-lg py-2 px-4 text-xs text-slate-400 text-center max-w-sm">
          Silakan pilih petani untuk mensimulasikan chat WhatsApp petani ke bot Koperasi.
        </div>
      </div>
      <!-- Message input -->
      <div class="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
        <input type="text" id="farmer-input" placeholder="Ketik pesan WhatsApp disini... (misal: SALDO, TARIK 50000)" class="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500" onkeydown="handleKeyPress(event, 'farmer')">
        <button onclick="sendMessage('farmer')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition">Kirim</button>
      </div>
    </div>

    <!-- Panel 2: SPPG Admin POV -->
    <div class="flex-1 flex flex-col border-r border-slate-800">
      <div class="bg-slate-850 p-4 border-b border-slate-800 flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-400">POV: Admin SPPG (Pembeli)</label>
          <span class="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-mono" id="sppg-status">Belum Dipilih</span>
        </div>
        <div class="flex gap-2">
          <select id="sppg-select" onchange="selectUser('sppg')" class="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500">
            <option value="">-- Pilih Admin SPPG --</option>
          </select>
        </div>
        <!-- Profile summary card -->
        <div id="sppg-profile" class="hidden grid grid-cols-2 gap-2 bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-xs">
          <div><p class="text-slate-500">Koperasi Terkait</p><p class="font-bold text-slate-300 truncate" id="sppg-koperasi">-</p></div>
          <div><p class="text-slate-500">Role</p><p class="font-bold text-sky-400">Admin SPPG / Juri</p></div>
        </div>
      </div>
      <!-- WhatsApp screen -->
      <div class="flex-1 whatsapp-bg overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin" id="sppg-chat">
        <!-- System greeting -->
        <div class="mx-auto bg-slate-900/90 border border-slate-800 rounded-lg py-2 px-4 text-xs text-slate-400 text-center max-w-sm">
          Silakan pilih SPPG untuk mensimulasikan chat SPPG ke bot Koperasi.
        </div>
      </div>
      <!-- Message input -->
      <div class="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
        <input type="text" id="sppg-input" placeholder="Ketik pesan WhatsApp disini... (misal: DITERIMA-12)" class="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500" onkeydown="handleKeyPress(event, 'sppg')">
        <button onclick="sendMessage('sppg')" class="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition">Kirim</button>
      </div>
    </div>

    <!-- Panel 3: Control Panel & Live Logs -->
    <div class="w-96 bg-slate-900 p-4 flex flex-col gap-4 overflow-y-auto scrollbar-thin">
      <h3 class="text-sm font-bold font-outfit uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">Simulator Control</h3>
      
      <!-- Quick Actions -->
      <div class="flex flex-col gap-2">
        <label class="text-xs font-semibold text-slate-400">Quick Actions (Nomor Terpilih)</label>
        <button onclick="triggerQuickAction('daftar juri')" class="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-2 px-3 text-xs font-medium rounded-lg text-left transition flex justify-between items-center">
          <span>Daftar sebagai Juri (Bypass)</span>
          <span class="text-[10px] bg-slate-700 px-2 py-0.5 rounded font-mono">daftar juri</span>
        </button>
        <button onclick="triggerQuickAction('SALDO')" class="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-2 px-3 text-xs font-medium rounded-lg text-left transition flex justify-between items-center">
          <span>Cek Saldo</span>
          <span class="text-[10px] bg-slate-700 px-2 py-0.5 rounded font-mono">SALDO</span>
        </button>
      </div>

      <!-- Realtime System log -->
      <div class="flex-1 flex flex-col">
        <label class="text-xs font-semibold text-slate-400 mb-2">Live System Log (Trace)</label>
        <div id="system-log" class="flex-1 bg-black/40 border border-slate-800 rounded-lg p-3 font-mono text-[10px] text-emerald-400 overflow-y-auto scrollbar-thin min-h-[300px]">
          [INFO] System initialized.<br>
          [INFO] Ready for messages.
        </div>
      </div>
    </div>
  </div>

  <!-- JavaScript logic -->
  <script>
    let users = [];
    let activeFarmer = null;
    let activeSppg = null;
    let chats = {
      farmer: [],
      sppg: []
    };

    // Load users on mount
    async function loadUsers() {
      try {
        const res = await fetch('/wa/simulator/users');
        const data = await res.json();
        if (data.success) {
          users = data.users;
          populateSelects();
        }
      } catch (err) {
        logSystem(\`[ERROR] Gagal memuat user: \${err.message}\`);
      }
    }

    function populateSelects() {
      const farmerSelect = document.getElementById('farmer-select');
      const sppgSelect = document.getElementById('sppg-select');
      
      // Save current values if possible
      const prevFarmer = farmerSelect.value;
      const prevSppg = sppgSelect.value;

      farmerSelect.innerHTML = '<option value="">-- Pilih Petani --</option>';
      sppgSelect.innerHTML = '<option value="">-- Pilih Admin SPPG --</option>';

      users.forEach(u => {
        const option = document.createElement('option');
        option.value = u.noWhatsapp;
        option.textContent = \`\${u.nama} (\${u.kategoriUsaha} - \${u.noWhatsapp})\`;
        
        if (u.kategoriUsaha === 'Admin SPPG' || u.kategoriUsaha === 'Juri') {
          sppgSelect.appendChild(option);
        } else {
          farmerSelect.appendChild(option);
        }
      });

      // Restore values
      if (prevFarmer) farmerSelect.value = prevFarmer;
      if (prevSppg) sppgSelect.value = prevSppg;
    }

    function selectUser(type) {
      const select = document.getElementById(\`\${type}-select\`);
      const val = select.value;
      const user = users.find(u => u.noWhatsapp === val);
      
      if (type === 'farmer') {
        activeFarmer = user;
        const profileDiv = document.getElementById('farmer-profile');
        if (user) {
          profileDiv.classList.remove('hidden');
          document.getElementById('farmer-balance').textContent = \`Rp \${Number(user.saldo).toLocaleString('id-ID')}\`;
          document.getElementById('farmer-score').textContent = user.creditScore;
          document.getElementById('farmer-koperasi').textContent = user.koperasi?.namaKoperasi || 'Koperasi';
          document.getElementById('farmer-status').textContent = user.noWhatsapp;
          logSystem(\`[POV CHANGED] Active Farmer: \${user.nama} (\${user.noWhatsapp})\`);
        } else {
          profileDiv.classList.add('hidden');
          document.getElementById('farmer-status').textContent = 'Belum Dipilih';
        }
      } else {
        activeSppg = user;
        const profileDiv = document.getElementById('sppg-profile');
        if (user) {
          profileDiv.classList.remove('hidden');
          document.getElementById('sppg-koperasi').textContent = user.koperasi?.namaKoperasi || 'Koperasi';
          document.getElementById('sppg-status').textContent = user.noWhatsapp;
          logSystem(\`[POV CHANGED] Active SPPG: \${user.nama} (\${user.noWhatsapp})\`);
        } else {
          profileDiv.classList.add('hidden');
          document.getElementById('sppg-status').textContent = 'Belum Dipilih';
        }
      }
    }

    function logSystem(msg) {
      const logDiv = document.getElementById('system-log');
      const time = new Date().toLocaleTimeString('id-ID');
      logDiv.innerHTML += \`<br><span class="text-slate-500">[\${time}]</span> \${msg}\`;
      logDiv.scrollTop = logDiv.scrollHeight;
    }

    function handleKeyPress(e, type) {
      if (e.key === 'Enter') {
        sendMessage(type);
      }
    }

    async function sendMessage(type) {
      const input = document.getElementById(\`\${type}-input\`);
      const text = input.value.trim();
      if (!text) return;

      const user = type === 'farmer' ? activeFarmer : activeSppg;
      if (!user) {
        alert(\`Pilih \${type === 'farmer' ? 'Petani' : 'Admin SPPG'} terlebih dahulu!\`);
        return;
      }

      input.value = '';
      
      // Append user msg to UI
      appendMessage(type, user.nama || user.noWhatsapp, text, true);
      logSystem(\`[SEND] \${user.nama} -> \${text}\`);

      try {
        const res = await fetch('/wa/simulate-receive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ from: user.noWhatsapp, text: text })
        });
        const data = await res.json();
        
        if (data.success && data.replies) {
          logSystem(\`[SUCCESS] Diproses oleh AI.\`);
          
          // Route replies to correct chat screens based on who they were sent to
          data.replies.forEach(reply => {
            logSystem(\`[BOT REPLY] Ke \${reply.from}: "\${reply.text}"\`);
            
            // Check if matches active farmer
            if (activeFarmer && matchNumber(reply.from, activeFarmer.noWhatsapp)) {
              appendMessage('farmer', 'Kopdes Bot', reply.text, false);
            } 
            // Check if matches active sppg
            else if (activeSppg && matchNumber(reply.from, activeSppg.noWhatsapp)) {
              appendMessage('sppg', 'Kopdes Bot', reply.text, false);
            }
            // If it belongs to someone else (e.g. blast to peer penjamin)
            else {
              logSystem(\`[BLAST ROUTED] Pesan blast dikirim ke nomor lain: \${reply.from} - "\${reply.text}"\`);
              // Let's also show it in both chat windows as a system notification if it's a loan request blast
              if (reply.text.includes('TANGGUNG RENTENG') || reply.text.includes('PINJAMAN')) {
                appendMessage('sppg', \`[BLAST ke \${reply.from}]\`, reply.text, false);
                appendMessage('farmer', \`[BLAST ke \${reply.from}]\`, reply.text, false);
              }
            }
          });
        } else {
          logSystem(\`[FAILED] Gagal memproses: \${data.message}\`);
        }
      } catch (err) {
        logSystem(\`[ERROR] Gagal mengirim: \${err.message}\`);
      }
      
      // Reload profile variables in background to show balance updates
      setTimeout(async () => {
        await loadUsers();
        // Update headers dynamically
        if (activeFarmer) {
          const freshFarmer = users.find(u => u.noWhatsapp === activeFarmer.noWhatsapp);
          if (freshFarmer) {
            activeFarmer = freshFarmer;
            document.getElementById('farmer-balance').textContent = \`Rp \${Number(freshFarmer.saldo).toLocaleString('id-ID')}\`;
            document.getElementById('farmer-score').textContent = freshFarmer.creditScore;
          }
        }
      }, 800);
    }

    function matchNumber(n1, n2) {
      if (!n1 || !n2) return false;
      const clean1 = n1.replace(/\\D/g, '').slice(-9);
      const clean2 = n2.replace(/\\D/g, '').slice(-9);
      return clean1 === clean2;
    }

    function triggerQuickAction(text) {
      const activeTab = activeFarmer ? 'farmer' : (activeSppg ? 'sppg' : null);
      if (!activeTab) {
        alert('Pilih salah satu user di dropdown terlebih dahulu!');
        return;
      }
      document.getElementById(\`\${activeTab}-input\`).value = text;
      sendMessage(activeTab);
    }

    function appendMessage(type, sender, text, isMe) {
      const chatDiv = document.getElementById(\`\${type}-chat\`);
      const bubble = document.createElement('div');
      
      bubble.className = isMe 
        ? 'ml-auto max-w-[85%] bg-emerald-600 text-white rounded-l-lg rounded-tr-lg p-3 text-sm shadow-md'
        : 'mr-auto max-w-[85%] bg-slate-800 text-slate-100 rounded-r-lg rounded-tl-lg p-3 text-sm border border-slate-700 shadow-md';
      
      bubble.innerHTML = \`
        <div class="text-[10px] text-slate-400 font-bold mb-1">\${sender}</div>
        <div class="whitespace-pre-line">\${text}</div>
        <div class="text-[9px] text-slate-500 text-right mt-1">\${new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</div>
      \`;
      
      chatDiv.appendChild(bubble);
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }

    async function resetSimulator() {
      await fetch('/wa/simulator/reset', { method: 'POST' });
      document.getElementById('farmer-chat').innerHTML = '<div class="mx-auto bg-slate-900/90 border border-slate-800 rounded-lg py-2 px-4 text-xs text-slate-400 text-center max-w-sm">Chat diset ulang. Silakan ketik pesan.</div>';
      document.getElementById('sppg-chat').innerHTML = '<div class="mx-auto bg-slate-900/90 border border-slate-800 rounded-lg py-2 px-4 text-xs text-slate-400 text-center max-w-sm">Chat diset ulang. Silakan ketik pesan.</div>';
      logSystem('[SYSTEM] Chat cleared.');
    }

    // Init
    loadUsers();
  </script>
</body>
</html>`;
  })

  // Kirim pesan via API
  .post("/wa/send", async ({ body }) => {
    const sock = getSocket();
    if (!sock?.user) {
      return { success: false, message: "WhatsApp belum terhubung" };
    }

    const { number, message } = body as { number: string; message: string };

    if (!number || !message) {
      return { success: false, message: "number dan message wajib diisi" };
    }

    const jid = number.includes("@")
      ? number
      : `${number.replace(/\D/g, "")}@s.whatsapp.net`;

    try {
      await sock.sendMessage(jid, { text: message });
      return { success: true, message: `Pesan terkirim ke ${jid}` };
    } catch (err) {
      return { success: false, message: (err as Error).message };
    }
  })

  .listen(4444);

console.log(`🦊 Koperasi Server is running at ${app.server?.hostname}:${app.server?.port}`);

// ⏰ Mulai Cron Job Auto-Blast Orchestra (tiap 1 menit)
// Ganti interval di CronService.ts — 60s untuk dev, 5 menit untuk production
startCronJobs(getSocket);