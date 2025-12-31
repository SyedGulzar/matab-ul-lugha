import React, { useState } from 'react';
import { BookOpen, User } from 'lucide-react';
import { VALID_USERNAMES } from '../constants';

interface LoginProps {
    onLogin: (username: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [inputUsername, setInputUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedUsername = inputUsername.trim();

        if (!trimmedUsername) {
            setError('Please enter a username to continue.');
            return;
        }

        if (!VALID_USERNAMES.includes(trimmedUsername)) {
            setError('Access Denied: Invalid Username.');
            return;
        }

        onLogin(trimmedUsername);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0EAD6] dark:bg-slate-900 p-4 transition-colors duration-500">
            <div className="w-full max-w-md bg-[#E6DEC8] dark:bg-slate-800 rounded-2xl shadow-xl border border-[#5D4037]/10 dark:border-amber-500/20 overflow-hidden relative group">

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A3728] dark:bg-amber-500 opacity-[0.03] dark:opacity-[0.05] rounded-bl-full transform translate-x-1/3 -translate-y-1/3 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#4A3728] dark:bg-amber-500 opacity-[0.03] dark:opacity-[0.05] rounded-tr-full transform -translate-x-1/3 translate-y-1/3 transition-colors duration-500"></div>

                <div className="p-8 relative z-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4A3728] dark:bg-amber-500 text-[#E6DEC8] dark:text-slate-900 rounded-xl shadow-lg mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                            <BookOpen size={32} />
                        </div>
                        <h1 className="text-4xl font-messiri font-bold text-[#2C1810] dark:text-slate-100 mb-2">
                            Maktab<span className="text-[#5D4037] dark:text-slate-400">-ul-</span><span className="text-[#4A3728] dark:text-amber-500">Lugha</span>
                        </h1>
                        <p className="text-[#8D6E63] dark:text-slate-400 font-markazi text-xl tracking-wide uppercase">The School of Language</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-xs font-bold text-[#4A3728] dark:text-amber-500 mb-2 uppercase tracking-widest font-messiri">
                                Identify Yourself
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8D6E63] dark:text-slate-500">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    className="w-full pl-10 pr-4 py-3 bg-[#F0EAD6] dark:bg-slate-900 border border-[#D7Cea7] dark:border-slate-700 text-[#2C1810] dark:text-slate-200 text-lg font-markazi font-bold rounded-lg focus:border-[#4A3728] dark:focus:border-amber-500 focus:ring-1 focus:ring-[#4A3728] dark:focus:ring-amber-500 outline-none transition-all placeholder-[#8D6E63]/50 dark:placeholder-slate-600 focus:shadow-[0_0_15px_rgba(74,55,40,0.1)] dark:focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                                    placeholder="Enter your name..."
                                    value={inputUsername}
                                    onChange={(e) => {
                                        setInputUsername(e.target.value);
                                        setError('');
                                    }}
                                />
                            </div>
                            {error && (
                                <p className="mt-2 text-red-600 dark:text-red-400 text-sm font-markazi font-bold animate-pulse">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#4A3728] dark:bg-amber-600 hover:bg-[#2C1810] dark:hover:bg-amber-700 text-[#E6DEC8] dark:text-slate-900 font-messiri font-bold text-lg py-3 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border border-transparent dark:border-amber-500/20"
                        >
                            Enter the School
                        </button>
                    </form>
                </div>
            </div>

            <p className="mt-8 text-[#8D6E63] dark:text-slate-600 font-markazi text-lg italic">
                "Knowledge is light, and ignorance is darkness."
            </p>
        </div>
    );
};
