import axios from 'axios';
const diagrammeAPI = "http://localhost:3000/diagramme"

async function getDiagramme (annee, codeSexe)  {
    try {
        console.log("geeeet diagramme")
        const response = await axios.get(`${diagrammeAPI}?annee=${annee}&codeSexe=${codeSexe}`);
        console.log("okkkkk gett diagramme")
        console.log(response)
        return response;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export default {
    getDiagramme
}
