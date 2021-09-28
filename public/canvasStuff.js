function init() {
  draw();
  console.log(orbs);
}

// =============DRAWING=============
// =================================

player.locX = Math.floor(500 * Math.random() + 10);
player.locY = Math.floor(500 * Math.random() + 10);

function draw() {
  //Reset Translation back to default
  context.setTransform(1, 0, 0, 1, 0, 0);

  //Clear the Screen out so the last stuff is gone from the game
  context.clearRect(0, 0, canvas.width, canvas.height);

  //Clamp the camera to the player
  const camX = -player.locX + canvas.width / 2;
  const camY = -player.locY + canvas.height / 2;

  //Translate alows us to move the canvas around
  context.translate(camX, camY);

  context.beginPath();
  context.fillStyle = "rgb(255,0,0)";

  //Arg 1,2 = x, y coordinates of circle
  //Arg 3 = Radius
  //Arg 4 = Where to Start on the Circle in Radians
  //Arg 5 = Where to Stop in Radians
  context.arc(player.locX, player.locY, 10, 0, Math.PI * 2);
  // context.arc(200, 200, 10, 0, Math.PI * 2);

  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = "rgb(0, 255, 0)";
  context.stroke();

  orbs.forEach((orb) => {
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
    context.fill();
  });

  requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", (event) => {
  // console.log(event);
  const mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
  const angleDeg =
    (Math.atan2(
      mousePosition.y - canvas.height / 2,
      mousePosition.x - canvas.width / 2
    ) *
      180) /
    Math.PI;
  if (angleDeg >= 0 && angleDeg < 90) {
    xVector = 1 - angleDeg / 90;
    yVector = -(angleDeg / 90);
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
  } else if (angleDeg >= -180 && angleDeg < -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
  } else if (angleDeg < 0 && angleDeg >= -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
  }

  speed = 10;
  xV = xVector;
  yV = yVector;

  if (
    (player.locX < 5 && player.xVector < 0) ||
    (player.locX > 500 && xV > 0)
  ) {
    player.locY -= speed * yV;
  } else if ((player.locY < 5 && yV > 0) || (player.locY > 500 && yV < 0)) {
    player.locX += speed * xV;
  } else {
    player.locX += speed * xV;
    player.locY -= speed * yV;
  }
});
