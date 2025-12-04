import { configureStore } from "@reduxjs/toolkit";

import authReducer from '@store/slices/authSlice';
import popupReducer from '@store/slices/popUpSlice';
import userReducer from '@store/slices/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        popup: popupReducer,
        user: userReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;