const router = require("express").Router();
const { getSubjets, getSubjectById } = require("../controllers/subject.controller");
const verifyToken = require("../middlewares/jwt.middleware");

router
      .get("/", getSubjets)
      .get("/.id", getSubjectById)
      .get("/")