function drawHeart(x = heartX, y = heartY){
  rectMode(CENTER);
  fill("#ff1f1f");
  noStroke();
  rect(x + 4.5, y - 5.9, 6, 3);

  rectMode(CENTER);
  fill("#ff1f1f");
  noStroke();
  rect(x - 4.5, y - 5.9, 6, 3);

  rectMode(CENTER);
  fill("#ff1f1f");
  noStroke();
  rect(x, y - 2.9, 15, 3);

  rectMode(CENTER);
  fill("#ff1f1f");
  noStroke();
  rect(x, y, 15, 3);

  fill("#ff1f1f");
  noStroke();
  rect(x, y + 2.9, 10, 3);

  fill("#ff1f1f");
  noStroke();
  rect(x, y + 5.9, 5, 3);

  noFill(); //hitbox
  strokeWeight(1);
  stroke("#ffffff");
  rect(x, y, 15, 15);

  if (keyIsDown("w")) y -= heartSpeed;
  if (keyIsDown("s")) y += heartSpeed;
  if (keyIsDown("a")) x -= heartSpeed;
  if (keyIsDown("d")) x += heartSpeed;

x = constrain(heartX, 198, 442);
y = constrain(heartY, 198, 277);
}