import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createDonation, getDonations, getUserDonations } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", verifyToken, createDonation);
router.get("/donations", verifyToken, getDonations);
router.get('/user', verifyToken, getUserDonations);

export default router;