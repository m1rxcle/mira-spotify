import { RiPauseLargeFill, RiPlayFill } from '@remixicon/react'
import { useEffect } from 'react'

import AlbumsSection from '@/shared/components/user/albums/albums-section'
import { Footer } from '@/shared/components/user/footer'
import HomeCircleBackground from '@/shared/components/user/home/home-circle-background'
import FeaturesSongsAndHistorySection from '@/shared/components/user/songs/features-songs-and-history-section'
import MadeForYouSongsSection from '@/shared/components/user/songs/made-for-you-songs-sections'
import TrendingSongsSection from '@/shared/components/user/songs/trending-songs-section'
import { useMusicStore } from '@/shared/store/use-music-store'
import { usePlayerStore } from '@/shared/store/use-player-store'
import { useUserStore } from '@/shared/store/use-user-store'

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
	const { token, getFeaturedSongs, getSongsHistory, getFeaturedAlbums } = useUserStore()

	const handlePlayMusic = () => {
		// Logic to play music
		togglePlay()
	}

	useEffect(() => {
		if (!token) return
		getFeaturedSongs()
		getFeaturedAlbums()
		getSongsHistory()
	}, [token, getFeaturedSongs, getFeaturedAlbums, getSongsHistory])

	useEffect(() => {
		setFetchTrendingSongs()
		setFetchMadeForYouSongs()

		setFetchAlbums()
	}, [setFetchTrendingSongs, setFetchAlbums, setFetchMadeForYouSongs])

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
