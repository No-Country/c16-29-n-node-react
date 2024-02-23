


/*   GET /api/subjects/current [TEACHER] */
/* GET /api/subjects/:id [PRINCIPAL, TEACHER] */
/* GET /api/subjects [PRINCIPAL] */
/* DELETE /api/subjects/:id [PRINCIPAL] */
/* POST /api/subjects [PRINCIPAL] */
/* PUT /api/subjects/:id [PRINCIPAL] */


  const { Subject } = require("../database/models");

  const getSubjets = async () => {/* GET /api/subjects [PRINCIPAL] */
    try {
        return await Subject.findAll({
            include:[
                {association: "students" },
                {association: "teachers" },
            ]
        })
    } catch (error) {
        console.error("Error while fetching subject:", error);
    throw new Error("Error fetching subject");
    }
};
  const getSubjectById =  async (id) => {/* GET /api/subjects/:id [PRINCIPAL, TEACHER] */
    try {
        return await Subject.findByPk(id, {
            include: [
                {association: "students"},
                { association : 'teachers'} ,
            ]
        });
    } catch (error) {
        console.error("Error while fetching subject:", error);
        throw new Error("Error fetching subject");
    }
  };
  const getSubjectsByTeacherId = async (teacherId) =>{/*   GET /api/subjects/current [TEACHER] */
    try {
        return await Subject.findOne(
            {
                where: {
                    teacher_id: teacherId,
                }
            }
        )
       } catch (error) {
           console.error('Error al obtener la informacion de las asignaturas del profesor', error);
           throw new Error(" error al buscar la materia");
       }
    };
  const insertSubjects = async (subjectData) =>{/* POST /api/subjects [PRINCIPAL] */
    try {
        return await Subject.create(subjectData)
    } catch (error) {
        console.error("Error while insert subject:", error);
        throw new Error("Error insert subject");
    }
  };
  const updateSubject = async (subjectData)=>{ /* PUT /api/subjects/:id [PRINCIPAL] */
    try {
        return await Subject.update(subjectData, {
            where: { id: subjectData.id}
        })
    } catch (error) {
        console.error("Error while update subject:", error);
        throw new Error("Error update subject");
    }
  };

module.exports = {
    getSubjets,
    getSubjectById,
    getSubjectsByTeacherId,
    insertSubjects,
    updateSubject
};

