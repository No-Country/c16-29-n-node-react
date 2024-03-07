import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createNotes,
  deleteNotes,
  getCurrentNotes,
  getNotes,
  updateNotes,
} from "../controllers/NotesController.js";
import { createNoteValidationRules, updateNoteValidationRules } from "../validations/note.validator.js";
import validate from "../validations/index.validator.js";

const notesRouter = Router();

notesRouter.get("/current", verifyToken, getCurrentNotes);
notesRouter.get("/:id", verifyToken, getNotes);
notesRouter.post("/", verifyToken, createNoteValidationRules(), validate, createNotes);
notesRouter.put("/:id", verifyToken, updateNoteValidationRules(), validate, updateNotes);
notesRouter.delete("/:id", verifyToken, deleteNotes);

export default notesRouter;
