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
        return jwt.sign(input,severconfig.JWT_SECRET,{expiresIn:severconfig.JWT_EXPIRY})
    }
    catch(Error){
        console.log(Error);
        throw Error;
    }
}
module.exports = {
    checkPassword,
    createToken
}