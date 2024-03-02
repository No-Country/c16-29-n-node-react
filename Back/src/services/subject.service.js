import { SubjectModel } from "../database/models/index.js";

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
export const modifySubject = async (subjectData) => {
  /* PUT /api/subjects/:id [PRINCIPAL] */
  try {
    return await SubjectModel.update(subjectData, {
      where: { id: subjectData.id },
    });
  } catch (error) {
    console.error("Error while update subject:", error);
    throw new Error("Error update subject");
  }
};

/* export default {
    getSubject,
    getSubjectId,
    getSubjectsTeacherId,
    insertSubjects,
    modifySubject
}; */
