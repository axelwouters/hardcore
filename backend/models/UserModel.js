const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = (_db)=>{
    db = _db
    return UserModel
}

class UserModel{
    //sauvegarde d'un utisateur
    //On peut voir ce code comme une mission de création de personnage, le but est d'ajouter un nouveau personnage (utilisateur) a la bdd 
    //avec des informations spécifique et sécurisées notamment un mot de passe crypté
    static saveOneUser(req){//création d'un nouveau personnage
       //Le joueur code démarre une mission pour créer un nouveau personnage avec des attributs personnalisées (prénom, nom, email, adresse)
       //Ces informations sont fournies par le joueur dans le formulaire (c'est le contenu de req.body), qui sert de kit de création de personnage
         //Etape de sécurité : la protection du mot de passe
         //Avant de sauvegarde le personnage, le jeu doit proteger une information critique: le mot de passe. Cette protection est vitale, car elle empeche les autres joueur ou ennemis du jeu de voler les données du personnage
         //Le code va utiliser bcrypt.hash(req.body.password, saltRounds) pour transformer le mot de passe en un code sécurisé (haché), que seuls les systémes du peuvent vérifier.
         //Cela revient a transformer le mot de passe en un "mot magique" qui n'est pas lisible directement
        return bcrypt.hash(req.body.password, saltRounds)
         .then((hash) => {//Enregistrement du personnage dans le QG (la bdd)
             //Une fois le mot de passe protégé, le personnage est pret à etre créé dans le jeu.Le code envoie une commande SQL pour insérer ce nouveau personnage dans la bdd avec (INSERT INTO users... VALUES (...)).
             //Toutes les informations fournies par le joueur, y compris le mot de passe protégé, sont envoyées pour  l'ajout dans le QG
             /*4eme partie La date et heure d'enregistrement - marquer la création du personnage
             Le champ created_at utilise NOW() pour enregistrer l'instant exact ou le personnage est créé, c'est comme si le jeu enregistrait le moment précis ou le nouveau héros rejoint l'équipe
             Le last_connexion est laissé vide (NuLL), car le personnage n'a pas encore commencé sa premiere mission dans le jeu
             */ 
             return db.query('INSERT INTO `users`(`firstname`, `lastname`, `email`, `password`, `address`, `zip`, `city`, `phone`, `created_at`,`last_connexion` ) VALUES (?,?,?,?,?,?,?, ?, NOW(),NULL);', [req.body.firstname, req.body.lastname, req.body.email, hash, req.body.address, req.body.zip, req.body.city, req.body.phone])
            //5 On fait une vérification du succès de la mission 
             .then((res)=>{ //Si l'enregistrement dans la bdd est réussi (dans le then), le jeu (code) retourne un message indiquant que le perso a été correctement ajouter avec un return res
                console.log(res)
                 return res
             })
             .catch((err)=>{ //Si quelque chose ne va pas (exemple erreur de connexion), le code catch capture l'erreur et la retourne avec (retrun err)
                 return err
             })
         })
         .catch(err=>err)
    }

    //récupération d'un utilisateur en fonction de son mail
    //Dans cette mission, le but est de rechercher dans un jeu video ou le joueur doit trouver un personnage en utilisant une information spécifique: son email il agit comme une marque unique
    //1 Mission de recherche: Trouve le personnage à l'aide de son email
    //Dans cette miison, ton personnage doit trouver un autre personnage dans la bdd du jeu se basant sur une information précise l'email
    //L'emal est comme un artefact unique qui permet d'identifier le personnage exact à retrouver, même s'il y a des milliers de personnages dans la base
    static getUserByEmail(email){//2 La commande magique pour le maître des achives
        /*Ton personnage utilise une requete SQL spéciale pour interroger la bdd, qui est représenter comme le QG des archives du jeu
        La commande SELECT * FROM users WHERE email = ?, elle demande au "maitre des archives" (la bdd) de "fouiller dans tes fichier et de trouver les info du perso dont l'email est celui-ci"
        */
        return db.query(`SELECT * FROM users WHERE email = ?`, [email]) // L'email est transmit comme paramètre sécurisé [email]. Cela empeche tout joueur malveillant d'envoyer des instructions nuisible
        //pour obtenir des données non autorisées (comme des attaques SQL)
        //4 Resultat de la mission - le personnage a t'il été trouvé ?
        //Une fois que la commande SQL est éxecutée, il y a 2 possibilité
        .then((res)=>{//Si un personnage avec cet email est trouvé, le then retourne toutes les informations avec (return res)
            return res
        })
        .catch((err)=>{ //Si aucune correspondance n'est trouvée (une erreur technique), le catch intercepte l'echec et retourne un message d'erreur avec (retrun err)
            return err
        })
    }

