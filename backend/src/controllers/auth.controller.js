import { User } from "../models/user.model.js"
import argon from "argon2"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { ms } from "../utils/ms.util.js"

dotenv.config()

export const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body

		const existUser = await User.findOne({ email })

		if (existUser) {
			return res.status(400).json({ success: false, message: "User already exists" })
		}

		const user = await User.create({
			fullName: `${firstName} ${lastName}`,
			email,
			password: await argon.hash(password),
		})

		const { accessToken } = auth(res, user._id)

		res.status(200).json({
			success: true,
			message: "User registered successfully",
			accessToken,
		})
	} catch (error) {
		console.log("Error in [AUTH] register ", error)
		res.status(500).json({ success: false, message: "Internal Server Error" })
	}
}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email })

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" })
		}

		const isPasswordValid = await argon.verify(user.password, password)

		if (!isPasswordValid) {
			return res.status(404).json({ success: false, message: "User not found" })
		}
		const { accessToken } = auth(res, user._id)

		res.status(200).json({ success: true, message: "User logged in successfully", user, accessToken })
	} catch (error) {
		console.log("Error in [AUTH] login ", error)
		res.status(500).json({ success: false, message: "Internal Server Error" })
	}
}

export const logout = async (req, res) => {
	try {
		setCookies(res, "refreshToken", new Date(0))

		res.status(200).json({ success: true, message: "User logged out successfully" })
	} catch (error) {
		console.log("Error in [AUTH] logout ", error)
		res.status(500).json({ success: false, message: "Internal Server Error" })
	}
}

export const refresh = async (req, res) => {
	const refreshToken = req.cookies["refreshToken"]

	if (!refreshToken) {
		return res.status(404).json({ message: "Refresh token not found" })
	}

	const payload = jwt.verify(refreshToken, process.env.JWT_SECRET)

	if (payload) {
		const user = await User.findById(payload.id)

		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		const { accessToken } = auth(res, user._id)

		res.status(200).json({ accessToken })
	}
}

function auth(res, id) {
	const { accessToken, refreshToken } = generateTokens(id)
	const expiresMs = ms(process.env.JWT_REFRESH_TOKEN_TTL)
	const expiresDate = new Date(Date.now() + expiresMs)

	setCookies(res, refreshToken, expiresDate)

	return { accessToken }
}

function generateTokens(id) {
	const payload = { id }

	const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_ACCESS_TOKEN_TTL,
		algorithm: "HS256",
	})

	const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_REFRESH_TOKEN_TTL,
		algorithm: "HS256",
	})

	return { accessToken, refreshToken }
}

function setCookies(res, value, expires) {
	res.cookie("refreshToken", value, {
		httpOnly: true,
		domain: process.env.COOKIE_DOMAIN,
		expires,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
	})
}
