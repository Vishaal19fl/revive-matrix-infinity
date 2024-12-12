import express from "express";
import { getdailyreport } from "../controllers/dailyreport.controller.js";

const router = express.Router();

router.get("/", getdailyreport);

export default router;
