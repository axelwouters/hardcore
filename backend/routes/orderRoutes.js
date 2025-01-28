const withAuth = require('../middleware/withAuth')

module.exports = (app, db) => {
    const HardcoreModel = require("../models/HardcoreModel")(db)
    const UserModel = require("../models/UserModel")(db)
    const OrderModel = require("../models/OrderModel")(db)
    const OrderDetailModel = require("../models/OrderDetailModel")(db)
    const orderController = require("../controllers/orderController")(HardcoreModel, OrderModel ,UserModel, OrderDetailModel)

    //Une route de sauvegarde compléte d'une commande
    app.post('/api/v1/order/save', orderController.saveOrder) //Sauvegarder une commande dans le systeme
    //Une route de gestion du paiement (ça analysera le bon fonctionnement)
    app.post('/api/v1/order/payment', withAuth, orderController.executePayment) //Gere le paiement de la commande
    //Une route de modification du status de paiement de la commande
    app.put('/api/v1/order/validate', withAuth, orderController.updatePaymentStatus) //Met a jour le statut du paiement pour une commande, confirmant qu'elle a été payée
    //Une route de récupération de toutes les commandes ok
    app.get('/api/v1/order/all', withAuth, orderController.getAllOrder) //Récupère la liste de toutes les commandes effectuées
    //Une route de récupération d'une commande
    app.get('/api/v1/order/getOneOrder/:id', withAuth, orderController.getOneOrder)// Recupère les détails d'une commande spécifique

    //route pour récupérer les commandes de l'utilisateur connecter
    app.get('/api/v1/order/user', withAuth, orderController.getUserOrders)
}