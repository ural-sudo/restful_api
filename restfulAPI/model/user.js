
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,

    }
},{collection:'users'}); 

const User = mongoose.model('User',UserSchema);

module.exports = User;