import { UserModel, NoteModel, SubjectModel, BannModel, ExamModel, MarkModel, NonAttendanceModel } from "../database/models/index.js";
import {StudentTutorModel} from "../database/models/associations.js"
import { encrypt, verified } from "../middlewares/encrypt.js";
import { compare } from "bcrypt";

//Metodos CRUD

//Mostrar todos los registros
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: [
        "id",
        "username",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
      ],
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAllStudentsByGrade = async (req, res) => {
  try {
    const grade = req.params.grade;

    const users = await UserModel.findAll({
      where: {
        grade,
        role: "STUDENT"
      },
      attributes: [
        "id",
        "grade",
        "username",
        "fullName",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
      ],
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
}

//Mostrar todos los registros por role
export const getAllUsersxRole = async (req, res) => {
  try {
    let attributes = [];
    let include = [];
    if (req.body.role === "STUDENT") {
      attributes = [
        "id",
        "role",
        "username",
        ["first_name", "firstName"],
        ["last_name", "lastName"],
        "email",
        "phone",
        "grade",
      ];
      include = [
        {
          as: "tutors",
          model: UserModel,
          attributes: [
            "id",
            "fullName",
            "first_name",
            "last_name"
          ]
        },
        {
          as: "subjects",
          model: SubjectModel,
          attributes: [
            "id",
            "name",
            "grade",
            "divition",
            "fullName"
          ]
        }
      ]
    } else if(req.body.role === "TUTOR") {
      attributes = [
        "id",
        "username",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
      ];
      include = [
        {
          as: "students",
          model: UserModel,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "fullName"
          ]
        }
      ]
    } else if(req.body.role === "TEACHER"){
      attributes = [
        "id",
        "username",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
      ];
      include = [
        {
          as: "subjects",
          model: SubjectModel,
          attributes: [
            "id",
            "name",
            "grade",
            "divition",
            "fullName"
          ]
        }
      ]
    } else {
      throw new Error("Debes especificar un rol")
    }
    const users = await UserModel.findAll({
      attributes: attributes,
      where: { role: req.body.role },
      include: include,
    });
    console.log(users);
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Mostrar todos los registros por role
export const getAllUsersxNote = async (req, res) => {
  try {
    let attributes = [];
    let include = [];
    if (req.body.role === "STUDENT") {
      attributes = [
        "username",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
        "grade",
      ];
      include = NoteModel
    } else {
      attributes = [
        "username",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
      ];
    }
    const users = await UserModel.findAll({
      attributes: attributes,
      where: { role: req.body.role },
      include: include,
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Mostrar todos los registros por grado
export const getAllUsersxGrade = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      where: { grade: req.body.grade },
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Mostrar un registro
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      where: { username: req.body.username },
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Crear un registro
export const createUsers = async (req, res) => {
  try {
    const role = req.body.role;
    let pass = req.body.password;
    let hpass = await encrypt(pass);
    req.body.password = hpass;
    if(role === "STUDENT" && req.body.grade.trim() === "") throw new Error("Estudiante debe tener grado")
    const user = await UserModel.create(req.body);
    if(role === "TEACHER" && req.body.subjects && req.body.subjects.length !== 0){
      await Promise.all(req.body.subjects.map(async (subject) => {
        if(subject.id){
          await user.addSubjects(subject.id);
        }
      }))
    } else if(role === "STUDENT" && req.body.tutors && req.body.tutors.length !== 0){
      await Promise.all(req.body.tutors.map(async (tutor) => {
        if(tutor.id){
          await user.addTutors(tutor.id);
        }
      }))
    } else if(role === "TUTOR" && req.body.students && req.body.students.length !== 0){
      await Promise.all(req.body.students.map(async (student) => {
        if(student.id){
          console.log(student.id)
          await user.addStudents(student.id);
        }
      }))
    }
    res.json({
      message: "Registro creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Crear un registro por subject
export const createUsersSubject = async (req, res) => {
  console.log(req.body);
  try {    
    let pass = req.body.password;
    if(pass){      
      let hpass = await encrypt(pass);
      req.body.password = hpass;
    }
    await UserModel.create(req.body, {
      include: SubjectModel
    });
    res.json({
      message: "Registro creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Crear un registro por subject y Tutor
export const createUsersSubjectTutor = async (req, res) => {
  console.log(req.body);
  try {    
    let pass = req.body.password;
    if(pass){      
      let hpass = await encrypt(pass);
      req.body.password = hpass;
    }
    await UserModel.create(req.body, {
      include: [SubjectModel, StudentTutorModel]
    });
    res.json({
      message: "Registro creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Actualizar
export const updateUsers = async (req, res) => {
  try {
    let pass = req.body.password;
    if (pass) {
      let pass = req.body.password;
      let hpass = await encrypt(pass);
      req.body.password = hpass;
    }

    await UserModel.update(req.body, {
      where: { username: req.body.username },
    });

    res.json({
      message: "Registro actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Actualizar user con subject
export const updateUsersSubject = async (req, res) => {
  try {
    const id = req.params.id
    let pass = req.body.password;
    if (pass) {
      let pass = req.body.password;
      let hpass = await encrypt(pass);
      req.body.password = hpass;
    }

    await UserModel.update(req.body, {
      where: { id },
      include: SubjectModel
    });
    const user = await UserModel.findByPk(id);

    if(user.role === "TEACHER" && Array.isArray(req.body.subjects)){
      const actual = await user.getSubjects();
      await user.removeSubjects(actual.map((subject) => subject.id))
      await Promise.all(req.body.subjects.map(async (subject) => {
        if(subject.id){
          await user.addSubjects(subject.id);
        }
      }))
    } else if(user.role === "STUDENT" && Array.isArray(req.body.tutors)){
      const actual = await user.getTutors();
      await user.removeTutors(actual.map((tutor) => tutor.id))
      await Promise.all(req.body.tutors.map(async (tutor) => {
        if(tutor.id){
          await user.addTutors(tutor.id);
        }
      }))
    } else if(user.role === "TUTOR" && Array.isArray(req.body.students)){
      const actual = await user.getStudents();
      await user.removeStudents(actual.map((student) => student.id))
      await Promise.all(req.body.students.map(async (student) => {
        if(student.id){
          await user.addStudents(student.id);
        }
      }))
    }

    res.json({
      message: "Registro actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Eliminar
export const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    if(!id) throw new Error("Debe enviarse un id del usuario a eliminar");

    const user = await UserModel.findByPk(id);

    const hasSubject = (await user.getSubjects()).length > 0;
    const hasTutor = (await user.getTutors()).length > 0;
    const hasStudent = (await user.getStudents()).length > 0;

    if(hasSubject) throw new Error("El usuario tiene materias relacionados, no se puede eliminar");
    if(hasTutor) throw new Error("El usuario tiene tutores relacionados, no se puede eliminar");
    if(hasStudent) throw new Error("El usuario tiene usuarios relacionados, no se puede eliminar");

    user.destroy();

    return res.json({
      message: "El usuario se elimino correctamente"
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Validacion de usuario
export const validateUser = async (username) => {
  let user = {};
  try {
    const resUser = await UserModel.findOne({
      attributes: ["role", "password" , "id"],
      where: { username: username },
    });

    if (resUser) {
      user.role = resUser.dataValues.role;
      user.passHash = resUser.dataValues.password;
      user.id =  resUser.dataValues.id;

      return user;
    } else {
      return (user = {});
    }
  } catch (error) {
    return error.message;
  }
};
