const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const withAuth = require('../middleware/withAuth')

module.exports = (HardcoreModel, OrderModel, UserModel, OrderDetailModel) => {

    //Une fonction qui enregistre une nouvelle commande
    const saveOrder = async (req, res) => {
        try {
            //on verifie si le panier est present
            if (!req.body.basket) {
                return res.status(400).json({ status: 400, msg: "Le panier est invalide ou manquant" })
            }
            let totalAmount = 0; 
            //On appelle la methode pour une enregistre une nouvelle commande
            const orderInfos = await OrderModel.saveOneOrder(req.body.users_id, totalAmount);
            if (orderInfos.code) {
                return res.status(500).json({ status: 500, msg: "Echec de l'enregistrement de la commande!" });
            }
            const id = orderInfos.insertId; //on recupere id de la commande
            //on boucle a travers de chaque produit dans le panier pour enregistrer
            for (const b of req.body.basket) {
                const hardcore = await HardcoreModel.getOneHardcore(b.id);
                if (hardcore.code) {
                    throw new Error("Echec de récupération des informations du produit");
                }
                const idHardcore = hardcore[0].id; //recupere l'id du produit
                const unit_price = parseFloat(hardcore[0].price); // Prix unitaire du produit
                const quantity = b.quantityInCart;// quantité du produit dans le panier
                
                //on verifie si le stock est suffisant
                if(hardcore[0].quantity < quantity) {
                    throw new Error(`Stock insuffisant pour le produit ${idHardcore}`)
                }
                //On appelle la methode pour enregistrer le detail de commande
                const detail = await OrderDetailModel.saveOneOrderDetail(id, idHardcore, unit_price, quantity);
                if (detail.code) {
                    throw new Error("Echec de l'enregistrement du détail de la commande");
                }
                //on met a jour le stock
                const newQuantity = hardcore[0].quantity - quantity;
                const updateResult = await HardcoreModel.updateHardcoreQuantity(idHardcore, newQuantity);
                if (updateResult.code) {
                throw new Error(`Echec de la mise à jour du stock pour le produit ${idHardcore}`);
                }
                totalAmount += quantity * unit_price;
            }
            //on appelle la methode pour mettre a jour le montant total
            const update = await OrderModel.updateTotalAmount(id, totalAmount);
            if (update.code) {
                throw new Error("Echec de la mise à jour du montant total");
            }
            res.json({ status: 200, orderId: id });
        } catch (err) {
            console.error("Erreur dans saveOrder:", err);
            res.status(500).json({ status: 500, msg: "Echec de l'enregistrement de la commande: " + err.message });
        }
    };

    //La fonction pour recuperer toutes les commandes d'un utilisateur
    const getUserOrders = async (req, res) => {
        try {
            const userId = req.id //l'id de l'utilisateur récupéré depuis l'authentification
            //On recupere les commande de l'utilisateur
            const orders = await OrderModel.getUserOrders(userId) 
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
            //On recupere les information de la commande a partir de l'id
            const order = await OrderModel.getOneOrder(req.body.orderId)
            if(order.code || !order[0] || !order[0].total_amount){
                console.log("order", req.body)
                res.json({satus: 500, msg: "Le paiement ne peut pas être vérifié!"}) 
            } else{
                console.log(order[0].totalAmount * 100)
                //Creer un "paymentIntent" pour le paiement avec stripe
                const paymentIntent = await stripe.paymentIntents.create({amount: order[0].total_amount * 100, 
                    amount: Math.round(order[0].total_amount * 100),//paiement en centime
                    currency: 'eur',
                    metadata: {integration_check: 'accept_a_payment'},
                    receipt_email: req.body.email 
                })
                console.log("impayer",paymentIntent)
                res.json({status: 200, client_secret:paymentIntent['client_secret']})
            }
        } catch(err){
            console.log(err)
            res.json({status: 500, msg: "Le paiement ne peut pas être vérifié!1"})
        }
    }

    //Fonction pour mettre a jour le statut du paiement
    const updatePaymentStatus = async (req, res) => {
        try {
            //On met a jour le statut de la commande en fonction du paiement
            const validate = await OrderModel.updateStatus(req.body.orderId, req.body.status)
            if(validate.code){
                res.json({status: 500, msg: "Le status du paiement de la commande ne peut pas être modifié!" })
            } else {
                res.json({status: 200, msg: "Status mis à jour!"})
            }
        } catch(err) {
            res.json({status: 500, msg: "Le status de paiement de la commande ne peut pas être modifié!"})
        }
    }

    //Fonction pour recuperer toute les commandes
    const getAllOrder = async (req, res) => {
        try {
            //Une methode que recupere toute les commandes
            const orders = await OrderModel.getAllOrders() 
            if(orders.code){ 
                res.json({status: 500, msg: "Oups, une erreur est survenue"})
            } else {
                res.json({status: 200, result: orders})
            } 
        } catch(err) { 
            res.json({status: 500, msg: "Oups, une erreur est survenue"})
        }
    }

   
    const getOneOrder = async (req, res) => {
        try {
            //La methode getOneOrder permet de recuperer les infos de la commande par son id
             const order = await OrderModel.getOneOrder(req.params.id) 
                if(order.code){ 
                 res.json({status: 500, msg: "Oups, une erreur est survenue1"})
                 } else {
                    //La methode recuperer les information de l'utilisateur a la commande
                    const user = await UserModel.getOneUser(order[0].users_id) 
                    if(user.code){ 
                    res.json({status: 500, msg: "Oups, Une erreur est survenue2"}) 
                     } else { //On recupere les detail de la commande
                         const myUser = {
                        firstname: user[0].firstname,
                        lastname: user[0].lastname,
                        address: user[0].address,
                        zip: user[0].zip,
                        city: user[0].city,
                        phone: user[0].phone
                        }
                const details = await OrderModel.getAllDetails(req.params.id)
                if(details.code){
                    res.json({status: 500, msg: "Oups, une erreur est survenue!3"})
                } else {
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