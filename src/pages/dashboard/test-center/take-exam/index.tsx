import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";

const Page = () => {
	return (
		<>
			<Seo title="Test Center" />
			<DashboardLayout>
				<p>Take exam</p>
			</DashboardLayout>
		</>
	);
};

export default Page;
