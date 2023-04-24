const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    },
    urls: [{
        type: ObjectId,
        ref: 'url'
    }]
});

const userModel = mongoose.model("user",userSchema);

module.exports= userModel;