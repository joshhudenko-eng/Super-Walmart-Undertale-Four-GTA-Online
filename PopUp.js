let gualmart;
let gualmartSound;
let item;

let itemSize = 120;


// Create the bouncing image
function createItem() {
  item = {
    x: random(0, 200),
    y: random(0, 200),
    vx: random([-2, 1]),
    vy: random([-2,1])
  };
}

// Click once to enable audio
function mousePressed() {
  userStartAudio();
}
