import axios from 'axios';
const cartesAPI = "http://localhost:3000/carte"
//const usersDeleteAPI = "http://localhost:3000/users?uuid"

async function getCarte (annee,codeCont,developpement)  {
    try {
        console.log("geeeet carte")
        const response = await axios.get(`${cartesAPI}?annee=${annee}&codeCont=${codeCont}&developpement=${developpement}`);
        console.log("okkkkk gett carte")
        return response;
    }catch (error){
        console.log(error);
        throw error;
    }
}

async function getInfoCarte(annee,codeCont,developpement)  {
    try {
        console.log("geeeet info carte")
        const response = await axios.get(`${cartesAPI}?annee=${annee}&codeCont=${codeCont}&developpement=${developpement}`);
        const data = response.data;

        // Calcul de la moyenne
        const sum = data.reduce((acc, country) => acc + parseFloat(country.nbr_morts), 0);
        const moyenne = Math.round(sum / data.length);

        // Calcul de l'écart-type
        const variance = data.reduce((acc, country) => acc + Math.pow(parseFloat(country.nbr_morts) - moyenne, 2), 0) / data.length;
        const ecartType = Math.round(Math.sqrt(variance));

        // Trouver le pays avec le plus grand nombre de morts
        const paysMaxMorts = data.reduce((max, country) => parseFloat(country.nbr_morts) > parseFloat(max.nbr_morts) ? country : max, data[0]);

        // Trouver le pays avec le plus petit nombre de morts
        const paysMinMorts = data.reduce((min, country) => parseFloat(country.nbr_morts) < parseFloat(min.nbr_morts) ? country : min, data[0]);

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
    getCarte,
    getInfoCarte,
}