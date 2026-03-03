import { startGame } from "../js/engine.js";

window.LEVEL_NUMBER = 5;

startGame({
  GRID: 5,
  SIZE: 52,

  startPos: { r: 1, c: 0 },
  keyPos:   { r: 4, c: 1 },
  doorPos:  { r: 2, c: 4 },

  walls: new Set([
    "1,2:R", "1,3:L",      
    "2,2:R", "2,3:L",
    "2,3:R", "2,4:L",
    "3,3:R", "3,4:L",
    "4,0:R", "4,1:L",
    "4,3:R", "4,4:L",
    
    "0,0:D", "1,0:U",
    "0,1:D", "1,1:U",
    "0,3:D", "1,3:U",
    "0,4:D", "1,4:U",
    "2,0:D", "3,0:U",
    "2,1:D", "3,1:U",
    "2,4:D", "3,4:U",
    "3,1:D", "4,1:U"
  ])
});