import { NonAttendanceModel, SubjectModel, UserModel } from "../database/models/index.js";
//Metodos CRUD

//Mostrar todos los registros
export const getCurrentNonAttendances = async (req, res) => {
  try {
    const id = req.user.id;

    const nonAttendances = await NonAttendanceModel.findAll({
      attributes: [
        "id",
        "date",
        "type",
        "note"
      ],
      where: {
        teacher_id: id
      },
      include: {
        as: "student",
        model: UserModel,
        attributes: [
          "id",
          "first_name",
          "last_name",
          "fullName"
        ]
      }
    });
    res.json(nonAttendances);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Mostrar un registro
export const getNonAttendances = async (req, res) => {
  try {
    const attendances = await attendancesModel.findAll({
      where: { id: req.params.id },
    });
    res.json(attendances);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Crear un registro
export const createNonAttendances = async (req, res) => {
  try {
    const id = req.user.id;
    const students = req.body.students;

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
    const { isTeacher, studentsIn } = subject.users.reduce((acc, { id: currentId }) => {
      if(currentId == id){
        acc.isTeacher = true;
      } else if(students.includes(currentId)){
        acc.studentsIn.push(currentId);
      }
      return acc;
    },{
      isTeacher: false,
      studentsIn: []
    })

    if(!isTeacher) throw new Error("El profesor no pertenece a la materia");
    if(studentsIn.length !== students.length) throw new Error("Un estudiante ingresado no pertenece a la materia");

    await NonAttendanceModel.bulkCreate(studentsIn.map((student_id) => ({
      ...req.body,
      teacher_id: id,
      student_id
    })));

    res.json({
      message: "Registros creados correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Actualizar
export const updateNonAttendances = async (req, res) => {
  try {
    attendancesModel.update(req.body, {
      where: { id: req.params.id },
    });
  } catch (error) {
    res.json({
      message: "Registro actualizado correctamente",
    });
  }
};

//Eliminar
export const deleteNonAttendances = async (req, res) => {
  console.log(req.params.id);
  try {
    NonAttendanceModel.destroy({
      where: { id_number: req.params.id },
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
