var express = require('express');
var gamesRouter = express.Router();
var games = require('./games/gamesMan');

gamesRouter.use("/gamesMan",games);

module.exports = gamesRouter;