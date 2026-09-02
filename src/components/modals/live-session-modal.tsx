import React from "react";
import { format, isValid } from "date-fns";
import { useRouter } from "next/router";
import { toast } from "sonner";
import {
	RiCalendarLine,
	RiCheckLine,
	RiFileCopyLine,
	RiLock2Line,
	RiTimeLine,
	RiVideoLine,
} from "@remixicon/react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetProfile } from "@/queries/student";
import type { CalendarEventItem } from "@/queries/student";
import { getEventTemporalStatus } from "@/lib/date";
import { capitalize } from "@/lib";

export interface LiveSessionModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	event: (CalendarEventItem & { [key: string]: any }) | null;
}

// Resilient property getters
const getNote = (e: any): string => e?.note || e?.notes || e?.description || "";
const getPlatform = (e: any): string => e?.platform || e?.meeting_platform || e?.meetingPlatform || "";
const getFrequency = (e: any): string => e?.frequency || e?.event_frequency || e?.eventFrequency || "";
const getMeetingLink = (e: any): string =>
	e?.meeting_link ||
	e?.meetingLink ||
	e?.link ||
	e?.url ||
	e?.meeting_url ||
	e?.meetingUrl ||
	e?.join_url ||
	e?.joinUrl ||
	e?.zoom_link ||
	e?.google_meet_link ||
	"";
const getCategoryName = (e: any): string =>
	e?.category_id?.name || e?.category_id?.examination_name || (typeof e?.category_id === "string" ? e.category_id : "") || "";
const getSubCategoryName = (e: any): string =>
	e?.sub_category?.name || e?.sub_category?.examinationbundle_name || (typeof e?.sub_category === "string" ? e.sub_category : "") || "";
const getSubjectName = (e: any): string =>
	e?.subject?.name || e?.subject?.subject_name || (typeof e?.subject === "string" ? e.subject : "") || "";
const getEventDay = (e: any): number | undefined => e?.event_day ?? e?.eventDay ?? e?.day;

