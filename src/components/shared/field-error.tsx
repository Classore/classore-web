type FieldErrorProps = {
	message: string
}

export const FieldError = ({ message }: FieldErrorProps) => {
	return <p className="font-body text-sm text-error">{message}</p>
}
