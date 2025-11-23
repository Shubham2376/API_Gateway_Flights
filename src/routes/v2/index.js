const express = require('express');
const router = express.Router();
router.get('/info',(req,res)=>{
    return res.json({
        msg : "comming from v2"
    })
})
module.exports = router;