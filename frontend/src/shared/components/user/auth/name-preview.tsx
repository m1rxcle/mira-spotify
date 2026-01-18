import React from 'react'

interface Props {
	firstName: string | undefined
	lastName: string | undefined
}

export const NamePreview: React.FC<Props> = React.memo(({ firstName, lastName }) => {
	return (
		<h1 className="text-xl font-semibold ">
			{firstName} {lastName}
		</h1>
	)
})
