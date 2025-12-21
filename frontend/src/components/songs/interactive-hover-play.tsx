import { RiPlayMiniFill } from "@remixicon/react"

const InteractiveHoverPlay = ({ pos = "translate-x-2" }) => {
	return (
		<div className="absolute opacity-0 group-hover:opacity-80 transition-opacity duration-300">
			<RiPlayMiniFill size={30} className={`${pos} text-gray-700 cursor-pointer bg-gray-200 p-1 rounded-full hover:bg-white`} />
		</div>
	)
}

export default InteractiveHoverPlay
