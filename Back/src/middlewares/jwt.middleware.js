import { verify } from "jsonwebtoken"; //importamos la libreria
import { env } from "process"; //importamos process
const secret = env.JWT_SECRET; //palabra secreta del .env
import generatoken from "../helpers/generatoken"; //llamado a una función de helpers para generar token

const verifyToken = (req, res, next) => {
  // middleware de virificacion de token
  const token = req.headers.authorization.split(" ")[1]; //utilizar postman  para enviar el token en formato Bearer + Token

  if (!token) {
    // si no existe
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = decoded.user;
    next();
  });
};

export default verifyToken;
