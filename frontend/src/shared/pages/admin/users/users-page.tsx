import React from 'react'

interface Props {
	className?: string
}

export const UsersPage: React.FC<Props> = ({ className }) => {
	return <div className={className}></div>
}
