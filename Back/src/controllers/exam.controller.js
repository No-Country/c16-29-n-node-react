import { getAllExams, insertExam } from "../services/exam.service.js"; 

export const  getExams = async(req, res) =>{
    try {
      const exams = await getAllExams();
      const RESPONSE = {
        count: exams.length,
        exams,
      }
      return res.status(200).json(RESPONSE);
    } catch (error) {
      res.status(500).json({Error: error})
    }
  };
  export const  createExam = async(req, res) =>{
    try {
        const EXAM_DATA = await insertExam({...req.body});
        if(EXAM_DATA){
            const OK_RESPONSE = " exam created succesfully";
            return res.status(201).json({msj:OK_RESPONSE});
        }else{
            const ERR_RESPONSE = "Somethings wrong";
            return res.status(404).json({ msj: ERR_RESPONSE})
        }
    } catch (error) {
        res.status(500).json({Error:error})
    }
  }