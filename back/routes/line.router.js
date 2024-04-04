const express = require("express");
const lineController = require("../controllers/line.controller");
var router = express.Router();

router.get('/home',(req,res)=>{
    res.send("HOME");
});

router.get('/mort',lineController.getLineMort); // http://localhost:3000/carte?annee=2000
router.get('/touche',lineController.getLineTouche); // http://localhost:3000/carte/touche?annee=2000&codeSexe=1

module.exports = router;