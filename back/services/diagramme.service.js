const fs = require("fs");
const fs2 = require("fs/promises");
const path = require("path");
const{v4: uuidv4} = require('uuid');
const filePath = path.join(__dirname, "..", "user.json")
const format = require("pg-format");
const pool = require("../database/db");

/*
async function getDiagramme(annee) {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT lower(substr(iso_pays_car2,2,2)) AS iso_pays_car,report_diabetique.Nbr_Diabetique,report_diabetique.annee,report_diabetique.id_tranche\n' +
            'from PAYS\n' +
            'inner JOIN report_diabetique ON PAYS.id_pays = report_diabetique.id_pays\n' +
            'WHERE annee=$1\n' +
            'ORDER BY iso_pays_car',
            [annee]);
        client.release();
        //console.log(res.rows);
        //console.log(res.rows[0]);
        return res.rows; // Renvoie les lignes de résultat, ajustez cela en fonction de votre structure de données
    }
    catch (error) {
        console.error(error);
        throw error; // Vous pouvez ajuster la gestion des erreurs selon vos besoins
    }
}*/
async function getDiagramme(annee) {
    try {
        const client = await pool.connect();
        const res = await client.query(
            'SELECT ' +
            'LOWER(SUBSTRING(p.ISO_pays_car2, 2, 2)) AS iso_pays_car, ' +
            'rd.Nbr_Diabetique, ' +
            'rd.Annee ' +
            'FROM ' +
            'PAYS p ' +
            'INNER JOIN ' +
            'report_diabetique rd ON p.Id_Pays = rd.Id_Pays ' +
            'WHERE ' +
            'rd.Annee = $1 ' +
            'ORDER BY ' +
            'iso_pays_car',
            [annee]
        );
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports= {
    getDiagramme: getDiagramme,
}