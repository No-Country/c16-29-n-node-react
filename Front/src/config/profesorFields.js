import usuarioBaseFields from "./usuarioBaseFields"

export const profesorFields =(options)=> [
    ...usuarioBaseFields,
    {       
            name: 'materias',
            label: 'Materias Asociadas',
            type: 'select',
            options: options,
            targetField:'materias',
    }
]

export default profesorFields;