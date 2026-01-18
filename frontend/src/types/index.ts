import type { LoginSchemaType } from '@/shared/schemas/login-schema'
import type { RegisterSchemaType } from '@/shared/schemas/register-schema'

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

export interface Stats {
	totalAlbums: number
	totalSongs: number
	totalUsers: number
	totalArtists: number
}

export type RegisterDTO = Omit<RegisterSchemaType, 'repeatPassword'>

export type LoginDTO = LoginSchemaType

export interface UserData {
	fullName: string
	email: string
	password: string
	featuredSongs: Song[]
	featuredAlbums: Album[]
	history: Song[] | Album[] | []
	imageUrl: string
}
