const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please enter a valid email address'
        ]
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
