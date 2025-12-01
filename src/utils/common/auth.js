const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {severconfig} = require('../../config');
function checkPassword(plainPassword, encryptedPassword){
    try{
        return bcrypt.compareSync(plainPassword,encryptedPassword)
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
function createToken(input){
    try{
        // we use sign token identity mechanism here 
        return jwt.sign(input,severconfig.JWT_SECRET,{expiresIn:severconfig.JWT_EXPIRY})
    }
    catch(Error){
        console.log(Error);
        throw Error;
    }
}
function verifyToken(token){
    try{
        return jwt.verify(token,severconfig.JWT_SECRET);
    }
    catch(err){
        throw err;
    }
}
module.exports = {
    checkPassword,
    createToken,
    verifyToken
}