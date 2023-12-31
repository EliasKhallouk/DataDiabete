import axios from 'axios';
const usersAPI = "http://localhost:3000/users"

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

async function deleteUsersAddData (id){
    try {
        const response = await axios.delete(`${usersAPI}/Telechargement/${id}`);
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

async function getUserInsertData(){
    try {
        //console.log("ahahaha")
        const response = await axios.get(`${usersAPI}/Telechargement`);
        console.log("okkkkk getUserInsertData")
        return response;
    }catch (error){
        console.log(error);
        throw error;
    }
}

async function verifUsers(conf){
    try {
        console.log("verifUsers3" + conf);
        const email = conf.email;
        const password = conf.password;
        const response = await axios.get(`${usersAPI}/verif/?email=${email}&password=${password}`);
        if (response.data.length === 0) {
            console.log("EMAIL OU MPD FAUX")
        } else{
            console.log("okkkkk verifUsers3")
            console.log("POM"+response.data.token)
        }
        localStorage.setItem('token', response.data);
        return response;
    }catch (error){
        console.log(error);
        throw error;
    }
}


function isAuthenticated() {
    // Vérifier si l'utilisateur est connecté en consultant le backend
    // Vous pouvez effectuer une requête API ou vérifier la présence d'un token, par exemple
    const token = localStorage.getItem('token');
    //console.log(localStorage.getItem('token'))
    return token !== null;
}

function isAdmin() {
    // Vérifier si l'utilisateur est admin en consultant le backend
    // Vous pouvez effectuer une requête API ou vérifier la présence d'un token, par exemple
    const token = localStorage.getItem('token');
    const { groupe } = JSON.parse(token);
    return groupe === 'Administrateurs';
}

async function changeInfo(id,email,password){
    try {
        console.log("change info service debut")
        console.log('SERVICE',id,email,password);
        const response = await axios.post(`${usersAPI}/changeInfo/?id=${id}&email=${email}&password=${password}`);
        console.log("change info service fin")
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
    getUserInsertData,
    deleteUsersAddData,
    verifUsers,
    isAuthenticated,
    isAdmin,
    changeInfo,
}