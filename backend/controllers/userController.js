const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken"); 
const secret = "fsjs38"; 

module.exports = (UserModel) => { 

    //Fonction qui enregistre un nouvelle utiisateur
    const saveUser = async (req, res) => { 
       try{
        //La methode qui verifie si l'utilisateur existe deja avec son email
         const check = await UserModel.getUserByEmail(req.body.email)
         console.log(check) 
         if(check.code){
            res.json({status: 500, msg: "Oups, une erreur est survenue1!"}) 
         } else {//On verifie si l'utilisateur avec cet email existe deja
        if(check.length > 0){ 
                if(check[0].email === req.body.email){
                    res.json({status: 401, msg: "Vous ne pouvez pas créer un compte avec les identifiants"})
                }
            } else {
                console.log(req.body)
                const user = UserModel.saveOneUser(req)
                console.log("ok")
                if(user.code){
                    res.json({status: 500, msg: "Oups, une erreur est survenue2!"})
                } else { 
                    res.json({status: 200, msg: "L'utilisateur a bien été enregistré!"})
                }
            }
         }
       } catch(err){ 
        res.json({status: 500, msg: "Oups, une erreur est survenue3!"})
       }
    }

    //La fonction pour connecter un utilisateur
    const loginUser = async (req, res) => {
        try{
            //On verifie si l'utilisateur existe avec l'email
            const check = await UserModel.getUserByEmail(req.body.email) 
            if(check.code){
                res.json({status: 500, msg: "Oups, une erreur est survenue!"})
            } else {
                if(check.length === 0){
                    res.json({status: 404, msg:"Utilisateur introuvable!"})
                } else {
                    //Avec le same on verifie si le mot de passe est correct
                    const same = await bcrypt.compare(req.body.password, check[0].password) 
                    if(same){
                        console.log(check)
                        const payload = {id: check[0].id, role: check[0].role}
                        const token = jwt.sign(payload, secret)
                        //La methode updateConnexion met a jour la connexion
                        const connect = await UserModel.updateConnexion(check[0].id)
                        if(connect.code){
                            res.json({status: 500, msg:"Oups, une erreur est survenue!"})
                        } else { 
                            const user = { 
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
                        res.json({status: 404, msg:"Utilisateur introuvable!"})
                    }
                }
            }
        } catch(err){
            res.json({status: 500, msg: "Oups, une erreur est survenue!"})
        }
    }

    //Fonction qui met a jour l'utilisateur
    const updateUser = async (req, res) => {
        try{
            //On appel la fonction du modele pour modifier l'utilisateur
            const user = await UserModel.updateUser(req, req.params.id)
            console.log("user", user)
            if(user.code){//On verifie une erreur dans la bdd
                res.json({status: 500, msg: "Erreur de la mise à jour de l'utilisateur1!"})    
            } else {
                //On recupere les nouvelles informations de l'utilisateur
                const newUser = await UserModel.getOneUser(req.params.id)
                console.log( "update",newUser)
                if(newUser.code){ //on verifie une erreur lors de la recuperation
                    res.json({status: 500, msg: "Oups, une erreur est survenue!"})
                } else {
                    const myUser = { //On creer un objet de l'utilisateur avec aucune donnée sensible
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
                    res.json({status: 200, msg: "Utilisateur modifier!", newUser: myUser})
                }
            }
        } catch(err){
            console.log("error",err)
            res.json({status: 500, msg: "Oups, une erreur est survenue2!"})
        }
    }

    //Fonction qui supprime un utilisateur
    const deleteUser = async (req, res) => { 
        try{
            //On appel la fonction du modele pour supprimer l'utilisateur
            const deleteUser = await UserModel.deleteOneUser(req.params.id) 
            if(deleteUser.code){
                res.json({status: 500, msg: "Oups, une erreur est survenue1!"}) 
            } else {
                res.json({status: 200, msg: "L'utilisateur à bien été supprimer"}) 
            }
        } catch(err){
            res.json({status: 500, msg: "Oups, une erreur est survenue"})
        }
    }

    //Fonction qui met a jour le mot de passe du l'utilisateur
    const updatePassword = async (req, res) => { 
        console.log("req.body.password", req.body)
        try{
            //On definie le nombre de tours pour le hachage du mdp
            const saltrounds = 10
            const newPass = req.body.password
            //Hachage du nouveau mot de passe avec bcrypt
            const hashedPassword = await bcrypt.hash(newPass, saltrounds)
            //On met a jour du mot de passe dans la bdd
            const password = await UserModel.updatePassword(hashedPassword, req.params.id) 
            console.log("password", password)
            if(password.code){ 
                res.json({status: 500, msg: "Erreur de la mise à jour du mot de passe"})
            } else { 
                //On recupere les nouvelles information de l'utilisateur apres la maj du mdp 
                const newPassword = await UserModel.getOneUser(req,params.id)
                console.log("update", newPassword) 
                if(newPassword.code){ 
                    res.json({status: 500, msg: "Oups, une erreur est survenue lors mdp1"})
                } else { 
                    //On creer un objet utilisateur uniquement avec l'ID
                    const myPassword = { 
                        id: newPassword[0].id,
                        password: newPassword[0].password
                    }
                    res.json({status: 200, msg: "Le mot de passe à été modifier", newPassword: myPassword})
                }
            }
        } catch(err){ 
            console.log("error1",err)
            res.json({status: 500, msg: "Oups, une erreur est survenue2!"})
        }
        
    }

    //Je recupere les users par son id
    const getUserById = async (req, res) => {
        console.log("ID reçu :", req.params.id);  // DEBUG
    
        // Vérifie que l'ID est un nombre valide
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, msg: "ID invalide" });
        }
    
        try {
            // Attends la résolution de la requête SQL
            const [user] = await UserModel.getUserById(id);
            
            // Vérifie si un utilisateur a été trouvé
            if (!user) {
                return res.status(404).json({ status: 404, msg: "Utilisateur non trouvé" });
            }
    
            res.json({ status: 200, msg: "Récupération réussie", user });
        } catch (err) {
            console.error("Erreur serveur :", err);
            res.status(500).json({ status: 500, msg: "Oups, une erreur est survenue", error: err });
        }
    };
    

    return {
        saveUser,
        loginUser,
        updateUser,
        deleteUser,
        getUserById,
        updatePassword
    }
}