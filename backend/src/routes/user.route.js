import { Router } from "express"
import { getAllUsers, getUsersFeatures, toggleFeatureSong } from "../controllers/user.controller.js"
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js"

const router = Router()

router.get("/", protectRoute, requireAdmin, getAllUsers)
router.get("/features", protectRoute, getUsersFeatures)
router.post("/features", protectRoute, toggleFeatureSong)

export default router
