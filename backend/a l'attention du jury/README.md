- Hardcore : site de vente de bombe aérosol de la marque hardcore.

- Description :
**Hardcore** est un site web permettant d'acheter bombe aérosol de la marque hardcore.

LES VISITEURS :

- Les visiteurs peuvent voir l'interface des bombes aérosol hardcore présenter sur le site
- Cliquez sur le produit qui donne accès à une déscription du produit.


LES UTILISATEURS :

- Créer un compte et se connecter avec leur mail et mot de passe. 
- Supprimer leur compte.
- Modifier leurs infos personnel via la page "du nom et prénom de la personne".
- Avoir accès à leurs commandes passer via la page "mes commandes" et afficher le detail de ces dernière.
- Ils peuvent accéder au paiment du panier une fois le panier valider.

- L'ADMINISTRATEUR :

- Il a accès au dashboard avec 2 rubriques :
1. La gestion des produits : l'ajout d'un produit, la modification d'un produit existant (nom, decription, prix, image..) et la suppression d'un produit.
2. La gestion des commandes : Accès au commandes passer des utilisateurs, ainsi que leur statut (payer).


## INSTALLATION

### Visez les dossiers dans le terminal:
- backend 
- et frontend

### Installez les dépendances du projet : 
**npm i**

### Lancez l'application : 
**npm run dev**

### Accédez au site depuis votre navigateur à l'adresse suivante :
    http://localhost:9201

###identifiants

- ADMINISTRATEUR
1. axel@yahoo.com
2. Mdp: Axel16--

- UTILISATEURS
1. aicha@yahoo.com
2. mdp: Aicha10--

**Bibliothèques utlisés**:
### Backend
 1. bcryptjs :
 - Hachage de mots de passe 
 - Utilisé pour sécuriser les mots de passe en les hachant avant de les stocker dans la base de données.

 2. cors : 
 - Gestion des requêtes cross-origin 
 - Permet de configurer le partage de ressources entre différentes origines (CORS) pour autoriser les requêtes provenant d'autres domaines.

 3. dotenv : 
- Gestion des variables d'environnement
- package qui permet de charger des variables dans un fichier .env, facilite la configuration et la gestion des donnée sensible

 4. express-fileupload :
 - gestion des fichiers qui simplifie le téléchargement de fichier basé sur express, 
 - il permet de gerer les fichiers via des formulaires HTML ou des requêtes multipart/form-data

 5. express : 
- Framework de serveur web : Framework léger pour la création d'applications web et d'APIs.
- Extensions : express-fileupload (gestion des fichiers), express-validator (validation des données des requêtes).

 6. jsonwebtoken :
- Gestion de l'authentification 
- Utilisé pour créer et vérifier des tokens JWT pour l'authentification des utilisateurs.

 7. nodemon : 
 - Redémarrage automatiquement le serveur 
 - c'est un outil de développement qui surveille les fichiers du projet et redemarre automatiquement le serveur quand un fichier est modifier

 8. promise-mysql : 
 - Gestion des connexions a la bdd, 
 - il fournit une interface simple pour interagir avec un base de donnée

 9. stripe : 
 - Intégration des paiement en ligne
 - il permet d'integrer les fonctionnalités de paiement en ligne par stripe cote backend

### Frontend
1. eslint/js : 
- Analyse statique du code JavaScript, 
- c'est un outil qui va analyser le code JS pour deteccter des probleme de qualité et de respecter des conventions spécifique

2. reduxjs/toolkit :
- Gestion simplifiée de l'état global dans les applications React
- C'est une solution officielle recommandée pour travailler avec Redux
- il simplifie la configuration, réduit le code répétitif, et offre des outils modernes pour gérer efficacement l'état global.

3. stripe/react-stripe-js :
- Interface de paiement Stripe dans React
- C'est une bibliothèque officielle fournie par Stripe pour intégrer une interface de paiement directement dans l'appli React
- il simplifie l'intégration de Stripe en offrant des composants réactifs et sécurisés pour gérer des paiements

4. stripe/stripe-js :
- Paiement en ligne
- intégre les services de paiement en ligne de Stripe, à la fois pour traiter les paiements sur le back et pour gérer l'interface de paiement sur le front.

