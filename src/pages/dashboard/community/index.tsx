import { type Socket, io } from "socket.io-client";
import { useRouter } from "next/router";
import { toast } from "sonner";
import React from "react";
import {
	RiAiGenerate,
	RiArrowLeftSLine,
	RiCheckDoubleLine,
	RiEmotionHappyLine,
	RiForbid2Line,
	RiLock2Line,
	RiHashtag,
	RiImageAddLine,
	RiMore2Line,
	RiSearchLine,
	RiSendPlaneLine,
	RiVolumeMuteLine,
	RiVolumeUpLine,
} from "@remixicon/react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetInfiniteMessages, useGetForums } from "@/queries/message";
import { useDeviceWidth, useFileHandler } from "@/hooks";
import { DashboardLayout } from "@/components/layouts";
import type { RoomProps } from "@/types/message";
import type { MessageProps } from "@/types/message";
import { useUserStore } from "@/store/z-store";
import { Seo } from "@/components/shared";
// import { Input } from "@/components/ui/input"; // Removed to fix form context error
import { cn, sendMessage, getInitials } from "@/lib";
import { format } from "date-fns";

type FormProps = {
	content: string;
	media: File[];
};

const initialValues: FormProps = {
	content: "",
	media: [],
};

// Emoji categories - identical to messages page
const emojiCategories = {
	"Smileys & People": [
		"😀",
		"😃",
		"😄",
		"😁",
		"😆",
		"😅",
		"😂",
		"🤣",
		"😊",
		"😇",
		"🙂",
		"🙃",
		"😉",
		"😌",
		"😍",
		"🥰",
		"😘",
		"😗",
		"😙",
		"😚",
		"😋",
		"😛",
		"😝",
		"😜",
		"🤪",
		"🤨",
		"🧐",
		"🤓",
		"😎",
		"🤩",
		"🥳",
		"😏",
		"😒",
		"😞",
		"😔",
		"😟",
		"😕",
		"🙁",
		"☹️",
		"😣",
		"😖",
		"😫",
		"😩",
		"🥺",
		"😢",
		"😭",
		"😤",
		"😠",
		"😡",
		"🤬",
		"🤯",
		"😳",
		"🥵",
		"🥶",
		"😱",
		"😨",
		"😰",
		"😥",
		"😓",
		"🤗",
		"🤔",
		"🤭",
		"🤫",
		"🤥",
		"😶",
		"😐",
		"😑",
		"😬",
		"🙄",
		"😯",
		"😦",
		"😧",
		"😮",
		"😲",
		"🥱",
		"😴",
		"🤤",
		"😪",
		"😵",
		"🤐",
		"🥴",
		"🤢",
		"🤮",
		"🤧",
		"😷",
		"🤒",
		"🤕",
	],
	"Animals & Nature": [
		"🐶",
		"🐱",
		"🐭",
		"🐹",
		"🐰",
		"🦊",
		"🐻",
		"🐼",
		"🐨",
		"🐯",
		"🦁",
		"🐮",
		"🐷",
		"🐽",
		"🐸",
		"🐵",
		"🙈",
		"🙉",
		"🙊",
		"🐒",
		"🐔",
		"🐧",
		"🐦",
		"🐤",
		"🐣",
		"🐥",
		"🦆",
		"🦅",
		"🦉",
		"🦇",
		"🐺",
		"🐗",
		"🐴",
		"🦄",
		"🐝",
		"🐛",
		"🦋",
		"🐌",
		"🐞",
		"🐜",
		"🦟",
		"🦗",
		"🕷️",
		"🕸️",
		"🦂",
		"🐢",
		"🐍",
		"🦎",
		"🦖",
		"🦕",
		"🐙",
		"🦑",
		"🦐",
		"🦞",
		"🦀",
		"🐡",
		"🐠",
		"🐟",
		"🐬",
		"🐳",
		"🐋",
		"🦈",
		"🐊",
		"🐅",
		"🐆",
		"🦓",
		"🦍",
		"🦧",
		"🐘",
		"🦛",
		"🦏",
		"🐪",
		"🐫",
		"🦒",
		"🦘",
		"🐃",
		"🐂",
		"🐄",
		"🐎",
		"🐖",
		"🐏",
		"🐑",
		"🦙",
		"🐐",
		"🦌",
		"🐕",
		"🐩",
		"🦮",
		"🐕‍🦺",
		"🐈",
		"🐓",
		"🦃",
		"🦚",
		"🦜",
		"🦢",
		"🦩",
		"🕊️",
		"🐇",
		"🦝",
		"🦨",
		"🦡",
		"🦦",
		"🦥",
		"🐁",
		"🐀",
		"🐿️",
		"🦔",
	],
	"Food & Drink": [
		"🍎",
		"🍐",
		"🍊",
		"🍋",
		"🍌",
		"🍉",
		"🍇",
		"🍓",
		"🫐",
		"🍈",
		"🍒",
		"🍑",
		"🥭",
		"🍍",
		"🥥",
		"🥝",
		"🍅",
		"🍆",
		"🥑",
		"🥦",
		"🥬",
		"🥒",
		"🌶️",
		"🫑",
		"🌽",
		"🥕",
		"🫒",
		"🧄",
		"🧅",
		"🥔",
		"🍠",
		"🥐",
		"🥯",
		"🍞",
		"🥖",
		"🥨",
		"🧀",
		"🥚",
		"🍳",
		"🧈",
		"🥞",
		"🧇",
		"🥓",
		"🥩",
		"🍗",
		"🍖",
		"🦴",
		"🌭",
		"🍔",
		"🍟",
		"🍕",
		"🫓",
		"🥪",
		"🥙",
		"🧆",
		"🌮",
		"🌯",
		"🫔",
		"🥗",
		"🥘",
		"🫕",
		"🥫",
		"🍝",
		"🍜",
		"🍲",
		"🍛",
		"🍣",
		"🍱",
		"🥟",
		"🦪",
		"🍤",
		"🍙",
		"🍚",
		"🍘",
		"🍥",
		"🥠",
		"🥮",
		"🍢",
		"🍡",
		"🍧",
		"🍨",
		"🍦",
		"🥧",
		"🧁",
		"🍰",
		"🎂",
		"🍮",
		"🍭",
		"🍬",
		"🍫",
		"🍿",
		"🍩",
		"🍪",
		"🌰",
		"🥜",
		"🍯",
	],
	Activities: [
		"⚽",
		"🏀",
		"🏈",
		"⚾",
		"🥎",
		"🎾",
		"🏐",
		"🏉",
		"🥏",
		"🎱",
		"🪀",
		"🏓",
		"🏸",
		"🏒",
		"🏑",
		"🥍",
		"🏏",
		"🪃",
		"🥅",
		"⛳",
		"🪁",
		"🏹",
		"🎣",
		"🤿",
		"🥊",
		"🥋",
		"🎽",
		"🛹",
		"🛷",
		"⛸️",
		"🥌",
		"🎿",
		"⛷️",
		"🏂",
		"🪂",
		"🏋️‍♀️",
		"🏋️",
		"🏋️‍♂️",
		"🤼‍♀️",
		"🤼",
		"🤼‍♂️",
		"🤸‍♀️",
		"🤸",
		"🤸‍♂️",
		"⛹️‍♀️",
		"⛹️",
		"⛹️‍♂️",
		"🤺",
		"🤾‍♀️",
		"🤾",
		"🤾‍♂️",
		"🏌️‍♀️",
		"🏌️",
		"🏌️‍♂️",
		"🏇",
		"🧘‍♀️",
		"🧘",
		"🧘‍♂️",
		"🏄‍♀️",
		"🏄",
		"🏄‍♂️",
		"🏊‍♀️",
		"🏊",
		"🏊‍♂️",
		"🤽‍♀️",
		"🤽",
		"🤽‍♂️",
		"🚣‍♀️",
		"🚣",
		"🚣‍♂️",
		"🧗‍♀️",
		"🧗",
		"🧗‍♂️",
		"🚵‍♀️",
		"🚵",
		"🚵‍♂️",
		"🚴‍♀️",
		"🚴",
		"🚴‍♂️",
		"🏆",
		"🥇",
		"🥈",
		"🥉",
		"🏅",
		"🎖️",
		"🏵️",
		"🎗️",
		"🎫",
		"🎟️",
		"🎪",
		"🤹‍♀️",
		"🤹",
		"🤹‍♂️",
		"🎭",
		"🩰",
		"🎨",
		"🎬",
		"🎤",
		"🎧",
		"🎼",
		"🎵",
		"🎶",
	],
	"Travel & Places": [
		"🚗",
		"🚕",
		"🚙",
		"🚌",
		"🚎",
		"🏎️",
		"🚓",
		"🚑",
		"🚒",
		"🚐",
		"🛻",
		"🚚",
		"🚛",
		"🚜",
		"🏍️",
		"🛵",
		"🚲",
		"🛴",
		"🛹",
		"🛼",
		"🚁",
		"🛸",
		"✈️",
		"🛩️",
		"🛫",
		"🛬",
		"🪂",
		"💺",
		"🚀",
		"🛰️",
		"🚉",
		"🚞",
		"🚝",
		"🚄",
		"🚅",
		"🚈",
		"🚂",
		"🚆",
		"🚇",
		"🚊",
		"🛶",
		"⛵",
		"🚤",
		"🛥️",
		"🛳️",
		"⛴️",
		"🚢",
		"⚓",
		"⛽",
		"🚧",
		"🚨",
		"🚥",
		"🚦",
		"🛑",
		"🚏",
		"🗺️",
		"🗿",
		"🗽",
		"🗼",
		"🏰",
		"🏯",
		"🏟️",
		"🎡",
		"🎢",
		"🎠",
		"⛲",
		"⛱️",
		"🏖️",
		"🏝️",
		"🏜️",
		"🌋",
		"⛰️",
		"🏔️",
		"🗻",
		"🏕️",
		"⛺",
		"🏠",
		"🏡",
		"🏘️",
		"🏚️",
		"🏗️",
		"🏭",
		"🏢",
		"🏬",
		"🏣",
		"🏤",
		"🏥",
		"🏦",
		"🏨",
		"🏪",
		"🏫",
		"🏩",
		"💒",
		"🏛️",
		"⛪",
		"🕌",
		"🕍",
		"🛕",
		"🕋",
	],
	Objects: [
		"⌚",
		"📱",
		"📲",
		"💻",
		"⌨️",
		"🖥️",
		"🖨️",
		"🖱️",
		"🖲️",
		"🕹️",
		"🗜️",
		"💽",
		"💾",
		"💿",
		"📀",
		"📼",
		"📷",
		"📸",
		"📹",
		"🎥",
		"📽️",
		"🎞️",
		"📞",
		"☎️",
		"📟",
		"📠",
		"📺",
		"📻",
		"🎙️",
		"🎚️",
		"🎛️",
		"🧭",
		"⏱️",
		"⏲️",
		"⏰",
		"🕰️",
		"⌛",
		"⏳",
		"📡",
		"🔋",
		"🔌",
		"💡",
		"🔦",
		"🕯️",
		"🪔",
		"🧯",
		"🛢️",
		"💸",
		"💵",
		"💴",
		"💶",
		"💷",
		"💰",
		"💳",
		"💎",
		"⚖️",
		"🧰",
		"🔧",
		"🔨",
		"⚒️",
		"🛠️",
		"⛏️",
		"🔩",
		"⚙️",
		"🧱",
		"⛓️",
		"🧲",
		"🔫",
		"💣",
		"🧨",
		"🪓",
		"🔪",
		"🗡️",
		"⚔️",
		"🛡️",
		"🚬",
		"⚰️",
		"⚱️",
		"🏺",
		"🔮",
		"📿",
		"🧿",
		"💈",
		"⚗️",
		"🔭",
		"🔬",
		"🕳️",
		"🩹",
		"🩺",
		"💊",
		"💉",
		"🧬",
		"🦠",
		"🧫",
		"🧪",
		"🌡️",
		"🧹",
		"🧺",
		"🧻",
		"🚽",
		"🚰",
		"🚿",
		"🛁",
		"🛀",
		"🧼",
		"🪒",
		"🧽",
		"🧴",
		"🛎️",
		"🔑",
		"🗝️",
		"🚪",
		"🪑",
		"🛋️",
		"🛏️",
		"🛌",
		"🧸",
		"🖼️",
		"🛍️",
		"🛒",
		"🎁",
		"🎈",
		"🎏",
		"🎀",
		"🎊",
		"🎉",
		"🎎",
		"🏮",
		"🎐",
		"🧧",
		"✉️",
		"📩",
		"📨",
		"📧",
		"💌",
		"📥",
		"📤",
		"📦",
		"🏷️",
		"📪",
		"📫",
		"📬",
		"📭",
		"📮",
		"📯",
		"📜",
		"📃",
		"📄",
		"📑",
		"🧾",
		"📊",
		"📈",
		"📉",
		"🗒️",
		"🗓️",
		"📆",
		"📅",
		"🗑️",
		"📇",
		"🗃️",
		"🗳️",
		"🗄️",
		"📋",
		"📁",
		"📂",
		"🗂️",
		"🗞️",
		"📰",
		"📓",
		"📔",
		"📒",
		"📕",
		"📗",
		"📘",
		"📙",
		"📚",
		"📖",
		"🔖",
		"🧷",
		"🔗",
		"📎",
		"🖇️",
		"📐",
		"📏",
		"🧮",
		"📌",
		"📍",
		"✂️",
		"🖊️",
		"🖋️",
		"✒️",
		"🖌️",
		"🖍️",
		"📝",
		"✏️",
		"🔍",
		"🔎",
		"🔏",
		"🔐",
		"🔒",
		"🔓",
	],
	Symbols: [
		"❤️",
		"🧡",
		"💛",
		"💚",
		"💙",
		"💜",
		"🖤",
		"🤍",
		"🤎",
		"💔",
		"❣️",
		"💕",
		"💞",
		"💓",
		"💗",
		"💖",
		"💘",
		"💝",
		"💟",
		"☮️",
		"✝️",
		"☪️",
		"🕉️",
		"☸️",
		"✡️",
		"🔯",
		"🕎",
		"☯️",
		"☦️",
		"🛐",
		"⛎",
		"♈",
		"♉",
		"♊",
		"♋",
		"♌",
		"♍",
		"♎",
		"♏",
		"♐",
		"♑",
		"♒",
		"♓",
		"🆔",
		"⚛️",
		"🉑",
		"☢️",
		"☣️",
		"📴",
		"📳",
		"🈶",
		"🈚",
		"🈸",
		"🈺",
		"🈷️",
		"✴️",
		"🆚",
		"💮",
		"🉐",
		"㊙️",
		"㊗️",
		"🈴",
		"🈵",
		"🈹",
		"🈲",
		"🅰️",
		"🅱️",
		"🆎",
		"🆑",
		"🅾️",
		"🆘",
		"❌",
		"⭕",
		"🛑",
		"⛔",
		"📛",
		"🚫",
		"💯",
		"💢",
		"♨️",
		"🚷",
		"🚯",
		"🚳",
		"🚱",
		"🔞",
		"📵",
		"🚭",
		"❗",
		"❕",
		"❓",
		"❔",
		"‼️",
		"⁉️",
		"🔅",
		"🔆",
		"〽️",
		"⚠️",
		"🚸",
		"🔱",
		"⚜️",
		"🔰",
		"♻️",
		"✅",
		"🈯",
		"💹",
		"❇️",
		"✳️",
		"❎",
		"🌐",
		"💠",
		"Ⓜ️",
		"🌀",
		"💤",
		"🏧",
		"🚾",
		"♿",
		"🅿️",
		"🈳",
		"🈂️",
		"🛂",
		"🛃",
		"🛄",
		"🛅",
		"🚹",
		"🚺",
		"🚼",
		"🚻",
		"🚮",
		"🎦",
		"📶",
		"🈁",
		"🔣",
		"ℹ️",
		"🔤",
		"🔡",
		"🔠",
		"🆖",
		"🆗",
		"🆙",
		"🆒",
		"🆕",
		"🆓",
		"0️⃣",
		"1️⃣",
		"2️⃣",
		"3️⃣",
		"4️⃣",
		"5️⃣",
		"6️⃣",
		"7️⃣",
		"8️⃣",
		"9️⃣",
		"🔟",
	],
};

