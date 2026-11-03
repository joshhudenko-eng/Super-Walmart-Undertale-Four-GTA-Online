// Projectile creation and movement for the dodge phase.
const rockSpawnRate = 10;

function newRocks() {
  const x = width / 2;
  const y = height / 2;
  const angle = atan2(heartY - y, heartX - x);
  const speed = random(1, 3);

  rocks.push({
    x,
    y,
    dx: cos(angle) * speed,
    dy: sin(angle) * speed,
    color: "white",
    diameter: random(5, 20)
  });
}

function moveRocks() {
  for (let i = 0; i < rocks.length; i++) {
    rocks[i].x += rocks[i].dx;
    rocks[i].y += rocks[i].dy;
  }
}

function drawRocks() {
  // Spawn while dodging; keeping this inside a function avoids top-level
  // frameCount access and lets the main game control when projectiles appear.
  if (frameCount % rockSpawnRate === 0 && !gameOver) {
    newRocks();
  }

  for (let i = 0; i < rocks.length; i++) {
    push();
    noStroke();
    fill(rocks[i].color);
    circle(rocks[i].x, rocks[i].y, rocks[i].diameter);
    pop();
  }

  // Discard projectiles after they leave the canvas.
  rocks = rocks.filter((rock) =>
    rock.x > -30 && rock.x < width + 30 &&
    rock.y > -30 && rock.y < height + 30
  );
}
