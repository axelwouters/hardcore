module.exports = (_db)=>{
    db = _db
    console.log("ok")
    return OrderDetailModel
}

class OrderDetailModel{
    //on enregistre le detail de la commande dans la bdd
     static saveOneOrderDetail(id, idHardcore, unit_price, quantity){
        return db.query(`INSERT INTO orderdetails(orders_id, hardcores_id, unit_price ,quantity) VALUES (?,?,?,?)`, [id, idHardcore, unit_price, quantity])
        .then((res) => {
            return res
        })
        
        .catch((err) => { 
            return err
        })
    }

    //On recupere tous les details d'une commande grace a son ID
    static getAllDetails(orderId){
        return db.query(`SELECT orderdetails.id, orderdetails.quantity, name, description, picture FROM orderdetails INNER JOIN hardcore On hardcores.id = orderdetails.hardcores_id WHERE order_id = ?`, [orderId])
        .then((res) =>{
            return res 
        })
        .catch((err) =>{ 
            return err 
        })
    }
}