import { RiLoaderLine, RiUserAddLine } from "@remixicon/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import * as z from "zod";
import React from "react";

import { useGetExams, useGetExamBundles, useGetSubjects, useVetStudyPack } from "@/queries/school";
import { type AddWardDto, addWard } from "@/queries/parent";
import { Select, SelectItem } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { IconLabel, Seo } from "@/components/shared";
import { CheckoutModal } from "@/components/modals";
import { useMiscStore } from "@/store/z-store/misc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { classore } from "@/assets/images";
import { queryClient } from "@/providers";
import type { HttpError } from "@/types";
import { formatCurrency } from "@/lib";

const schema = z.object({
	first_name: z.string().min(1, { message: "First name is required" }),
	last_name: z.string().min(1, { message: "Last name is required" }),
	email: z.string().email({ message: "Invalid email address" }),
	examination: z.string().min(1, { message: "Examination is required" }),
	examination_bundle: z.string().min(1, { message: "Examination bundle is required" }),
	subjects: z
		.string({
			required_error: "Please select at least one subject",
			invalid_type_error: "Please select at least one subject",
		})
		.min(1, { message: "Please select at least one subject" })
		.transform((value) => {
			return value.split(", ");
		}),
});

type AddWardForm = z.infer<typeof schema>;

const Page = () => {
	const [numberOfSubjects, setNumberOfSubjects] = React.useState(0);
	const [open, setOpen] = React.useState(false);
	const setMiscStore = useMiscStore((state) => state.setMisc);

	const { mutateAsync: vetStudyPack } = useVetStudyPack();

	const { control, handleSubmit, reset, watch } = useForm<AddWardForm>({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			examination: "",
			examination_bundle: "",
			subjects: [],
		},
		resolver: zodResolver(schema),
	});

	const values = watch();

	const { isPending, mutateAsync } = useMutation({
		mutationFn: addWard,
		onSuccess: (data) => {
			const response = data?.data;

			const chosen_bundle = values.examination_bundle;
			const subject_length = numberOfSubjects;
			const payload = { chosen_bundle, subject_length };

			vetStudyPack(
				{
					vettings: [payload],
				},
				{
					onSuccess: (data) => {
						const payload = {
							wards: response.wards,
							total_wards: 1,
							exam_type: values.examination,
							chosen_bundle,
							subjects: values.subjects,
							...data?.data,
						};

						setMiscStore(payload);
						setOpen(true);
					},
				}
			);
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error?.response?.data?.message)
				? error?.response?.data?.message[0]
				: error?.response?.data?.message;
			const message = errorMessage || "Something went wrong, please try again later.";
			toast.error(message);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["get-wards"] });
		},
	});

	const { data: examinations } = useGetExams();
	const { data: examination_bundles } = useGetExamBundles({
		examination: values.examination,
		limit: 20,
		page: 1,
	});
	const { data: fetchedSubjects } = useGetSubjects();

	const subjects = React.useMemo(() => {
		if (!examination_bundles || !fetchedSubjects) return [];
		return fetchedSubjects?.filter(
			(subject) =>
				subject.subject_examination_bundle.toLowerCase() === values.examination_bundle.toLowerCase()
		);
	}, [examination_bundles, fetchedSubjects, values.examination_bundle]);

	const maxSelectable = React.useMemo(() => {
		if (!examination_bundles?.data) {
			return 0;
		}
		const selectedBundleId = values.examination_bundle.toLowerCase();
		const selectedBundle = examination_bundles?.data?.find(
			(bundle) => bundle.examinationbundle_id.toLowerCase() === selectedBundleId
		);
		return selectedBundle?.examinationbundle_max_subjects ?? 0;
	}, [examination_bundles, values.examination_bundle]);

	const onSubmit: SubmitHandler<AddWardForm> = (data) => {
		const payload: AddWardDto = {
			first_name: data?.first_name,
			last_name: data?.last_name,
			email: data?.email,
			examination: data?.examination,
			examination_bundle: data?.examination_bundle,
			subjects: data?.subjects,
		};
		setNumberOfSubjects(data?.subjects?.length);
		const wards: AddWardDto[] = [];
		wards.push(payload);
		mutateAsync(wards);
	};

	React.useEffect(() => {
		if (values.examination) {
			reset({
				...values,
				examination_bundle: "",
				subjects: [],
			});
		}
	}, [values.examination]);

	return (
		<>
			<Seo title="Add Ward" />
			<div className="grid h-screen w-screen grid-cols-5">
				<div className="col-span-2 h-full p-10 pl-20">
					<Link href="/" className="w-fit">
						<Image src={classore} alt="classore" width={140} height={32} />
					</Link>
				</div>
				<div className="col-span-3 flex h-full flex-col justify-center gap-y-5 bg-white px-10 lg:px-32 lg:py-6">
					<IconLabel icon={RiUserAddLine} />
					<div>
						<h3 className="text-xl font-semibold">Add New Ward</h3>
						<p className="text-sm text-neutral-400">Fill in the details of the ward you want to add.</p>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 lg:w-3/4">
						<Input control={control} name="first_name" label="First Name" type="text" />
						<Input control={control} name="last_name" label="Last Name" type="text" />
						<Input control={control} name="email" label="Email" type="email" />
						<Select control={control} name="examination" label="What is He/She studying for">
							{examinations?.map((exam) => (
								<SelectItem key={exam.examination_id} value={exam.examination_id}>
									{exam.examination_name}
								</SelectItem>
							))}
						</Select>
						<Select
							control={control}
							name="examination_bundle"
							disabled={!values.examination}
							label="Select Prep Bundle">
							{examination_bundles?.data?.map((bundle) => (
								<SelectItem key={bundle.examinationbundle_id} value={bundle.examinationbundle_id}>
									{bundle.examinationbundle_name} Exam Prep Bundle (
									{formatCurrency(bundle.examinationbundle_amount)})
								</SelectItem>
							))}
						</Select>
						<MultiSelect
							control={control}
							label="Select Subjects"
							name="subjects"
							options={
								subjects?.map((subject) => ({
									label: subject.subject_name,
									value: subject.subject_id,
								})) ?? []
							}
							maxSelectable={maxSelectable}
						/>
						<div className="flex w-full items-center justify-end gap-x-4">
							<Button className="w-fit" disabled={isPending} size="sm" type="submit">
								{isPending ? <RiLoaderLine className="animate-spin" /> : "Add Ward"}
							</Button>
						</div>
					</form>
				</div>
			</div>

			<CheckoutModal open={open} setOpen={setOpen} />
		</>
	);
};

export default Page;
