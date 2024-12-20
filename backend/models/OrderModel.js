module.exports = (_db)=>{
    db = _db
    return OrderModel
}

class OrderModel{
    //Mission: Sauvegarder une commande dans un jeu vidéo
    //Tu es un chevalier-codeur en quête d'accomplir une mission importante: sauvegarder une commande dans le royaume de la bdd. Voici comment la quete se déroule dans ton jeu 
    static saveOneOrder(userId, totalAmount){ 
        //Etape 1: Préparation de la quête
            //La quête commence quand le chevalier (le code) reçoit les outils nécessaires
            //userId: l'arme principale du chevalier, l'identifiant de l'utilisateur (le joueur pour qui tu passes la commande)
            //totalAmount: la ressource qu'il transporte (le montant total de la commande)
        //Avant de partir en quête, le chevalier vérifie s'il possède son arme principale
        if(!userId){
            console.log(userId)
            return Promise.reject(new Error(`L'ID utilisateur ne peut pas être nul`))
            //Si le chevalier n'a pas d'arme (userId est vide ou null), il abandonne immédiatement la mission
            //Erreur: l'ID utilisateur ne peut pas être nul
            //C'est comme être renvoyé à la taverne parce qu'on a oublié son épée
        }
        //Etape 2: En route vers la base de données
            //Si tout est pret, le chevalier s'engage sur le chemin de la bdd avec la commande suivante
        return db.query(`INSERT INTO orders(users_id, total_amount, created_at, status) VALUES (?,?,Now(),"not payed")`, [userId, totalAmount])
            //users_id: représente le joueur pour qui la commande est passée
            //total_amount: c'est le montant total de la commande (les ressource collectées)
            //created_at: la date à laquelle la quête est initiée
            //status: l'état de la commande, ici "not payed" (comme une quête en cours)
        //C'est comme livrer des ressources à une forteresse et inscrire les détails dans le journal des commandes (la table orders)
        //Etape 3: Récolter la récompense ou affronter un piège
            //Une fois arrivé, deux scénario sont possible
        //1 Succès de la quete
            //Si tout se passe bien, le chevalier reçoit une récompense (le résultat de la requete)
        .then((res)=>{ 
            console.log(res)
            return res
            //Le résultat est enregistré dans un coffre (variable res) et partagé avec tout le royaume (console.log et return)
        }) 
        //2 Echec de la quête
            //Si un piège est rencontré (par exemple, une erreur dans la requête), la chevalier tombe dans un guet-apens (catch)
        .catch((err) =>{
            console.log(err)
            return err
            //Le chevalier capture l'erreur (comme un parchemin expliquant le piége) et la rapporte au roi pour analyser ce qui s'est mal passé
        })
    }

   

    //Ce code est comme une mission de mise à jour dans un jeu vidéo, Il faut imaginé que tu es un forgeron et que tu dois ameliorer une arme existante (la commande) en ajustant ses caractéristique (le montant total)
    //Etape de la mission
    //1 Choisir l'objet à améliorer (l'ID de la commande)
    //Pour commencer la mission, on doit d'abord selectionner une commande spécifique (orderId). C'est comme choisir une arme ou un équipement dans ton inventaire
    static updateTotalAmount(orderId, totalAmount){
        //2 Améliorer la caractéristique de l'objet (mettre à jour le montant total)
        //Tu appliques une mise à jour a cette commande
            //total_amount représente une caractéristique importante, comme puissance de l'arme
            //La mise a jour est effectuée dans la bdd avec la requte SQL
        return db.query(`UPDATE orders SET total_amount= ? WHERE id = ?`, [totalAmount, orderId])
        /* UPDATE: améliore l'objet existant
        total_amount = ?: le nouveau montant (comme un nouvel enchantement pour l'arme)
        WHERE id = ?: on s'assure d'appliquer l'amélioration uniquement à l'objet ciblé (la commande spécifique)
        */
       
        //3 Obtenir les résultats de l'amélioration
        //Une fois la requte exécutée, deux fins possibles s'offrent à toi
        //Succès de la mise a jour
        .then((res)=>{ //Le systeme te renvoie un resultat (res), confirmant que l'amélioration a été appliquées 
            return res //Le code retourne ce résultat pour que le joueur (le développeur) puisse l'utiliser
        })
        //Echec de la mise a jour
        .catch((err)=>{ //Si quelque chose se passe mal (comme des ressources manquantes ou une erreur SQL)
            return err //Le systeme capture l'erreur (catch) et la retourne, c'est comme échouer l'enchantement d'une arme dans un jeu
        })
    }

