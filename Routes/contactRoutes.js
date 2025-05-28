import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js"
import { createContact, deleteContact, getContacts, updateContact } from "../Controllers/contactController.js"


const router = express.Router()

router.get("/allcontacts", protectRoute,getContacts)
router.post("/addcontact", protectRoute, createContact)
router.put("/edit/:id", protectRoute, updateContact)
router.delete("/delete/:id", protectRoute, deleteContact)


export default router