import { cn } from "@/lib/utils"
import { Slider } from "../ui/slider"
import { usePlayerStore } from "@/store/use-player-store"

interface ChangeVolumeBlockProps {
	isOpenVolume: boolean
}

const ChangeVolumeBlock = ({ isOpenVolume }: ChangeVolumeBlockProps) => {
	const { volume, setChangeVolume } = usePlayerStore()

	return (
		<div className={cn(isOpenVolume ? "opacity-100" : "opacity-0", "transition-all duration-300 ease-in-out")}>
			<Slider
				defaultValue={[0.5]}
				max={1}
				step={0.02}
				className="bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-800 backdrop-blur-xl border border-gray-500/60 hover:text-green rounded-4xl px-4 py-2"
				value={volume}
				onValueChange={setChangeVolume}
				min={0}
				orientation="vertical"
			/>
		</div>
	)
}

export default ChangeVolumeBlock
