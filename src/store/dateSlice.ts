import { createSlice } from '@reduxjs/toolkit';

import { getToday } from 'utils';

const dateSlice = createSlice({
  name: 'modal',
  initialState: { currentView: getToday() },
  reducers: {
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
  },
});

export const { setCurrentView } = dateSlice.actions;
export default dateSlice.reducer;
