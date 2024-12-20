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

//Les fonctionnalités des routes api
/*
app.post('/api/v1/user/save', userController.saveUser) cet route va permettre d'enregistrer un nouvel
utilsateur. Quand un utiisateur va s'inscrire, le rou va recevoir les informations comme
(nom, prenom, email, mt de passe) et les envoies à userController.saveuser pour traiter et sauvegarder dans la bdd


app.post('/api/v1/user/login', userController.loginUser) cet route va permettre de se connecter un utilisateur
Cette route va recevoir les identifiants de connexion (email et le mot de passe) qui va verifier s'ils correspondent
et de creer un token pour la session de l'utilisateur connecté.

app.put('/api/v1/user/update/:id', withAuth, userController.updateUser) cet route est utilisées
pour mettre à jour les informations de l'utilisateur. le withAuth va proteger cette route en s'assurant que seul
l'utilisateur connecter peut modifier son profil.
l'id ; est l'identifiant de l'utilisateur qui est recuperer dans req.params.id qui ciblera l'utilisateur à modifier

app.delete('/api/v1/user/delete/:id', withAuth, userController.deleteUser) cet route permet de supprimer
le compte d'un utilisateur spécifique (par l'ID), le withAuth va s'assurer que seul un utilisateur
authentifié peut effectuer cette action

*/ 