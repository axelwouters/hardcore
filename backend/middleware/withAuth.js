const jwt = require("jsonwebtoken")
const secret = "fsjs38"

const withAuth = (req, res, next) => {
    const token = req.headers['x-access-token'] || 
                 (req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : undefined);

    if (!token) {
        return res.json({status: 404, msg: "Token introuvable1"});
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.json({status: 401, msg: "Token invalide2"});
        }
        req.id = decoded.id;
        next();
    });
};

module.exports = withAuth