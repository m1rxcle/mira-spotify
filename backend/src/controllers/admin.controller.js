import { Song } from "../models/song.model.js"
import { Album } from "../models/album.model.js"
import { uploadToCloudinary } from "../lib/upload-to-cloudinary.js"

export const createSong = async (req, res) => {
	try {
		if (!req.files || !res.files.audioFile || !req.file.imageFile) return res.status(400).json({ message: "Please upload all files" })
		const { title, artist, albumId, duration } = req.body

		const audioFile = req.files.audioFile
		const imageFile = req.files.imageFile

		const audioUrl = await uploadToCloudinary(audioFile)
		const imageUrl = await uploadToCloudinary(imageFile)

		const song = new Song({
			title,
			artist,
			albumId: albumId || null,
			duration,
			audioUrl,
			imageUrl,
		})

		await song.save()

		// if song is part of an album, add song to album's songs array
		if (albumId) {
			await Album.findByIdAndUpdate(albumId, {
				$push: { songs: song._id },
			})
		}

		res.status(201).json({ message: "Song created successfully", song })
	} catch (error) {
		console.error("Error creating song:", error)
		res.status(500).json({ message: "Server error while creating song" })
	}
}

export const deleteSong = async (req, res) => {
	try {
		const { id } = req.params
		const song = await Song.findById(id)

		if (song.albumId) {
			await Album.findByIdAndUpdate(song.albumId, {
				$pull: { songs: song._id },
			})
		}

		await Song.findByIdAndDelete(id)

		res.status(200).json({ message: "Song deleted successfully" })
	} catch (error) {
		console.error("Error deleting song:", error)
		res.status(500).json({ message: "Server error while deleting song" })
	}
}

export const createAlbum = async (req, res) => {
	try {
		const { title, artist, releaseYear } = req.body

		const { imageFile } = req.files

		const imageUrl = await uploadToCloudinary(imageFile)

		const album = new Album({
			title,
			artist,
			releaseYear,
			imageUrl,
		})

		await album.save()

		res.status(201).json({ message: "Album created successfully", album })
	} catch (error) {
		console.log("Error while creating an Album", error)
		res.status(500).json({ message: "Internal Server Error" })
	}
}

export const deleteAlbum = async (req, res) => {
	try {
		const { id } = req.params

		await Song.deleteMany({ albumId: id })

		await Album.findByIdAndDelete(id)

		res.status(200).json({ message: "Album deleted successfully" })
	} catch (error) {
		console.log("Error while deleting an Album", error)
		res.status(500).json({ message: "Internal Server Error" })
	}
}

export const checkAdmin = async (req, res) => {
	res.status(200).json({ admin: true })
}
