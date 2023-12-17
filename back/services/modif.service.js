const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const app = express();
const PORT = process.env.PORT || 3000;

// fonction afficher tous les urls
async function getAllUrls() {
    try {
        const urls = await db.any('SELECT * FROM MODIFURL');
        return urls;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Fonction pour mettre à jour l'URL dans la base de données
async function updateUrlInDatabase(id, chemin, id_user_add) {
    await db.none('UPDATE MODIFURL SET chemin = $1, id_user_add = $2 WHERE id_url = $3', [chemin, id_user_add, id]);
}

module.exports = {
    getAllUrls: getAllUrls,
    updateUrlInDatabase: updateUrlInDatabase,
};
