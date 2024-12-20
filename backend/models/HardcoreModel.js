module.exports = (_db)=>{
    db = _db
    return HardcoreModel
}

class HardcoreModel {

        // Fonctionnalité du code
        //Ce code permet de récuperer toutes les bombes Hardcores depuis la bdd, En termes, c'est une requete pour afficher tout l'inventaire d'un marchant
        //On imagine que tu vas voir un merchant dans un RPG et tu lui demande (montre moi ton stock)
        //le marchant consulte son inventaire et me montre une liste complete
    static getAllHardcore() {
        return db.query('SELECT * FROM hardcores') //Fais une requete pour obtenir toutes les bombes
        //Une requete SQL interroge la base pour récupérer toutes les bombes disponible
            .then((res) => { //Si ça réussit
                return res;//Renvoie la liste complete des bombes
            })
            .catch((err) => { //En cas d'erreur
                return err; //Renvoie une erreur (le marchant ne trouve pas son stock)
            });
            //La bdd (db.query: c'est comme le livre de compte ou de registre du marchant ou toutes les informations sur les objet sont stockées)
            // Succès (.then) = Le marchant trouve le registre et peut te montrer tous ses objets
            // Erreur (.catch) = Le marchant ne trouve pas son registre ou il est abimé, et il s'excuse pour l'erreur
    }

    // Ce code permet de récupérer une seule bombe Hardcore a partir de son identifiant (id),Cela revient à pointer du doigt un spécifique dans l'inventaire d'un marchant pour demander plus de détails
    //On demandes au marchant de me montrer un objet spécifique en lui donnant un identifiant précis
    static getOneHardcore(id) {
        return db.query('SELECT * FROM hardcores WHERE id = ?', [id])
        //La requete SQL interroge la base pour récuperer l'objet avec un id spécifique
            .then((res) => {//Si la requete réussit
                //Reponse du systeme: il cherche dans la bdd de (hardcores) ou chaque bombe a une carte d'identité unique (son id)
                return res;//Renvoie les détails de l'objet
            })
            .catch((err) => {//En cas d'erreur
                //Probleme possible: Si l'ID n'existe pas ou que le système a un bug
                return err;//Renvoie une erreur (le marchand ne trouve pas l'objet)
                /*L'identifiant (id) =c'est comme un numero unique gravé sur chasue objet, Dans un inventaire de marchant, chaque objet a un identifiant pour différencier des autres
                Succès (.then)=Le marchant trouve l'objet correspondant à l'identifiant et le donne ses caractéristiques complètes
                Erreur (.catch) = Le marchant ne trouve rien avec cet identifiant ou a un problème technique
                
                */
            });
    }

    // Ce code permet de sauvegarder une nouvelle bombe Hardcore dans la bdd en créant une entré avec des informations fournies (nom, description, prix, image, quantité)
    //Cela revient a forger ou acheter un nouvel objet dans un jeu video et l'ajouter a ton inventaire
    //En tant qu'administrateur de la boutique, tu ajoutes un nouvel objet a l'inventaire avec ses caractéristiques (nom, description,prix,image,quantité)
    static saveOneHardcore(req) {
        return db.query('INSERT INTO hardcores(name, description, price, picture, quantity, created_at) VALUES (?,?,?,?,?, NOW())', [req.body.name, req.body.description, req.body.price, req.body.picture, req.body.quantity])
        //Insere une nouvelle bombe avec les details donné
        //La requete SQL insére un nouvel objet dans la bdd avec les données fournies dans req.body
            .then((res) => { //Si l'opération réussi
                return res;//Retourne une confirmation (l'objet est ajouté)
            })
            .catch((err) => {//Si une erreur se produit
                return err;//Retourne une erreur
            });
            //Les données (name, description, etc) = Ce sont les matériaux nécessaires pour forger ou configurer un objet dans le jeu
            //Base de donnée (INSERT INTO) = C'est l'inventaire du jeu ou chaque objet créé est ajouté
            //Succès (.then) = Le forgeron réussit à créer l'objet et l'ajoute à l'inventaire
    }

