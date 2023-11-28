const fs = require("fs");
const fs2 = require("fs/promises");
const path = require("path");
const{v4: uuidv4} = require('uuid');
const filePath = path.join(__dirname, "..", "user.json")
const format = require("pg-format");
const pool = require("../database/db");

/*
const createUser = (prenom, nom, email, password, callback) => {

    let users = [];

    try{
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        users = JSON.parse(dataStr);
    }catch (error){
        console.log(error);
    }

    const newUser = {id:uuidv4(), prenom:prenom, nom:nom, email:email};
    users.push(newUser);
    try{
        fs.readFileSync(filePath, JSON.stringify(users));
        callback(null, "succés");
    }catch(erreurEcriture){
        callback(erreurEcriture, null);
    }
}*/


//============VERSION TABLEAU JSON
/*const getUsers = (callback)=>{
    let users = [];
    try{
        const data = fs.readFileSync(filePath,'utf8');
        const dataStr = data.toString();
        users = JSON.parse(dataStr);
        console.log(users);
        callback(null,users);
    }catch(error){
        console.log(error);
        callback("error",null);
    }
}*/


async function getAllUsers() {
    try {
        const client = await pool.connect();
        const res = await client.query('select user_id,first_name,last_name,mail,groupe from utilisateurs\n' +
                'join groupes on utilisateurs.group_id=groupes.id;');
        client.release();
        return res.rows; // Renvoie les lignes de résultat, ajustez cela en fonction de votre structure de données
    } catch (error) {
        console.error(error);
        throw error; // Vous pouvez ajuster la gestion des erreurs selon vos besoins
    }
}

async function deleteUsers(uuid) {
    try {
        const client = await pool.connect()
        const res = await client.query(
            'DELETE FROM utilisateurs WHERE user_id=$1',
            [uuid]
        );
        client.release();
        return res.rows; // Renvoie les lignes de résultat, ajustez cela en fonction de votre structure de données
    } catch (error) {
        console.error(error);
        throw error; // Vous pouvez ajuster la gestion des erreurs selon vos besoins
    }
}

async function insertUsers(nom,prenom,email,password) {
    try {
        const client = await pool.connect()
        const res = await client.query(
            'INSERT INTO UTILISATEURS (First_Name, Last_Name, Mail, Date_Created, Password, Group_Id) VALUES ($1, $2, $3, NOW(), $4, 2)',
            [`${prenom}`,`${nom}`,`${email}`,`${password}`]
        );
        client.release();
        return res.rows; // Renvoie les lignes de résultat, ajustez cela en fonction de votre structure de données
    } catch (error) {
        console.error(error);
        throw error; // Vous pouvez ajuster la gestion des erreurs selon vos besoins
    }
}


module.exports={
    //creatUser:creatUser,
    //getUsers:getUsers,
    getAllUsers:getAllUsers,
    deleteUsers:deleteUsers,
    insertUsers:insertUsers,
}