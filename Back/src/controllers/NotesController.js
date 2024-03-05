import { NoteModel } from "../database/models/index.js";

//Metodos CRUD

//Mostrar todos los registros
export const getAllNotes = async (req, res) => {
  try {
    const notes = await NoteModel.findAll();
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
  console.log(req.body);
  try {
    await NoteModel.create(req.body);
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
    NoteModel.update(req.body, {
      where: { id: req.params.id },
    });
  } catch (error) {
    res.json({
      message: "Registro actualizado correctamente",
    });
  }
};

//Eliminar
export const deleteNotes = async (req, res) => {
  console.log(req.params.id);
  try {
    NoteModel.destroy({
      where: { id_number: req.params.id },
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
