import { startGame } from "../js/engine2.js";

window.LEVEL_NUMBER = 11;

startGame({
  GRID: 7,
  SIZE: 52,

  startPos: { r: 0, c: 4 },
  keys:  [ { r: 2, c: 1 }, { r: 6, c: 6 } ],
  doorPos:  { r: 5, c: 4 },

  walls: new Set([
    "0,2:R", "0,3:L",           
    "1,2:R", "1,3:L",
    "2,0:R", "2,1:L",
    "2,2:R", "2,3:L",
    "5,4:R", "5,5:L",
    
    "0,4:D", "1,4:U",
    "0,6:D", "1,6:U",
    "1,5:D", "2,5:U",
    "2,1:D", "3,1:U",
    "3,6:D", "4,6:U",
    "4,3:D", "5,3:U",
    "4,4:D", "5,4:U",
    "5,4:D", "6,4:U"
  ])
});
