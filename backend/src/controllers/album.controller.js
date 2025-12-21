import { Album } from "../models/album.model.js"

export const getAllAlbums = async (req, res) => {
	try {
		const albums = await Album.find()

		if (!albums) {
			return res.status(404).json({ message: "No albums found" })
		}
		res.status(200).json(albums)
	} catch (error) {
		console.error("Error fetching albums:", error)
		res.status(500).json({ message: "Server error while fetching albums" })
	}
}

export const getAlbumById = async (req, res) => {
	try {
		const { id } = req.params

		const album = await Album.findById(id).populate("songs")

		if (!album) {
			return res.status(404).json({ message: "Album not found" })
		}
		res.status(200).json(album)
	} catch (error) {
		console.error("Error fetching album by ID:", error)
		res.status(500).json({ message: "Server error while fetching album" })
	}
}
