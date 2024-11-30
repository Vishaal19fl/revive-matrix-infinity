import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { updatePickedUp, updateDelivered, getLogistics,createLogistics } from "../controllers/logistics.controller.js";

const router = express.Router();

router.get("/", verifyToken, getLogistics);
router.post("/", createLogistics);  
router.patch("/:id/pickup", verifyToken, updatePickedUp);
router.patch("/:id/deliver", verifyToken, updateDelivered);

export default router;
