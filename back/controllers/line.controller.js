const lineService = require("../services/line.service");

exports.getLineMort = async (req, res) => {
    try {
        const users = await lineService.getLineMort();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! getCarte");
    }
};

exports.getLineTouche = async (req, res) => {
    try {
        const users = await lineService.getLineTouche();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error controller back! getLineTouche");
    }
};