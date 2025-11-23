const express = require('express');
const router = express.Router();
const {infoController} = require('../../controllers');
router.get('/info',infoController.info); // we registering the route that what should happen when somebody make a request /info with a get request what set of middleware and controller should be executed currently i am not setting any middleware only controller
module.exports = router;