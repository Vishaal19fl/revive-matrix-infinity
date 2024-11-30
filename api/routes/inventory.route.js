import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { updateInventory, getInventory, decreaseItemCount, increaseItemCount } from "../controllers/inventory.controller.js";

const router = express.Router();

// POST route to update inventory
router.post("/update", verifyToken, updateInventory);
router.post("/increase", verifyToken, increaseItemCount);
router.post("/decrease", verifyToken, decreaseItemCount);
// GET route to fetch inventory
router.get("/", verifyToken, getInventory);

export default router;
