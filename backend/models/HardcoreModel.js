module.exports = (_db)=>{
    db = _db
    return HardcoreModel
}

class HardcoreModel {

       
    static getAllHardcore() {
        return db.query('SELECT * FROM hardcores') 
            .then((res) => { 
                return res;
            })
            .catch((err) => { 
                return err; 
            });
    }

    
    static getOneHardcore(id) {
        return db.query('SELECT * FROM hardcores WHERE id = ?', [id])
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    }

    static saveOneHardcore(req) {
        return db.query('INSERT INTO hardcores(name, description, price, picture, quantity, created_at) VALUES (?,?,?,?,?, NOW())', [req.body.name, req.body.description, req.body.price, req.body.picture, req.body.quantity])
            .then((res) => { 
                return res;
            })
            .catch((err) => {
                return err;
            });
    }

    static updateOneHardcore(req, id) {
        return db.query('UPDATE hardcores SET name = ?, description = ?, price = ?, picture = ?, quantity = ? WHERE id = ?', [req.body.name, req.body.description, req.body.price, req.body.picture, req.body.quantity, id])
            .then((res) => { 
                return res;
            })
            .catch((err) => {
                return err;
            });
    }

    static updateHardcoreQuantity(id, newQuantity) {
        return db.query('UPDATE hardcores SET quantity = ? WHERE id = ?', [newQuantity, id])
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    }

   
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