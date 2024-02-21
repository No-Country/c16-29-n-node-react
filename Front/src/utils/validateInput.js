import { isAlphabetic, isAlphaNumeric, isValidEmail,isValidPassword, isValidPhone, minLength } from '../utils/validation';

export const validateInput = (validations= {}, value) => {
    let errorMessage = '';
    if (validations.required && !value) {
      errorMessage = 'Este campo es obligatorio.';
    }
    else if (!validations.required && !value) {
     return errorMessage;
    } else if (validations.isAlphabetic && !isAlphabetic(value)) {
      errorMessage = 'Solo se permiten caracteres alfabéticos.';
    } else if (validations.isAlphaNumeric && !isAlphaNumeric(value)) {
      errorMessage = 'Solo se permiten caracteres alfanuméricos.';
    } else if (validations.isValidEmail && !isValidEmail(value)) {
      errorMessage = 'Debe ser un correo electrónico válido.';  
    } else if (validations.isValidPassword && !isValidPassword(value)){
      errorMessage= 'La contraseña no cumple con los requisitos';
    } else if (validations.isValidPhone && !isValidPhone(value)) {
      errorMessage = 'Debe ser un teléfono válido.';
    } else if (validations.minLength && !minLength(value, validations.minLength)) {
      errorMessage = `Debe tener más de ${validations.minLength} caracteres.`;
    }
    return errorMessage;
}

export default validateInput