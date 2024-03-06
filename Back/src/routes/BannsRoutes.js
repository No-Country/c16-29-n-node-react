import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createBanns,
  deleteBanns,
  getCurrentBanns,
  updateBanns,
} from "../controllers/BannsController.js";
import { createBannValidationRules, updateBannValidationRules } from "../validations/bann.validator.js";
import validate from "../validations/index.validator.js";

const bannsRouter = Router();

bannsRouter.get("/current", verifyToken, getCurrentBanns);
bannsRouter.post("/", verifyToken, createBannValidationRules(), validate, createBanns);
bannsRouter.put("/:id", verifyToken, updateBannValidationRules(), validate, updateBanns);
bannsRouter.delete("/:id", verifyToken, deleteBanns);

export default bannsRouter;
