import RenderSongs from './render-songs'
import MadeForYouSkeleton from '../../skeletons/made-for-you-songs-skeleton'

import type { Song } from '@/types'

const MadeForYouSongsSection = ({
	madeForYouSongs,
	isLoading,
}: {
	madeForYouSongs: Song[]
	isLoading: boolean
}) => {
	if (!madeForYouSongs || isLoading) {
		return <MadeForYouSkeleton />
	}
	return <RenderSongs songs={madeForYouSongs} />
}

export default MadeForYouSongsSection
