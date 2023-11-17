const fs = require("fs");
const fs2 = require("fs/promises");
const path = require("path");
const{v4: uuidv4} = require('uuid');
const filePath = path.join(__dirname, "..", "user.json")

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

const getUsers = (callback)=>{
    let users = [];
    try{
        const data = fs.readFileSync(filePath,'utf8');
        const dataStr = data.toString();
        users = JSON.parse(dataStr);
        callback(null,users);
    }catch(error){
        console.log(error);
        callback("error",null);
    }
}




module.exports={
    //creatUser:creatUser,
    getUsers:getUsers
}