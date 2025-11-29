import { resetAuthSlice, resetPassword } from "@store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { toast } from "sonner";
import logo_with_title from '@assets/logo-with-title.png';
import logo from '@assets/black-logo.png';
import { Loader2 } from "lucide-react";

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams<{ token: string; }>();

    const dispatch = useAppDispatch();
    const { isAuthenticated, error, loading, message } = useAppSelector(state => state.auth);

    const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { password, confirmPassword };
        if (token) {
            dispatch(resetPassword(data, token));
        } else {
            console.error("Token is required but not found in the URL.");
        }
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(resetAuthSlice());
            // navigateTo(`/otp-verification/${email}`);
        }
        if (error) {
            toast.error(error);
            dispatch(resetAuthSlice());
        }
    }, [dispatch, isAuthenticated, error, loading]);

    if (isAuthenticated) {
        return <Navigate to='/' />;
    }

    return (
        <div className=" flex flex-col justify-center md:flex-row h-screen">
            {/* Left section */}
            <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
                <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center 
                justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
                    <div className="text-center h-[450px]">
                        <div className="flex justify-center mb-12">
                            <img
                                src={logo_with_title}
                                alt="logo"
                                className="mb-12 h-44 w-auto"
                            />
                        </div>
                        <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-3xl font-medium leading-10">
                            "Your premier digital library for borrowing and reading books"
                        </h3>
                    </div>
                </div></div>
            {/* Right section */}
            <div
                className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative"
            >
                <Link to={"/password/forgot"}
                    className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 
                    -left-28 hover:bg-black hover:text-white transition duration-300 text-end"
                >
                    Back
                </Link>
                <div className="w-full max-w-sm">
                    <div className="flex justify-center mb-12">
                        <div className="rounded-full flex items-center justify-center">
                            <img
                                src={logo}
                                alt="logo"
                                className="h-24 w-auto"
                            />
                        </div>
                    </div>
                    <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">
                        Reset Password
                    </h1>
                    <p className="text-gray-800 text-center mb-12">
                        Please enter your new password
                    </p>

                    <form onSubmit={handleResetPassword}>
                        <div className="mb-4">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="border-2 mt-5 border-black w-full font-semibold bg-black 
                            text-white py-2 rounded-lg hover:bg-white hover:text-black transition
                            cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600 flex items-center
                            justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "RESET PASSWORD"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;