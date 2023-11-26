const express = require("express");
const userController = require("../controllers/user.controller");
const userMiddleware = require("../middleware/user.middleware");
var router = express.Router();

router.get('/home',(req,res)=>{
    res.send("HOME");
});

router.get('/',userController.getAllUsers);//http://localhost:3000/users?async=0 ou async=1
router.delete('/:uuid',userController.deleteUsers);//http://localhost:3000/users?uuid=aab46b73-40d2-495a-a5ea-83688c044d2a

// http://localhost:3000/users/?prenom=elias&nom=khallouk&email=eliaskhallouk@gmail.com&password=azerty
router.post('/',userMiddleware.insertUsers,userController.insertUsers); // il va passer par insertUsers si next est appler alors insertUsers sera appeler

/*
// mettre /top avant /uuid parceuque sinon il le considere comme id de user
router.get("/top", userController.getUsersWithLongestPrenom) //http://localhost:3000/users/top
router.get('/:uuid',userController.getUsersById);//http://localhost:3000/users/aab46b73-40d2-495a-a5ea-83688c044d2a
router.post('/',userMiddleware.validateUserInput,userController.saveUser); // il va passer par validateUserInput si next est appler alors saveUser sera appeler
// put pour changer toute les donnee
// patch pour changer quelque donnee
router.put('/:uuid',userMiddleware.validateUserInput,userController.updateUser);//http://localhost:3000/users/aab46b73-40d2-495a-a5ea-83688c044d2a
router.delete('/',userController.deleteUserById);//http://localhost:3000/users?uuid=aab46b73-40d2-495a-a5ea-83688c044d2a
 */

module.exports = router;