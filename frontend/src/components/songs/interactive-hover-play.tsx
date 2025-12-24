import { RiPauseMiniFill, RiPlayMiniFill } from "@remixicon/react"

const InteractiveHoverPlay = ({
	pos = "translate-x-2",
	isPlayButtonClicked,
	isCurrentSong,
}: {
	pos?: string
	isPlayButtonClicked: boolean
	isCurrentSong?: boolean
}) => {
	return (
		<div className="absolute opacity-0 group-hover:opacity-80 transition-opacity duration-300">
			{isPlayButtonClicked && isCurrentSong ? (
				<RiPauseMiniFill size={30} className={`${pos} text-gray-700 cursor-pointer bg-gray-200 p-1 rounded-full hover:bg-white`} />
			) : (
				<RiPlayMiniFill size={30} className={`${pos} text-gray-700 cursor-pointer bg-gray-200 p-1 rounded-full hover:bg-white`} />
			)}
		</div>
	)
}

export default InteractiveHoverPlay
