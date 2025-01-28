module.exports = (UserModel) => {
    const checkToken = async (req, res) => {
        //Etape 1: Recuper les informations de l'utilisateur connecté
        try{
            const user = await UserModel.getOneUser(req.id)
            if(user.code){
                res.json({status: 500, msg: "Oups une erreur est survenue!"})
            } else {
                //Etape 2: Construire un objet utilisateur simplifié contenant  les informations essentielles
                const myUser = {
                    id: user[0].id, 
                    firstname: user[0].firstname, 
                    lastname: user[0].lastname, 
                    email: user[0].email,
                    address: user[0].address, 
                    zip: user[0].zip, 
                    city: user[0].city, 
                    phone: user[0].phone, 
                    role: user[0].role
                }
                //Etape 3: Retourne une reponse JSON contenant les infos
                res.json({status: 200, user: myUser}) 
            }
        } catch(err){ 
            res.json({status: 500, msg: "Oups, Une Erreur est survenue!"}) 
        }
    }

    return {
        checkToken
    }
}