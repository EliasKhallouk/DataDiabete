/*const validator = require("validator");

/*next est un callback, si pas d'erreur alors peut passer au composant suivant et si erreur appele autre composant pour ne pas passer au controlleur
possible de l'utiliser entre le controlleur et le serveur aussi*/

/*
exports.validateUserInput = (req, res, next) =>{
    const {nom, prenom} = req.body;
    if(!nom || !prenom){ //verifier si l'utilisateur n'a pas oublie de rensiegner son nom/prenom 
    return res.status(400).send("Nom et prenom sont nuls"); //erreur 400 car vient du cote utilisateur
    }
    if(!validator.isLength(nom, {min:2}) || !validator.isAlpha(nom, 'en-US', {ignore: ' '})){
    //isLength pour vérifier la taille, isAlpha pour veérifier la présence de chiffre, 'en-US' = clavier americain
        return res.status(400).send('Format incorrect pour nom');
    }
    if(!validator.isLength(prenom, {min:2}) || !validator.isAlpha(prenom, 'en-US', {ignore: ' '})){
        return res.status(400).send('Format incorrect pour prénom');
        }
    next();
}
*/