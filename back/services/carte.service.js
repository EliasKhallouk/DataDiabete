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

async function getCarteTouche(annee,codeSexe) {
    try {
        const client = await pool.connect();
        let res = null;
        if(codeSexe==0 || codeSexe==1){
            res = await client.query(
                'SELECT ' +
                '    LOWER(SUBSTRING(p.libelle_pays_fr, 2, LENGTH(p.libelle_pays_fr) - 2)) AS name_pays,\n' +
                '    lower(substr(iso_pays_car2,2,2)) AS iso_pays_car,\n' +
                'rd.Nbr_Diabetique, ' +
                'rd.Annee, ' +
                'rd.Code_Sexe ' +
                'FROM ' +
                'PAYS p ' +
                'INNER JOIN ' +
                'report_diabetique rd ON p.Id_Pays = rd.Id_Pays ' +
                'WHERE ' +
                'rd.Annee = $1 ' +
                'AND rd.Code_Sexe = $2 ' +
                'ORDER BY\n' +
                '    name_pays,\n' +
                '    code_sexe',
                [annee, codeSexe]
            );
        }else{
            res = await client.query(
                'SELECT \n' +
                '    LOWER(SUBSTRING(p.libelle_pays_fr, 2, LENGTH(p.libelle_pays_fr) - 2)) AS name_pays,\n' +
                '    LOWER(SUBSTRING(iso_pays_car2, 2, 2)) AS iso_pays_car,\n' +
                '    SUM(CASE WHEN rd.Code_Sexe = 1 THEN rd.Nbr_Diabetique ELSE 0 END) + \n' +
                '    SUM(CASE WHEN rd.Code_Sexe = 0 THEN rd.Nbr_Diabetique ELSE 0 END) AS Nbr_Diabetique,\n' +
                '    rd.Annee\n' +
                'FROM \n' +
                '    PAYS p\n' +
                'INNER JOIN \n' +
                '    report_diabetique rd ON p.Id_Pays = rd.Id_Pays\n' +
                'WHERE \n' +
                '    rd.Annee = $1\n' +
                'GROUP BY \n' +
                '    name_pays, iso_pays_car, rd.Annee\n' +
                'ORDER BY \n' +
                '    name_pays',
                [annee]);
        }
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports= {
    getCarte: getCarte,
    getCarteTouche:getCarteTouche,
}