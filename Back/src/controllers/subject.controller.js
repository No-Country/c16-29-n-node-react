import {
  getSubject,
  getSubjectId,
  modifySubject,
  getStudentsCountBySubjectId,
  getTeacherCountBySubjectId ,
} from "../services/subject.service.js";
import { BannModel, NonAttendanceModel, NoteModel, SubjectModel, UserModel,} from "../database/models/index.js";



/* CREATE TABLE `Subjects` (
    `id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
    `grade` varchar(255) NOT NULL,
    `divition` varchar(255) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
   */
export const getSubjects = async (req, res) => {
  try {
    const subjects = await SubjectModel.findAll({
      attributes: [
        "id",
        "name",
        "grade",
        "divition"
      ],
      include: {
        as: "users",
        model: UserModel,
        attributes: [
          "id",
          "first_name",
          "last_name",
          "fullName",
          "role"
        ]
      }
    });

    const parsed = subjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
      grade: subject.grade,
      divition: subject.divition,
      teachers: subject.users.filter((user) => user.role === "TEACHER"),
      students: subject.users.filter((user) => user.role === "STUDENT"),
    }))
    return res.status(200).json(parsed);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const getCurrentSubjects = async (req, res) => {
  try {
    const id = req.user.id;

    const subjects = await SubjectModel.findAll({
      attributes: [
        "id",
        "name",
        "grade",
        "divition"
      ],
      include: {
        as: "users",
        model: UserModel,
        attributes: [
          "id",
          "first_name",
          "last_name",
          "fullName",
          "role"
        ],
        where: {
          id
        }
      }
    });

    const parsed = subjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
      grade: subject.grade,
      divition: subject.divition,
      teachers: subject.users.filter((user) => user.role === "TEACHER"),
      students: subject.users.filter((user) => user.role === "STUDENT"),
    }))
    return res.status(200).json(parsed);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const SUBJECT_ID = req.params.id;
    const subject = await SubjectModel.findByPk(SUBJECT_ID, {
      attributes: [
        "id",
        "name",
        "grade",
        "divition"
      ],
      include: [
        {
          attributes: [
            "id",
            "reason",
            "type",
            "note",
            "date"
          ],
          as: "banns",
          model: BannModel
        },
        {
          attributes: [
            "id",
            "date",
            "type",
            "note"
          ],
          as: "nonattendances",
          model: NonAttendanceModel
        },
        {
          attributes: [
            "id",
            "date",
            "note",
            ["is_public", "isPublic"]
          ],
          as: "notes",
          model: NoteModel
        }
      ]
    });

    if(!subject) throw new Error("La materia no fue encontrada");

    const users = await subject.getUsers({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "grade",
        "role"
      ]
    });

    const RESPONSE = {
      id: subject.id,
      name: subject.name,
      grade: subject.grade,
      divition: subject.divition,
      teachers: users.filter((user) => user.role === "TEACHER"),
      students: users.filter((user) => user.role === "STUDENT"),
    }
    return res.status(200).json(RESPONSE);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};//estudiantes por materia
