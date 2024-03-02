import { where } from "sequelize";
import { SubjectModel, StudentSubject } from "../database/models/index.js";



/* CREATE TABLE `Subjects` (
    `id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
    `grade` varchar(255) NOT NULL,
    `divition` varchar(255) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
   */
export const getSubject = async () => {
  try {
    return await SubjectModel.findAll({
      attributes: ["id", "name", "grade", "divition"],
    });
  } catch (error) {
    console.error("Error while fetching subject:", error);
    throw new Error("Error fetching subject");
  }
};
export const getSubjectId = async (id) => {
  try {
    return await SubjectModel.findByPk(
      id ,{
        attributes: ["id", "name", "grade", "divition"],
      }
    );
  } catch (error) {
    console.error("Error while fetching subject:", error);
    throw new Error("Error fetching subject");
  }
};
export const findSubjectByName = async (name) =>{
    try {
      // Busca un sujeto por su título en la base de datos
       return await SubjectModel.findOne({
        where:{
          name 
        }
      });
    } catch (error) {
      throw new Error(`Error al buscar la materia por nombre: ${error.message}`);
    }
};
export const getSubjectsTeacherId = async (teacherId) => {
  try {
    /* [
    {
        "subject": "Nombre de la materia",
        "grade": "Grado de la materia",
        "divition": "Division de la materia",
        "students": [{
          "id": "Id del estudiante",
          "name": "Nombre y apellido del estudiante"
        }],
        "teachers": [{
          "id": "Id del profesor",
          "name": "Nombre y apellido del profesor"
        }]
    }
] */
    return await SubjectModel.findOne(teacherId, {
          where: {
            teacherId, 
          }
        },
    );
  } catch (error) {
    console.error(
      "Error al obtener la informacion de las asignaturas del profesor",
      error
    );
    throw new Error(" error al buscar la materia");
  }
};
export const insertSubjects = async (subjectData) => {
  /* POST /api/subjects [PRINCIPAL] */
  try {
    return await SubjectModel.create(subjectData);
  } catch (error) {
    console.error("Error while insert subject:", error);
    throw new Error("Error insert subject");
  }
};
export const modifySubject = async (id , subjectData) => {
  /* PUT /api/subjects/:id [PRINCIPAL] */
  try {
    return await SubjectModel.update( subjectData  , {where: { id }});
  } catch (error) {
    console.error("Error while update subject:", error);
    throw new Error("Error update subject");
  }
};
export const getStudentsCountBySubjectId = async (subjectId) => {
  try {
    // Busca en la tabla pivot para obtener los registros que corresponden a la materia
    const studentSubjectRecords = await StudentSubject.findAll({
      where: { subject_id: subjectId }
    });

    // Verifica si hay registros en la tabla pivot
    if (!studentSubjectRecords || studentSubjectRecords.length === 0) {
      return "no hay estudiantes asignados a esta materia"; // Retorna 0 si no hay registros
    }

    // Calcula la cantidad de estudiantes contando los registros de la tabla pivot
    const studentsCount = studentSubjectRecords.length;
    return studentsCount;
  } catch (error) {
    throw new Error(`Error al obtener la cantidad de estudiantes: ${error.message}`);
  }
};


/* export default {
    getSubject,
    getSubjectId,
    getSubjectsTeacherId,
    insertSubjects,
    modifySubject
}; */
