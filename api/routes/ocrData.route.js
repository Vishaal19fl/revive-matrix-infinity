import express from "express";
import { getOcrData } from "../controllers/ocrData.controller.js";

const router = express.Router();

router.get("/", getOcrData);

export default router;
