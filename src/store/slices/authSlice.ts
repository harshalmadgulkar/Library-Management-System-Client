import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import type { AppDispatch } from "@store/store";

interface BorrowedBook {
    bookId: string;
    returned: boolean;
    bookTitle?: string;
    borrowedDate?: Date;
    dueDate?: Date;
}

interface Avatar {
    public_id?: string;
    url?: string;
}

interface User {
    name: string;
    email: string;
    password?: string;
    role: "Admin" | "User";
    accountVerified: boolean;
    borrowedBooks: BorrowedBook[];
    avatar?: Avatar;
    verificationCode?: number;
    verificationCodeExpire?: Date;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface AuthState {
    loading: boolean;
    error: string | null;
    message: string | null;
    user: User | null;
    isAuthenticated: boolean;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    message: null,
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Register
        registerRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        registerSuccess(state, action: PayloadAction<{ message: string; }>) {
            state.loading = false;
            state.message = action.payload.message;
        },
        registerFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // otp
        otpVerificationRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        otpVerificationSuccess(state, action: PayloadAction<{ message: string, user: User; }>) {
            state.loading = false;
            state.message = action.payload.message;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        otpVerificationFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // login
        loginRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        loginSuccess(state, action: PayloadAction<{ message: string, user: User; }>) {
            state.loading = false;
            state.message = action.payload.message;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // logout
        logoutRequest(state) {
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        logoutSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.message = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },
        logoutFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        // getUser
        getUserRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        getUserSuccess(state, action: PayloadAction<{ user: User; }>) {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        getUserFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.error = action.payload;
        },

        // forgotPassword
        ForgotPasswordRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        ForgotPasswordSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.message = action.payload;
        },
        ForgotPasswordFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // resetPassword
        resetPasswordRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetPasswordSuccess(state, action: PayloadAction<{ message: string, user: User; }>) {
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        resetPasswordFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // updatePassword
        updatePasswordRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updatePasswordSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.message = action.payload;
        },
        updatePasswordFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // resetAuthSlice
        resetAuthSlice(state) {
            state.error = null;
            state.loading = false;
            state.message = null;
            // state.user = state.user;
            // state.isAuthenticated = state.isAuthenticated;
        }
    }
});

export const resetAuthSlice = () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.resetAuthSlice());
};

export const register = (data: RegisterData) => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.registerRequest());
    try {
        const url = import.meta.env.VITE_APP_API_URL + "/auth/register";
        const res = await axios.post(url, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(authSlice.actions.registerSuccess(res.data));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            dispatch(authSlice.actions.registerFailed(error.response?.data?.message || error.message));
        } else if (error instanceof Error) {
            dispatch(authSlice.actions.registerFailed(error.message));
        } else {
            dispatch(authSlice.actions.registerFailed('Unknown error'));
        }
    }
};

export const otpVerification = (email: string, otp: string) => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.otpVerificationRequest());
    try {
        const url = import.meta.env.VITE_APP_API_URL + "/auth/verify-otp";
        const res = await axios.post(url, { email, otp }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(authSlice.actions.otpVerificationSuccess(res.data));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            dispatch(authSlice.actions.otpVerificationFailed(error.response?.data?.message || error.message));
        } else if (error instanceof Error) {
            dispatch(authSlice.actions.otpVerificationFailed(error.message));
        } else {
            dispatch(authSlice.actions.otpVerificationFailed('Unknown error'));
        }
    }
};

export const login = (data: RegisterData) => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.loginRequest());
    try {
        const url = import.meta.env.VITE_APP_API_URL + "/auth/login";
        const res = await axios.post(url, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(authSlice.actions.loginSuccess(res.data));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            dispatch(authSlice.actions.loginFailed(error.response?.data?.message || error.message));
        } else if (error instanceof Error) {
            dispatch(authSlice.actions.loginFailed(error.message));
        } else {
            dispatch(authSlice.actions.loginFailed('Unknown error'));
        }
    }
};

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.logoutRequest());
    try {
        const url = import.meta.env.VITE_APP_API_URL + "/auth/logout";
        const res = await axios.get(url, {
            withCredentials: true,
        });
        dispatch(authSlice.actions.logoutSuccess(res.data.message));
        dispatch(authSlice.actions.resetAuthSlice());
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            dispatch(authSlice.actions.logoutFailed(error.response?.data?.message || error.message));
        } else if (error instanceof Error) {
            dispatch(authSlice.actions.logoutFailed(error.message));
        } else {
            dispatch(authSlice.actions.logoutFailed('Unknown error'));
        }
    }
};

export const getUser = () => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.getUserRequest());
    try {
        const url = import.meta.env.VITE_APP_API_URL + "/auth/getUser";
        const res = await axios.get(url, {
            withCredentials: true,
        });
        dispatch(authSlice.actions.getUserSuccess(res.data));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            dispatch(authSlice.actions.getUserFailed(error.response?.data?.message || error.message));
        } else if (error instanceof Error) {
            dispatch(authSlice.actions.getUserFailed(error.message));
        } else {
            dispatch(authSlice.actions.getUserFailed('Unknown error'));
        }
    }
};

export const forgotPassword = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.ForgotPasswordRequest());
    try {
        const url = import.meta.env.VITE_APP_API_URL + "/auth/password/forgot";
        const res = await axios.post(url, { email }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(authSlice.actions.ForgotPasswordSuccess(res.data.message));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            dispatch(authSlice.actions.ForgotPasswordFailed(error.response?.data?.message || error.message));
        } else if (error instanceof Error) {
            dispatch(authSlice.actions.ForgotPasswordFailed(error.message));
        } else {
            dispatch(authSlice.actions.ForgotPasswordFailed('Unknown error'));
        }
    }
};

export const resetPassword = (data: RegisterData, token: string) => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.resetPasswordRequest());
    try {
        const url = import.meta.env.VITE_APP_API_URL + `/auth/password/reset/${token}`;
        const res = await axios.put(url, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(authSlice.actions.resetPasswordSuccess(res.data.message));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            dispatch(authSlice.actions.resetPasswordFailed(error.response?.data?.message || error.message));
        } else if (error instanceof Error) {
            dispatch(authSlice.actions.resetPasswordFailed(error.message));
        } else {
            dispatch(authSlice.actions.resetPasswordFailed('Unknown error'));
        }
    }
};

export const updatePassword = (data: RegisterData) => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.updatePasswordRequest());
    try {
        const url = import.meta.env.VITE_APP_API_URL + '/auth/password/update';
        const res = await axios.put(url, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(authSlice.actions.updatePasswordSuccess(res.data.message));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            dispatch(authSlice.actions.updatePasswordFailed(error.response?.data?.message || error.message));
        } else if (error instanceof Error) {
            dispatch(authSlice.actions.updatePasswordFailed(error.message));
        } else {
            dispatch(authSlice.actions.updatePasswordFailed('Unknown error'));
        }
    }
};

export default authSlice.reducer;
