import { Router } from "express"
import { getAllUsers } from "../controllers/user.controller.js"
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js"

const router = Router()

router.get("/", protectRoute, requireAdmin, getAllUsers)

export default router
