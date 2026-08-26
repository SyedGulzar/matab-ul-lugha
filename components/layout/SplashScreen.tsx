import React from 'react';
import { BookOpen } from 'lucide-react';

interface SplashScreenProps {
  username: string;
  splashFading: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ username, splashFading }) => {
  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-[#E6DEC8] via-[#F0EAD6] to-[#D7Cea7] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-opacity duration-500 ${
        splashFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z' fill='none' stroke='%234A3728' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Arabic Salam Greeting */}
      <div className="text-center animate-fade-in-up">
        <h1
          className="text-6xl sm:text-8xl font-messiri font-bold text-[#2C1810] dark:text-amber-500 mb-2 drop-shadow-lg"
          style={{ fontFamily: "'Amiri', 'Noto Naskh Arabic', serif" }}
        >
          السَّلَامُ عَلَيْكُمْ
        </h1>
        <p className="text-xl sm:text-2xl font-markazi text-[#5D4037] dark:text-slate-400 tracking-wide">
          Peace Be Upon You
        </p>
      </div>

      {/* Decorative Divider */}
      <div className="mt-10 mb-6 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#4A3728] dark:to-amber-500"></div>
        <div className="w-3 h-3 rotate-45 bg-[#4A3728] dark:bg-amber-500"></div>
        <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#4A3728] dark:to-amber-500"></div>
      </div>

      {/* Welcome Card */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="relative px-12 py-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border-2 border-[#5D4037]/20 dark:border-amber-500/30 shadow-xl">
          {/* Corner Decorations */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#4A3728] dark:border-amber-500 rounded-tl-lg"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#4A3728] dark:border-amber-500 rounded-tr-lg"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#4A3728] dark:border-amber-500 rounded-bl-lg"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#4A3728] dark:border-amber-500 rounded-br-lg"></div>

          <p className="text-sm font-markazi text-[#8D6E63] dark:text-slate-400 uppercase tracking-[0.3em] mb-2">Welcome</p>
          <h2 className="text-3xl sm:text-4xl font-messiri font-bold text-[#2C1810] dark:text-slate-100">
            {username}
          </h2>
          <p className="text-sm font-markazi text-[#5D4037] dark:text-amber-500 mt-2 italic">to The School of Language</p>
        </div>
      </div>

      {/* Logo Badge */}
      <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <div className="flex items-center gap-3 px-5 py-2 bg-[#4A3728] dark:bg-amber-500 rounded-full shadow-lg">
          <BookOpen size={20} className="text-[#E6DEC8] dark:text-slate-900" />
          <span className="text-sm font-messiri font-bold text-[#E6DEC8] dark:text-slate-900 tracking-wide">Maktab-ul-Lugha</span>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="mt-8 flex gap-2 animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <div className="w-2 h-2 bg-[#4A3728] dark:bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-[#4A3728] dark:bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-[#4A3728] dark:bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
