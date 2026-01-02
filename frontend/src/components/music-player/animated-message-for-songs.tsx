import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import React from 'react'

import type { Song } from '@/types'

interface Props {
	message: string
	showMessage: boolean
	currentSong: Song
	setShowMessage: (value: boolean) => void
}

export const AnimatedMessageForSongs: React.FC<Props> = ({
	showMessage,
	currentSong,
	message,
	setShowMessage,
}) => {
	return (
		<AnimatePresence>
			{showMessage && (
				<>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						className="absolute -top-22 left-1/2 -translate-x-1/2 bg-zinc-800/90 text-white p-4  rounded-lg md:hidden"
					>
						<div className="flex items-start gap-4 relative">
							<img src={currentSong.imageUrl} alt="cur img" className="w-10 h-10 rounded-md" />
							<div className="flex flex-col ">
								<span className="font-bold text-md pr-1">{currentSong.title}</span>
								<span className="text-gray-400 ">{message}</span>
							</div>
							<div className="absolute -top-3 -right-3">
								<X
									onClick={() => setShowMessage(false)}
									size={20}
									className="cursor-pointer text-gray-400 hover:text-white"
								/>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						className="absolute -top-22 left-1/2 -translate-x-1/2 bg-zinc-800/90 text-white p-4  rounded-lg hidden md:block"
					>
						<div className="flex items-center gap-4 relative">
							<img src={currentSong.imageUrl} alt="cur img" className="w-10 h-10 rounded-md" />
							<div className="flex ">
								<span className="font-bold text-md pr-1">{currentSong.title}</span>
								<span className="text-gray-400">{message}</span>
							</div>
							<div className="absolute -top-3 -right-3">
								<X
									onClick={() => setShowMessage(false)}
									size={20}
									className="cursor-pointer text-gray-400 hover:text-white"
								/>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
