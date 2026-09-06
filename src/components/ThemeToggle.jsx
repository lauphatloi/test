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
      className={`fixed bottom-5 left-5 z-[90] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer select-none shadow-2xl hover:scale-110 active:scale-95 border ${
        isDark 
          ? 'bg-[#0f131a]/95 hover:bg-[#18202d] border-white/25 text-sky-400 hover:text-sky-300 shadow-black/70 backdrop-blur-xl' 
          : 'bg-white/95 hover:bg-white border-slate-300 text-amber-500 hover:text-amber-600 shadow-slate-900/20 backdrop-blur-xl'
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
