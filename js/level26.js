import { startGame } from "../js/engine3.js";

window.LEVEL_NUMBER = 26;

startGame({
  GRID: 9,
  SIZE: 52,

  startPos: { r: 4, c: 3 },
  keys:  [ { r: 1, c: 6 }, { r: 3, c: 0 }, { r: 8, c: 3}],
  doorPos:  { r: 7, c: 8 },

  walls: new Set([
    "1,5:R", "1,6:L",           
    "2,5:R", "2,6:L",
    "2,1:R", "2,2:L",
    "3,0:R", "3,1:L",
    "4,2:R", "4,3:L",           
    "6,2:R", "6,3:L",
    "7,7:R", "7,8:L",
    "8,4:R", "8,5:L",

    "0,6:D", "1,6:U",
    "2,6:D", "3,6:U",
    "3,0:D", "4,0:U",
    "3,3:D", "4,3:U",
    "6,8:D", "7,8:U",
    "7,2:D", "8,2:U",
    "7,3:D", "8,3:U",
    "7,6:D", "8,6:U",
    "7,7:D", "8,7:U",
    
  ])
});
