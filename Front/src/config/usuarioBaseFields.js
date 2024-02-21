
export const usuarioBaseFields = [
    {
        name: 'nombre',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Ingrese el nombre',
        validations: { required: true, isAlphabetic: true, minLength: 3 },
    },
    {
        name: 'apellido',
        label: 'Apellido',
        type: 'text',
        placeholder: 'Ingrese el apellido',
        validations: { required: true, isAlphabetic: true, minLength: 3 },
    },
    {  
        name: 'usuario',
        label: 'Usuario',
        type: 'text',
        placeholder: 'Ingrese el usuario',
        validations: { required: true, isAlphaNumeric: true, minLength: 6 },
    },
    {
        name: 'contrasenia',
        label: 'Contraseña',
        type: 'password',
        placeholder: 'Ingrese la contraseña',
        validations: { required: true, isValidPassword: true, minLength: 6 },
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Ingrese el email',
        validations: { required: false, isValidEmail: true},
    },
    {
        name: 'celular',
        label: 'Celular',
        type: 'text',
        placeholder: 'Ingrese su celular',
        validations: { required: false, isValidPhone: true, minLength: 9 },
    }

    ];

    export default usuarioBaseFields;