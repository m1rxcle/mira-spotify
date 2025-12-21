import mongoose from "mongoose"

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGOOSE_URI)
		console.log(`Connected to mongo ${conn.connection.host}`)
	} catch (error) {
		console.log("Failed to connect to MongoDB", error)
		process.exit(1)
	}
}
