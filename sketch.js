// Main p5.js entry point. Keep setup() and draw() in this file only.
let rocks = [];
let gameOver = false;
let lasers = [];
let lives = 3;
let underblaster;

function preload() {
  underblaster = loadImage(
    "assets/underblaster.png",
    () => {},
    (error) => console.error("Could not load assets/underblaster.png", error)
  );
}

function setup() {
  // The battle UI and its hit areas are designed around a 640 x 360 canvas.
  createCanvas(640, 360);
  imageMode(CENTER);
  textFont("monospace");
}

function draw() {
  drawBossFight();
}

function windowResized() {
  // The game uses a fixed-size arena so its existing controls remain aligned.
}