    // Ce code permet de modifier une bombe Hardcore déja existante dans la bdd
    //C'est comme dans un jeu vidéo, tu décidais de mettre à jour ou de personnaliser un objet que tu possèdes, en changeant ses propriétés (nom, description, prix, image ou quantité)
    //On veut mettre a jour un objet (ajuster son prix ou modifier sa description), on donne au marchant les nouvelles information
    static updateOneHardcore(req, id) {
        return db.query('UPDATE hardcores SET name = ?, description = ?, price = ?, picture = ?, quantity = ? WHERE id = ?', [req.body.name, req.body.description, req.body.price, req.body.picture, req.body.quantity, id])
        //La requete SQL met a jour l'objet correspondant au id avec les nouvelles données 
            .then((res) => { //Si la modification réussit
                return res;//Retourne la confirmation que l'objet est mis a jour
            })
            .catch((err) => {//En cas d'erreur
                return err;//Retourne une erreur
            });
            /* 
            Les paramètres (name, description, etc) = Ce sont les nouvelles caractéristiques que tu veux attribuer à l'objet
            Base de données (UPDATE) = C'est l'inventaire ou l'objet est modifié directement avec ses nouvelles propriétés
            Succès (.then) = Le forgeron ou l'atelier termine la modification avec succès
            Erreur (.catch) = Un problème survient, comme une ressource manquante ou une erreur dans la mise a jour
            */
    }

    // Ce code permet de mettre à jour la quantité disponible d'une bombe Hardcore dans la bdd. Cela correspond à une action ou tu géres le stock d'un objet, par exemple apres en avoir utilisé  ou vendu dans un jeu
    //Une bombe a été vendue, ou de nouvelles unités sont arrivés
    //Tu modifie la quantité disponible
    static updateHardcoreQuantity(id, newQuantity) {
        return db.query('UPDATE hardcores SET quantity = ? WHERE id = ?', [newQuantity, id])
        //La requete SQL ajuste la quantité en stock de l'objet spécifié
        //Cela permet de gérer dynamiquement l'inventaire de la boutique
            .then((res) => {//Si la mise à jour réussit
                return res;//Confirme que la quantité a été modifiée
            })
            .catch((err) => {//Si une erreur survient
                return err;//Retourne une erreur
            });
            /*Etape
                Commande: je veux mettre à jour le stock
                id: identifie quelle bombe doit être modifiée
                Nouvelle quantité: Fixe le nouveau d'unités disponibles: par exemple
                    Passe de 10 a 15 (si tu en fabrique)
                    Passe de 10 a 5 (si tu en achete)
                Reponse du systeme: Met a jour la quantité dans la bdd ou affiche une erreur si quelque chose ne va pas

                Parametres(id, newQuantity) = Correspondent à l'objet que tu veux ajuster et la nouvelle quantité que tu veux assigner
                Base de données (UPDATE) = Représente l'inventaire ou les stocks sont ajustés directement
                Succès (.then) = Le jeu applique correctement la nouvelle quantité dans l'inventaire
                Erreur (.catch) = Une défaillance se produit
            */
    }

    // Ce code supprime une bombe Hardcore de la bdd, identifiée par sob id
    //Tu décide de retirer un objet de l'inventaire
    static deleteOneHardcore(id) {
        return db.query('DELETE FROM hardcores WHERE id = ?', [id]) //ID de la bombe hardcore a supprimer
        //La requete SQL supprime l'objet correspondant au id de la base

            .then((res) => {//Si la suppression réussit
                return res;//Retourne la confirmation
            })
            .catch((err) => {//Si une erreur survient
                return err;//Retourne l'erreur
            });

            /*Le joueur sélectionne l'objet qu'il veut supprimer (dans le code, on utilise l'identifiant id pour le trouver) 
                Base de données (query DELETE): Le jeu supprime cet objet de ton inventaire
            Reponse
            Si tout se passe bien, l'objet est supprimé avec un message de confirmation
            En cas d'erreur: un message d'erreur s'affiche

            Parametre (id)= identifie l'objet que tu veux supprimer
            Base de données (DELETE) = Correspond au coffre ou inventaire dans lequel l'objet est stocké
            Succès (.then)=L'objet est retiré du stockage et disparait
            Erreur (.catch) = Une défaillance survient, empéchant la suppression
            */
    }
}