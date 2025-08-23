import { type Socket, io } from "socket.io-client";
import { useRouter } from "next/router";
import { toast } from "sonner";
import React from "react";
import {
	RiFlagLine,
	RiForbid2Line,
	RiImageAddLine,
	RiMore2Line,
	RiSearchLine,
	RiSendPlaneLine,
	RiEmotionHappyLine,
	RiVolumeMuteLine,
	RiArrowLeftSLine,
} from "@remixicon/react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetInfiniteMessages, useGetUserRooms } from "@/queries/message";
import { MessageItem, UserItem } from "@/components/message";
import { useDeviceWidth, useFileHandler } from "@/hooks";
import { DashboardLayout } from "@/components/layouts";
import type { UserItemProps } from "@/types/message";
import { cn, getInitials, sendMessage } from "@/lib";
import { useUserStore } from "@/store/z-store";
import { Seo } from "@/components/shared";


type FormProps = {
	content: string;
	media: File[];
};

const tabs = ["all messages", "unread"];

// Emoji categories with emojis
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
		"🥇",
		"🥈",
		"🥉",
		"🏆",
		"🏅",
		"🎖️",
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
		"🚉",
		"✈️",
		"🛫",
		"🛬",
		"🛩️",
		"💺",
		"🛰️",
		"🚀",
		"🛸",
		"🚁",
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

const initialValues: FormProps = {
	content: "",
	media: [],
};

