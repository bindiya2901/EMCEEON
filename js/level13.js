import { startGame } from "../js/engine2.js";

window.LEVEL_NUMBER = 13;

startGame({
  GRID: 7,
  SIZE: 52,

  startPos: { r: 2, c: 0 },
  keys:   [ { r: 1, c: 4 }, { r: 5, c: 6 } ],
  doorPos:  { r: 6, c: 2 },

  walls: new Set([
    "1,3:R", "1,4:L",           
    "2,0:R", "2,1:L",
    "2,3:R", "2,4:L",
    "3,0:R", "3,1:L",
    "3,2:R", "3,3:L",
    "4,3:R", "4,4:L",
    "5,5:R", "5,6:L",
    
    "1,0:D", "2,0:U",
    "1,2:D", "2,2:U",
    "1,4:D", "2,4:U",
    "3,1:D", "4,1:U",
    "3,3:D", "4,3:U",
    "4,0:D", "5,0:U",
    "5,6:D", "6,6:U",
    "5,2:D", "6,2:U"
  ])
});
