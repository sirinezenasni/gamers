const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/ProductsModel.js');

// Saving product
router.post(
    '/',
    (req, res) => {
        const formData = {
            text: req.body.text
        };

        const newProductModel = new ProductsModel(formData);
        newProductModel.save();

        res.send('Your POST products has been received');
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

        ProductsModel.findByIdAndUpdate(
            {_id: formData._id},
            {text: req.body.text},
            {},
            (err, document) => {
                if(err) {
                    console.log(err);
             } else {
                    res.json (
                        {
                            message : "you're product is updated",
                            document: document
                        }
                    )
                }
            }
        )
    }
)

module.exports = router;