import React from 'react'

interface Props {
	height?: string
	width?: string
	imageUrl?: string
}

export const ProfileImage: React.FC<Props> = ({ width, height, imageUrl }) => {
	return (
		<div
			className={`w-${width} h-${height} rounded-full  p-0.5 bg-linear-to-r from-[#ff3f3f] to-[#4262f0] border border-black `}
		>
			<img src={imageUrl} className="rounded-full border border-black " />
		</div>
	)
}
