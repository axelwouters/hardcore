module.exports = (_db)=>{
    db = _db
    return OrderModel
}

class OrderModel{
   
    static saveOneOrder(userId, totalAmount){ 
        
        if(!userId){
            console.log(userId)
            return Promise.reject(new Error(`L'ID utilisateur ne peut pas être nul`))
         
        }
       
        return db.query(`INSERT INTO orders(users_id, total_amount, created_at, status) VALUES (?,?,Now(),"not payed")`, [userId, totalAmount])
          
        .then((res)=>{ 
            console.log(res)
            return res
         
        }) 
       
        .catch((err) =>{
            console.log(err)
            return err
           
        })
    }

    static getUserOrders(userId) {
        return db.query('SELECT * FROM orders WHERE users_id = ?', [userId])
            .then((res) => res)
            .catch((err) => {
                console.error(err)
                return err
            })
    }
    

    static updateTotalAmount(orderId, totalAmount){
      
        return db.query(`UPDATE orders SET total_amount= ? WHERE id = ?`, [totalAmount, orderId])
       
        .then((res)=>{ 
            return res 
        })
      
        .catch((err)=>{
            return err
        })
    }

   
    static getOneOrder(id){
       
        return db.query('SELECT * FROM `orders` WHERE id = ?', [id])
       
        
        .then((res)=>{ 
            return res 
        })
      
        .catch((err)=>{ 
            return err 
        })
    }

   
    static updateStatus(orderId, status){
      
        return db.query(`UPDATE orders SET status= ? WHERE id`, [status, orderId])
        
        .then((res)=>{ 
            return res 
        })
        
        .catch((err)=>{ 
            return err
        })
    }

    static getAllOrders(){
       
        return db.query(`SELECT * FROM orders`)
       
        .then((res) => {
            return res 
        })
        
        .catch((err)=>{ 
            return err 
        })
    }
}