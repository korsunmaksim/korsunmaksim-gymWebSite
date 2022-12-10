import Router from "express";
import {
  loginValidation,
  signupValidation,
} from "../validations/auth.validations.js";
import {
  getUserInfo,
  login,
  signup,
  updateInfo,
} from "../controllers/user.controller.js";

const authRouter = Router();

authRouter.post("/signup", signupValidation, signup);
authRouter.post("/login", loginValidation, login);
authRouter.post("/info", getUserInfo);
authRouter.patch("/", updateInfo);

export default authRouter;
