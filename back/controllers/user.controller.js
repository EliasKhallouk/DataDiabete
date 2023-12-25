const userService = require("../services/users.service")
const {use} = require("express/lib/router");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! getUsers");
    }
};

exports.deleteUsers = async (req, res) => {
    try {
        const uuid = req.params.uuid;
        if(!uuid){
            return res.status(400).send("UUID Required !");
        }
        const users = await userService.deleteUsers(uuid);
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! deleteUsers");
    }
};

exports.deleteUsersAddData = async (req, res) => {
    try {
        const uuid = req.params.uuid;
        if(!uuid){
            return res.status(400).send("UUID Required !");
        }
        const users = await userService.deleteUsersAddData(uuid);
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! deleteUsersAddData");
    }
};

exports.insertUsers = async (req, res) => {
    try {
        const nom = req.query.nom;
        const prenom = req.query.prenom;
        const email = req.query.email;
        const password = req.query.password;
        console.log(nom,prenom,email,password);
        const users = await userService.insertUsers(nom,prenom,email,password);
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! insertUsers");
    }
};

exports.getUserInsertData = async (req, res) => {
    try {
        const users = await userService.getUserInsertData();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! getUserInsertData");
    }
};

exports.insertDataUsers = async (req, res) => {
    try {
        const idUserConnecter = req.query.user_id
        console.log('ID utilisateur CONTROLLER :'+idUserConnecter);
        const users = await userService.insertDataUsers(idUserConnecter);
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! insertDataUsers");
    }
};

exports.verifUsers = async (req, res) => {
    try {
        const email = req.query.email;
        const password = req.query.password;
        console.log(email+" "+password);
        const users = await userService.verifUsers(email,password);
        const usersValues = users[0];
        if (users.length > 0) {
            const token = userService.generateToken(usersValues);
            const result = {token, "user_id": usersValues.user_id, "firstname" : usersValues.first_name, "lastname" : usersValues.last_name, "mail" : usersValues.mail,"password": usersValues.password, "groupe":usersValues.groupe};
            console.log("RESSSSULT CONTROLER : "+result.lastname);
            return res.status(200).json(result);
        }
        return res.status(400).send("EMAIL OU MPD FAUX");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! verifUsers");
    }
};

exports.changeInfo = async (req, res) => {
    try {
        const id = req.query.id;
        const email = req.query.email;
        const password = req.query.password;
        console.log(id,email,password);
        const users = await userService.changeInfo(id,email,password);
        console.log("tout est ok controller");
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! changeInfo");
    }
};