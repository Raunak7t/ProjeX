import { addMultipleEventListener, events } from "./index.js";

const CHAR_SPEED = 0.25;
const JUMP_DURATION = 200;
const char = document.getElementById("char");
var lastJump = Number.POSITIVE_INFINITY;

export var charSize = char.getBoundingClientRect().width;

export function setupChar(charImgUrl) {
  if (charImgUrl) {
    char.style.backgroundImage = `url('${charImgUrl}')`;
  }
  setTop(window.innerHeight / 3);
  addMultipleEventListener(events, jump);
}

export function updateChar(delta) {
  if (lastJump < JUMP_DURATION) {
    setTop(getTop() - CHAR_SPEED * delta);
    char.style.transform = "rotate(-10deg)";
  } else {
    ``;
    setTop(getTop() + CHAR_SPEED * delta);
    char.style.transform = "rotate(20deg)";
  }
  lastJump += delta;
}

function setTop(top) {
  char.style.setProperty("--char-top", top);
}

function getTop() {
  return parseFloat(getComputedStyle(char).getPropertyValue("--char-top"));
}

function jump() {
  lastJump = 0;
}

export function getCharRect() {
  return char.getBoundingClientRect();
}
