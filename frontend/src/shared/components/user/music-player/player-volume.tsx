import { useClickAway } from '@reactuses/core'
import { RiVolumeDownLine } from '@remixicon/react'
import React, { useRef, useState } from 'react'

import ChangeVolumeBlock from './change-volume-block'

export const PlayerVolume: React.FC = () => {
	const [openVolume, setOpenVolume] = useState(false)

	const volumeRef = useRef<HTMLDivElement>(null)
	useClickAway(volumeRef, () => setOpenVolume(false))
	return (
		<div
			ref={volumeRef}
			className="flex gap-8 items-center hover:text-white transition-colors ease-in-out duration-300 relative cursor-pointer"
		>
			<RiVolumeDownLine onClick={() => setOpenVolume(!openVolume)} size={25} />
			<div className="absolute -top-45 -left-2">
				<ChangeVolumeBlock isOpenVolume={openVolume} />
			</div>
		</div>
	)
}
