const stripe = require('stripe')('sk_test_51PwPk4P8IUFD1Oi7oaghtzvNLuLsqHqSf3LITl819E5oM2519a3Pqx8OPmlN2C9P5isgJp8Sjyies4gib732xvOD00faqsPnaL')
const withAuth = require('../middleware/withAuth')

module.exports = (HardcoreModel, OrderModel, UserModel, OrderDetailModel) => {
    
    //Mission : Création et validation de la commande dans l'univers Hardcore
    //Dans ce scénario, le joueur doit gérer un système de commande complexe dans un univers marchand. 
    //L’objectif est de créer une commande, vérifier les produits du panier, ajuster les stocks et finaliser le paiement. 
    //Chaque étape est une quête à part entière.

    const saveOrder = async (req, res) => {
        try {
            if (!req.body.basket) {//1. Le joueur (représenté par la requête req) commence par présenter son panier (req.body.basket) à l’univers.
            //2.Condition initiale
            //Si le panier est absent ou invalide, le marchand refuse de commencer la mission et affiche
                return res.status(400).json({ status: 400, msg: "Le panier est invalide ou manquant" })
            }
    
            let totalAmount = 0;
            //Phase 1 : Création de la commande
            //Le marchand démarre une nouvelle commande en appelant 
            const orderInfos = await OrderModel.saveOneOrder(req.body.users_id, totalAmount);
            //Validation
            if (orderInfos.code) {//Si la création échoue
                //la mission s’arrête immédiatement avec un message d’échec
                return res.status(500).json({ status: 500, msg: "Echec de l'enregistrement de la commande!" });
            }
            //Phase 2: Explorationdu panier
            //Chaque produit du panier est exploré dans une boucle de quête. Le joueur vérifie et traite chaque article un par un.
            const id = orderInfos.insertId;
    
            for (const b of req.body.basket) {
                //Étape 1 : Validation des produits
                //Le joueur demande au marchand les détails du produit
                const hardcore = await HardcoreModel.getOneHardcore(b.id);
                if (hardcore.code) {
                    //Échec potentiel
                    //Si le produit est introuvable, la mission est interrompue
                    throw new Error("Echec de récupération des informations du produit");
                }
                
                //Ces trois lignes de code jouent un role crucial dans la mission de gestion de la commande
                const idHardcore = hardcore[0].id;//On imagine que chaque produit dans la boutique est une carte avec un identifiant unique (idHardcore)
                //Lorsque tu récupère les informations d'un produit (hardcore[0], on extrait cette clé unique pour l'utiliser dans d'autres étapes de la mission)
                //Le but: Identifier précisément le produit que le joueur veut acheter. Cela permet de savoir de quel article il s'agit dans le registre de la boutique
                
                const unit_price = parseFloat(hardcore[0].price);//Chaque produit a un prix(exemple: 12.50).Cette ligne recupere le prix de l'article
                //et le transforme en un nombre décimal utilisable pour les calculs (grace à parseFloat)
                //Le but: Associer un cout unitaire au produit, ce qui sera nécessaire pour calculer le montant total de la commande
                
                const quantity = b.quantityInCart;//Le joueur a précisé combien d'exemplaires de cet article il souhaite acheter (quantityInCart).
                //Cette ligne extrait cette information au panier
                //Le but: Savoir combien d'unités de cet article il faut valider, vérifier en stock, et facturer
                
                //Étape 2 : Vérification du stock
                //Le joueur vérifie si le stock est suffisant pour la quantité demandée 
                if(hardcore[0].quantity < quantity) {
                    throw new Error(`Stock insuffisant pour le produit ${idHardcore}`)
                }
                
                //Étape 3 : Enregistrement des détails de la commande
                //Le joueur valide les informations du produit et enregistre le détail dans la base
                const detail = await OrderDetailModel.saveOneOrderDetail(id, idHardcore, unit_price, quantity);
                if (detail.code) {
                    //Échec potentiel
                    //Si l’enregistrement échoue, la mission échoue avec un message d’erreur
                    throw new Error("Echec de l'enregistrement du détail de la commande");
                }
                
                //Phase 3 : Mise à jour des stocks
                //Une fois le détail validé, le stock du produit est ajusté
                const newQuantity = hardcore[0].quantity - quantity;
                const updateResult = await HardcoreModel.updateHardcoreQuantity(idHardcore, newQuantity);
                if (updateResult.code) {//Échec potentiel
                //Si la mise à jour échoue, un message alerte le joueur
                throw new Error(`Echec de la mise à jour du stock pour le produit ${idHardcore}`);
                }
                //Phase 4 : Calcul et validation du montant total
                //À la fin de la boucle, 
                //le joueur calcule le montant total de la commande en multipliant 
                //la quantité de chaque produit par son prix unitaire
                totalAmount += quantity * unit_price;
            }
            //Une fois tous les produits traités, le montant total est mis à jour dans la commande
            const update = await OrderModel.updateTotalAmount(id, totalAmount);
            if (update.code) {//Échec potentiel
            //Si la mise à jour du montant échoue, la mission s’interrompt
                throw new Error("Echec de la mise à jour du montant total");
            }
            //Phase 5 : Fin de la mission
            //Si toutes les étapes sont réussies 
            //le jeu envoie un message de succès avec l’identifiant de la commande
            res.json({ status: 200, orderId: id });
            //Phase 6 : Gestion des imprévus
        } catch (err) {//Si une erreur survient à n’importe quelle étape, un système d’alerte est déclenché
            console.error("Erreur dans saveOrder:", err);
            //Le jeu informe le joueur de l’erreur et lui permet de réessayer
            res.status(500).json({ status: 500, msg: "Echec de l'enregistrement de la commande: " + err.message });
        }
    };

   //Mission : Validation et exécution du paiement
    //Dans ce jeu vidéo, la quête consiste à vérifier une commande et à lancer un paiement sécurisé pour qu’un héros puisse finaliser son achat. 
    //Cette mission implique la collaboration avec un banquier magique (Stripe) et des étapes cruciales pour s’assurer que tout se passe bien.
    const executePayment = async (req, res) => {
        try {
            //Phase 1 : Préparation de la quête
            //Le héros apporte son ID de commande (req.body.orderId) et son email dans sa requête.
            //Avant de se lancer dans le paiement, il demande à un PNJ Archiviste 
            //(le modèle OrderModel) de vérifier si la commande est valide et s’il y a un montant total associé
            const order = await OrderModel.getOneOrder(req.body.orderId)
            if(order.code || !order[0] || !order[0].total_amount){//Si l’archiviste ne trouve pas la commande ou que des informations sont manquantes (par exemple, pas de montant total),
            //la mission est interrompue et un message d’échec est envoyé :
                console.log("order", req.body)
                res.json({satus: 500, msg: "Le paiement ne peut pas être vérifié!"})//Sinon, la quête peut continuer. 
                //Le montant total de la commande est récupéré, et le jeu se prépare pour le paiement
            } else{
                console.log(order[0].totalAmount * 100)
                //Phase 2 : Envoi au banquier magique (Stripe)
                //Le héros demande l’aide d’un banquier magique nommé Stripe pour gérer le paiement. 
                //Cela se fait grâce à un sort spécial appelé paymentIntents.create
                const paymentIntent = await stripe.paymentIntents.create({amount: order[0].total_amount * 100, 
                    amount: Math.round(order[0].total_amount * 100),// Le montant est multiplié par 100 car Stripe utilise des centimes.
                    currency: 'eur',// La devise est spécifiée (ici, euros).
                    metadata: {integration_check: 'accept_a_payment'},// Quelques informations utiles pour le suivi de l’opération
                    receipt_email: req.body.email // L’email du joueur pour qu’il reçoive une confirmation de paiement.
                })
                console.log("impayer",paymentIntent)
                //Phase 3 : Réception de la clé magique
                //Si le banquier Stripe accepte la demande, il renvoie une clé secrète magique appelée client_secret
                //Cette clé permettra au héros de finaliser son paiement sur l’interface utilisateur :
                res.json({status: 200, client_secret:paymentIntent['client_secret']})
                //Le joueur reçoit ce client_secret pour continuer l’aventure sur le front-end et procéder au paiement
            }
            //Phase 4 : Gestion des imprévus
            //Comme dans toute quête, il peut y avoir des obstacles inattendus
        } catch(err){
            //L’erreur est également enregistrée dans le journal du jeu pour que les développeurs puissent l’analyser
            console.log(err)
            //Si une erreur survient dans le processus (par exemple, 
            //une panne du serveur ou un problème de communication avec Stripe), le jeu interrompt la mission
            res.json({status: 500, msg: "Le paiement ne peut pas être vérifié!1"})
        }
    }

    //Mission : Mettre à jour le statut du paiement
    //Dans ce scénario, la quête est simple mais cruciale : changer le statut d’un paiement pour une commande.
    //Imagine que c’est comme une tâche administrative dans le château du royaume
    //où le joueur doit informer le système central que le paiement d’une commande a été validé ou annulé.
    const updatePaymentStatus = async (req, res) => {
        //Phase 1 : Validation de la requête
        //Le joueur (front-end) envoie une requête avec :
        //L’identifiant de la commande (req.body.orderId) : pour indiquer de quelle commande il s’agit.
        //Le nouveau statut (req.body.status) : par exemple, "payé" ou "annulé"
        //Le jeu (le back-end) transmet ces informations à un scribe officiel du royaume (le modèle OrderModel),
        //qui a la tâche d’enregistrer cette mise à jour dans les archives (la base de données)
        try {
            //Phase 2 : Mise à jour dans la base de données
            //Le scribe utilise la fonction updateStatus pour effectuer la mise à jour dans les archives :
            const validate = await OrderModel.updateStatus(req.body.orderId, req.body.status)
            if(validate.code){//Échec (Erreur dans validate.code)
            //Si quelque chose ne va pas (par exemple, un problème dans la base de données) 
            //le jeu informe le joueur que la mise à jour n’a pas pu être effectuée :
                res.json({status: 500, msg: "Le status du paiement de la commande ne peut pas être modifié!" })
            } else {
                //Succès
                //Si le scribe confirme que la mise à jour a été effectuée sans problème, il renvoie un message de réussite :
                res.json({status: 200, msg: "Status mis à jour!"})//C’est comme si le scribe disait au joueur :
                //"Mission accomplie, le statut est mis à jour dans le registre."
            }
            //Phase 3 : Gestion des imprévus
            //Dans les quêtes, il peut toujours y avoir des problèmes inattendus, 
            //comme une panne du système ou une erreur dans la communication avec le scribe.
        } catch(err) {//Le bloc catch est là pour attraper ces erreurs 
            res.json({status: 500, msg: "Le status de paiement de la commande ne peut pas être modifié!"})
            //C'est comme si le joueur recevait un message d'alerte : "Un problème est survenu dans le système, la mise à jour n'a pas pu être faite."
        }
    }

    //Dans ce code, on peut comparer la fonctionnalité de récupération des commandes à une quete dans un jeu video ou le joueur doit collecter une liste de mission
    //ou d'objets disponibles dans un monde du jeu
    //Etape de la quete: Recupérer toutes les commandes
    const getAllOrder = async (req, res) => {
        try {//1 La mission est Lancée
            //Action dans le jeu: Tu as reçu une mission qui consiste à interroger un PNJ pour obtenir une liste de toutes les quêtes disponibles dans une région
            //ici le jeu interroge sa bdd qui est representer par OrderModel, pour récuperer le liste complete des commandes (quete)
            const orders = await OrderModel.getAllOrders() 
            //2 Verification des resultats
            //Une fois que le PNJ a parlé, le jeu vérifie si son discours contient des informations utiles ou s'il y a eu un probleme
            if(orders.code){ //if (orders.code)
                //Si une erreur est survenue pendant la récupération des données , le jeu envoie un message d'erreur au joueur
                res.json({status: 500, msg: "Oups, une erreur est survenue!"}) //le statut http renvoie une statut 500
            } else {//3 Mission reussi: Liste des commandes
                //Si tout se passe bien et que le PNJ te transmet la liste des quêtes, tu reçois toutes les informations nécessaires pour continuer
                res.json({status: 200, result: orders})//Le joueur peut alors les afficher ou interagir avec elles
                //Les données récupéres (les commandes dans ce cas) sont renvoyées sous forme de liste dans un objet JSON avec un statut 200 (succès)
            } 
            //Gestion des imprevus
            //Si une erreur inattendue survient pendant la mission par exemple (le PNJ refuse de répondre ou disparait)
        } catch(err) { 
            //Tout problème non prévu déclenche ce bloc, qui envoie un message d'erreur au joueur
            res.json({status: 500, msg: "Oups, une erreur est survenue!"})
        }
    }

    /*Ce code peut etre comparé a une quete complexe dans un jeu video, ou le joueur doit non seulemnt récuperer une mission principal (commande)
    mais aussi explorer les détails de cette mission et découvrir des informations complémentaires sur le PNJ (utilisateur) et les objets nécessaires (détails de commande)
    */ 
    const getOneOrder = async (req, res) => {
        try {
             //1 Lancement de la Mission Recuperer une commande précise
             //Tu reçois une quête pour explorer une commande spécifique, mais pour cela, tu dois parler a un PNJ maître du commerce (bdd des commandes)
             const order = await OrderModel.getOneOrder(req.params.id) //Le jeu interroge la base pour récuperer les informations de la commande identifiée par req.params.id
                if(order.code){ //Si le PNJ maitre (bdd) échoue a fournir les informations, une erreur est envoyer
                 res.json({status: 500, msg: "Oups, une erreur est survenue1"}) //statut 500
                 } else {
                    //2 Etape suivante Trouver le PNJ lié a la quete
                    //Une fois la commande récupérer, tu dois en savoir plus sur le PNJ qui initié cette commande.Tu consultes une autre bdd (PNJ des utilisateurs)
                    const user = await UserModel.getOneUser(order[0].users_id) //Le jeu utilise l'identifiant utilisateur (users_id) de la commande pour récupérer les informations détaillées du client
                    if(user.code){ //Si le PNJ des utilisateurs échoue, une erreur est renvoyée
                    res.json({status: 500, msg: "Oups, Une erreur est survenue2"}) //Status 500
                     } else { //Mission reussie: Les informations de l'utilisateur sont récupérées et organisées
                         const myUser = {
                        firstname: user[0].firstname,
                        lastname: user[0].lastname,
                        address: user[0].address,
                        zip: user[0].zip,
                        city: user[0].city,
                        phone: user[0].phone
                        }
                        //3 Etape Finale: Découvrir les Détails de la Mission
                        //Pour completer ta quete, tu dois explorer tous les objets ou actions liés à cette commande. Tu parles a un PNJ qui gere les détails (bdd de commande)
                const details = await OrderModel.getAllDetails(req.params.id)//La base de données est intérrogée pour obtenir tous les articles ou services associés a cette commande
                if(details.code){//Si ce PNJ échoue, une erreur est renvoyée
                    res.json({status: 500, msg: "Oups, une erreur est survenue!3"})
                } else {
                    //4 Victoire Rassembler toutes les informations
                    //Si tous les PNJ ont bien répondu, tu reçois un résumé de la quete avec
                    /*
                    La commande principale
                    Le PNJ utilisateur
                    Les objets liées a la commande
                    */
                    res.json({status: 200, order: order[0], user: myUser, orderDetail:details})
                }//Recompense Le joueur obtient toutes les informations dans un format structuré
                }
                
            }
            console.log(err)
            //5 Gestion des imprévus
            //Si un probleme inattendu survient à tout moment (PNJ qui disparait), le jeu renvoie une erreur générique
        }catch(err){
            res.json({status: 500, msg: "Oups, une erreur est survenue!4"})
        }

        /*
        En résumer
            Mission : Explorer une commande spécifique en interrogeant plusieurs PNJs.
Étapes :
       1 Récupérer la commande (quête principale).
       2 Découvrir les informations de l'utilisateur (le PNJ lié à la commande).
       3 Explorer les détails de la commande (les objets ou services liés).
       4 Succès : Le joueur obtient une réponse structurée avec toutes les informations nécessaires.
       5 Échec : Si l'un des PNJs échoue, un message d'erreur approprié est renvoyé.
       6 Retour : L'expérience est complète et organisée, comme une quête bien gérée dans un RPG complexe !
        */ 
    }

    return {
        saveOrder,
        executePayment,
        updatePaymentStatus,
        getAllOrder,
        getOneOrder
    }
}

