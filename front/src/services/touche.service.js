import axios from 'axios';
const diagrammeAPI = "http://localhost:3000/diagramme"
const cartesAPI = "http://localhost:3000/carte"

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

async function getCarteTouche (annee,codeSexe,codeCont,developpement)  {
    try {
        console.log("geeeet carte Touche developpement: "+developpement)
        console.log("--------SERVICE",annee+" "+" "+codeSexe+" "+codeCont+" "+developpement);
        const response = await axios.get(`${cartesAPI}/touche?annee=${annee}&codeSexe=${codeSexe}&codeCont=${codeCont}&developpement=${developpement}`);
        console.log("okkkkk gett carte")
        return response;
    }catch (error){
        console.log(error);
        throw error;
    }
}


async function getInfoCarteTouche(annee,codeSexe)  {
    try {
        console.log("geeeet info carte")
        const response = await axios.get(`${cartesAPI}/touche?annee=${annee}&codeSexe=${codeSexe}`);
        const data = response.data;

        // Calcul de la moyenne
        const sum = data.reduce((acc, country) => acc + parseFloat(country.nbr_diabetique), 0);
        const moyenne = Math.round(sum / data.length);

        // Calcul de l'écart-type
        const variance = data.reduce((acc, country) => acc + Math.pow(parseFloat(country.nbr_diabetique) - moyenne, 2), 0) / data.length;
        const ecartType = Math.round(Math.sqrt(variance));

        // Trouver le pays avec le plus grand nombre de morts
        const paysMaxMorts = data.reduce((max, country) => parseFloat(country.nbr_diabetique) > parseFloat(max.nbr_diabetique) ? country : max, data[0]);

        // Trouver le pays avec le plus petit nombre de morts
        const paysMinMorts = data.reduce((min, country) => parseFloat(country.nbr_diabetique) < parseFloat(min.nbr_diabetique) ? country : min, data[0]);

        return {
            moyenne: moyenne.toLocaleString(),
            ecartType: ecartType.toLocaleString(),
            paysMaxMorts: paysMaxMorts,
            paysMinMorts: paysMinMorts
        };
    }catch (error){
        console.log(error);
        throw error;
    }
}

export default {
    getDiagramme,
    getCarteTouche,
    getInfoCarteTouche
}
