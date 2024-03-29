const diagrammeService = require('../services/diagramme.service');

exports.getDiagramme = async (req, res) => {
    try {
        let annee = req.query.annee;
        let codeSexe = req.query.codeSexe;
        console.log(annee);
        if(!annee){
            annee = 2011;
        }
        if(!codeSexe){
            codeSexe = 0;
        }
        const users = await diagrammeService.getDiagramme(annee, codeSexe);
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! getDiagramme");
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