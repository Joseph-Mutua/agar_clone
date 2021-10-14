// =============DRAWING=============
// =================================

function draw() {
  //Reset Translation back to default
  context.setTransform(1, 0, 0, 1, 0, 0);

  //Clear the Screen out so the last stuff is gone from the game
  context.clearRect(0, 0, canvas.width, canvas.height);

  console.log(player.locX, player.locY);

  //Clamp the camera to the player
  const camX = -player.locX + canvas.width / 2;
  const camY = -player.locY + canvas.height / 2;

  //Translate alows us to move the canvas around
  context.translate(camX, camY);

  //Draw all the players
  players.forEach((p) => {
    context.beginPath();
    context.fillStyle = p.color;

    //Arg 1,2 = x, y coordinates of circle
    //Arg 3 = Radius
    //Arg 4 = Where to Start on the Circle in Radians
    //Arg 5 = Where to Stop in Radians
    context.arc(p.locX, p.locY, 10, 0, Math.PI * 2);
    // context.arc(200, 200, 10, 0, Math.PI * 2);

    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "rgb(0, 255, 0)";
    context.stroke();
  });

  //Draw all the orbs
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

  player.xVector = xVector;
  player.yVector = yVector;
});
