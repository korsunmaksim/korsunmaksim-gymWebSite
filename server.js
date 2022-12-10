import express from "express";
import config from "config";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import trainingRouter from "./routes/training.routes.js";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(express.json({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(cors());

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/trainings", trainingRouter);

const upload = multer({ storage });
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

const PORT = config.get("PORT") || 5000;

async function startServer() {
  try {
    await mongoose.connect(config.get("mongoConnect"), {});
    app.listen(PORT, (e) => {
      console.log(`Server has been started on the port:${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

startServer();
