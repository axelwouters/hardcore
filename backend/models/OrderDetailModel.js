module.exports = (_db)=>{
    db = _db
    console.log("ok")
    return OrderDetailModel
}

class OrderDetailModel{
     //Ce code peut etre comparé a une quête de gestion d'inventaire dans un jeu video, ou on doit ajouter des détails spécifique a une commande
     //comme si tu remplissais un coffre avec objets (ici, des détails d'articles liés a une commande)
     static saveOneOrderDetail(id, idHardcore, unit_price, quantity){
        //Etape de la mission
        //1 Rassembler les objets pour le coffre (les détails de l'article)
        //Pour remplir la commande, tu dois connaitre certains éléments essentiels
            /*order_id: l'identifiant de la commande principale à laquelle on ajoute les détails (le coffre que tu remplis) 
              idHardcore: l'identifiant de l'objet spécifique que tu places dans le coffre (par exemple, une arme ou une ressource)
              unit_price: le prix unitaire de cet objet, comme la valeur marchande d'un item
              quantity: la quantité d'objets que tu places dans le coffre (ex: 5 potions ou 3 épées)
            */
           //2 Envoyer la requete pour stocker les objets dans le coffre (détails dans la bdd)
           //Le code exécute une requete SQL
        return db.query(`INSERT INTO orderdetails(orders_id, hardcores_id, unit_price ,quantity) VALUES (?,?,?,?)`, [id, idHardcore, unit_price, quantity])
        //INSERT INTO: commande pour ajouter de nouvelles informations dans la table orderdetails
        //orders_id: relie ces détails à une commande spécifique (indique dans quel coffre tu mets les objets)
        //hardcores_id: identifie précisément chaque objet que tu ajoutes
        //unti_price et quantity: les caractéristiques des objets ajoutés (prix et quantité)
        //3 Résultat de la mission
            //Succès
        .then((res) => {//Si les objets sont correctement ajoutés, la base de données renvoie un resultat (res) qui confirme que les détails de la commande ont bien été enregistrés
            //C'est comme recevoir une notification que le coffre a été rempli avec succès
            return res
        })
        //Echec
        .catch((err) => { //Si un probleme survient (comme une erreur SQL ou des données manquantes), l'erreur est capturé dans catch et renvoyée
            return err//C'est comme échouer à ajouter un objet dans un coffre à cause d'une condition non remplie ou un bug
        })
    }


    //Ce code peut etre comparé a une quete d'investigation approfondie dans un jeu video, ou tu dois examiner les détails spécifiques d'un coffre ou d'un évenement.
    //ici, l'objectif est de obtenir toutes les informations liées aux articles contenus dans une commande donnée
    /*Etape de la mission
    1 Recevoir une quete pour explorer un coffre (les détails d'une commande)

        Tu reçois un identifiant de (orederId) qui te permet d'examiner tous les articles associés à cette commande
        Ces articles incluent des informations comme leur quantité, leur nom, leur description, et leur image (comme des stats détaillées d'objets trouvés dans un coffre)
    */
    static getAllDetails(orderId){
        //2 Utiliser une compétence spéciale pour collecter les détails (requete SQL)
        //Le code exécute une requete SQL complexe
        return db.query(`SELECT orderdetails.id, orderdetails.quantity, name, description, picture FROM orderdetails INNER JOIN hardcore On hardcores.id = orderdetails.hardcores_id WHERE order_id = ?`, [orderId])
        /*SELECT: demande des informations spécifiques a extraire
          orderdetails: table qui contient les détails des articles dans les commandes
          INNER JOIN: lie la table orderdetails à la table hardcore pour récupérer des informations supplémentaires sur chaque objet (nom, description, image)
          WHERE order_id = ?: limite la recherche aux détails liés à une commande spécifique (comme ouvrir un coffre particulier)
        */
       //3 Examiner les resultats de la quete
        .then((res) =>{//Si les details sont trouvés, ils sont renvoyés dans un tableau (res) contenant toutes les informations pertinentes
            return res //C'est comme afficher tout ce que contient un coffre (quantité, description, etc) dans l'interface du joueur
        })
        .catch((err) =>{ //Si un probleme survient (mauvais requete, la base de données inaccessible), une erreur est capturée dans catch et renvoyée
            return err //C'est comme tenter d'ouvrir un coffre verrouillé ou cassé
        })
    }
}