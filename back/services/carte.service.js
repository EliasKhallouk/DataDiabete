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
        const res = await client.query('SELECT iso_pays_car,nbr_morts,annee\n' +
            'from PAYS\n' +
            'inner JOIN report_deces ON PAYS.id_pays = report_deces.id_pays\n' +
            'WHERE annee=$1\n' +
            'ORDER BY iso_pays_car',
            [annee]);
        client.release();
        return res.rows; // Renvoie les lignes de résultat, ajustez cela en fonction de votre structure de données
    } catch (error) {
        console.error(error);
        throw error; // Vous pouvez ajuster la gestion des erreurs selon vos besoins
    }
}


module.exports= {
    getCarte: getCarte,
}