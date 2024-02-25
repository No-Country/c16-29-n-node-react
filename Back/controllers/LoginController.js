import { validateUser } from "./UsersController.js";
import { verified } from "../middlewares/encrypt.js";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../d_config.js";
let role;
let res_user = {};
let msjError = {"Error":"Asegúrese de introducir los datos de su registro actual. En caso de NO poder iniciar sesión, póngase en contacto con la secretaría del centro educativo."}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send(msjError);
    } else {
      let user = await validateUser(username);

      if (user && (await verified(password, user.password))) {
        const token = jwt.sign({ role }, TOKEN_KEY, { expiresIn: "2h" });
        console.log(token)

        if(token){
          res_user = JSON.parse(JSON.stringify(user))
          delete res_user.password;
          res_user.token = token;

          res.status(200).json(res_user);
        }
      } else {
        res.status(403).json(msjError);
      }
    }
  } catch (err) {
    console.log("Ha ocurrido un error", err);
    res.status(500).json(err);
  }
};
