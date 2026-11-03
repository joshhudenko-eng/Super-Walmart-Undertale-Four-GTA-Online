
let wastedShown = false;

function showWasted() {

  if (wastedShown) return;

  // Find the game canvas
  let canvas = document.querySelector("canvas");

  if (!canvas) {
    console.error("Canvas not found!");
    return;
  }

  wastedShown = true;

  // Stop background music
  if (typeof bgMusic !== "undefined") {
    bgMusic.pause();
  }

  // Stop Gualmart sound
  if (typeof popupSound !== "undefined") {
    popupSound.pause();
  }

  // Get canvas position and size
  let bounds = canvas.getBoundingClientRect();

  // Create gray transparent overlay
  let overlay = document.createElement("div");

  overlay.style.position = "fixed";
  overlay.style.left = bounds.left + "px";
  overlay.style.top = bounds.top + "px";
  overlay.style.width = bounds.width + "px";
  overlay.style.height = bounds.height + "px";

  overlay.style.background = "rgba(100,100,100,0.65)";
  overlay.style.zIndex = "9999";

  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";

  // Create dark horizontal strip
  let strip = document.createElement("div");

  strip.style.width = "100%";
  strip.style.height = "100px";
  strip.style.background = "rgba(0,0,0,0.5)";

  strip.style.display = "flex";
  strip.style.alignItems = "center";
  strip.style.justifyContent = "center";

  // Create WASTED text
  let wastedText = document.createElement("div");

  wastedText.textContent = "WASTED";

  wastedText.style.color = "#cc3333";
  wastedText.style.fontSize = "64px";
  wastedText.style.fontFamily = "Arial, sans-serif";
  wastedText.style.fontWeight = "bold";
  wastedText.style.letterSpacing = "4px";
  wastedText.style.textShadow = "2px 2px 8px black";

  // Put everything together
  strip.appendChild(wastedText);
  overlay.appendChild(strip);
  document.body.appendChild(overlay);

  // Freeze the game AFTER creating overlay
  noLoop();
}
