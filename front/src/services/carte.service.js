import axios from 'axios';
const cartesAPI = "http://localhost:3000/carte"
//const usersDeleteAPI = "http://localhost:3000/users?uuid"

async function getCarte (annee)  {
    try {
        console.log("geeeet carte")
        const response = await axios.get(`${cartesAPI}?annee=${annee}`);
        console.log("okkkkk gett carte")
        return response;
    }catch (error){
        console.log(error);
        throw error;
    }
}


export default {
    getCarte
}