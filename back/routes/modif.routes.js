const express = require('express');
const modifController = require('../controllers/modif.controller');
const modifMiddleware = require('../middleware/modif.middleware');
var router = express.Router();

router.get('/home',(req,res)=>{
    res.send("HOME");
});

router.get('/',modifController.getAllUrls, modifMiddleware.getAllUrls);//http://localhost:3000/carte?annee=2000
router.post('/',modifController.updateUrl, modifMiddleware.updateUrl);//http://localhost:3000/carte?annee=2000

module.exports = router;