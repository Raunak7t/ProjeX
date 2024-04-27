const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);
let particlesArray = [];
let hue = 0;

canvas.style.width = (canvas.width = window.innerWidth) + "px";
canvas.style.height = (canvas.height = window.innerHeight) + "px";

window.addEventListener("resize", () => {
  canvas.style.width = (canvas.width = window.innerWidth) + "px";
  canvas.style.height = (canvas.height = window.innerHeight) + "px";
});

let mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  getParticles();
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 10 + 5;
    this.xVelocity = Math.random() * 4 - 2;
    this.yVelocity = Math.random() * 4 - 2;
    this.color = `hsl(${hue},100%,50%)`;
  }
  move() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if (this.size >= 0.4) this.size -= 0.2;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}

function getParticles() {
  for (let i = 0; i < 2; i++) {
    particlesArray.push(new Particle());
  }
}

function dnm() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].move();
    particlesArray[i].draw();
    if (particlesArray[i].size < 0.4) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0002";
  hue += 7;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  dnm();
}

animate();
