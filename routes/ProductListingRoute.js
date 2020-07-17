const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/ProductsModel.js');


// Get products 
router.get(
    '/',
    (req, res) => {
        ProductsModel.find()
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