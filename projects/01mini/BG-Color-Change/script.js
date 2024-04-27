let intervalId;

window.addEventListener("DOMContentLoaded", startChangingColor);
document.getElementById("start").addEventListener("click", startChangingColor);
document.getElementById("stop").addEventListener("click", stopChangingColor);

function stopChangingColor() {
  clearInterval(intervalId);
  intervalId = null;
}
function startChangingColor() {
  const setBG = () => {
    document.body.style.background = getRandomColor();
  };
  if (!intervalId) intervalId = setInterval(setBG, 500);
}
function getRandomColor() {
  let hex = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
}
