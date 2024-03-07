import { ExamModel } from "../database/models/ExamModel.js";
import { MarkModel } from "../database/models/MarkModel.js";
import { SubjectModel } from "../database/models/SubjectModel.js";
import { UserModel } from "../database/models/UserModel.js";
import {
  getMarks,
  getMarkByStudent,
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
export const getMarkByExamId = async (req, res) => {
  try {
    const id = req.params.id;
    const teacherId = req.user.id;

    const exam = await ExamModel.findByPk(id)

    if(!exam) throw new Error("El examen no existe");

    const subject = await exam.getSubject({
      include: {
        as: "users",
        model: UserModel,
        where: {
          id: teacherId
        }
      }
    });

    if(!subject) throw new Error("El profesor no pertenece a la materia");

    const marks = await MarkModel.findAll({
      where: {
        exam_id: id,
      }
    })

    res.json(marks)
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    const id = req.user.id;

    const exam = await ExamModel.findOne({
      where: {
        id: req.body.exam_id
      },
      include: [
        {
          as: "subject",
          model: SubjectModel,
          attributes: ["id"],
          include: {
            as: "users",
            model: UserModel,
            attributes: ["id"]
          }
        }
      ]
    }
  );

  if(!exam) throw new Error("El examen no existe");
  const { isTeacher, isStudent } = exam.subject.users.reduce((acc, { id: currentId }) => {
    if(currentId == id){
      acc.isTeacher = true;
    } else if(currentId == req.body.student_id){
      acc.isStudent = true;
    }
    return acc;
  },{
    isTeacher: false,
    isStudent: false 
  })

  if(!isTeacher) throw new Error("El profesor no pertenece a la materia");
  if(!isStudent) throw new Error("El estudiante no pertenece a la materia");

  const mark = await MarkModel.create({
    ...req.body,
    teacher_id: id
  });

  res.json({
    message: "Se creo la calificacion correctamente"
  })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};

export const upMark = async (req, res) => {
  try {
    const id = req.params.id;
    const teacherId = req.user.id;

    const mark = await MarkModel.findOne({
      where: {
        id
      },
      include: [
        {
          as: "exam",
          model: ExamModel,
          attributes: ["id"],
          include: {
            as: "subject",
            model: SubjectModel,
            attributes: ["id"],
            include: {
              as: "users",
              model: UserModel,
              attributes: ["id"]
            }
          }
        }
      ]
    }
  );

  if(!mark) throw new Error("La calificacion no existe");
  const { isTeacher } = mark.exam.subject.users.reduce((acc, { id: currentId }) => {
    if(currentId == teacherId){
      acc.isTeacher = true;
    }
    return acc;
  }, {
    isTeacher: false
  })

  if(!isTeacher) throw new Error("El profesor no pertenece a la materia");

  await MarkModel.update(req.body, {
    where: {
      id
    }
  });

  res.json({
    message: "Se actualizó la calificacion correctamente"
  })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMark = async (req, res) => {
  try {
    const id = req.params.id;
    const teacherId = req.user.id;

    const mark = await MarkModel.findOne({
      where: {
        id
      },
      include: [
        {
          as: "exam",
          model: ExamModel,
          attributes: ["id"],
          include: {
            as: "subject",
            model: SubjectModel,
            attributes: ["id"],
            include: {
              as: "users",
              model: UserModel,
              attributes: ["id"]
            }
          }
        }
      ]
    }
  );

  if(!mark) throw new Error("La calificacion no existe");
  const { isTeacher } = mark.exam.subject.users.reduce((acc, { id: currentId }) => {
    if(currentId == teacherId){
      acc.isTeacher = true;
    }
    return acc;
  }, {
    isTeacher: false
  })

  if(!isTeacher) throw new Error("El profesor no pertenece a la materia");

  await MarkModel.destroy({
    where: {
      id
    }
  });

  res.json({
    message: "Se eliminó la calificacion correctamente"
  })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};