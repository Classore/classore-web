import * as React from "react"

type UseCountDownProps = {
	total: number
	ms?: number
}

export const useCountDown = ({ total, ms = 1000 }: UseCountDownProps) => {
	const [counter, setCountDown] = React.useState(total)
	const [startCountDown, setStartCountDown] = React.useState(false)

	// Store the created interval
	const intervalId = React.useRef<number>()
	const start = () => setStartCountDown(true)
	const reset = () => {
		clearInterval(intervalId.current)
		setStartCountDown(false)
		setCountDown(total)
	}

	React.useEffect(() => {
		start()
		// @ts-expect-error ts-error
		intervalId.current = setInterval(() => {
			if (startCountDown && counter > 0) {
				setCountDown((counter) => counter - 1)
			}
		}, ms)
		// Clear interval when count to zero
		if (counter === 0) clearInterval(intervalId.current)
		// Clear interval when unmount
		return () => clearInterval(intervalId.current)
	}, [startCountDown, counter, ms])

	return { counter, start, reset } as const
}
