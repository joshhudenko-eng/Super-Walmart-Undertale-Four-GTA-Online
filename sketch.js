//NOTE: MAKE SURE THAT THE NAMES OF YOUR VARIABLES ARE NOT THE SAME AS OTHER VARIABLES IN THE PROJECT 
// ALSO MAKE SURE TO USE CAMEL CASE WHEN NAMING VARIABLES AND IF YOU DONT KNOW IF ANOTHER VARIABLE 
// NAME IS IN FILE THEN USE CTRL + SHIFT + F TO SEARCH FOR IT IN VS CODE!
let heartX = 500;
let heartY = 500;
const heartSpeed = 3;

let rocks = []
let gameOver = false
let lasers = []
let lives = 3
let underblaster;
async function setup() {
  createCanvas(windowWidth, windowHeight);
  underblaster = await loadImage('/assets/underblaster.png')
}

function draw() {
  background("black");
  if (!gameOver){
  moveRocks()
  drawHeart()
  drawBoss1()

    }
  drawRocks()
