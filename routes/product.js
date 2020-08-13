var express = require('express');
var router = express.Router();
var productController = require("../controller/productController")
let { isAuth, isAdmin } = require("../config/auth")


router.get('/products', productController.findAllProducts);
router.get('/:id', productController.findProductById);
router.post('/', isAuth, isAdmin, productController.adminCreateProduct);
router.put('/:id', isAuth, isAdmin, productController.adminUpdateProductById);
router.delete('/:id', isAuth, isAdmin, productController.adminDeleteProductById);


module.exports = router;
