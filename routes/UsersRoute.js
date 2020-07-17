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

// Login 
router.post(
    '/login',
    (req, res) => {
        const formData = {
            email: req.body.email,
            password: req.body.password
        };

        console.log("formData: ", formData);

        UsersModel.findOne(
            {email: formData.email},
            (err, document) => {
                if (!document) {
                    res.json({message: 'Please check email or password'});
                } else {
                    bcrypt.compare(formData.password, document.password).then(
                        (isMatch) => {
                            if (isMatch === true) {
                                const payload = {
                                    id: document.id,
                                    email: document.email
                                };

                                jwt.sign(
                                    payload,
                                    secret,
                                    (err, jsonwebtoken) => {
                                        res.json(
                                            {
                                                message: 'login successful',
                                                jsonwebtoken: jsonwebtoken
                                            }
                                        )
                                    }
                                )
                            } else {
                                res.json({message: 'Please check email or password'});
                            }
                        }
                    )               
                }
            }
        );
    }
);

// Update
router.post(
    '/update',
    (req, res) => {
        const formData  = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            _id: req.body._id
        };

        UsersModel.findByIdAndUpdate(
            {_id: formData._id},
            {firstName: req.body.firstName, lastName: req.body.lastName, userName: req.body.userName, password: req.body.password},
            {},
            (err, document) => {
                if(err) {
                    console.log(err);
             } else {
                    res.json (
                        {
                            message : "your first name is updated",
                            document: document
                        }
                    )
                }
            }
        );
    }
);

module.exports = router;