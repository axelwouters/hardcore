const bcrypt = require("bcryptjs") //C'est un module pour le hashage sécurisé des mot de passe
const jwt = require("jsonwebtoken"); // c'est un module pour créer et vérifier les tokens jwt
const secret = "fsjs38"; //c'est une cle secret pour signer les tokens

module.exports = (UserModel) => { //export est une fonction prennant le modele de l'utilisateur en parametre

    //Mission: Recrutement d'un nouveau héros dans un RPG
    //Ojectif de mission
    //Dans ce jeu, le joueur veut inscrire un nouveau héros (utilisateur) dans la bdd du royaume (serveur)
    //Avant de lui donner accés, il faut vérifier que ce héros n'existe pas déja.
    const saveUser = async (req, res) => { 
       try{
       //Etape 1: Vérification de l'existence de l'email
       //On va interroger la bdd pour rechercher un utilisateur avec cet email
         const check = await UserModel.getUserByEmail(req.body.email)
         console.log(check) 
        //Gestion d'une erreur potentielle lors de la recherche
         if(check.code){
            //Echec: Si une erreur survient pendant cette vérification (check.code)
            res.json({status: 500, msg: "Oups, une erreur est survenue1!"}) 
             //Succès: Si la requete se passe bien, la mission continue
         } else {
        //Etape 2: Test de l'unicité de l'email
        //Vérifie si un résutat existe déja pour cet email
        if(check.length > 0){ 
            //Si un utilisateur existe avec cet email
                if(check[0].email === req.body.email){
                    //Bloque la création si l'email est déjà utilisé
                    res.json({status: 401, msg: "Vous ne pouvez pas créer un compte avec les identifiants"})
                //Reponse au joueur: Si un héros existe déja, la mission s'arrete, et le joueur est averti qu'il ne peut pas utiliser cet e-mail
                }
            } else {
               //Etape 3: Création du compte
               //Aucun email similaire trouvé, on peut proceder à l'inscription 
                console.log(req.body)
                //Appel à la methode de sauvegarde de l'utilisateur
                const user = UserModel.saveOneUser(req)
                console.log("ok")
                //Gestion du résultat de la sauvegarde
                if(user.code){//
                    //Echec de l'enregistrement
                    res.json({status: 500, msg: "Oups, une erreur est survenue2!"})
                } else { 
                    //Succès de l'enregistrement
                    res.json({status: 200, msg: "L'utilisateur a bien été enregistré!"})
                }
            }
         }
         //Gestion des erreurs inattendues : catch
       } catch(err){ 
        res.json({status: 500, msg: "Oups, une erreur est survenue3!"})
       }
    }

    
    const loginUser = async (req, res) => {//pour y entrer il doit prouver son identiter en utilisant l'email et le mot de passe
        try{
            //Etape 1: Recherche de l'utilisateur par email dans la base de donnée
            const check = await UserModel.getUserByEmail(req.body.email) //Ce code va verifier si un utilsateur existe avec cet email
            if(check.code){//si une erreur arrive pendant la vérification, le check.code detectera l'erreur et il enverra un message d'erreur
                res.json({status: 500, msg: "Oups, une erreur est survenue!"})
            } else {
                //si check.length === 0, cela signifie qu'aucun utilisateur existe avec l'email
                if(check.length === 0){//alors une reponse sera envoyer
                    res.json({status: 404, msg:"Utilisateur introuvable!"})
                } else {
                    //c'est comme si le joueur devait montrer une cle spéciale pour prouver son identiter
                    const same = await bcrypt.compare(req.body.password, check[0].password) //si l'utilisateur est trouver, le code compare le mot de passe qui est stocker dans la bdd
                    //si le mot de passe correspond same est true, alors l'utilisateur est authentifié avec succès
                    if(same){
                        console.log(check)
                        //Le code crée un token qui jwt.sign(payload, secret), ça va lui donner au joueur un accés spécial
                        //Le payload contient des informations sur le joueur qui est comme un role, sans inclure les données sensible
                        const payload = {id: check[0].id, role: check[0].role}
                        const token = jwt.sign(payload, secret)
                        //Ensuite le code met a jour la date de derniere connexion de l'utilisateur dans la bdd
                        const connect = await UserModel.updateConnexion(check[0].id)
                        if(connect.code){
                            res.json({status: 500, msg:"Oups, une erreur est survenue!"})
                        } else { //On va préparer les informations du joueur
                            const user = { //le code va rassembler des informations sur le joueur
                                id: check[0].id, // l'id dans la bdd
                                firstname: check[0].firstname, // prénom
                                lastname: check[0].lastname, // nom
                                email: check[0].email, // l'email
                                address: check[0].address, // l'addresse
                                zip: check[0].zip, // code postale
                                city: check[0].city, // vile
                                phone: check[0].phone, // téléphone
                                role: check[0].role // son role (user ou admin)
                            }
                            res.json({status: 200, token: token, user: user})
                        }
                    } else {
                        //si le mot de passe ne correspond pas a "same", alors le code enverra une message d'erreur
                        res.json({status: 404, msg:"Utilisateur introuvable!"})
                    }
                }
            }//gestion des erreurs globale avec un catch(err)
        } catch(err){//Si une erreur est imprévue se produit pendant le processus de connexion avec un catch renvoie une reponse
            res.json({status: 500, msg: "Oups, une erreur est survenue!"})
        }
    }

    //Mission: Mise a jour du héros dans un rpg
    //Objectif de la mission
    //Dans ce jeu, le joueur doit mettre à jour le profil d'un héros (l'utilisateur)
    //avec de nouvelles compétences ou information  (prénom, adresse, rôle, etc.).
    //À la fin, le héros actualisé est renvoyé au joueur pour confirmation.
    const updateUser = async (req, res) => {
        try{
            //Etape 1 Debut de la mission - Préparer la mise a jour
            //Le joueur lance la mission en envoyant une requête avec les nouvelles informations du héros
            const user = await UserModel.updateUser(req, req.params.id)
            //Le serveur, jouant le role d'un Grand Maitre Archiviste, prend ces nouvelles info et les transmettre a l'Assistant Archiviste (UserModel.updateUser)
            console.log("user", user)
            //Etape 2: Validation initiale
            //Le Grand Maître vérifie si l'Assistant Archiviste a bien réussi la mise à jour
            if(user.code){//Echec: Si l'assistant retourne une erreur (user.code), la mission echoue immédiatement, et un message est renvoyé au joueur
                res.json({status: 500, msg: "Erreur de la mise à jour de l'utilisateur1!"})    
            } else {//Succès: Si tout s'est bien passé, la mission continue
                //Etape 3: Confirmer les changements- Obtenir le profil actualisé
                //Si la mise à jour a été effectué, le Grand Maitre demande une vérification complete des nouvelles données du héros
                const newUser = await UserModel.getOneUser(req.params.id)
                console.log( "update",newUser)
                if(newUser.code){ //Echec: Si le profil mis a jour ne peut pas être récupéré (newUser.code), la mission échoue
                    res.json({status: 500, msg: "Oups, une erreur est survenue!"})
                } else {//Succès : Si le Grand Maître récupère les nouvelles données, il les prépare soigneusement
                    //Etape 4: Compilation des information - Creer le nouveau profil
                    //Lorsque le Grand Maitre reçoit les information actualisées
                    //Il prépare un pack d'équipement pour le héros contenant
                    const myUser = {
                        id: newUser[0].id, //son identifiant
                        firstname: newUser[0].firstname, //son nom et prénom
                        lastname: newUser[0].lastname, //ses coordonnées (adress, ville, téléphone)
                        email: newUser[0].email,
                        address: newUser[0].address,
                        zip: newUser[0].zip,
                        city: newUser[0].city,
                        phone: newUser[0].phone,
                        role: newUser[0].role //son role dans l'aventure
                    }
                    //Etape 5: Remise du rapport de mission
                    //Une fois les informations préparées, Le grand Maitre les envoie au joueur pour validation
                    res.json({status: 200, msg: "Utilisateur modifier!", newUser: myUser})
                    //Le joueur peut maintenant voir le profil mis a jour de son héros et continuer l'aventure
                }
            }//Bloc de gestion des imprévus : catch
        } catch(err){
            //Comme dans tout RPG, il peut y avoir des imprévus: des bugs dans le script
            //des erreurs dans la bdd, ou une panne de l'Archiviste
            console.log("error",err)
            res.json({status: 500, msg: "Oups, une erreur est survenue2!"})
            //Si cela se produit, le Grand Maitre interrompt la mission et renvoie un message au joueur
        }
    }

    //La fonction pour supprimer un utilisateur
    const deleteUser = async (req, res) => { 
        try{
            //Etape 1: Suppression de l'utilisateur dans la base de donnée
            //Appel a la méthode 'deleteOneUser' du modèle avec l'ID récupéré depuis les paramètres de la requête
            const deleteUser = await UserModel.deleteOneUser(req.params.id) 
            
            // Affichage de la réponse de la suppression pour le débogage
            console.log("supp",deleteUser) 
            console.log("reque", req.params.id)
            //Vérification s'il y a une erreur lors de la suppression
            if(deleteUser.code){
                res.json({status: 500, msg: "Oups, une erreur est survenue1!"}) 
            } else {
                res.json({status: 200, msg: "L'utilisateur à bien été supprimer"}) //Cela confirme que le perso a bien été retiré du jeu et que la mission est accomplie
            }
        } catch(err){//Le catch agit comme un systeme de secours, si une erreur imprévue apparait, le jeu interrompt la mission et envoie un message d'erreur
            res.json({status: 500, msg: "Oups, une erreur est survenue"})//Ce système permet au joueur d'être informé en cas de problème, même si l'erreur est prevue
        }
    }

    //Une fonction de modification du mot de passe
    const updatePassword = async (req, res) => { //le updatepassword est mon objectif de maj du mdp du personnage
        console.log("req.body.password", req.body)
        try{
            //je fais une contante de saltrounds
            const saltrounds = 10
            //je dois hashé mon de passe
            const newPass = req.body.password
            const hashedPassword = await bcrypt.hash(newPass, saltrounds)
            console.log("Password value", newPass)
            console.log("Salt rounds value", saltrounds)
            //Je dois prendre les infos (req.params.id) mon (await) va me servir a attendre que l'utilisateur confirme la maj
            //Ma mission commence par envoyer les info de (USERMODEL.updatePassword) pour modifier les données du perso
            const password = await UserModel.updatePassword(hashedPassword, req.params.id) 
            console.log("password", password)
            if(password.code){ //Si je rencontre une erreur, le jeu me retournera une erreur avec un message
                res.json({status: 500, msg: "Erreur de la mise à jour du mot de passe"})
            } else { //si tout est ok, le joueur demande une confirmation des infos de la maj en lançant la requete await UserModel.getOneUser(req,params.id)
                const newPassword = await UserModel.getOneUser(req,params.id)
                console.log("update", newPassword) //le jeu va vérifier a nouveau si il ya des erreur lors de la récupération des new informations
                if(newPassword.code){ //si il y a une erreur dans newpassword.code, alors est envoie au joueur un msg d'erreur avec res.json
                    res.json({status: 500, msg: "Oups, une erreur est survenue lors mdp1"})
                } else { //si tout va bien le jeu va preparer les nouvelles infos pour les envoyer au joueur sous forme de pack
                    const myPassword = { //le pack (mypassword) va contenir les details du personnage : id et le mot de passe
                        id: newPassword[0].id,
                        password: newPassword[0].password
                    }//si tout va bien et que la mise a jour du password est terminé, il renverra a l'utilsateur les information de son personnage
                    res.json({status: 200, msg: "Le mot de passe à été modifier", newPassword: myPassword})
                }
            }
        } catch(err){ //si il y a une erreur attendue, le jeu va interrompte la mission 
            console.log("error1",err)//et enverra un msg d'erreur
            res.json({status: 500, msg: "Oups, une erreur est survenue2!"})
        }
        
    }

    return {
        saveUser,
        loginUser,
        updateUser,
        deleteUser,
        updatePassword
    }
}