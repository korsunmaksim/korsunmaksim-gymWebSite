import { body } from "express-validator";

const trainingCreateValidation = [
  body("name", "Incorrect training name!").isString().isLength({ min: 10 }),
  body("pdfUrl", "Incorrect pdf url!").optional().isString(),
];

export { trainingCreateValidation };
