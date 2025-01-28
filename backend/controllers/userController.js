const bcrypt = require("bcryptjs") //C'est un module pour le hashage sécurisé des mot de passe
const jwt = require("jsonwebtoken"); // c'est un module pour créer et vérifier les tokens jwt
const secret = "fsjs38"; //c'est une cle secret pour signer les tokens

module.exports = (UserModel) => { //export est une fonction prennant le modele de l'utilisateur en parametre

    const saveUser = async (req, res) => { 
       try{
       //Etape 1: Vérification de l'existence de d'un utilisateur avec le même email
       //On utilise la fonction en dessous pour rechercher si l'email existe déja
         const check = await UserModel.getUserByEmail(req.body.email)
         console.log(check) 
        //Vérification d'une erreur pendant la requete
         if(check.code){
            //Echec: Une erreur est survenue lors de la recherche de l'email
            res.json({status: 500, msg: "Oups, une erreur est survenue1!"}) 
             //Succès: Si la requete se passe bien, la mission continue
         } else {
        //Etape 2: Vérification si l'email existe déjà dans la base de données
        if(check.length > 0){ 
            //Si l'email existe déjà, on vérifie si l'email retourné correspond à celui de la requête
                if(check[0].email === req.body.email){
                    res.json({status: 401, msg: "Vous ne pouvez pas créer un compte avec les identifiants"})
                //Echec: L'email est déja utilisé par un autre compte
                }
            } else {
               //Aucun utilisateur avec cet email dans la base de données, on procède à l'enregistrement
                console.log(req.body)//Affiche les données reçues pour debug
                
                //Enregistrement du nouvel utilisateur dans la base de données
                //On appelle la fonction en dessous pour créer un nouvel utilisateur
                const user = UserModel.saveOneUser(req)
                console.log("ok")//Indique que l'enregistrement a été tenté
                
                //Vérification d'une erreur pendant l'enregistrement
                if(user.code){
                    res.json({status: 500, msg: "Oups, une erreur est survenue2!"})
                    //Echec: Une erreur est survenue pendant l'enregistrement
                } else { 
                    res.json({status: 200, msg: "L'utilisateur a bien été enregistré!"})
                    //Succès: L'utilisateur a été enregistré avec succès
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
                                id: check[0].id, 
                                firstname: check[0].firstname,
                                lastname: check[0].lastname, 
                                email: check[0].email, 
                                address: check[0].address, 
                                zip: check[0].zip, 
                                city: check[0].city, 
                                phone: check[0].phone, 
                                role: check[0].role 
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

    const updateUser = async (req, res) => {
        try{
            //Etape 1 Mise à jour des informations de l'utilisateur dans la base de données
            const user = await UserModel.updateUser(req, req.params.id)
            console.log("user", user)
            //Verification d'une erreur lors de la mise a jour
            if(user.code){
                //Echec: La requete de mise à jour a échoué
                res.json({status: 500, msg: "Erreur de la mise à jour de l'utilisateur1!"})    
            } else {
                //Succès: La mise à jour semble avoir réussi, on récupère les informations mises à jour
                //Etape 2: Récupération des nouvelles informations de l'utilisateur
                const newUser = await UserModel.getOneUser(req.params.id)
                console.log( "update",newUser)

                if(newUser.code){ 
                    //Echec: La récupération des informations a échoué
                    res.json({status: 500, msg: "Oups, une erreur est survenue!"})
                } else {
                    //Succès: On prépare un objet avec les nouvelles informations de l'utilisateur
                    const myUser = {
                        id: newUser[0].id, 
                        firstname: newUser[0].firstname, 
                        lastname: newUser[0].lastname, 
                        email: newUser[0].email,
                        address: newUser[0].address,
                        zip: newUser[0].zip,
                        city: newUser[0].city,
                        phone: newUser[0].phone,
                        role: newUser[0].role 
                    }
                    //Envoi de la réponse avec le statut de succès et les nouvelles informations
                    res.json({status: 200, msg: "Utilisateur modifier!", newUser: myUser})
                }
            }//Bloc de gestion des imprévus : catch
        } catch(err){
            console.log("error",err)
            res.json({status: 500, msg: "Oups, une erreur est survenue2!"})
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