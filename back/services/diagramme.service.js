const fs = require("fs");
const fs2 = require("fs/promises");
const path = require("path");
const{v4: uuidv4} = require('uuid');
const filePath = path.join(__dirname, "..", "user.json")
const format = require("pg-format");
const pool = require("../database/db");

// get diagramme
/*
async function getDiagramme(annee, codeSexe,codeCont) {
    try {
        const client = await pool.connect();
        let res = null;
        if(codeSexe==0 || codeSexe==1){
            res = await client.query(
                'SELECT ' +
                'LOWER(SUBSTRING(p.libelle_pays_fr, 2, LENGTH(p.libelle_pays_fr) - 2)) AS iso_pays_car, ' +
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
                'ORDER BY ' +
                'nbr_diabetique DESC, Code_Sexe ASC ' +
                'LIMIT 10',
                [annee, codeSexe]
            );
        }else{
            res = await client.query(
                'SELECT ' +
                'LOWER(SUBSTRING(p.libelle_pays_fr, 2, LENGTH(p.libelle_pays_fr) - 2)) AS iso_pays_car, ' +
                'rd.Nbr_Diabetique, ' +
                'rd.Annee, ' +
                'rd.Code_Sexe ' +
                'FROM ' +
                'PAYS p ' +
                'INNER JOIN ' +
                'report_diabetique rd ON p.Id_Pays = rd.Id_Pays ' +
                'WHERE ' +
                'rd.Annee = $1 ' +
                'ORDER BY ' +
                'nbr_diabetique DESC, Code_Sexe ASC ' +
                'LIMIT 10',
                [annee]
            );
        }
        client.release();
        console.log(res.rows);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
*/
async function getDiagramme(annee, codeSexe, codeCont) {
    try {
        const client = await pool.connect();
        let res = null;

        let query = 'SELECT ' +
            'LOWER(SUBSTRING(p.libelle_pays_fr, 2, LENGTH(p.libelle_pays_fr) - 2)) AS iso_pays_car, ' +
            'SUM(CASE WHEN rd.Code_Sexe = 0 THEN rd.Nbr_Diabetique ELSE 0 END) + ' +
            'SUM(CASE WHEN rd.Code_Sexe = 1 THEN rd.Nbr_Diabetique ELSE 0 END) AS Nbr_Diabetique, ' +
            'rd.Annee, ' +
            "CONCAT('[', STRING_AGG(DISTINCT CASE WHEN rd.Code_Sexe = 1 THEN 'Homme' ELSE 'Femme' END, ', '), ']') AS code_sexe, " + // Renommer Code_Sexe en code_sexe
            'p.continent_id ' +
            'FROM ' +
            'PAYS p ' +
            'INNER JOIN ' +
            'report_diabetique rd ON p.Id_Pays = rd.Id_Pays ' +
            'WHERE ' +
            'rd.Annee = $1 ';

        const queryParams = [annee];

        if (codeSexe != 2) {
            query += 'AND rd.Code_Sexe = $2 ';
            queryParams.push(codeSexe);
        } else {
            query += 'AND (rd.Code_Sexe = 0 OR rd.Code_Sexe = 1) ';
        }

        if (codeCont && codeCont != 8) {
            query += 'AND p.continent_id = $' + (queryParams.length + 1) + ' ';
            queryParams.push(codeCont);
        }

        query += 'GROUP BY iso_pays_car, rd.Annee, p.continent_id ' + // Ajouter p.continent_id dans la clause GROUP BY
            'ORDER BY Nbr_Diabetique DESC ' +
            'LIMIT 10';

        res = await client.query(query, queryParams);

        client.release();
        console.log(res.rows);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = {
    getDiagramme: getDiagramme,
}