import { RiArrowDropLeftLine, RiArrowDropRightLine } from '@remixicon/react'

import {
	useChangeArrow,
	useCollapsed,
	useSetChangeArrow,
	useSetCollapsed,
} from '../store/use-music-store'

const ChangeSizeSideBar = () => {
	const changeArrow = useChangeArrow()
	const setChangeArrow = useSetChangeArrow()
	const collapsed = useCollapsed()
	const setCollapsed = useSetCollapsed()

	const changeSizeHandler = () => {
		setChangeArrow(!changeArrow)
		setCollapsed(!collapsed)
	}
	return (
		<div
			onClick={changeSizeHandler}
			className="hidden absolute top-3 
					 opacity-60 rounded-lg -right-6 lg:group-hover:block
					 bg-gray-500/30 w-8 h-8 
					 hover:opacity-100 hover:cursor-pointer"
		>
			{changeArrow ? (
				<RiArrowDropRightLine className="size-8" />
			) : (
				<RiArrowDropLeftLine className="size-8" />
			)}
		</div>
	)
}

export default ChangeSizeSideBar
