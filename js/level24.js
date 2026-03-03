import { startGame } from "../js/engine3.js";

window.LEVEL_NUMBER = 24;

startGame({
  GRID: 9,
  SIZE: 52,

  startPos: { r: 0, c: 0 },
  keys:  [ { r: 1, c: 5 }, { r: 4, c: 5 }, { r: 7, c: 7}],
  doorPos:  { r: 3, c: 2 },

  walls: new Set([
    "0,1:R", "0,2:L",           
    "1,1:R", "1,2:L",
    "1,4:R", "1,5:L",
    "3,2:R", "3,3:L",
    "4,4:R", "4,5:L",           
    "6,7:R", "6,8:L",
    "7,6:R", "7,7:L",
   

    "0,0:D", "1,0:U",
    "0,5:D", "1,5:U",
    "2,2:D", "3,2:U",
    "3,5:D", "4,5:U",
    "4,8:D", "5,8:U",
    "5,3:D", "6,3:U",
    "6,7:D", "7,7:U",
    
  ])
});
