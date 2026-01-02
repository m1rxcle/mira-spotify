import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		clerkId: {
			type: String,
			required: true,
			unique: true,
		},
		featuredSongs: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Song",
			},
		],
		featuredAlbums: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Album",
			},
		],
		history: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Song",
			},
		],
	},
	{ timestamps: true }
)

export const User = mongoose.model("User", userSchema)
