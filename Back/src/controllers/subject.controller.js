import {
  getSubject,
  getSubjectId,
  insertSubjects,
  modifySubject,
  findSubjectByName,
  getStudentsCountBySubjectId,
  getTeacherCountBySubjectId ,
  getUsersByRoleAndSubjectId,

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
export const getSubjectById = async (req, res) => {
  try {
    const SUBJECT_ID = req.params.id;
    const subject = await getSubjectId(SUBJECT_ID);
    return res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};//estudiantes por materia
export const getStudentsCountBySubject = async (req, res) => {
  try {
    const { id } = req.params;
    /* console.log('subjectId:', id); */
    const studentsCount = await getStudentsCountBySubjectId(id);
    return res.status(200).json({ studentsCount });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Materia con estudiantes por fullName
export const getStudentsBySubjectFullName = async (req, res) => {
  try {
    const { name, grade, divition } = req.params;
    
    const subject = await SubjectModel.findOne({
      where: {
        name,
        grade,
        divition
      }
    });

    if(!subject) throw new Error("La materia no ha sido encontrada");
    
    const users = await subject.getUser({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "fullName",
        "grade",
        "role"
      ]
    });
    const students = users.filter((user) => user.role === "STUDENT");

    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getTeacherCountBySubject = async (req,res) =>{
  try { //maestros por materia
    const {id} = req.params;
    console.log("subjectId:" , id );
    const teacherCount = await getTeacherCountBySubjectId(id);
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
export const assignSubjectToUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const students = req.body;
    if(!id) throw new Error("Se debe enviar el id de la materia");
    if(!students || !Array.isArray(students)) throw new Error("Se debe enviar los id's de los alumnos a asignar");

    const subject = await SubjectModel.findByPk(id);

    const users = await subject.getUser();
    const studentsInSubject = users.filter((user) => {
      return user.role === "STUDENT"
    })
    if(studentsInSubject.length + students.length > 30) throw new Error("No pueden haber mas de 30 estudiantes en una materia");

    await subject.addUser(students);

    return res.status(201).json({ message: "materia actualizada"});
  } catch (error) {
    console.log(error) 
    return res.status(500).json({ Error: error });
  }
};

export const deassignUserFromSubject = async (req, res) => {
  try {
    const { subjectId, userId } = req.params;
    if(!subjectId) throw new Error("Se debe enviar el id de la materia");
    if(!userId) throw new Error("Se debe enviar el id del alumno a desasignar");

    const subject = await SubjectModel.findByPk(subjectId);

    await subject.removeUser(userId);

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
