import { User } from "../models/UserModel";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const {TOKEN_KEY} = process.env;
let newUser = {};
let users = [];

const register = async (req, res) => {
    try{
        if(!req.body){
            res.status(400).send("Debes indicar nombre, email, password");
        }
        console.log(req.body);
        const {name, email, password} = req.body;

        if(!(email && name && password)){
            res.status(400).send("Debes indicar nombre, email, password");
        }

        const userExists = users.find(user => user.email === email);

        if(userExists){
            res.status(400).send("El usuario existe, por favor inicia sesión con tus credenciales");
        }

        const encryptedPassword = await hash(password, 10);
        newUser = User(name, email, encryptedPassword);

        users = [...users, newUser];

    }catch(err){
        console.log("Ha ocurrido un error", err);
    }

    return res.status(201).json(newUser);
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!(email && password)){
            res.status(400).send("Indica email y contraseña");
        }

        const user = users.find(us => us.email === email);

        console.log(user, users);
        if(user && (await compare(password, user.password))){
            const token = sign({email}, TOKEN_KEY, {expiresIn: "2h"})
            user.token = token;
            res.status(200).json(user);
        }else{
            res.status(403).send("Credenciales inválidas");
        }
    }catch(err){
        console.log("Ha ocurrido un error", error);
    }
}

export default {register, login}
