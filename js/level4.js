import { startGame } from "../js/engine.js";

window.LEVEL_NUMBER = 4;

startGame({
  GRID: 5,
  SIZE: 52,

  startPos: { r: 0, c: 0 },
  keyPos:   { r: 2, c: 2 },
  doorPos:  { r: 1, c: 4 },

  walls: new Set([ 
    "0,1:R", "0,2:L",     
    "1,0:R", "1,1:L",  
    "1,2:R", "1,3:L", 
    "2,1:R", "2,2:L", 
    "2,3:R", "2,4:L", 
    
    "0,1:D", "1,1:U", 
    "1,3:D", "2,3:U"   
  ])
});
