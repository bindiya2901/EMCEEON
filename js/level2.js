import { startGame } from "../js/engine.js";

window.LEVEL_NUMBER = 2;

startGame({
  GRID: 5, 
  SIZE: 52,

  startPos: { r: 4, c: 4 },
  keyPos: { r: 2, c: 1 },
  doorPos: { r: 0, c: 4 },

  walls:new Set([
    "0,3:R","0,4:L",
    "2,0:R","2,1:L",
    "3,1:R","3,2:L",
    "4,2:R","4,3:L",
    
    "3,3:D","4,3:U"
  ])
});
