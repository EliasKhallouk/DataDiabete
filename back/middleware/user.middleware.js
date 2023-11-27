const validator = require("validator");
exports.insertUsers=(req,res,next)=>{     //next est un callback
    const nom = req.query.nom;
    const prenom = req.query.prenom;     //= const {nom,prenom}=req.body;
    const email = req.query.email;
    const password = req.query.password;
    if(!nom || !prenom || !email || !password){
        return res.status(400).send("Nom ou prenom ou email ou password sont nulles");
    }
    if(!validator.isAlpha(nom,'fr-FR',{ignore:' '})){  //au moins 3 caractere
        return res.status(400).send("format incorrect pour nom");
    }
    if(!validator.isAlpha(prenom,'fr-FR',{ignore:' '})){
        return res.status(400).send("format incorrect pour prenom");
    }
    if(!validator.isEmail(email,{ignore:' '})){
        return res.status(400).send("format incorrect pour email");
    }
    if(!validator.isLength(password,{min:8})  || !validator.isAlphanumeric(password,'fr-FR',{ignore:' '}) ){
        return res.status(400).send("format incorrect pour prenom");
    }
    next();
};