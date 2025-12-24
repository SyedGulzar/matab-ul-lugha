import React from 'react';
import { DoorClosed, DoorOpen } from 'lucide-react';

interface LogoutButtonProps {
    onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    return (
        <button
            onClick={onLogout}
            className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-[#E6DEC8] dark:bg-slate-800 border border-[#4A3728]/20 dark:border-amber-500/20 text-[#4A3728] dark:text-amber-500 hover:bg-[#4A3728] dark:hover:bg-amber-600 hover:text-[#E6DEC8] dark:hover:text-slate-900 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(74,55,40,0.3)] dark:hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            title="Logout"
        >
            <DoorClosed className="absolute transition-all duration-300 transform scale-100 group-hover:scale-0 opacity-100 group-hover:opacity-0" size={20} />
            <DoorOpen className="absolute transition-all duration-300 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100" size={20} />
        </button>
    );
};
