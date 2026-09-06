import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audio';

export default function ThemeToggle({ compact = false, className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => soundFx.playHover()}
      title={isDark ? "Chuyển sang Chế độ Ban ngày (Phong cách Honda Việt Nam)" : "Chuyển sang Chế độ Ban đêm (Showroom Huyền Bí)"}
      aria-label="Chuyển chế độ ngày/đêm"
      className={`group relative flex items-center justify-between rounded-full transition-all duration-300 cursor-pointer select-none ${
        compact 
          ? 'p-2 border' 
          : 'px-3 py-1.5 border gap-2'
      } ${
        isDark 
          ? 'bg-white/[0.05] border-white/15 text-neutral-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08]' 
          : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400 hover:bg-white shadow-sm'
      } ${className}`}
    >
      <div className="flex items-center gap-1.5">
        {isDark ? (
          <Moon size={compact ? 16 : 14} className="text-sky-400 transition-transform group-hover:-rotate-12 duration-300" />
        ) : (
          <Sun size={compact ? 16 : 14} className="text-amber-500 transition-transform group-hover:rotate-45 duration-300" />
        )}

        {!compact && (
          <span className="text-[11px] font-semibold tracking-wider uppercase font-body">
            {isDark ? 'Ban Đêm' : 'Ban Ngày'}
          </span>
        )}
      </div>

      {!compact && (
        <div 
          className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
            isDark ? 'bg-sky-500/20 text-sky-400' : 'bg-amber-500/20 text-amber-600'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        </div>
      )}
    </button>
  );
}
