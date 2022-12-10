import Router from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  removeProduct,
  updateProduct,
} from "../controllers/products.controller.js";
import { productCreateValidation } from "../validations/product.validations.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getOneProduct);
productRouter.post("/", productCreateValidation, createProduct);
productRouter.delete("/:id", removeProduct);
productRouter.patch("/:id", updateProduct);

export default productRouter;
