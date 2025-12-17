import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "@store/store";
import axios from "axios";
import { toast } from "sonner";

interface BorrowedBook {
    bookId: string;
    returned: boolean;
    bookTitle?: string;
    borrowedDate?: Date;
    dueDate?: Date;
}

interface Users {
    name: string;
    email: string;
    password?: string;
    role: "Admin" | "User";
    accountVerified: boolean;
    borrowedBooks: BorrowedBook[];
    // avatar?: Avatar;
    verificationCode?: number;
    verificationCodeExpire?: Date;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UsersState {
    loading: boolean;
    users: Users[] | null;
}

const initialState: UsersState = {
    users: [],
    loading: false
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchAllUsersRequest(state) {
            state.loading = true;
        },
        fetchAllUsersSuccess(state, action) {
            state.loading = false;
            state.users = action.payload;
        },
        fetchAllUsersFailed(state) {
            state.loading = false;
        },
        addNewAdminRequest(state) {
            state.loading = true;
        },
        addNewAdminSuccess(state) {
            state.loading = false;
        },
        addNewAdminFailed(state) {
            state.loading = false;
        },
    }
});

export const fetchAllUsers = () => async (dispatch: AppDispatch) => {
    dispatch(usersSlice.actions.fetchAllUsersRequest());
    const url = import.meta.env.VITE_APP_API_URL + '/user/all';
    await axios.get(url, { withCredentials: true }).then(res => {
        console.log('users', res.data);

        dispatch(usersSlice.actions.fetchAllUsersSuccess(res.data.users));
    }).catch(err => {
        dispatch(usersSlice.actions.fetchAllUsersFailed(err.response.data.message));
    });
};

export const addNewAdmin = (data: FormData) => async (dispatch: AppDispatch) => {
    dispatch(usersSlice.actions.addNewAdminRequest());
    const url = import.meta.env.VITE_APP_API_URL + '/user/add/new-admin';
    await axios.post(url, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => {
        dispatch(usersSlice.actions.addNewAdminSuccess());
        toast.success(res.data.message);
    }).catch(err => {
        usersSlice.actions.addNewAdminFailed();
        toast.error(err.response.data.message);
    });
};

export default usersSlice.reducer;