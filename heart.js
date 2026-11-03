console.log("heart.js loaded");

let heartX = 320;
let heartY = 235;
const heartSpeed = 3;

function drawHeart() {
  noStroke();
  fill("#ff1f1f");

  rectMode(CENTER);
  rect(heartX + 4.5, heartY - 5.9, 6, 3);
  rect(heartX - 4.5, heartY - 5.9, 6, 3);
  rect(heartX, heartY - 2.9, 15, 3);
  rect(heartX, heartY, 15, 3);
  rect(heartX, heartY + 2.9, 10, 3);
  rect(heartX, heartY + 5.9, 5, 3);

  // Keep the visible hitbox from the original heart design.
  noFill();
  strokeWeight(1);
  stroke("#ffffff");
  rect(heartX, heartY, 15, 15);

  if (keyIsDown(87)) heartY -= heartSpeed; // W
  if (keyIsDown(83)) heartY += heartSpeed; // S
  if (keyIsDown(65)) heartX -= heartSpeed; // A
  if (keyIsDown(68)) heartX += heartSpeed; // D

  heartX = constrain(heartX, 198, 442);
  heartY = constrain(heartY, 198, 277);
}
