const Url = require("../models/urlModel");
const { ErrorHandler } = require('../middleware/errors');
const {validateUrl} = require('../utils/validation');
require('dotenv').config();
const base = process.env.BASE;
const shortid = require('shortid');
const Redis = require('redis');
const client = Redis.createClient();

const EXPIRATION = 10;

const see = async(req,res,next) => {
    try {
        const {urlId} = req.params;
        await client.connect();
        const value = await client.get(`${base}/${urlId}`);
        if(value){
            await client.disconnect();
            return res.status(200).redirect(value);
        }
        else{
            const url = await Url.findOne({shortUrl:`${base}/${urlId}`});
            if(url){
                await client.setEx(url.shortUrl,EXPIRATION,url.originalUrl);
                await client.disconnect();
                return res.status(200).redirect(url.originalUrl);
            }
            else{
                await client.disconnect();
                return next(400,"Url not found");
            }
        }
    } catch (err) {
        next(err);
    }
}

const short = async(req,res,next) => {
    try {
        const {originalUrl} = req.body;
        const user = req.user;

        if(!validateUrl(originalUrl))
            return next(new ErrorHandler(406,"Wrong url format"));
        
        const urlId = shortid.generate();

        const url = await Url.create({
            shortUrl:   `${base}/${urlId}`,
            originalUrl
        });

        let userurls = user.urls;
        const set = new Set([...userurls,url._id]);
        user.urls = [...set];
        
        return res.status(201).json({success:true,msg:"Created short url",url:url.shortUrl});
        
    } catch (err) {
        next(err);
    }
}

module.exports = {
    see,
    short
}