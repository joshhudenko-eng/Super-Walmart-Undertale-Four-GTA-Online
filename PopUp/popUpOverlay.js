
let popupImage = new Image();
let popupLoaded = false;

let popupSound = new Audio(
  "PopUp/Sound/gualmartSound.mp3"
);

let popupSoundEnabled = false;

// Popup position and size
// Image position and size
let popupX = 100;
let popupY = 100;
let popupWidth = 100;
let popupHeight = 90;

// Movement speed
let popupVX = 3;
let popupVY = 2;

// Load the popup image
popupImage.onload = function() {
  popupLoaded = true;
  console.log("Popup image loaded!");
};

popupImage.onerror = function() {
  console.error("Popup image failed to load!");
// Load the image
popupImage.onload = function() {
  popupLoaded = true;
};

popupImage.onerror = function() {
  console.error("Popup image could not load");
};

popupImage.src = "PopUp/Images/FaceAd.png";

// Prepare sound
// Load sound
popupSound.preload = "auto";

// Enable sound when player clicks
function enablePopupSound() {
  if (!popupSoundEnabled) {
    popupSoundEnabled = true;
    playPopupSound();
  }
}

// Play the popup sound safely
function playPopupSound() {
  if (!popupSound) return;

  if (popupSound.readyState < 2) {
    return;
  }

  try {
    popupSound.pause();
    popupSound.currentTime = 0;

    popupSound.play().catch(function(error) {
      console.warn("Popup sound could not play:", error);
    });

  } catch (error) {
    console.warn("Popup sound error:", error);
  }
}

// Move and draw popup
function drawPopupOverlay() {

  // Don't draw until image is loaded
  if (!popupLoaded) return;

  // Move popup
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
    popupVX = Math.abs(popupVX);
    popupVX = abs(popupVX);
    hitWall = true;
  }

  // Right wall
  if (popupX >= width - popupWidth) {
    popupX = width - popupWidth;
    popupVX = -Math.abs(popupVX);
    popupVX = -abs(popupVX);
    hitWall = true;
  }

  // Top wall
  if (popupY <= 0) {
    popupY = 0;
    popupVY = Math.abs(popupVY);
    popupVY = abs(popupVY);
    hitWall = true;
  }

  // Bottom wall
  if (popupY >= height - popupHeight) {
    popupY = height - popupHeight;
    popupVY = -Math.abs(popupVY);
    hitWall = true;
  }

  // Play sound when hitting a wall
    popupVY = -abs(popupVY);
    hitWall = true;
  }

  // Play sound when bouncing
  if (hitWall && popupSoundEnabled) {
    playPopupSound();
  }

  // Draw popup over the game
  // Draw on top of the game
  drawingContext.drawImage(
    popupImage,
    popupX,
    popupY,
    popupWidth,
    popupHeight
  );
}
}
