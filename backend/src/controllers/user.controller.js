import { User } from "../models/user.model.js"

export const getAllUsers = async (req, res) => {
	try {
		const currentUserId = req.auth().userId
		const users = await User.find({ clerkId: { $ne: currentUserId } })
		if (!users) {
			return res.status(404).json({ message: "No users found" })
		}

		res.status(200).json(users)
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message })
		console.error("Error fetching users:", error)
	}
}
