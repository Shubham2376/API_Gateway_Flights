const {StatusCodes} = require("http-status-codes");
const {ErrorResponse} = require('../utils/common');
const AppError = require("../utils/errors/app-error");
function validateAuthRequest(req,res,next){

    if(!req.body.email){
            ErrorResponse.message = "something went wrong while creating authenticating the email"
    // ErrorResponse.error = {explanation : "modelNumber Not Found in incoming request"}
            ErrorResponse.error = new AppError(['email Not Found in incoming request in the correct from'],StatusCodes.BAD_REQUEST)
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.password){
            ErrorResponse.message = "something went wrong while creating authenticating the password"
    // ErrorResponse.error = {explanation : "modelNumber Not Found in incoming request"}
            ErrorResponse.error = new AppError(['password Not Found in incoming request in the correct from'],StatusCodes.BAD_REQUEST)
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    next();
}
module.exports = {
    validateAuthRequest
}