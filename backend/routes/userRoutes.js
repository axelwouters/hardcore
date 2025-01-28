const withAuth = require ('../middleware/withAuth')

module.exports = (app, db) => {
    const UserModel = require("../models/UserModel")(db)
    const userController = require("../controllers/userController")(UserModel)


    //Une route d'enregistrement d'un utilisateur ok
    app.post('/api/v1/user/save', userController.saveUser)
    //Une route de connexion d'un utilisateur (ici on va créer le token) ok
    app.post('/api/v1/user/login', userController.loginUser)
    //Une route de modificattion d'un utilisateur ok
    app.put('/api/v1/user/update/:id', withAuth, userController.updateUser)
    //Une route de suppresion d'un utilisateur ok
    app.delete('/api/v1/user/delete/:id', withAuth, userController.deleteUser)
    //Une route de modification de mot de passe
    app.put('/api/v1/user/passwordchange/:id', userController.updatePassword)
}

