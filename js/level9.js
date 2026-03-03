import { startGame } from "../js/engine.js";

window.LEVEL_NUMBER = 9;

startGame({
  GRID: 5,
  SIZE: 52,

  startPos: { r: 0, c: 3 },
  keyPos:   { r: 2, c: 2 },
  doorPos:  { r: 2, c: 0 },

  walls: new Set([
    "0,1:R", "0,2:L",         
    "0,3:R", "0,4:L",
    "1,0:R", "1,1:L",
    "1,1:R", "1,2:L",
    "2,0:R", "2,1:L",
    "2,1:R", "2,2:L",
    "2,2:R", "2,3:L",
    "3,1:R", "3,2:L",
    "3,2:R", "3,3:L",
    
    "1,2:D", "2,2:U",     
    "2,0:D", "3,0:U",
    "3,4:D", "4,4:U"
  ])
});
