const db = require('../models')
const User = db.users
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    console.log("handleRefreshToken")
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    console.log("refreshtoken in ",refreshToken)
    const foundUser = await User.findOne({ where: { refreshToken }});
    console.log("user",foundUser)
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log("decoded refresh", decoded)
            if (err || foundUser.id !== decoded.id) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "id": decoded.id ,"roles":foundUser.roles},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }