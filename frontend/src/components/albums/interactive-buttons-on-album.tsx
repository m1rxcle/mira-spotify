import { RiHeart2Line, RiPlayMiniLine } from "@remixicon/react"

const InteractiveButtonsOnAlbum = () => {
	return (
		<>
			<div className="absolute  translate-y-8 bottom-25 left-4  group-hover:translate-y-6 transition-all ease-in duration-300">
				<RiPlayMiniLine className="size-12 bg-gray-400 p-1 rounded-full hover:bg-white hover:scale-110 transition-all ease-in duration-200 text-black" />
			</div>
			<div className="absolute translate-y-8 bottom-25 right-4  group-hover:translate-y-6 transition-all ease-in duration-300">
				<RiHeart2Line className="size-12 bg-black w-10 h-10 p-2 rounded-full hover:bg-gray-700 hover:scale-105 text-white transition-all ease-in duration-200" />
			</div>
		</>
	)
}

export default InteractiveButtonsOnAlbum
