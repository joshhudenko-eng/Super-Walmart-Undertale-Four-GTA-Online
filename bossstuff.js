let boss;
let hat;

async function loadStuff() {
  
    boss = await loadImage("Images/boss.png");
    hat = await loadImage("Images/HatWalmart.png");
 
}

function drawBoss() {
if (!boss || !boss.width) return;
  push()
  imageMode(CENTER);
  image(boss, 320, 120);
  pop();
}

function drawHat() {
    if (!hat || !hat.width) return;
    push()
    imageMode(CENTER)
    image(hat,320,90)
    pop()
}