import Router from "express";
import {
  createTraining,
  getAllTrainings,
  getOneTraining,
  removeTraining,
  updateTraining,
} from "../controllers/trainings.controller.js";
import { trainingCreateValidation } from "../validations/training.validation.js";

const trainingRouter = Router();

trainingRouter.get("/", getAllTrainings);
trainingRouter.get("/:id", getOneTraining);
trainingRouter.post("/", trainingCreateValidation, createTraining);
trainingRouter.delete("/:id", removeTraining);
trainingRouter.patch("/:id", updateTraining);

export default trainingRouter;
