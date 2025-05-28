import express from "express";
import {
  getDeals,
  createDeal,
  updateDeal,
  deleteDeal,
} from "../controllers/dealController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/alldeals", protectRoute, getDeals); 
router.post("/create", protectRoute, createDeal);
router.put("/edit/:id", protectRoute, updateDeal);
router.delete("/delete/:id", protectRoute, deleteDeal);

export default router;
