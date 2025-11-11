import { toggleSettingPopup } from "@store/slices/popUpSlice";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { Settings, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const hours = now.getHours() % 12 || 12;
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

            setCurrentTime(`${hours}:${minutes} ${ampm}`);

            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            const dateString = now.toLocaleDateString('en-IN', options);
            setCurrentDate(dateString);
            console.log(dateString);
        };

        const intervalId = setInterval(updateDateTime, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <header className="absolute top-0 bg-white w-full py-4 px-6 left-0 shadow-md flex justify-between items-center">
            {/* Left Side */}
            <div className="flex items-center gap-2">
                <UserIcon />
                <div className="flex flex-col">
                    <span className="text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold">Mr. Bean</span>
                    <span className="text-sm font-medium sm:text-lg sm:font-medium">User role</span>
                </div>
            </div>
            {/* Right Side */}
            <div className="hidden md:flex items-center gap-2">
                <div className="flex flex-col text-sm lg:text-base items-end font-semibold">
                    <span>{currentTime}</span>
                    <span>{currentDate}</span>
                </div>
                <span className="bg-black h-14 w-0.5 " />
                <Settings onClick={() => toggleSettingPopup()} />
            </div>
        </header>
    );
};

export default Header;