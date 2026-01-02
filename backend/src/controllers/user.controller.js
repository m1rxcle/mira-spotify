import { Album } from "../models/album.model.js"
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

export const getUsersFeaturesAlbums = async (req, res) => {
	try {
		const currentUserId = req.auth().userId

		const user = await User.findOne({ clerkId: currentUserId }).select("featuredAlbums").populate("featuredAlbums")

		if (!user) {
			return res.status(404).json({ message: "No features found" })
		}

		res.status(200).json(user.featuredAlbums)
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
			user.featuredSongs.unshift(song._id)
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

export const toggleFeaturesAlbums = async (req, res) => {
	try {
		const { albumId } = req.body

		const currentUserId = req.auth().userId

		const user = await User.findOne({ clerkId: currentUserId }).select("featuredAlbums").populate("featuredAlbums")

		const album = await Album.findById(albumId)

		if (!album) {
			return res.status(404).json({ message: "Album not found" })
		}

		const isAlreadyFeatured = user.featuredAlbums.some((album) => album._id.toString() === albumId)

		if (!isAlreadyFeatured) {
			user.featuredAlbums.unshift(album._id)
			await user.save()
			return res.status(200).json({ message: "Album added to features successfully!" })
		}

		user.featuredAlbums = user.featuredAlbums.filter((album) => album._id.toString() !== albumId)
		await user.save()
		return res.status(200).json({ message: "Album removed from features successfully!" })
	} catch (error) {
		console.error("Error toggling feature album:", error)
		res.status(500).json({ message: "Server error", error: error.message })
	}
}

export const getUsersHistory = async (req, res) => {
	const currentUserId = req.auth().userId
	try {
		const user = await User.findOne({ clerkId: currentUserId }).select("history").populate("history")

		if (!user) {
			return res.status(404).json({ message: "No history found" })
		}

		res.status(200).json(user.history)
	} catch (error) {
		console.error("Error fetching history:", error)
		res.status(500).json({ message: "Server error", error: error.message })
	}
}

export const addToHistory = async (req, res) => {
	const currentUserId = req.auth().userId

	const { songId } = req.body

	try {
		const user = await User.findOne({ clerkId: currentUserId })

		const song = await Song.findById(songId)

		if (!song) {
			return res.status(404).json({ message: "Song not found" })
		}

		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		user.history = user.history.filter((s) => s.toString() !== songId)

		user.history.unshift(songId)

		if (user.history.length > 200) {
			user.history.pop()
		}

		await user.save()

		res.status(200).json(user.history)
	} catch (error) {
		console.error("Error adding to history:", error)
		res.status(500).json({ message: "Server error", error: error.message })
	}
}
