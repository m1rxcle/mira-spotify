import { Song } from "../models/song.model.js"
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

export const getUsersFeatures = async (req, res) => {
	try {
		const currentUserId = req.auth().userId

		const user = await User.findOne({ clerkId: currentUserId }).select("featuredSongs").populate("featuredSongs")

		if (!user) {
			return res.status(404).json({ message: "No features found" })
		}

		res.status(200).json(user.featuredSongs)
	} catch (error) {
		console.error("Error fetching features:", error)
		res.status(500).json({ message: "Server error", error: error.message })
	}
}

export const toggleFeatureSong = async (req, res) => {
	try {
		const { songId } = req.body

		const currentUserId = req.auth().userId

		const user = await User.findOne({ clerkId: currentUserId }).select("featuredSongs").populate("featuredSongs")

		const song = await Song.findById(songId)

		if (!song) {
			return res.status(404).json({ message: "Song not found" })
		}

		const isAlreadyFeatured = user.featuredSongs.some((song) => song._id.toString() === songId)

		if (!isAlreadyFeatured) {
			user.featuredSongs.push(song._id)
			await user.save()
			return res.status(200).json({ message: "Song added to features successfully!" })
		}

		user.featuredSongs = user.featuredSongs.filter((song) => song._id.toString() !== songId)
		await user.save()
		return res.status(200).json({ message: "Song removed from features successfully!" })
	} catch (error) {
		console.error("Error toggling feature song:", error)
		res.status(500).json({ message: "Server error", error: error.message })
	}
}
