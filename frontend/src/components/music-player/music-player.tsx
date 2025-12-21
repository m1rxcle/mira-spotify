import { COLORS } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useMusicStore } from "@/store/use-music-store"
import {
	RiArrowGoBackLine,
	RiArrowUpDownLine,
	RiDislikeLine,
	RiHeart3Line,
	RiPauseMiniLine,
	RiPlayFill,
	RiSkipLeftLine,
	RiSkipRightLine,
	RiVolumeDownLine,
} from "@remixicon/react"

const MusicPlayer = () => {
	const { changeColors, setChangeColors, isPlayButtonClicked, setIsPlayButtonClicked } = useMusicStore()

	const skipMusicHandler = () => {
		const randomIndex = Math.floor(Math.random() * COLORS.length)
		const randomColor = COLORS[randomIndex]
		setChangeColors(randomColor)
	}

	const handlePlayMusic = () => {
		// Logic to play music
		setIsPlayButtonClicked(!isPlayButtonClicked)
	}

	return (
		<div
			className={cn(
				changeColors === "red" && "bg-red-500/50",
				changeColors === "green" && "bg-green-500/50",
				changeColors === "blue" && "bg-blue-500/50",
				changeColors === "yellow" && "bg-yellow-500/50",
				changeColors === "orange" && "bg-orange-500/50",
				changeColors === "gray" && "bg-gray-500/50",
				changeColors === "cyan" && "bg-cyan-500/50",
				changeColors === "indigo" && "bg-indigo-500/50",
				changeColors === "pink" && "bg-pink-500/50",
				changeColors === "teal" && "bg-teal-500/50",
				changeColors === "amber" && "bg-amber-500/50",
				"md:rounded-2xl rounded-lg md:h-24 h-16 shrink-0"
			)}
		>
			<div className="flex justify-between items-center px-10 py-2  md:py-6 text-white/50 cursor-pointer">
				<div className="flex items-center">
					<img />
					<div className="flex flex-col justify-center items-start">
						<h3>title</h3>
						<p>artist</p>
					</div>
				</div>
				<div className="flex items-center gap-10 justify-between ">
					<div className="hover:text-white transition-colors ease-in-out duration-300">
						<RiHeart3Line size={30} />
					</div>
					<div className="flex items-center gap-4 justify-between">
						<div className="hover:text-white transition-colors ease-in-out duration-300">
							<RiArrowUpDownLine size={30} />
						</div>
						<div className="hover:text-white hover:scale-110 transition-all  ease-in-out duration-300">
							<RiSkipLeftLine size={30} />
						</div>
						<div onClick={handlePlayMusic} className="bg-[#12c74b] rounded-full p-1.5 hover:scale-105 transition-all  ease-in-out duration-300">
							{isPlayButtonClicked ? <RiPauseMiniLine className="text-black/70" size={40} /> : <RiPlayFill className="text-black/70" size={40} />}
						</div>
						<div onClick={skipMusicHandler} className="hover:text-white hover:scale-110 transition-all  ease-in-out duration-300">
							<RiSkipRightLine size={30} />
						</div>
						<div className="hover:text-white transition-colors ease-in-out duration-300">
							<RiArrowGoBackLine size={30} />
						</div>
					</div>
					<div className="hover:text-white transition-colors ease-in-out duration-300">
						<RiDislikeLine size={30} />
					</div>
				</div>
				<div className="hover:text-white transition-colors ease-in-out duration-300">
					<RiVolumeDownLine size={30} />
				</div>
			</div>
		</div>
	)
}

export default MusicPlayer
