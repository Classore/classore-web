import { create } from "zustand/react";

type InitialState = {
	summary: {
		base_amount: number;
		number_of_extra_subjects_added: number;
		grand_total: number;
	};
	vettings: Array<{
		base_amount: number;
		allowed_subjects: number;
		allow_extra_subjects: string;
		number_of_extra_subjects_added: number;
		grand_total: number;
	}>;
	exam_type: string;
	chosen_bundle: string;
	subjects: string[];
};

type MiscStore = {
	payload: InitialState;
	setMisc: (payload: InitialState) => void;
};

const initialState: InitialState = {
	summary: {
		base_amount: 0,
		number_of_extra_subjects_added: 0,
		grand_total: 0,
	},
	vettings: [
		{
			base_amount: 0,
			allowed_subjects: 0,
			allow_extra_subjects: "",
			number_of_extra_subjects_added: 0,
			grand_total: 0,
		},
	],
	exam_type: "",
	chosen_bundle: "",
	subjects: [],
};

export const useMiscStore = create<MiscStore>((set) => ({
	payload: initialState,
	setMisc: (payload: InitialState) => set({ payload }),
}));