const Page = () => {
	const [activeTab, setActiveTab] = React.useState("all messages");
	const [selected, setSelected] = React.useState<UserItemProps | null>(null);
	const [shouldAutoScroll, setShouldAutoScroll] = React.useState(false);
	const [formValues, setFormValues] = React.useState(initialValues);
	const [, setIsLoadingOlder] = React.useState(false);
	const [isTyping, setIsTyping] = React.useState(false);
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = React.useState(false);
	const [cursorPosition, setCursorPosition] = React.useState(0);
	const socket = React.useRef<Socket | null>(null);
	const ref = React.useRef<HTMLDivElement>(null);
	const textareaRef = React.useRef<HTMLTextAreaElement>(null);
	const { isMobile } = useDeviceWidth();
	const [open, setOpen] = React.useState(isMobile);
	const router = useRouter();

	const paramsId = router.query.roomId as string;
	const [roomId, setRoomId] = React.useState(paramsId || "");

	React.useEffect(() => {
		setOpen(isMobile);
	}, [isMobile]);

	const { user } = useUserStore();

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

	const { data: rooms } = useGetUserRooms(String(user?.id));

	const {
		data: messagesData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		isLoading,
		refetch,
	} = useGetInfiniteMessages({ roomId, user_id: String(user?.id), limit: 50 });

	const messages = React.useMemo(() => {
		if (!messagesData?.pages) return [];
		return messagesData.pages.flatMap((page) => page.data).reverse();
	}, [messagesData]);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
		// Update cursor position
		setCursorPosition(e.target.selectionStart || 0);
	};

	// Handle emoji selection
	const handleEmojiSelect = (emoji: string) => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const currentContent = formValues.content;
		const beforeCursor = currentContent.substring(0, cursorPosition);
		const afterCursor = currentContent.substring(cursorPosition);
		const newContent = beforeCursor + emoji + afterCursor;

		setFormValues({ ...formValues, content: newContent });

		// Update cursor position to after the emoji
		const newCursorPosition = cursorPosition + emoji.length;
		setCursorPosition(newCursorPosition);

		// Focus textarea and set cursor position
		setTimeout(() => {
			textarea.focus();
			textarea.setSelectionRange(newCursorPosition, newCursorPosition);
		}, 0);

		setIsEmojiPickerOpen(false);
	};

	// Handle textarea click to update cursor position
	const handleTextareaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
		const target = e.target as HTMLTextAreaElement;
		setCursorPosition(target.selectionStart || 0);
	};

	// Handle textarea key events to update cursor position
	const handleTextareaKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const target = e.target as HTMLTextAreaElement;
		setCursorPosition(target.selectionStart || 0);
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
		{ icon: RiFlagLine, label: "report user", destructive: false },
		{ icon: RiForbid2Line, label: "block user", destructive: true },
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

	// Dynamic textarea height adjustment with gradual reduction
	React.useEffect(() => {
		if (textareaRef.current) {
			const textarea = textareaRef.current;
			const content = formValues.content;
			
			// Reset height to calculate scroll height properly
			textarea.style.height = "3rem";
			const scrollHeight = textarea.scrollHeight;
			
			// Define height levels
			const oneRowHeight = 48; // 3rem
			const twoRowHeight = 72; // 4.5rem
			
			if (!content.trim()) {
				// Empty content - 1 row
				textarea.style.height = "3rem";
			} else {
				// Count actual lines including line breaks
				const lineBreaks = (content.match(/\n/g) || []).length;
				const hasMultipleLines = lineBreaks > 0;
				
				// Determine height based on content and scroll height
				if (scrollHeight <= oneRowHeight + 8) {
					// Single line content
					textarea.style.height = "3rem";
				} else if (scrollHeight <= twoRowHeight + 8 || (!hasMultipleLines && scrollHeight <= twoRowHeight + 16)) {
					// Two rows content
					textarea.style.height = "4.5rem";
				} else {
					// Three rows content (maximum)
					textarea.style.height = "6rem";
				}
			}
		}
	}, [formValues.content]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!socket.current) {
			toast.error("Socket not connected");
			return;
		}
		if (!roomId) {
			toast.error("Please select a chat");
			return;
		}
		if (!formValues.content) {
			toast.error("Please enter a message");
			return;
		}
		sendMessage(socket.current, {
			roomId,
			userId: String(user?.id),
			message: formValues.content,
		});
		await refetch();
		setFormValues(initialValues);
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
	}, [selected]);

	React.useEffect(() => {
		const chatElement = ref.current;
		if (chatElement) {
			chatElement.addEventListener("scroll", handleScroll);
			return () => chatElement.removeEventListener("scroll", handleScroll);
		}
	}, [handleScroll]);

	const handleSelectRoom = (roomId: string) => {
		setRoomId(roomId);
		setOpen(false);
	};



	return (
		<>
			<Seo title="Messages" />
			<DashboardLayout className="p-0 md:px-0">
				<div className="relative flex h-full w-full items-start">
					{/* Desktop Sidebar */}
					<aside className="hidden h-full w-[280px] min-w-[280px] border-r border-[#E2E4E9] bg-white md:block md:w-[320px] lg:w-[375px]">
						{/* Tabs */}
						<div className="grid h-[77px] w-full items-center border-b border-[#E2E4E9] px-3 md:px-5">
							<div className="flex rounded-lg bg-gray-50 p-1">
								{tabs.map((tab) => (
									<button
										key={tab}
										onClick={() => setActiveTab(tab)}
										className={cn(
											"flex-1 rounded-md px-3 py-2 text-xs font-medium capitalize transition-all duration-200 md:text-sm",
											activeTab === tab
												? "bg-white text-[#6F42C1] shadow-sm"
												: "text-[#868C98] hover:bg-white/50 hover:text-[#6F42C1]"
										)}>
										{tab}
									</button>
								))}
							</div>
						</div>

						{/* Messages List */}
						{!rooms?.length ? (
							<div className="grid h-full w-full place-items-center px-4">
								<div className="text-center">
									<p className="mb-2 text-sm text-neutral-500">No chats yet</p>
									<p className="text-xs text-neutral-400">Start a conversation to see it here</p>
								</div>
							</div>
						) : (
							<div className="flex-1 overflow-y-auto px-2 md:px-3">
								<div className="space-y-1 py-2">
									{rooms
										.filter((room) => room.is_group === "NO")
										.map((room, index) => (
											<UserItem
												key={index}
												onSelect={setSelected}
												onSelectRoom={handleSelectRoom}
												selected={selected}
												room={room}
												socket={socket.current}
											/>
										))}
								</div>
							</div>
						)}
					</aside>

					{/* Mobile Sidebar Overlay */}
					{open && (
						<>
							{/* Backdrop */}
							<div
								className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
								onClick={() => setOpen(false)}
							/>

							{/* Mobile Sidebar */}
							<aside className="fixed left-0 top-0 z-50 h-full w-[85vw] max-w-[320px] transform bg-white shadow-xl transition-transform duration-300 ease-out md:hidden">
								{/* Mobile Header */}
								<div className="flex h-[77px] items-center justify-between border-b border-[#E2E4E9] px-4">
									<h2 className="text-lg font-semibold text-gray-900">Messages</h2>
									<button
										onClick={() => setOpen(false)}
										className="rounded-lg p-2 transition-colors hover:bg-gray-100">
										<RiArrowLeftSLine className="h-5 w-5" />
									</button>
								</div>

								{/* Mobile Tabs */}
								<div className="border-b border-[#E2E4E9] px-4 py-3">
									<div className="flex rounded-lg bg-gray-50 p-1">
										{tabs.map((tab) => (
											<button
												key={tab}
												onClick={() => setActiveTab(tab)}
												className={cn(
													"flex-1 rounded-md px-3 py-2 text-sm font-medium capitalize transition-all duration-200",
													activeTab === tab
														? "bg-white text-[#6F42C1] shadow-sm"
														: "text-[#868C98] hover:bg-white/50 hover:text-[#6F42C1]"
												)}>
												{tab}
											</button>
										))}
									</div>
								</div>

								{/* Mobile Messages List */}
								{!rooms?.length ? (
									<div className="flex flex-1 items-center justify-center px-4">
										<div className="text-center">
											<p className="mb-2 text-sm text-neutral-500">No chats yet</p>
											<p className="text-xs text-neutral-400">Start a conversation to see it here</p>
										</div>
									</div>
								) : (
									<div className="flex-1 overflow-y-auto px-2">
										<div className="space-y-1 py-2">
											{rooms
												.filter((room) => room.is_group === "NO")
												.map((room, index) => (
													<UserItem
														key={index}
														onSelect={setSelected}
														onSelectRoom={(roomId) => {
															setRoomId(roomId);
															setOpen(false);
														}}
														selected={selected}
														room={room}
														socket={socket.current}
													/>
												))}
										</div>
									</div>
								)}
							</aside>
						</>
					)}
					{/* Main Chat Area */}
					<div className="flex min-w-0 flex-1 flex-col h-[calc(100vh-64px)] lg:h-full">
						{/* Chat Header */}
						<div className="h-[76px] w-full border-b border-[#E2E4E9] bg-white px-3 md:px-4 lg:px-6">
							{selected ? (
								<div className="flex h-full w-full items-center justify-between">
									<div className="flex min-w-0 flex-1 items-center gap-x-2 md:gap-x-3">
										<button
											className="flex rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
											onClick={() => setOpen(true)}>
											<RiArrowLeftSLine className="h-5 w-5" />
										</button>
										<Avatar className="size-8 flex-shrink-0 rounded-full border border-neutral-200 bg-primary-500 md:size-10 lg:size-12">
											<AvatarImage src={selected?.profile_picture || ""} className="object-cover" />
											<AvatarFallback className="bg-primary-500 text-xs uppercase text-white md:text-sm">
												{getInitials(`${selected.first_name} ${selected.last_name}`)}
											</AvatarFallback>
										</Avatar>
										<div className="min-w-0 flex-1">
											<p className="truncate text-sm font-medium capitalize text-gray-900 md:text-base">
												{selected?.first_name} {selected?.last_name}
											</p>
											<p className="truncate text-xs text-neutral-500 md:text-sm">
												{isTyping ? (
													<span className="flex items-center gap-1">
														<span className="animate-pulse">typing</span>
														<span className="flex space-x-1">
															<div className="h-1 w-1 animate-bounce rounded-full bg-gray-400"></div>
															<div
																className="h-1 w-1 animate-bounce rounded-full bg-gray-400"
																style={{ animationDelay: "0.1s" }}></div>
															<div
																className="h-1 w-1 animate-bounce rounded-full bg-gray-400"
																style={{ animationDelay: "0.2s" }}></div>
														</span>
													</span>
												) : (
													selected?.email
												)}
											</p>
										</div>
									</div>
									<Popover>
										<PopoverTrigger asChild>
											<button className="grid size-8 flex-shrink-0 place-items-center rounded-lg bg-neutral-100 transition-colors hover:bg-neutral-200 md:size-9 lg:size-10">
												<RiMore2Line className="size-4 text-neutral-500 md:size-5" />
											</button>
										</PopoverTrigger>
										<PopoverContent
											side="bottom"
											align="end"
											className="mr-2 w-[160px] space-y-1 p-2 md:mr-4 md:w-[180px]"
											sideOffset={4}>
											{options.map(({ destructive, icon: Icon, label }, index) => (
												<button
													key={index}
													className={cn(
														"flex h-9 w-full items-center gap-x-2 rounded-md px-3 text-sm capitalize transition-colors duration-200",
														destructive ? "text-red-500 hover:bg-red-50" : "text-neutral-600 hover:bg-neutral-100"
													)}>
													<Icon className="size-4" /> {label}
												</button>
											))}
										</PopoverContent>
									</Popover>
								</div>
							) : (
								<div className="flex h-full w-full items-center justify-between">
									<div className="flex items-center gap-x-3">
										<button
											className="flex rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
											onClick={() => setOpen(true)}>
											<RiArrowLeftSLine className="h-5 w-5" />
										</button>
										<h1 className="text-lg font-semibold text-gray-900 md:text-xl">Messages</h1>
									</div>
								</div>
							)}
						</div>

						{/* Messages Area */}
						<div
							ref={ref}
							className="flex min-h-0 w-full flex-1 flex-col gap-y-3 overflow-y-auto bg-[#F6F8FA] px-3 py-3 md:gap-y-4 md:px-4 md:py-4 lg:gap-y-5 lg:px-6 lg:py-5">
							{isFetchingNextPage && (
								<div className="flex justify-center py-2">
									<div className="flex items-center gap-2 text-sm text-neutral-500">
										<div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600"></div>
										Loading older messages...
									</div>
								</div>
							)}
							{isLoading ? (
								<div className="flex h-full items-center justify-center">
									<div className="flex flex-col items-center gap-3">
										<div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600"></div>
										<div className="text-sm text-neutral-500">Loading messages...</div>
									</div>
								</div>
							) : messages.length > 0 ? (
								messages.map((message) => (
									<MessageItem key={message.id} message={message} isGroup={false} />
								))
							) : selected ? (
								<div className="flex h-full items-center justify-center">
									<div className="max-w-sm text-center">
										<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
											<RiSendPlaneLine className="h-8 w-8 text-gray-400" />
										</div>
										<p className="mb-2 text-sm text-neutral-600 md:text-base">No messages yet</p>
										<p className="text-xs text-neutral-400 md:text-sm">
											Start the conversation with {selected?.first_name}!
										</p>
									</div>
								</div>
							) : (
								<div className="flex h-full items-center justify-center">
									<div className="max-w-sm text-center">
										<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
											<RiSendPlaneLine className="h-8 w-8 text-gray-400" />
										</div>
										<p className="mb-2 text-sm text-neutral-600 md:text-base">Select a conversation</p>
										<p className="text-xs text-neutral-400 md:text-sm">
											Choose a chat from the sidebar to start messaging
										</p>
									</div>
								</div>
							)}
							{isFetchingPreviousPage && (
								<div className="flex justify-center py-2">
									<div className="flex items-center gap-2 text-sm text-neutral-500">
										<div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600"></div>
										Loading new messages...
									</div>
								</div>
							)}
						</div>
						{/* Message Input Area */}
						{selected && (
							<div className="border-t border-[#E2E4E9] bg-white px-3 py-3 md:px-4 md:py-4 lg:px-6 lg:py-6">
								<form onSubmit={handleSubmit} className="flex items-end gap-2 md:gap-3">
									<div className="relative flex-1">
										<textarea
											ref={textareaRef}
											value={formValues.content}
											name="content"
											onChange={handleChange}
											onClick={handleTextareaClick}
											onKeyUp={handleTextareaKeyUp}
											className="w-full resize-none rounded-xl border border-gray-200 py-3 pl-4 pr-24 text-sm transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6F42C1] md:py-4 md:pl-5 md:pr-28 md:text-base"
											style={{
														backgroundColor: "#F6F8FA",
														lineHeight: "1.5rem",
														minHeight: "3rem",
														maxHeight: "6rem",
														overflow: "hidden",
														transition: "height 0.2s ease-out",
													}}
											placeholder="Type your message..."
											rows={1}
										/>
										<input
											type="file"
											ref={inputRef}
											onChange={handleFileChange}
											className="sr-only hidden appearance-none"
											multiple
											accept="image/*,video/*"
										/>
										<div className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center justify-center gap-1 md:right-3">
											<label
												htmlFor="image"
												className="cursor-pointer touch-manipulation rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600">
												<input
													type="file"
													id="image"
													className="sr-only"
													onChange={handleFileChange}
													multiple={false}
													accept="image/*"
												/>
												<RiImageAddLine className="h-4 w-4 md:h-5 md:w-5" />
											</label>
											<Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
												<PopoverTrigger asChild>
													<button
														type="button"
														className="touch-manipulation rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600"
														onClick={(e) => {
															e.preventDefault();
															e.stopPropagation();
															setIsEmojiPickerOpen(!isEmojiPickerOpen);
														}}>
														<RiEmotionHappyLine className="h-4 w-4 md:h-5 md:w-5" />
													</button>
												</PopoverTrigger>

												<PopoverContent
													key="emoji-picker"
													side={isMobile ? "top" : "top"}
													align="end"
													className={cn("border-0 p-0 shadow-xl", isMobile ? "w-[90vw] max-w-[350px]" : "w-80")}
													sideOffset={8}
													onOpenAutoFocus={(e) => e.preventDefault()}
													onCloseAutoFocus={(e) => e.preventDefault()}
													avoidCollisions={true}
													hideWhenDetached={true}>
													<div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
														{/* Emoji Picker Header */}
														<div className="border-b border-gray-100 p-3 md:p-4">
															<div className="flex items-center justify-between">
																<h3 className="text-sm font-medium text-gray-900 md:text-base">Choose an emoji</h3>
																{isMobile && (
																	<button
																		onClick={() => setIsEmojiPickerOpen(false)}
																		className="rounded-lg p-1 transition-colors hover:bg-gray-100">
																		<RiArrowLeftSLine className="h-5 w-5" />
																	</button>
																)}
															</div>
														</div>

														{/* Emoji Categories */}
														<div className={cn("overflow-y-auto", isMobile ? "max-h-60" : "max-h-64")}>
															{Object.entries(emojiCategories).map(([category, emojis]) => (
																<div key={category} className="p-3 md:p-4">
																	<h4 className="mb-2 text-xs font-medium text-gray-600 md:mb-3 md:text-sm">
																		{category}
																	</h4>
																	<div
																		className={cn("grid gap-1 md:gap-2", isMobile ? "grid-cols-6" : "grid-cols-8")}>
																		{emojis.map((emoji, index) => (
																			<button
																				key={`${category}-${index}`}
																				type="button"
																				onClick={(e) => {
																					e.preventDefault();
																					e.stopPropagation();
																					handleEmojiSelect(emoji);
																				}}
																				className={cn(
																					"flex touch-manipulation items-center justify-center rounded-lg text-lg transition-all duration-200 hover:bg-gray-100 active:scale-95 md:text-xl",
																					isMobile ? "h-10 w-10" : "h-8 w-8"
																				)}
																				title={emoji}>
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
											<button
												type="submit"
												disabled={!formValues.content.trim()}
												className={cn(
													"flex-shrink-0 touch-manipulation transition-all duration-200",
													formValues.content.trim()
														? "text-[#6F42C1] hover:text-[#5a2d9f] active:scale-95"
														: "cursor-not-allowed text-gray-400"
												)}>
												<RiSendPlaneLine className="h-4 w-4 md:h-5 md:w-5" />
											</button>
										</div>
									</div>
								</form>
							</div>
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
