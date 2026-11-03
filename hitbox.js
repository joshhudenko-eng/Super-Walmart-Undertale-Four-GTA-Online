function checkPopupHeartCollision() {

  // popUp hitbox
  let popLeft = popupX;
  let popRight = popupX + popupWidth;
  let popTop = popupY;
  let popBottom = popupY + popupHeight;

  // heart hitbox
  let heartLeft = heartX - 7.5;
  let heartRight = heartX + 7.5;
  let heartTop = heartY - 7.5;
  let heartBottom = heartY + 7.5;

  // check if hitboxes overlap
  let collision =
    popRight > heartLeft &&
    popLeft < heartRight &&
    popBottom > heartTop &&
    popTop < heartBottom;

  if (collision) {
    fill("green")
    textSize(20)
    text("U LOSE", 300, 100)
  }
}