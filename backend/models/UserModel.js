const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = (_db)=>{
    db = _db
    return UserModel
}

class UserModel{
    static saveOneUser(req){
        return bcrypt.hash(req.body.password, saltRounds)
         .then((hash) => {
             return db.query('INSERT INTO `users`(`firstname`, `lastname`, `email`, `password`, `address`, `zip`, `city`, `phone`, `created_at`,`last_connexion` ) VALUES (?,?,?,?,?,?,?, ?, NOW(),NULL);', [req.body.firstname, req.body.lastname, req.body.email, hash, req.body.address, req.body.zip, req.body.city, req.body.phone]) 
             .then((res)=>{ 
                console.log(res)
                 return res
             })
             .catch((err)=>{ 
                 return err
             })
         })
         .catch(err=>err)
    }

    static getUserByEmail(email){
        return db.query(`SELECT * FROM users WHERE email = ?`, [email]) 
        .then((res)=>{
            return res
        })
        .catch((err)=>{ 
            return err
        })
    }

    static getOneUser(id){
        return db.query(`SELECT * FROM users WHERE id = ?`, [id]) 
        .then((res)=>{ 
            return res 
        })
        .catch((err)=>{ 
            return err 
        })
    }

    static updateUser(req, userId){ 
        return db.query(`UPDATE users SET firstname = ?, lastname = ? ,address = ?,zip = ?,city = ?,phone= ? WHERE id = ?`, [req.body.firstname, req.body.lastname, req.body.address, req.body.zip, req.body.city, req.body.phone, userId])
        .then((res)=>{ 
            return res 
        })
        .catch((err)=>{ 
            return err 
        })
    }

    static updateConnexion(id){
        return db.query(`UPDATE users SET last_connexion = NOW() WHERE id = ?`, [id]) 
        .then((res)=>{ 
            return res 
        })
        .catch((err)=>{ 
            return err 
        })
    }

    static deleteOneUser(id){
        console.log("usermodelid",id)
        return db.query(`DELETE FROM users WHERE id = ?`, [id]) 
        .then((res)=>{ 
            console.log("usermodelresponse",res)
            return res
        })
        .catch((err)=>{ 
            return err
        })
    }

    static updatePassword(hashedPassword, userId){ 
        console.log("motdepass", hashedPassword)
        console.log("userid", userId)
        return db.query(`UPDATE users SET password = ? WHERE id = ?`, [hashedPassword, userId]) 
        .then((res)=>{ 
            console.log("passwordresponse", res) 
            return res 
        })
        .catch((err)=>{ 
            return err 
        })
    }
}