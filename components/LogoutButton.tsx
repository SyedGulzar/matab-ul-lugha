import React from 'react';
import { DoorClosed, DoorOpen } from 'lucide-react';

interface LogoutButtonProps {
    onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    return (
        <div className="relative group flex items-center">
            <button
                onClick={onLogout}
                className="relative w-16 h-16 flex items-center justify-center focus:outline-none z-20"
                title="Logout"
            >
                {/* Geometric Background (Rub el Hizb) */}
                <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full drop-shadow-md filter transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(74,55,40,0.6)] dark:group-hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]"
                    >
                        {/* Using a group to center and rotate */}
                        <g transform="translate(50 50)">
                            {/* Square 1 */}
                            <rect
                                x="-32" y="-32" width="64" height="64" rx="4"
                                className="transition-all duration-300 stroke-2 fill-[#E6DEC8] dark:fill-slate-800 stroke-[#8D6E63] dark:stroke-slate-600 group-hover:stroke-[#4A3728] dark:group-hover:stroke-amber-500"
                            />
                            {/* Square 2 (Rotated) */}
                            <rect
                                x="-32" y="-32" width="64" height="64" rx="4" transform="rotate(45)"
                                className="transition-all duration-300 stroke-2 fill-[#E6DEC8] dark:fill-slate-800 stroke-[#8D6E63] dark:stroke-slate-600 group-hover:stroke-[#4A3728] dark:group-hover:stroke-amber-500"
                            />
                        </g>
                    </svg>
                </div>

                {/* Icons */}
                <DoorClosed className="relative z-10 transition-all duration-300 transform scale-100 group-hover:scale-0 opacity-100 group-hover:opacity-0 text-[#8D6E63] dark:text-gray-400 group-hover:text-[#4A3728] dark:group-hover:text-amber-400" size={24} />
                <DoorOpen className="relative z-10 absolute transition-all duration-300 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 text-[#8D6E63] dark:text-gray-400 group-hover:text-[#4A3728] dark:group-hover:text-amber-400" size={24} />
            </button>

            {/* Label - Premium Plaque Style (Tooltip on LEFT) */}
            <div className={`absolute right-full mr-6 px-5 py-2 bg-[#F0EAD6] dark:bg-slate-900 border-2 border-[#5D4037] dark:border-amber-500 text-[#4A3728] dark:text-amber-500 rounded-lg font-messiri text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(74,55,40,0.3)] dark:shadow-[0_0_15px_rgba(245,158,11,0.3)] pointer-events-none z-50 uppercase tracking-wider transform translate-x-[10px] group-hover:translate-x-0`}>
                LOGOUT
                {/* Triangle pointing RIGHT towards the button */}
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-3 bg-[#F0EAD6] dark:bg-slate-900 border-t-2 border-r-2 border-[#5D4037] dark:border-amber-500 rotate-45"></div>
            </div>
        </div>
    );
};
