module.exports = (_db) =>{
    db = _db 
    return ContactModel
}

class ContactModel{
     // Créer un nouveau contact
     static async createContact(req) {
        try {
            const { name, email, story } = req.body;
        
            const result = await db.query(
                "INSERT INTO contacts (name, email, story, statut, receipt_date) VALUES (?, ?, ?, 0, NOW())",
                [name, email, story]
            );
    
            return result;
        } catch (err) {
            console.error("Erreur lors de l'insertion du contact:", err);
            throw err;
        }
    }
    

    //Supprimer un contact
    static deleteContacts(id) {
        return db.query('DELETE FROM contacts WHERE id = ?', [id])
            .then((res) => {
                return res; // Assure-toi que 'res' contient 'affectedRows'
            })
            .catch((err) => {
                throw err; // Tu peux aussi relancer l'erreur si nécessaire
            });
    }
    

    //Recuperer le contact par l'id 
    static getContactById(id){
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
    static updateContactStatut(id, statut){
        return db.query('UPDATE contacts SET statut = ? WHERE id = ?', [id, statut])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

}