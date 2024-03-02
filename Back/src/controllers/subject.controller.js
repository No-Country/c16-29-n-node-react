import {
  getSubject,
  getSubjectId,
  getSubjectsTeacherId,
  insertSubjects,
  modifySubject,
  findSubjectByName,
  getStudentsCountBySubjectId
} from "../services/subject.service.js";
import { encrypt } from "../middlewares/encrypt.js";
import { hashSync } from "bcrypt";
import { SubjectModel, UserModel } from "../database/models/index.js";



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
    console.log('subjectId:', id);
    const studentsCount = await getStudentsCountBySubjectId(id);
    return res.status(200).json({ studentsCount });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
}
