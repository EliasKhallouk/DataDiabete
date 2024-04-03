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
        let codeSexe = req.query.codeSexe;
        let codeCont = req.query.codeCont;
        let developpement = req.query.developpement;
        console.log(annee+" - "+codeSexe+"+"+codeCont);
        if(!annee){
            annee = 2011;
        }
        if(!codeSexe){
            codeSexe = 2;
        }
        if(!codeCont){
            codeCont = 8;
        }
        if(!developpement){
            developpement = 2;
        }
        console.log(annee+" - "+codeSexe+"+"+codeCont);
        const users = await carteService.getCarteTouche(annee,codeSexe,codeCont,developpement);
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