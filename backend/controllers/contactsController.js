const ContactsModel = require('../models/ContactsModel')

module.exports = (ContactsModel) =>{
     //Je creer un nouveau contact
    const createContacts = async (req, res) =>{
        try{
            //on appel la methode pour creer le contact dans notre bdd
            const newcontact = await ContactsModel.createContacts(req)
            console.log(newcontact)
            if(newcontact.code)
                //on renvoie la reponse a l'utilisateur
                res.json({status: 200, msg: "Le contact a bien été enregistrer", contact: newcontact})
            } 
            catch(err){
                //Si il y a une erreur, on l'affiche dans la console
                console.err("erreur lors de la création de contact", err)
                res.json({status: 500, msg: "Impossible de creer un contact"})
            }
        }
    
    //Je supprime le contact
    const deleteContacts = async (req, res) =>{
        try{
            //on appel la méthode pour supprimer le contact dans base de donnée
            const deleteContact = await ContactsModel.deleteContacts(req.params.id)
            res.json({status: 200, msg: "Le contact a bien été supprimer", contact: deleteContact})
        } catch(err){
            res.json({status: 500, msg: "Impossible de supprimer le contact", err})
        }
    }

    //Je récuperes tous les contacts
    const getAllContacts = async (res) =>{
        try{
            //On appel la méthode pour recuperer tout les contacts dans la bdd
            const getAllContacts = await ContactsModel.getAllContacts()
            res.json({status: 200, msg: "La récupération de tout les contacts a bien été effectuer", contact: getAllContacts})
        } catch(err){
            res.json({status: 500, msg: "Impossible de récuperer tout les contact", err})
        }
    }

    //Je recuperer les contacts par son id
    const ContactsById = async (req, res) =>{
        try{
            //On appel la méthode pour récuperer le contact par son id
            const ContactsById = await ContactsModel.ContactsById(req.params.id)
            res.json({status: 200, msg: "La récupération du contact par son id a été un succés", contact: ContactsById})
        } catch(err){
            res.json({status: 500, msg: "Oups une erreur est survenue", err})
        }
    }

    //Le statut a été marquer "lu"
    const markAsRead = async (req, res) =>{
        try{
            const statut = await ContactsModel.updateContactsStatut(req.params.id, 1) //1=lu
            res.json({status: 200, msg: "Le message marquer comme lu", statut})
        } catch(err){
            res.json({status: 500, msg: "Oups une erreur a été survenue", err})
        }
    }

    //Le statut a été marquer "non lu"
    const markAsUnread = async (req, res) =>{
        try{
            const statut = await ContactsModel.updateContactsStatut(req.params.id, 0) //0= non lu
            res.json({status: 200, msg: "Le message marquer comme non lu", statut})
        } catch(err){
            res.json({status: 500, msg: "Oups une erreur a été survenue", err})
        }
    }

    
        
    return{
        createContacts,
        deleteContacts,
        getAllContacts,
        ContactsById,
        markAsRead,
        markAsUnread
    }
}
   

   
