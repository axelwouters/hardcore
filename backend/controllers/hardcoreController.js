const fs = require("fs")

module.exports = (HardcoreModel) => {
    //On sauvegarde une bombe
    /* Dans cette mission, le joueur doit sauvegarder une bombe aérosol dans la bdd, notre mission commence en appelant 
    la fonction savehardcore*/
    //Le joueur utilise sa compétence spéciale saveOneHardcore "qui est appelé sur hardcoreModel" pour ajouter
    //une bombe en prenant les informations fournie dans le req
    const saveHardcore = async (req, res) =>{
        try{//await : Le joueur doit attendre que saveOnehardcore termine son action, comme attendre que la mission soit complétée dans le jeu
            const hardcore = await HardcoreModel.saveOneHardcore(req)
            console.log(hardcore)/*Une fois que la tentative de sauvegarde est terminée, le jeu effectuer une 
            vérification pour voir si la mission a réussi */
            if(hardcore.code){//Si hardcore.code est présent (comme une alerte rouge dans un jeu), cela signifie qu'une erreur est survenue pendant la sauvegarde
                res.json({status: 500, msg: "Oups, une erreur est survenue!"})//Le jeu informe le jeu avec un message d'erreur
            } else {//Si tout s'est bien passer et qu'il n'y a pas de code d'erreur, alors la mission est réussie
                res.json({status: 200, msg: "Une bombe aréosol enregistrée!"}) //Le jeu renvoie un message de succés au joueur
            }
        } catch(err){//le bloc catch gère les erreurs inattendues et informe le joueur avec un message
            res.json({status: 500, msg: "Oups, une erreur est survenue!"})
        }
    }

    //On modifie une bombe
    /*Dans cette mission, l'objectif est de mettre a jour une bombe aérosol*/
    //Le joueur(le backend) lance la mission de mise a jour d'une bombe aérosol en utilisant la fonction updateHardcore 
    const updateHardcore = async (req, res) =>{//Dans la mission, le joueur doit modifier une bombe existante identifié par son ID, contenu dans le req.params.id
        try{//Le joueur utilise la compétence spéciale updateOneHardcore (appellé dans hardcoremodel) pour mettre a jour les information de la bombe
            const hardcore = await HardcoreModel.updateOneHardcore(req, req.params.id)//Le joueur doit attendre la reponse de cette action en utilisant le await
           // console.log(hardcore)
            if(hardcore.code){//Si hardcore.code est présent, cela signifie qu'une erreur est survenue pendant la mise à jour, comme un obstacle dans le jeu
                res.json({status: 500, msg: "Oups, Une erreur est survenue!"})//Le joueur reçoit alors un message d'erreur comme un game over
            } else {//Si tout s'est passé et que la mise a jour a été réaliser sans erreur, la mission est un succès
                res.json({status: 200, msg: "Une bombe aérosol à été modifié!"})//Le joueur reçoit un message de félécitation comme une récompense
            }
        } catch(err){//En cas de bug, le bloc catch intercepte l'erreur et informe le joueur
            res.json({status: 500, msg: "Oups, Une erreur est survenue!"})
        }
    }

    //On récuperer toutes les bombes
    /* La fonction getAllHardcore est de récupérer toutes les bombes disponible dans l'inventaire du jeu*/
    //Le joueur (le backend) démarre une quete en utilisant la fonction getAllHardcore pour récupérer toutes les bombe disponibles
    //Cette fonction agit comme une mission "d'exploration" ou le joueur cherhce a obtenir la liste compléte des bombes dans la bdd
    const getAllHardcore = async (req, res) => {//Le joueur utilise une compétence spéciale appelée HardcoreModel.getAllHardcore() pour envoyer une requete a la bdd et de récuperer toute les bombes
        try{ //comme pour un jeu le joueur attend le resultat de son exploration, ici, la fonction await attend le retour de cette recherche
            const hardcore = await HardcoreModel.getAllHardcore()
            if(hardcore.code){//Si hardcore.code est présent cela signifie qu'une erreur s'est produite
                res.json({status: 500, msg: "Oups, Une erreur est survenue!"})//je joueur reçoit un message d'erreur
            } else { //si tout se passe bien, le jeu affiche le "butin": la liste complete des bombes est transmise au joueur
                res.json({status: 200, result: hardcore})//Le joueur obtient cette récompense sous forme de données
            }//En cas de probleme inattendue, le bloc catch intervient qui attrape l'erreur et informe le joueur
        } catch(err){
            res.json({status: 500, msg: "Oups, une erreur est survenue!"})
        }
    }

    //On supprime une bombe aérosol
    //Dans le code, la fonction deleteehardcore est une mission d'élimination ou le but est de supprimer une bombe de l'inventaire du jeu 
    const deleteHardcore = async (req, res) => {//Le joueur reçoit une mission pour "eliminer" une bombe spécifique dans le jeu
        try{//La bombe à supprimer est identifiée par req.params.id, l’équivalent d’une "cible marquée" que le joueur doit détruire.
            //Avant de passer a l'attaque, le joueur utilise une compétence de hardcoreModel.getOnehardcore(req.params.id) pour scanner les détails de la bombe ciblée
            const hardcore = await HardcoreModel.getOneHardcore(req.params.id) //Dans un jeux, le joueur attends la validation de la cible, le code attend avec await pour le retour des informations
            if(hardcore.code){//si le scan indique une erreur, le jeu affiche un message d'erreur
                res.json({status: 500, msg: "Oups, Une erreur est survenue!"})
            } else {//si la bombe est bien trouvée, le joueur exécute l'action de suppression qui est deleteonehardcore(req.params.id) pour éliminer la cible
               const Hardcoredelete = await HardcoreModel.deleteOneHardcore(req.params.id)
               //En cas de succés, le jeu renvoie un message de victoire au joueur indiquant que l'article a été supprimer
                res.json({msg: "article supprimer"})
                //La bombe aérosol est supprimée, on supprime l'image de la bombe (si ce n'est pas no-pict.jpg)
               // if(hardcore[0].photo !== "no-pict.jpg"){
                    //On va supprimer le fichier (photo) correspondant au nom de la photo
                   // fs.unlink(`public/images/${hardcore[0].photo}`, (err)=>{
                      //  if(err){
                       // res.json({status: 500, msg: "Problème de suppression de l'image!"})
                      // } else {
                        //    res.json({status: 200, msg: "Image de bombe supprimer!"})
                       // }
                   // })
               // } 
            }
        } catch(err){ //En cas d'échec, le catch intercepte l'erreur et informe le joueur que la mission a échoué
            res.json({status: 500, msg: "Oups, une erreur est survenue!"})
        }
    }

    //On recupere une seul bombe
    //LA miison consiste de récupérer les details d'une bombe spéciale en utilisant un identifiant spécifique pour la trouver
    //Mon personnage est la fonction getOneHardcore qui doit récupérer une bombe aérosol identifié par son Id (req.params.id) et de verifié s'il a trouver ou non
    const getOneHardcore = async (req, res) => {
        try{//Mon personnage appel le modele hardcoreModel pour trouver l'objet avec getOneHardcore(req.params.id).
            const hardcore = await HardcoreModel.getOneHardcore(req.params.id)/* On imagine que hardcoremodel est une carte de jeu, elle connait l'emplacement de chaque bombe lorsque on lui donne l'ID*/
            console.log(hardcore)//Une fois que le modele renvoie le resultat, ton personnage verifie si la bombe a bien été trouver ou si une erreur est produite
            if(hardcore.code){//Si le resultat de hardcore.code contient un code d'erreur cela signifie que la mission a échoué
                res.json({status: 500, msg: "Oups, Une erreur est survenue!"})//Dans ce cas, le jeu affichera un message d'erreur 
            } else {//Si aucune erreur n'apparait (hardcore.code), ton personnage réussit la mission et la bombe aérosol a été trouvée et le jeu affiche la bombe
                res.json({status: 200, result: hardcore[0]})
            }
        } catch(err){//En cas d'échec, le catch intercepte l'erreur et informe le joueur que la mission a échoué
            res.json({status: 500, msg: "Oups, Une erreur est survenue!"})
        }
    }

    const path = require('path');
/*La mission commence quand ton personnage (le code) doit récupérer et stocker une photo dans une base ou un inventaire
Si la mission réussit, tu as l'image enregistrée, sinon des messages d'erreur te disent ou la quete a échoué*/
//La mission commence quand le joueur envoie une image (le fichier req.files.images) que le personnage (le code) doit sauvegarder dans le système 
const savePicture = async (req, res) => { //Le code affiche dans la console une petite trace (REQ HAHAHA) pour confirmer qu'il a reçu la demande. c'est comme un signale que l'img a été dectéte
    console.log("REQ HAHAHA", req.files.images.name);
    try {
        // Vérification de l’objet de la mission
        //Avant d'aller plus loin, ton personnage vérifie s'il a bien reçu un fichier image,(c'est l'étape ou il s'assure que la quete est valide)
        if (!req.files || Object.keys(req.files).length === 0) {//Si le fichier en-dessous est manquant, la quete échoue instantanément.
            // Un messae d'erreur s'affiche
            res.json({ status: 400, msg: "La photo n'a pas pu être récupérée!" });
        } else {
            // Préparation pour l’enregistrement
            /*Si la photo est bien la, ton personnage définit un "chemin de destination" pour l'image, comme s'il identifiait ou l'iobjet doit être stocké*/ 
            const uploadPath = path.join(req.files.images.name); //spécifie ou l'image doit etre placé, un peu comme définir l'emplacement dans un coffre

            // Transfert de l’objet vers le coffre sécurisé
            //Mon personnage essaie de déplacer l'image dans ce dossier
            req.files.images.mv(uploadPath, (err) => {
                if (err) {//Si ce déplacement échoue, un message d'erreur s'affiche "la photo n'a pas pu être enregistrée" (status: 500). C'est comme s'il y avait un piège qui empêche l'objet de rentrer dans le coffre
                    res.json({ status: 500, msg: "La photo n'a pas pu être enregistrée!" });
                } else {//Si le transfert réussi, le jeu indique "Image enregistrée" et te donne l'URL ou elle est stockée, cela signifie la mission accomplie
                    res.json({ status: 200, msg: "Image enregistrée!", url: uploadPath });
                }
            });
        }//Gestion des pièges imprévus
    } catch (err) { //Si une erreur générale se produit pendant la quête, comme un plantage, le bloc catch va intercepter l'erreur comme si le personnage tombait dans un piege
        console.log(err); //Dans ce cas, un message d'erreur sera affiché
        res.json({ status: 500, msg: "Oups, une erreur est survenue!" });
    }
}

    return {
        saveHardcore,
        updateHardcore,
        deleteHardcore,
        getAllHardcore,
        getOneHardcore,
        savePicture
    }    

}