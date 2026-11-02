function newRocks(){
    const x = width/2
    const y = height/2

  const angle = atan2(heartY - y, heartX - x)
  //to change the speed of the projectiles change theese values
  const speed = random(1, 3)

  rocks.push({
    x: x,
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
}