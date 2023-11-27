const config = require("../config/auth.config");
const userService = require("/services/users.service");
//const User =

exports.signUp = (req, res) => {
    User.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password,
    })
        .then(user=> {
            if(req.body.roleId && req.body.roleId in [1, 2, 3]){
                user.setRole(req.body.roleId)
                .then(()=> {
                    res.status(200).send({
                        success : 1,
                        data : user
                    });
                });
            } else {
                user.setRole(1).then(()=> {
                    res.status(200).send({
                        success : 1,
                        data : user
                    })
                })
            }
        })
}

exports.signIn = (req, res) => {
    try{
        const user = userService.findOneByMail(req.body.mail);
        if (!user) {
            return res.status(404).send({
                success: 0,
                data: null
            });
        }

        const passwordIsValid = req.body.password === user.password;

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!"
            });
        }
        const groupe = userService.getUserGroupe(user.User_Id)

        res.status(200).send({
           user,
           groupe
        });
    }catch(err) {
        res.status(500).send("Erreur lors de la récupération de l'utilisateurs.")
    }
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

exports.update = async (req, res) => {
    const id = parseInt(req.params.id);
    
    const newValues = {
        nom: req.body.nom,
        prenom : req.body.prenom,
        email: req.body.email,
        password: req.body.password
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
