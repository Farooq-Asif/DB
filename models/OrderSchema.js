const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        default: null
    },
    category: {
        type: String,
        default: true
    },
    customerName: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Order Data', OrderSchema);
