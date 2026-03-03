import { startGame } from "../js/engine3.js";

window.LEVEL_NUMBER = 22;

startGame({
  GRID: 9,
  SIZE: 52,

  startPos: { r: 3, c: 0 },
  keys:  [ { r: 1, c: 3 }, { r: 4, c: 7 }, { r: 8, c: 5}],
  doorPos:  { r: 0, c: 8 },

  walls: new Set([
    "0,2:R", "0,3:L",           
    "1,2:R", "1,3:L",
    "2,2:R", "2,3:L",
    "3,2:R", "3,3:L",
    "3,0:R", "3,1:L",           
    "0,6:R", "0,7:L",
    "1,6:R", "1,7:L",
    "4,6:R", "4,7:L",
    "7,4:R", "7,5:L",
    "8,4:R", "8,5:L",

    "3,0:D", "4,0:U",
    "0,8:D", "1,8:U",
    "1,7:D", "2,7:U",
    "4,7:D", "5,7:U",
    "5,2:D", "6,2:U",
    "7,7:D", "8,7:U",
    
    
  ])
});
