module.exports = (_db) =>{
    db = _db 
    return ContactsModel
}

class ContactsModel{
    //Création d'un contact
    static createContacts(req){
        return db.query('INSERT INTO contacts(name, email, story, receipt_date, statut) VALUES (?,?,?,0,NOW())', [req.body.name, req.body.email, req.body.story])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

    //Supprimer un contact
    static deleteContacts(id){
        return db.query('DELETE FROM contacts WHERE id', [id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

    //Recuperer le contact par l'id 
    static ContactsById(id){
        return db.query('SELECT * FROM contacts WHERE id = ?', [id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }


    //recuperer tout les contacts
    static getAllContacts(){
        return db.query('SELECT * FROM contacts')
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

    //je modifie le statut du contact marquer lu ou non lu
    static updateContactsStatut(id, statut){
        return db.query('UPDATE contacts SET statut = ? WHERE id = ?', [id, statut])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

}