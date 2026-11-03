let barX=90;
let barY=190;
let barWidth=460;
let barHeight=72;
let attackX=barX;
let attackSpeed=8;
let bossHP=500;
let lastDamage=0;

// Which battle screen is currently showing
let battleScreen = "menu";

// How long to show the attack result
let resultEndTime = 0;
let resultDelay = 1000;



// Draw boss name and HP
function drawBossHP() {
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(28);
  text("BOSS FIGHT", width / 2, 48);

  textSize(18);
  text("Boss HP: " + bossHP + " / 500", width / 2, 94);

  // Background of boss HP bar
  fill(70);
  rect(180, 115, 280, 12);

  // Current boss HP
  fill(230, 65, 65);
  rect(180, 115, 280 * (bossHP / 500), 12);
}

// Draw the FIGHT button
function drawMenu() {
  let hover =
    mouseX >= 240 &&
    mouseX <= 400 &&
    mouseY >= 205 &&
    mouseY <= 265;

  stroke(hover ? color(255, 220, 60) : color(255));
  strokeWeight(3);
  noFill();

  rect(240, 205, 160, 60);

  noStroke();
  fill(hover ? color(255, 220, 60) : color(255));
  textAlign(CENTER, CENTER);
  textSize(28);

  text("FIGHT", 320, 235);
}

// Move the white line left and right
function moveAttackLine() {
  attackX += attackSpeed;

  // Bounce off the right edge
  if (attackX >= barX + barWidth) {
    attackX = barX + barWidth;
    attackSpeed = -abs(attackSpeed);
  }

  // Bounce off the left edge
  if (attackX <= barX) {
    attackX = barX;
    attackSpeed = abs(attackSpeed);
  }
}

// Draw the triangle attack bar
function drawAttackBar() {
  let center = barX + barWidth / 2;
  let ctx = drawingContext;

  // White border
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(barX - 8, barY - 46, barWidth + 16, 92);

  ctx.save();

  // Left triangle: red to yellow to green
  let leftGradient = ctx.createLinearGradient(
    barX, 0, center, 0
  );

  leftGradient.addColorStop(0, "rgb(230,45,50)");
  leftGradient.addColorStop(0.5, "rgb(255,215,50)");
  leftGradient.addColorStop(1, "rgb(40,220,90)");

  ctx.fillStyle = leftGradient;
  ctx.beginPath();
  ctx.moveTo(barX, barY);
  ctx.lineTo(center, barY - barHeight / 2);
  ctx.lineTo(center, barY + barHeight / 2);
  ctx.closePath();
  ctx.fill();

  // Right triangle: green to yellow to red
  let rightGradient = ctx.createLinearGradient(
    center, 0, barX + barWidth, 0
  );

  rightGradient.addColorStop(0, "rgb(40,220,90)");
  rightGradient.addColorStop(0.5, "rgb(255,215,50)");
  rightGradient.addColorStop(1, "rgb(230,45,50)");

  ctx.fillStyle = rightGradient;
  ctx.beginPath();
  ctx.moveTo(center, barY - barHeight / 2);
  ctx.lineTo(barX + barWidth, barY);
  ctx.lineTo(center, barY + barHeight / 2);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  // White moving attack line
  stroke(255);
  strokeWeight(4);
  line(attackX, barY - 44, attackX, barY + 44);

  // White arrow
  noStroke();
  fill(255);
  triangle(
    attackX - 6, barY - 51,
    attackX + 6, barY - 51,
    attackX, barY - 43
  );
}

function drawDodgeScreen() {
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);

  text("Damage dealt: " + lastDamage, width / 2, 160);

  // Dodge arena
  noFill();
  stroke(255);
  strokeWeight(3);
  rect(190, 190, 260, 95);

  // Player heart
  noStroke();
  fill(255, 40, 60);
  textSize(28);
  text("♥", width / 2, 235);

  fill(255);
  textSize(15);
  text("Press R to return to menu", width / 2, 315);
}

// Open the attack screen when FIGHT is clicked
function mousePressed() {
  if (
    battleScreen === "menu" &&
    mouseX >= 240 &&
    mouseX <= 400 &&
    mouseY >= 205 &&
    mouseY <= 265
  ) {
    // Reset the attack line
    attackX = barX;
    attackSpeed = abs(attackSpeed);

    // Open the attack bar
    battleScreen = "fight";
  }
}

// Keyboard controls
function keyPressed() {

  // Press SPACE to attack
  if (key === " " && battleScreen === "fight") {
    let center = barX + barWidth / 2;

    // Distance from perfect center
    let distanceFromCenter = abs(attackX - center);

    // Calculate damage (0 to 100)
    let damage = round(
      map(
        distanceFromCenter,
        0,
        barWidth / 2,
        100,
        0
      )
    );

    damage = constrain(damage,0,100);

    // deal damage to boss
    bossHP=max(0, bossHP-damage);

    // Remember damage
    lastDamage=damage;

    // Freeze the bar
    battleScreen = "result";

    // Start the 1.5-second delay
    resultEndTime = millis() + resultDelay;
  }

  // Return from dodge phase to battle menu
  if (
    (key === "r" || key === "R") &&
    battleScreen === "dodge"
  ) {
    battleScreen = "menu";
  }

  // Prevent Space from scrolling the page
  if (key === " ") {
    return false;
  }
}
