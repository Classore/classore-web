import { create } from "zustand/react";

type InitialState = {
	base_amount: number;
	allowed_subjects: number;
	number_of_extra_subjects_added: number;
	grand_total: number;
	exam_type: string;
	chosen_bundle: string;
	subjects: string[];
};

type MiscStore = {
	payload: InitialState;
	setMisc: (payload: InitialState) => void;
};

const initialState: InitialState = {
	base_amount: 0,
	allowed_subjects: 0,
	number_of_extra_subjects_added: 0,
	grand_total: 0,
	exam_type: "",
	chosen_bundle: "",
	subjects: [],
};

export const useMiscStore = create<MiscStore>((set) => ({
	payload: initialState,
	setMisc: (payload: InitialState) => set({ payload }),
}));
