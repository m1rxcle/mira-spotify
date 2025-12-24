import { usePlayerStore } from "@/store/use-player-store"
import React, { useEffect } from "react"

const AudioPlayer = () => {
	const audioRef = React.useRef<HTMLAudioElement>(null)
	const prevSongRef = React.useRef<string | null>(null)

	const { currentSong, isPlaying, setTimeLeft, playNextSong } = usePlayerStore()

	useEffect(() => {
		if (isPlaying) audioRef.current?.play()
		else audioRef.current?.pause()
	}, [isPlaying])

	useEffect(() => {
		const audio = audioRef.current

		const handleEnded = () => {
			playNextSong()
		}

		audio?.addEventListener("ended", handleEnded)

		return () => audio?.removeEventListener("ended", handleEnded)
	}, [playNextSong])

	useEffect(() => {
		if (!audioRef.current || !currentSong) return
		const audio = audioRef.current

		const isSongChange = prevSongRef.current !== currentSong?.audioUrl
		if (isSongChange) {
			audio.src = currentSong?.audioUrl
			audio.currentTime = 0
			prevSongRef.current = currentSong?.audioUrl

			if (isPlaying) audio.play()
		}
	}, [currentSong, isPlaying])

	useEffect(() => {
		if (!audioRef.current) return

		const audio = audioRef.current
		const handleTimeUpdate = () => {
			const duration = audio.duration ?? 0
			const currentTime = audio.currentTime
			const time = (duration || 0) - currentTime

			setTimeLeft(time)
		}
		audio.addEventListener("timeupdate", handleTimeUpdate)
		return () => audio.removeEventListener("timeupdate", handleTimeUpdate)
	}, [setTimeLeft])

	return <audio ref={audioRef} />
}

export default AudioPlayer
