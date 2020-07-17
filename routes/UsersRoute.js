const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

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
            password: req.body.password
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
                    return res.json({message: 'Please check email or password'});
                }
                bcrypt.compare(formData.password, document.password).then(
                    (isMatch) => {
                        if (!isMatch) {
                            return res.json({message: 'Please check email or password'});
                        }

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
                    }
                )               
            }
        );
    }
);

// Update
router.post(
    '/update',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const updateFormData  = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
        };

        UsersModel.findByIdAndUpdate(
            {_id: req.body._id},
            updateFormData,
            {},
            (err, updatedUser) => {
                if(err) {
                    console.log(err);
                } else {
                    bcrypt.genSalt(
                        (err, salt) => {
                            bcrypt.hash(
                                updateFormData.password,
                                salt,
                                (err, hashedPassword) => {
                                    updatedUser.password = hashedPassword;
                                    updatedUser.save(
                                        (err, dbResult) => {
                                            if(err) {
                                                res.json({message: err});
                                            } else{
                                                res.json({message: 'User updated'});
                                            }
                                        }
                                    );
                                }
                            )
                        }
                    );
                }
            }
        ); 
    }
);

module.exports = router;