import { Router } from "express"
import { getSong } from "../controllers/search.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = Router()

router.post("/", protectRoute, getSong)

export default router
