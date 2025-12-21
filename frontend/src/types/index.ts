export interface Song {
	_id: string
	albumId?: string | null
	title: string
	artist: string
	imageUrl: string
	audioUrl: string
	duration: number

	createdAt: Date
	updatedAt: Date
}

export interface Album {
	_id: string
	title: string
	artist: string
	imageUrl: string
	songs: Song[]
	releaseYear: number

	createdAt: Date
	updatedAt: Date
}
