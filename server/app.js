import express from "express";
import conversionRouter from "./routes/conversion_router.js";
import downloadRouter from "./routes/download_router.js";
import customErrorHandler from "./routes/custom_error_handler.js";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

/*Connect to MongoDB*/
try {
  await mongoose.connect(process.env.MONGO_HOSTNAME);
} catch (error) {
  console.log(error);
}

const app = express();

/*Use banch of middlewares*/
app.use(cors());
app.use(express.static(path.resolve('public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*Use routing system*/
app.use("/convert", conversionRouter);
app.use("/download", downloadRouter)
app.use(customErrorHandler)

app.listen(process.env.PORT || 3000);