    //récupération d'un utilisateur par son id
    //Dans cette mission, le but est de localiser un personnage spécifique dans la bdd du jeu a l'aide de son ID pour obtenir tous ses détails
    //1er mission est la localisation d'un personnage
    //Dans ce scénario, le personnage doit retrouver un autre personnage (l'utilisateur) dans une immense bdd
    //Cette mission commence lorsque le joueur fournit un identifiant spécifique (qui est le id de l'utilisateur)
    static getOneUser(id){//Ton personnage utilise une commande SQL (SELECT * FROM users WHERE id = ?) pour demander a la bdd de retrouver et de fournir toutes les information du personnage avec cet identifiant
        //C'est comme demander au maitre des archives du jeu de fouiller dans les dossiers pour localiser exactement le personnage qu'on veut
        return db.query(`SELECT * FROM users WHERE id = ?`, [id]) //Le ID est passé en tant que paramètre dans la requete, ce qui garantit que seule l'information du personnage spécifique est recherché, sans risque d'erreurs ou d'accés indésiré
        //C'est comme si le maitre des archives acceptait uniquement les codes secrets (identifiants spécifique) pour te montrer les informations demandées, assurant la sécurité et précision
        //Une fois que la bdd de données a exécuté la requete, nous avons 2 scénarios
        .then((res)=>{ //Si le personnage est trouvé, le then retourne toutes les informations avec un (return res).
            return res //Cela equivaut a voir toutes les informations importante apparaitre sur l'écran du jeu
        })
        .catch((err)=>{ //Si un probleme survient, le catch intercepte l'erreur et retourne un message d'erreur avec (return err)
            return err //C'est comme si la mission échouait et on recevait un message disant que le personnage n'a pas pu être localisé
        })
    }

    //modification d'un utilisateur
    //Dans cette mission, ton personnage (le code) doit modifier les informations d'un autre personnage dans bdd
    //Cette maj comprend le prénom, le nom, l'adresse, le code postal, la ville et le numero de téléphone
    static updateUser(req, userId){ //Dans le jeu, ton personnage doit se rendre au QG de la bdd pour mettre a jour les informations d'un autre personnage
        //Le joueur fournit les nouvelles informations dans un formlaires (contenu dans le req.body), et il identifie le personnage cible à modifié avec userId.
        //Executé de la commande de mise a jour
        //Le personnage utilise une commade SQL pour acceder a la bdd, l'endroit ou toutes les informations des personnage sont stockées
        //La commande UPDATE users SET ... WHERE id ? est l'instruction SQL envoyé a la base pour dire exactement quelles informations mettre a jour.
        return db.query(`UPDATE users SET firstname = ?, lastname = ? ,address = ?,zip = ?,city = ?,phone= ? WHERE id = ?`, [req.body.firstname, req.body.lastname, req.body.address, req.body.zip, req.body.city, req.body.phone, userId])
        //Utilisation des paremètres pour éviter les piège
        //Les nouveaux détails (req.body.firstname, req.body.lastname) sont transmis comme des parametre dans la commande SQL comme un kits de personnalisations
        //Ces paramètres garantissent aussi la sécurité: en les utilisant,on évite certains pièges comme des attaques de joueur malveillants qui pourraient modifier des informations
        .then((res)=>{ //Une fois la commande envoyée, ton personnage attend une réponse de la bdd
            //Si la mise a jour fonctionne dans le then, il reçoit un signal de succès, et le jeu retourne les détails de cette modification (return res).
            return res //C'est comme si le jeu affichait un message indiquant que la mise à jour des informations est bien réussi
        })
        .catch((err)=>{ //qi quelque chose ne va pas (dans le catch), un message d'erreur est retourné à la place (return err)
            return err //Le jeu renvoie le resultat au joueur. Ce retour permet de voir si les nouvelles informations du personnage ont bien été appliquées
        })
    }

