
let gualmart;
let gualmartSound;
let item;

let itemWidth = 100;
let itemHeight = 90;
let soundEnabled = false;

async function setup() {
  createCanvas(400, 400);

  // Set up the sound
  gualmartSound = new Audio("Sound/gualmartSound.mp3");
  gualmartSound.preload = "auto";

  gualmartSound.addEventListener("error", function() {
    console.error("Sound file could not be loaded!");
  });

  // Load the image
  try {
    gualmart = await loadImage("Images/FaceAd.png");
    console.log("Image loaded successfully!");

    createItem();

  } catch (error) {
    console.error("Image failed to load:", error);
  }
}

function draw() {
  background(0);

  if (!gualmart || !item) {
    return;
  }

  // Move the image
  item.x += item.vx;
  item.y += item.vy;

  let hitWall = false;

  // Left wall
  if (item.x <= 0) {
    item.x = 0;
    item.vx = abs(item.vx);
    hitWall = true;
  }

  // Right wall
  if (item.x >= width - itemWidth) {
    item.x = width - itemWidth;
    item.vx = -abs(item.vx);
    hitWall = true;
  }

  // Top wall
  if (item.y <= 0) {
    item.y = 0;
    item.vy = abs(item.vy);
    hitWall = true;
  }

  // Bottom wall
  if (item.y >= height - itemHeight) {
    item.y = height - itemHeight;
    item.vy = -abs(item.vy);
    hitWall = true;
  }

  // Play sound when hitting a wall
  if (hitWall && soundEnabled) {
    playBounceSound();
  }

  // Draw the image
  image(
    gualmart,
    item.x,
    item.y,
    itemWidth,
    itemHeight
  );

  // Instructions
  if (!soundEnabled) {
    fill(255);
    noStroke();
    textSize(14);
    text("Click to enable sound", 10, 20);
  }
  if (typeof drawPopupOverlay === "function") {
  drawPopupOverlay();
}
}

function createItem() {
  item = {
    x: 100,
    y: 100,
    vx: 2,
    vy: 2
  };
}

// Play the sound from the beginning
function playBounceSound() {
  if (!gualmartSound) return;

  gualmartSound.pause();
  gualmartSound.currentTime = 0;

  gualmartSound.play().catch(function(error) {
    console.error("Sound playback failed:", error);
  });
}

// Click to enable and test the sound
function mousePressed() {
  soundEnabled = true;
  playBounceSound();
}
