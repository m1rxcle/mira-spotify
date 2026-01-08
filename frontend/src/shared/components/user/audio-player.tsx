import React, { useEffect } from 'react'

import {
	usePlayerChangeProgress,
	usePlayerChangeVolume,
	usePlayerCurrentSong,
	usePlayerIsPlaying,
	usePlayerPlayNextSong,
	usePlayerSeekTime,
	usePlayerSetDuration,
	usePlayerSetHasReportedPlay,
	usePlayerSetIsSeeking,
	usePlayerSetSeekTime,
	usePlayerSetTimeLeft,
	usePlayerStore,
	usePlayerVolume,
} from '@/shared/store/use-player-store'
import { useUserStore } from '@/shared/store/use-user-store'

const AudioPlayer = () => {
	const audioRef = React.useRef<HTMLAudioElement>(null)
	const prevSongRef = React.useRef<string | null>(null)

	const currentSong = usePlayerCurrentSong()
	const volume = usePlayerVolume()
	const isPlaying = usePlayerIsPlaying()
	const seekTime = usePlayerSeekTime()

	const setChangeVolume = usePlayerChangeVolume()
	const setHasReportedPlay = usePlayerSetHasReportedPlay()
	const setTimeLeft = usePlayerSetTimeLeft()
	const setDuration = usePlayerSetDuration()
	const setIsSeeking = usePlayerSetIsSeeking()
	const setSeekTime = usePlayerSetSeekTime()
	const setChangeProgress = usePlayerChangeProgress()
	const handlePlayNextSong = usePlayerPlayNextSong()

	useEffect(() => {
		if (isPlaying) audioRef.current?.play()
		else audioRef.current?.pause()
	}, [isPlaying])

	useEffect(() => {
		const audio = audioRef.current

		const handleEnded = () => {
			handlePlayNextSong()
		}

		audio?.addEventListener('ended', handleEnded)

		return () => audio?.removeEventListener('ended', handleEnded)
	}, [handlePlayNextSong])

	useEffect(() => {
		if (!audioRef.current || !currentSong) return
		const audio = audioRef.current

		const isSongChange = prevSongRef.current !== currentSong?.audioUrl
		if (isSongChange) {
			audio.src = currentSong.audioUrl
			audio.currentTime = 0
			prevSongRef.current = currentSong?.audioUrl
			// Сбрасываем progress при смене песни
			setChangeProgress([0])
			setIsSeeking(false)

			if (isPlaying) audio.play()
		}
	}, [currentSong, isPlaying, setChangeProgress])

	useEffect(() => {
		if (!audioRef.current) return

		const audio = audioRef.current
		const handleTimeUpdate = () => {
			const duration = audio.duration ?? 0
			const currentTime = audio.currentTime
			const playedSeconds = currentTime

			setTimeLeft(duration - currentTime)
			setDuration(duration)

			const { addSongToHistory } = useUserStore.getState()
			const { currentSong, hasReportedPlay } = usePlayerStore.getState()

			if (currentSong && !hasReportedPlay && playedSeconds >= 5) {
				addSongToHistory(currentSong._id)
				setHasReportedPlay(true)
			}
		}

		audio.addEventListener('timeupdate', handleTimeUpdate)
		return () => audio.removeEventListener('timeupdate', handleTimeUpdate)
	}, [setTimeLeft, setDuration])

	// Плавное обновление прогресса через requestAnimationFrame
	useEffect(() => {
		if (!audioRef.current) return
		if (!isPlaying) return

		const audio = audioRef.current
		let animationFrameId: number

		const updateProgress = () => {
			const { isSeeking } = usePlayerStore.getState()
			if (!isSeeking && audio) {
				setChangeProgress([audio.currentTime])
			}
			animationFrameId = requestAnimationFrame(updateProgress)
		}

		animationFrameId = requestAnimationFrame(updateProgress)

		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}
		}
	}, [isPlaying, setChangeProgress])

	useEffect(() => {
		if (!currentSong) return
		setHasReportedPlay(false)
		// Сбрасываем progress при смене песни
		setChangeProgress([0])
	}, [currentSong, setChangeProgress])

	useEffect(() => {
		if (!audioRef.current) return
		const audio = audioRef.current

		audio.volume = volume[0]

		const handleVolumeUpdate = () => {
			const vol = audio.volume
			setChangeVolume([vol])
		}

		audio.addEventListener('volumechange', handleVolumeUpdate)

		return () => audio.removeEventListener('volumechange', handleVolumeUpdate)
	}, [setChangeVolume, volume])

	useEffect(() => {
		if (!audioRef.current) return
		if (seekTime === null) return

		const audio = audioRef.current
		audio.currentTime = seekTime
		// Синхронизируем progress сразу после установки времени
		setChangeProgress([seekTime])
		setSeekTime(null)
	}, [seekTime, setSeekTime, setChangeProgress])

	return <audio ref={audioRef} />
}

export default AudioPlayer
