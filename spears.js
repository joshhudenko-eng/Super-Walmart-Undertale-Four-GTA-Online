let spears = []
const spearSpots = 8
const spearSpeed = 6.5
const spearShaftW = 8
const spearShaftH = 80
const spearHeadW = 30
const spearHeadH = 24
const spearLength = spearShaftH + spearHeadH
let spearTimers = []

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
  fill("white")
  for (let s of spears){
    rect(s.x - spearShaftW/2, s.y, spearShaftW, spearShaftH)
    triangle(s.x - spearHeadW/2, s.y + spearShaftH, s.x + spearHeadW/2, s.y + spearShaftH, s.x, s.y + spearLength)
  }
  pop()
}

function spawnSpearRow(){
  let gap = floor(random(1, spearSpots - 1))

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
    spearTimers.push(setTimeout(spawnSpearRow, i * 1000))
  }
}

function stopSpears(){
  for (let t of spearTimers) clearTimeout(t)
  spearTimers = []
  spears = []
}


function damageFromSpears(){
  for (let i = spears.length - 1; i >= 0; i--){
    const d = dist(spears[i].x, spears[i].y, heartX, heartY)
    if(d < spearShaftW/2 + 7 && !playerDead){
      spears.splice(i,1)
      takePlayerDamage()
    }
  }
}