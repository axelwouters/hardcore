const jwt = require("jsonwebtoken")
const secret = "fsjs38"

//Fonction authentification qui protege les routes a l'adminis
const withAuthAdmin = (req, res, next) => {
    //On recupere le token dans l'en-tete http
    const token = req.headers['x-access-token']
    console.log(req.headers)
    //On verifie si le token est fourni dans la requete
    if(token === undefined){
        res.json({status: 404, msg: "Une Erreur, le token introuvable!16"})
    } else {
        //On verifie la cle secrete
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                
                res.json({status: 401, msg: "Une Erreur, ton token est invalide!"})//Acces bloquer
            } else {
                if(decoded.role !== "ADMIN"){
                    res.json({status: 401, msg: "Une Erreur, Vous n'etes pas admin"})
                } else {
                    req.id = decoded.id
                    next()
                }
            }
        })
    }
}

module.exports = withAuthAdmin