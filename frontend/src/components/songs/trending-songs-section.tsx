import type { Song } from "@/types"
import TrendingSongsSkeleton from "../skeletons/trending-songs-skeleton"

import RenderSongs from "./render-songs"

const TrendingSongsSection = ({ trendingSongs, isLoading }: { trendingSongs: Song[]; isLoading: boolean }) => {
	if (!trendingSongs || isLoading) {
		return <TrendingSongsSkeleton />
	}

	return <RenderSongs songs={trendingSongs} />
}

export default TrendingSongsSection
