const jwt = require("jsonwebtoken")
const secret = "fsjs38"

//Mission Protection de la route sacrée
//Dans le jeu video, la mission consiste a assurer que seuls les héros légitimes, portant une Clé magique (token), puissent franchir la porte de la route Sacrée
//accéder aux trésors cachés derrière

//Début de la Mission
/*Chaque héros (requete HTTP) arrive à la porte et doit présenter sa Clé magique
Cette clé est cachée dans les poches du héros, soit sous le nom x-access-token ou dans l'en-tête authorization
*/

const withAuth = (req, res, next) => {
    //On recupere notre token dans le header de la requete HTTp (ajax)
    //const authorization = req.headers.authorization
    
    //si il ne le trouve pas
    //const token = authorization.split(' ')[1]

    //Etape 1:Recherche de la clé
    //La fonction commence a fouiller les poches du héros pour trouver la Clé
   const token = req.headers['x-access-token'] || req.headers['authorization'?.split(' ')[1]]
    //Si aucune clé magique n'est trouvé
    if(token === undefined){
        console.log('token non trouvé dans les en-tetes',undefined)
        //Un garde se poste devant la porte, bloque d'accès, et dit au héros
        res.json({status: 404, msg: "Une Erreur est survenue, token introuvable16"})
    } else {
        //Phase 2 :Validation de la clé
        //Si une clé est trouvée, la fonction vérifie sa légimité grâce a un magicien puissant nommé jsonwebtoken
        jwt.verify(token, secret, (err, decoded) => {
            if(err){//Si la clé est fausse ou expirée
                //Le magicien renvoie un message d'erreur
                res.json({status: 401, msg: "Une Erreur, ton token est introuvable2"})
            } else {
                //Phase 3: Décryptage de la clé
                    //Si la clé est valide
                    //Le magicien décrypte le contenu de la Clé et récupère l'ID du héros (propriéré decoded.id)
                    //Cet ID est inscrit sur le dossier du héros (dans req.id) pour l'identifier plus tard
                req.id = decoded.id
                //Phase 4: Passage Autorisé
                //Une fois l'ID inscrit, la porte de la Route Sacrée s'ouvre
                //La fonction appelle le garde suivant avec next() pour laisser le héros poursuivre son aventure
                next()
            }
        })
    }
}

module.exports = withAuth