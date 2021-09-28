//Where all Main Socket stuff will reside
const { io } = require("../servers");

//=======================CLASSES========================
const Player = require("./classes/Player");
const PlayerData = require("./classes/PlayerData");
const PlayerConfig = require("./classes/PlayerConfig");

const Orb = require("./classes/Orb");

let orbs = [];
let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,

  //As player gets bigger, the zoom needs to go otu
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
};

initGame();

io.on("connect", (socket) => {
  //A player has connected
  //Make a playerConfig Object
  let playerConfig = new PlayerConfig(settings);

  //make a player data object
  let playerData = new PlayerData(null, settings);

  //make a master player object to hold both
  let player = new Player(socket.id, playerConfig, playerData);

  socket.emit("init", {
    orbs,
  });
});

//Run at the eginning of a new game
function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
