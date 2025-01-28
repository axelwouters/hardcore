const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const withAuth = require('../middleware/withAuth')

module.exports = (HardcoreModel, OrderModel, UserModel, OrderDetailModel) => {

    const saveOrder = async (req, res) => {
        try {
            //Etape 1: Validation des donnée d'entrée
            if (!req.body.basket) {
                //Verifie que le panier ('basket') est présent dans la requete
                return res.status(400).json({ status: 400, msg: "Le panier est invalide ou manquant" })
            }
            let totalAmount = 0;
            //Etape 2: Creation de la commande
            //On enregistre une commande avec un montant total initial de 
            const orderInfos = await OrderModel.saveOneOrder(req.body.users_id, totalAmount);
            if (orderInfos.code) {
                //Verifie si il y a une erreur
                return res.status(500).json({ status: 500, msg: "Echec de l'enregistrement de la commande!" });
            }
            //On recupere l'identifiant unique de la commande
            const id = orderInfos.insertId;
            
            //Etape 3: Traitement des produits dans le panier
            for (const b of req.body.basket) {
                //Recupère les informations du produit à partir de son identifiant
                const hardcore = await HardcoreModel.getOneHardcore(b.id);
                if (hardcore.code) {
                    //Si une erreur survient lors de la récupération des informations du produit
                    throw new Error("Echec de récupération des informations du produit");
                }
                //Récupère les informations nécessaires pour chaque produit
                const idHardcore = hardcore[0].id;
                const unit_price = parseFloat(hardcore[0].price);
                const quantity = b.quantityInCart;
                
                //Vérifie que le stock est suffisant pour la quantité demandé
                if(hardcore[0].quantity < quantity) {
                    throw new Error(`Stock insuffisant pour le produit ${idHardcore}`)
                }
                
                //Etape 4: Enregistrement des details de commande
                //Ajoute un details pour le produit dans la commande
                const detail = await OrderDetailModel.saveOneOrderDetail(id, idHardcore, unit_price, quantity);
                if (detail.code) {
                    //Verifie si il y a une erreur lors de l'enregistrement
                    throw new Error("Echec de l'enregistrement du détail de la commande");
                }
                //Etape 5: Mise a jour du stock
                //On calcule la nouvelle quantiter du stock apres la commande
                const newQuantity = hardcore[0].quantity - quantity;
               //Met a jour la quantité disponible dans la bdd
                const updateResult = await HardcoreModel.updateHardcoreQuantity(idHardcore, newQuantity);
                if (updateResult.code) {
                throw new Error(`Echec de la mise à jour du stock pour le produit ${idHardcore}`);
                }
                //Mise a jour du montant et ajout le cout total de ce produit
                totalAmount += quantity * unit_price;
            }
            //Mise a jour du montant total de la commande
            //Une fois tous les produit traités
            const update = await OrderModel.updateTotalAmount(id, totalAmount);
            if (update.code) {
                throw new Error("Echec de la mise à jour du montant total");
            }
            //reponse finale
            res.json({ status: 200, orderId: id });
        } catch (err) {
            //gestion globale des erreurs
            console.error("Erreur dans saveOrder:", err);
            res.status(500).json({ status: 500, msg: "Echec de l'enregistrement de la commande: " + err.message });
        }
    };

    const getUserOrders = async (req, res) => {
        try {
            const userId = req.id //récupère l'ID utilisateur connecter depuis le middleware withAuth
            const orders = await OrderModel.getUserOrders(userId) //filtre les commandes par utilisateur
            if (orders.code) {
                res.status(500).json({ status: 500, msg: "Erreur lors de la récupération des commandes" })
            } else {
                res.json({ status: 200, result: orders })
            }
        } catch (err) {
            console.error("Erreur dans getUserOrders:", err)
            res.status(500).json({ status: 500, msg: "Erreur interne" })
        }
    }
    

    const executePayment = async (req, res) => {
        try {
            //Etape 1 Recuperer les information de la commande
            const order = await OrderModel.getOneOrder(req.body.orderId)
            //verification de la commande valide
            if(order.code || !order[0] || !order[0].total_amount){
                //si la commande est invalide
                console.log("order", req.body)
                res.json({satus: 500, msg: "Le paiement ne peut pas être vérifié!"}) 
            } else{
                //Etape 2: Création d'un paymentIntent avec stripe
                //multiplie le montant total par 100
                console.log(order[0].totalAmount * 100)
                const paymentIntent = await stripe.paymentIntents.create({amount: order[0].total_amount * 100, 
                    amount: Math.round(order[0].total_amount * 100),
                    currency: 'eur',
                    metadata: {integration_check: 'accept_a_payment'},
                    receipt_email: req.body.email 
                })
                //Etape 3: Envoyer le client_seccret pour finaliser le paiement
                console.log("impayer",paymentIntent)
                res.json({status: 200, client_secret:paymentIntent['client_secret']})
            }
        } catch(err){
            //Gestion globale des erreurs
            console.log(err)
            res.json({status: 500, msg: "Le paiement ne peut pas être vérifié!1"})
        }
    }


    const updatePaymentStatus = async (req, res) => {

        try {
            //Etape 1: Appeler la methode pour mettre a jour le statut de la commande
            const validate = await OrderModel.updateStatus(req.body.orderId, req.body.status)
            //Etape 2: Verifier si la mise a jour a echoue
            if(validate.code){
                res.json({status: 500, msg: "Le status du paiement de la commande ne peut pas être modifié!" })
            } else {
                //Etape 3: Repond avec un message de succès
                res.json({status: 200, msg: "Status mis à jour!"})
            }
        } catch(err) {
            res.json({status: 500, msg: "Le status de paiement de la commande ne peut pas être modifié!"})
        }
    }

    const getAllOrder = async (req, res) => {
        try {
            //Etape 1: Appeler ma méthode pour récuperer toutes les commandes
            const orders = await OrderModel.getAllOrders()
            //Etape 2: Vérifier si une erreur est retourner lors de la récupération 
            if(orders.code){ 
                res.json({status: 500, msg: "Oups, une erreur est survenue"})
            } else {
                //Retourne les commandes
                res.json({status: 200, result: orders})
            } 
        } catch(err) { 
            res.json({status: 500, msg: "Oups, une erreur est survenue"})
        }
    }

   
    const getOneOrder = async (req, res) => {
        try {
            //Etape 1: Recuperer la commande spécifiqaue a partir de l'id
             const order = await OrderModel.getOneOrder(req.params.id) 
                if(order.code){ 
                    //On verifie l'erreur
                 res.json({status: 500, msg: "Oups, une erreur est survenue1"})
                 } else {
                    //Etape 2: Recuperer les infos de l'utilisateur associé a l'id
                    const user = await UserModel.getOneUser(order[0].users_id) 
                    if(user.code){ 
                    res.json({status: 500, msg: "Oups, Une erreur est survenue2"}) 
                     } else { 
                        //On construis un objet avec les informations de l'utilisateur
                         const myUser = {
                        firstname: user[0].firstname,
                        lastname: user[0].lastname,
                        address: user[0].address,
                        zip: user[0].zip,
                        city: user[0].city,
                        phone: user[0].phone
                        }
                        //Etape 3: Recuperer les detailes de la commande
                const details = await OrderModel.getAllDetails(req.params.id)
                if(details.code){
                    res.json({status: 500, msg: "Oups, une erreur est survenue!3"})
                } else {
                 //Etape 4: Envoyer une reponse contenant le commande, l'utilisateur et les détails
                    res.json({status: 200, order: order[0], user: myUser, orderDetail:details})
                }
                }
                
            }
            console.log(err)
        }catch(err){
            res.json({status: 500, msg: "Oups, une erreur est survenue!4"})
        }
    }

    return {
        saveOrder,
        executePayment,
        updatePaymentStatus,
        getAllOrder,
        getOneOrder,
        getUserOrders 
    }
}