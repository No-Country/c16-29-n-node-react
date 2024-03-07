
import { ExamModel, UserModel, SubjectModel, MarkModel } from "../database/models/index.js";

export const getAllExams = async () =>{
    try {
      return await ExamModel.findAll({
        include : [
          {model : UserModel },
          {model : MarkModel },
          {model : SubjectModel },
        ]
      })
    } catch (error) {
      console.error("Error while fetching exams:", error);
      throw new Error("Error fetching exams");
    }
  };
  export const insertExam = async (examData) =>{
    try {
        return await ExamModel.create(examData)
    } catch (error) {
        console.error("Error while created exam:", error);
        throw new Error("Error created exam")
    }
  };