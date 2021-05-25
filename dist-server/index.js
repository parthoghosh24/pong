"use strict";

var colyseus = require("colyseus");

var monitor = require("@colyseus/monitor");

var http = require("http");

var express = require("express");

var cors = require("cors");

var _require = require("./rooms/PongRoom"),
    PongRoom = _require["default"];

var port = process.env.port || 3000;
var app = express();
app.use(express.json());
app.use(cors());
var gameServer = new colyseus.Server({
  server: http.createServer(app)
});
gameServer.define('pong_room', PongRoom);
app.use('/colyseus', monitor.monitor());
gameServer.listen(port);
console.log("Listening on ws://localhost:".concat(port));