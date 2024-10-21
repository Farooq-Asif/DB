const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
});

module.exports = mongoose.model('Item Category', CategorySchema);