export const LiveSessionModal = ({ open, setOpen, event }: LiveSessionModalProps) => {
	const router = useRouter();
	const { data: profile } = useGetProfile();
	const [copied, setCopied] = React.useState(false);

	if (!event) return null;

	const rawMeetingLink = getMeetingLink(event);
	const hasMeetingLink = !!rawMeetingLink?.trim();
	const noteText = getNote(event);
	const platformText = getPlatform(event);
	const frequencyText = getFrequency(event);
	const categoryName = getCategoryName(event);
	const subCategoryName = getSubCategoryName(event);
	const subjectName = getSubjectName(event);
	const eventDayNumber = getEventDay(event);

	const temporalStatus = getEventTemporalStatus(event);
	const isLive = (event.is_live ?? (temporalStatus === "LIVE")) && event.is_active;
	const isEnded = temporalStatus === "ENDED";
	const isUpcoming = temporalStatus === "UPCOMING" && event.is_active;

	// Plan access check matching mobile
	const isEnrolledAndPaid = (() => {
		if (!profile?.time_line?.length) return false;

		const rawSubCat = event.sub_category as any;
		const eventBundleId = typeof rawSubCat === "string" ? rawSubCat : rawSubCat?.id;
		const eventBundleName = (
			rawSubCat?.name ||
			(typeof rawSubCat === "string" ? rawSubCat : "") ||
			""
		)
			.toLowerCase()
			.trim();

		const rawSubj = event.subject as any;
		const eventSubjectId = typeof rawSubj === "string" ? rawSubj : rawSubj?.id;
		const eventSubjectName = (
			rawSubj?.name ||
			(typeof rawSubj === "string" ? rawSubj : "") ||
			""
		)
			.toLowerCase()
			.trim();

		const matchingTimeline = profile.time_line.find((t) => {
			const isPaid = t.is_paid === true;
			const isActive = t.status === "ONGOING" || t.status === "ACTIVE";
			if (!isPaid || !isActive) return false;

			const bundleMatches =
				(eventBundleId &&
					(t.chosen_bundle === eventBundleId ||
						t.exam_bundle_details?.id === eventBundleId)) ||
				(eventBundleName &&
					(t.exam_bundle_details?.name?.toLowerCase().trim() === eventBundleName ||
						t.exam_bundle_details?.name?.toLowerCase().includes(eventBundleName) ||
						eventBundleName.includes(
							t.exam_bundle_details?.name?.toLowerCase().trim() || ""
						)));

			if (!bundleMatches) return false;

			if (eventSubjectId || eventSubjectName) {
				const subjectMatches = t.subjects?.some(
					(s) =>
						(eventSubjectId && s.id === eventSubjectId) ||
						(eventSubjectName &&
							s.name?.toLowerCase().trim() === eventSubjectName)
				);
				return !!subjectMatches;
			}

			return true;
		});

		return !!matchingTimeline;
	})();

	const startHour = event.start_hour ?? 0;
	const endHour = event.end_hour ?? 0;
	const durationHours = endHour > startHour ? endHour - startHour : 0;

	const formatHour = (hour: number) => {
		const suffix = hour >= 12 ? "PM" : "AM";
		const display = hour % 12 === 0 ? 12 : hour % 12;
		return `${display}:00 ${suffix}`;
	};

	const formattedDate = (() => {
		try {
			const d = new Date(event.date);
			return isValid(d) ? format(d, "EEEE, MMMM d, yyyy") : String(event.date || "");
		} catch {
			return String(event.date || "");
		}
	})();

	// 15-minute join activation check matching mobile
	const isJoinable = (() => {
		if (isEnded) return false;
		if (!hasMeetingLink || !event.is_active) return false;
		if (!isEnrolledAndPaid) return false;
		if (isLive) return true;

		try {
			const now = new Date();
			const eventDate = new Date(event.date);
			if (!isValid(eventDate)) return true;

			const isSameLocalDay =
				now.getFullYear() === eventDate.getFullYear() &&
				now.getMonth() === eventDate.getMonth() &&
				now.getDate() === eventDate.getDate();

			const isSameUTCDay =
				now.getUTCFullYear() === eventDate.getUTCFullYear() &&
				now.getUTCMonth() === eventDate.getUTCMonth() &&
				now.getUTCDate() === eventDate.getUTCDate();

			if (!isSameLocalDay && !isSameUTCDay) return false;

			const currentHour = now.getHours();
			const currentMinute = now.getMinutes();
			const currentTimeInMinutes = currentHour * 60 + currentMinute;

			const startMinutes = startHour * 60 - 15; // 15 mins prior
			const endMinutes = (endHour > 0 ? endHour : 24) * 60;

			return currentTimeInMinutes >= startMinutes && currentTimeInMinutes <= endMinutes;
		} catch {
			return true;
		}
	})();

	const handleCopy = () => {
		if (!rawMeetingLink) {
			toast.error("No meeting link available");
			return;
		}
		navigator.clipboard.writeText(rawMeetingLink);
		setCopied(true);
		toast.success("Meeting link copied to clipboard!");
		setTimeout(() => setCopied(false), 2000);
	};

	const handleJoinSession = () => {
		if (!hasMeetingLink) {
			toast.error("No meeting link was provided for this event.");
			return;
		}
		if (!isJoinable) {
			toast.error("The class session is not active yet.");
			return;
		}
		let url = rawMeetingLink.trim();
		if (!url.startsWith("http://") && !url.startsWith("https://")) {
			url = `https://${url}`;
		}
		window.open(url, "_blank");
	};

	const eventBundleId =
		typeof event.sub_category === "string" ? event.sub_category : event.sub_category?.id;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex w-full max-w-[480px] flex-col gap-5 p-6 max-h-[90vh] overflow-y-auto">
				{/* Header with status */}
				<div className="flex items-start justify-between gap-3">
					<div className="flex flex-wrap items-center gap-2">
						{isLive ? (
							<span className="flex items-center gap-1.5 rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-bold text-red-600 uppercase tracking-wider">
								<span className="size-2 rounded-full bg-red-500 animate-pulse" />
								Ongoing Live Class
							</span>
						) : isEnded ? (
							<span className="rounded-full bg-neutral-100 border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-600 uppercase tracking-wider">
								Class Concluded
							</span>
						) : isUpcoming ? (
							<span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700">
								<span className="size-1.5 rounded-full bg-emerald-600" />
								Upcoming Class
							</span>
						) : (
							<span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-500">
								Inactive
							</span>
						)}

						{eventDayNumber !== undefined && eventDayNumber !== null && (
							<span className="rounded-full bg-primary-50 border border-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
								Day {eventDayNumber}
							</span>
						)}
					</div>
				</div>

				{/* Title */}
				<div>
					<h2 className="text-xl font-bold text-neutral-900 leading-snug">
						{event.title || "Live Class Session"}
					</h2>
				</div>

				{/* Academic Program details */}
				<div className="rounded-2xl border border-neutral-100 bg-neutral-50/90 p-4 space-y-2.5">
					<p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
						Academic Program
					</p>
					<div className="flex flex-wrap gap-2">
						<div className="rounded-xl border border-neutral-200/80 bg-white px-3 py-1.5 shadow-2xs">
							<p className="text-[10px] uppercase font-medium text-neutral-400">Subject</p>
							<p className="text-xs font-bold text-neutral-900 capitalize mt-0.5">
								{subjectName || "General Subject"}
							</p>
						</div>
						<div className="rounded-xl border border-neutral-200/80 bg-white px-3 py-1.5 shadow-2xs">
							<p className="text-[10px] uppercase font-medium text-neutral-400">Target Exam</p>
							<p className="text-xs font-bold text-orange-600 uppercase mt-0.5">
								{subCategoryName || "All Exams"}
							</p>
						</div>
						<div className="rounded-xl border border-neutral-200/80 bg-white px-3 py-1.5 shadow-2xs">
							<p className="text-[10px] uppercase font-medium text-neutral-400">Category</p>
							<p className="text-xs font-bold text-neutral-900 capitalize mt-0.5">
								{categoryName || "General"}
							</p>
						</div>
					</div>
				</div>

				{/* Schedule & Platform details */}
				<div className="rounded-2xl border border-neutral-100 bg-neutral-50/90 p-4 space-y-3">
					<p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
						Schedule & Platform
					</p>

					<div className="flex items-center gap-3">
						<div className="grid size-9 place-items-center rounded-xl border border-neutral-200/60 bg-white text-primary-600 shadow-2xs shrink-0">
							<RiCalendarLine className="size-4" />
						</div>
						<div>
							<p className="text-xs text-neutral-400 font-medium">Date & Day</p>
							<p className="text-xs font-semibold text-neutral-800 mt-0.5">{formattedDate}</p>
						</div>
					</div>

					<div className="h-[1px] w-full bg-neutral-200/40" />

					<div className="flex items-center gap-3">
						<div className="grid size-9 place-items-center rounded-xl border border-neutral-200/60 bg-white text-primary-600 shadow-2xs shrink-0">
							<RiTimeLine className="size-4" />
						</div>
						<div>
							<p className="text-xs text-neutral-400 font-medium">Time & Duration</p>
							<p className="text-xs font-semibold text-neutral-800 mt-0.5">
								{formatHour(startHour)} - {formatHour(endHour)}
								{durationHours > 0 ? ` (${durationHours} ${durationHours === 1 ? "hr" : "hrs"})` : ""}
							</p>
						</div>
					</div>

					<div className="h-[1px] w-full bg-neutral-200/40" />

					<div className="grid grid-cols-2 gap-3">
						<div>
							<p className="text-xs text-neutral-400 font-medium">Platform</p>
							<p className="text-xs font-semibold text-neutral-800 capitalize mt-0.5">
								{platformText || "Not Specified"}
							</p>
						</div>
						<div>
							<p className="text-xs text-neutral-400 font-medium">Frequency</p>
							<p className="text-xs font-semibold text-neutral-800 capitalize mt-0.5">
								{frequencyText || "Once"}
							</p>
						</div>
					</div>
				</div>

				{/* Session Note */}
				{noteText.trim() && (
					<div className="rounded-2xl border border-primary-100 bg-primary-50/50 p-4 space-y-1">
						<p className="text-[10px] font-bold uppercase tracking-wider text-primary-800">
							Session Note & Overview:
						</p>
						<p className="text-xs leading-relaxed text-neutral-700 font-medium">
							{noteText.trim()}
						</p>
					</div>
				)}

				{/* Access and status notifications */}
				{isEnded ? (
					<div className="rounded-xl border border-neutral-200 bg-neutral-100 p-3 text-xs text-neutral-700 font-medium">
						ℹ️ This live class session has concluded.
					</div>
				) : !hasMeetingLink ? (
					<div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 font-medium leading-snug">
						ℹ️ No meeting link provided yet. It will be available once added by the instructor.
					</div>
				) : !isEnrolledAndPaid ? (
					<div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 space-y-2">
						<div className="flex items-center gap-2">
							<RiLock2Line className="size-4 text-amber-700" />
							<p className="text-xs font-bold text-amber-900">Access Restricted</p>
						</div>
						<p className="text-xs text-amber-800 leading-relaxed">
							You do not have access to this meeting link because you are not enrolled in the{" "}
							<span className="font-bold">{subCategoryName || "bundle"}</span>
							{subjectName ? ` (${subjectName})` : ""} plan.
						</p>
					</div>
				) : isLive ? (
					<div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 flex items-center gap-2 text-xs font-semibold text-emerald-900">
						<span className="size-2 rounded-full bg-emerald-600 animate-pulse" />
						Class is currently in session! Click below to join now.
					</div>
				) : !isJoinable ? (
					<div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-900 font-medium">
						ℹ️ The join button will be active 15 minutes before class begins.
					</div>
				) : null}

				{/* Actions */}
				<div className="flex flex-col gap-2 pt-2 border-t border-neutral-100">
					{isEnded ? (
						<Button disabled className="w-full bg-neutral-200 text-neutral-500">
							Class Session Ended
						</Button>
					) : !isEnrolledAndPaid && hasMeetingLink ? (
						<>
							<Button disabled className="w-full opacity-60">
								Locked (Not Enrolled)
							</Button>
							<Button
								variant="outline"
								onClick={() => {
									setOpen(false);
									if (eventBundleId) {
										router.push(`/dashboard/categories/${eventBundleId}`);
									} else {
										router.push("/dashboard/categories");
									}
								}}
								className="w-full border-primary-300 text-xs font-bold text-primary-700 hover:bg-primary-50">
								Unlock {capitalize(subCategoryName || "Bundle")} Plan
							</Button>
						</>
					) : (
						<div className="flex items-center gap-2">
							{hasMeetingLink && (
								<Button
									type="button"
									variant="outline"
									onClick={handleCopy}
									className="flex-1 text-xs font-semibold">
									{copied ? (
										<>
											<RiCheckLine className="size-3.5 mr-1 text-green-600" />
											Copied Link!
										</>
									) : (
										<>
											<RiFileCopyLine className="size-3.5 mr-1" />
											Copy Link
										</>
									)}
								</Button>
							)}
							<Button
								type="button"
								onClick={handleJoinSession}
								disabled={!isJoinable}
								className={`flex-1 text-xs font-bold ${isLive ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}>
								<RiVideoLine className="size-3.5 mr-1" />
								{!isJoinable
									? "Active 15m before class"
									: isLive
										? "Join Live Class Now"
										: "Join Meeting"}
							</Button>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};
