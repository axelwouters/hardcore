const withAuth = require ('../middleware/withAuth')

module.exports = (app, db) => {
    const UserModel = require("../models/UserModel")(db)
    const authController = require("../controllers/authController")(UserModel)

    //la route qui va vérifier le token et de la reconnexion automatique ok
    app.get('/api/v1/users/checkToken', withAuth, authController.checkToken)
}

