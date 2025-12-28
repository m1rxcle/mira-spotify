import { Song } from "../models/song.model.js"

export const getSong = async (req, res) => {
	try {
		const { query } = req.body

		const song = await Song.find({
			$or: [
				{
					title: { $regex: query, $options: "i" },
				},
				{
					artist: { $regex: query, $options: "i" },
				},
			],
		})

		res.status(200).json(song)
	} catch (error) {
		console.error("Error fetching song:", error)
		res.status(500).json({ message: "Server error while fetching song" })
	}
}
