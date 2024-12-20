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
}

/*
Ces routes définissent un systeme complet pour gérer les commandes et paiements dans une API

1 /api/v1/order/save : Creer une commande
    J'imagine que tu es dans un marché d'un jeu RPG
        Tu sélectionnes des potions, armes ou armures, et appuies sur "Acheter"
        Cette route enregistre ce que tu as choisi dans un panier ou un système d'achat en attente

2 /api/v1/order/payment Processus de paiement
    Une fois ton panier rempli, tu approches le marchand pour finaliser l'achat
        Le jeu vérifie si tu as assez d'or ou de monnaie pour payer
        Si le paiement échoue (pas assez de monnaie), la commande reste en attente
        Si le paiement réussit, les objets sont transférés dans ton inventaire
    Middleware withAuth
        Le jeu vérifie que tu es bien un joueur authentifié pour éviter que des joueurs non connectés des paiements frauduleux

3 /api/v1/order/validate : validation du paiement 
    Apres que le paiement a été effectué avec succès, le jeu confirme que l'achat est valide et que les objets sont désormais a toi


4. /api/v1/order/all Voir toutes les commandes
    Dans certains jeux, tu peux ouvrir un journal d'achats pour voir tout ce que tu as acheté dans la boutique ou échangé avec des PNJ
        Cette route affiche tout l'historique des commandes (ou achats) effectués
    Middleware withAuth
        Seuls les joueurs authentifiés peuvent voir cet historique, évitant que d'autres joueurs aient a tes transactions

5. /api/v1/order/getOneOrder/:id: Voir les détails d'une commande spécifique
    Imagine que tu veux revoir les détails d'une arme légendaire que tu as achetée
        Le jeu te montre les spécifications complètes de cet achat
        Cette route te fournit ces informations en demandant l'ID de l'achat

Synthèse :
Ce système est comme une boutique de jeu en ligne où chaque étape est organisée :

Ajouter au panier (sauvegarder une commande).
Payer à la caisse (traiter le paiement).
Confirmer la possession des objets achetés (validation).
Voir tout ce que tu as acheté (liste des commandes).
Obtenir les détails d'un achat particulier (commande spécifique).
Et tout cela fonctionne avec des contrôles pour vérifier que tu es bien un joueur légitime connecté (via withAuth)
*/