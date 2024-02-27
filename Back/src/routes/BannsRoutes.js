import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createBanns,
  deleteBanns,
  getAllBanns,
  getBanns,
  updateBanns,
} from "../controllers/BannsController.js";

const bannsRouter = Router();

bannsRouter.get("/", verifyToken, getAllBanns);
bannsRouter.post("/", verifyToken, createBanns);
bannsRouter.put("/:id", verifyToken, updateBanns);
bannsRouter.delete("/:id", verifyToken, deleteBanns);

export default bannsRouter;
