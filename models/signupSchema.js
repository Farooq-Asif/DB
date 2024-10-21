const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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
    Token: {
        type: String,
        default: null
    },
    SignUpAt: {
        type: Date,
        default: Date.now
    }


});

const SignupSchema = mongoose.model('SignUpData', signupSchema);

module.exports = SignupSchema;
