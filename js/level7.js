import { startGame } from "../js/engine.js";

window.LEVEL_NUMBER = 7;

startGame({
  GRID: 5,
  SIZE: 52,

  startPos: { r: 0, c: 4 },
  keyPos:   { r: 2, c: 2 },
  doorPos:  { r: 4, c: 0 },

  walls: new Set([
    "0,1:R", "0,2:L",         
    "1,0:R", "1,1:L",
    "1,1:R", "1,2:L",
    "1,3:R", "1,4:L",
    "2,0:R", "2,1:L",
    "2,1:R", "2,2:L",
    "2,2:R", "2,3:L",
    "2,3:R", "2,4:L",
    "3,0:R", "3,1:L",
    "3,3:R", "3,4:L",
    "4,0:R", "4,1:L",
    
    "1,2:D", "2,2:U",  
    "0,4:D", "1,4:U",  
    "3,3:D", "4,3:U"      
  ])
});
