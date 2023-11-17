const userService = require("../services/users.service")

exports.getUsers = async (req,res) =>{
    userService.getUsers((error,data)=>{
        if(error){
            return res.status(500).send("Internal error!");
        }
        return res.status(200).json(data);
    })
}




/*const usersService = require("../services/users.services")

exports.saveUser = (req, res) => {
    const prenom = req.body.prenom;
    const nom = req.body.nom;
    const email = req.body.email;
    const password = req.body.password;

    console.log(prenom, " ", nom, " ", email, " ", password);
    usersService.createUser(prenom, nom, email, password, (error, data) => {
        if (error){
            return res.status(500).send("Erreur interne.");
        }
        return res.status(200).send("Utilisateur enregistré avec succés !");
    })
}
*/