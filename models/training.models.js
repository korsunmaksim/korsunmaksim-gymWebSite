import mongoose from "mongoose";
const trainingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    pdfUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Training", trainingSchema);
