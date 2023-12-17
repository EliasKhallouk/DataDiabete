const modifService = require('../services/modif.service');

exports.getAllUrls = async (req, res) => {
    try {
        const urls = await modifService.getAllUrls();
        return res.status(200).json(urls);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! getAllUrls");
    }
}

exports.updateUrl = async (req, res) => {
    try {
        const id = req.params.id;
        const chemin = req.query.chemin;
        const id_user_add = req.query.id_user_add;
        if(!id){
            return res.status(400).send("ID Required !");
        }
        if(!chemin){
            return res.status(400).send("Chemin Required !");
        }
        if(!id_user_add){
            return res.status(400).send("ID User Add Required !");
        }
        const urls = await modifService.updateUrl(id, chemin, id_user_add);
        return res.status(200).json(urls);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! updateUrl");
    }
}

