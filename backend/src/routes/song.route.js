import { Router } from "express"
import { getAllSongs, getMadeForYouSongs, getTextForSongsFromAI, getTrendingSongs } from "../controllers/songs.controller.js"
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js"

const router = Router()

router.get("/", protectRoute, requireAdmin, getAllSongs)
router.get("/text/:songId", getTextForSongsFromAI)
router.get("/made-for-you", getMadeForYouSongs)
router.get("/trending", getTrendingSongs)

export default router
