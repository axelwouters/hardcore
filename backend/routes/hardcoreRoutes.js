const hardcoreController = require('../controllers/hardcoreController')
const withAuthAdmin = require('../middleware/withAuthAdmin')

module.exports = (app, db) => {
    const HardcoreModel = require("../models/HardcoreModel")(db)
    const hardcoreController = require("../controllers/hardcoreController")(HardcoreModel)


    //Une route qui permet de récupérer toutes les bombes hardcores ok
    app.get('/api/v1/hardcore/all', hardcoreController.getAllHardcore)
    //Une route qui permet de récupérer une seule bombes hardcore ok
    app.get('/api/v1/hardcore/one/:id', hardcoreController.getOneHardcore)
    //Une route qui permet d'enregistrer une bombe hardcore ok
    app.post('/api/v1/hardcore/save', withAuthAdmin, hardcoreController.saveHardcore)
    //Une route qui permet de modiefier une bombe hardcore ok
    app.put('/api/v1/hardcore/update/:id', withAuthAdmin, hardcoreController.updateHardcore)
    //Une route qui permet de supprimer une bombe hardcore ok
    app.delete('/api/v1/hardcore/delete/:id', withAuthAdmin, hardcoreController.deleteHardcore)
    //Une route qui ajout une image dans l'api (qui stock l'image et retourne le nom) ok enfin
    app.post('/api/v1/hardcore/pict', hardcoreController.savePicture)
   /* //Une route qui permet de modiefier une bombe hardcore ok
    app.put('/api/v1/hardcore/update2/:id', withAuth, hardcoreController.updateHardcore)*/
}