    //modification de la dernière connexion d'un utilsateur
    //Dans cet mission le code peut être comparé à une mission de mise à jour du journal de connexion
    //L'objectif est de marquer le moment exact ou un joueur (utilisateur) se connecte au jeu en mettant à jour historique dans la bdd
    //1 Mettre a jour l'heure de connexion du joueur
    //Dans ce scénario, le joueur (ou personnage) vient de se connecter au jeu, et ton personnage (le code) reçoit une mission d'enregistrer dans le journal de jeu la date et l'heure précises de cette connexion
    static updateConnexion(id){

        /*Le personnage utilise une commande SQL pour demander à la bdd de mettre à jour l'information: "Modifie le champ last_connexion pour ce joueur spécifique"
        La commande UPDATE users SET last_connexion = NOW() WHERE id = ? précise que:
        NOW() capture l'instant précis de la connexion (date et heure actuelles)
        id est l'identifiant du joueur qui s'est connecté, pour que seule sa ligne soit mise à jour dans la bdd
        */
        return db.query(`UPDATE users SET last_connexion = NOW() WHERE id = ?`, [id]) //3 Ciblage grace au ID
        // Le id agit comme une balise de ciblage qui permet au code de reperer exactement quel joueur dans le journal doit être mis à jour. Cela évite que d'autres joueurs soient affectés accidentellement
        //4 Resultat de la mission - La mise à jour a t-elle réussi
        //Une fois la commande exécutée, deux scénarios peuvent se produire
        .then((res)=>{ //Mission réussie : Si la bdd met à jour l'information avec succès, le then renvoie une confirmation (return res)
            return res //C'est comme recevoir un message dans le jeu 
        })
        .catch((err)=>{ //Mission échouée : Si un probleme survient (ID inexistant), le catch intercepte l'erreur et renvoie un message d'echec (return err)
            return err //Cela correspond à un message dans le jeu disant "impossible d'enregistrer la connexion"
        })
    }

    //suppression d'un compte utilisateur
    //Ce code a t'une mission de bannissement ou de suppression d'un personnage dans un jeu vidéo.
    //Le but est de retirer un personnage spécifique du "monde du jeu" en se basant sur son identifiant unique ID
    //1 Mission Eliminer un personnage du jeu
    //Dans ce scénario, le maître du jeu (ou l'administrateur) décide qu'un personnage doit etre retiré définitivement de la bdd (le monde du jeu).
    //Cela peut être pour diverses raison: violation des règles, compte inactif, ou demande de suppression
    static deleteOneUser(id){/* 2 Commande spéciale pour le "nettoyeur"
        Mon code utilise une commande SQL pour exécuter cette mission : DELETE FROM users WHERE id = ?
        Cette commande ordonne au "nettoyeur" (le monde de le bdd) de :
            Localiser le personnage exact dans la table users en utilisant son identifiant unique (id)
            Supprimer complètement ses informations, afin qu'il n'existe plus dans la base
        */ 
        console.log("usermodelid",id)
        return db.query(`DELETE FROM users WHERE id = ?`, [id]) //Ciblege précis grâce a l'ID
        /* L'id agit comme balise de ciblage pour identifier le personnage exact à éliminer. Cela évite que d'autres personnage soient accidentellement supprimés
        C'est un peu comme marquer un ennemi dans un jeu pour l'attaque touche uniquement cette cible
        */ 
       //4 Exécution de la mission
        .then((res)=>{ //Mission réussi : Si le personnage est supprimé avec succès, le then renvoie une confirmation avec un (return res)
            console.log("usermodelresponse",res)
            return res
        })
        .catch((err)=>{ //Mission échouée: Si une erreur survient comme par exemple l'id n'existe pas, le catch intercepte l'erreur et renvoie un message d'échec avec un (return err)
            return err
        })
    }

    //modification du mot de passe par son id
    static updatePassword(hashedPassword, userId){ //l'utilisateur doit fournir le password, une infos que ma static attend et mon updatepassword
        console.log("motdepass", hashedPassword)
        console.log("userid", userId)
        return db.query(`UPDATE users SET password = ? WHERE id = ?`, [hashedPassword, userId]) //Je modifie le mdp
        .then((res)=>{ //then = attend la reponse de modification de password et le res 
            console.log("passwordresponse", res) //
            return res //et le return me sert a recuperer la reponse
        })
        .catch((err)=>{ // mon catch va me servir a gerer les erreur
            return err // mon catch va me servir a retourner mon erreur
        })
    }
}