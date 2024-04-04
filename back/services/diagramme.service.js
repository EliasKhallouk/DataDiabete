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
            'rd.Nbr_Diabetique, ' +
            'rd.Annee, ' +
            'rd.Code_Sexe ' +
            'c.id_continent, ' +
            'FROM ' +
            'PAYS p ' +
            'INNER JOIN ' +
            'report_diabetique rd ON p.Id_Pays = rd.Id_Pays ' +
            'INNER JOIN ' +
            'CONTINENT c ON p.Continent_id = c.Id_Continent ' +
            'WHERE ' +
            'rd.Annee = $1 ';

        const queryParams = [annee];

        if (codeSexe == 0 || codeSexe == 1) {
            query += 'AND rd.Code_Sexe = $2 ';
            queryParams.push(codeSexe);
        }

        if (codeCont && codeCont != 8) { // Vérifiez si le codeCont est défini et différent de 8 (Tous les continents)
            query += 'AND c.Id_Continent = $' + (queryParams.length + 1) + ' ';
            queryParams.push(codeCont);
        }

        query += 'ORDER BY ' +
            'nbr_diabetique DESC, Code_Sexe ASC ' +
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