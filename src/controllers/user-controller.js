const {StatusCodes} = require('http-status-codes');
const {UserService} = require("../services");
const {ErrorResponse,SuccessResponse} = require("../utils/common");
/**
 * if you create an cities how the API looks like 
 * the API looks like this 
 * it will be the POST request : /signup
 * req-body -> {email : 'London',password:'1234'}
 */
async function signup(req,res){
    try{
        console.log("Inside Controller")
        const user = await UserService.create({
            email : req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    }
    catch(error){
        console.log("hi");
        //console.log(error)
        ErrorResponse.error = error
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse)
    }
}
module.exports = {
    signup
}