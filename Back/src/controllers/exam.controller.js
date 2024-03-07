import { ExamModel } from "../database/models/ExamModel.js";
import { SubjectModel } from "../database/models/SubjectModel.js";
import { UserModel } from "../database/models/UserModel.js";
import { getAllExams, insertExam } from "../services/exam.service.js";

export const getExams = async (req, res) => {
  try {
    const exams = await getAllExams();
    const RESPONSE = {
      count: exams.length,
      exams,
    };
    return res.status(200).json(RESPONSE);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};
export const createExam = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const subject = await SubjectModel.findOne({
      where: {
        id: req.body.subject_id,
      },
      include: [
        {
          as: "users",
          model: UserModel,
          attributes: ["id"],
        },
      ],
    });

    if (!subject) throw new Error("La materia no existe");
    const { isTeacher } = subject.users.reduce(
      (acc, { id: currentId }) => {
        if (currentId == teacherId) {
          acc.isTeacher = true;
        }
        return acc;
      },
      {
        isTeacher: false,
      }
    );

    if (!isTeacher) throw new Error("El profesor no pertenece a la materia");

    await ExamModel.create({
      ...req.body,
      teacher_id: teacherId
    });

    res.json({
      message: "Se creo el examen correctamente",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ Error: error });
  }
};

export const updateExam = async (req, res) => {
  try {
    const id = req.params.id
    const teacherId = req.user.id;

    if(!id) throw new Error("Se debe enviar el id del examen a modificar");

    const exam = await ExamModel.findByPk(id, {
      include: {
        as: "teacher",
        model: UserModel,
        where: {
          id: teacherId
        }
      }
    })

    if(!exam) throw new Error("El profesor no pertenece a la materia del examen");
    await ExamModel.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({
      message: "Examen actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const getCurrentExams = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const exams = await ExamModel.findAll({
      attributes: [
        "id",
        "title",
        "note",
        "date"
      ],
      where: {
        teacher_id: teacherId
      },
      include: {
        as: "subject",
        model: SubjectModel,
        attributes: [
          "id",
          "name",
          "grade",
          "divition",
          "fullName"
        ],
        include: {
          as: "users",
          model: UserModel,
          where: {
            role: "STUDENT" 
          },
          attributes: [
            "id",
            "first_name",
            "last_name",
            "fullName"
          ],
          through: {
            attributes: []
          }
        }
      }
    })
    
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error });
  }
} 

export const deleteExam = async (req, res) => {
  try {
    const id = req.params.id
    const teacherId = req.user.id;

    if(!id) throw new Error("Se debe enviar el id del examen a modificar");

    const exam = await ExamModel.findByPk(id, {
      include: {
        as: "teacher",
        model: UserModel,
        where: {
          id: teacherId
        }
      }
    })

    if(!exam) throw new Error("El profesor no pertenece a la materia del examen");
    await ExamModel.destroy({
      where: { id }
    });
    res.json({
      message: "Examen eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
} 