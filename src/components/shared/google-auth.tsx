import { GoogleIcon } from "@/assets/icons"
import { GoogleAuthMutation } from "@/queries"
import { useMutation } from "@tanstack/react-query"
import { Button } from "../ui/button"
import { Spinner } from "./spinner"

export const GoogleAuth = () => {
	const { isPending, mutate } = useMutation({
		mutationKey: ["google-auth"],
		mutationFn: GoogleAuthMutation,
	})

	return (
		<Button
			onClick={() => mutate()}
			type="button"
			variant="ghost"
			className="font-normal"
			disabled={isPending}>
			{isPending ? (
				<Spinner />
			) : (
				<>
					<GoogleIcon />
					<span>Continue with Google</span>
				</>
			)}
		</Button>
	)
}