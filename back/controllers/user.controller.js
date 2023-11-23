/*const {dbAuth} = require("../models");
//const { authJwt } = require("../middleware");
const User = dbAuth.users;
const Role = dbAuth.roles;
*/

const userService = require("../services/users.service")


/*
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

// Récupréer tous les utilisateurs de la base de données
exports.findAll = async (req, res) => {

    User.findAll({include:Role})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur lors de la récupération des utilisateurs."
            });
        });
};
 /*

//findOne = async (req, res) => {}

// Informations utilisateur mises à jour à partir de l'ID
/*
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


*/



exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error!");
    }
};

exports.deleteUsers = async (req, res) => {
    try {
        const uuid = req.query.uuid;
        if(!uuid){
            return res.status(400).send("UUIS Required !");
        }
        const users = await userService.deleteUsers(uuid);
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error! deleteUsers");
    }
};
