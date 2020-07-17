const mongoose = require('mongoose');

const FeedsSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        likes: {
            type: Array
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }
);

const FeedsModel = mongoose.model(
    'feeds',
    FeedsSchema,
);

module.exports = FeedsModel;