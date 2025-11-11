import { logout, resetAuthSlice } from '@store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@store/storeHooks';
import { useEffect } from 'react';
import { toast } from 'sonner';

import logo_with_title from "@assets/logo-with-title.png";
import { BookImage, BookOpenText, LayoutDashboardIcon, LogOut, Settings, SquareX, UserPlus, Users } from 'lucide-react';
import { toggleAddNewAdminPopup } from '@store/slices/popUpSlice';
import AddNewAdminPopup from '@popups/AddNewAdminPopup';

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
    const dispatch = useAppDispatch();
    const { addNewAdminPopup } = useAppSelector(state => state.popup);
    const {
        loading,
        error,
        isAuthenticated,
        message,
        user
    } = useAppSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(resetAuthSlice);
        } else if (message) {
            toast.success(message);
        }
    }, [dispatch, isAuthenticated, error, loading, message]);

    return (
        <>
            <aside
                className={`${isSideBarOpen ? "left-0 h-screen" : "-left-full"} z-10 transition-all 
                    duration-700 relative sm:fixed sm:left-0 flex w-64 bg-black text-white 
                    flex-col sm:h-full`
                }
            >
                <div className='px-6 py-4 my-8'>
                    <img src={logo_with_title} alt="logo" />
                </div>
                <nav className='flex-1 px-6 space-y-2'>
                    <button
                        className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2'
                        onClick={() => setSelectedComponent("Dashboard")}
                    >
                        <LayoutDashboardIcon />
                        <span>Dashboard</span>
                    </button>
                    <button
                        className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2'
                        onClick={() => setSelectedComponent("Books")}
                    >
                        <BookOpenText />
                        <span>Books</span>
                    </button>

                    {isAuthenticated
                        && user?.role === "Admin"
                        && (
                            <>
                                <button
                                    className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2'
                                    onClick={() => setSelectedComponent("Catlog")}
                                >
                                    <BookImage />
                                    <span>Catlog</span>
                                </button>
                                <button
                                    className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2'
                                    onClick={() => setSelectedComponent("Users")}
                                >
                                    <Users />
                                    <span>Users</span>
                                </button>
                                <button
                                    className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2'
                                    onClick={() => dispatch(toggleAddNewAdminPopup())}
                                >
                                    <UserPlus />
                                    <span>Add New Admin</span>
                                </button>
                            </>
                        )}

                    {isAuthenticated
                        && user?.role === "User"
                        && (
                            <>
                                <button
                                    className='w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2'
                                    onClick={() => setSelectedComponent("My Borrowed Books")}
                                >
                                    <BookImage />
                                    <span>My Borrowed Books</span>
                                </button>
                            </>
                        )}
                    <button
                        className='w-full py-2 font-medium bg-transparent rounded-md 
                        hover:cursor-pointer flex items-center space-x-2'
                    // onClick={() => setSelectedComponent("Users")}
                    >
                        <Settings />
                        <span>Update Credentials</span>
                    </button>
                </nav>
                <div className='px-6 py-4'>
                    <button
                        className='py-2 font-medium text-center bg-transparent rounded-md
                    hover:cursor-pointer flex items-center justify-center space-x-5 
                    mx-auto w-fit'
                        onClick={() => handleLogout()}
                    >
                        <LogOut />
                        <span>Logout</span>
                    </button>
                </div>

                <SquareX
                    size={30}
                    onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                    className='h-fit absolute top-0 right-4 mt-4 block sm:hidden'
                />
            </aside>

            {addNewAdminPopup && <AddNewAdminPopup />}
        </>
    );
};

export default Sidebar;