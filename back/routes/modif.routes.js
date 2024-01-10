const express = require('express');
const modifController = require('../controllers/modif.controller');
var router = express.Router();

router.get('/home',(req,res)=>{
    res.send("HOME");
});

router.get('/',modifController.getAllUrls);//http://localhost:3000/carte?annee=2000
router.post('/update',modifController.updateUrl);//http://localhost:3000/carte?annee=2000

module.exports = router;