const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const withAuth = require('../middleware/withAuth')

module.exports = (HardcoreModel, OrderModel, UserModel, OrderDetailModel) => {

    const saveOrder = async (req, res) => {
        try {
            //Etape 1: Vérification des données du panier
            if (!req.body.basket) {
                //Si le panier est vide ou absent, renvoyer une erreur avec un statut 400
                return res.status(400).json({ status: 400, msg: "Le panier est invalide ou manquant" })
            }
            //Initialisation du montant total de la commande à 0
            let totalAmount = 0;
            //Etape 2: Création d'une commande principale
            // Le `saveOneOrder` enregistre une commande vide avec un montant total initial à 0
            const orderInfos = await OrderModel.saveOneOrder(req.body.users_id, totalAmount);
            if (orderInfos.code) {
                //Si une erreur survient lors de l'enregistrement de la commande principale
                return res.status(500).json({ status: 500, msg: "Echec de l'enregistrement de la commande!" });
            }
            //Recupération de l'identifiant de la commande nouvellement créée
            const id = orderInfos.insertId;
            
            //Etape 3: Parcours des produits dans le panier (boucle sur `req.body.basket`)
            for (const b of req.body.basket) {
                //Récupération des informations du produit en base de données
                const hardcore = await HardcoreModel.getOneHardcore(b.id);
                if (hardcore.code) {
                    //Si une erreur survient lors de la récupération des informations du produit
                    throw new Error("Echec de récupération des informations du produit");
                }
                //Extraction des informations importantes du produit
                const idHardcore = hardcore[0].id; //Identifiant du produit
                const unit_price = parseFloat(hardcore[0].price);//Prix unitaire du produit
                const quantity = b.quantityInCart; //Quantité demandée par l'utilisateur
                
                //Vérification du stock disponible
                if(hardcore[0].quantity < quantity) {
                    //Si le stock est insuffisant, une erreur est levée
                    throw new Error(`Stock insuffisant pour le produit ${idHardcore}`)
                }
                
                //Etape 4: Enregistrement des détails de la commande
                //On enregistre les informations de chaque produit dans la table des détails de commande
                const detail = await OrderDetailModel.saveOneOrderDetail(id, idHardcore, unit_price, quantity);
                if (detail.code) {
                    //Si une erreur survient lors de l'enregistrement des détails
                    throw new Error("Echec de l'enregistrement du détail de la commande");
                }
                
                //Etape 5: Mise à jour du stock du produit
                //Calcul du nouveau stock disponible après la commande
                const newQuantity = hardcore[0].quantity - quantity;
                const updateResult = await HardcoreModel.updateHardcoreQuantity(idHardcore, newQuantity);
                if (updateResult.code) {
                    //Si une erreur survient lors de la mise à jour du stock
                throw new Error(`Echec de la mise à jour du stock pour le produit ${idHardcore}`);
                }
                //Mise à jour du montant total de la commande
                //Ajout du montant correspondant à ce produit au montant total
                totalAmount += quantity * unit_price;
            }
            //Etape 6: Mise a jour du montant total de la commande
            const update = await OrderModel.updateTotalAmount(id, totalAmount);
            if (update.code) {
                //Si une erreur survient lors de la mise à jour du montant total
                throw new Error("Echec de la mise à jour du montant total");
            }
            //Réponse en cas de succès
            res.json({ status: 200, orderId: id });
        } catch (err) {
            //Gestion des erreurs globales
            console.error("Erreur dans saveOrder:", err);
            res.status(500).json({ status: 500, msg: "Echec de l'enregistrement de la commande: " + err.message });
        }
    };

    const executePayment = async (req, res) => {
        try {
            //Etape 1: Récupération des informations de la commande
            const order = await OrderModel.getOneOrder(req.body.orderId) // Cherche la commande via son Id
            if(order.code || !order[0] || !order[0].total_amount){
                //Si une erreur survient ou que la commande est invalide (absente ou montant nul)
                console.log("order", req.body)
                res.json({satus: 500, msg: "Le paiement ne peut pas être vérifié!"}) 
            } else{
                //Etape 2: Préparation des données pour Stripe
                console.log(order[0].totalAmount * 100) //Affichage du montant en centimes pour Stripe (débogage)
                //Creation d'un PaymentIntent via l'API Stripe
                const paymentIntent = await stripe.paymentIntents.create({amount: order[0].total_amount * 100, 
                    amount: Math.round(order[0].total_amount * 100), //Montant total en centimes (Stripe utilise cette unité)
                    currency: 'eur', //Devise de paiement (EUR)
                    metadata: {integration_check: 'accept_a_payment'}, // Métadonnées pour le suivi du paiement
                    receipt_email: req.body.email // Email de l'utilisateur pour recevoir un reçu
                })
                //Etape 3: Réponse avec le secret client
                console.log("impayer",paymentIntent)
                res.json({status: 200, client_secret:paymentIntent['client_secret']})
            }
        } catch(err){
            //Gestion des erreurs globales
            console.log(err)
            res.json({status: 500, msg: "Le paiement ne peut pas être vérifié!1"})
        }
    }

    
    const updatePaymentStatus = async (req, res) => {
        try {
            //Etape 1: Mise a jour du statut dans la bdd
            const validate = await OrderModel.updateStatus(req.body.orderId, req.body.status)
            // Appel au modèle pour mettre à jour le statut de la commande
            // `req.body.orderId` : identifiant de la commande
            // `req.body.status` : nouveau statut à appliquer
            if(validate.code){
                //Si une erreur est retournée par la bdd
                res.json({status: 500, msg: "Le status du paiement de la commande ne peut pas être modifié!" })
            } else {
                //Si la mise a jour est réussie
                res.json({status: 200, msg: "Status mis à jour!"})
            }
        } catch(err) {
            //Gestion des erreurs globales
            res.json({status: 500, msg: "Le status de paiement de la commande ne peut pas être modifié!"})
            
        }
    }

    
    const getAllOrder = async (req, res) => {
        try {
            //Etape 1: Récuperer toutes les commandes via le model `OrderModel`
            const orders = await OrderModel.getAllOrders() 
            // `OrderModel.getAllOrders()` est une méthode qui interroge la base de données 
            // pour retourner toutes les commandes.
            if(orders.code){
                //Si le resultat retourne un champ 'code', cela signifie qu'il y a eu une erreur
                res.json({status: 500, msg: "Oups, une erreur est survenue!"}) 
            } else {
                //Si il y a aucun erreur, renvoyer la liste des commandes au client
                res.json({status: 200, result: orders})
            } 
        } catch(err) { 
            //Gestion des erreurs globales en cas d'exception imprévue
            res.json({status: 500, msg: "Oups, une erreur est survenue!"})
        }
    }

    const getOneOrder = async (req, res) => {
        try {
            //Etape 1: Récuperer la commande par son ID (via 'req.params.id')
             const order = await OrderModel.getOneOrder(req.params.id) 
                if(order.code){ 
                    //Si la récupération échoue (champ 'code'), renvoyer une erreur
                 res.json({status: 500, msg: "Oups, une erreur est survenue1"}) 
                 } else {
                    //Etape 2: Récuperer les informations de l'utilisateur associé à la commande
                    const user = await UserModel.getOneUser(order[0].users_id) 
                    if(user.code){ 
                        //Si la récupération échoue (champ `code`), renvoyer une erreur
                    res.json({status: 500, msg: "Oups, Une erreur est survenue2"}) 
                     } else { 
                        //Créer un objet contenant les informations utilisateur
                         const myUser = {
                        firstname: user[0].firstname,
                        lastname: user[0].lastname,
                        address: user[0].address,
                        zip: user[0].zip,
                        city: user[0].city,
                        phone: user[0].phone
                        }
                        //Étape 3 : Récupérer les détails de la commande (produits, quantités, etc.)
                const details = await OrderModel.getAllDetails(req.params.id)
                if(details.code){
                    //Si la récupération échoue (champ '' code), renvoyer une erreur
                    res.json({status: 500, msg: "Oups, une erreur est survenue!3"})
                } else {
                    //Renvoyer une réponse avec les informations complètes de la commande
                    res.json({status: 200, order: order[0], // Informations principales de la commande
                        user: myUser, //Informations utilisateur associées
                        orderDetail:details})//Détails spécifiques de la commande
                }
                }
                
            }
            console.log(err)
        }catch(err){
            //Gestion des erreurs globales
            res.json({status: 500, msg: "Oups, une erreur est survenue!4"})
        }

    }

    return {
        saveOrder,
        executePayment,
        updatePaymentStatus,
        getAllOrder,
        getOneOrder
    }
}

