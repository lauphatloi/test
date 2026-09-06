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
      className={`fixed bottom-5 left-5 z-[90] p-2.5 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer select-none hover:scale-110 active:scale-90 group backdrop-blur-md shadow-md ${
        isDark 
          ? 'bg-black/60 hover:bg-black/80 text-sky-400 hover:text-sky-200 border border-white/15 shadow-black/50' 
          : 'bg-white/85 hover:bg-white text-slate-900 hover:text-amber-600 border border-slate-300/80 shadow-slate-900/15'
      } ${className}`}
    >
      {isDark ? (
        <Moon size={22} className="transition-transform duration-300 group-hover:-rotate-12" />
      ) : (
        <Sun size={22} className="transition-transform duration-300 group-hover:rotate-45" />
      )}
    </button>
  );
}
