//Where all Main Socket stuff will reside
const { io } = require("../servers");

const Orb = require("./classes/Orb");
let orbs = [];

initGame();

io.on("connect", (socket) => {
  socket.emit("init", {
    orbs,
  });
});

//Run at the eginning of a new game
function initGame() {
  for (let i = 0; i < 500; i++) {
    orbs.push(new Orb());
  }
}

module.exports = io;