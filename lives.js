let lifeX = 0;
let lifeY = 0;
let lives = 3;

function drawSingleLife() {
  rectMode(CENTER);
  fill("#ff1f1f");
  noStroke();
  rect(lifeX + 4.5, lifeY - 5.9, 6, 3);

  rectMode(CENTER);
  fill("#ff1f1f");
  noStroke();
  rect(lifeX - 4.5, lifeY - 5.9, 6, 3);

  rectMode(CENTER);
  fill("#ff1f1f");
  noStroke();
  rect(lifeX, lifeY - 2.9, 15, 3);

  rectMode(CENTER);
  fill("#ff1f1f");
  noStroke();
  rect(lifeX, lifeY, 15, 3);

  fill("#ff1f1f");
  noStroke();
  rect(lifeX, lifeY + 2.9, 10, 3);

  fill("#ff1f1f");
  noStroke();
  rect(lifeX, lifeY + 5.9, 5, 3);
}

function drawLives() {
    for (let i = 0; i < lives; i++) {
        push();
        translate(30 + i * 35, 30);
        drawSingleLife();
        pop();
    }
}