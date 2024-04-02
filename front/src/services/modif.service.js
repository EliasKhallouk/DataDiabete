import axios from 'axios';
const modifAPI = "http://localhost:3000/modif";

async function getAllModif ()  {
    try {
        console.log("aasisi")
        const response = await axios.get(modifAPI);
        console.log("sisi")
        return response;
    }catch (error){
        console.log(error);
        throw error;
    }
}
// éditer une modification
async function updateModif (id,chemin,id_user_add){
    try {
        console.log("ouba ouba")
        const response = await axios.post(`${modifAPI}/${id}?chemin=${chemin}&id_user_add=${id_user_add}`);
        console.log("okkkkk ouba")
        return response;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export default {
    getAllModif,
    updateModif
}