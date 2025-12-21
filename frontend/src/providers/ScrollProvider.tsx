import { useState, useRef, useEffect } from "react"

const ScrollContainer = ({ children }: { children: React.ReactNode }) => {
	const [scrolling, setScrolling] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		const el = ref.current
		let timeout: NodeJS.Timeout

		const onScroll = () => {
			setScrolling(true)
			clearTimeout(timeout)
			timeout = setTimeout(() => setScrolling(false), 1000) // исчезает через 1 сек после скролла
		}

		el.addEventListener("scroll", onScroll)
		return () => el.removeEventListener("scroll", onScroll)
	}, [])

	return (
		<div ref={ref} className={`flex-1 min-h-0 overflow-y-auto scrollbar ${scrolling ? "scrolling" : ""}`}>
			{children}
		</div>
	)
}

export default ScrollContainer
