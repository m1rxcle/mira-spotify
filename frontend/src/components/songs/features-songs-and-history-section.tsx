import { CardForFeaturesSection } from './card-for-features-section'
import { CardForHistorySection } from './card-for-history-section'

import { useUserStore } from '@/store/use-user-store'

const FeaturesSongsAndHistorySection = () => {
	const { featuredSongs, history } = useUserStore()
	if (featuredSongs.length === 0) return null
	if (history.length === 0) return null

	const hasPreviewFeatured = featuredSongs.length >= 2
	const hasPreviewHistory = history.length >= 2

	return (
		<div className="grid grid-cols-2 gap-4 ">
			<CardForFeaturesSection hasPreview={hasPreviewFeatured} featuredSongs={featuredSongs} />

			<CardForHistorySection hasPreview={hasPreviewHistory} history={history} />
		</div>
	)
}

export default FeaturesSongsAndHistorySection
