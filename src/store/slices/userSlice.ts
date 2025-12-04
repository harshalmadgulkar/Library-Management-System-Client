import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "@store/store";
import axios from "axios";
import { toast } from "sonner";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        loading: false
    },
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
    dispatch(userSlice.actions.fetchAllUsersRequest());
    const url = import.meta.env.VITE_APP_API_URL + '/user/all';
    await axios.get(url, { withCredentials: true }).then(res => {
        dispatch(userSlice.actions.fetchAllUsersSuccess(res.data.user));
    }).catch(err => {
        dispatch(userSlice.actions.fetchAllUsersFailed(err.response.data.message));
    });
};

export const addNewAdmin = (data: FormData) => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.addNewAdminRequest());
    const url = import.meta.env.VITE_APP_API_URL + '/user/add/new-admin';
    await axios.post(url, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => {
        dispatch(userSlice.actions.addNewAdminSuccess());
        toast.success(res.data.message);
    }).catch(err => {
        userSlice.actions.addNewAdminFailed();
        toast.error(err.response.data.message);
    });
};

export default userSlice.reducer;