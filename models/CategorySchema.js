const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    IsActive:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
});

module.exports = mongoose.model('Item Category', CategorySchema);
