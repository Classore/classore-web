import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/router"

export const BackBtn = () => {
	const router = useRouter()

	return (
		<button
			onClick={() => router.back()}
			type="button"
			className="relative z-50 flex items-center gap-1 self-start rounded-lg border bg-neutral-100 px-3 py-2">
			<ChevronLeft className="size-4" />
			<span className="text-sm text-neutral-700">Back</span>
		</button>
	)
}
