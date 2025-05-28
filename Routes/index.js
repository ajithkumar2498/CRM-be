import express from "express"
import UserRoutes from "./userRoutes.js"
import contactRoutes from "./contactRoutes.js"
import companyRoutes from "./companyRoute.js"
import dealRoutes from "./dealRoutes.js"
import dashboardRoutes from "./dashboardRoutes.js"

const router = express.Router()

router.use("/auth", UserRoutes)
router.use("/contact", contactRoutes)
router.use("/companies", companyRoutes)
router.use("/deals", dealRoutes)
router.use("/dashboard", dashboardRoutes)

export default router