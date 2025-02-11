const ContactsModel = require('../models/ContactsModel')

module.exports = (ContactModel) =>{
    //créer un nouveau contact
    const createContact = async (req, res) => {
        try {
            console.log("Données reçues :", req.body); // Debug
            //On appel la méthode pour creer un nouveau contact
            const newContact = await ContactModel.createContact(req); // AJOUT DE AWAIT
    
            res.json({ status: 200, msg: "Contact créé avec succès", contact: newContact });
        } catch (err) {
            console.error("Erreur lors de la création du contact:", err);
            res.status(500).json({ status: 500, msg: "Oups, une erreur est survenue" });
        }
    };
    
    //Je supprime le contact
    const deleteContacts = async (req, res) => {
        try {
            // Appel à la méthode pour supprimer le contact dans la base de données
            const result = await ContactModel.deleteContacts(req.params.id);
    
            // Vérification de l'impact de la suppression
            if (result.affectedRows > 0) {
                res.json({
                    status: 200,
                    msg: "Le contact a bien été supprimé",
                    contactId: req.params.id,
                });
            } else {
                //reponse json une erreur 404
                res.json({
                    status: 404,
                    msg: "Aucun contact trouvé avec cet ID",
                });
            }
        } catch (err) {
            res.json({
                status: 500,
                msg: "Impossible de supprimer le contact",
                err,
            });
        }
    };
    
    //Je récuperes tous les contacts
   const getAllContacts = async (req, res) => {
    try {
        // On appel la methode getAllContacts pour recupere tout les contact
        const contacts = await ContactModel.getAllContacts();
        res.status(200).json({
            status: 200,
            msg: "Contacts récupérés avec succès",
            contacts: contacts
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Impossible de récupérer tous les contacts",
            err: err.message
        });
    }
};

    //Je recuperer les contacts par son id
    const getContactById = async (req, res) =>{
        try{
            //On appel la méthode pour récuperer le contact par son id
            const Contact = await ContactModel.getContactById(req.params.id)
            res.json({status: 200, msg: "La récupération du contact par son id a été un succés", contact: Contact})
        } catch(err){
            res.json({status: 500, msg: "Oups une erreur est survenue", err})
        }
    }

    //Le statut a été marquer "lu"
    const markAsRead = async (req, res) =>{
        try{
            //On appel la methode updateContactStatut pour marquer comme "Lu"
            const statut = await ContactModel.updateContactStatut(req.params.id, 1) //1=lu
            res.json({status: 200, msg: "Le message marquer comme lu", statut})
        } catch(err){
            res.json({status: 500, msg: "Oups une erreur a été survenue", err})
        }
    }

    //Le statut a été marquer "non lu"
    const markAsUnread = async (req, res) =>{
        try{
            //On appel la methode updateContactStatut pour marquer comme "non-Lu"
            const statut = await ContactModel.updateContactStatut(req.params.id, 0) //0= non lu
            res.json({status: 200, msg: "Le message marquer comme non lu", statut})
        } catch(err){
            res.json({status: 500, msg: "Oups une erreur a été survenue", err})
        }
    }

    
    return{
        createContact,
        deleteContacts,
        getAllContacts,
        getContactById,
        markAsRead,
        markAsUnread
    }
}
   

   
