import express from "express";
import { getSpecialReports } from "../controllers/totalreport.controller.js";

const router = express.Router();

router.get("/", getSpecialReports);

export default router;
