import { Song } from "../models/song.model.js"

export const getAllSongs = async (req, res) => {
	try {
		const songs = await Song.find().sort({ createdAt: -1 })

		if (!songs) {
			return res.status(404).json({ message: "No songs found" })
		}

		res.status(200).json(songs)
	} catch (error) {
		console.error("Error fetching songs:", error)
		res.status(500).json({ message: "Server error while fetching songs" })
	}
}

export const getFeaturedSongs = async (req, res) => {
	try {
		const songs = await Song.aggregate([
			{
				$sample: { size: 6 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
					duration: 1,
				},
			},
		])

		res.status(200).json(songs)
	} catch (error) {
		console.error("Error fetching featured songs:", error)
		res.status(500).json({ message: "Server error while fetching featured songs" })
	}
}

export const getMadeForYouSongs = async (req, res) => {
	try {
		const songs = await Song.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
					duration: 1,
				},
			},
		])

		res.status(200).json(songs)
	} catch (error) {
		console.error("Error fetching made-for-you songs:", error)
		res.status(500).json({ message: "Server error while fetching made-for-you songs" })
	}
}

export const getTrendingSongs = async (req, res) => {
	try {
		const songs = await Song.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
					duration: 1,
				},
			},
		])

		res.status(200).json(songs)
	} catch (error) {
		console.error("Error fetching trending songs:", error)
		res.status(500).json({ message: "Server error while fetching trending songs" })
	}
}
