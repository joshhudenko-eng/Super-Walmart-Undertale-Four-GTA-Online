let lives = 3;

function drawLives() {
    for (let i = 0; i < lives; i++) {
        push();
        translate(30 + i * 35, 30);
        drawHeart();
        pop();
    }
}