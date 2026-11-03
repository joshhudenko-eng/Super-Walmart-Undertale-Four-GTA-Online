function drawLives() {

    for (let i = 0; i < lives; i++) {
        translate(0, 0)
        drawHeart(30 + i * 35, 30);
    }
}