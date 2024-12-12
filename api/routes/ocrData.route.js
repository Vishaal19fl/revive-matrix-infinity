import express from "express";
import { getOcrData, OcrDatabyID } from "../controllers/ocrData.controller.js";

const router = express.Router();

router.get("/", getOcrData);
router.get("/:id", OcrDatabyID);

export default router;
