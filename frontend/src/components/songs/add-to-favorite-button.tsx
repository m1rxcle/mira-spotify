import { cn } from "@/lib/utils"
import type { Song } from "@/types"
import { RiHeart3Fill } from "@remixicon/react"

interface Props {
	isFeatured?: boolean
	songId: Song["_id"]
	handleToggleFeatured: (songId: string) => void
}

const AddToFavorite = ({ isFeatured, songId, handleToggleFeatured }: Props) => {
	return (
		<RiHeart3Fill
			onClick={() => handleToggleFeatured(songId)}
			className={cn(
				"w-6 h-6 cursor-pointer transition-all duration-300",
				isFeatured ? "text-white scale-100 opacity-100" : "text-gray-400 scale-90 opacity-50 hover:opacity-100"
			)}
		/>
	)
}

export default AddToFavorite
