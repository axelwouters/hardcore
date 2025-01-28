const contactsController = require('../controllers/contactsController')

module.exports = (app, db) => {
    const ContactsModel = require("../models/ContactsModel")(db)
    const contactsController = require("../controllers/contactsController")(ContactsModel)

    
}