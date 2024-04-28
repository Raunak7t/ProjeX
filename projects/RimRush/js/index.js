"use esversion: 8";

import { updateChar, setupChar, getCharRect } from "./char.js";
import {
  updateObstacle,
  setupObstacles,
  score,
  getObsRect,
} from "./obstacle.js";

const msg = document.getElementById("msg");

var chooseCharDiv = msg.querySelector(".choose-char");
export var charImgUrl;

export var events = ["click", "keypress"];

export function addMultipleEventListener(events, fnc, isOnce = false) {
  events.forEach((event) => {
    document.addEventListener(event, fnc, {
      once: isOnce,
    });
  });
}

addMultipleEventListener(events, gameStart, true);

let lastTime;
function updateFrame(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateFrame);
    return;
  }
  var delta = time - lastTime;
  updateChar(delta);
  updateObstacle(delta);
  showScore();

  var insideObs = getObsRect().some((obsRect) => {
    return isCollision(getCharRect(), obsRect);
  });

  if (checkLoose() || insideObs) {
    gameOver();
    return;
  }

  lastTime = time;
  window.requestAnimationFrame(updateFrame);
}

async function gameStart(charImg) {
  if (charImg.target.hasAttribute("src") == true) {
    charImgUrl = charImg.target.getAttribute("src");
    setupChar(charImgUrl);
    addMultipleEventListener(events, gameStart, true);
    return;
  }

  lastTime = null;
  setupChar();
  setupObstacles();
  let gameStartTimer = 3;
  let timerPromise = new Promise((res, rej) => {
    document.querySelector("#score h1").innerHTML = score();
    msg.innerHTML = `<h2>Game starts in :</h2><h1>-</h1>`;
    let intervalVar = setInterval(() => {
      msg.innerHTML = `<h2>Game starts in :</h2><h1>${gameStartTimer}</h1>`;
      gameStartTimer--;
      if (gameStartTimer < 0) {
        clearInterval(intervalVar);
        return res(true);
      }
    }, 500);
  });
  await timerPromise;
  msg.classList.add("hidden");
  window.requestAnimationFrame(updateFrame);
}

function showScore() {
  document.querySelector("#score h1").innerHTML = score();
}

function checkLoose() {
  let charRect = getCharRect();
  if (charRect.top < -15 || charRect.bottom > window.innerHeight + 15) {
    return true;
  } else {
    return false;
  }
}

function isCollision(rect1, rect2) {
  return (
    rect1.right - 60 > rect2.left &&
    rect1.top + 60 < rect2.bottom &&
    rect1.left + 60 < rect2.right &&
    rect1.bottom - 60 > rect2.top
  );
}

function gameOver() {
  msg.classList.remove("hidden");
  msg.innerHTML = `<h1>Your score : ${score()} points!</h1><h2>Press any key to restart</h2>`;
  msg.prepend(chooseCharDiv);
  setTimeout(function () {
    addMultipleEventListener(events, gameStart, true);
  }, 600);
}
