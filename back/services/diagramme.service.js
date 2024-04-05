const fs = require("fs");
const fs2 = require("fs/promises");
const path = require("path");
const{v4: uuidv4} = require('uuid');
const filePath = path.join(__dirname, "..", "user.json")
const format = require("pg-format");
const pool = require("../database/db");

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

async function getDiagrammeMort(annee, codeCont, developpement) {
    try {
        const client = await pool.connect();
        let res = null;
        if (codeCont >= 1 && codeCont <= 7) {
            if (developpement == 0 || developpement == 1) {
                let codeDev = true;
                if (developpement == 0) {
                    codeDev = false;
                }
                res = await client.query('SELECT (SUBSTRING(p.libelle_pays_fr, 2, LENGTH(p.libelle_pays_fr) - 2)) AS libelle_pays_fr, rd.Nbr_Morts, rd.Annee, p.continent_id, p.Développement_non_oui ' +
                    'FROM PAYS p ' +
                    'INNER JOIN report_deces rd ON p.Id_Pays = rd.Id_Pays ' +
                    'WHERE rd.Annee = $1 ' +
                    'AND p.continent_id = $2 ' +
                    'AND p.Développement_non_oui = $3 ' +
                    'ORDER BY rd.Nbr_Morts DESC ' +
                    'LIMIT 10',
                    [annee, codeCont, codeDev]);
            } else {
                res = await client.query('SELECT (SUBSTRING(p.libelle_pays_fr, 2, LENGTH(p.libelle_pays_fr) - 2)) AS libelle_pays_fr, rd.Nbr_Morts, rd.Annee, p.continent_id ' +
                    'FROM PAYS p ' +
                    'INNER JOIN report_deces rd ON p.Id_Pays = rd.Id_Pays ' +
                    'WHERE rd.Annee = $1 ' +
                    'AND p.continent_id = $2 ' +
                    'ORDER BY rd.Nbr_Morts DESC ' +
                    'LIMIT 10',
                    [annee, codeCont]);
            }
        } else {
            if (developpement == 0 || developpement == 1) {
                let codeDev = true;
                if (developpement == 0) {
                    codeDev = false;
                }
                res = await client.query('SELECT (SUBSTRING(p.libelle_pays_fr, 2, LENGTH(p.libelle_pays_fr) - 2)) AS libelle_pays_fr, rd.Nbr_Morts, rd.Annee, p.continent_id, p.Développement_non_oui ' +
                    'FROM PAYS p ' +
                    'INNER JOIN report_deces rd ON p.Id_Pays = rd.Id_Pays ' +
                    'WHERE rd.Annee = $1 ' +
                    'AND p.Développement_non_oui = $2 ' +
                    'ORDER BY rd.Nbr_Morts DESC ' +
                    'LIMIT 10',
                    [annee, codeDev]);
            } else {
                res = await client.query('SELECT (SUBSTRING(p.libelle_pays_fr, 2, LENGTH(p.libelle_pays_fr) - 2)) AS libelle_pays_fr, rd.Nbr_Morts, rd.Annee, p.continent_id ' +
                    'FROM PAYS p ' +
                    'INNER JOIN report_deces rd ON p.Id_Pays = rd.Id_Pays ' +
                    'WHERE rd.Annee = $1 ' +
                    'ORDER BY rd.Nbr_Morts DESC ' +
                    'LIMIT 10',
                    [annee]);
            }
        }
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = {
    getDiagramme: getDiagramme,
    getDiagrammeMort: getDiagrammeMort,
}

