const express = require('express');
const router = express.Router();
const PostModel = require('../models/PostModel.js');


// Get Post
router.get(
    '/',
    (req, res) => {
        PostModel.find()
        .then(
            (results) => {
                res.json(results);
            }
        )
        .catch(
            (e) => {
                console.log('error occured', e);
            }
        );
    }
);

module.exports = router;