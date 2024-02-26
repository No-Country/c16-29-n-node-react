import Mark from "../database/models/Mark.js";


//sevicios pasa informacion de  la base de datos al controlador//
export const getMarks = async () => { /* POST /api/exams/marks [TEACHER] */
  try {                        
    return await Mark.findAll({
       attributes: [
        'id', 'score', "note", "subject_id", "studen_id", "teacher_id", "created_at" , "update_at" ]
    });//todos los usuarios
  } catch (error) {
    console.error("Error while fetching marks:", error);
    throw new Error("Error fetching marks");
  }
};

export const getMarkById = async (id) => {  
  try { /* GET /api/exams/:id/marks [TEACHER] */
    return await Mark.findByPk(id, {
      include: [
        { association: "Users"},
        { association: "Subjects"}
      ]
    });//usuario por id
  } catch (error) {
    console.error("Error while fetching mark:", error);
    throw new Error("Error fetching mark");
  }
};

export const getMarkByStudent = async (student_id) => { //GET /api/marks/current [TUTOR, STUDENT]
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

export const insertMark = async (markData) => {//agrega una mark // create
  try {
    return await Mark.create(markData);
  } catch (error) {
    console.error("Error while insert Mark:", error);
    throw new Error("Error insert Mark");
  }
};
 export const updateMark = async (scoreData) => {
  try {
    return await Mark.update(scoreData, { where: { id: student_id } });
  } catch (error) {
    console.error("Error while update mark:", error);
    throw new Error("Error update mark");
  }
}; 

 export const deleteMark = async (studentId) => { /* PUT /api/marks/:id [TEACHER] */
  try {
    return await Mark.destroy({ where: { id: studentId.id } });
  } catch (error) {
    console.error("Error while delete mark:", error);
    throw new Error("Error delete mark");
  }
}; 
