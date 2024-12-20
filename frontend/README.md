- Hardcore : site de vente de bombe aérosol de la marque hardcore.

   Description :
**Hardcore** est un site web permettant d'acheter des armes et des accessoires absurde.

LES VISITEURS :

- Les visiteurs peuvent voir les armes/accessoires présenter sur le site.
- Ils peuvent chercher les articles dans les categories correspondante.
- Cliquez sur "en savoir plus" qui donne accès à une déscription du produit.
- Pour accéder un ajout au panier et accéder au paiement, ils doivent se créer un compte et être connectés.

LES UTILISATEURS :

- Créer un compte et se connecter avec leur mail et mot de passe. 
- Supprimer leur compte.
- Modifier leurs infos personnel via la page "mon compte".
- Avoir accès à leurs commandes passer via la page "mes commandes" et afficher le detail de ces dernière.
- Ils peuvent accéder au paiment du panier une fois le panier valider.

L'ADMINISTRATEUR :

- Il a accès au dashboard avec 3 rubriques :
1. La gestion des produits : L'ajout d'un produit, la modification d'un produit existant (nom, decription, prix, image..) et la suppression d'un produit.
2. La gestion des commandes : Accès au commandes utilisateurs, possibilité de voir le detail et mofication du statut (en attente, en préparation et expédié).
3. La gestion des messages : Accès aux messages reçu, possibilité de répondre, les marqués comme lu ou non lu et les supprimer.



## INSTALLATION

### Visez les dossiers dans le terminal:
- backend 
- et frontend

### Installez les dépendances du projet : 
**npm i**

### Lancez l'application : 
**npm run dev**

### Accédez au site depuis votre navigateur à l'adresse suivante :
    http://localhost:9000

###identifiants

###utilisateurs

**Bibliothèques utlisés**:

**Communes au back et au front**:
 
1. Axios :

- Gestion des requêtes HTTP : Bibliothèque pour effectuer des requêtes HTTP, notamment pour interagir avec des APIs.
- Back pour interagir avec d'autres services et  front pour récupérer des données depuis le serveur.

2. Sass et Sass Loader :

- réprocesseur CSS : Sass est utilisé pour écrire des feuilles de style de manière plus efficace avec des fonctionnalités avancées comme les variables et les fonctions.
- Le sass-loader permet d'intégrer Sass dans les projets, que ce soit dans le back ou le front.

3. Stripe :

- Paiement en ligne : intégre les services de paiement en ligne de Stripe, à la fois pour traiter les paiements sur le back et pour gérer l'interface de paiement sur le front.

**Back:**

1. Babel (Transpilation JavaScript) :

- Transpile le code JavaScript moderne et JSX pour le rendre compatible avec les environnements plus anciens.

2. bcryptjs :

- Hachage de mots de passe : Utilisé pour sécuriser les mots de passe en les hachant avant de les stocker dans la base de données.

3. body-parser :

- Analyse des données des requêtes HTTP : Utilisé pour analyser les corps des requêtes HTTP, notamment pour gérer les données envoyées en JSON.

4. cors :

- Gestion des requêtes cross-origin : Permet de configurer le partage de ressources entre différentes origines (CORS) pour autoriser les requêtes provenant d'autres domaines.

5. Express :

- Framework de serveur web : Framework léger pour la création d'applications web et d'APIs.
- Extensions : express-fileupload (gestion des fichiers), express-validator (validation des données des requêtes).

6. Helmet :

- Sécurité des en-têtes HTTP : Middleware pour sécuriser l'application en configurant des en-têtes HTTP pour prévenir des attaques courantes (XSS, clickjacking, etc.).

7. jsonwebtoken (JWT) :

- Gestion de l'authentification : Utilisé pour créer et vérifier des tokens JWT pour l'authentification des utilisateurs.

8. MySQL, MySQL2, Promise MySQL :

- Gestion des bases de données MySQL : Bibliothèques pour interagir avec une base de données MySQL, mysql2 étant une version plus moderne et compatible avec les promesses.

**Outils de développement backend**:

ESLint : Outil de linting pour détecter des problèmes dans le code JavaScript.
Jest : Framework de tests unitaires.
Morgan : Middleware pour enregistrer les requêtes HTTP.
Nodemon : Relance automatiquement le serveur en cas de changement dans le code.
Prettier : Outil pour formater le code.
Supertest : Outil pour tester les APIs HTTP.