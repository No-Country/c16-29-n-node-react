const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");
const { getMarkById, getMarks, createMark, updateMark , getMarkByStudent } = require("../controllers/mark.controller");

router
      .get("/", verifyToken  , getMarks )
      .get("/:id", verifyToken , getMarkById )
      .get("/current", verifyToken , getMarkByStudent )
      .post("/exams",  verifyToken ,createMark )
      .put("/:id", verifyToken , updateMark )


      module.exports = router;
    /*   POST /api/exams [TEACHER]
POST /api/exams/marks [TEACHER]
PUT /api/marks/:id [TEACHER]
GET /api/exams/current [TEACHER]
GET /api/exams/:id/marks [TEACHER]
GET /api/marks/current [TUTOR, STUDENT] */