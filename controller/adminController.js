var express = require('express');
var User = require("../models/userModel")

exports.createAdmin = async (req, res) => {
    try {
        const user = new User({
            name: 'admin',
            email: 'admin@sayed.com',
            password: 'sayed',
            isAdmin: true,
        });
        const createdUser = await user.save();
        res.send(createdUser);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}