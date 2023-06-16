const verifyRoles = (allowedRoles) => {
    return (req, res, next) => {
        // console.log("request",req)
        // console.log("request roles",req?.headers['x-roles'])
        // if (!req?.headers['x-roles']) return res.sendStatus(401);
        // const roles = allowedRoles;
        // console.log("allowe roles",roles)
        // console.log("request roles",req.roles==req?.headers['x-roles'])
        // const result = roles==req?.headers['x-roles']
        // if (!result) return res.sendStatus(401);
        // next();



        // orignal code
        if (!req?.roles) return res.sendStatus(401);
        const roles = allowedRoles;
        const result = roles==allowedRoles
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles