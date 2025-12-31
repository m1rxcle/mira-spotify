import { Router } from "express"
import { getAllUsers, getUsersFeatures, getUsersFeaturesAlbums, toggleFeaturesAlbums, toggleFeatureSong } from "../controllers/user.controller.js"
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js"

const router = Router()

router.get("/", protectRoute, requireAdmin, getAllUsers)
router.get("/features", protectRoute, getUsersFeatures)
router.post("/features", protectRoute, toggleFeatureSong)
router.get("/features-albums", protectRoute, getUsersFeaturesAlbums)
router.post("/features-albums", protectRoute, toggleFeaturesAlbums)

export default router
