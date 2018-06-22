var express = require('express');
var criticismRouter = express.Router();
var criticism = require('./criticism/criticismManage');

criticismRouter.use("/criticismManage",criticism);

module.exports = criticismRouter;