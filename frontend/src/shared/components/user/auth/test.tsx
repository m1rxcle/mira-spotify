import { memo } from 'react'

export const Test = memo(function Test({ name }: { name: string }) {
	console.log('Hello', name)
	return <div>{name}</div>
})
