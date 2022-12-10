import { body } from "express-validator";

const productCreateValidation = [
  body("name", "Incorrect product name!").isString(),
  body("imageUrl", "Incorrect image url!").optional().isString(),
];

export { productCreateValidation };
