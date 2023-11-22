const express = require("express");
const userController = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/users.middleware");
var router = express.Router();

router.get('/home',(req,res)=>{
    res.send("HOME");
});

module.exports = router;