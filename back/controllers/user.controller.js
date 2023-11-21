const {dbAuth} = require("../models");
//const { authJwt } = require("../middleware");
const User = dbAuth.users;
const Role = dbAuth.roles;


// Créer un nouvel utilisateur
exports.create = async (req, res) => {
    // Créer l'utilisateur
    const user = {
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        roleId: req.body.roleId
    };

    // Enregistrer l'utilisateur dans la base de données
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur lors de la création de l'utilisateur."
            });
        });
};

// Update a User by the id in the request
exports.update = async (req, res) => {
    const id = parseInt(req.params.id);

    const newValues = {
        nom: req.body.nom,
        prenom : req.body.prenom,
        email: req.body.email,
        password: req.body.password
        //,role: req.body.role
    };

    User.update(newValues, {
        where: { userId: id }
    })
        .then(results => {
            if (results[0] > 0) {

                res.status(200).send({
                    message: "Informations utilisateur mises à jour.", data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Mise à jour impossible avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur mise à jour avec id=" + id
            });
        });
};





/*const userService = require("../services/users.service")

exports.getUsers = async (req,res) =>{
    userService.getUsers((error,data)=>{
        if(error){
            return res.status(500).send("Internal error!");
        }
        return res.status(200).json(data);
    })
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error!");
    }
};



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