export const capitalize = (value: string) => {
	return value.charAt(0).toUpperCase() + value.slice(1)
}

export const formatEmail = (email: string | undefined) => {
	if (!email) {
		throw new Error("Email address is required")
	}

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	if (!emailRegex.test(email?.trim())) {
		throw new Error("Invalid email format")
	}

	const [local, domain] = email.split("@")
	// Mask the local part except for the first two characters and last two characters
	const maskedLocal = local.length > 4 ? local.slice(0, 2) + "******" + local.slice(-2) : local

	return `${maskedLocal}@${domain}`
}

export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
		maximumFractionDigits: 2,
	}).format(amount)
}
