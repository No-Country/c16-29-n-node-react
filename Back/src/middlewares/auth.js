import jwt from "jsonwebtoken";

import { TOKEN_KEY } from "../../d_config.js";

//const jwt = require("jsonwebtoken");

export const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("No se ha enviado el token de autenticación");
  }

  const parse = token.replaceAll("\"", "")

  try {
    const decoded = jwt.verify(parse, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Token inválido");
  }
  return next();
};
