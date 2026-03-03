/* ================= UNLOCK FUNCTION ================= */
async function unlockNextLevel(levelNumber, elapsedTime) {
  const uid = localStorage.getItem("uid");
  if (!uid) return;

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const data = snap.data();
  const currentUnlocked = data.unlockedLevel || 1;
  const nextLevel = levelNumber + 1;

  const updates = {};

  if (nextLevel > currentUnlocked) {
    updates.unlockedLevel = nextLevel;
    localStorage.setItem("currentLevel", nextLevel);
  } else {
    localStorage.setItem("currentLevel", currentUnlocked);
  }

  const best = data.bestTimes?.[`level${levelNumber}`];
  if (!best || elapsedTime < best) {
    updates[`bestTimes.level${levelNumber}`] = elapsedTime;
  }

  if (Object.keys(updates).length > 0) {
    await updateDoc(ref, updates);
  }
}

/* ================= GAME STATE ================= */
const GRID = 9;
const SIZE = 52;

let startPos, doorPos, walls;
let keys = [];
let collectedKeys = new Set();

let player = null;
let pathStack = [];

let timeLeft = 180; // more time for 9x9
let timerInterval;
let startTime;

/* ================= DOM ================= */
const grid = document.getElementById("grid");
const items = document.getElementById("items");
const timer = document.getElementById("timer");
const modal = document.getElementById("levelModal");
const wallOverlay = document.getElementById("wall-overlay");

/* ================= START GAME ================= */
export function startGame(config) {
  ({ startPos, doorPos, walls } = config);

  keys = config.keys || [];
  collectedKeys = new Set();

  player = { ...startPos };
  pathStack = [];

  timeLeft = 180;
  startTime = Date.now();

  clearInterval(timerInterval);
  timer.textContent = `Time: ${timeLeft}`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) location.reload();
  }, 1000);

  render();
}

/* ================= RENDER ================= */
function render() {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${GRID}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${GRID}, 1fr)`;

  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      const cell = document.createElement("div");
      cell.className = "grid-cell";

      if (pathStack.some(p => p.r === r && p.c === c)) {
        cell.classList.add("path");
      }

      grid.appendChild(cell);
    }
  }

  items.innerHTML = "";

  drawItem("player", player);

  keys.forEach((key, index) => {
    if (!collectedKeys.has(index)) {
      drawItem("key", key);
    }
  });

  drawItem("door", doorPos);
}

/* ================= DRAW ITEM ================= */
function drawItem(type, pos) {
  const el = document.createElement("div");
  el.className = `item ${type}`;

  const img = document.createElement("img");
  img.src = `../assets/${type}.png`;
  el.appendChild(img);

  items.appendChild(el);

  const offset = (SIZE - 40) / 2;

  el.style.left = pos.c * SIZE + offset + "px";
  el.style.top  = pos.r * SIZE + offset + "px";
}

/* ================= WALL ================= */
function blocked(r, c, d) {
  return walls.has(`${r},${c}:${d}`);
}

function blinkWall(r, c, d) {
  const w = document.createElement("div");
  w.className = "wall-blink";
  const t = 6;

  if (d === "R") Object.assign(w.style,{left:(c+1)*SIZE+"px",top:r*SIZE+"px",width:t+"px",height:SIZE+"px"});
  if (d === "L") Object.assign(w.style,{left:c*SIZE+"px",top:r*SIZE+"px",width:t+"px",height:SIZE+"px"});
  if (d === "D") Object.assign(w.style,{left:c*SIZE+"px",top:(r+1)*SIZE+"px",width:SIZE+"px",height:t+"px"});
  if (d === "U") Object.assign(w.style,{left:c*SIZE+"px",top:r*SIZE+"px",width:SIZE+"px",height:t+"px"});

  wallOverlay.appendChild(w);
  setTimeout(() => w.remove(), 1000);
}

/* ================= CONFETTI ================= */
function launchConfetti() {
  for (let i = 0; i < 120; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";
    document.body.appendChild(conf);

    conf.style.left = Math.random() * window.innerWidth + "px";
    conf.style.background = `hsl(${Math.random()*360},70%,60%)`;

    setTimeout(() => conf.remove(), 2000);
  }
}

/* ================= MOVE PLAYER ================= */
function movePlayer(direction) {
  if (!player) return;

  let { r, c } = player;
  let nr = r, nc = c;

  if (direction === "U") nr--;
  if (direction === "D") nr++;
  if (direction === "L") nc--;
  if (direction === "R") nc++;

  if (nr < 0 || nc < 0 || nr >= GRID || nc >= GRID) return;

  if (blocked(r, c, direction)) {
  blinkWall(r, c, direction);

  // Reset everything
  player = { ...startPos };
  pathStack = [];

  // 🔥 RESET KEYS
  collectedKeys = new Set();

  render();
  return;
 }

  if (
    collectedKeys.size !== keys.length &&
    nr === doorPos.r &&
    nc === doorPos.c
  ) return;

  const last = pathStack[pathStack.length - 1];
  if (last && last.r === nr && last.c === nc) pathStack.pop();
  else pathStack.push({ r, c });
  
  player = { r: nr, c: nc };

  keys.forEach((key, index) => {
    if (
      !collectedKeys.has(index) &&
      nr === key.r &&
      nc === key.c
    ) {
      collectedKeys.add(index);
    }
  });

  render();

  if (
    collectedKeys.size === keys.length &&
    nr === doorPos.r &&
    nc === doorPos.c
  ) {
    clearInterval(timerInterval);

    setTimeout(() => {
      launchConfetti();
      modal.style.display = "flex";
    }, 600);
  }
}

/* ================= CONTROLS ================= */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") movePlayer("U");
  if (e.key === "ArrowDown") movePlayer("D");
  if (e.key === "ArrowLeft") movePlayer("L");
  if (e.key === "ArrowRight") movePlayer("R");
});

document.addEventListener("DOMContentLoaded", () => {

  document.querySelector(".top-zone")
    ?.addEventListener("click", () => movePlayer("U"));

  document.querySelector(".bottom-zone")
    ?.addEventListener("click", () => movePlayer("D"));

  document.querySelector(".left-zone")
    ?.addEventListener("click", () => movePlayer("L"));

  document.querySelector(".right-zone")
    ?.addEventListener("click", () => movePlayer("R"));

});

/* ================= LEVEL COMPLETE ================= */
document.getElementById("modalOk")?.addEventListener("click", async () => {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  await unlockNextLevel(window.LEVEL_NUMBER, elapsed);
  location.href = "../index.html";
});