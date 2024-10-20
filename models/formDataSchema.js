const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    Token: {
        type: String,
        default: null
    },
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
