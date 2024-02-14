import { Router } from "express";
import { createPers, deletePers, getAllPers, getPers, updatePers } from "../controllers/PersController.js";

const persRouter = Router()

persRouter.get('/', getAllPers)
persRouter.get('/:id', getPers)
persRouter.post('/', createPers)
persRouter.put('/:id', updatePers)
persRouter.delete('/:id', deletePers)

export default persRouter