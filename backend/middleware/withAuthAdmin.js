const jwt = require("jsonwebtoken")
const secret = "fsjs38"

//Mission: Proteger le chateau des admins
//Dans ce jeu vidéo, tu es un gardien de la porte qui doit s'assurer que seuls les admins autorisés puissent entrer dans le chateau des routes protégées
//Chaque joueur (requete HTTP) doit prouver son identité en montrant un token magique pour franchir la porte
const withAuthAdmin = (req, res, next) => {
    //Etape 1: Scanner les invités a l'entrée
    //Le gardien (le code) vérifie si le joueur a un token magique (via l'en-tete de la requete HTTP)
    const token = req.headers['x-access-token']
    console.log(req.headers)
    //Si le token est inexistant, le gardien refuse l'entrée immédiatement
    if(token === undefined){
        res.json({status: 404, msg: "Une Erreur, le token introuvable!16"})
        //Le joueur est renvoyé à l'entrée
    } else {
        //Etape 2: Vérification magique du token
            //Si le joueur présente un token, le gardien utilise un sort de vérification magique (jwt.verify) pour s'assurer qu'il est valide
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){//Si le sort échoue (erreur)
                //Cela signifie que le token est corrompu ou falsifié
                res.json({status: 401, msg: "Une Erreur, ton token est invalide!"})//Le joueur est rejeté
            } else {
                //Etape 3:Controle du role du joueur
                //Si le token est valide, le gardien vérifie si le joueur est un admin grace à l'information contenue dans le token (le role)
                if(decoded.role !== "ADMIN"){
                    res.json({status: 401, msg: "Une Erreur, Vous n'etes pas admin"})
                    /*Si le joueur n’est pas admin 
                        "Tu es un simple villageois, tu n’as pas le droit d’entrer dans le château des admins.
                        L’accès est refusé.
                    */
                } else {
                    //Etape 4: Accès au chateau
                    //Si tout est conforme (token valide et rôle admin), le joueur est autorisé à entrer
                    req.id = decoded.id
                    //Le gardien attribue une clé spéciale (req.id) à l'invité pour lui permettre d'accéder aux informations et ressources protégées
                    //Puis, il ouvre la grande porte pour la grande porte pour laisser passer l'admin vers sa destination
                    next()
                }
            }
        })
    }
}

module.exports = withAuthAdmin