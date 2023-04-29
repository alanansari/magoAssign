const User = require("../models/userModel");
const Url = require("../models/urlModel");
const { ErrorHandler } = require('../middleware/errors');
const {validateUrl} = require('../utils/validation');
require('dotenv').config();
const base = process.env.BASE;
const shortid = require('shortid');
const Redis = require('redis');
const client = Redis.createClient();

const redirectToSite = async(req,res,next) => {
    try {
        const {urlId} = req.params;
        await client.connect();
        const value = await client.get(`${base}/${urlId}`);
        if(value){
            await client.disconnect();
            return res.status(200).redirect(value);
        }
        else{
            const url = await Url.findOne({shortUrlId:`${urlId}`});
            if(url){
                
                await client.setEx(url.shortUrlId,60*60,url.originalUrl);
                await client.disconnect();
                return res.status(200).redirect(url.originalUrl);
            }
            else{
                await client.disconnect();
                return next(new ErrorHandler(400,"Url not found"));
            }
        }
    } catch (err) {
        return next(err);
    }
}

const generateShortUrl = async(req,res,next) => {
    try {
        const {originalUrl} = req.body;
        const user = req.user;

        // if(!validateUrl(originalUrl))
        //     return next(new ErrorHandler(406,"Wrong url format"));
        const thisuser = await User.findById(user._id).populate('urls');
        
        
        for(const url in thisuser.urls){
            if(thisuser.urls[url].originalUrl===originalUrl){
                return res.status(200).
                json({
                    success:true,
                    msg:"A short url for this url already exists",
                    url:`${base}/${thisuser.urls[url].shortUrlId}`});
            }
        }
        
        
        

        const urlId = shortid.generate();

        const url = await Url.create({
            shortUrlId:   `${urlId}`,
            originalUrl
        });

        let userurls = user.urls;
        const set = new Set([...userurls,url._id]);
        user.urls = [...set];
        await user.save();
        
        return res.status(201).json({success:true,msg:"Created short url",url:`${base}/${url.shortUrlId}`});
        
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    redirectToSite,
    generateShortUrl
}