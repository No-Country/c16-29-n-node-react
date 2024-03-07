import { NoteModel, SubjectModel, UserModel } from "../database/models/index.js";

//Metodos CRUD

//Mostrar todos los registros
export const getCurrentNotes = async (req, res) => {
  try {
    const id = req.user.id;

    const notes = await NoteModel.findAll({
      attributes: [
        "id",
        "date",
        "note",
        ["is_public", "isPublic"]
      ],
      where: {
        teacher_id: id
      },
      include: [
        {
          as: "student",
          model: UserModel,
          attributes: [
            "id",
            "fullName",
            "first_name",
            "last_name"
          ]
        },
        {
          as: "subject",
          model: SubjectModel,
          attributes: [
            "id",
            "fullName",
            "name",
            "grade",
            "divition"
          ]
        }
      ]
    });
    res.json(notes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Mostrar un registro
export const getNotes = async (req, res) => {
  try {
    const notes = await NoteModel.findAll({
      where: { id: req.params.id },
    });
    res.json(notes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Crear un registro
export const createNotes = async (req, res) => {
  try {
    const id = req.user.id;

    const subject = await SubjectModel.findOne({
        where: {
          id: req.body.subject_id
        },
        include: [
          {
            as: "users",
            model: UserModel,
            attributes: ["id"]
          }
        ]
      }
    );

    if(!subject) throw new Error("La materia no existe");
    const { isTeacher, isStudent } = subject.users.reduce((acc, { id: currentId }) => {
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

    await NoteModel.create({
      ...req.body,
      teacher_id: id
    });
    res.json({
      message: "Registro creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Actualizar
export const updateNotes = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const note = await NoteModel.findByPk(req.params.id, {
      include: {
        as: "teacher",
        model: UserModel,
        where: {
          id: teacherId
        }
      }
    })

    if(!note) throw new Error("El profesor no pertenece a la materia de la nota");
    await NoteModel.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({
      message: "Registro actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};

//Eliminar
export const deleteNotes = async (req, res) => {
  console.log(req.params.id);
  try {
    const teacherId = req.user.id;

    const note = await NoteModel.findByPk(req.params.id, {
      include: {
        as: "teacher",
        model: UserModel,
        where: {
          id: teacherId
        }
      }
    })

    if(!note) throw new Error("El profesor no pertenece a la materia de la nota");
    await NoteModel.destroy({
      where: { id: req.params.id }
    });
    res.json({
      message: "Nota eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
