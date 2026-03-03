import { startGame } from "../js/engine2.js";

window.LEVEL_NUMBER = 12;

startGame({
  GRID: 7,
  SIZE: 52,

  startPos: { r: 0, c: 6 },
  keys:   [ { r: 1, c: 2 }, { r: 5, c: 1 } ],
  doorPos:  { r: 6, c: 6 },

  walls: new Set([
    "0,5:R", "0,6:L",           
    "1,2:R", "1,3:L",
    "3,3:R", "3,4:L",
    "5,0:R", "5,1:L",
    "5,3:R", "5,4:L",
    "6,4:R", "6,4:L",
    
    "0,2:D", "1,2:U",
    "1,2:D", "2,2:U",
    "1,6:D", "2,6:U",
    "3,5:D", "4,5:U",
    "4,1:D", "5,1:U",
    "4,2:D", "5,2:U",
    "5,1:D", "6,1:U",
    "5,6:D", "6,6:U"
  ])
});
