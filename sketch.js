//NOTE: MAKE SURE THAT THE NAMES OF YOUR VARIABLES ARE NOT THE SAME AS OTHER VARIABLES IN THE PROJECT 
// ALSO MAKE SURE TO USE CAMEL CASE WHEN NAMING VARIABLES AND IF YOU DONT KNOW IF ANOTHER VARIABLE 
// NAME IS IN FILE THEN USE CTRL + SHIFT + F TO SEARCH FOR IT IN VS CODE!
let heartX = 500;
let heartY = 500;
const heartSpeed = 3;

let rocks = []
let gameOver = false
let lives = 3
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");

  drawBossHP();

  // Battle menu
  if (battleScreen === "menu") {
    drawMenu();
  }

  // Moving attack bar
  else if (battleScreen === "fight") {
    moveAttackLine();
    drawAttackBar();

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text("PRESS SPACE TO ATTACK", width / 2, 300);
  }

  // Show damage before switching scenes
  else if (battleScreen === "result") {
    drawAttackBar();

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);

    text("Damage: " + lastDamage, width / 2, 300);

    // Wait 1.5 seconds before continuing
    if (millis() >= resultEndTime) {
      if (bossHP <= 0) {
        battleScreen = "win";
      } else {
        battleScreen = "dodge";
      }
    }
  }

  // Temporary dodge phase
  else if (battleScreen === "dodge") {
    drawDodgeScreen();
  }

  // Victory screen
  else if (battleScreen === "win") {
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(30);
    text("YOU WIN!", width / 2, 210);
  }

//PROJECTILE CODE
  if (!gameOver){
  moveRocks()
  drawHeart()
    }
  drawRocks()

  //to change amount of projectiles change this number ( the lower the more spawn)
    const spawnRate = 10
  if (frameCount % spawnRate === 0 && !gameOver){
    newRocks()
  }
  //died()


  //SPEAR CODE
  moveSpears()
  drawSpears()





}
