import { startGame } from "../js/engine3.js";

window.LEVEL_NUMBER = 23;

startGame({
  GRID: 9,
  SIZE: 52,

  startPos: { r: 4, c: 0 },
  keys:  [ { r: 1, c: 3 }, { r: 7, c: 5 }, { r: 8, c: 8}],
  doorPos:  { r: 3, c: 7 },

  walls: new Set([
    "1,2:R", "1,3:L",           
    "4,0:R", "4,1:L",
    "3,6:R", "3,7:L",
    "6,4:R", "6,5:L",
    "7,4:R", "7,5:L",           
    "7,7:R", "7,8:L",
    "8,7:R", "8,8:L",
    
    "1,3:D", "2,3:U",
    "2,7:D", "3,7:U",
    "3,7:D", "4,7:U",
    "4,0:D", "5,0:U",
    "5,5:D", "6,5:U",
    "5,8:D", "6,8:U",
    
    
  ])
});
