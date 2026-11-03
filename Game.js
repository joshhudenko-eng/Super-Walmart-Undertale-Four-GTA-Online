
let barX = 90;
let barY = 190;
let barWidth = 460;
let barHeight = 72;

let attackX = barX;
let attackSpeed = 8;

let bossHP = 500;
let maxBossHP = 500;
let playerHP = 3;
let playerDead = false;
let bossLevel = 1;
let bgMusic = new Audio("PopUp/Sound/BGmusic.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.1;

// Load backgrounds
let marioBG = new Image();
marioBG.src = "Images/Mario.png";

let walmartBG = new Image();
walmartBG.src = "Images/Walmart.png";

// Current battle screen
let battleScreen = "menu";

// Delay after attacking
let resultEndTime = 0;
let resultDelay = 1000;

function setup() {
  createCanvas(640, 360);
}


function draw() {

  // Draw current level background
  drawLevelBackground();

  // Draw boss HP bar
  drawBossHP();

  // Battle menu
  if (battleScreen === "menu") {
    drawMenu();
  }

  // Attack phase
  else if (battleScreen === "fight") {
    moveAttackLine();
    drawAttackBar();

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text("PRESS SPACE TO ATTACK", width / 2, 300);
  }

  // Freeze attack bar after pressing Space
  else if (battleScreen === "result") {
    drawAttackBar();

    // Wait 1 second before changing scenes
    if (millis() >= resultEndTime) {
      if (bossHP <= 0) {
        battleScreen = "win";
      } else {
        battleScreen = "dodge";
      }
    }
  }

  // Dodge phase
  else if (battleScreen === "dodge") {
    drawDodgeScreen();

    // Press R to return to fight menu
    if (keyIsDown(82)) {
      battleScreen = "menu";
    }
  }

  // Victory screen
  else if (battleScreen === "win") {
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(30);
    text("YOU WIN!", width / 2, 210);
  }

  // GUALMART POPUP
  // Always draw this LAST and outside
  // all battleScreen conditions
  if (typeof drawPopupOverlay === "function") {
    drawPopupOverlay();
  }

}

function startBackgroundMusic() {
  if (bgMusic.paused) {
    bgMusic.play().catch(function(error) {
      console.log("Music error:", error);
    });
  }
}



// Draw only the boss HP bar
function drawBossHP() {

  // Gray background
  fill(70);
  noStroke();
  rect(180, 115, 280, 12);

  // Red health bar
  fill(230, 65, 65);

  rect(
    180,
    115,
    280 * (bossHP / maxBossHP),
    12
  );
}


// Draw FIGHT button
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


// Move the attack line back and forth
function moveAttackLine() {

  attackX += attackSpeed;

  // Right wall
  if (attackX >= barX + barWidth) {
    attackX = barX + barWidth;
    attackSpeed = -abs(attackSpeed);
  }

  // Left wall
  if (attackX <= barX) {
    attackX = barX;
    attackSpeed = abs(attackSpeed);
  }
}


// Draw the attack bar
function drawAttackBar() {

  let center = barX + barWidth / 2;
  let ctx = drawingContext;

  // White border
  noFill();
  stroke(255);
  strokeWeight(2);

  rect(
    barX - 8,
    barY - 46,
    barWidth + 16,
    92
  );

  ctx.save();

  // Left triangle gradient
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

  // Right triangle gradient
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

  // Moving white attack line
  stroke(255);
  strokeWeight(4);

  line(
    attackX,
    barY - 44,
    attackX,
    barY + 44
  );

  // White arrow above line
  noStroke();
  fill(255);

  triangle(
    attackX - 6, barY - 51,
    attackX + 6, barY - 51,
    attackX, barY - 43
  );
}


// Dodge screen


function drawDodgeScreen() {

  // Draw the white dodge arena
  push();
  rectMode(CORNER);
  noFill();
  stroke(255);
  strokeWeight(3);
  rect(190, 190, 260, 95);
  pop();

if (typeof drawHeart === "function") {
  push();
  drawHeart();
  pop();
}

  // Return instructions
  push();
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text("Press R to return to menu", width / 2, 315);
  pop();
}


// Click FIGHT to start attacking

function mousePressed() {

  startBackgroundMusic();
  // Check if FIGHT button was clicked
  if (
    battleScreen === "menu" &&
    mouseX >= 240 &&
    mouseX <= 400 &&
    mouseY >= 205 &&
    mouseY <= 265
  ) {
    attackX = barX;
    attackSpeed = abs(attackSpeed);

    // Open fight screen
    battleScreen = "fight";

    console.log("FIGHT button clicked!");
  }

  // Enable popup sound without breaking the game
  if (typeof enablePopupSound === "function") {
    try {
      enablePopupSound();
    } catch (error) {
      console.error("Popup sound error:", error);
    }
  }
}



// Keyboard controls
function keyPressed() {


  // Press Space to attack
  if (key === " " && battleScreen === "fight") {

    let center = barX + barWidth / 2;

    // Distance from middle
    let distanceFromCenter = abs(attackX - center);

    // Calculate damage
    let damage = round(
      map(
        distanceFromCenter,
        0,
        barWidth / 2,
        100,
        0
      )
    );

    damage = constrain(damage, 0, 100);

    // Damage the boss
    damageBoss(damage);

    // Freeze the attack line
    battleScreen = "result";

    // Start 1-second delay
    resultEndTime = millis() + resultDelay;
  }

  // Return from dodge phase
  if (
    (key === "r" || key === "R") &&
    battleScreen === "dodge"
  ) {
    battleScreen = "menu";
  }

  // Prevent Space from scrolling page
  if (key === " ") {
    return false;
  }
}

function drawLevelBackground() {
  background(12);

  let bg = null;

  if (bossLevel === 2) {
    bg = marioBG;
  }

  if (bossLevel === 3) {
    bg = walmartBG;
  }

  // Draw the selected background
  if (bg && bg.complete && bg.naturalWidth > 0) {
    drawingContext.drawImage(
      bg, 0, 0, width, height
    );
  }
}


function damageBoss(damage) {

  let level2HP = Math.round(maxBossHP * 2 / 3);
  let level3HP = Math.round(maxBossHP / 3);

  if (bossLevel === 1) {
    bossHP = max(level2HP, bossHP - damage);

    if (bossHP <= level2HP) {
      bossLevel = 2;
    }
  }

  else if (bossLevel === 2) {
    bossHP = max(level3HP, bossHP - damage);

    if (bossHP <= level3HP) {
      bossLevel = 3;
    }
  }

  else if (bossLevel === 3) {
    bossHP = max(0, bossHP - damage);
  }
}

 // Test player damage with H
window.addEventListener("keydown", function(event) {

  if (
    event.key.toLowerCase() === "h" &&
    !event.repeat &&
    battleScreen === "dodge"
  ) {
    console.log("H pressed!");

    takePlayerDamage();

    console.log("Player HP:", playerHP);
  }

});


function takePlayerDamage() {

  // Don't take damage after dying
  if (playerDead) return;

  // Lose 1 HP
  playerHP -= 1;

  console.log("Player HP:", playerHP);

  // Check if player has died
  if (playerHP <= 0) {

    playerDead = true;
    battleScreen = "gameover";

    // Play GTA WASTED video
    showWasted();
  }
}
