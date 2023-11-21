const {dbAuth} = require("../models");
const config = require("../config/auth.config");
const User = dbAuth.users;
const Role = dbAuth.roles;

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
