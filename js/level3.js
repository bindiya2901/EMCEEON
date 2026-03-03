import { startGame } from "../js/engine.js";

window.LEVEL_NUMBER = 3;

startGame({
  GRID: 5, 
  SIZE: 52,

  startPos: { r: 3, c: 0 },
  keyPos: { r: 0, c: 3 },
  doorPos: { r: 3, c: 3 },

  walls:new Set([
    "1,1:R","1,2:L",
    "2,0:R","2,1:L",
    "2,3:R","2,4:L",
    "3,3:R","3,4:L",
    
    "0,0:D","1,0:U",
    "0,1:D","1,1:U",
    "2,3:D","3,3:U"
  ])
});
