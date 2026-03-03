import { startGame } from "../js/engine.js";

window.LEVEL_NUMBER = 1;

startGame({
  GRID: 5,
  SIZE: 52,

  startPos: { r: 0, c: 0 },
  keyPos:   { r: 0, c: 3 },
  doorPos:  { r: 2, c: 0 },

  walls: new Set([
    "0,1:R", "0,2:L",          
    "2,0:R", "2,1:L",
    
    "1,1:D", "2,1:U", 
  ])
});
