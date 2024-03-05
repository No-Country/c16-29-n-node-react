
export const usuarioBaseFields = [
    {
        name: 'nombre',
        label: 'Nombre',
        type: 'text',
        validations: { required: true, isAlphabetic: true, minLength: 3 },
    },
    {
        name: 'apellido',
        label: 'Apellido',
        type: 'text',
        validations: { required: true, isAlphabetic: true, minLength: 3 },
    },
    {  
        name: 'usuario',
        label: 'Usuario',
        type: 'text',
        validations: { required: true, isAlphaNumeric: true, minLength: 6 },
    },
    {
        name: 'contrasenia',
        label: 'Contraseña',
        type: 'password',
        validations: { required: true, isValidPassword: true, minLength: 6 },
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        validations: { required: false, isValidEmail: true},
    },
    {
        name: 'celular',
        label: 'Celular',
        type: 'text',
        validations: { required: false, isValidPhone: true, minLength: 9 },
    }

    ];

    export default usuarioBaseFields;