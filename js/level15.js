import { startGame } from "../js/engine2.js";

window.LEVEL_NUMBER = 15;

startGame({
  GRID: 7,
  SIZE: 52,

  startPos: { r: 3, c: 3 },
  keys:   [ { r: 1, c: 5 }, { r: 5, c: 6 } ],
  doorPos:  { r: 5, c: 0 },

  walls: new Set([
    "0,2:R", "0,3:L",           
    "1,5:R", "1,6:L",
    "1,4:R", "1,5:L",
    "2,4:R", "2,5:L",
    "3,2:R", "3,3:L",
    "3,3:R", "3,4:L",
    "5,0:R", "5,1:L",
    "5,5:R", "5,6:L",
    "6,1:R", "6,2:L",
    
    "1,5:D", "2,5:U",
    "2,5:D", "3,5:U",
    "3,0:D", "4,0:U",
    "2,3:D", "2,3:U",
    "3,6:D", "3,6:U",
    "4,0:D", "5,0:U",
    "4,1:D", "5,1:U",
    "4,3:D", "5,3:U"
  ])
});
