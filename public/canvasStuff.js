function init() {
  draw();
}

// =============DRAWING=============
// =================================

let randomX = Math.floor(500 * Math.random() + 10);
let randomY = Math.floor(500 * Math.random() + 10);
// console.log(randomX);
// console.log(randomY);

function draw() {
  context.beginPath();
  context.fillStyle = "rgb(255,0,0)";

  //Arg 1,2 = x, y coordinates of circle
  //Arg 3 = Radius
  //Arg 4 = Where to Start on the Circle in Radians
  //Arg 5 = Where to Stop in Radians
  context.arc(randomX, randomY, 10, 0, Math.PI * 2);
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = "rgb(0, 255, 0)";
  context.stroke();
  requestAnimationFrame(draw);
}
