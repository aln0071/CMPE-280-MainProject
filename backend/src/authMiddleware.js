const jwt = require("jsonwebtoken");
const tokenKey = process.env.TOKEN_KEY || 'cmpe280_jwt_token_key';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(' ')[1];
        console.log(token);
        console.log(tokenKey)
        jwt.verify(token, tokenKey, (err, user) => {
            if(err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    } else {
        res.sendStatus(401)
    }
}

module.exports = {
    authMiddleware
}
