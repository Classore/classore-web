import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

const Page = () => {
	const router = useRouter()

	return (
		<>
			<Seo title="Dashboard" />
			<DashboardLayout>
				<h1>Welcome to your dashboard</h1>

				<button
					type="button"
					onClick={() => {
						localStorage.removeItem("CLASSORE_USER")
						Cookies.remove("CLASSORE_TOKEN")
						router.replace("/signin")
					}}>
					Sign out
				</button>
			</DashboardLayout>
		</>
	)
}

export default Page
