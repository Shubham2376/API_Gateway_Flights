const express = require('express')
const router = express.Router();
const v1route = require('./v1')
const v2route = require('./v2')
router.use('/v1',v1route);
router.use('/v2',v2route);
module.exports = router;