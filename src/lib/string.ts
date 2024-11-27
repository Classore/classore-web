export const capitalize = (value: string) => {
	return value.charAt(0).toUpperCase() + value.slice(1)
}

export const getInitials = (value: string) =>
	value
		.split(" ")
		.map((word) => word.substring(0, 1))
		.join("")

export const sanitize = (value: string) => value.toLowerCase().split("_").join(" ")

export const normalize = (path: string) => {
	let normalPath: string
	if (path.split("/").length > 2) {
		const pathParts = `/${path.split("/")[1]}/${path.split("/")[2]}`
		normalPath = pathParts
	} else {
		normalPath = path
	}
	return normalPath
}
