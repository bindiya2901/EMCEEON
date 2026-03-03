import { startGame } from "../js/engine.js";

window.LEVEL_NUMBER = 10;

startGame({
  GRID: 5,
  SIZE: 52,

  startPos: { r: 4, c: 2 },
  keyPos:   { r: 0, c: 0 },
  doorPos:  { r: 0, c: 3 },

  walls: new Set([
    "0,1:R", "0,2:L",         
    "0,3:R", "0,4:L",
    "1,0:R", "1,1:L",
    "2,0:R", "2,1:L",
    "2,3:R", "2,4:L",
    "3,1:R", "3,2:L",
    "3,3:R", "3,4:L",
    
    "0,1:D", "1,1:U",  
    "0,3:D", "1,3:U", 
    "2,2:D", "3,2:U", 
    "2,4:D", "3,4:U", 
    "3,0:D", "4,0:U", 
    "3,1:D", "4,1:U", 
    "3,3:D", "4,3:U",       
  ])
});
