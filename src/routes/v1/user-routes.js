const express = require('express');
const {UserController} = require('../../controllers')
const {authRequestMiddlewares} = require('../../middlewares')
const router = express.Router();

router.post('/signup',authRequestMiddlewares.validateAuthRequest,UserController.signup);
router.post('/signin',authRequestMiddlewares.validateAuthRequest,UserController.signin);
module.exports = router