// User color schemes for avatars
const userColorSchemes = [
	{ bg: "#587DBD1A", text: "#587DBD" },
	{ bg: "#6F42C11A", text: "#6F42C1" },
	{ bg: "#FEF2EB", text: "#F67F36" },
	{ bg: "#319F431A", text: "#319F43" },
	{ bg: "#59359A", text: "#FFFFFF" },
];

const youColorScheme = { bg: "#F1ECF9", text: "#000000" };

// Function to get user color based on user ID
const getUserColor = (userId: string, isCurrentUser: boolean) => {
	if (isCurrentUser) return youColorScheme;
	const hash = userId.split("").reduce((a, b) => {
		a = (a << 5) - a + b.charCodeAt(0);
		return a & a;
	}, 0);
	return userColorSchemes[Math.abs(hash) % userColorSchemes.length];
};

// Custom MessageItem component for forum design
const ForumMessageItem = ({ message }: { message: MessageProps }) => {
	const { user } = useUserStore();
	const isCurrentUser = user?.id === message.sender.id;
	const initials = getInitials(`${message.sender.first_name} ${message.sender.last_name}`);
	const colorScheme = getUserColor(message.sender.id, isCurrentUser);
	const timeString = format(new Date(message.updatedOn), "h:mm a");

	if (isCurrentUser) {
		// Current user messages - right aligned with special styling
		return (
			<div className="flex items-start justify-end gap-2 py-0 sm:gap-3">
				{/* Message Content */}
				<div className="flex max-w-[70%] flex-col items-end rounded-[14px] rounded-br-md bg-[#F1ECF9] px-3 py-2 sm:max-w-[50%] sm:px-4">
					<div className="mb-1 mt-1 flex w-full items-start justify-start sm:mb-2">
						<span className="flex items-center justify-center rounded-full bg-[#59359A] px-2 py-[2px] text-xs font-medium text-white sm:text-[13px]">
							You
						</span>
					</div>
					<div className="pr-2 text-left text-xs sm:pr-4 sm:text-sm">
						<p className="leading-relaxed text-[#525866]">{message.content}</p>
					</div>
					<div className="mb-1 flex items-center gap-1 sm:gap-2">
						<span className="text-xs text-[#525866]">{timeString}</span>
						<RiCheckDoubleLine className="h-3 w-3" style={{ color: "#6F42C1" }} />
					</div>
				</div>

				{/* Avatar */}
				<div
					className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium sm:h-8 sm:w-8 sm:text-sm"
					style={{ backgroundColor: "#6F42C1", color: "#FFFFFF" }}>
					{initials}
				</div>
			</div>
		);
	}

	// Other users' messages - left aligned
	return (
		<div className="flex items-start gap-2 py-0 sm:gap-3">
			{/* Avatar */}
			<div
				className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium sm:h-8 sm:w-8 sm:text-sm"
				style={{ backgroundColor: colorScheme.bg, color: colorScheme.text }}>
				{initials}
			</div>

			{/* Message Content */}
			<div className="min-w-0 max-w-[80%] flex-1 sm:max-w-[70%]">
				<div className="mb-1 flex items-baseline gap-1 sm:gap-2">
					<span className="truncate text-xs font-medium sm:text-sm" style={{ color: colorScheme.text }}>
						{`${message.sender.first_name} ${message.sender.last_name}`}
					</span>
				</div>
				<div className="rounded-2xl rounded-tl-md border border-gray-200 bg-white px-3 py-2 sm:px-4">
					<p className="text-xs leading-relaxed text-[#525866] sm:text-sm">{message.content}</p>
				</div>
				<div className="mb-1 flex items-center gap-1 sm:gap-2">
					<span className="text-xs text-[#525866]">{timeString}</span>
					<RiCheckDoubleLine className="h-3 w-3" style={{ color: "#6F42C1" }} />
				</div>
			</div>
		</div>
	);
};

