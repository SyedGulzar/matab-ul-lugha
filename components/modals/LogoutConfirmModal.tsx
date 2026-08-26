import React from 'react';
import { DoorOpen } from 'lucide-react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#F0EAD6] dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-[#5D4037]/20 dark:border-amber-500/30 w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300 pb-2">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-[#4A3728] dark:bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group">
            <DoorOpen
              size={32}
              className="text-[#F0EAD6] dark:text-slate-900 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 className="text-2xl font-messiri font-bold text-[#2C1810] dark:text-slate-100 mb-2">
            Leaving so soon?
          </h3>
          <p className="font-markazi text-lg text-[#8D6E63] dark:text-slate-400 mb-6">
            Are you sure you want to logout from your session?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-[#8D6E63]/30 dark:border-slate-600 text-[#5D4037] dark:text-slate-300 font-bold hover:bg-[#5D4037]/5 dark:hover:bg-slate-700 transition-colors font-messiri"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold shadow-md transition-colors flex items-center gap-2 font-messiri"
            >
              <DoorOpen size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
