import { Router } from "express"
import { createVillage, deleteOneVillage, readAllVillage, readOneVillage, updateOneVillage } from "../controllers/village.js"


const router = Router()

// Create
router.post("/", createVillage)

// Read
router.get("/", readAllVillage)

router.get("/:name", readOneVillage)

// Update 
// PUT changes the entire document
// PATCH changes the document only partially
router.patch("/:name", updateOneVillage)

// Delete
router.delete("/:name", deleteOneVillage)




export default router