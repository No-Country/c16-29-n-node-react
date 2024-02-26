import { getSubject, getSubjectId, getSubjectsTeacherId , insertSubjects, modifySubject } from "../services/subject.service.js";

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
        const SUBJECT_RESPONSE = subjects.map(({ id, name, grade, divition }) => {
            return {
                id,
                name,
                grade,
                divition,
                detail: `/api/subjects/${id}`,
            };
        });
        const RESPONSE = {
            count: subjects.length,
            users: SUBJECT_RESPONSE,
        };
        return res.status(200).json(RESPONSE);
    } catch (error) {
        res.status(500).json({ Error: error });
    }
}
export const getSubjectById = async (req, res) => {
    try {
        const SUBJECT_ID = req.params.id;
        const subject = await getSubjectId(SUBJECT_ID);
        return res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ Error: error });
    }
}
export const getSubjectsByTeacherId = async (req, res) =>{
    try {
        const TEACHER_ID = req.user.teacher_id;
        const subjects = await getSubjectsTeacherId(TEACHER_ID);
        return res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ Error: error });
    }
}
export const createSubject = async (req, res) => {
    try {
        const result = await insertSubjects({ ...req.body });
        return res.status(201).json(result, { msg: `Created subject` });
    } catch (error) {
        return res.status(500).json({ Error: error });
    }
}
export const updateSubject = async (req, res) =>{
    try {
        const NEW_DATA = req.body;
        const result = await modifySubject(NEW_DATA);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ Error: error });
    }
};
