const validator = require("validator");
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');


const dossierParent = path.join(__dirname, '..');
const pythonScriptPath = path.join(dossierParent, 'Python', 'test.py');
console.log(pythonScriptPath);
let argument = '';

const idUserConnecter =1;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, idUserConnecter + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

exports.verifData = (req, res, next) => {
    console.log('okkkk');
    console.log(req.body);

    // Utilisation du middleware upload.single pour gérer le téléchargement du fichier
    upload.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Une erreur de multer s'est produite (par exemple, fichier trop grand)
            return res.status(400).json({ error: 'Erreur lors du téléchargement du fichier.' });
        } else if (err) {
            // Une erreur inattendue s'est produite
            return res.status(500).json({ error: 'Une erreur interne s\'est produite.' });
        }

        if (req.file) {
            argument = req.file.filename;
        }

        exec(`python ${pythonScriptPath} ${argument}`, (error, stdout, stderr) => {
            if (stdout.trim() === "False") {
                console.log("pas conforme");
                // Supprimez le fichier téléchargé
                if (req.file) {
                    const cheminDuFichier = path.join('uploads/', req.file.filename);
                    fs.unlink(cheminDuFichier, (err) => {
                        if (err) {
                            console.error('Erreur lors de la suppression du fichier :', err);
                        }
                        console.log('Fichier supprimé avec succès.');
                    });
                }

                return res.status(400).json('Erreur fichier non conforme.');
            } else {
                console.log("conforme : ", stdout.trim())

                console.log(`Résultat de la commande : ${stdout}`);
                console.error(`Erreurs éventuelles : ${stderr}`);
                next();
            }
        });
    });
};

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