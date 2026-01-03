import RenderSongs from './render-songs'
import TrendingSongsSkeleton from '../../skeletons/trending-songs-skeleton'

import type { Song } from '@/types'

const TrendingSongsSection = ({
	trendingSongs,
	isLoading,
}: {
	trendingSongs: Song[]
	isLoading: boolean
}) => {
	if (!trendingSongs || isLoading) {
		return <TrendingSongsSkeleton />
	}

	return <RenderSongs songs={trendingSongs} />
}

export default TrendingSongsSection
