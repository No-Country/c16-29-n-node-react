import persModel from "../models/PersModel.js";

//Metodos CRUD

//Mostrar todos los registros
export const getAllPers = async (req, res) => {
    try {
        const pers = await persModel.findAll()
        res.json(pers) 
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar un registro
export const getPers = async (req, res) => {
    try {
        const pers = await persModel.findAll({
            where:{id_number:req.params.id}
        })
        res.json(pers)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear un registro
export const createPers = async(req, res) => {
    console.log(req.body)
    try {
        await persModel.create(req.body)
        res.json({
            "message":"Registro creado correctamente"
        })
    } catch (error ) {
        res.json({message: error.message})
    }
}

//Actualizar
export const updatePers = async(req, res) => {
    try {
        persModel.update(req.body, {
            where: {id_number: req.params.id}
        })
    } catch (error) {
        res.json({
            "message":"Registro actualizado correctamente"
        })
    }
}


//Eliminar
export const deletePers = async(req, res) => {
    console.log(req.params.id)
    try {
        persModel.destroy({
            where: {id_number: req.params.id}
        })
    } catch (error) {
        res.json({message: error.message})
    }
}