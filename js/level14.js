import { startGame } from "../js/engine2.js";

window.LEVEL_NUMBER = 14;

startGame({
  GRID: 7,
  SIZE: 52,

  startPos: { r: 6, c: 6 },
  keys:   [ { r: 1, c: 2 }, { r: 4, c: 4 } ],
  doorPos:  { r: 5, c: 1 },

  walls: new Set([
    "0,4:R", "0,5:L",           
    "1,2:R", "1,3:L",
    "1,4:R", "1,5:L",
    "4,4:R", "4,5:L",
    "5,1:R", "5,2:L",
    "5,4:R", "5,5:L",
    "6,2:R", "6,3:L",
    "6,5:R", "6,6:L",
    
    "1,1:D", "2,1:U",
    "1,2:D", "2,2:U",
    "2,3:D", "3,3:U",
    "3,0:D", "4,0:U",
    "3,4:D", "4,4:U",
    "4,1:D", "5,1:U",
    "4,6:D", "5,6:U",
    "5,1:D", "6,1:U"
  ])
});
