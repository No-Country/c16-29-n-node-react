import { validationResult } from "express-validator";

/**
 * La función valida la solicitud y devuelve cualquier error como respuesta JSON.
 * @param req - req significa solicitud y es un objeto que contiene información sobre la solicitud HTTP
 * que se realizó, como los encabezados de la solicitud, los parámetros de la solicitud, el cuerpo de
 * la solicitud, etc.
 * @param res - `res` significa respuesta y es un objeto que representa la respuesta HTTP que envía una
 * aplicación Express cuando recibe una solicitud HTTP. Contiene métodos para enviar una respuesta al
 * cliente, como `res.send()`, `res.json()`, `res.status()`, etc. En el
 * @param next - `next` es una función que se llama para pasar el control a la siguiente función de
 * middleware en la pila. Por lo general, se usa para pasar a la siguiente función después de que la
 * función de middleware actual haya completado su tarea. En este caso, si no hay errores de
 * validación, se llama a la función `next()`
 * @returns La función `validar` se devuelve como una exportación de módulo.
 */
//consultar si dejarlo en el middlevare o como index.validator

const validate = (req, res, next) => {
  //middelware q ejecuta pedido respuesta y siguiente
  const errors = validationResult(req); //si no hay errores segui
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors.mapped(); //sino enevia los errores de validator result

  return res.status(422).json({
    //msj estado de error devuelve el objeto  con los errores
    errors: extractedErrors,
  });
};

export default validate;
