import attendancesModel from "../models/AttendancesModel.js";

//Metodos CRUD

//Mostrar todos los registros
export const getAllAttendances = async (req, res) => {
    try {
        const attendances = await attendancesModel.findAll()
        res.json(attendances) 
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar un registro
export const getAttendances = async (req, res) => {
    try {
        const attendances = await attendancesModel.findAll({
            where:{id:req.params.id}
        })
        res.json(attendances)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear un registro
export const createAttendances = async(req, res) => {
    console.log(req.body)
    try {
        await attendancesModel.create(req.body)
        res.json({
            "message":"Registro creado correctamente"
        })
    } catch (error ) {
        res.json({message: error.message})
    }
}

//Actualizar
export const updateAttendances = async(req, res) => {
    try {
        attendancesModel.update(req.body, {
            where: {id: req.params.id}
        })
    } catch (error) {
        res.json({
            "message":"Registro actualizado correctamente"
        })
    }
}


//Eliminar
export const deleteAttendances = async(req, res) => {
    console.log(req.params.id)
    try {
        attendancesModel.destroy({
            where: {id_number: req.params.id}
        })
    } catch (error) {
        res.json({message: error.message})
    }
}