const express = require('express');
const {UserController} = require('../../controllers')
const {authRequestMiddlewares} = require('../../middlewares')
const router = express.Router();

router.post('/signup',authRequestMiddlewares.validateAuthRequest,UserController.signup);
router.post('/signin',authRequestMiddlewares.validateAuthRequest,UserController.signin);
router.post('/role',authRequestMiddlewares.checkAuth,authRequestMiddlewares.isAdmin,UserController.addRoleToUser);
module.exports = router
