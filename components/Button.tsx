import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  icon,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-2.5 rounded-md font-messiri font-bold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed tracking-wide transform hover:-translate-y-0.5 active:translate-y-0 text-lg paper-torn";
  
  const variants = {
    // Primary: Sepia Ink (Light) / Bright Gold (Dark)
    // Dark Mode Change: Switched to bg-amber-500 with text-slate-900 (Black on Gold) for max contrast
    primary: "bg-[#4A3728] dark:bg-amber-500 text-[#E6DEC8] dark:text-slate-900 border border-[#2C1810] dark:border-amber-400 shadow-md hover:bg-[#3E2723] dark:hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(74,55,40,0.6)] dark:hover:shadow-[0_0_25px_rgba(245,158,11,0.8)]",
    
    // Secondary: Muted Clay/Bronze (Light) / Teal (Dark)
    secondary: "bg-[#8D6E63] dark:bg-teal-600 text-white border border-[#5D4037] dark:border-teal-400 shadow-md hover:bg-[#6D4C41] dark:hover:bg-teal-500 hover:shadow-[0_0_20px_rgba(141,110,99,0.6)] dark:hover:shadow-[0_0_25px_rgba(20,184,166,0.7)]",
    
    // Outline: Ink Borders (Light) / Gold Borders (Dark)
    // Dark Mode Change: Brighter text (amber-400)
    outline: "bg-transparent text-[#4A3728] dark:text-amber-400 border-2 border-[#4A3728] dark:border-amber-500 hover:bg-[#D7Cea7] dark:hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(74,55,40,0.4)] dark:hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]",
    
    // Ghost: Subtle
    ghost: "bg-transparent text-[#4A3728] dark:text-amber-400 hover:bg-[#D7Cea7] dark:hover:bg-slate-800 hover:text-[#2C1810] dark:hover:text-amber-300 hover:drop-shadow-[0_0_8px_rgba(74,55,40,0.5)] dark:hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && icon && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};