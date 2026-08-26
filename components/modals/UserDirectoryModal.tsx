import React from 'react';
import { Users, X, Shield } from 'lucide-react';
import { USERS } from '../../constants';

interface UserDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserDirectoryModal: React.FC<UserDirectoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#F0EAD6] dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-[#5D4037]/20 dark:border-amber-500/30 w-full max-w-2xl max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-[#E6DEC8] dark:bg-slate-800 p-6 border-b border-[#5D4037]/10 dark:border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4A3728] dark:bg-amber-500 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-[#F0EAD6] dark:text-slate-900" />
            </div>
            <div>
              <h2 className="text-2xl font-messiri font-bold text-[#2C1810] dark:text-amber-500">User Directory</h2>
              <p className="text-sm font-markazi text-[#8D6E63] dark:text-slate-400">All registered users in the system</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#5D4037]/10 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={24} className="text-[#5D4037] dark:text-slate-400" />
          </button>
        </div>

        {/* User List */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-3">
            {USERS.map((user) => (
              <div
                key={user.username}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                  user.role === 'admin'
                    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-500/50'
                    : 'bg-white dark:bg-slate-800 border-[#D7Cea7] dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        user.role === 'admin'
                          ? 'bg-[#4A3728] dark:bg-amber-500 text-[#F0EAD6] dark:text-slate-900'
                          : 'bg-[#E6DEC8] dark:bg-slate-700 text-[#4A3728] dark:text-amber-500'
                      }`}
                    >
                      {user.displayName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-messiri font-bold text-lg text-[#2C1810] dark:text-slate-100">
                        {user.displayName}
                      </h3>
                      <p className="font-markazi text-sm text-[#8D6E63] dark:text-slate-400">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.role === 'admin' ? (
                      <span className="flex items-center gap-1 px-3 py-1 bg-[#4A3728] dark:bg-amber-500 text-[#F0EAD6] dark:text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider font-messiri">
                        <Shield size={12} />
                        Admin
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-[#E6DEC8] dark:bg-slate-700 text-[#5D4037] dark:text-slate-300 rounded-full text-xs font-bold uppercase tracking-wider font-messiri">
                        User
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 pt-4 border-t border-[#D7Cea7] dark:border-slate-700 flex justify-between items-center">
            <span className="font-markazi text-[#8D6E63] dark:text-slate-400">
              Total: {USERS.length} users
            </span>
            <span className="font-markazi text-[#8D6E63] dark:text-slate-400">
              {USERS.filter((u) => u.role === 'admin').length} Admin • {USERS.filter((u) => u.role === 'user').length} Users
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
