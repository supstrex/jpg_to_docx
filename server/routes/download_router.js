import express from "express";
import { getDocx } from "../controllers/download_controller.js";

const router = express.Router();

router.get("/docx/:fileName", getDocx);

export default router;