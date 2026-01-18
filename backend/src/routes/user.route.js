import { Router } from "express"
import {
	addToHistory,
	getAllUsers,
	getMe,
	getUsersFeatures,
	getUsersFeaturesAlbums,
	getUsersHistory,
	toggleFeaturesAlbums,
	toggleFeatureSong,
} from "../controllers/user.controller.js"
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js"

const router = Router()

router.get("/", protectRoute, requireAdmin, getAllUsers)
router.get("/me", protectRoute, getMe)
router.get("/features", protectRoute, getUsersFeatures)
router.post("/features", protectRoute, toggleFeatureSong)
router.get("/features-albums", protectRoute, getUsersFeaturesAlbums)
router.post("/features-albums", protectRoute, toggleFeaturesAlbums)
router.get("/history", protectRoute, getUsersHistory)
router.post("/history", protectRoute, addToHistory)

export default router
