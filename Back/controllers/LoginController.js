import { validateUser } from './UsersController.js'
import { verified } from "../middlewares/encrypt.js";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../d_config.js";
let role;
let res_user= {};

export const login = async (req, res) => {
 
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("Indica username y contraseña");
    }

    const user = await validateUser(username);

    if (user && (await verified(password, user.passHash))) {
      const token = jwt.sign({ role }, TOKEN_KEY, { expiresIn: "2h" });
      
      res_user.role= user.role;
      res_user.token = token;
      
      res.status(200).json(res_user);
    } else {
      res.status(403).send("Credenciales inválidas");
    }
  } catch (err) {
    console.log("Ha ocurrido un error", err);
  }
};
