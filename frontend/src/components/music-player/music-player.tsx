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
import MusicPlayerSkeleton from "../skeletons/music-player-skeleton"
import { usePlayerStore } from "@/store/use-player-store"
import ChangeVolumeBlock from "./change-volume-block"
import { useRef, useState } from "react"
import { useClickAway } from "@reactuses/core"

const MusicPlayer = () => {
	const [openVolume, setOpenVolume] = useState(false)
	const volumeRef = useRef<HTMLDivElement>(null)
	useClickAway(volumeRef, () => setOpenVolume(false))

	const { isLoading } = useMusicStore()
	const { currentSong, isPlaying, changeColors, timeLeft, togglePlay, playNextSong, playPreviousSong } = usePlayerStore()

	const backToPrevSong = () => {
		playPreviousSong()
	}

	const skipMusicHandler = () => {
		playNextSong()
	}

	const handlePlayMusic = () => {
		togglePlay()
	}

	if (isLoading || !currentSong) {
		return <MusicPlayerSkeleton handlePlayMusic={handlePlayMusic} isPlayButtonClicked={isPlaying} />
	}

	let progress = 0
	if (timeLeft <= 0) {
		progress = 0
	} else if (timeLeft > currentSong.duration) {
		progress = 0
	} else if (currentSong.duration === 0) {
		progress = 0
	} else {
		progress = Math.round(((currentSong.duration - timeLeft) / currentSong.duration) * 100)
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
				"md:rounded-2xl rounded-lg md:h-22 h-16 shrink-0"
			)}
		>
			<div className="hidden md:flex justify-between items-center pl-2 pr-6 py-2 md:py-2.5 text-white/50 cursor-pointer relative z-50">
				<div className="flex items-center justify-center gap-4">
					<img
						loading="lazy"
						src={currentSong?.imageUrl}
						alt={currentSong?.title}
						className="w-12 h-12 md:w-16 md:h-16 rounded-md object-cover shadow-md shadow-black/50 "
					/>
					<div className="flex flex-col w-full justify-center items-start">
						<h3 className="text-white">{currentSong?.title}</h3>
						<p className="text-gray-400">{currentSong?.artist}</p>
					</div>
				</div>
				<div className="flex items-center gap-10 justify-between ">
					<div className="hover:text-white transition-colors ease-in-out duration-300">
						<RiHeart3Line size={25} />
					</div>
					<div className="flex items-center gap-4 justify-between">
						<div className="hover:text-white transition-colors ease-in-out duration-300">
							<RiArrowUpDownLine size={25} />
						</div>
						<div onClick={backToPrevSong} className="hover:text-white hover:scale-110 transition-all  ease-in-out duration-300">
							<RiSkipLeftLine size={25} />
						</div>
						<div onClick={handlePlayMusic} className="bg-[#12c74b] rounded-full p-1.5 hover:scale-105 transition-all  ease-in-out duration-300">
							{isPlaying ? <RiPauseMiniLine className="text-black/70" size={30} /> : <RiPlayFill className="text-black/70" size={30} />}
						</div>
						<div onClick={skipMusicHandler} className="hover:text-white hover:scale-110 transition-all  ease-in-out duration-300">
							<RiSkipRightLine size={25} />
						</div>
						<div className="hover:text-white transition-colors ease-in-out duration-300">
							<RiArrowGoBackLine size={25} />
						</div>
					</div>
					<div className="hover:text-white transition-colors ease-in-out duration-300">
						<RiDislikeLine size={25} />
					</div>
				</div>
				<div ref={volumeRef} className="flex gap-8 items-center hover:text-white transition-colors ease-in-out duration-300 relative">
					<RiVolumeDownLine onClick={() => setOpenVolume(!openVolume)} size={25} />
					<div className="absolute -top-45 -left-2">
						<ChangeVolumeBlock isOpenVolume={openVolume} />
					</div>
				</div>

				<div
					style={{
						width: `${progress}%`,
					}}
					className={`smooth-progress -z-50 absolute -bottom-0.5 left-0  h-full bg-gray-500/50 md:rounded-2xl rounded-lg  pl-2 pr-6 py-2 md:py-2.5 pointer-events-none `}
				></div>
			</div>

			{/* mobile */}

			<div className="relative flex justify-between items-center px-2 py-2 md:hidden z-50">
				<div className="flex items-center gap-5">
					<img className="w-12 h-12 rounded-md" src={currentSong?.imageUrl} />
					<div className="flex flex-col justify-center items-start">
						<h3 className="text-white">{currentSong?.title}</h3>
						<p className="text-gray-400">{currentSong?.artist}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<div className="hover:text-white transition-colors ease-in-out duration-300">
						<RiHeart3Line size={30} className="text-gray-400 hover:text-white transition-colors ease-in-out duration-300 cursor-pointer" />
					</div>
					<div onClick={handlePlayMusic} className="cursor-pointer p-1.5 hover:scale-110  transition-all  ease-in-out duration-300">
						{isPlaying ? (
							<RiPauseMiniLine className="text-gray-400 hover:text-black" size={30} />
						) : (
							<RiPlayFill className=" hover:text-black text-gray-400" size={30} />
						)}
					</div>
					<div onClick={skipMusicHandler}>
						<RiSkipRightLine
							size={30}
							className="cursor-pointer text-gray-500 hover:text-white hover:scale-110 transition-all  ease-in-out duration-300"
						/>
					</div>
				</div>
				<div
					style={{
						width: `${progress}%`,
					}}
					className={`smooth-progress md:rounded-2xl rounded-lg  -z-50 absolute bottom-0 left-0  h-full bg-gray-500/50 flex justify-between items-center px-2 py-2 md:hidden pointer-events-none `}
				></div>
			</div>
		</div>
	)
}

export default MusicPlayer
