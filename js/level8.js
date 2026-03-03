import { startGame } from "../js/engine.js";

window.LEVEL_NUMBER = 8;

startGame({
  GRID: 5,
  SIZE: 52,

  startPos: { r: 4, c: 2 },
  keyPos:   { r: 0, c: 4 },
  doorPos:  { r: 3, c: 0 },

  walls: new Set([
    "0,1:R", "0,2:L",         
    "1,2:R", "1,3:L",
    "2,3:R", "2,4:L",
    "3,0:R", "3,1:L",
    "3,1:R", "3,2:L",
    "3,3:R", "3,4:L",
    "4,1:R", "4,2:L",
    
    "0,2:D", "1,2:U",   
    "0,4:D", "1,4:U",
    "2,0:D", "3,0:U",
    "2,4:D", "3,4:U",
    "3,3:D", "4,3:U"
  ])
});
