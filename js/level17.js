import { startGame } from "../js/engine2.js";

window.LEVEL_NUMBER = 17;

startGame({
  GRID: 7,
  SIZE: 52,

  startPos: { r: 0, c: 0 },
  keys:  [ { r: 2, c: 4 }, { r: 5, c: 3 }],
  doorPos:  { r: 0, c: 6 },

  walls: new Set([
    "0,3:R", "0,4:L",           
    "1,5:R", "1,6:L",
    "2,3:R", "2,4:L",
    "2,4:R", "2,5:L",
    "3,3:R", "3,4:L",
    "5,1:R", "5,2:L",
    "5,2:R", "5,3:L",
    "6,0:R", "6,2:L",
    
    "0,0:D", "1,0:U",
    "0,6:D", "1,6:U",
    "1,1:D", "2,1:U",
    "1,4:D", "2,4:U",
    "2,2:D", "3,2:U",
    "2,5:D", "3,5:U",
    "3,5:D", "4,5:U",
    "4,3:D", "5,3:U",
    "4,6:D", "5,6:U"
  ])
});
