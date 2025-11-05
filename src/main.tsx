import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@root/index.css';

import { RouterProvider } from 'react-router';
import { createBrowserRouter } from "react-router";

import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import ForgotPassword from '@pages/ForgotPassword';
import OTP from '@pages/OTP';
import ResetPassword from '@pages/ResetPassword';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';

import { store } from '@store/store';

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
    element: <OTP />
  },
  {
    path: '/otp-verification/:email',
    element: <ResetPassword />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster theme='system' richColors expand position='top-right' />
    </Provider>
  </StrictMode>,
);
