var express = require('express');
var router = express.Router();
var paymentController = require("../controller/paymentController")


router.post('/pay', paymentController.createPayPalPayment);
router.get('/success', paymentController.excutePayPalPayment);

router.get('/cancel', (req, res) => res.send('Cancelled'));


module.exports = router;