const express = require('express');
const diagrammeController = require('../controllers/diagramme.controller');
var router = express.Router();

router.get('/home',(req,res)=>{
    res.send("HOME");
});

router.get('/',diagrammeController.getDiagramme);//http://localhost:3000/diagramme?annee=2011&codeSexe=1

module.exports = router;