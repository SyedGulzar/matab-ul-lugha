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
                className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-[#E6DEC8] dark:bg-slate-800 border-4 border-[#4A3728]/40 dark:border-amber-500/40 text-[#4A3728] dark:text-amber-500 hover:bg-[#4A3728] dark:hover:bg-amber-600 hover:text-[#E6DEC8] dark:hover:text-slate-900 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(74,55,40,0.3)] dark:hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] z-20"
                title="Logout"
            >
                <DoorClosed className="absolute transition-all duration-300 transform scale-100 group-hover:scale-0 opacity-100 group-hover:opacity-0" size={24} />
                <DoorOpen className="absolute transition-all duration-300 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100" size={24} />
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
