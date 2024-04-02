const carteService = require("../services/carte.service");

exports.getCarte = async (req, res) => {
    try {
        let annee = req.query.annee;
        console.log(annee);
        if(!annee){
            annee = 2011;
        }
        const users = await carteService.getCarte(annee);
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! getCarte");
    }
};

exports.getCarteTouche = async (req, res) => {
    try {
        let annee = req.query.annee;
        console.log(annee);
        if(!annee){
            annee = 2011;
        }
        const users = await carteService.getCarteTouche(annee);
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! getCarteTouche");
    }
};

exports.addData = async (req, res) => {
    try {
        console.log("ok controller add data")

        //return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! addData");
    }
};