let lives = 3;

function drawLives() {
    for (let i = 0; i < lives; i++) {
        drawHeart(30 + i * 35, 30);
    }
}