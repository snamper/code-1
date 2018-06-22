var express = require('express');
var appUserContRouter = express.Router();
var appUserControl = require('./appUserControl/appUserMan');

appUserContRouter.use("/appUserMan",appUserControl);

module.exports = appUserContRouter;