    //Ce code ressemble a une quete d'investigation dans un jeu video ou tu dois retrouver un objet ou une information spécifique en utilisant son identifiant (ID).
    //L'objectif est d'accéder a la commande demandée pour l'examiner ou la manipuler
        //Etapes de la mission
        //1 Recevoir une quete pour trouver un objet spécifique (l'ID de la commande)
    static getOneOrder(id){
        /* Tu commences la quete avec un objectif clair: retrouver une commande dans la bdd en utilisant son identifiant (id) 
            L'ID est comme une carte ou une clé qui te permet de localiser exactement ce que tu cherches
        */
       //2 Lancer la recherhce dans l'univers du jeu (base de donnée)
                        //Le code que utilise la requete SQL
        return db.query('SELECT * FROM `orders` WHERE id = ?', [id])
        //SELECT *: demande toutes les informations sur l'objet recherché (comme un scan complet d'un coffre ou d'un ennemi)
        //WHERE id = ?: cible précisement la commande correspondant a l'ID fourni, comme scanner une seule pièce dans un donjon
        //3 Obtenir les resultats de la quete
        //il y a 2 fin possible
            //Succes de la recherche
            //Si la commande est trouvée, le résultat (res) contient toutes les informations sur la commande (comme des stats détaillées d'un objet rare)
        .then((res)=>{ 
            return res //Ces informations sont retournées pour que tu puisses les utiliser ou afficher les détails au joueur
        })
        //Echec de la recherhce
        .catch((err)=>{ //Si l'objet n'existe pas ou s'il y a une erreur (probleme dans la requete ou la bdd), l'erreur est capturé par (catch) et retournée
            return err //C'est comme échouer à trouver un coffre parce qu'il est vide ou qu'il y a un piège
        })
    }

    //Ce code représente une mission d'administration dans un jeu video ou on doit modifier l'état d'un objet ou d'un personnage (passer un personnage d'un etat en repos à en combat).
    //Ici notre objectif est de mettre à jour le statut d'une commande
    //Etapes de la mission
    //1 Recevoir une quête pour changer le statut d'un objet (la commande)
    /*Tu es chargé de modiefier l'etat d'une commande identifiée par son ID (orderId)
    Le statut peut être vu comme un mode ou une phase d'un personnage ou un objet dans le jeu ("bot payed -> "payed", en préparation -> livré)
    */
    static updateStatus(orderId, status){
        //2 Envoyer une requête au système central (la bdd)
        //Le code utilise une requete SQL pour accomplir cette mission
        return db.query(`UPDATE orders SET status= ? WHERE id`, [status, orderId])
        /* UPDATE orders : l'ordre donné au système pour modifier un objet existant
           SET status = ? : indique le nouveau statut que tu veux appliquer
           WHERE id = ? : précise l'objet exact (commande) que tu veux modifier
        */
        // 3 Recevoir le résultat de la mission
        //Succès de la mise à jour
        .then((res)=>{ //Si la modification est effectuée avec succès, tu reçois une confirmation (res) qui indique que l'état de l'objet de l'objet a bien été changé
            return res //Le code retourne cette confirmation pour que tu puisse en faire usage (afficher un message au joueur)
        })
        //Echec de la mise à jour
        .catch((err)=>{ //Si quelque chose ne va pas (mauvaise requete, objet introuvable, probleme de serveur), une erreur est capturé dans le catch
            return err//C'est comme échouer à passer un personnage à un autre mode à cause d'une condition non remplie ou d'un bug
        })
    }

    //Ce code ressemble à une quête d'exploration globale dans un jeu video ou tu dois collecter toutes les informations sur un certain type d'objets ou de personnage
    //Ici, l'objectif est de récupérer toutes les commandes stockées dans la bdd, comme explorer une carte complète ou réveler tous les trésors d'une zone
    //Etape de la mission
        //1 Lancer une quete d'exploration
        //Le but est de parcourir toute la table des commandes (orders) pour obtenir une vue d'ensemble
        //Il n'y a pas de filtre ou de condition spécifique, donc tous les objets (les commandes) sont inclus dans la recherche
    static getAllOrders(){
        //2 Envoyer une requte au systeme central (la base de données)
        //Le code exécute une requte SQL
        return db.query(`SELECT * FROM orders`)
        /*SELECT *: demande toutes les colonnes de la tables, c'est comme scanner tous les aspects des objets trouvés
        FROM orders : cible la table orders, ou toutes les commandes sont stockées
        */
       //3 Collecter les résultats
       //Succes de la quete
        .then((res) => {//Si toutes les commandes sont récupérées correctement, elles sont renvoyées sous forme de tableau (res)
            return res //c'est comme obtenir une liste complete des trésors découvert dans une zone ou une carte avec les points d'interet
        })
        //Echec de la quete
        .catch((err)=>{ //Si un probleme survient(erreur SQL), une erreur est capturée dans le catch
            return err //c'est comme tomber dans un piege en explorant une zone et devoir analyser ce qui a mal tourné
        })
    }

}