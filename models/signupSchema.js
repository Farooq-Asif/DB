const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
