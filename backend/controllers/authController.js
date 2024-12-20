module.exports = (UserModel) => {
    //Ce code peut être comparé à une mission de vérification d'identité d'un joueur dans un jeu video.
    //L'objectif est de s'assurer que le joueur est bien autgentifié et reconnu dans le système grace à un artefact magigique
    //Le token JWT va agir comme une carte d'identité magique
    const checkToken = async (req, res) => {
        /*1 Mission Vérérifié l'identité du joueur grâce a son artefact (JWT Token)
        Lorsqu'un joueur entre dans une zone sécurisée (comme un chateau fort), il doit prouver son identité

        Pour cela, le système récupère son artefact (le token JWT) pour identifier le joueur. Ce token contient un ID unique qui agit
        comme une clé pour retrouver les informations du joueur dans la bdd
        
        */ 
        try{
            /*2 Etape 1: Trouve le joueur avec l'ID contenu dans le token
            Grace au UserModel.getOneUser(req.id), le système interroge la bibliothèque des héros (bdd) pour retrouver toutes les informztions du joueur ayant cet ID
            Si le joueur est introuvable, c'est comme si le gardien du chateau repondiat "Je ne trouve pas ce joueur dans mes registre" 
            */
            const user = await UserModel.getOneUser(req.id)
            if(user.code){
                 /*3 Etape 2 Le gardien vérifie si une erreur est survenue
                 Apres avoir demandé les informations au systeme
                    Erreur trouvée: Si une erreur (un probleme de la bdd) survient, le systeme renvoie un message d'erreur au joueur
                    Le joueur est alors bloqué à l'entrée du niveau sécurisé
                 */
                res.json({status: 500, msg: "Oups une erreur est survenue!"})
            } else {
                /*4 Etape 3 Le gardien autorise le joueur si tout va bien
                    Si tout va bien, le systeme extrait les informations du joueur à partir des données retournées
                */
               //Ces informations sont organisées dans un objet myUser, qui agit comme une fiche d'identité compléte pour le joueur
                const myUser = {
                    id: user[0].id, //id
                    firstname: user[0].firstname, //prénom
                    lastname: user[0].lastname, //nom
                    email: user[0].email, //email
                    address: user[0].address, //adresse
                    zip: user[0].zip, //code postal
                    city: user[0].city, // ville
                    phone: user[0].phone, //téléphone
                    role: user[0].role//role
                }
                //Le système renvoie alors un message du succés, accompagné des informations du joueur. 
                res.json({status: 200, user: myUser}) //C'est comme si le gardien du chateau disait: "Bienvenue, voici vos informations! Vous êtes autorisé à entrer"
            }
        } catch(err){ //5 Etape: Gestion des imprevus
            /*Si une erreur inattendue survient pendant le processus (une panne de serveur
            le systemem intercepte cette erreur et répond au joueur avec un message
            */
            res.json({status: 500, msg: "Oups, Une Erreur est survenue!"}) //Cela permet d'éviter que le systeme ne plante complétement
        }
        /*
        En résumé
        Ce code correspond à une mission de validation d'identité dans un jeu video
        Le token JWT agit comme une carte d'identité magique
        Si le joueur est trouvé dans les registres (base de données), ses informations sont récupérées et renvoyées pour autoriser son accès
        Si une erreur survient, un message d'échec est renvoyé, empêchant le joueur de continuer
        c'est une fonctionnalité essentielle pour sécuriser les zones sensibles et s'assurer que seuls les joueurs authentifiés accèdent à certaines ressources du jeu
        */ 
    }

    return {
        checkToken
    }
}