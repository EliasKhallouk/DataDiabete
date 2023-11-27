import axios from 'axios';
const usersAPI = "http://localhost:3000/users"
//const usersDeleteAPI = "http://localhost:3000/users?uuid"

async function getAllUsers ()  {
    try {
        console.log("aasisi")
        const response = await axios.get(usersAPI);
        console.log("sisi")
        return response;
    }catch (error){
        console.log(error);
        throw error;
    }
}

async function deleteUsers (id){
    try {
        console.log("ouba ouba")
        const response = await axios.delete(`${usersAPI}/${id}`);
        console.log("okkkkk ouba")
        return response;
    }catch (error){
        console.log(error);
        throw error;
    }
}
async function insertUsers(nom,prenom,email,password){
    try {
        console.log("ahahaha")
        console.log('SERVICE',nom,prenom,email,password);
        const response = await axios.post(`${usersAPI}/?prenom=${prenom}&nom=${nom}&email=${email}&password=${password}`);
        console.log("okkkkk ahahaha")
        return response;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export default {
    getAllUsers,
    deleteUsers,
    insertUsers,
}