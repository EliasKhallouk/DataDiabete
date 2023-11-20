import axios from 'axios';
const usersAPI = "http://localhost:3000/users"

async function getUsers ()  {
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

export default {
    getUsers,
    getAllUsers,
}