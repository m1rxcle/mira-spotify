import { RiPauseLargeFill, RiPlayFill } from '@remixicon/react'
import { useEffect } from 'react'

import AlbumsSection from '@/components/albums/albums-section'
import { Footer } from '@/components/footer'
import HomeCircleBackground from '@/components/home/home-circle-background'
import FeaturesSongsAndHistorySection from '@/components/songs/features-songs-and-history-section'
import MadeForYouSongsSection from '@/components/songs/made-for-you-songs-sections'
import TrendingSongsSection from '@/components/songs/trending-songs-section'
import { useMusicStore } from '@/store/use-music-store'
import { usePlayerStore } from '@/store/use-player-store'
import { useUserStore } from '@/store/use-user-store'

const HomePage = () => {
	const {
		trendingSongs,
		madeForYouSongs,
		isLoading,
		albums,
		setFetchTrendingSongs,
		setFetchMadeForYouSongs,

		setFetchAlbums,
	} = useMusicStore()
	const { isPlaying, togglePlay } = usePlayerStore()
	const { token, getFeaturedSongs, featuredAlbums, getFeaturedAlbums } = useUserStore()

	const handlePlayMusic = () => {
		// Logic to play music
		togglePlay()
	}

	useEffect(() => {
		if (!token) return
		getFeaturedSongs()
		getFeaturedAlbums()
	}, [token, getFeaturedSongs, getFeaturedAlbums])

	useEffect(() => {
		setFetchTrendingSongs()
		setFetchMadeForYouSongs()

		setFetchAlbums()
	}, [setFetchTrendingSongs, setFetchAlbums, setFetchMadeForYouSongs])

	console.log('albums', featuredAlbums)

	return (
		<section className="h-screen w-full px-6">
			<div className="h-[70%] relative flex justify-start items-center gap-20">
				<div className="flex flex-col items-center justify-between  mx-auto text-center ">
					<div
						className="flex justify-center  items-start cursor-pointer hover:scale-110"
						onClick={handlePlayMusic}
					>
						{isPlaying ? (
							<RiPauseLargeFill className="size-14 font-bold" />
						) : (
							<RiPlayFill className="size-14 font-bold" />
						)}
						<h1 className="text-5xl font-extrabold">My music</h1>
					</div>
					<HomeCircleBackground />
				</div>
			</div>
			<div className="flex flex-col gap-10 mb-20">
				<FeaturesSongsAndHistorySection />
				<h2 className="text-4xl font-bold ">New Albums</h2>
				<AlbumsSection albums={albums} isLoading={isLoading} />
				<h2 className="text-4xl font-bold ">Trends</h2>
				<TrendingSongsSection trendingSongs={trendingSongs} isLoading={isLoading} />
				<h2 className="text-4xl font-bold ">Made For you</h2>
				<MadeForYouSongsSection madeForYouSongs={madeForYouSongs} isLoading={isLoading} />
			</div>
			<Footer />
		</section>
	)
}

export default HomePage
