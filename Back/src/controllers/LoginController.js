import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../../d_config.js";
let newUser = {};
let users = [];
import { validateUser } from "./UsersController.js";
import { verified } from "../middlewares/encrypt.js";
let role;
let res_user = {};

//validations

export const register = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send(req.body);
    }
    const { name, email, password } = req.body;
    if (!(email && name && password)) {
      res.status(400).send(errors.mapped());
    }

    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      res
        .status(400)
        .send(
          "El usuario existe, por favor inicia sesión con tus credenciales"
        );
    }

    const encryptedPassword = await hash(password, 10);
    newUser = users(name, email, encryptedPassword);

    users = [...users, newUser];
  } catch (err) {
    console.log("Ha ocurrido un error", err);
  }

  return res.status(201).json(newUser);
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send(errors.mapped());
    }

    const user = await validateUser(username);

    if (user && (await verified(password, user.passHash))) {
      const token = jwt.sign({ role }, TOKEN_KEY, { expiresIn: "2h" });

      res_user.role = user.role;
      res_user.token = token;

      res.status(200).json(res_user);
    } else {
      res.status(403).send("Credenciales inválidas");
    }
  } catch (err) {
    console.log("Ha ocurrido un error", err);
  }
};
