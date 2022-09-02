import express from "express";
import conversionRouter from "./routes/conversion_router.js";
import downloadRouter from "./routes/download_router.js";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

try {
  await mongoose.connect("mongodb://localhost:27017/jpgtodocx");
} catch (error) {
  console.log(error);
}

const app = express();

app.use(cors());
app.use(express.static(path.resolve('public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/convert", conversionRouter);
app.use("/download", downloadRouter)

app.listen(process.env.PORT || 3000);
