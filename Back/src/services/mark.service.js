
/*
POST /api/exams [TEACHER]
GET /api/exams/current [TEACHER]


 */
const { Mark } = require("../database/models");

//sevicios pasa informacion de  la base de datos al controlador//
const getMarks = async () => { /* POST /api/exams/marks [TEACHER] */
  try {                        
    return await Mark.findAll();//todos los usuarios
  } catch (error) {
    console.error("Error while fetching marks:", error);
    throw new Error("Error fetching marks");
  }
};

const getMarkById = async (id) => {  
  try { /* GET /api/exams/:id/marks [TEACHER] */
    return await Mark.findByPk(id);//usuario por id
  } catch (error) {
    console.error("Error while fetching mark:", error);
    throw new Error("Error fetching mark");
  }
};

const getMarkByStudent = async (student_id) => { //GET /api/marks/current [TUTOR, STUDENT]
  try {
    return await Mark.findOne({//busca un mark por id de estudiante
      where: {
        student_id,
      },
    });
  } catch (error) {
    console.error("Error while fetching mark:", error);
    throw new Error("Error fetching mark");
  }
};

const insertMark = async (markData) => {//agrega una mark // create
  try {
    return await Mark.create(markData);
  } catch (error) {
    console.error("Error while insert Mark:", error);
    throw new Error("Error insert Mark");
  }
};
 const updateMark = async (scoreData) => {
  try {
    return await Mark.update(scoreData, { where: { id: student_id } });
  } catch (error) {
    console.error("Error while update mark:", error);
    throw new Error("Error update mark");
  }
}; 

 const deleteMark = async (studentId) => { /* PUT /api/marks/:id [TEACHER] */
  try {
    return await Mark.destroy({ where: { id: studentId.id } });
  } catch (error) {
    console.error("Error while delete mark:", error);
    throw new Error("Error delete mark");
  }
}; 

module.exports = {
  getMarks,
  getMarkById,
  getMarkByStudent,
  insertMark,
  updateMark,
  deleteMark
}; /* metodos de los usuarios */