import { Router } from "express"
import { getSong } from "../controllers/search.controller.js"

const router = Router()

router.post("/", getSong)

export default router
