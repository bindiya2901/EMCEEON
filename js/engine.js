/* ================= SAFE UNLOCK FUNCTION ================= */
async function unlockNextLevel(levelNumber, elapsedTime) {
  const uid = localStorage.getItem("uid");
  if (!uid) return;

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const data = snap.data();
  const currentUnlocked = data.unlockedLevel || 1;
  const updates = {};
  const nextLevel = levelNumber + 1;

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
let GRID, SIZE, startPos, keyPos, doorPos, walls;
let player, hasKey, pathStack;
let timeLeft = 180;
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
  ({ GRID, SIZE, startPos, keyPos, doorPos, walls } = config);

  player = { ...startPos };
  hasKey = false;
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

  grid.style.gridTemplateColumns = `repeat(${GRID}, ${SIZE}px)`;
  grid.style.gridTemplateRows = `repeat(${GRID}, ${SIZE}px)`;

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

  if (!hasKey) drawItem("key", keyPos);

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

  const offset = (SIZE - 36) / 2;

  el.style.transform = `
    translate(
      ${pos.c * SIZE + offset}px,
      ${pos.r * SIZE + offset}px
    )
  `;
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
  for (let i = 0; i < 80; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";
    document.body.appendChild(conf);

    conf.style.left = Math.random() * window.innerWidth + "px";
    conf.style.background = `hsl(${Math.random()*360},70%,60%)`;

    setTimeout(() => conf.remove(), 2000);
  }
}

/* ================= MOVE PLAYER (ONLY MOVEMENT SYSTEM) ================= */
function movePlayer(direction) {

  if (!player) return;

  let { r, c } = player;
  let nr = r, nc = c, d = "";

  if (direction === "U") { nr--; d="U"; }
  if (direction === "R") { nc++; d="R"; }
  if (direction === "D") { nr++; d="D"; }
  if (direction === "L") { nc--; d="L"; }

  if (nr < 0 || nc < 0 || nr >= GRID || nc >= GRID) return;

  if (blocked(r,c,d)) {
    blinkWall(r,c,d);
    player = { ...startPos };
    hasKey = false;
    pathStack = [];
    render();
    return;
  }

  if (!hasKey && nr === doorPos.r && nc === doorPos.c) return;

  const last = pathStack[pathStack.length - 1];
  if (last && last.r === nr && last.c === nc) pathStack.pop();
  else pathStack.push({ r, c });

  player = { r: nr, c: nc };

  if (!hasKey && nr === keyPos.r && nc === keyPos.c) {
    hasKey = true;
  }

  render();

  if (hasKey && nr === doorPos.r && nc === doorPos.c) {
    clearInterval(timerInterval);

    setTimeout(() => {
      launchConfetti();
      modal.style.display = "flex";
    }, 500);
  }
}

/* ================= CONTROLS ================= */

// Keyboard
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") movePlayer("U");
  if (e.key === "ArrowDown") movePlayer("D");
  if (e.key === "ArrowLeft") movePlayer("L");
  if (e.key === "ArrowRight") movePlayer("R");
});

// Mobile buttons
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("upBtn")?.addEventListener("click", () => movePlayer("U"));
  document.getElementById("downBtn")?.addEventListener("click", () => movePlayer("D"));
  document.getElementById("leftBtn")?.addEventListener("click", () => movePlayer("L"));
  document.getElementById("rightBtn")?.addEventListener("click", () => movePlayer("R"));
});

/* ================= LEVEL COMPLETE ================= */
document.getElementById("modalOk")?.addEventListener("click", async () => {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  await unlockNextLevel(window.LEVEL_NUMBER, elapsed);
  location.href = "../index.html";
});