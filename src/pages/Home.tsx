import { useAppSelector } from "@store/storeHooks";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router";

import Sidebar from "@layout/SideBar";
import UserDashboard from "@components/UserDashboard";
import AdminDashboard from "@components/AdminDashboard";
import BookManagement from "@components/BookManagement";
import Catlog from "@components/Catlog";
import Users from "@components/Users";
import MyBorrowedBooks from "@components/MyBorrowedBooks";
import Header from "@layout/Header";

const Home = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState('');

    const { user, isAuthenticated } = useAppSelector(state => state.auth);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div className="relative sm:pl-64 flex min-h-screen bg-gray-100">
            <div className="sm:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white">
                <Menu
                    className="text-2xl"
                    onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                />
            </div>
            <Sidebar
                isSideBarOpen={isSideBarOpen}
                setIsSideBarOpen={setIsSideBarOpen}
                setSelectedComponent={setSelectedComponent}
            />
            <div>
                <Header />
            </div>

            {(() => {
                switch (selectedComponent) {
                    case "Dashboard":
                        return user?.role === "User" ? (<UserDashboard />) : (<AdminDashboard />);
                        break;

                    case "Books":
                        return <BookManagement />;
                        break;

                    case "Catalog":
                        if (user?.role === 'Admin') {
                            return <Catlog />;
                        }
                        break;

                    case "Users":
                        if (user?.role === 'Admin') {
                            return <Users />;
                        }
                        break;

                    case "My Borrowed Books":
                        if (user?.role === 'Admin') {
                            return <MyBorrowedBooks />;
                        }
                        break;

                    default:
                        return user?.role === "User" ? (<UserDashboard />) : (<AdminDashboard />);
                }
            })()}
        </div>
    );
};

export default Home;