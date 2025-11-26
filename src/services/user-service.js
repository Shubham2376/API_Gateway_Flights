const {UserRepository} = require('../repositories');
const {StatusCodes}= require('http-status-codes')
const userRepo = new UserRepository(); //we make object userRepo from UserRepository class
const AppError = require('../utils/errors/app-error')
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
module.exports = {
    create
}