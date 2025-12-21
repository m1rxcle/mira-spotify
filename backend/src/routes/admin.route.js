import { Router } from "express"
import { checkAdmin, createSong, deleteSong, createAlbum, deleteAlbum } from "../controllers/admin.controller.js"
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js"

const router = Router()

//optimize clean code
router.use(protectRoute, requireAdmin)

router.get("/checkAdmin", checkAdmin)

router.post("/songs", createSong)
router.delete("/songs/:id", deleteSong)

router.post("/albums", createAlbum)
router.delete("/albums/:id", deleteAlbum)

export default router
