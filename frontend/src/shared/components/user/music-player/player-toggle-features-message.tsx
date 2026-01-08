import React, { useEffect, useState } from 'react'

import { AnimatedMessageForSongs } from './animated-message-for-songs'

import { useMessage } from '@/shared/store/use-user-store'
import type { Song } from '@/types'

const PlayerToggleFeaturesMessageComponent = ({ currentSong }: { currentSong: Song }) => {
	const [showMessage, setShowMessage] = useState(false)
	const message = useMessage()

	if (!currentSong) return null

	useEffect(() => {
		if (!message) return

		setShowMessage(true)

		const timer = setTimeout(() => {
			setShowMessage(false)
		}, 3000)

		return () => clearTimeout(timer)
	}, [message])

	return (
		<AnimatedMessageForSongs
			currentSong={currentSong}
			message={message}
			setShowMessage={setShowMessage}
			showMessage={showMessage}
		/>
	)
}

export const PlayerToggleFeaturesMessage = React.memo(PlayerToggleFeaturesMessageComponent)
