const jwt = require("jsonwebtoken")
const secret = "fsjs38"

const withAuthAdmin = (req, res, next) => {
    const token = req.headers['x-access-token']
    console.log(req.headers)
    if(token === undefined){
        res.json({status: 404, msg: "Une Erreur, le token introuvable!16"})
    } else {
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                
                res.json({status: 401, msg: "Une Erreur, ton token est invalide!"})
            } else {
                if(decoded.role !== "ADMIN"){
                    res.json({status: 401, msg: "Une Erreur, Vous n'etes pas admin"})
                } else {
                    req.id = decoded.id
                    next()
                }
            }
        })
    }
}

module.exports = withAuthAdmin