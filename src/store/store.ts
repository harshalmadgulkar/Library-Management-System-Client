import { configureStore } from "@reduxjs/toolkit";

import authReducer from '@store/slices/authSlice';
import popupReducer from '@store/slices/popUpSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        popup: popupReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;