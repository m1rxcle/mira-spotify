import { create } from 'zustand'

import { COLORS } from '@/shared/lib/data'
import { getRandomColorsForPlayer } from '@/shared/lib/get-radom-color-for-player'
import type { Song } from '@/types'

type PlayerStore = {
	currentSong: Song | null
	isPlaying: boolean
	hasReportedPlay: boolean
	duration: number
	queue: Song[]
	currentIndex: number
	timeLeft: number
	changeColors: string
	volume: number[]
	currentTime: number[]
	progress: number[]
	seekTime: number | null
	isSeeking: boolean

	setHasReportedPlay: (hasReportedPlay: boolean) => void
	setSeekTime: (time: number | null) => void
	setChangeProgress: (progress: number[]) => void
	setIsSeeking: (isSeeking: boolean) => void
	setChangeCurrentTime: (time: number[]) => void
	setDuration: (duration: number) => void
	setChangeVolume: (volume: number[]) => void
	setTimeLeft: (time: number) => void
	initializeQueue: (songs: Song[]) => void
	playAlbum: (songs: Song[], startIndex?: number) => void
	handleSetCurrentSong: (song: Song) => void
	setCurrentSong: (song: Song | null) => void
	togglePlay: () => void
	playNextSong: () => void
	playPreviousSong: () => void
}

export const usePlayerStore = create<PlayerStore>()((set, get) => ({
	progress: [0],
	seekTime: null,
	isSeeking: false,
	currentTime: [0],
	volume: [0.5],
	changeColors: COLORS[0],
	timeLeft: 0,
	currentSong: null,
	currentIndex: -1,
	isPlaying: false,
	hasReportedPlay: false,
	duration: 0,
	queue: [],

	setHasReportedPlay: (hasReportedPlay) => {
		set({ hasReportedPlay: hasReportedPlay })
	},

	setSeekTime: (time) => {
		set({ seekTime: time })
	},

	setChangeProgress: (progress: number[]) => {
		set({ progress: progress })
	},

	setIsSeeking: (isSeeking: boolean) => {
		set({ isSeeking: isSeeking })
	},

	setChangeCurrentTime: (time: number[]) => {
		set({ currentTime: time })
	},

	setChangeVolume: (volume: number[]) => {
		set({ volume: volume })
	},

	setDuration: (duration: number) => {
		set({ duration: duration })
	},

	setTimeLeft: (time: number) => {
		set({ timeLeft: time })
	},

	initializeQueue: (songs: Song[]) => {
		set({
			queue: songs,
			currentSong: get().currentSong || songs[0],
			currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
		})
	},
	playAlbum: (songs: Song[], startIndex = 0) => {
		if (songs.length === 0) return
		const song = songs[startIndex]
		set({
			queue: songs,
			currentSong: song,
			currentIndex: startIndex,
			isPlaying: true,
		})
	},
	handleSetCurrentSong: (song: Song) => {
		set({ currentSong: song })
	},
	setCurrentSong: (song: Song | null) => {
		if (!song) return
		const songIndex = get().queue.findIndex((s) => s._id === song._id)

		set({
			currentSong: song,
			currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
			isPlaying: true,
		})
	},
	togglePlay: () => {
		const willStartPlaying = !get().isPlaying

		set({ isPlaying: willStartPlaying })
	},
	playNextSong: () => {
		if (get().queue.length === 0) return
		const { currentIndex, queue } = get()
		const nextIndex = currentIndex + 1
		if (nextIndex < queue.length) {
			const nextSong = queue[nextIndex]
			set({
				currentSong: nextSong,
				currentIndex: nextIndex,
				isPlaying: true,
				changeColors: getRandomColorsForPlayer(),
			})
		} else {
			set({ isPlaying: false })
		}
	},
	playPreviousSong: () => {
		if (get().queue.length === 0) return
		const { currentIndex, queue } = get()
		const prevIndex = currentIndex - 1
		if (prevIndex >= 0) {
			const prevSong = queue[prevIndex]
			set({
				currentSong: prevSong,
				currentIndex: prevIndex,
				isPlaying: true,
				changeColors: getRandomColorsForPlayer(),
			})
		} else {
			set({ isPlaying: false })
		}
	},
}))

export const usePlayerCurrentSong = () => usePlayerStore((state) => state.currentSong)
export const usePlayerProgress = () => usePlayerStore((state) => state.progress)
export const usePlayerVolume = () => usePlayerStore((state) => state.volume)
export const usePlayerSeekTime = () => usePlayerStore((state) => state.seekTime)
export const usePlayerIsPlaying = () => usePlayerStore((state) => state.isPlaying)
export const usePlayerIsSeeking = () => usePlayerStore((state) => state.isSeeking)
export const usePlayerCurrentTime = () => usePlayerStore((state) => state.currentTime)
export const usePlayerDuration = () => usePlayerStore((state) => state.duration)
export const usePlayerChangeColors = () => usePlayerStore((state) => state.changeColors)
export const usePlayerTimeLeft = () => usePlayerStore((state) => state.timeLeft)
export const usePlayerCurrentIndex = () => usePlayerStore((state) => state.currentIndex)
export const usePlayerQueue = () => usePlayerStore((state) => state.queue)
export const usePlayerHasReportedPlay = () => usePlayerStore((state) => state.hasReportedPlay)

//setters
export const usePlayerSetHasReportedPlay = () => usePlayerStore((state) => state.setHasReportedPlay)
export const usePlayerSetSeekTime = () => usePlayerStore((state) => state.setSeekTime)
export const usePlayerSetIsSeeking = () => usePlayerStore((state) => state.setIsSeeking)
export const usePlayerChangeProgress = () => usePlayerStore((state) => state.setChangeProgress)
export const usePlayerChangeVolume = () => usePlayerStore((state) => state.setChangeVolume)
export const usePlayerSetDuration = () => usePlayerStore((state) => state.setDuration)
export const usePlayerSetTimeLeft = () => usePlayerStore((state) => state.setTimeLeft)
export const usePlayerInitializeQueue = () => usePlayerStore((state) => state.initializeQueue)
export const usePlayerPlayAlbum = () => usePlayerStore((state) => state.playAlbum)
export const usePlayerHandleSetCurrentSong = () =>
	usePlayerStore((state) => state.handleSetCurrentSong)
export const usePlayerSetCurrentSong = () => usePlayerStore((state) => state.setCurrentSong)
export const usePlayerTogglePlay = () => usePlayerStore((state) => state.togglePlay)
export const usePlayerPlayNextSong = () => usePlayerStore((state) => state.playNextSong)
export const usePlayerPlayPreviousSong = () => usePlayerStore((state) => state.playPreviousSong)
