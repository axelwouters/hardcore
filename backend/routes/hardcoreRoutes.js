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

/*  
    app.get('/api/v1/hardcore/all', hardcoreController.getAllHardcore) cet fonctionnalité va récuperer et retourne la liste 
    de toutes les bombes hardcore dans la bdd. Cette route elle est publique (qui aucune protection d'accès) et appelle
    getAllHardcore dans le hardcoreController pour effectuer cette tache.

    app.get('/api/v1/hardcore/one/:id', hardcoreController.getOneHardcore) cet fonctionnalité va récupérer les informations
    d'une bombe spécifique via a son ID qui est req.params.id récupérer dans le hardcoreController, elle va appeler getOneHardcore pour extraire
    cette bombe de la bdd
    
    app.post('/api/v1/hardcore/save', withAuthAdmin, hardcoreController.saveHardcore) Cet fonctionnalité consiste a enregistrer
    une nouvelle bombe hardcore dans la bdd. La route est protégée par withAuthAdmin, permettant uniquement aux utilisateur
    avec un le role de l'admin d'y accéder. On va utiliser la méthode savehardcore pour sauvegarder les données

    app.put('/api/v1/hardcore/update/:id', withAuthAdmin, hardcoreController.updateHardcore) Cet fonctionnalité mettra a jour
    les informations d'une bombe hardcore spécifique identifiée par id. Elle es protéger par un withAuthAdmin, limitant
    l'accès aux administrateurs, le updateHardcore gèra la modification des données.

    app.delete('/api/v1/hardcore/delete/:id', withAuthAdmin, hardcoreController.deleteHardcore) Cet fonctionnalité va supprimer une bombe
    hardcore dans la bdd en utilisant son ID qui est protégée par withAuthAdmin, cette route s'assure que seul l'admin peut effectuer 
    la supprssion via a deleteHardcore

    app.post('/api/v1/hardcore/pict', hardcoreController.savePicture) Cet fonctionnalité permet de sauvegarder une image associé a une bombe hardcore
    savePicture stocke l'image sur le serveur et renvoie le nom du fichier sauvegarder. La route n'est pas protéger par un middleware d'authentification
*/
