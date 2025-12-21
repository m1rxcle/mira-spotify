import AlbumsSection from "@/components/albums/albums-section"
import FeaturesSongsSection from "@/components/songs/features-songs-section"
import HomeCircleBackground from "@/components/home/home-circle-background"
import MadeForYouSongsSection from "@/components/songs/made-for-you-songs-sections"
import TrendingSongsSection from "@/components/songs/trending-songs-section"
import { useMusicStore } from "@/store/use-music-store"
import { RiPauseLargeFill, RiPlayFill } from "@remixicon/react"
import { useEffect } from "react"

const HomePage = () => {
	const {
		isPlayButtonClicked,
		trendingSongs,
		madeForYouSongs,
		featuredSongs,
		isLoading,
		albums,
		setIsPlayButtonClicked,
		setFetchTrendingSongs,
		setFetchMadeForYouSongs,
		setFetchFeaturedSongs,
		setFetchAlbums,
	} = useMusicStore()

	const handlePlayMusic = () => {
		// Logic to play music
		setIsPlayButtonClicked(!isPlayButtonClicked)
	}

	useEffect(() => {
		setFetchTrendingSongs()
		setFetchMadeForYouSongs()
		setFetchFeaturedSongs()
		setFetchAlbums()
	}, [setFetchTrendingSongs, setFetchAlbums, setFetchFeaturedSongs, setFetchMadeForYouSongs])

	return (
		<section className="h-full w-full px-6">
			<div className="h-[70%] relative flex justify-start items-center gap-20">
				<div className="flex flex-col items-center justify-between  mx-auto text-center ">
					<div className="flex justify-center  items-start cursor-pointer hover:scale-110" onClick={handlePlayMusic}>
						{isPlayButtonClicked ? <RiPauseLargeFill className="size-14 font-bold" /> : <RiPlayFill className="size-14 font-bold" />}
						<h1 className="text-5xl font-extrabold">My music</h1>
					</div>
					<HomeCircleBackground />
				</div>
			</div>
			<div className="flex flex-col gap-10 mb-10">
				<h2 className="text-4xl font-bold ">New Albums</h2>
				<AlbumsSection albums={albums} isLoading={isLoading} />
				<h2 className="text-4xl font-bold ">Trends</h2>
				<TrendingSongsSection trendingSongs={trendingSongs} isLoading={isLoading} />
				<h2 className="text-4xl font-bold ">Featured</h2>
				<FeaturesSongsSection featuredSongs={featuredSongs} isLoading={isLoading} />
				<h2 className="text-4xl font-bold ">Made For you</h2>
				<MadeForYouSongsSection madeForYouSongs={madeForYouSongs} isLoading={isLoading} />
			</div>
		</section>
	)
}

export default HomePage
