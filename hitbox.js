// let collisionImage = new Image();
// collisionImage.src = "PopUp/Images/FaceAd.png";

function checkPopupHeartCollision() {

    // popup hitbox
    let popLeft = popupX;
    let popRight = popupX + popupWidth;
    let popTop = popupY;
    let popBottom = popupY + popupHeight;

    // heart hitbox
    let heartLeft = heartX - 7.5;
    let heartRight = heartX + 7.5;
    let heartTop = heartY - 7.5;
    let heartBottom = heartY + 7.5;

    // check for overlap
    let collision =
        popRight > heartLeft &&
        popLeft < heartRight &&
        popBottom > heartTop &&
        popTop < heartBottom;

    // draw image when collision happens
    if (collision) {
        push();
        imageMode(CENTER);
        loadImage("FaceAd.png", width/2, height/2, 200, 150)
        pop();
    }
}