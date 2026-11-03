let spears = []
const spearSpots = 8
const spearSpeed = 10
const spearShaftW = 8
const spearShaftH = 80
const spearHeadW = 30
const spearHeadH = 24
const spearLength = spearShaftH + spearHeadH

function spawnSpears(x){
  spears.push({x: x, y: -spearLength})
}
function moveSpears(){
  for(let i = spears.length -1; i>= 0; i--){
    spears[i].y += spearSpeed
    if (spears[i].y > height){
      spears.splice(i,1)
    }
  }
}

function drawSpears(){
  push()
  rectMode(CORNER)
  noStroke()
  for (let s of spears){
    fill("white")
    rect(s.x - spearShaftW/2, s.y, spearShaftW, spearShaftH)
    triangle(s.x - spearHeadW/2, s.y + spearShaftH, s.x + spearHeadW/2, s.y + spearShaftH, s.x, s.y + spearLength)
      
    }
  pop()
  }

function spawnSpearRow(){
  let spotW = width / spearSpots
  let gap = floor(random(spearSpots))

  for (let i = 0; i < spearSpots; i++){
    if (i !== gap){
      // if you want to adjust where they spawn its the first variable
      spawnSpears(width /3 + i * spearHeadW)
    }
  }
}

function spearAttack(){
  // if you want to adjust how many phases its the second part
  for(let i = 0; i < 5; i++){
    //if you wanto to adjust time between spears its the last variable in milliseconds
    setTimeout(spawnSpearRow, i * 1000)
  }
}
  function keyPressed(){
    if (key === '1') spearAttack()
  }
