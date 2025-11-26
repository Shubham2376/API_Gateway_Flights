'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
const {severconfig} = require('../config');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate:{
        isEmail:true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [2,10], 
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  // here we pass user object inside the callback this is the same js object that is going to use to make entry in mysql 
  // when you use sequelize it kinds of create a javascript object using that object it create new records so this is the object before the creation of records in mysql table
  User.beforeCreate(function encrypt(user){
    // for making password encrpted we use salt along with password the bigger the salt the random the encyrpted password will be
    // the more the salt rounds the more hasing it will do the more time it will take
    console.log("user object before encryption",user)
    // SALT_ROUNDS comes as string so we have to convert it a number so that is why we use uniary operator +
    const encryptedPassword = bcrypt.hashSync(user.password,+severconfig.SALT_ROUNDS);
    user.password = encryptedPassword;
    console.log("user object after encryption",user)
  })
  return User;
};