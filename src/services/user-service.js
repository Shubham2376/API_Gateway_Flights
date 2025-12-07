const {UserRepository,RoleRepository} = require('../repositories');
const {StatusCodes}= require('http-status-codes')
const userRepo = new UserRepository(); //we make object userRepo from UserRepository class
const roleRepo = new RoleRepository();
const AppError = require('../utils/errors/app-error')
const bcrypt = require('bcrypt');
const {Auth,Enums} = require('../utils/common')
async function create(data){
    try{
        console.log("Inside Services") 
        const user = await userRepo.create(data);
        // when we signup either in that time we give role name, generally what will happen that any user signup as normal customer then via a admin only you should able to give a role you might think that once in time admin need to be signin so generally what will happen that admin role directly assigned to database you can see the admin role you don't need to setup api call for admin role so when one admin assign then that admin give role to other admin and so on
        const role = await roleRepo.getRoleByName(Enums.USER_ROLES_ENUMS.CUSTOMER);
        user.addRole(role);
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
async function isAuthenticated(token){
    try{
        if(!token){
            throw new AppError('Missing JWT token',StatusCodes.BAD_REQUEST)
        }
        const response =Auth.verifyToken(token); //you see that in response you have id and email coming up
        // you put one more level of check also that you have id now lets also verify this user once because there maybe the case like that user generate the jwt they lost the token and somehow the user account was not deleted but the other person still try to mimic as a user 
        const user = await userRepo.get(response.id);
        if(!user){
            throw new AppError('User not found',StatusCodes.NOT_FOUND);
        }
        return user.id;

    }
    catch(error){
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError'){
            throw new AppError('Invalid JWT token',StatusCodes.BAD_REQUEST)
        }
        if(error.name == 'TokenExpiredError'){
            throw new AppError('JWT token Expired',StatusCodes.BAD_REQUEST)
        }
        throw new AppError('something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function addRoletoUser(data){
    try{
        const user = await userRepo.get(data.id);
        if(!user){
            throw new AppError('No user found for the given id',StatusCodes.NOT_FOUND);
        }
        const role = await roleRepo.getRoleByName(data.role);
        if(!role){
            throw new AppError('No user found for the given role',StatusCodes.NOT_FOUND);
        }
        user.addRole(role);
        return user;
    }
    catch(err){
        if(err instanceof AppError) throw err
        console.log(err);
        throw new AppError('something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function isAdmin(id){
     try{
        const user = await userRepo.get(id);
        if(!user){
            throw new AppError('No user found for the given id',StatusCodes.NOT_FOUND);
        }
        const adminRole = await roleRepo.getRoleByName(Enums.USER_ROLES_ENUMS.ADMIN);
        if(!adminRole){
            throw new AppError('No user found for the given role',StatusCodes.NOT_FOUND);
        }
        return user.hasRole(adminRole);
    }
    catch(err){
        if(err instanceof AppError) throw err
        console.log(err);
        throw new AppError('something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    create,
    signin,
    isAuthenticated,
    addRoletoUser,
    isAdmin
}