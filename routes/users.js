var express = require('express');
var router = express.Router();
var userController = require("../controller/userController")
let { isAuth } = require("../config/auth")


router.post('/register', userController.createUser);
router.post('/signin', userController.signIn);

router.put('/:id', isAuth, userController.updateUser);


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
