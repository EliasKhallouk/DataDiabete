const express = require("express");
const usersController = require('../controllers/users.controller');
const usersMiddleware = require('../middlewares/users.middleware');
var router = express.Router();

/*router.get('/home',(reg,res) => {
    res.send("HOME");
});*/

module.exports = router;