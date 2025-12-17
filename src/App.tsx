import { RouterProvider } from 'react-router';
import { createBrowserRouter } from "react-router";

import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import ForgotPassword from '@pages/ForgotPassword';
import OTP from '@pages/OTP';
import ResetPassword from '@pages/ResetPassword';
import { useAppDispatch, useAppSelector } from '@store/storeHooks';
import { useEffect } from 'react';
import { getUser } from '@store/slices/authSlice';
import { fetchAllUsers } from '@store/slices/usersSlice';

const App = () => {
    const { user, isAuthenticated } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser);

        if (isAuthenticated && user?.role === 'Admin') {
            console.log("admin loggedin");
            dispatch(fetchAllUsers());
        }
    }, [isAuthenticated]);;

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/password/forgot',
            element: <ForgotPassword />
        },
        {
            path: '/password/reset/:token',
            element: <ResetPassword />
        },
        {
            path: '/otp-verification/:email',
            element: <OTP />
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default App;