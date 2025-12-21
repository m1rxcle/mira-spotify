import type { Song } from "@/types"
import FeaturesSongsSkeleton from "../skeletons/features-songs-skeleton"

import RenderSongs from "./render-songs"

const FeaturesSongsSection = ({ featuredSongs, isLoading }: { featuredSongs: Song[]; isLoading: boolean }) => {
	if (!featuredSongs || isLoading) {
		return <FeaturesSongsSkeleton />
	}
	return <RenderSongs songs={featuredSongs} />
}

export default FeaturesSongsSection
