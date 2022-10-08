import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    password: {
        type: String,
        required : true,
    },
    phone:{
        type : Number,
        required : true,
        unique : true
    },
    favorites:{
        type : Array,
    }
} , {timestamps:true});

export const UserModel = mongoose.model("User" , UserSchema);