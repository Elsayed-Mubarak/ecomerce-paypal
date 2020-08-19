var express = require('express');
var router = express.Router();
var brainTreeController = require("../controller/brainTreePayment")


router.get('/initializeBraintree', brainTreeController.initializeBraintree);
router.get('/confirmBraintree', brainTreeController.confirmBraintree);



module.exports = router;