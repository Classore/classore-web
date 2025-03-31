import React from "react";

interface WindowSize {
	width: number;
	height: number;
}

export const useWindowSize = (): WindowSize => {
	const [windowSize, setWindowSize] = React.useState<WindowSize>({
		width: 0,
		height: 0,
	});

	const handleResize = React.useCallback(() => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}, []);

	React.useEffect(() => {
		if (typeof window !== "undefined") {
			handleResize();
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}
	}, [handleResize]);

	return windowSize;
};
