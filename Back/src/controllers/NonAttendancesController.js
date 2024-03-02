import { NonAttendanceModel } from "../database/models/index.js";
//Metodos CRUD

//Mostrar todos los registros
export const getAllNonAttendances = async (req, res) => {
  try {
    const nonAttendances = await NonAttendanceModel.findAll();
    res.json(attendances);
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
  console.log(req.body);
  try {
    await attendancesModel.create(req.body);
    res.json({
      message: "Registro creado correctamente",
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
