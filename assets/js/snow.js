// ================================================
// EFECTO DE NIEVE
// ================================================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Snowflake {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.speedY = Math.random() * 1 + 0.5;
    this.wind = Math.random() * 0.5 - 0.25;
  }

  update() {
    this.y += this.speedY;
    this.x += this.wind;
    if (this.y > canvas.height) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fill();
  }
}

const snowflakes = Array.from({ length: 200 }, () => new Snowflake());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach((flake) => {
    flake.update();
    flake.draw();
  });
  requestAnimationFrame(animate);
}

animate();