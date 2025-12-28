import { ChevronRight } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

interface Props {
	history: any
	hasPreview: boolean
	className?: string
}

export const CardForHistorySection: React.FC<Props> = ({ hasPreview, history }) => {
	return (
		<Link to="/library" className="flex flex-row justify-between items-center w-full">
			<div className="flex items-center justify-between gap-3 bg-zinc-600/30 backdrop-blur-md p-3 h-20 lg:h-25 rounded-lg w-full relative">
				<div className="flex items-center justify-start gap-3 ">
					<img src="/features-heart.png" className="w-15 h-15 rounded-lg object-cover" />
					<div>
						<div className="flex items-center justify-start group">
							<h1 className="text-lg font-bold line-clamp-1">Featured Song&apos;s</h1>
							<ChevronRight
								size={24}
								className="text-gray-400 translate-y-0.4 hidden lg:inline group-hover:translate-x-2 transition-all ease-in duration-200"
							/>
						</div>
						<div className="flex flex-row   w-full">
							<p className="text-md text-gray-400 leading-4 line-clamp-1">
								{history.map((song, index) => {
									if (index > 2) return
									return <span>{index === 2 ? song.title : song.title + " ,"}</span>
								})}
							</p>
						</div>
					</div>
				</div>
				{hasPreview && (
					<div className="hidden lg:flex opacity-70">
						<div className="absolute top-6 right-7 w-13 h-13 z-10">
							<img src={history[0]?.imageUrl ?? ""} className="w-15 h-13 rounded-lg" alt={history[0]?.title ?? ""} />
						</div>
						<div className="absolute top-4 right-3  w-13 h-13 z-0">
							<img src={history[1]?.imageUrl ?? ""} className="w-15 h-13 rounded-lg" alt={history[1]?.title ?? ""} />
						</div>
					</div>
				)}
			</div>
		</Link>
	)
}
