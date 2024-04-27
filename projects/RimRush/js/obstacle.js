import {
  charSize
} from "./char.js"

const GAP_HEIGHT = charSize * 1.8;
const OBS_INTERVAL = 1500;
const OBS_WIDTH = charSize;
const OBS_SPEED = .3;
var obstacles = [];
var lastObs;
var crossedObsCount;

export function score() {
  return crossedObsCount;
}

export function setupObstacles() {
  console.log(OBS_WIDTH);
  document.documentElement.style.setProperty('--obs-width', OBS_WIDTH);
  document.documentElement.style.setProperty('--gap-height', GAP_HEIGHT);
  obstacles.forEach(obs=>obs.remove());
  obstacles.length = 0;
  lastObs = OBS_INTERVAL;
  crossedObsCount = 0;
}

export function getObsRect() {
  return obstacles.flatMap(obs => {
    return obs.obsRect();
  });
}

export function updateObstacle(delta) {
  lastObs += delta;
  if (lastObs > OBS_INTERVAL) {
    lastObs = 0;
    createObstacle();
  }

  obstacles.forEach((obs)=> {
    if (parseFloat(obs.left) + OBS_WIDTH < 0) {
      crossedObsCount++;
      obs.remove();
      obstacles.shift();
    }
    obs.left = obs.left - delta * OBS_SPEED;
  });
}

function createObstacle() {
  const obstacle = document.createElement('div');
  const obsUp = createObsSeg('obs-up');
  const obsDown = createObsSeg('obs-down');
  obstacle.classList.add('obstacle');
  obstacle.appendChild(obsUp);
  obstacle.appendChild(obsDown);
  obstacle.style.setProperty('--gap-top',
  getRandomNumberBetween(GAP_HEIGHT*1.5, window.innerHeight - GAP_HEIGHT*0.5));
  const obsLeft = {
    get left() {
      return getComputedStyle(obstacle).getPropertyValue('--obs-left');
    },
    set left(value) {
      obstacle.style.setProperty('--obs-left',
        value);
    },
    remove() {
      obstacle.remove();
    },
    obsRect() {
      return [
        obsUp.getBoundingClientRect(),
        obsDown.getBoundingClientRect()
      ]
    }
  };
  obsLeft.left = window.innerWidth;
  document.getElementById('main').appendChild(obstacle);
  obstacles.push(obsLeft);
}

function createObsSeg(obsPosClass) {
  const obsSeg = document.createElement('div');
  obsSeg.classList.add('obs-seg',
    obsPosClass);
  return obsSeg;
}

export function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max-min + 1)+min);
}