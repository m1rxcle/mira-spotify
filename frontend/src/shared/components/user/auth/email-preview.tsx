import React from 'react'

interface Props {
	email: string | undefined
}

export const EmailPreview: React.FC<Props> = React.memo(({ email }) => {
	return <p className="text-md text-gray-500">{email}</p>
})
