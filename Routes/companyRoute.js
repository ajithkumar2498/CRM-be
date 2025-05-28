import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js"
import { createCompany, deleteCompany, getCompanies, updateCompany } from "../Controllers/companyController.js"


const router = express.Router()

router.get("/allcompanies", protectRoute, getCompanies)
router.post("/create", protectRoute, createCompany)
router.put("/edit/:id", protectRoute, updateCompany)
router.delete("/delete/:id", protectRoute, deleteCompany)



export default router