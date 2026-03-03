import { startGame } from "../js/engine3.js";

window.LEVEL_NUMBER = 21;

startGame({
  GRID: 9,
  SIZE: 52,

  startPos: { r: 7, c: 0 },
  keys:  [ { r: 4, c: 3 }, { r: 1, c: 6 }, { r: 7, c: 6}],
  doorPos:  { r: 4, c: 8 },

  walls: new Set([
    "1,5:R", "1,6:L",           
    "4,2:R", "4,3:L",
    "4,7:R", "4,8:L",
    "7,5:R", "7,6:L",
    
    "1,6:D", "2,6:U",
    "2,8:D", "3,8:U",
    "4,2:D", "5,2:U",
    "4,3:D", "5,3:U",
    "4,4:D", "5,4:U",
    "6,0:D", "7,0:U",
    "4,8:D", "5,8:U",
    "7,6:D", "8,6:U",
    
  ])
});
