//Where all Main Socket stuff will reside
const { io } = require("../servers");

//=======================CLASSES========================
const Player = require("./classes/Player");
const PlayerData = require("./classes/PlayerData");
const PlayerConfig = require("./classes/PlayerConfig");

const Orb = require("./classes/Orb");

let orbs = [];
let players = [];

let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,

  //As player gets bigger, the zoom needs to go out
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
};

initGame();

io.sockets.on("connect", (socket) => {
  let player = {};
  //A player has connected
  socket.on("init", (data) => {
    //Add the player to the game namespace
    socket.join("game");

    //Make a playerConfig Object
    let playerConfig = new PlayerConfig(settings);

    //make a player data object
    let playerData = new PlayerData(data.playerName, settings);

    //make a master player object to hold both
    player = new Player(socket.id, playerConfig, playerData);

    //Issue a message to every connected socket 30fps
    setInterval(() => {
      io.to("game").emit("tock", {
        players,
        playerX: player.playerData.locX,
        playerY: player.playerData.locY,
      });
    }, 33);

    socket.emit("initReturn", {
      orbs,
    });
    players.push(playerData);
  });

  //The server sent over a tick, hence we know what direction to move the player
  socket.on("tick", (data) => {
    //  speed = player.playerConfig.speed;
    speed = 10;

    //Update the Player Config object with the new direction in data
    //Also create a local variable for this callback redability
    xV = player.playerConfig.xVector = data.xVector;
    yV = player.playerConfig.yVector = data.yVector;

    if (
      (player.playerData.locX < 5 && player.playerData.xVector < 0) ||
      (player.playerData.locX > 500 && xV > 0)
    ) {
      player.playerData.locY -= speed * yV;
    } else if (
      (player.playerData.locY < 5 && yV > 0) ||
      (player.playerData.locY > 500 && yV < 0)
    ) {
      player.playerData.locX += speed * xV;
    } else {
      player.playerData.locX += speed * xV;
      player.playerData.locY -= speed * yV;
    }
  });
});

//Run at the eginning of a new game
function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
