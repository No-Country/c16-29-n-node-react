const jwt = require("jsonwebtoken");//importamos la libreria 
const process = require("process");//importamos process
const secret = process.env.JWT_SECRET;//palabra secreta del .env

const verifyToken = (req, res, next) => { // middleware de virificacion de token
  const token = req.headers.authorization.split(" ")[1]; //utilizar postman  para enviar el token en formato Bearer + Token

  if (!token) { // si no existe
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = decoded.user;
    next();
  });
};

module.exports = verifyToken;