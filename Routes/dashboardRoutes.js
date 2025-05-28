import express from "express";
import { getDashboardSummary } from "../Controllers/dashboardController.js"
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", protectRoute, getDashboardSummary);

export default router;