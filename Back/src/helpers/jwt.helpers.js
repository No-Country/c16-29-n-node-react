const jwt = require("jsonwebtoken");//requerimos el modulo jsonwebtoken
const process = require("process");//requerimos procces para sustraer información de otro archivo
const secret = process.env.JWT_SECRET; // sustraemos la varieable de entorno  JWT_SECRET que se encuentra en el .env

const generateToken = (user) => { // función de generar token
  try {
    const USER_DATA = {//objeto  con datos de usuario
        id: user.id,
        name: user.name,
        email: user.email,
    }
    const payload = {//carga util del usuario
        user: USER_DATA,
        exp: Date.now() + 60 * 10000, // tiempo de duración del payload
    }

    const token = jwt.sign({payload}, secret);// variable de token codificado recibe 2 parametros string y objeto

    return token; // return el token
  } catch (error) {
    console.error("Error al generar el token:", error);
    // Manejar el error de acuerdo a tus necesidades
    throw new Error("Error al generar el token");
  }
};

module.exports = {
  generateToken, //exportamos el token donde sea necesario
};