const Page = () => {
	const router = useRouter();

	const [shouldAutoScroll, setShouldAutoScroll] = React.useState(false);
	const [formValues, setFormValues] = React.useState(initialValues);
	// State for textarea rows
	const [textareaRows, setTextareaRows] = React.useState(1);
	const [room, setRoom] = React.useState<RoomProps | null>(null);
	const [isTyping, setIsTyping] = React.useState(false);
	const [, setIsLoadingOlder] = React.useState(false);
	// Emoji picker state - identical to messages page
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = React.useState(false);
	const [cursorPosition, setCursorPosition] = React.useState(0);
	const { isMobile } = useDeviceWidth();
	const { user } = useUserStore();
	const [open, setOpen] = React.useState(isMobile);

	const socket = React.useRef<Socket | null>(null);
	const ref = React.useRef<HTMLDivElement>(null);
	const textareaRef = React.useRef<HTMLTextAreaElement>(null);

	React.useEffect(() => {
		setOpen(isMobile);
	}, [isMobile]);

	React.useEffect(() => {
		socket.current = io(
			process.env.NEXT_PUBLIC_WSS_URL || "wss://classore-be-june-224829194037.europe-west1.run.app",
			{
				transports: ["websocket"],
			}
		);
		socket.current.on("connect", () => {
			console.info("Socket connected");
		});
		socket.current.on("error", (error) => {
			console.error("Socket error", error);
		});
		socket.current.on("receive_chat_message", (data) => {
			console.log("received:", data);
		});
		socket.current.on("is_typing", () => setIsTyping(true));
		socket.current.on("message_delivered", (data) => {
			console.log("delivered:", data);
		});

		return () => {
			socket.current?.off("connect");
			socket.current?.off("error");
			socket.current?.off("receive_chat_message");
			socket.current?.off("is_typing");
			socket.current?.off("message_delivered");
			socket.current?.disconnect();
		};
	}, [user]);

	const { data: forums } = useGetForums(String(user?.id));
	const roomId = router.query.roomId as string;

	React.useEffect(() => {
		if (roomId && forums?.data && !room) {
			const foundRoom = forums.data.find((forum) => forum.id === roomId);
			if (foundRoom) {
				setRoom(foundRoom);
			}
		}
	}, [roomId, forums?.data, room]);

	const {
		data: messagesData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		isLoading,
		refetch,
	} = useGetInfiniteMessages({
		roomId: room?.id || "",
		user_id: user?.id || "",
		limit: 100,
	});

	const messages = React.useMemo(() => {
		if (!messagesData?.pages) return [];
		return messagesData.pages.flatMap((page) => page.data).reverse();
	}, [messagesData]);

	const handleMuteRoom = (e: React.MouseEvent, roomId: string) => {
		e.stopPropagation();
		console.log("mute", roomId);
	};

	// Handle input change with dynamic row calculation
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setFormValues({ ...formValues, [e.target.name]: value });

		// If content is empty, reset to single row immediately
		if (value.trim() === "") {
			setTextareaRows(1);
			return;
		}

		// Calculate rows based on content
		const textarea = e.target;
		textarea.style.height = "auto";
		const scrollHeight = textarea.scrollHeight;
		const lineHeight = 24; // Approximate line height in pixels
		const padding = 24; // Total vertical padding (py-3 = 12px top + 12px bottom)
		const calculatedRows = Math.min(3, Math.max(1, Math.ceil((scrollHeight - padding) / lineHeight)));
		setTextareaRows(calculatedRows);
	};

	// Emoji handlers - identical to messages page
	const handleEmojiSelect = (emoji: string) => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const currentContent = formValues.content;
		const beforeCursor = currentContent.slice(0, cursorPosition);
		const afterCursor = currentContent.slice(cursorPosition);
		const newContent = beforeCursor + emoji + afterCursor;

		setFormValues({ ...formValues, content: newContent });
		setIsEmojiPickerOpen(false);

		// Set cursor position after emoji
		setTimeout(() => {
			const newPosition = cursorPosition + emoji.length;
			textarea.setSelectionRange(newPosition, newPosition);
			textarea.focus();
			setCursorPosition(newPosition);
		}, 0);
	};

	const handleTextareaClick = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			setCursorPosition(textarea.selectionStart);
		}
	};

	const handleTextareaKeyUp = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			setCursorPosition(textarea.selectionStart);
		}
	};

	const { handleFileChange, inputRef } = useFileHandler({
		onFilesChange: (files) => {
			setFormValues({ ...formValues, media: files });
		},
		onError: (error) => toast.error(error.message),
	});

	const options = [
		{ icon: RiVolumeMuteLine, label: "mute chat", destructive: false },
		{ icon: RiSearchLine, label: "search chat", destructive: false },
		{ icon: RiForbid2Line, label: "leave rom", destructive: true },
	];

	const scrollToBottom = () => {
		if (ref.current) {
			ref.current.scrollTop = ref.current.scrollHeight;
		}
	};

	const checkIfShouldAutoScroll = () => {
		if (!ref.current) return;

		const { scrollTop, scrollHeight, clientHeight } = ref.current;
		const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
		setShouldAutoScroll(isNearBottom);
	};

	const handleScroll = React.useCallback(() => {
		if (!ref.current) return;
		const { scrollTop } = ref.current;

		if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
			setIsLoadingOlder(true);
			const currentScrollHeight = ref.current.scrollHeight;

			fetchNextPage().then(() => {
				setTimeout(() => {
					if (ref.current) {
						const newScrollHeight = ref.current.scrollHeight;
						ref.current.scrollTop = newScrollHeight - currentScrollHeight;
					}
					setIsLoadingOlder(false);
				}, 100);
			});
		}

		checkIfShouldAutoScroll();
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!socket.current) {
			toast.error("Socket not connected");
			return;
		}
		if (!room?.id) {
			toast.error("Please select a chat");
			return;
		}
		if (!formValues.content) {
			toast.error("Please enter a message");
			return;
		}
		sendMessage(socket.current, {
			roomId: String(room?.id),
			userId: String(user?.id),
			message: formValues.content,
		});
		console.log("message sent", new Date().toDateString());

		await refetch();
		setFormValues(initialValues);
		setTextareaRows(1);
		setShouldAutoScroll(true);
	};

	React.useEffect(() => {
		if (shouldAutoScroll) {
			scrollToBottom();
		}
	}, [shouldAutoScroll, messages]);

	React.useEffect(() => {
		setShouldAutoScroll(true);
		setTimeout(scrollToBottom, 100);
	}, [room]);

	React.useEffect(() => {
		const chatElement = ref.current;
		if (chatElement) {
			chatElement.addEventListener("scroll", handleScroll);
			return () => chatElement.removeEventListener("scroll", handleScroll);
		}
	}, [handleScroll]);



	return (
		<>
			<Seo title="Community Forum" />
			<DashboardLayout className="px-0 py-0 lg:px-0 lg:py-0">
				<div className="relative flex h-full w-full items-start bg-white">
					{/* Sidebar */}
					<aside className="hidden h-full w-[280px] flex-col border-r border-gray-200 md:w-[240px] lg:flex xl:w-[300px]">
						{/* Header */}
						<div className="flex h-[60px] w-full items-center border-b border-gray-200 px-3 md:px-4">
							<h1 className="text-base font-semibold text-gray-900 md:text-lg xl:text-xl">JAMB Prep Forum</h1>
						</div>

						{/* Search Input */}
						<div className="px-3 py-3 md:px-4">
							<div className="relative">
								<RiSearchLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
								<input
									placeholder="General Channel"
									className="w-full rounded-md border-0 bg-[#F6F8FA] py-2 pl-10 pr-10 text-sm focus:border-0 focus:outline-none focus:ring-0 md:py-2.5"
								/>
								<RiVolumeUpLine className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
							</div>
						</div>

						{/* Channels */}
						<div className="flex-1 overflow-y-auto">
							{/* FOR YOU Section */}
							<div className="px-3 py-3 md:px-4">
								<h2 className="mb-2 text-xs font-normal uppercase tracking-wide text-[#868C98] md:text-[11px] xl:text-xs">FOR YOU</h2>
								<div className="space-y-1">
									{forums?.data
										?.filter((forum) => !forum.bundle_name.toLowerCase().includes("locked"))
										.map((forum) => (
											<div
												key={forum.id}
												onClick={() => setRoom(forum)}
												className={cn(
													"flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-gray-100 md:py-1.5 xl:py-2",
													room?.id === forum.id && "bg-gray-100 text-gray-900"
												)}>
												<RiHashtag className="h-4 w-4 flex-shrink-0 text-gray-400" />
												<span className="flex-1 truncate text-sm md:text-xs xl:text-sm">
													{forum.bundle_name.replace("Channel", "").trim()}
												</span>
											</div>
										))}
								</div>
							</div>

							{/* LOCKED Section */}
							<div className="px-3 py-3 md:px-4">
								<h2 className="mb-2 text-xs font-normal uppercase tracking-wide text-[#868C98] md:text-[11px] xl:text-xs">LOCKED</h2>
								<div className="space-y-1">
									{forums?.data
										?.filter((forum) => forum.bundle_name.toLowerCase().includes("locked"))
										.map((forum) => (
											<div
												key={forum.id}
												className="flex cursor-not-allowed items-center gap-2 px-2 py-2 text-sm text-gray-400 md:py-1.5 xl:py-2">
												<RiLock2Line className="h-4 w-4 flex-shrink-0" />
												<span className="flex-1 truncate text-sm md:text-xs xl:text-sm">
													{forum.bundle_name.replace("Channel", "").replace("locked", "").trim()}
												</span>
											</div>
										))}
									{/* Static locked channels if none from API */}
									{!forums?.data?.some((forum) => forum.bundle_name.toLowerCase().includes("locked")) && (
										<>
											<div className="flex cursor-not-allowed items-center gap-2 px-2 py-2 text-sm text-gray-400 md:py-1.5 xl:py-2">
												<RiLock2Line className="h-4 w-4 flex-shrink-0" />
												<span className="text-sm md:text-xs xl:text-sm">Biology Channel</span>
											</div>
											<div className="flex cursor-not-allowed items-center gap-2 px-2 py-2 text-sm text-gray-400 md:py-1.5 xl:py-2">
												<RiLock2Line className="h-4 w-4 flex-shrink-0" />
												<span className="text-sm md:text-xs xl:text-sm">Government Channel</span>
											</div>
											<div className="flex cursor-not-allowed items-center gap-2 px-2 py-2 text-sm text-gray-400 md:py-1.5 xl:py-2">
												<RiLock2Line className="h-4 w-4 flex-shrink-0" />
												<span className="text-sm md:text-xs xl:text-sm">Lit-in-Eng Channel</span>
											</div>
											<div className="flex cursor-not-allowed items-center gap-2 px-2 py-2 text-sm text-gray-400 md:py-1.5 xl:py-2">
												<RiLock2Line className="h-4 w-4 flex-shrink-0" />
												<span className="text-sm md:text-xs xl:text-sm">History Channel</span>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</aside>
					{/* Mobile Sidebar Overlay */}
					{open && (
						<>
							{/* Backdrop */}
							<div 
								className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden"
								onClick={() => setOpen(false)}
							/>
							{/* Mobile Sidebar */}
							<aside className="fixed left-0 top-0 z-50 h-full w-[280px] transform bg-white shadow-xl transition-transform duration-300 ease-in-out sm:w-[320px] lg:hidden">
								{/* Mobile Header */}
								<div className="flex h-[60px] w-full items-center justify-between border-b border-gray-200 px-4">
									<h1 className="text-lg font-semibold text-gray-900">JAMB Prep Forum</h1>
									<button 
										onClick={() => setOpen(false)}
										className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
									>
										<RiArrowLeftSLine className="h-5 w-5" />
									</button>
								</div>

								{/* Mobile Search */}
								<div className="px-4 py-3">
									<div className="relative">
										<RiSearchLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
										<input
											placeholder="Search channels..."
											className="w-full rounded-md border-0 bg-[#F6F8FA] py-3 pl-10 pr-4 text-sm focus:border-0 focus:outline-none focus:ring-0"
										/>
									</div>
								</div>

								{/* Mobile Channels */}
								<div className="flex-1 overflow-y-auto">
									{/* FOR YOU Section */}
									<div className="px-4 py-3">
										<h2 className="mb-3 text-xs font-normal uppercase tracking-wide text-[#868C98]">FOR YOU</h2>
										<div className="space-y-2">
											{forums?.data
												?.filter((forum) => !forum.bundle_name.toLowerCase().includes("locked"))
												.map((forum) => (
													<div
														key={forum.id}
														onClick={() => {
															setRoom(forum);
															setOpen(false);
														}}
														className={cn(
															"flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-gray-600 transition-all duration-200 hover:bg-gray-100 active:bg-gray-200",
															room?.id === forum.id && "bg-gray-100 text-gray-900"
														)}>
														{forum.bundle_name.includes("general") ? (
															<RiAiGenerate className="h-5 w-5 flex-shrink-0 text-gray-400" />
														) : (
															<RiHashtag className="h-5 w-5 flex-shrink-0 text-gray-400" />
														)}
														<span className="flex-1 truncate text-sm font-medium">
															{forum.bundle_name.replace("Channel", "").trim()}
														</span>
														<button 
															onClick={(e) => handleMuteRoom(e, forum.id)}
															className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
														>
															<RiVolumeUpLine className="h-4 w-4" />
														</button>
													</div>
												))}
										</div>
									</div>

									{/* LOCKED Section */}
									<div className="px-4 py-3">
										<h2 className="mb-3 text-xs font-normal uppercase tracking-wide text-[#868C98]">LOCKED</h2>
										<div className="space-y-2">
											{forums?.data
												?.filter((forum) => forum.bundle_name.toLowerCase().includes("locked"))
												.map((forum) => (
													<div
														key={forum.id}
														className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-3 text-gray-400">
														<RiLock2Line className="h-5 w-5 flex-shrink-0" />
														<span className="flex-1 truncate text-sm font-medium">
															{forum.bundle_name.replace("Channel", "").replace("locked", "").trim()}
														</span>
													</div>
												))}
											{/* Static locked channels if none from API */}
											{!forums?.data?.some((forum) => forum.bundle_name.toLowerCase().includes("locked")) && (
												<>
													<div className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-3 text-gray-400">
														<RiLock2Line className="h-5 w-5 flex-shrink-0" />
														<span className="text-sm font-medium">Biology Channel</span>
													</div>
													<div className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-3 text-gray-400">
														<RiLock2Line className="h-5 w-5 flex-shrink-0" />
														<span className="text-sm font-medium">Government Channel</span>
													</div>
													<div className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-3 text-gray-400">
														<RiLock2Line className="h-5 w-5 flex-shrink-0" />
														<span className="text-sm font-medium">Lit-in-Eng Channel</span>
													</div>
													<div className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-3 text-gray-400">
														<RiLock2Line className="h-5 w-5 flex-shrink-0" />
														<span className="text-sm font-medium">History Channel</span>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							</aside>
						</>
					)}
					{/* Main Chat Area */}
					<main className="flex min-w-0 flex-1 flex-col h-[calc(100vh-64px)] lg:h-full">
						{room ? (
							<>
								{/* Chat Header */}
								<div className="flex h-[60px] w-full items-center border-b border-gray-200 bg-white px-3 sm:px-4 lg:px-6">
									<div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
										<button 
											className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden" 
											onClick={() => setOpen(true)}
										>
											<RiArrowLeftSLine className="h-5 w-5" />
										</button>
										<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-green-500 sm:h-7 sm:w-7">
											<span className="text-xs font-semibold text-white sm:text-sm">G</span>
										</div>
										<div className="min-w-0 flex-1">
											<h2 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
												{room.bundle_name.replace("Channel", "").trim()}
											</h2>
											<p className="text-xs text-gray-500 sm:text-sm">{messages?.length || 0} Online</p>
										</div>
									</div>
									<div className="flex items-center gap-1 sm:gap-2">
										<Popover>
											<PopoverTrigger asChild>
												<button className="rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200">
													<RiMore2Line className="h-4 w-4 sm:h-5 sm:w-5" />
												</button>
											</PopoverTrigger>
											<PopoverContent className="mr-2 w-[180px] space-y-2 p-2 sm:mr-4 lg:mr-10">
												{options.map(({ destructive, icon: Icon, label }, index) => (
													<button
														key={index}
														className={cn(
															"flex h-8 w-full items-center gap-x-2 rounded-md px-3 text-xs capitalize transition-colors duration-300 sm:text-sm",
															destructive
																? "text-red-500 hover:bg-red-100"
																: "text-neutral-500 hover:bg-neutral-200"
														)}>
														<Icon className="h-4 w-4" /> {label}
													</button>
												))}
											</PopoverContent>
										</Popover>
									</div>
								</div>

								{/* Messages Area */}
								<div ref={ref} className="flex-1 overflow-y-auto bg-[#F6F8FA] px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
									{/* Message count and timestamp inside chat container */}
									<div className="mb-3 text-center sm:mb-4">
										<div className="inline-block rounded-full bg-gray-100 px-2 py-1 sm:px-3">
											<span className="text-xs text-gray-600 sm:text-sm">
												{messages?.length || 0} Messages since 12:05 AM
											</span>
										</div>
									</div>
									<div className="space-y-3 sm:space-y-4">
										{isFetchingNextPage && (
											<div className="flex justify-center py-2">
												<div className="text-xs text-neutral-500 sm:text-sm">Loading older messages...</div>
											</div>
										)}
										{isLoading ? (
											<div className="flex h-full items-center justify-center">
												<div className="text-xs text-neutral-500 sm:text-sm">Loading messages...</div>
											</div>
										) : messages.length > 0 ? (
											messages.map((message) => <ForumMessageItem key={message.id} message={message} />)
										) : (
											<div className="flex h-full items-center justify-center">
												<div className="text-xs text-neutral-500 sm:text-sm">No messages yet. Start the conversation!</div>
											</div>
										)}
										{isFetchingPreviousPage && (
											<div className="flex justify-center py-2">
												<div className="text-xs text-neutral-500 sm:text-sm">Loading new messages...</div>
											</div>
										)}
										</div>
										{/* Typing Indicator */}
										{isTyping && (
											<div className="px-3 py-2 text-xs text-gray-500 italic sm:px-4 sm:text-sm">
												Someone is typing...
											</div>
										)}
									</div>

									{/* Message Input */}
								<div className="bg-white px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8">
									<form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
										<div className="relative flex-1">
											<textarea
												ref={textareaRef}
												value={formValues.content}
												name="content"
												onChange={handleChange}
												onClick={handleTextareaClick}
												onKeyUp={handleTextareaKeyUp}
												className="w-full resize-none rounded-lg border-0 py-2 pl-3 pr-24 text-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 sm:py-3 sm:pl-4 sm:pr-32 sm:text-base"
												style={{
													backgroundColor: "#F6F8FA",
													lineHeight: "1.5rem",
													minHeight: "2.5rem",
													maxHeight: "6rem",
												}}
												placeholder="Type message here"
												rows={textareaRows}
											/>
											<input
												type="file"
												ref={inputRef}
												onChange={handleFileChange}
												className="sr-only hidden appearance-none"
												multiple
												accept="image/*,video/*"
											/>
											<div className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center justify-center gap-0.5 sm:right-3 sm:gap-1">
													<button 
														type="button" 
														className="rounded p-2 text-gray-400 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center sm:p-1.5 sm:min-h-[36px] sm:min-w-[36px]"
														title="Mention user">
														<span className="text-lg sm:text-xl">@</span>
													</button>
													<label
														htmlFor="image"
														className="cursor-pointer rounded p-2 text-gray-400 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center sm:p-1.5 sm:min-h-[36px] sm:min-w-[36px]"
														title="Attach image">
														<input
															type="file"
															id="image"
															className="sr-only"
															onChange={handleFileChange}
															multiple={false}
															accept="image/*"
														/>
														<RiImageAddLine className="h-4 w-4 sm:h-5 sm:w-5" />
													</label>
												<Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
													<PopoverTrigger asChild>
															<button
																type="button"
																className="rounded p-2 text-gray-400 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center sm:p-1.5 sm:min-h-[36px] sm:min-w-[36px]"
																title="Add emoji"
																onClick={(e) => {
																	e.preventDefault();
																	e.stopPropagation();
																	setIsEmojiPickerOpen(!isEmojiPickerOpen);
																}}>
																<RiEmotionHappyLine className="h-4 w-4 sm:h-5 sm:w-5" />
															</button>
														</PopoverTrigger>
													<PopoverContent
														key="emoji-picker"
														className="w-72 p-0 sm:w-80"
														side="top"
														align="end"
														sideOffset={8}
														onOpenAutoFocus={(e) => e.preventDefault()}
														onCloseAutoFocus={(e) => e.preventDefault()}
														avoidCollisions={true}
														hideWhenDetached={true}>
														<div className="rounded-lg border border-gray-200 bg-white">
															{/* Emoji Picker Header */}
															<div className="border-b border-gray-100 p-2 sm:p-3">
																<h3 className="text-xs font-medium text-gray-900 sm:text-sm">Choose an emoji</h3>
															</div>

															{/* Emoji Categories */}
															<div className="max-h-48 overflow-y-auto sm:max-h-64">
																{Object.entries(emojiCategories).map(([category, emojis]) => (
																	<div key={category} className="p-2 sm:p-3">
																		<h3 className="mb-1 text-xs font-medium text-gray-500 sm:mb-2">{category}</h3>
																		<div className="grid grid-cols-6 gap-1 sm:grid-cols-8">
																			{emojis.map((emoji) => (
																				<button
																					key={emoji}
																					type="button"
																					onClick={(e) => {
																						e.preventDefault();
																						e.stopPropagation();
																						handleEmojiSelect(emoji);
																					}}
																					className="flex h-7 w-7 items-center justify-center rounded text-base transition-colors hover:bg-gray-100 sm:h-8 sm:w-8 sm:text-lg">
																					{emoji}
																				</button>
																			))}
																		</div>
																	</div>
																))}
															</div>
														</div>
													</PopoverContent>
												</Popover>
												<button type="submit" className="rounded p-1 text-gray-400 hover:bg-gray-100 sm:p-1.5">
													<RiSendPlaneLine className="h-4 w-4 sm:h-5 sm:w-5" />
												</button>
											</div>
										</div>
									</form>
								</div>
							</>
						) : (
							<div className="flex h-full w-full items-center justify-center bg-gray-50">
								<p className="text-gray-400">Select a channel to start chatting</p>
							</div>
						)}
					</main>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
