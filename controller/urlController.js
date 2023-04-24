const create = async(req,res,next) => {
    try {
        const {originalUrl} = req.body;
        
    } catch (err) {
        next(err);
    }
}

module.exports = {
    create
}