import express from "express";
import { getLora } from "../controllers/lora.controller.js";

const router = express.Router();

router.get("/", getLora);


export default router;
