import { Router } from "express"
import { createShinobi, deleteOneShinobi, readAllShinobi, readOneShinobi, updateOneShinobi } from "../controllers/shinobi.js"


const router = Router()

// Create
router.post("/", createShinobi)

// Read
router.get("/", readAllShinobi)

router.get("/:name", readOneShinobi)

// Update 
// PUT changes the entire document
// PATCH changes the document only partially
router.patch("/:name", updateOneShinobi)

// Delete
router.delete("/:name", deleteOneShinobi)




export default router