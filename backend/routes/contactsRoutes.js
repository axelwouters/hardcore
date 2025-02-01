const contactsController = require('../controllers/contactsController')

module.exports = (app, db) => {
    const ContactsModel = require("../models/ContactsModel")(db)
    const contactsController = require("../controllers/contactsController")(ContactsModel)

    //Creation d'un contact 
    //Requete SQL OK
    //route postman OK
    app.post('/api/v1/contact', (req, res) => {contactsController.createContact(req, res, db)})
    //Supprimer le contact
    //Requete SQL Ok
    //route postman OK
    app.delete('/api/v1/contact/delete/:id', contactsController.deleteContacts)
    //Récupération de tout les contacts
    //Requete SQL OK
    //route postman OK
    app.get('/api/v1/contacts/all', contactsController.getAllContacts)
    //Récuperation le contact par l'id
    //Requete SQL OK
    //route potsman OK
    app.get('/api/v1/contact/:id', contactsController.getContactById)
    //Je modifie le statut du contact marquer "lu" 
    //Requete SQL OK
    //route postman OK
    app.put('/api/v1/contact/:id/read', contactsController.markAsRead)
    //Je modifie le statut du contact marquer "non lu"
    //Requete SQL OK
    //route postman OK
    app.put('/api/v1/contact/:id/unread', contactsController.markAsUnread)
}