5. types/react-dom : 
- Support TypeScript pour React Dom
- il fournit les définitions de types pour utiliser React Dom avec TypeScript, il permet de béneficier de l'auto-complétion, de la detection d'erreur
- et une meilleure expérience de développement

6. types/react : 
- Support TypeScript pour React
- il fournit les définitions de types pour utiliser React avec TypeScript. Il est essentiel pour bénéficier de l'auto-complétion, vérification des types
- et d'une meilleure experience de développement 

7. vitejs/plugin-react : 
- Support complet pour react dans Vite
- c'est un plugin offciel de Vite facilite l'intégration de React en offrant un support complet pour JSX
- le fast refresh et une configuration optimisée pour les projet en React

8. axios :
- Gestion des requêtes HTTP : Bibliothèque pour effectuer des requêtes HTTP, notamment pour interagir avec des APIs.
- Back pour interagir avec d'autres services et  front pour récupérer des données depuis le serveur.

9. eslint-plugin-react-hooks :
- Verification des regles Hooks React
- Un plugin qui vérifie que les règles spécifique aux Hooks React sont respectées, pour garantir un comportement stable et prévisible des composants 

10. eslint-plugin-react-refresh :
- Support EsLint pour React Refresh
- Ce plugin est conçu pour aider à détecter et a corriger les problème spécifique liées a l'intégration de React Refresh
- Il s'assure que les regle nécessaire sont respectées pour le rechargement rapide

11. eslint-plugin-react :
- Linting avancé pour les projets React
- Il fournit des règles spécifiques pour écrire un code React de haute qualité, cohérent, et conforme au meilleres pratiques.
- Il aide a detecter les erreurs et a maintenir une base de code

12. eslint :
- Analyse statique du code JavaScript
- C'est un outil de linting populaire qui analyse le code por détecter les erreurs, les mauvaises pratiques, et les problèmes de style
- Il aide a maintenir un code propre, lisible et cohérent

13. globals :
- Définition des variables globales pour ESLint 
- Ce packtage fournit une liste des variables globales reconnues dans différents environnements Js, Node.js, navigateur
- Il est utiliser pour informer ESLint des variables globales disponibles

14. moment : 
- Gestion des dates et des heures
- Le moment est une bibliothèque JavaScript populaire qui simplifie la manipulation, le formatage
- l'analyse, et l'affichage des dates et des heures dans les applications web et backend.

15. react-dom :
- Rendu des composants React dans le DOM
- C'est un packtage essentiel dans l'écosytème React
- Il va fournir des méthodes spécifiques pour intéragir avec le DOM, sa permet de monter, mettre a jour et démonter des composants

16. react-redux :
- Gestion de l'etat global dans l'application React
- C'est une bibliotheque officielle pour integrer Redux, une solution de gestion d'état prévisible
- Elle simplifie la connexion des composants React a un store pour partager et gérer efficacement de l'etat global

17. react-router-dom :
- Routage pour les applications React
- c'est une bibliotheque essentielle pour gerer la navigation et le routage dans les application React
- Elle permet de créer des SPA (single page application) ou la navigation entre les pages 

18. react :
- Bibliothèque JavaScript pour la création d'interfaces utilisateur
- C'est une bibliotheque JavaScript populaire pour créer une applications web interactives
- Elle permet de construire des interfaces utilisateur basées sur des composants réutilisable
- avec une architecture efficace pour le développement

19. redux-thunk :
- Bibliothèque JavaScript pour la création d'interfaces utilisateur
- C'est une bibliothèque Js populaire développé pour la création d'application web interactives.
- Elle permet de construire des interfaces utilisateur basées sur des composants réutilisable 
- offrant une architecture declarative et efficace

20. redux :
- Gestion centralisée de l'état des applications JavaScript
- bibliotheque des gestion d'etat qui permet de centraliser l'etat globale d'une application dans un store unique
- il simplifie le partage d'information entre les composants

21. sass-embedded :
- réprocesseur CSS 
- Sass est utilisé pour écrire des feuilles de style de manière plus efficace avec des fonctionnalités avancées comme les variables et les fonctions.
- Le sass-loader permet d'intégrer Sass dans les projets, que ce soit dans le back ou le front.

22. vite

**Outils de développement backend**:

Nodemon : Relance automatiquement le serveur en cas de changement dans le code.
Postman : Permet de tester les routes Api