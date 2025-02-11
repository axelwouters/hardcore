


const express = require("express") //express est comme le logiciel du serveur qui orchestre tout
const app = express()

const mysql = require("promise-mysql")
const cors = require("cors") //Autorise les joueurs (ou client) d'autres serveurs a se connecter

const path = require("path")


app.use(cors()) //cors agit comme un administrateur de permissions, autorisant les joueurs externes a se connecter


const fileUpload = require('express-fileupload') //fileUpload est comme un système de gestion des inventaires, permettant de stocker des objects (par ex: images des bombes Hardcore)

app.use(fileUpload({
    createParentPath: true
}))

//Comparatif: Un administrateur de jeu qui surveille chaque action des joueurs (requetes HTTP) pour vérifier qu'ils respectent les règles du jeu
app.use((req, res, next) =>{
    console.log("Request URL:", req.url)
    next()
})

//parse les url
app.use(express.urlencoded({extended: false}))
app.use(express.json())//Permet au serveur de lire les données envoyées par les joueurs
app.use(express.static(__dirname+'/public'))
//app.use('/images', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')));


const dotenv = require("dotenv")
dotenv.config()

//Nous récupérons les routes
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const hardcoreRoutes = require("./routes/hardcoreRoutes")
const orderRoutes = require("./routes/orderRoutes")
const contatcsRoutes = require("./routes/contactsRoutes")





//La connexion à la BDD est essentielle pour que les joueurs puissent interagir avec le jeu
mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    
    //database: process.env.DB.database
    //port: process.env.DB_PORT // uniquement si la bdd est sur MAMP 
}).then((db)=>{
    console.log('vous etes connecter a la bdd')
    setInterval(async ()=>{
        const res = await db.query("SELECT 1")
        //Comparatif: Un système de surveillance qui vérifie toutes les 10 secondes que le serveur est toujours connecté au monde (BDD)
    }, 10000)

    //4. Point de Spawn (Accueil des joueurs)
    app.get('/', async (req, res, next)=>{
        res.json({status: 200, msg: "Bienvenue dans Api hardcore"})
        //Comparatif: Le point de spawn est comme une zone d'accueil ou les joueurs apparaissent pour la première fois avec un message de bienvenue
    })

    //5 Routes du jeu (Fonctionnalités du Monde)
    userRoutes(app, db) //Gérer les profils des joueurs (identité, progression, etc)
    authRoutes(app, db)//Gérer les accès au jeu (connexion, déconnexion)
    hardcoreRoutes(app, db)//Gérer les objets du jeu (bombe hardcore)
    orderRoutes(app, db) //Gérer les récompenses ou achats dans le jeu
    contatcsRoutes(app, db) //Gerer un formulaire de contacts
    }).catch(err=>console.log(err))
    


    //6 Démarrage du Serveur (Ouverture du Monde aux Joueurs)
    //Comparatif: C'est comme ouvrir un serveur Minecraft pour que les joueurs puissent a se connecter et commencer à explorer
    const PORT = process.env.PORT || 9500
    //Le serveur écoute sur le port 9500, prèt à recevoir des requetes des joueurs
    app.listen(PORT, () =>{
        console.log(`Le serveur ${PORT} fonctionne`)
})