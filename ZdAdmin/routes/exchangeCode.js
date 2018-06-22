var express = require('express');
var exchangeCode = express.Router();

var platform = require('./exchangeCode/merchant');

exchangeCode.use("/platform",platform);


module.exports = exchangeCode;