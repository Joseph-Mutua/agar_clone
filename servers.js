const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
const socketio = require("socket.io");
const expressServer = app.listen(8000,() => {
    console.log(`Express server is running on port 8000`)
});

const io = socketio(expressServer);
const helmet = require("helmet");

module.exports ={
    app, 
    io
}