import { CardForFeaturesSection } from './card-for-features-section'

import { useUserStore } from '@/store/use-user-store'

const FeaturesSongsAndHistorySection = () => {
	const { featuredSongs } = useUserStore()
	if (featuredSongs.length === 0) return null
	const hasPreview = featuredSongs.length >= 2

	//TODO: Add history section
	return (
		<div className="grid grid-cols-2 gap-4 ">
			<CardForFeaturesSection hasPreview={hasPreview} featuredSongs={featuredSongs} />
			<CardForFeaturesSection hasPreview={hasPreview} featuredSongs={featuredSongs} />

			{/* 	<CardForHistorySection /> */}
		</div>
	)
}

export default FeaturesSongsAndHistorySection
