import type { Song } from "@/types"

export const queueForSongs = (songs: Song[]) => {
	while (songs.length > 0) {
		const song = songs.shift()
		const audio = new Audio(song?.audioUrl)
		audio.play()
	}
}
