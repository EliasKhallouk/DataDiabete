const fs = require("fs");
const fs2 = require("fs/promises");
const path = require("path");
const{v4: uuidv4} = require('uuid');
const filePath = path.join(__dirname, "..", "user.json")
const format = require("pg-format");
const pool = require("../database/db");

async function getLineMort() {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT Annee, SUM(Nbr_Morts) AS Total_Morts\n' +
            'FROM report_deces\n' +
            'GROUP BY Annee\n' +
            'ORDER BY annee');

        client.release();
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getLineTouche() {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT Annee, SUM(nbr_diabetique) AS Total_Diabetique\n' +
            'FROM report_diabetique\n' +
            'GROUP BY Annee\n' +
            'ORDER BY annee;');
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports= {
    getLineMort: getLineMort,
    getLineTouche:getLineTouche,
}