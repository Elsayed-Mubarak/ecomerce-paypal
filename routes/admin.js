var express = require('express');
var router = express.Router();
var adminController = require("../controller/adminController")

router.get('/createAdmin', adminController.createAdmin);


module.exports = router;
