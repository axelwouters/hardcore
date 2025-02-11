module.exports = (_db)=>{
    db = _db
    return HardcoreModel
}

class HardcoreModel {

    //On recupere toutes les bombes
    static getAllHardcore() {
        return db.query('SELECT * FROM hardcores') 
            .then((res) => { 
                return res;
            })
            .catch((err) => { 
                return err; 
            });
    }

    //On recupere une bombe hardcore grace a son ID
    static getOneHardcore(id) {
        return db.query('SELECT * FROM hardcores WHERE id = ?', [id])
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    }

    //On sauvegarde une bombe dans la bdd
    static saveOneHardcore(req) {
        return db.query('INSERT INTO hardcores(name, description, price, picture, quantity, created_at) VALUES (?,?,?,?,?, NOW())', [req.body.name, req.body.description, req.body.price, req.body.picture, req.body.quantity])
            .then((res) => { 
                return res;
            })
            .catch((err) => {
                return err;
            });
    }

    //On modifie l'element grace a son ID
    static updateOneHardcore(req, id) {
        return db.query('UPDATE hardcores SET name = ?, description = ?, price = ?, picture = ?, quantity = ? WHERE id = ?', [req.body.name, req.body.description, req.body.price, req.body.picture, req.body.quantity, id])
            .then((res) => { 
                return res;
            })
            .catch((err) => {
                return err;
            });
    }

    //On modifie uniquement la Quantité
    static updateHardcoreQuantity(id, newQuantity) {
        return db.query('UPDATE hardcores SET quantity = ? WHERE id = ?', [newQuantity, id])
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    }

   //On supprime la bombe grace a son ID
    static deleteOneHardcore(id) {
        return db.query('DELETE FROM hardcores WHERE id = ?', [id]) 

            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    }
}