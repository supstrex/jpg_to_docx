import express from "express";
import { jpgToDoc } from "../controllers/conversion_controller.js";
import multer from "multer";
import uuid from "uuid";

const router = express.Router();
const DIR = './public/images';

/*Multer storage configuration*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuid() + '-' + fileName)
  }
});

/*Validate image multidata*/
const upload = multer({
  storage,
  limits: { fileSize: 500000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .jpg/.jpeg format is allowed!"));
    }
  },
});

router.post("/jpg-doc", upload.single("original_file"), jpgToDoc);

export default router;
