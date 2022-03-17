const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type:String, 
        required:true, 
        trim:true
    },
    age:{
        type:Number, 
        required:true, 
    },
    mobile:{
        type:Number, 
        required:true,
        unique:true
    },
    city:{
        type:String, 
        required:true
    },
    email:{
        type:String, 
        required:true,
        unique:true
    }, 
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String, 
        required:true
    }

   

});

module.exports = mongoose.model('TodoUser', userSchema)