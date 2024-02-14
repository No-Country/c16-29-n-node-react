import auth from "jsonwebtoken"

import {TOKEN_KEY} from "../d_config.js"

export const verifyToken = (req, res, next) => {
    const token = req.headers["token"]

    if(!token){
        return res.status(403).send('No token provided.')
    }

    try {
        const  decoded = auth.verify(token, TOKEN_KEY)
        req.user = decoded;
    } catch (error) {
        return res.status(401).send('Invalid Token')
    }
    return next()
}