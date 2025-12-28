import { Skeleton } from "../ui/skeleton"

const MusicPlayerSkeleton = () => {
	return (
		<>
			<div className="hidden md:flex justify-between items-center px-10 py-2 md:py-4 text-white/50 cursor-pointer">
				<div className="flex items-center">
					<Skeleton className="w-12 h-12 rounded-md" />
					<div className="flex flex-col justify-center gap-2 items-start">
						<Skeleton className="w-25 h-3 ml-2" />
						<Skeleton className="w-10 h-3 ml-2" />
					</div>
				</div>
				<div className="flex items-center gap-10 justify-between ">
					<div className="hover:text-white transition-colors ease-in-out duration-300">
						<Skeleton className="w-6 h-6 rounded-full" />
					</div>
					<div className="flex items-center gap-4 justify-between">
						<div className="hover:text-white transition-colors ease-in-out duration-300">
							<Skeleton className="w-6 h-6 rounded-full" />
						</div>
						<div className=" hover:scale-105 transition-all  ease-in-out duration-300">
							<Skeleton className="w-10 h-10 rounded-full" />
						</div>
						<div className=" p-1.5 hover:scale-105 transition-all  ease-in-out duration-300">
							<Skeleton className="w-6 h-6 rounded-full" />
						</div>
						<div className="hover:text-white hover:scale-110 transition-all  ease-in-out duration-300">
							<Skeleton className="w-6 h-6 rounded-full" />
						</div>
						<div className="hover:text-white transition-colors ease-in-out duration-300">
							<Skeleton className="w-6 h-6 rounded-full" />
						</div>
					</div>
				</div>
				<div className="hover:text-white transition-colors ease-in-out duration-300">
					<Skeleton className="w-6 h-6 rounded-full" />
				</div>
			</div>

			<div className="flex justify-between items-center px-2 py-2 md:hidden">
				<div className="flex items-center gap-5">
					<Skeleton className="w-12 h-12 rounded-md" />
					<div className="flex flex-col justify-center gap-2 items-start">
						<Skeleton className="w-25 h-3" />
						<Skeleton className="w-10 h-3" />
					</div>
				</div>
				<div className="flex items-center gap-2">
					<div className="hover:text-white transition-colors ease-in-out duration-300">
						<Skeleton className="w-6 h-6 rounded-full" />
					</div>
					<div className="cursor-pointer p-1.5 hover:scale-110  transition-all  ease-in-out duration-300">
						<Skeleton className="w-6 h-6 rounded-full" />
					</div>
					<div>
						<Skeleton className="w-6 h-6 rounded-full" />
					</div>
				</div>
			</div>
		</>
	)
}

export default MusicPlayerSkeleton
