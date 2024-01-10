const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require("../database/db");

// fonction afficher tous les urls
async function getAllUrls() {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT * FROM MODIFURL');
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Fonction pour mettre à jour l'URL dans la base de données
async function updateUrlInDatabase(id, chemin, id_user_add) {
    try {
        const client = await pool.connect();
        const res = await client.query('UPDATE MODIFURL SET chemin=$1, id_user_add=$2 WHERE id=$3', [chemin, id_user_add, id]);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    getAllUrls: getAllUrls,
    updateUrlInDatabase: updateUrlInDatabase,
};
