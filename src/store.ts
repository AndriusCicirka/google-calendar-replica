import { configureStore, combineReducers } from '@reduxjs/toolkit';
import modalReducer from 'scripts/modalSlice';

const store = configureStore({
	reducer: combineReducers({ modal: modalReducer }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
