import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
	name: 'modal',
	initialState: false,
	reducers: {
		toggle: (state: boolean) => !state,
	},
});

export const { toggle } = modalSlice.actions;
export default modalSlice.reducer;
