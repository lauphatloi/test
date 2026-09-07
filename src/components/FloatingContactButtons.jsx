import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export default function FloatingContactButtons() {
  const { isDark } = useTheme();
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    // 1. Initial State: Fully hidden when on BannerSection
    gsap.set(itemRefs.current, {
      scale: 0,
      opacity: 0,
      pointerEvents: 'none',
      transformOrigin: 'center center',
    });

    // 2. ScrollTrigger: Khi cuộn tới phần các phiên bản (#colors) mới cho hiện búng ra
    const st = ScrollTrigger.create({
      trigger: '#colors',
      start: 'top 85%',
      onEnter: () => {
        gsap.to(itemRefs.current, {
          scale: 1,
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.55,
          ease: 'back.out(2.6)', // Hiệu ứng nảy lò xo búng ra cực bắt mắt
          stagger: {
            each: 0.09,
            from: 'end', // Nút Hotline nảy trước từ dưới lên, rồi Zalo, rồi Map
          },
        });
      },
      onLeaveBack: () => {
        gsap.to(itemRefs.current, {
          scale: 0,
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.35,
          ease: 'back.in(1.8)',
          stagger: 0.06,
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  // Chỉ 2 tông màu: Xám đen carbon & Đỏ Honda thể thao, tối giản không chữ phụ
  const CONTACT_ACTIONS = [
    {
      id: 'map',
      title: 'Chỉ Đường HEAD OSC',
      href: 'https://www.google.com/maps/search/?api=1&query=182+Hoàng+Văn+Thụ+Phường+9+Phú+Nhuận+Thành+phố+Hồ+Chí+Minh',
      target: '_blank',
      bgColor: 'bg-[#15171e] hover:bg-[#1f232e]',
      borderColor: 'border-zinc-700/80 hover:border-red-500/80',
      ringColor: 'border-red-500/30 bg-red-500/10',
      shadowColor: 'shadow-black/70',
      icon: (
        <MapPin 
          size={20} 
          className="text-red-500 transition-transform duration-300 group-hover:scale-115 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" 
        />
      ),
    },
    {
      id: 'zalo',
      title: 'Chat Zalo Tư Vấn',
      href: 'https://zalo.me/0329701818',
      target: '_blank',
      bgColor: 'bg-[#15171e] hover:bg-[#1f232e]',
      borderColor: 'border-zinc-700/80 hover:border-red-500/80',
      ringColor: 'border-white/20 bg-white/5 group-hover:border-red-500/30',
      shadowColor: 'shadow-black/70',
      icon: (
        <span className="font-black tracking-tight text-white group-hover:text-red-400 transition-colors text-[13px] select-none drop-shadow-sm">
          Zalo
        </span>
      ),
    },
    {
      id: 'hotline',
      title: 'Hotline: 0329 701 818',
      href: 'tel:0329701818',
      target: '_self',
      bgColor: 'bg-gradient-to-tr from-red-700 via-red-600 to-rose-600 hover:from-red-600 hover:to-rose-500',
      borderColor: 'border-red-400/50 hover:border-red-300',
      ringColor: 'border-red-500/70 bg-red-600/25',
      shadowColor: 'shadow-[0_0_24px_rgba(220,38,38,0.6)]',
      icon: (
        <Phone 
          size={20} 
          className="text-white drop-shadow-md animate-phone-ring" 
        />
      ),
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
            ref={(el) => (itemRefs.current[idx] = el)}
            className="relative flex items-center justify-end pointer-events-auto group"
            onMouseEnter={() => {
              setHoveredIdx(idx);
              soundFx.playHover();
            }}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Minimalist Desktop Hover Tooltip (Ẩn mặc định, chỉ hiện khi rê chuột) */}
            <div 
              className={`hidden sm:flex items-center gap-2 mr-3 px-3 py-1.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-2xl ${
                isDark 
                  ? 'bg-black/90 border-white/20 text-white' 
                  : 'bg-slate-950/90 border-slate-700 text-white'
              } ${
                isHovered 
                  ? 'opacity-100 translate-x-0 scale-100' 
                  : 'opacity-0 translate-x-3 scale-95 pointer-events-none'
              }`}
            >
              <span className="text-xs font-bold font-display tracking-wide whitespace-nowrap">
                {item.title}
              </span>
              <ArrowUpRight size={13} className="text-red-500 shrink-0" />
            </div>

            {/* Action Button Core (Chỉ icon, phong cách xám đen & đỏ thể thao cực ngầu) */}
            <a
              href={item.href}
              target={item.target}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              onClick={() => soundFx.playClick()}
              aria-label={item.title}
              className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95 border ${item.bgColor} ${item.borderColor} ${item.shadowColor}`}
            >
              {/* Radar Ripple Waves gây chú ý ngầu kiểu motor */}
              <div 
                className={`absolute inset-0 rounded-full border animate-radar-ripple pointer-events-none ${item.ringColor}`} 
              />
              {item.id === 'hotline' && (
                <div 
                  className={`absolute inset-0 rounded-full border animate-radar-ripple-delayed pointer-events-none ${item.ringColor}`} 
                />
              )}

              {/* Pure Icon */}
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
