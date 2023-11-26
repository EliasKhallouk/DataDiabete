const validator = require("validator");
exports.insertUsers=(req,res,next)=>{     //next est un callback
    const nom = req.body.nom;
    const prenom = req.body.prenom;     //= const {nom,prenom}=req.body;
    const email = req.body.email;
    const password = req.body.password;
    console.log(nom,prenom,email,password);
    if(!nom || !prenom || !email || !password){
        return res.status(400).send("Nom ou prenom ou email ou password sont nulles");
    }
    if(!validator.isLength(nom,{min:3}) || !validator.isAlpha(nom,'en-US',{ignore:' '})){  //au moins 3 caractere
        return res.status(400).send("format incorrect pour nom");
    }
    if(!validator.isLength(prenom,{min:3}) || !validator.isAlpha(prenom,'en-US',{ignore:' '})){
        return res.status(400).send("format incorrect pour prenom");
    }
    next();
};