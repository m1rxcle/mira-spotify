import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { User } from "../models/user.model.js"

dotenv.config()

export const protectRoute = async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader) return res.status(401).json({ message: "Unauthorized - u must be logged in !" })

	const token = authHeader.split(" ")[1]
	if (!token) return res.status(401).json({ message: "Unauthorized - u must be logged in !" })

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(payload.id)

		if (!user) return res.status(404).json({ message: "User not found" })

		req.user = user

		next()
	} catch (err) {
		return res.status(401).json({ message: "Invalid token" })
	}
}

export const requireAdmin = (req, res, next) => {
	try {
		if (!req.user) return res.status(401).json({ message: "Unauthorized - u must be logged in !" })

		const isAdmin = process.env.ADMIN_EMAIL === req.user.email

		if (!isAdmin) return res.status(403).json({ message: "Forbidden - u must be an admin !" })

		next()
	} catch (error) {
		console.log("Error in requireAdmin function", error)
		return res.status(500).json({ message: "Internal Server Error" })
	}
}
