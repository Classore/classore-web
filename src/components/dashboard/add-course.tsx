import { RiAddLine, RiCloseLine, RiLoaderLine } from "@remixicon/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import * as z from "zod";

import { useGetExamBundles } from "@/queries/school";
import { useMiscStore } from "@/store/z-store/misc";
import { Select, SelectItem } from "../ui/select";
import { MultiSelect } from "../ui/multi-select";
import { Button } from "@/components/ui/button";
import type { WardProps } from "@/types/parent";
import { useGetExams } from "@/queries/school";
import { queryClient } from "@/providers";
import { CheckoutModal } from "../modals";
import type { HttpError } from "@/types";
import {
	type StudyPackDto,
	type VetStudyPackDto,
	useGetSubjects,
	vetStudyPack,
} from "@/queries/parent";

interface Props {
	ward: WardProps | null;
	wardId: string;
}

const schema = z.object({
	exam_type: z.string().min(1, "Examination type is required"),
	chosen_bundle: z.string().min(1, "Examination bundle is required"),
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

type FormValues = z.infer<typeof schema>;

export const AddWardCourse = ({ ward, wardId }: Props) => {
	// const [response, setResponse] = React.useState<VetStudyPackResponse | null>();
	const [openCheckout, setOpenCheckout] = React.useState(false);
	const setMiscStore = useMiscStore((state) => state.setMisc);
	const [open, setOpen] = React.useState(false);

	const { control, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
		defaultValues: {
			exam_type: "",
			chosen_bundle: "",
			subjects: [],
		},
		resolver: zodResolver(schema),
	});

	const values = watch();

	const { data: examinations } = useGetExams();
	const { data: bundles, isLoading: isLoadingBundles } = useGetExamBundles({
		examination: values.exam_type,
		limit: 30,
		page: 1,
	});
	const { data: subjects, isLoading: isLoadingSubjects } = useGetSubjects({
		examination_bundle: values.chosen_bundle,
		limit: 50,
		page: 1,
	});

	const { isPending, mutate } = useMutation({
		mutationFn: (payload: VetStudyPackDto) => vetStudyPack(payload),
		mutationKey: ["add-course-ward", wardId],
		onSuccess: (data) => {
			// setResponse(data.data);
			const response = data?.data;
			const payload = {
				wards: [ward],
				total_wards: 1,
				exam_type: values.exam_type,
				chosen_bundle: values.chosen_bundle,
				subjects: values.subjects,
				...response,
			};

			setMiscStore(payload);
			setOpen(false);
			setOpenCheckout(true);
		},
		onError: (error: HttpError) => {
			console.error(error);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["get-parent-home"] });
			// setOpen(false);
		},
	});

	const options = React.useMemo(() => {
		if (!subjects) return [];
		return subjects.data.map((subject) => ({
			label: subject.subject_name,
			value: subject.subject_id,
		}));
	}, [subjects]);

	const maxSelectable = React.useMemo(() => {
		if (!values.chosen_bundle) return 0;
		const bundle = bundles?.data.find(
			(bundle) => bundle.examinationbundle_id === values.chosen_bundle
		);
		if (!bundle) return 0;
		return bundle.examinationbundle_max_subjects;
	}, [bundles, values.chosen_bundle]);

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		const studyPack = {
			chosen_bundle: data.chosen_bundle,
			subject_length: data.subjects.length,
		};
		const vettings: StudyPackDto[] = [];
		vettings.push(studyPack);
		const payload: VetStudyPackDto = {
			vettings,
		};

		mutate(payload);
	};

	React.useEffect(() => {
		setValue("subjects", []);
	}, [values.chosen_bundle, setValue]);

	React.useEffect(() => {
		if (!open) {
			reset({
				exam_type: "",
				chosen_bundle: "",
				subjects: [],
			});
		}
	}, [open]);

	return (
		<>
			<Button size="sm" onClick={() => setOpen(true)} className="w-fit">
				<RiAddLine /> Add Course
			</Button>
			<div
				hidden={!open}
				onClick={() => setOpen(false)}
				className={`fixed left-0 top-0 !z-40 h-screen w-screen bg-black/50 ${open ? "block" : "hidden"}`}>
				<div
					onClick={(e) => e.stopPropagation()}
					className="absolute right-2 top-2 w-[400px] space-y-4 rounded-lg bg-white p-1">
					<div className="w-full rounded-lg border p-4">
						<div className="flex w-full items-center justify-end">
							<button onClick={() => setOpen(false)}>
								<RiCloseLine className="size-4" />
							</button>
						</div>
						<div className="w-full space-y-6">
							<div>
								<h2 className="text-xl font-semibold">Add Courses</h2>
								<p className="text-sm text-neutral-400">
									Your Ward will be notified by Classore after payment
								</p>
							</div>
							<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
								<Select control={control} name="exam_type" label="Select Category">
									{examinations?.map((exam) => (
										<SelectItem key={exam.examination_id} value={exam.examination_id}>
											{exam.examination_name}
										</SelectItem>
									))}
								</Select>
								<Select
									control={control}
									name="chosen_bundle"
									label="Select Subcategory"
									className="uppercase"
									disabled={!values.exam_type || isLoadingBundles}>
									{bundles?.data?.map((bundle) => (
										<SelectItem
											key={bundle.examinationbundle_id}
											className="uppercase"
											value={bundle.examinationbundle_id}>
											{bundle.examinationbundle_name}
										</SelectItem>
									))}
								</Select>
								<MultiSelect
									control={control}
									name="subjects"
									label="Select subjects"
									placeholder="Select subjects..."
									options={options || []}
									maxSelectable={maxSelectable}
									disabled={!values.chosen_bundle || isLoadingSubjects}
								/>
								<div>
									<button
										type="button"
										className="flex items-center gap-x-2 text-xs font-medium text-secondary-400">
										<RiAddLine className="size-4" /> Add more course
									</button>
								</div>
								<Button type="submit">
									{isPending ? <RiLoaderLine className="animate-spin" /> : "Proceed to Checkout"}
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>

			<CheckoutModal open={openCheckout} setOpen={setOpenCheckout} />
		</>
	);
};
