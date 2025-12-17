import { configureStore } from "@reduxjs/toolkit";

import authReducer from '@store/slices/authSlice';
import popupReducer from '@store/slices/popUpSlice';
import usersReducer from '@store/slices/usersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        popup: popupReducer,
        users: usersReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;