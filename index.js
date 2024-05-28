/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

let brightness;
const brightnessArray = [];
let particles = [];
let RGBArray = []

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.brightness = 0;
    this.velocity = Math.random() * 3 + 0.1;
    this.radius = Math.random() * 1.5 + 1;
  }
  update() {
    this.y += this.velocity;

    if (this.y >= canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
    this.brightness =
      brightnessArray[
        Math.floor(this.y - 1) * canvas.width + Math.floor(this.x)
      ];
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle =
      RGBArray[Math.floor(this.y - 1) * canvas.width + Math.floor(this.x)];
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

const image = new Image();
image.src = "Ralph and Rosie.png";

image.onload = function () {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0,0,canvas.width,canvas.height)

  for (let i = 0; i < imgData.data.length; i++) {
    let red = imgData.data[i * 4];
    let green = imgData.data[i * 4 + 1];
    let blue = imgData.data[i * 4 + 2];

    brightness = (red + green + blue) / 3;
     brightnessArray.push(brightness);
    RGBArray.push(`RGB(${red},${green},${green})`)
  }
  for (let i = 0; i < 10000; i++) {
    particles.push(new Particle());
  }
};


function animate() {
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    ctx.globalAlpha = particle.brightness * 0.005;
    particle.draw();
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
});
