import { startGame } from "../js/engine2.js";

window.LEVEL_NUMBER = 16;

startGame({
  GRID: 7,
  SIZE: 52,

  startPos: { r: 1, c: 3 },
  keys:   [ { r: 1, c: 0 }, { r: 5, c: 1 } ],
  doorPos:  { r: 4, c: 5 },

  walls: new Set([
    "1,2:R", "1,3:L",           
    "2,3:R", "2,4:L",
    "2,4:R", "2,5:L",
    "2,5:R", "2,6:L",
    "4,4:R", "4,5:L",
    "5,0:R", "5,1:L",
    "5,2:R", "5,3:L",
    "6,4:R", "6,5:L",
    
    "0,0:D", "1,0:U",
    "0,3:D", "1,3:U",
    "1,0:D", "2,0:U",
    "1,1:D", "2,1:U",
    "2,3:D", "3,3:U",
    "3,2:D", "4,2:U",
    "3,5:D", "4,5:U",
    "4,1:D", "5,1:U",
    "4,5:D", "5,5:U"
  ])
});
