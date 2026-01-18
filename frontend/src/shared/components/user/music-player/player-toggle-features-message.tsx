import React, { useEffect, useState } from 'react'

import { AnimatedMessageForSongs } from './animated-message-for-songs'

import { usePlayerCurrentSong } from '@/shared/store/use-player-store'
import { useClearMessage, useMessage } from '@/shared/store/use-user-store'

const PlayerToggleFeaturesMessageComponent = () => {
	const [showMessage, setShowMessage] = useState(false)
	const message = useMessage()
	const clearMessage = useClearMessage()

	const currentSong = usePlayerCurrentSong()

	if (!currentSong) return null

	useEffect(() => {
		console.log('useEffect fired, message:', message)
		if (!message) return

		setShowMessage(true)

		const timer = setTimeout(() => {
			setShowMessage(false)
			clearMessage()
		}, 3000)

		return () => {
			clearTimeout(timer)
		}
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
