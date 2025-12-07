const {StatusCodes} = require("http-status-codes");
const {ErrorResponse} = require('../utils/common');
const AppError = require("../utils/errors/app-error");
const {UserService} = require('../services')
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

async function checkAuth(req,res,next){
    try{
        const response = await UserService.isAuthenticated(req.headers['x-access-token']); //from the service you returing the id 
        if(response){
            // before calling next middleware what you can do that inside your req object you can do one simple thing that you add new key user and set that as response which was user-id
            // if the user was authenticated then the any api that we internally implemented can actually access the user id directly from req.user
            // you check the auth and somehow you routed into your booking service then in that point of time how you know that which user making a booking either you manually set the user id or in a req object i can check is the req.user parameter filled that means we already access user id and user is authenticated so this is going to be signifer for down stream api that incoming user was authenticated and incoming request was authentcated 
            req.user = response; //setting the user id in the req body
        }
        next();
    }
    catch(err){
         return res
                .status(err.statusCode)
                .json(err)
    }
}
async function isAdmin(req,res,next){
    // first of all we have to check that user was signed in or not because if you are not signed in you can't allocate role to someone else and then you need to check it that whoseever was signed in are they admin or not
        // when we do user authenticated we set user property on req body isAuthenticated return the user.id 
        const response = await UserService.isAdmin(req.user);
        if(!response){
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({message:"user not authorized for this action"});
        }
        next();

}

module.exports = {
    validateAuthRequest,
    checkAuth,
    isAdmin
}