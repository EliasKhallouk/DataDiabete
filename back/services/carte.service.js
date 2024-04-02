const fs = require("fs");
const fs2 = require("fs/promises");
const path = require("path");
const{v4: uuidv4} = require('uuid');
const filePath = path.join(__dirname, "..", "user.json")
const format = require("pg-format");
const pool = require("../database/db");

async function getCarte(annee) {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT LOWER(SUBSTRING(PAYS.libelle_pays_fr, 2, LENGTH(PAYS.libelle_pays_fr) - 2)) AS name_pays,lower(substr(iso_pays_car2,2,2)) AS iso_pays_car,report_deces.nbr_morts,report_deces.annee\n' +
            'from PAYS\n' +
            'inner JOIN report_deces ON PAYS.id_pays = report_deces.id_pays\n' +
            'WHERE annee=$1\n' +
            'ORDER BY iso_pays_car',
            [annee]);
        client.release();
        //console.log(res.rows);
        //console.log(res.rows[0]);
        return res.rows; // Renvoie les lignes de résultat, ajustez cela en fonction de votre structure de données
    } catch (error) {
        console.error(error);
        throw error; // Vous pouvez ajuster la gestion des erreurs selon vos besoins
    }
}

async function getCarteTouche(annee) {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT DISTINCT\n' +
            '    LOWER(SUBSTRING(p.libelle_pays_fr, 2, LENGTH(p.libelle_pays_fr) - 2)) AS name_pays,\n' +
            '    lower(substr(iso_pays_car2,2,2)) AS iso_pays_car,\n' +
            '    rd.Nbr_Diabetique,\n' +
            '    rd.Annee,\n' +
            '    rd.code_sexe\n' +
            'FROM\n' +
            '    PAYS p\n' +
            '        INNER JOIN\n' +
            '    report_diabetique rd ON p.Id_Pays = rd.Id_Pays\n' +
            'WHERE\n' +
            '        rd.Annee = $1\n' +
            'ORDER BY\n' +
            '    name_pays,\n' +
            '    code_sexe',
            [annee]);
        client.release();
        //console.log(res.rows);
        //console.log(res.rows[0]);
        return res.rows; // Renvoie les lignes de résultat, ajustez cela en fonction de votre structure de données
    } catch (error) {
        console.error(error);
        throw error; // Vous pouvez ajuster la gestion des erreurs selon vos besoins
    }
}


module.exports= {
    getCarte: getCarte,
    getCarteTouche:getCarteTouche,
}