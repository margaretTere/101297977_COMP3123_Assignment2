const mongoose = require('mongoose');

const user = new mongoose.Schema({
    
    username:{
      type: String,
      unique: true,
      required: [true, 'User must have a username']
    },
    email: {
        type: String, 
        unique: true,
        required: [true, 'User must have a email']
      },
    password: {
        type: String,
        required: [true, 'User must have a password']
    },
    created_at: {
       type: Date,
       default: Date.now()
    },
    updated_at:{
       type: Date,
       default: Date.now()
    }
});

const User = mongoose.model('User', user);

module.exports = User;