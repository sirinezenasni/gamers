const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 's3cr3t1000';

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

        bcrypt.genSalt(
            (err, salt) => {
                bcrypt.hash(
                    formData.password,
                    salt,
                    (err, hashedPassword) => {
                        const newUsersModel = new UsersModel(formData);
                        newUsersModel.password = hashedPassword;
                        newUsersModel.save(
                            (err, dbResult) => {
                                if(err) {
                                    res.json({message: err});
                                } else{
                                    res.json({message: 'user has been saved'});
                                }
                            }
                        );
                    }
                )
            }
        );
    }
);



module.exports = router;