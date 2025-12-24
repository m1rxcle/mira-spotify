import { COLORS } from "./data"

export const getRandomColorsForPlayer = (): string => {
	const randomIndex = Math.floor(Math.random() * COLORS.length)
	const randomColor = COLORS[randomIndex]
	return randomColor
}
