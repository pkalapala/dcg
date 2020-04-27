var logger=require("winston");

const errorHandler = (error, req, res, next) => {    
    res.status(500);    
    res.json({"error":"System Error!"});
};

const logErrors = (error, req, res, next) => {
    logger.error(error.stack);
    next(error);
};

module.exports = { errorHandler, logErrors };