import usersModel from "../database/models/UsersModel.js";
import { encrypt, verified } from "../middlewares/encrypt.js";
import { compare } from "bcrypt";

//Metodos CRUD

//Mostrar todos los registros
export const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.findAll({
            attributes: ['username','first_name','last_name','role','email','phone','created_at','updated_at']
        })
        res.json(users) 
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar todos los registros por role
export const getAllUsersxRole = async (req, res) => {
    try {
        let attributes = []
        if(req.body.role === 'STUDENT'){
            attributes = ['username','first_name','last_name','role','email','phone','grade','created_at','updated_at']
        }else{
            attributes = ['username','first_name','last_name','role','email','phone','created_at','updated_at']
        }
        const users = await usersModel.findAll({
            attributes: attributes,
            where:{role:req.body.role}
        })
        res.json(users) 
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar todos los registros por grado
export const getAllUsersxGrade = async (req, res) => {
    try {
        const users = await usersModel.findAll({
            where:{grade:req.body.grade}
        })
        res.json(users) 
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar un registro
export const getUsers = async (req, res) => {
    try {
        const users = await usersModel.findAll({
            where:{username:req.body.username}
        })
        res.json(users)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear un registro
export const createUsers = async(req, res) => {
    
    console.log(req.body)
    try {       
        let pass =  req.body.password;
        let hpass = await encrypt(pass);
        req.body.password = hpass;
        let subjects = req.body.subjects[0];
        delete req.body.subjects

        console.log(req.body, subjects)
        await usersModel.create(req.body)
        res.json({
            "message":"Registro creado correctamente"
        })
    } catch (error ) {
        res.json({message: error.message})
    }
}

//Actualizar
export const updateUsers = async(req, res) => {
    try {
        console.log(req.body)
        let pass =  req.body.password;
        if (pass){
            let pass =  req.body.password;
            let hpass = await encrypt(pass);
            req.body.password = hpass;
        }

        await usersModel.update(req.body, {
            where: {username: req.body.username}
        })

        res.json({
            "message":"Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}


//Eliminar
export const deleteUsers = async(req, res) => {
    try {
        usersModel.destroy({
            where: {id_number: req.params.id}     })
    } catch (error) {
        res.json({message: error.message})
    }
}

//Validacion de usuario 
export const validateUser = async (username) => {
    try {
        const resUser = await usersModel.findOne({
            attributes: ['role','password','username','first_name','last_name'],
            where:{username:username}
        })
        
        if(resUser){           
            return resUser.dataValues
        }else{
            return resUser
        }
  
    } catch (error) {
        return error.message
    }
  }
