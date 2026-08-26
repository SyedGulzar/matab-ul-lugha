import React from 'react';
import { Library, PenTool, Database, Users, BookOpen, DoorOpen } from 'lucide-react';
import { isAdmin } from '../../constants';

interface SidebarProps {
  currentView: 'learning' | 'practice';
  onSelectView: (view: 'learning' | 'practice') => void;
  showQuestionBankManager: boolean;
  onToggleQuestionBankManager: () => void;
  showUserDirectory: boolean;
  onToggleUserDirectory: () => void;
  username: string;
  onLogoutClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  showQuestionBankManager,
  onToggleQuestionBankManager,
  showUserDirectory,
  onToggleUserDirectory,
  username,
  onLogoutClick,
}) => {
  const isUserAdmin = isAdmin(username);

  // Geometric Rub-el-Hizb Sidebar Button
  const SidebarButton = ({
    icon: Icon,
    label,
    isActive,
    onClick,
  }: {
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => {
    return (
      <div className="relative group flex items-center">
        <button
          onClick={onClick}
          className="relative w-16 h-16 flex items-center justify-center focus:outline-none z-20"
        >
          {/* Geometric Background (Rub el Hizb) */}
          <div className={`absolute inset-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
            <svg
              viewBox="0 0 100 100"
              className={`w-full h-full drop-shadow-md filter transition-all duration-300 ${
                isActive
                  ? 'drop-shadow-[0_0_8px_rgba(74,55,40,0.6)] dark:drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                  : 'group-hover:drop-shadow-[0_0_8px_rgba(74,55,40,0.6)] dark:group-hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]'
              }`}
            >
              <g transform="translate(50 50)">
                {/* Square 1 */}
                <rect
                  x="-32"
                  y="-32"
                  width="64"
                  height="64"
                  rx="4"
                  className={`transition-all duration-300 stroke-2 ${
                    isActive
                      ? 'fill-[#4A3728] dark:fill-amber-500 stroke-[#2C1810] dark:stroke-amber-400'
                      : 'fill-[#E6DEC8] dark:fill-slate-800 stroke-[#8D6E63] dark:stroke-slate-600 group-hover:stroke-[#4A3728] dark:group-hover:stroke-amber-500'
                  }`}
                />
                {/* Square 2 (Rotated 45deg) */}
                <rect
                  x="-32"
                  y="-32"
                  width="64"
                  height="64"
                  rx="4"
                  transform="rotate(45)"
                  className={`transition-all duration-300 stroke-2 ${
                    isActive
                      ? 'fill-[#4A3728] dark:fill-amber-500 stroke-[#2C1810] dark:stroke-amber-400'
                      : 'fill-[#E6DEC8] dark:fill-slate-800 stroke-[#8D6E63] dark:stroke-slate-600 group-hover:stroke-[#4A3728] dark:group-hover:stroke-amber-500'
                  }`}
                />
                {/* Central Medallion Circle */}
                <circle
                  r="26"
                  className={`transition-all duration-300 stroke-1 ${
                    isActive
                      ? 'fill-[#3A2A1E] dark:fill-amber-600 stroke-[#5D4037] dark:stroke-amber-300'
                      : 'fill-[#D7Cea7] dark:fill-slate-700 stroke-[#8D6E63] dark:stroke-slate-500'
                  }`}
                />
              </g>
            </svg>
          </div>

          {/* Icon */}
          <Icon
            size={24}
            className={`relative z-10 transition-colors duration-300 ${
              isActive
                ? 'text-[#E6DEC8] dark:text-slate-900'
                : 'text-[#8D6E63] dark:text-gray-400 group-hover:text-[#4A3728] dark:group-hover:text-amber-400'
            }`}
          />
        </button>

        {/* Hover Label */}
        <div className="absolute left-full ml-6 px-5 py-2 bg-[#F0EAD6] dark:bg-slate-900 border-2 border-[#5D4037] dark:border-amber-500 text-[#4A3728] dark:text-amber-500 rounded-lg font-messiri text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(74,55,40,0.3)] dark:shadow-[0_0_15px_rgba(245,158,11,0.3)] pointer-events-none z-50 uppercase tracking-wider transform translate-x-[-10px] group-hover:translate-x-0">
          {label}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-3 bg-[#F0EAD6] dark:bg-slate-900 border-l-2 border-b-2 border-[#5D4037] dark:border-amber-500 rotate-45"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Left Geometric Sidebar */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-6 items-center">
        <SidebarButton
          icon={Library}
          label="Learning Area"
          isActive={currentView === 'learning' && !showQuestionBankManager && !showUserDirectory}
          onClick={() => onSelectView('learning')}
        />

        <SidebarButton
          icon={PenTool}
          label="Practice Studio"
          isActive={currentView === 'practice' && !showQuestionBankManager && !showUserDirectory}
          onClick={() => onSelectView('practice')}
        />

        {/* Admin Question Bank Button */}
        {isUserAdmin && (
          <SidebarButton
            icon={Database}
            label="Question Bank"
            isActive={showQuestionBankManager}
            onClick={onToggleQuestionBankManager}
          />
        )}

        {/* Admin User Directory Button */}
        {isUserAdmin && (
          <SidebarButton
            icon={Users}
            label="All Users"
            isActive={showUserDirectory}
            onClick={onToggleUserDirectory}
          />
        )}
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#E6DEC8]/95 dark:bg-slate-900/95 border-t border-[#5D4037]/20 dark:border-amber-500/20 backdrop-blur-md px-4 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => onSelectView('learning')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            currentView === 'learning'
              ? 'text-[#4A3728] dark:text-amber-500 font-bold'
              : 'text-[#8D6E63] dark:text-slate-400'
          }`}
        >
          <BookOpen size={20} />
          <span className="text-xs font-messiri">Learn</span>
        </button>

        <button
          onClick={() => onSelectView('practice')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            currentView === 'practice'
              ? 'text-[#4A3728] dark:text-amber-500 font-bold'
              : 'text-[#8D6E63] dark:text-slate-400'
          }`}
        >
          <PenTool size={20} />
          <span className="text-xs font-messiri">Practice</span>
        </button>

        <button
          onClick={onLogoutClick}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-red-600 dark:text-red-400 transition-colors"
        >
          <DoorOpen size={20} />
          <span className="text-xs font-messiri">Logout</span>
        </button>
      </nav>
    </>
  );
};
