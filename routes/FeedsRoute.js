const express = require('express');
const router = express.Router();

const FeedsModel = require('../models/FeedsModel.js');

// Saving feed
router.post(
    '/',
    (req, res) => {
        const formData = {
            text: req.body.text,
            date: req.body.date
            //likes: req.body.likes

        };
        console.log('from the user', formData);

        const newFeedModel = new FeedsModel(formData);
        newFeedModel.save();
        res.send('Your POST feed has been received');
    }
);

// Likes
router.post(
    '/likes',
    (req, res) => {
        FeedsModel.findById(req.body.feed_id)
                    .then(
                        (document) => {
                            if (document.likes.indexOf(req.user._id) !== -1) {
                                document.likes.pop(req.user._id);
                            } else {
                                document.likes.push(req.user._id);
                            }
                            document.save();
                        }
                    )
                    .catch(
                        (err) => {
                            console.log('err: ', err);
                        }
                    )
        res.send('Your POST likes has been received');
    }
);

// Get feeds
router.get(
    '/',
    (req, res) => {
        FeedsModel.find()
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