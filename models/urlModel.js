const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const urlSchema = mongoose.Schema({
    user:{
      type:ObjectId
    },
    shortUrlId:{
        type:String,
        required:true,
        unique:true
    },
    originalUrl: {
      type: String,
      required: true
    }
});

const urlModel = mongoose.model("url",urlSchema);

module.exports= urlModel;