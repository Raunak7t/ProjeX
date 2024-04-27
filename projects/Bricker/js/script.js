const playground = document.getElementById("playground");
const ppR = playground.parentElement.getBoundingClientRect();

playground.style.width = (playground.width = ppR.width) + "px";
playground.style.height = (playground.height = ppR.height) + "px";
window.addEventListener("resize", () => {
  location.reload();
});

const ctx = playground.getContext("2d");

// board's properties

let boardW = playground.width / 5;
let boardH = boardW / 5;
let boardX = playground.width / 2 - boardW / 2;
let boardY = playground.height - boardH - 5;
let boardV = boardW / 10;

// ball's properties

let ballSize = playground.width / 40;
let ballX = playground.width / 2;
let ballY = boardY - 2 * ballSize;
let ballXV = ballSize / 2;
let ballYV = ballSize / 2;
let hue = 180;

// brick's

let bricks = [];
let brickW = playground.width / 8;
let brickH = brickW / 3;
let brickGap = brickW / 8;

let rightPressed = false;
let leftPressed = false;

let score = 0;
let lives = 3;

let isGamePaused = true;
let isGameOver = false;

gameLoop();

getBricks();
updateBricks();
updateBoard();
updateBall();
showScore();

playground.addEventListener("click", start);
document.addEventListener("keypress", start);
ctx.font = "6vmin Arial";
ctx.fillStyle = "white";
ctx.fillText("Press any key or", playground.width / 6, playground.height / 1.7);
ctx.fillText(
  "touch to start!",
  playground.width / 4.5,
  playground.height / 1.45
);

function start() {
  if (isGamePaused) {
    boardX = playground.width / 2 - boardW / 2;
    boardY = playground.height - boardH - 5;
    ballX = playground.width / 2;
    ballY = boardY - 2 * ballSize;
    ctx.clearRect(0, 0, playground.width, playground.height);
    isGamePaused = false;
    if (isGameOver) {
      getBricks();
      score = 0;
      lives = 3;
      isGameOver = false;
    }
  }
  playground.addEventListener("mousemove", (e) => {
    let newPosition = e.x - ppR.x - boardW / 2;
    if (
      newPosition + boardW + brickGap < playground.width &&
      newPosition - brickGap > 0
    )
      boardX = newPosition;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
      rightPressed = true;
    }
    if (e.key == "ArrowLeft") {
      leftPressed = true;
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key == "ArrowRight") {
      rightPressed = false;
    }
    if (e.key == "ArrowLeft") {
      leftPressed = false;
    }
  });
}

function gameLoop() {
  if (!isGamePaused) {
    // ctx.clearRect(0, 0, playground.width, playground.height);
    ctx.fillStyle = "rgba(7, 39, 49, .3)";
    ctx.fillRect(0, 0, playground.width, playground.height);

    updateBoard();
    updateBricks();
    isCollision();
    showScore();
    updateBall();
  }
  requestAnimationFrame(gameLoop);
}

function drawBoard() {
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(boardX, boardY, boardW, boardH);
}
function updateBoard() {
  if (rightPressed) {
    if (boardX + boardW + brickGap < playground.width) boardX += boardV;
  }
  if (leftPressed) {
    if (boardX - brickGap > 0) boardX -= boardV;
  }
  drawBoard();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = `hsl(${hue},100%, 50%)`;
  ctx.fill();
  ctx.closePath();
}
function updateBall() {
  hue += 5;
  drawBall();
  ballX += ballXV;
  ballY += ballYV;
}

function getBricks() {
  let yp = 7 * brickGap;
  for (let y = 0; y < 6; y++) {
    let xp = brickGap;
    for (let x = 0; x < 7; x++) {
      let b = [xp, yp, getRandomColor()];
      bricks.push(b);
      xp += brickW + brickGap;
    }
    yp += brickH + brickGap;
  }
}
function drawBricks(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, brickW, brickH);
}
function updateBricks() {
  for (let i = 0; i < bricks.length; i++) {
    drawBricks(bricks[i][0], bricks[i][1], bricks[i][2]);
  }
}

function isCollision() {
  if (ballX + ballSize > playground.width || ballX - ballSize < 0) ballXV *= -1;
  if (ballY - ballSize < 0) ballYV *= -1;
  else if (
    ballX + ballSize > boardX &&
    ballX - ballSize < boardX + boardW &&
    ballY + ballSize > boardY &&
    ballY + ballSize < boardY + boardH
  )
    ballYV *= -1;
  if (ballY > playground.height) {
    gamePause();
  }

  for (let i = 0; i < bricks.length; i++) {
    if (
      ballY - ballSize < bricks[i][1] + brickH &&
      ballY + ballSize > bricks[i][1] &&
      ballX - ballSize < bricks[i][0] + brickW &&
      ballX + ballSize > bricks[i][0]
    ) {
      ballYV *= -1;
      bricks.splice(i, 1);
      score += lives;
      i--;
    }
  }

  if (bricks.length == 0) {
    setTimeout(() => {
      isGamePaused = true;
      gameOver(1);
    }, 400);
  }
}

function showScore() {
  ctx.font = "4vmin Arial";
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, playground.width, brickGap * 7);
  ctx.fillText("Score: " + score, brickGap * 2, brickGap * 5);
  ctx.fillText("Lives: " + lives, brickGap * 48, brickGap * 5);
}

function gamePause() {
  lives--;
  isGamePaused = true;
  if (!lives) {
    gameOver(0);
    return;
  }
  ctx.font = "5vmin Arial";
  ctx.fillStyle = "white";
  ctx.fillText(
    "Press any key or",
    playground.width / 5,
    playground.height / 1.7
  );
  ctx.fillText(
    "touch to resume!",
    playground.width / 5,
    playground.height / 1.5
  );
}

function gameOver(isWin) {
  isGameOver = true;
  ctx.fillStyle = "white";
  ctx.font = "6vmin Arial";

  if (isWin) {
    ctx.fillText("You Win!", playground.width / 3.2, playground.height / 1.9);
  } else {
    ctx.fillText("You Lose!", playground.width / 3.4, playground.height / 1.9);
  }

  ctx.font = "5vmin Arial";
  ctx.fillText(
    "Score: " + score,
    playground.width / 2.9,
    playground.height / 1.5
  );
  ctx.font = "4vmin Arial";
  ctx.fillText(
    "Press any key or",
    playground.width / 3.7,
    playground.height / 1.3
  );
  ctx.fillText(
    "touch to restart!",
    playground.width / 3.5,
    playground.height / 1.2
  );
}

function getRandomColor() {
  let r = Math.random() * 256;
  let g = Math.random() * 256;
  let b = Math.random() * 256;

  return `rgb(${r},${g},${b})`;
}
