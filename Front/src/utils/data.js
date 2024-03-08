export const colourOptions = [

  { value: 'ocean', label: 'Matematica', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Lengua', color: '#0052CC', isDisabled: false },
  { value: 'purple', label: 'Ciencias Sociales', color: '#5243AA' },
  { value: 'red', label: 'Ciencias Naturales', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Musica', color: '#FF8B00' },
  { value: 'yellow', label: 'Educacion Fisica', color: '#FFC400' },
  { value: 'green', label: 'Historia', color: '#36B37E' },
  { value: 'forest', label: 'Geografia', color: '#00875A' },
  { value: 'slate', label: 'Economia', color: '#253858' },
  { value: 'silver', label: 'Contabilidad', color: '#666666' },
]

export const numbers = [
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
  { label: 'Three', value: 'three' },
]

export const defaultArgs = {
  defaultMenuIsOpen: false,
  defaultValue: undefined,
  inputId: 'react-select-id',
  isClearable: true,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  menuPlacement: 'bottom',
  menuPortalTarget: undefined,
  options: colourOptions,
  placeholder: 'Select...',
}

export const nonAttendances = [
  {
    "id": 1,
    "type": "NON_ATTENDANCE",
    "date": "2024-03-01 08:00:00",
    "teacher_id": 1,
    "student_id": 1,
    "subject_id": 1,
    "created_at": "2024-03-01 12:00:00",
    "updated_at": null,
    "note": "no justificó su inasistencia"
  },
  {
    "id": 2,
    "type": "DELAYED",
    "date": "2024-03-02 08:30:00",
    "teacher_id": 2,
    "student_id": 2,
    "subject_id": 2,
    "created_at": "2024-03-02 12:30:00",
    "updated_at": null,
    "note": "no justificó su tardanza"
  },
  {
    "id": 3,
    "type": "NON_ATTENDANCE",
    "date": "2024-03-03 09:00:00",
    "teacher_id": 3,
    "student_id": 3,
    "subject_id": 3,
    "created_at": "2024-03-03 13:00:00",
    "updated_at": null
  },
  {
    "id": 4,
    "type": "DELAYED",
    "date": "2024-03-04 09:30:00",
    "teacher_id": 4,
    "student_id": 4,
    "subject_id": 4,
    "created_at": "2024-03-04 13:30:00",
    "updated_at": null
  },
  {
    "id": 5,
    "type": "NON_ATTENDANCE",
    "date": "2024-03-05 10:00:00",
    "teacher_id": 5,
    "student_id": 5,
    "subject_id": 5,
    "created_at": "2024-03-05 14:00:00",
    "updated_at": null
  }
];

export const teachers = [
  { id: 1, name: 'Profesor 1' },
  { id: 2, name: 'Profesor 2' },
  { id: 3, name: 'Profesor 3' },
  { id: 4, name: 'Profesor 4' },
  { id: 5, name: 'Profesor 5' },

];
export const students = [
  { id: 1, name: 'Estudiante 1' },
  { id: 2, name: 'Estudiante 2' },
  { id: 3, name: 'Estudiante 3' },
  { id: 4, name: 'Estudiante 4' },
  { id: 5, name: 'Estudiante 5' },

];
export const subjects = [
  { id: 1, name: 'Materia 1' },
  { id: 2, name: 'Materia 2' },
  { id: 3, name: 'Materia 3' },
  { id: 4, name: 'Materia 3' },
  { id: 5, name: 'Materia 5'}
];

//Función para buscar maestro, estudiante y materia por ID
function findById(collection, id) {
  return collection.find(item => item.id === id);
}

// Vinculando los datos de nonAttendances con teachers, students y subjects
const enrichedNonAttendances = nonAttendances.map(item => {
  const teacher = findById(teachers, item.teacher_id);
  const student = findById(students, item.student_id);
  const subject = findById(subjects, item.subject_id);

  // Puedes decidir si quieres reemplazar los _id con los objetos completos
  // o simplemente añadir nuevos campos para los objetos relacionados
  return {
    ...item,
    teacher, 
    student,
    subject,
  };
});



// Exportando los datos enriquecidos
export const enrichedData = {
  nonAttendances: enrichedNonAttendances,
  teachers,
  students,
  subjects,
};