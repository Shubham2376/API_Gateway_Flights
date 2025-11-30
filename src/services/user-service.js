const {UserRepository} = require('../repositories');
const {StatusCodes}= require('http-status-codes')
const userRepo = new UserRepository(); //we make object userRepo from UserRepository class
const AppError = require('../utils/errors/app-error')
const bcrypt = require('bcrypt');
const {Auth} = require('../utils/common')
async function create(data){
    try{
        console.log("Inside Services") 
        const user = await userRepo.create(data);
        return user;
    }
    catch(error){
        //console.log(error)
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            //console.log(explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        // If anything else happen e.g you can’t able to connect with database, etc then the internal server then this line is for that 
        throw new AppError('Cannot Create a new user object',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function signin(data){
    try{
        //first we have to check that whoseever to claiming are they valid or not 
        const user = await userRepo.getUserByEmail(data.email);
        if(!user){
            throw new AppError('No user found for the given email',StatusCodes.NOT_FOUND);
        }
        // if we found the users properly then the users going to be send the plain password you have to compare the plain password with the encrypted password
        const passwordMatched = Auth.checkPassword(data.password,user.password);
        if(!passwordMatched){
            throw new AppError('Invalid Password',StatusCodes.BAD_REQUEST);
        }
        // if password matched then it is the good time to create json web token
        const jwt = Auth.createToken({id:user.id,email:user.email});
        return jwt;
    }
    catch(err){
        if(err instanceof AppError) throw err
        console.log(err);
        throw new AppError('something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    create,
    signin
}