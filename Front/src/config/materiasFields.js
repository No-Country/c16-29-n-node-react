
export const materiasFields =(options)=> [
    {
        name: 'nombre',
        label: 'Nombre',
        type: 'text',
        validations: { required: true, isAlphabetic: true, minLength: 3 },
    },
    {
        name: 'grado',
        label: 'Grado',
        type: 'text',
        validations: { required: true, isAlphabetic: true, minLength: 3 },
    },
    {
        name: 'division',
        label: 'Division',
        type: 'text',
        validations: { required: true, isAlphabetic: true, minLength: 3 },
    },
    {       
            name: 'teacher',
            label: 'Profesor',
            type: 'select',
            options: options,
            targetField:'profesor',
    }
]

export default materiasFields;