const config = require("../config/auth.config.js");
const {dbAuth} = require("../models/index.js");
const User = dbAuth.users;


isPro = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(roles => {
                if (roles.dataValues.name === "pro") {
                    next();
                    return;
                }

            res.status(403).send({
                message: "Vous n'êtes pas PRO !"
            });
        });
    });
};


isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(roles => {
                if (roles.dataValues.name === "admin") {
                    next();
                    return;
                }

            res.status(403).send({
                message: "Vous n'êtes pas ADMIN !"
            });
            return;
        });
    });
};

//isModeratorOrAdmin = (req, res, next) => {}

const authMiddleware = {
    isAdmin: isAdmin,
    isModerator: isModerator
};

module.exports = authMiddleware;