import express from "express"
import { getUserProfile, login, signUp, updateUserProfile } from "../Controllers/userController.js"
import { protectRoute } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get('/user', protectRoute, getUserProfile);
router.put("/profile", protectRoute, updateUserProfile);

export default router