import {
  getMarks,
  getMarkById,
  getMarkByStudent,
  insertMark,
  updateMark,
  deleteMark,
} from "../services/mark.service.js";

export const getAllMarks = async (req, res) => {
  try {
    const marks = await getMarks();
    const RESPONSE = {
      count: marks.length,
      marks,
    };
    res.status(200).json(RESPONSE); 
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};
export const getMarkId = async (req, res) => {
  try {
    const MARK_ID = req.params;
    const mark = await getMarkById(MARK_ID);
    if(!mark || mark.length == 0){
      return res.status(404).json({Error: "no hay marks registradas"})
    }
    return res.status(200).json(mark);
  } catch (error) {
    return res.status(500).json({ Error: "Mark inexitente" });
  }
};
export const getMarkStudent = async (req, res) => {
  try {
    const MARK_STUDENT = req.params;
    const student = await getMarkByStudent(MARK_STUDENT);
    if( !student || student.length == 0 ){
      return res.status(404).json("No hay registros de este estudiante");
      }else{
        const RESPONSE = {
          count: student.length,
          student: student,
        };
        return res.status(200).json(RESPONSE);
    }
  } catch (error) {
    return res.status(500).json({ Error: error });
  }

};

export const createMark = async (req, res) => {
  try {
    const result = await insertMark({ ...req.body });
    if (result) {
      const SUCCESS_RESPONSE = " mark created successfully";
      return res.status(201).json({ msj: SUCCESS_RESPONSE });
    } else {
      const ERROR_RESPONSE = "Somethings wrong";
      return res.status(404).json({ msj: ERROR_RESPONSE });
    }
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};
export const upMark = async (req, res) => {
  try {
    const MARK_STUDENT = req.body.score;
    const result = await updateMark(MARK_STUDENT);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};
