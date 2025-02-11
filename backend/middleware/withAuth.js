const jwt = require("jsonwebtoken")
const secret = "fsjs38"

//Le middleware qui protege les routes qui necessitent une connexion
const withAuth = (req, res, next) => {
    //On recupere le token depuis l'entete de la requete
    const token = req.headers['x-access-token'] || 
                 (req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : undefined);
    //On verifie si il y a un token fourni
    if (!token) {
        return res.json({status: 404, msg: "Token introuvable1"});
    }
    //On verifie la cle secrete
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.json({status: 401, msg: "Token invalide2"});
        }
        //le token est valideon extrait l'id de l'utilisateur
        req.id = decoded.id;
        next();
    });
};

module.exports = withAuth