export const getStudentsCountBySubject = async (req, res) => {
  try {
    const { id } = req.params;
    /* console.log('subjectId:', id); */
    const studentsCount = await getStudentsCountBySubjectId(id);
    return res.status(200).json({ studentsCount });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Materia con estudiantes por fullName
export const getStudentsBySubjectFullName = async (req, res) => {
  try {
    const { name, grade, divition } = req.params;
    
    const subject = await SubjectModel.findOne({
      where: {
        name,
        grade,
        divition
      }
    });

    if(!subject) throw new Error("La materia no ha sido encontrada");
    
    const users = await subject.getUsers({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "fullName",
        "grade",
        "role"
      ]
    });
    const students = users.filter((user) => user.role === "STUDENT");

    const RESPONSE = {
      id: subject.id,
      name: subject.name,
      grade: subject.grade,
      divition: subject.divition,
      students
    }

    return res.status(200).json(RESPONSE);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getTeacherCountBySubject = async (req,res) =>{
  try { //maestros por materia
    const {id} = req.params;
    console.log("subjectId:" , id );
    const teacherCount = await getTeacherCountBySubjectId(id);
    return res.status(200).json({ teacherCount});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};
export const getAllSubjectsAndStudentsAndTeachers = async(req ,res)=>{
  try {
    const subjects = await getSubject();

    const subjectsWithCounts = await Promise.all(
      subjects.map(async (subject) => {
        const teachersCount = await getTeacherCountBySubjectId( subject.id, "TEACHER" );
        const studentsCount = await getStudentsCountBySubjectId( subject.id, "STUDENT");

        return{
          id: subject.id,
          name: subject.name,
          grade: subject.grade,
          divition: subject.divition,
          teachersCount,
          studentsCount
        };
      })
    );
    return res.status(200).json({ subjectsWithCounts})
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};
export const createSubject = async (req, res) => {
  try {
    if(req.body.teachers){
      const teachers = await UserModel.findAll({
        where: {
          id: req.body.teachers,
          role: "TEACHER"
        }
      });
  
      if(teachers.length !== req.body.teachers.length) throw new Error("Un profesor no se encontro");
    }
    const founded = await SubjectModel.findOne({
      where: {
        name: req.body.name,
        grade: req.body.grade,
        divition: req.body.divition
      }
    })

    if(founded) throw new Error("La materia ya existe");

    const subject = await SubjectModel.create(req.body);

    if(req.body.teachers) await subject.addUsers(req.body.teachers);

    return res.status(201).json({ message: "La materia ha sido creada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateSubject = async (req, res) => {
  try {
    const id = req.params.id;

    if(req.body.teachers){
      const teachers = await UserModel.findAll({
        where: {
          id: req.body.teachers,
          role: "TEACHER"
        }
      });
  
      if(teachers.length !== req.body.teachers.length) throw new Error("Un profesor no se encontro");
    }
    const founded = await SubjectModel.findByPk(id, {
      include: {
        as: "users",
        model: UserModel
      }
    })

    if(!founded) throw new Error("La materia no existe");

    await SubjectModel.update(req.body, {
      where: {
        id
      }
    });

    if(req.body.teachers) {
      const teachers = founded.users
        .filter((user) => user.role === "TEACHER")  
        .map((user) => user.id);
      
      await founded.removeUsers(teachers);
      await founded.addUsers(req.body.teachers);
    }

    return res.status(201).json({ message: "La materia ha sido actualizada correctamente" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
export const assignSubjectToUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const students = req.body;
    if(!id) throw new Error("Se debe enviar el id de la materia");
    if(!students || !Array.isArray(students)) throw new Error("Se debe enviar los id's de los alumnos a asignar");

    const subject = await SubjectModel.findByPk(id);

    const users = await subject.getUsers();
    const studentsInSubject = users.filter((user) => {
      return user.role === "STUDENT"
    })
    if(studentsInSubject.length + students.length > 30) throw new Error("No pueden haber mas de 30 estudiantes en una materia");

    await subject.addUsers(students);

    return res.status(201).json({ message: "materia actualizada"});
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};

export const deassignUserFromSubject = async (req, res) => {
  try {
    const { subjectId, userId } = req.params;
    if(!subjectId) throw new Error("Se debe enviar el id de la materia");
    if(!userId) throw new Error("Se debe enviar el id del alumno a desasignar");

    const subject = await SubjectModel.findByPk(subjectId);

    await subject.removeUsers(userId);

    return res.status(201).json({ message: "materia actualizada"});
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};

export const deleteSubject = async (req, res) =>{
  try {
    const id = req.params.id;
    const existingSubject = await SubjectModel.findByPk(id, {
      include: {
        as: "users",
        model: UserModel
      }
    });
    if(!existingSubject){
      throw new Error("La materia no existe");
    }
    if(existingSubject.users.length > 0) throw new Error("No se puede eliminar una materia con profesores o alumnos");
    await SubjectModel.destroy({
      where: { id }})
      return res.status(200).json({message: "materia eliminada"})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};
