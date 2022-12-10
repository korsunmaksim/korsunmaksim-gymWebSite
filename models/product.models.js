import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
