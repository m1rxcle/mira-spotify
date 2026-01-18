import { User2 } from 'lucide-react'
import React from 'react'

interface Props {
	size?: number
	imageUrl?: string
}

export const ProfileImage: React.FC<Props> = ({ size, imageUrl }) => {
	return (
		<div className="rounded-full p-1 bg-linear-to-r from-[#ff3f3f] to-[#4262f0]">
			{imageUrl ? (
				<img src={imageUrl} alt="profile" className="w-full h-full rounded-full object-cover" />
			) : (
				<User2 className="text-center mx-auto bg-gray-300  text-black rounded-full" size={size} />
			)}
		</div>
	)
}
