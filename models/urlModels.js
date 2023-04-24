const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl: {
      type: String,
      required: true
    }
});

const urlModel = mongoose.model("url",urlSchema);

module.exports= urlModel;