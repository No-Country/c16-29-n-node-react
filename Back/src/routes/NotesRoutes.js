import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createNotes,
  deleteNotes,
  getAllNotes,
  getNotes,
  updateNotes,
} from "../controllers/NotesController.js";

const notesRouter = Router();

notesRouter.get("/", getAllNotes);
notesRouter.get("/:id", getNotes);
notesRouter.post("/", createNotes);
notesRouter.put("/:id", updateNotes);
notesRouter.delete("/:id", deleteNotes);

export default notesRouter;
