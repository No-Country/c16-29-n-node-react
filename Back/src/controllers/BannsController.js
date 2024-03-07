import { BannModel, SubjectModel, UserModel } from "../database/models/index.js";

//Metodos CRUD

//Mostrar todos los registros
export const getCurrentBanns = async (req, res) => {
  try {
    const id = req.user.id;

    const notes = await BannModel.findAll({
      attributes: [
        "id",
        "date",
        "reason",
        "type",
        "note"
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
export const getBanns = async (req, res) => {
  try {
    const banns = await BannModel.findAll({
      where: { id: req.params.id },
    });
    res.json(banns);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Crear un registro
export const createBanns = async (req, res) => {
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

    await BannModel.create({
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
export const updateBanns = async (req, res) => {
  try {
    const id = req.params.id
    const teacherId = req.user.id;

    if(!id) throw new Error("Se debe enviar el id de la amonestacion a modificar");

    const bann = await BannModel.findByPk(id, {
      include: {
        as: "teacher",
        model: UserModel,
        where: {
          id: teacherId
        }
      }
    })

    if(!bann) throw new Error("El profesor no pertenece a la materia de la amonestacion");
    await BannModel.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({
      message: "Registro actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Eliminar
export const deleteBanns = async (req, res) => {
  try {
    const id = req.params.id
    const teacherId = req.user.id;

    if(!id) throw new Error("Se debe enviar el id de la amonestacion a modificar");

    const bann = await BannModel.findByPk(id, {
      include: {
        as: "teacher",
        model: UserModel,
        where: {
          id: teacherId
        }
      }
    })

    if(!bann) throw new Error("El profesor no pertenece a la materia de la amonestacion");
    await BannModel.destroy({
      where: { 
        id 
      }
    });
    res.json({
      message: "Amonestacion eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
