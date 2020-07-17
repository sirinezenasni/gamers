const express = require('express');
const router = express.Router();
const PostModel = require('../models/PostModel');

// Saving Post
router.post(
    '/',
    (req, res) => {
        const formData = {
            text: req.body.text
        };

        const newPostModel = new PostModel(formData);
        newPostModel.save();

        res.send('Your Post has been received');
    }
);

// Update
router.post(
    '/update',
    (req, res) => {
        const formData  = {
            text: req.body.text,
            _id: req.body._id
        };

        PostModel.findByIdAndUpdate(
            {_id: formData._id},
            {text: req.body.text},
            {},
            (err, document) => {
                if(err) {
                    console.log(err);
             } else {
                    res.json (
                        {
                            message : "you're Post is updated",
                            document: document
                        }
                    )
                }
            }
        )
    }
)

// Likes
router.post(
    '/likes',
    (req, res) => {
        PostModel.findById(req.body.feed_id)
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
        res.send('Your like has been received');
    }
);

module.exports = router;