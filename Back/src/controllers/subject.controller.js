import {
  getSubject,
  /* getSubjectId, */
  insertSubjects,
  modifySubject,
  findSubjectByName,
  getStudentsCountBySubjectName,
  getTeacherCountBySubjectName ,
  getUsersByRoleAndSubjectName,

} from "../services/subject.service.js";
import { encrypt } from "../middlewares/encrypt.js";
import { hashSync } from "bcrypt";
import { SubjectModel,} from "../database/models/index.js";



/* CREATE TABLE `Subjects` (
    `id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
    `grade` varchar(255) NOT NULL,
    `divition` varchar(255) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
   */
export const getSubjects = async (req, res) => {
  try {
    const subjects = await getSubject();
    const RESPONSE = {
      count: subjects.length,
      subjects,
      /* detail: `/api/subjects/${subjects[0].id}` */
    };
    return res.status(200).json(RESPONSE);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};
export const getSubjectByName = async (req, res) => {
  try {
    // Extraer el nombre de la asignatura del cuerpo de la solicitud o de los parámetros de la ruta
    const { name } = req.params; 
    // Buscar la asignatura por su nombre utilizando la función findSubjectByName
    const subject = await findSubjectByName(name);
    // Verificar si se encontró la asignatura
    if (!subject ) {
      return res.status(404).json({ error: 'no existe asignatura con ese nombre' });
    }
    // Si se encontró la asignatura, enviarla como respuesta
    return res.status(200).json(subject);
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso
    console.error('Error al buscar la asignatura:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

/* export const getSubjectById = async (req, res) => {
  try {
    const SUBJECT_ID = req.params.id;
    const subject = await getSubjectId(SUBJECT_ID);
    return res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
}; *///estudiantes por materia
export const getStudentsCountBySubject = async (req, res) => {
  try {
    const { name } = req.params;
    /* console.log('subjectId:', id); */
    const studentsCount = await getStudentsCountBySubjectName(name);
    return res.status(200).json({ studentsCount });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getTeacherCountBySubject = async (req,res) =>{
  try { //maestros por materia
    const { name } = req.params;
    console.log("subjectName:" , name );
    const teacherCount = await getTeacherCountBySubjectName(name);
    return res.status(200).json({ teacherCount});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};
export const getAllSubjectsAndStudentsAndTeachers = async(req ,res)=>{
  try {
    const subjects = await getSubject();

    const subjectsWithCounts = await Promise.all(
      subjects.map(async (subject) => {
        const teachersCount = await getTeacherCountBySubjectId( subject.id, "TEACHER" );
        const studentsCount = await getStudentsCountBySubjectId( subject.id, "STUDENT");

        return{
          id: subject.id,
          name: subject.name,
          grade: subject.grade,
          divition: subject.divition,
          teachersCount,
          studentsCount
        };
      })
    );
    return res.status(200).json({ subjectsWithCounts})
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};
export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const existingSubject = await findSubjectByName(name);
    if(existingSubject){
      return res.status(400).json({ error : `La materia ${name} ya existe` });
    }else{
    const result = await insertSubjects({
         ...req.body,
        }
    );
    return res.status(201).json({ msg: `Created subject` });
    }
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};
export const updateSubject = async (req, res) => {
  try {
    const  { id } = req.params;
    const existingSubject = await getSubjectId(id);
    if (!existingSubject) {
      return res.status(404).json({ error: "no hay materias para este id"});
    }
    await modifySubject(id, req.body);
    return res.status(201).json({ message: "materia actualizada"});
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};
export const deleteSubject = async (req, res) =>{
  try {
    const destroySubject = req.params.id;
    const  { id } = req.params;
    const existingSubject = await getSubjectId(id);
    if(!existingSubject){
      return res.status(404).json({ error: "no se puede eliminar una materia inexistente"});
    }else{
      SubjectModel.destroy({
       where: { id: destroySubject}})
       return res.status(200).json({message: "materia eliminada"})
     }
  } catch (error) {
    return res.status(500).json({Error: error})
  }
};
