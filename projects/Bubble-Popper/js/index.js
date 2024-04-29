var field = document.getElementById("field");

var score = 0;
var hitNo;

function getHitNo() {
  var hitVal = document.getElementById("hitval");
  hitNo = Math.floor(Math.random() * 10);
  hitVal.innerText = hitNo;
}

function fillField() {
  var clutter = "";
  var bubbles = 54;
  for (let i = 1; i <= bubbles; i++) {
    var bubbleNo = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${bubbleNo}</div>`;
  }
  field.innerHTML = clutter;
}

var timeTrack;

function gameTimer() {
  var timer = document.getElementById("timerval");
  var timerVal = 30;
  timeTrack = setInterval(() => {
    if (timerVal >= 0) {
      timer.innerText = timerVal--;
    } else {
      clearInterval(timeTrack);
      field.innerHTML = `<div class="message">
        <h1>GAME OVER!</h1>
        <h2>Oops...! Time's up...!</h2>
        <h1>Score: ${score}</h1>
        <div class="restart-btn" onclick="location.reload()"><h1>RESTART</h1></div>
      </div>`;
    }
  }, 1000);
}

function incScore() {
  var scoreVal = document.getElementById("scoreval");

  field.addEventListener("click", function (dets) {
    if (dets.target.classList.contains("bubble")) {
      if (hitNo === Number(dets.target.innerText)) {
        score += 10;
        scoreVal.innerHTML = score;
        dets.target.style.transform = "scale(3)";
        dets.target.style.opacity = 0;
        getHitNo();
        setTimeout(function () {
          fillField();
        }, 100);
      } else {
        field.innerHTML = `<div class="message">
          <h1>GAME OVER!</h1>
          <h3>You popped the wrong bubble...!</h3>
          <h1>Score: ${score}</h1>
          <div class="restart-btn" onclick="location.reload()"><h1>RESTART</h1></div>
        </div>`;
        clearInterval(timeTrack);
      }
    }
  });
}

function startGame() {
  getHitNo();
  fillField();
  gameTimer();
  incScore();
}

startGame();
