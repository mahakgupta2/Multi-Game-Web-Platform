const mongoose = require('mongoose');
 
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    }
})

const User=mongoose.model("User",userSchema);

module.exports=User;