import axios from 'axios';
const diagrammeAPI = "http://localhost:3000/diagramme"

async function getDiagramme (annee)  {
    try {
        console.log("geeeet diagramme")
        const response = await axios.get(`${diagrammeAPI}?annee=${annee}`);
        console.log("okkkkk gett diagramme")
        return response;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export default {
    getDiagramme
}