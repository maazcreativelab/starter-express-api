const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // console.log("request at start verifyjwt")
    // console.log(req)
    // console.log(req.headers.authorization)
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log("err",err)
            if (err) return res.sendStatus(403); //invalid token
            console.log("decoded",decoded)
            // req.user = decoded.UserInfo.username;
            req.roles = decoded?.roles;
            req.id = decoded?.id;
            // console.log("request at end verifyjwt")
            next();
        }
    );
}

module.exports = verifyJWT