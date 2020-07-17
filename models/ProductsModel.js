const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        }
    }
);

// Model
const ProductsModel = mongoose.model(
    'products',
    ProductsSchema,
);

// Export 
module.exports = ProductsModel;