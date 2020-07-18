const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        likes: {
            type: Array
        }
    },
    { timestamps: true },
);

// Model
const PostModel = mongoose.model(
    'post',
    PostSchema,
);

// Export 
module.exports = PostModel;