function newRocks(){
  const x = width/2
  const y = 140

  const angle = atan2(heartY - y, heartX - x)
  //to change the speed of the projectiles change theese values
  const speed = random(3, 5)

  rocks.push({
    x:x,
    y:y,
    dx: cos(angle) * speed,
    dy: sin(angle) * speed,
    color: "white",
    diameter: random(5,20),
  })
}

function moveRocks(){
  for (let i= 0; i < rocks.length; i++){
    rocks[i].x = rocks[i].x + rocks[i].dx
    rocks[i].y = rocks[i].y + rocks[i].dy
  }
}

function drawRocks(){
  for ( let i = 0; i < rocks.length; i++){
    push()
    noStroke()
    fill(rocks[i].color)
    circle(rocks[i].x,rocks[i].y,rocks[i].diameter)
    pop()
  }

  //to change amount of projectiles change this number ( the lower the more spawn)
  const spawnRate = 10
  if (frameCount % spawnRate === 0 && !gameOver){
    newRocks()
  }
}

function damageFromRocks(){
for (let i = rocks.length -1; i>=0; i--){
  const d = dist(rocks[i].x, rocks[i].y, heartX, heartY)
  if(d < rocks[i].diameter/2 + 7 && !playerDead){
    rocks.splice(i,1)
takePlayerDamage()
}
}
}