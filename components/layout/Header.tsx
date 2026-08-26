import React, { useRef } from 'react';
import { BookOpen, Flame, Camera, Shield, DoorOpen } from 'lucide-react';
import { isAdmin } from '../../constants';

interface HeaderProps {
  username: string;
  streak: number;
  isCapturing: boolean;
  onScreenshot: () => void;
  onLogoutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  username,
  streak,
  isCapturing,
  onScreenshot,
  onLogoutClick
}) => {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const charPositions = useRef<{ x: number; y: number }[]>([]);

  // Interactive Title Animation
  const handleTitleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - container.left;
    const mouseY = e.clientY - container.top;

    charRefs.current.forEach((charEl, index) => {
      if (!charEl) return;
      const charRect = charEl.getBoundingClientRect();
      const charCenterX = charRect.left + charRect.width / 2 - container.left;
      const charCenterY = charRect.top + charRect.height / 2 - container.top;

      const deltaX = mouseX - charCenterX;
      const deltaY = mouseY - charCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 100;

      if (distance < maxDistance && distance > 0) {
        const force = (1 - distance / maxDistance) * 15;
        const moveX = -(deltaX / distance) * force;
        const moveY = -(deltaY / distance) * force;
        charPositions.current[index] = { x: moveX, y: moveY };
        charEl.style.transform = `translate(${moveX}px, ${moveY}px)`;
        charEl.style.transition = 'transform 0.1s ease-out';
      }
    });
  };

  const handleTitleMouseLeave = () => {
    charRefs.current.forEach((charEl, index) => {
      if (charEl) {
        charEl.style.transform = 'translate(0px, 0px)';
        charEl.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        charPositions.current[index] = { x: 0, y: 0 };
      }
    });
  };

  const renderInteractiveChar = (char: string, index: number, className: string = '') => (
    <span
      key={index}
      ref={(el) => (charRefs.current[index] = el)}
      className={`inline-block select-none cursor-default ${className}`}
      style={{ display: 'inline-block' }}
    >
      {char}
    </span>
  );

  return (
    <header className="bg-[#E6DEC8]/95 dark:bg-slate-900/90 border-b border-[#5D4037]/10 dark:border-amber-500/20 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-opacity-95 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#4A3728] dark:bg-amber-500 text-[#E6DEC8] dark:text-slate-900 rounded-lg shadow-lg relative overflow-hidden group transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(74,55,40,0.5)] dark:shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <div className="absolute inset-0 bg-[#2C1810] dark:bg-amber-600 transform rotate-45 scale-50 opacity-20 group-hover:rotate-90 transition-transform duration-700"></div>
            <BookOpen size={20} className="sm:hidden relative z-10" />
            <BookOpen size={24} className="hidden sm:block relative z-10" />
          </div>

          {/* Interactive Title Container */}
          <div
            className="p-2"
            onMouseMove={handleTitleMouseMove}
            onMouseLeave={handleTitleMouseLeave}
          >
            <div>
              <h1 className="text-xl sm:text-3xl font-messiri leading-none flex gap-0.5 sm:gap-1.5 items-baseline">
                <span className="flex">
                  {"Maktab".split('').map((char, i) =>
                    renderInteractiveChar(char, i, "text-[#2C1810] dark:text-slate-100 transition-colors duration-500")
                  )}
                </span>
                <span className="hidden sm:flex mx-0.5">
                  {"-ul-".split('').map((char, i) =>
                    renderInteractiveChar(char, i + 6, "text-[#5D4037] dark:text-slate-400 text-2xl transition-colors duration-500")
                  )}
                </span>
                <span className="sm:hidden text-[#5D4037] dark:text-slate-400 text-lg">-</span>
                <span className="flex">
                  {"Lugha".split('').map((char, i) =>
                    renderInteractiveChar(char, i + 10, "text-[#4A3728] dark:text-amber-500 transition-colors duration-500")
                  )}
                </span>
              </h1>
              <p className="hidden sm:block text-xs text-[#8D6E63] dark:text-slate-400 font-markazi font-bold mt-1 tracking-widest uppercase transition-colors duration-500">
                The School of Language
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mr-10 sm:mr-16">
          {/* Mobile Streak Display */}
          {username && (
            <div className="sm:hidden flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-[#F0EAD6]/80 dark:bg-slate-800/80 rounded-full border border-[#D7Cea7] dark:border-slate-600 shadow-sm backdrop-blur-sm">
                <Flame size={14} className={`${streak > 0 ? "fill-[#D97706] text-[#D97706] animate-pulse" : "text-[#D7Cea7] dark:text-slate-500"}`} />
                <span className={`text-sm font-bold font-messiri ${streak > 0 ? "text-[#D97706] dark:text-amber-500" : "text-[#8D6E63] dark:text-slate-500"}`}>{streak}</span>
              </div>

              {/* Mobile Screenshot Button */}
              <button
                onClick={onScreenshot}
                disabled={isCapturing}
                className={`w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm active:scale-95 transition-transform ${isCapturing ? 'opacity-50' : ''}`}
                title="Take Screenshot"
              >
                <Camera size={14} />
              </button>
            </div>
          )}

          {/* Desktop User Plaque & Controls */}
          {username && (
            <div className="hidden sm:flex items-center gap-3">
              {/* User Plaque */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F0EAD6] dark:bg-slate-800 rounded-lg border border-[#D7Cea7] dark:border-slate-700 shadow-sm">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-[#8D6E63] dark:text-slate-400 font-bold uppercase tracking-widest font-messiri">
                    Welcome
                  </span>
                  <span className="text-sm font-bold font-messiri text-[#2C1810] dark:text-slate-200">
                    {username}
                  </span>
                </div>
                {isAdmin(username) && (
                  <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded flex items-center gap-1 font-messiri">
                    <Shield size={10} />
                    ADMIN
                  </span>
                )}
              </div>

              {/* Desktop Streak Display */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F0EAD6] dark:bg-slate-800 rounded-lg border border-[#D7Cea7] dark:border-slate-700 shadow-sm">
                <Flame size={16} className={`${streak > 0 ? "fill-[#D97706] text-[#D97706] animate-pulse" : "text-[#D7Cea7] dark:text-slate-500"}`} />
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#8D6E63] dark:text-slate-400 font-bold uppercase tracking-widest font-messiri">Streak</span>
                  <span className={`text-sm font-bold font-messiri leading-none ${streak > 0 ? "text-[#D97706] dark:text-amber-500" : "text-[#8D6E63] dark:text-slate-500"}`}>
                    {streak} {streak === 1 ? 'day' : 'days'}
                  </span>
                </div>
              </div>

              {/* Desktop Screenshot Button */}
              <button
                onClick={onScreenshot}
                disabled={isCapturing}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-messiri text-xs font-bold shadow-sm hover:shadow transition-all ${isCapturing ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
                title="Save screenshot"
              >
                <Camera size={14} />
                <span>Screenshot</span>
              </button>

              {/* Logout Button */}
              <button
                onClick={onLogoutClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white dark:bg-red-500/10 dark:hover:bg-red-600 dark:text-red-400 dark:hover:text-white font-messiri text-xs font-bold transition-all border border-red-500/20"
                title="Logout"
              >
                <DoorOpen size={14} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
