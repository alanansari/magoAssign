const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    shortUrl:{
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