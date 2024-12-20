const withAuth = require ('../middleware/withAuth')

module.exports = (app, db) => {
    const UserModel = require("../models/UserModel")(db)
    const authController = require("../controllers/authController")(UserModel)

    //la route qui va vérifier le token et de la reconnexion automatique ok
    app.get('/api/v1/users/checkToken', withAuth, authController.checkToken)
}

/*Cette route est un checkpoint de sécurité pour valider que l'utilisateur a toujours accés a la session
c'est comme un badge d'entrée dans un jeu video multijoueur, ou chaque joueur doit prouver
qu'il a l'autorisation d'acceder a une partie, sans avoir besoin de se reconnecter manuellement a chaque fois */