import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface LampPullCordProps {
  isDarkMode: boolean;
  ropeState: 'idle' | 'pulling' | 'releasing';
  onToggleTheme: () => void;
}

export const LampPullCord: React.FC<LampPullCordProps> = ({
  isDarkMode,
  ropeState,
  onToggleTheme
}) => {
  const getWirePullStyle = () => {
    switch (ropeState) {
      case 'pulling':
        return 'h-24 sm:h-32 transition-all duration-200 ease-out';
      case 'releasing':
        return 'h-16 sm:h-24 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]';
      case 'idle':
      default:
        return 'h-16 sm:h-24 transition-all duration-300';
    }
  };

  const getRopeInnerClass = () => {
    switch (ropeState) {
      case 'idle':
        return 'animate-pendulum';
      default:
        return 'rotate-0';
    }
  };

  return (
    <div className="fixed top-0 right-4 sm:right-12 z-50 pointer-events-auto select-none rope-element flex flex-col items-center">
      {/* Ceiling Mount - ALWAYS STATIONARY AT TOP */}
      <div className="w-5 h-2 bg-[#4A3728] dark:bg-amber-600 rounded-b shadow-sm z-10 flex-shrink-0"></div>

      {/* Dynamic Hanging Wire & Lamp Unit */}
      <div
        onClick={onToggleTheme}
        className={`cursor-pointer group flex flex-col items-center origin-top transform-gpu ${getRopeInnerClass()}`}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {/* Golden Cord Line - Stretches downward on pull */}
        <div
          className={`w-0.5 bg-gradient-to-b from-[#8D6E63] via-[#D7Cea7] to-[#4A3728] dark:from-amber-700 dark:via-amber-400 dark:to-amber-500 shadow-[0_0_2px_rgba(0,0,0,0.2)] ${getWirePullStyle()}`}
        ></div>

        {/* Decorative Lamp Handle */}
        <div className="w-6 h-9 -mt-1 bg-[#F0EAD6] dark:bg-slate-900 border-2 border-[#5D4037] dark:border-amber-500 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(74,55,40,0.6)] dark:group-hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] flex-shrink-0">
          {isDarkMode ? (
            <Moon size={13} className="text-amber-500 fill-amber-500" />
          ) : (
            <Sun size={13} className="text-[#4A3728]" />
          )}
        </div>

        {/* Tassel Bottom */}
        <div className="w-0.5 h-4 bg-[#4A3728] dark:bg-amber-500 -mt-px opacity-60 flex-shrink-0"></div>
        <div className="flex gap-0.5 -mt-1 flex-shrink-0">
          <div className="w-0.5 h-2.5 bg-[#5D4037]/60 dark:bg-amber-500/60 rounded-full"></div>
          <div className="w-0.5 h-3.5 bg-[#5D4037] dark:bg-amber-500 rounded-full"></div>
          <div className="w-0.5 h-2.5 bg-[#5D4037]/60 dark:bg-amber-500/60 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
