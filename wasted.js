let wastedShown = false;

function showWasted() {
  if (wastedShown) return;

  let canvas = document.querySelector("canvas");
  if (!canvas) return;

  wastedShown = true;

  // Stop background music
  if (typeof bgMusic !== "undefined") {
    bgMusic.pause();
  }

  // Create overlay matching the game canvas
  let bounds = canvas.getBoundingClientRect();
  let overlay = document.createElement("div");

  overlay.style.position = "fixed";
  overlay.style.left = bounds.left + "px";
  overlay.style.top = bounds.top + "px";
  overlay.style.width = bounds.width + "px";
  overlay.style.height = bounds.height + "px";
  overlay.style.background = "black";
  overlay.style.zIndex = "9999";

  // Create the WASTED video
  let video = document.createElement("video");
  video.src = "Video/Wasted.mp4";

  video.onerror = function () {
  console.error("Video error code:", video.error && video.error.code, video.error && video.error.message);
};
video.onloadeddata = function () {
  console.log("Video loaded OK");
};

  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "cover";

  video.playsInline = true;
  video.controls = false;

  overlay.appendChild(video);
  document.body.appendChild(overlay);

  // Play video once
  video.play().catch(() => {
    // Some browsers require a click for audio
    overlay.addEventListener("click", () => {
      video.play();
    }, { once: true });
  });
}