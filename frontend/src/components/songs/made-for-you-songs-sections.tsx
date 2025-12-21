import type { Song } from "@/types"
import MadeForYouSkeleton from "../skeletons/made-for-you-songs-skeleton"

import RenderSongs from "./render-songs"

const MadeForYouSongsSection = ({ madeForYouSongs, isLoading }: { madeForYouSongs: Song[]; isLoading: boolean }) => {
	if (!madeForYouSongs || isLoading) {
		return <MadeForYouSkeleton />
	}
	return <RenderSongs songs={madeForYouSongs} />
}

export default MadeForYouSongsSection
