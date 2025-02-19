import { persist } from "zustand/middleware";
import { create } from "zustand";

type State = {
	chapter: string;
	module: string;
};

const useChapterStore = create<State>()(
	persist(
		() => ({
			chapter: "",
			module: "",
		}),
		{ name: "chapter-store" }
	)
);

const setChapter = (chapter_id: string) =>
	useChapterStore.setState({ chapter: chapter_id });
const setModule = (module_id: string) => useChapterStore.setState({ module: module_id });

export { setChapter, setModule, useChapterStore };
