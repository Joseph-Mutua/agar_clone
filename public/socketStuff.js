let socket = io.connect("http://localhost:8000");

//this function is called when the user clicks on start button
function init() {
  draw();
  // console.log(orbs);
  //Call
  socket.emit("init", {
    playerName: player.name,
  });
}

socket.on("initReturn", (data) => {
  //   console.log(data.orbs);
  orbs = data.orbs;
  setInterval(() => {
    socket.emit("tick", {
      xVector: player.xVector,
      yVector: player.yVector,
    });
  });
});

socket.on("tock", (data) => {
  console.log(data);
  players = data.players;
  player.locX = data.playerX;
  player.locY = data.playerY;
});
