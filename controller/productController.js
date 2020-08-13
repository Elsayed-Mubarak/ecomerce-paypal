var express = require('express');
const Product = require("../models/productModel")


// find all products
exports.findAllProducts = async (req, res) => {

    try {
        const products = await Product.find({});
        res.send(products);
    } catch (err) {
        console.log(".......catch err.in find all product......", err)
    }
}

//find products by id
exports.findProductById = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        res.send(product);
    } catch (err) {
        console.log(".......catch err.in find by id product......", err)
    }
}


//create products by admin
exports.adminCreateProduct = async (req, res) => {

    try {
        const product = new Product({
            name: 'sample product',
            description: 'sample desc',
            category: 'sample category',
            brand: 'sample brand',
            image: '/images/product-1.jpg',
        });
        const createdProduct = await product.save();
        if (createdProduct) {
            res
                .status(201)
                .send({ message: 'Product Created', product: createdProduct });
        } else {
            res.status(500).send({ message: 'Error in creating product' });
        }
    } catch (err) {
        console.log(".......catch err.in admin create product......", err)
    }
}


// update product by admin
exports.adminUpdateProductById = async (req, res) => {

    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.brand = req.body.brand;
            product.category = req.body.category;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            const updatedProduct = await product.save();
            if (updatedProduct) {
                res.send({ message: 'Product Updated', product: updatedProduct });
            } else {
                res.status(500).send({ message: 'Error in updaing product' });
            }
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    } catch (err) {
        console.log(".......catch err.in admin update product......", err)
    }
}


// delete product by admin
exports.adminDeleteProductById = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        if (product) {
          const deletedProduct = await product.remove();
          res.send({ message: 'Product Deleted', product: deletedProduct });
        } else {
          res.status(404).send({ message: 'Product Not Found' });
        }
    } catch (err) {
        console.log(".......catch err.in admin delete product......", err)
    }
}







