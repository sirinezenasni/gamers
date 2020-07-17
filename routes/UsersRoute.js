const express = require('express');
const router = express.Router();

const UsersModel = require('../models/UsersModel.js');

// Register
router.post(
    '/register',
    (req, res) => {
        const formData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            date: req.body.date
        };
        
        const newUsersModel = new UsersModel(formData);
        newUsersModel.save();
        res.send('Your POST has been received');
    }
);


module.exports = router;