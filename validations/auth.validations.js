import { body } from "express-validator";

const signupValidation = [
  body("email", "Incorrect email!").isEmail(),
  body("password", "Incorrect password!").isLength({ min: 5 }),
];

const loginValidation = [
  body("email", "Incorrect email!").isEmail(),
  body("password", "Enter password!").exists(),
];

export { signupValidation, loginValidation };
