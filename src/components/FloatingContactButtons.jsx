import React, { useState } from 'react';
import { Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

export default function FloatingContactButtons() {
  const { isDark } = useTheme();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const CONTACT_ACTIONS = [
    {
      id: 'map',
      title: 'Chỉ Đường Đến HEAD OSC',
      shortTitle: 'Bản Đồ',
      subtitle: '182 Hoàng Văn Thụ, Phú Nhuận',
      href: 'https://www.google.com/maps/search/?api=1&query=182+Hoàng+Văn+Thụ+Phường+9+Phú+Nhuận+Thành+phố+Hồ+Chí+Minh',
      target: '_blank',
      bgColor: 'bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500',
      ringColor: 'border-emerald-500/60 bg-emerald-500/20',
      shadowColor: 'shadow-emerald-900/40',
      icon: <MapPin size={22} className="text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />,
      badge: 'HEAD OSC',
      badgeColor: 'bg-emerald-500 text-white',
    },
    {
      id: 'zalo',
      title: 'Chat Zalo Tư Vấn 24/7',
      shortTitle: 'Chat Zalo',
      subtitle: 'Tư vấn giá lăn bánh & ưu đãi',
      href: 'https://zalo.me/0329701818',
      target: '_blank',
      bgColor: 'bg-[#0068ff] hover:bg-[#0058de]',
      ringColor: 'border-sky-400/60 bg-sky-500/20',
      shadowColor: 'shadow-blue-900/40',
      icon: (
        <div className="relative flex items-center justify-center font-black tracking-tighter text-white font-sans text-[13px] select-none transition-transform duration-300 group-hover:scale-110">
          <span className="font-extrabold tracking-tight">Zalo</span>
        </div>
      ),
      badge: 'Online',
      badgeColor: 'bg-emerald-500 text-white animate-pulse',
    },
    {
      id: 'hotline',
      title: 'Hotline: 0329 701 818',
      shortTitle: '0329 701 818',
      subtitle: 'Báo giá trực tiếp & lái thử',
      href: 'tel:0329701818',
      target: '_self',
      bgColor: 'bg-gradient-to-tr from-red-700 via-red-600 to-rose-500',
      ringColor: 'border-red-500/70 bg-red-600/25',
      shadowColor: 'shadow-red-900/50',
      icon: <Phone size={22} className="text-white drop-shadow-sm animate-phone-ring" />,
      badge: 'HOTLINE',
      badgeColor: 'bg-amber-400 text-slate-950 font-black tracking-wider',
    },
  ];

  return (
    <aside 
      aria-label="Liên hệ nhanh với Honda HEAD OSC"
      className="fixed bottom-5 right-3.5 sm:right-6 z-[85] flex flex-col items-end gap-3 sm:gap-3.5 select-none pointer-events-none"
    >
      {CONTACT_ACTIONS.map((item, idx) => {
        const isHovered = hoveredIdx === idx;
        return (
          <div 
            key={item.id} 
            className="relative flex items-center justify-end pointer-events-auto group"
            onMouseEnter={() => {
              setHoveredIdx(idx);
              soundFx.playHover();
            }}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Slide-out Expandable Glass Pill Label (Desktop & Tablet) */}
            <div 
              className={`hidden sm:flex items-center gap-2 mr-3 px-3.5 py-1.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-xl ${
                isDark 
                  ? 'bg-black/85 border-white/20 text-white' 
                  : 'bg-white/95 border-slate-300/90 text-slate-900'
              } ${
                isHovered 
                  ? 'opacity-100 translate-x-0 scale-100' 
                  : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold font-display tracking-tight whitespace-nowrap">
                  {item.title}
                </span>
                <span className={`text-[10px] font-body font-medium whitespace-nowrap ${
                  isDark ? 'text-neutral-400' : 'text-slate-500'
                }`}>
                  {item.subtitle}
                </span>
              </div>
              <ArrowUpRight size={13} className="text-red-500 shrink-0" />
            </div>

            {/* Floating Action Button Core */}
            <a
              href={item.href}
              target={item.target}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              onClick={() => soundFx.playClick()}
              aria-label={item.title}
              className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95 ${item.bgColor} ${item.shadowColor} border border-white/25`}
            >
              {/* Eye-catching Concentric Radar Ripple Aura Waves */}
              <div 
                className={`absolute inset-0 rounded-full border animate-radar-ripple pointer-events-none ${item.ringColor}`} 
              />
              {item.id === 'hotline' && (
                <div 
                  className={`absolute inset-0 rounded-full border animate-radar-ripple-delayed pointer-events-none ${item.ringColor}`} 
                />
              )}

              {/* Status / Feature Micro Badge */}
              <span className={`absolute -top-1 -right-1 text-[7.5px] sm:text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full shadow-md z-10 font-mono border border-white/30 ${item.badgeColor}`}>
                {item.badge}
              </span>

              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center">
                {item.icon}
              </div>
            </a>
          </div>
        );
      })}
    </aside>
  );
}
