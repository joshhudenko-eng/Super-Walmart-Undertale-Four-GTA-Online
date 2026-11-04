const sliderLeft = 190
const sliderRight = 450
const sliderTop = 190
const sliderBottom = 285
  
const sliderWidth = 24
const sliderGap = 42
const sliderSpeed = 8


let sliders = []
let sliderTimers = []

function spawnSlider(){
  let gapY = random(sliderTop, sliderBottom - sliderGap)
  sliders.push({x:sliderLeft, gapY: gapY})
}

function moveSliders(){
  for(let i = sliders.length -1; i >=0 ; i--){
    sliders[i].x += sliderSpeed
    if (sliders[i].x +sliderWidth >= sliderRight){
      sliders.splice(i,1)
    }
  }
}

function drawSliders(){
  push()
  rectMode(CORNER)
  noStroke()
  fill("White")
  for (let s of sliders){
    //top bar
    rect(s.x,sliderTop,sliderWidth,s.gapY - sliderTop)
    //bottom
    rect(s.x, s.gapY + sliderGap, sliderWidth, sliderBottom - (s.gapY + sliderGap))
  }
  pop()
}

function sliderAttack(){
  //to change amount of sliders its middle number
  for(let i = 0; i < 5; i ++){
    sliderTimers.push(setTimeout(spawnSlider, i * 800))
  }
}

function stopSliders(){
  for (let t of sliderTimers){
    clearTimeout(t)
    sliderTimers = []
    sliders = []
  }
}

function damageFromSliders(){
  for (let i = sliders.length - 1; i >= 0; i--){
    const d = dist(sliders[i].x, sliders[i].gapY, heartX, heartY)
    if(d < sliderWidth/2 + 7 && !playerDead){
      sliders.splice(i,1)
      takePlayerDamage()
    }
  }
}