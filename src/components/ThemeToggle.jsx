import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audio';

export default function ThemeToggle({ className = '' }) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={() => {
        soundFx.playClick();
        toggleTheme();
      }}
      onMouseEnter={() => soundFx.playHover()}
      title={isDark ? "Chuyển sang Chế độ Ban ngày" : "Chuyển sang Chế độ Ban đêm"}
      aria-label="Chuyển chế độ ngày/đêm"
      className={`fixed bottom-5 left-5 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer select-none shadow-xl hover:scale-110 active:scale-95 ${
        isDark 
          ? 'bg-[#0f131a]/90 hover:bg-[#18202d] border border-white/20 text-sky-400 hover:text-sky-300 shadow-black/60 backdrop-blur-xl' 
          : 'bg-white/95 hover:bg-white border border-slate-300/90 text-amber-500 hover:text-amber-600 shadow-slate-900/15 backdrop-blur-xl'
      } ${className}`}
    >
      {isDark ? (
        <Moon size={20} className="transition-transform duration-300 group-hover:-rotate-12" />
      ) : (
        <Sun size={20} className="transition-transform duration-300 group-hover:rotate-45" />
      )}
    </button>
  );
}
