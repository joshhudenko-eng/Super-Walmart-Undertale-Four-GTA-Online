let popupImage = new Image();
let popupLoaded = false;

let popupSound = new Audio(
  "PopUp/Sound/gualmartSound.mp3"
);

let popupSoundEnabled = false;

// Image position and size
let popupX = 100;
let popupY = 100;
let popupWidth = 100;
let popupHeight = 90;

// Movement speed
let popupVX = 3;
let popupVY = 2;

// Load the image
popupImage.onload = function() {
  popupLoaded = true;
};

popupImage.onerror = function() {
  console.error("Popup image could not load");
};

popupImage.src = "PopUp/Images/FaceAd.png";

// Load sound
popupSound.preload = "auto";

// Enable sound when player clicks
function enablePopupSound() {
  if (!popupSoundEnabled) {
    popupSoundEnabled = true;
    playPopupSound();
  }
}

// Play sound
function playPopupSound() {
  popupSound.pause();
  popupSound.currentTime = 0;

  popupSound.play().catch(function(error) {
    console.error("Popup sound error:", error);
  });
}

// Draw and move the popup
function drawPopupOverlay() {
  if (!popupLoaded) return;

  popupX += popupVX;
  popupY += popupVY;

  let hitWall = false;

  // Left wall
  if (popupX <= 0) {
    popupX = 0;
    popupVX = abs(popupVX);
    hitWall = true;
  }

  // Right wall
  if (popupX >= width - popupWidth) {
    popupX = width - popupWidth;
    popupVX = -abs(popupVX);
    hitWall = true;
  }

  // Top wall
  if (popupY <= 0) {
    popupY = 0;
    popupVY = abs(popupVY);
    hitWall = true;
  }

  // Bottom wall
  if (popupY >= height - popupHeight) {
    popupY = height - popupHeight;
    popupVY = -abs(popupVY);
    hitWall = true;
  }

  // Play sound when bouncing
  if (hitWall && popupSoundEnabled) {
    playPopupSound();
  }

  // Draw on top of the game
  drawingContext.drawImage(
    popupImage,
    popupX,
    popupY,
    popupWidth,
    popupHeight
  );
}