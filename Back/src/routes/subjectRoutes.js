const router = require("express").Router();
const { getSubjets, getSubjectById, getSubjectsByTeacherId, createSubject, updateSubject } = require("../controllers/subject.controller");
const verifyToken = require("../middlewares/jwt.middleware");

/*   GET /api/subjects/current [TEACHER] */
/* GET /api/subjects/:id [PRINCIPAL, TEACHER] */
/* GET /api/subjects [PRINCIPAL] */
/* DELETE /api/subjects/:id [PRINCIPAL] */ //no hay delete//
/* POST /api/subjects [PRINCIPAL] */
/* PUT /api/subjects/:id [PRINCIPAL] */
router
      .get("/",  getSubjets)
      .get("/:id",  verifyToken.principalTeacher, getSubjectById)
      .get("/current",  verifyToken ,getSubjectsByTeacherId)
      .post("/", verifyToken , createSubject)
      .put( "/:id", verifyToken,  updateSubject)
/*    .delete("/:id", deleteSubject); */

module.exports = router;