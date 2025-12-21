export const formatDuration = (seconds: number): string => {
	const mins = (seconds / 60).toFixed(2)

	return `${mins}`.replace(".", ":")
}

formatDuration(325)
