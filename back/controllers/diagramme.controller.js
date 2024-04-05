const diagrammeService = require('../services/diagramme.service');

exports.getDiagramme = async (req, res) => {
    try {
        let annee = req.query.annee;
        let codeSexe = req.query.codeSexe;
        let codeCont = req.query.codeCont;
        console.log(annee);
        if(!annee){
            annee = 2011;
        }
        if(!codeSexe){
            codeSexe = 2    ;
        }
        if(!codeCont){
            codeCont = 8;
        }
        const users = await diagrammeService.getDiagramme(annee, codeSexe, codeCont);
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! getDiagramme");
    }
};

exports.getDiagrammeMort = async (req, res) => {
    try {
        let annee = req.query.annee;
        let codeCont = req.query.codeCont;
        let developpement = req.query.developpement;
        console.log(annee);
        if(!annee){
            annee = 2011;
        }
        if(!codeCont){
            codeCont = 8;
        }
        if(!developpement){
            developpement = 2;
        }
        const users = await diagrammeService.getDiagrammeMort(annee, codeCont, developpement);
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! getDiagrammeMort");
    }
}