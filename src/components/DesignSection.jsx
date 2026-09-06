import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { Sparkles, Eye, Compass, Shield, ChevronRight, Layers } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const DESIGN_CARDS = [
  {
    id: 'overview',
    number: '01',
    category: 'Ngôn Ngữ Thiết Kế',
    title: 'Kiệt Tác Điêu Khắc Đậm Phong Vị Nước Ý',
    subtitle: 'Tỉ Lệ Vàng Công Thái Học Chuẩn Châu Âu',
    description: 'Honda SH350i sở hữu diện mạo đồ sộ nhưng thanh thoát phi thường. Các mảng khối dập nổi vuốt dọc thân xe theo nguyên lý khí động học, tạo thế đứng bệ vệ, tự tin khẳng định vị thế thủ lĩnh trên mọi cung đường.',
    highlight: 'Kích thước chuẩn mực: 2.160 x 743 x 1.162 mm mang lại tư thế lái thẳng lưng vương giả.',
    image: './images/thiet-ke-tong-quan.png',
    isPng: true,
  },
  {
    id: 'headlight',
    number: '02',
    category: 'Mặt Nạ Trước & Chiếu Sáng',
    title: 'Cụm Đèn Trước LED Hiện Đại & Mặt Nạ Chrome',
    subtitle: 'Nhận Diện Thương Hiệu Độc Bản Từ Xa',
    description: 'Chi tiết kim loại mạ chrome sáng bóng kết hợp cấu trúc tạo khối chữ S uyển chuyển. Đèn xi-nhan và dải LED định vị ban ngày bố trí tách biệt, tạo nên ánh nhìn sắc sảo, quyền lực và không thể nhầm lẫn.',
    highlight: 'Hệ thống đèn LED chiếu sáng liên tục công suất cao, tối ưu tầm nhìn trong mọi thời tiết.',
    image: './images/thiet-ke-dau.jpg',
    isPng: false,
  },
  {
    id: 'cockpit',
    number: '03',
    category: 'Khoang Lái Thông Minh',
    title: 'Mặt Đồng Hồ Đôi LCD Kỹ Thuật Số Đa Tầng',
    subtitle: 'Bản Giao Hưởng Công Nghệ Điện Tử',
    description: 'Cụm màn hình LCD hiển thị tinh thể lỏng hiển thị đầy đủ thông số hành trình: tốc độ, thời gian, điện áp ắc quy, mức tiêu thụ nhiên liệu và đèn cảnh báo hệ thống kiểm soát lực kéo HSTC tân tiến.',
    highlight: 'Hỗ trợ kết nối thông minh với điện thoại thông minh qua ứng dụng My Honda+.',
    image: './images/thiet-ke-mat-dong-ho.jpg',
    isPng: false,
  },
  {
    id: 'taillight',
    number: '04',
    category: 'Đuôi Xe & Đèn Hậu 3D',
    title: 'Đèn Hậu LED 3D Tinh Tế & Tay Dắt Cao Cấp',
    subtitle: 'Dấu Ấn Đẳng Cấp Trong Từng Góc Nhìn',
    description: 'Phần đuôi xe được vuốt nhọn gọn gàng phong cách Grand Touring. Cụm đèn hậu 2 tầng viền chrome phân cách tinh tế cùng tay dắt nhôm đúc nguyên khối tôn thêm nét cơ bắp và sự vững chãi.',
    highlight: 'Thiết kế đèn tín hiệu dừng khẩn cấp (ESS) tự động chớp nháy cảnh báo xe phía sau.',
    image: './images/thiet-ke-duoi.jpg',
    isPng: false,
  },
];

export default function DesignSection() {
  const sectionRef = useRef(null);
  const visualContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeStep, setActiveStep] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section to create fluid, graceful scrolling narrative
      const totalSteps = DESIGN_CARDS.length;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalSteps * 100}%`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const step = Math.min(
              Math.floor(self.progress * totalSteps),
              totalSteps - 1
            );
            setActiveStep(step);
          }
        }
      });

      // Animate cards transitions gracefully
      cardsRef.current.forEach((card, index) => {
        if (index > 0) {
          gsap.set(card, { opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' });
        } else {
          gsap.set(card, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' });
        }
      });

      // Chain step animations
      for (let i = 0; i < totalSteps - 1; i++) {
        const time = i * 1.5;
        // Fade out current
        tl.to(cardsRef.current[i], {
          opacity: 0,
          scale: 1.08,
          y: -40,
          filter: 'blur(12px)',
          ease: 'power2.inOut',
          duration: 1
        }, time + 0.5);

        // Fade in next
        tl.to(cardsRef.current[i + 1], {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          duration: 1
        }, time + 0.8);
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const selectStep = (index) => {
    soundFx.playClick();
    const st = ScrollTrigger.getAll().find(t => t.trigger === sectionRef.current);
    if (st) {
      const stepFraction = index / (DESIGN_CARDS.length - 0.5);
      const targetScroll = st.start + (st.end - st.start) * stepFraction;
      gsap.to(window, {
        duration: 1.2,
        scrollTo: targetScroll,
        ease: 'power3.inOut'
      });
    }
  };

  const current = DESIGN_CARDS[activeStep];

  return (
    <section 
      id="design" 
      ref={sectionRef} 
      className={`relative w-full h-screen overflow-hidden select-none transition-colors duration-500 ${
        isDark ? 'bg-[#07090e]' : 'bg-[#f8fafc]'
      }`}
    >
      {/* Background ambient lighting - Soft executive tones */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[140px] ${
          isDark ? 'bg-slate-700/10' : 'bg-red-500/5'
        }`} />
        <div className={`absolute bottom-1/4 -right-48 w-96 h-96 rounded-full blur-[140px] ${
          isDark ? 'bg-slate-600/10' : 'bg-slate-300/30'
        }`} />
        <div className={`absolute inset-0 bg-tech-grid ${isDark ? 'opacity-10' : 'opacity-[0.03]'}`} />
      </div>

      {/* Floating Section Header Tag */}
      <div className="absolute top-8 sm:top-12 left-6 sm:left-12 lg:left-16 z-30 flex items-center gap-3">
        <span className="w-6 h-[2px] bg-red-600" />
        <span className={`text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase font-body ${
          isDark ? 'text-neutral-400' : 'text-slate-800'
        }`}>
          NGÔN NGỮ THIẾT KẾ CHÂU ÂU • KHÍ CHẤT THỦ LĨNH
        </span>
      </div>

      {/* Main Layout: Asymmetric 2-Column Scrollytelling Stage */}
      <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between z-20 pt-20 pb-12">
        
        {/* Left Visual Stage */}
        <div 
          ref={visualContainerRef}
          className="relative w-full lg:w-[54%] h-[46vh] sm:h-[54vh] lg:h-[72vh] flex items-center justify-center"
        >
          {/* Decorative Framing Ring */}
          <div className={`absolute inset-0 border rounded-3xl pointer-events-none -m-2 sm:-m-4 transition-colors ${
            isDark ? 'border-white/[0.07]' : 'border-slate-300'
          }`} />

          {/* Cards Stack */}
          {DESIGN_CARDS.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex items-center justify-center p-3 sm:p-6 transition-all duration-300 ${
                isDark 
                  ? 'glass-panel border border-white/[0.08] shadow-2xl' 
                  : 'bg-white border border-slate-300 shadow-xl shadow-slate-300/40'
              }`}
            >
              {card.isPng ? (
                // Transparent PNG Showcase
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className={`absolute w-[80%] h-12 bottom-6 rounded-full blur-3xl ${
                    isDark ? 'bg-slate-500/10' : 'bg-slate-300/30'
                  }`} />
                  <img
                    src={card.image}
                    alt={card.title}
                    className={`max-w-full max-h-full object-contain filter animate-float-subtle ${
                      isDark ? 'drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]' : 'drop-shadow-[0_16px_25px_rgba(15,23,42,0.25)]'
                    }`}
                  />
                </div>
              ) : (
                // High-res Detailed Photography
                <div className="relative w-full h-full rounded-xl overflow-hidden group">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                    <span className="font-mono text-[10px] text-neutral-300 bg-black/60 px-3 py-1 rounded border border-white/[0.1] backdrop-blur-md">
                      HONDA DESIGN • {card.category.toUpperCase()}
                    </span>
                    <span className="text-white/90 font-medium text-xs flex items-center gap-1 font-body">
                      SH350i
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Fluid Narrative Text Column */}
        <div className="w-full lg:w-[42%] flex flex-col justify-center mt-6 lg:mt-0 pl-0 lg:pl-8">
          {/* Active Step Indicator Dots */}
          <div className="flex items-center gap-2 mb-4">
            {DESIGN_CARDS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => selectStep(idx)}
                onMouseEnter={() => soundFx.playHover()}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeStep === idx 
                    ? (isDark ? 'w-8 bg-white' : 'w-8 bg-red-600') 
                    : (isDark ? 'w-2 bg-white/20 hover:bg-white/40' : 'w-2 bg-slate-300 hover:bg-slate-400')
                }`}
                title={`Xem ${item.category}`}
              />
            ))}
            <span className={`ml-3 font-mono text-xs font-bold ${isDark ? 'text-neutral-400' : 'text-slate-800'}`}>
              0{activeStep + 1} / 0{DESIGN_CARDS.length}
            </span>
          </div>

          {/* Badge & Category */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase font-body border ${
              isDark 
                ? 'bg-white/[0.06] border-white/[0.08] text-neutral-200' 
                : 'bg-slate-200 border-slate-300 text-slate-950'
            }`}>
              {current.category}
            </span>
            <span className={`text-xs font-bold font-body ${isDark ? 'text-neutral-400' : 'text-slate-800'}`}>
              {current.subtitle}
            </span>
          </div>

          {/* Main Headline */}
          <h3 className={`font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight transition-all duration-300 ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {current.title}
          </h3>

          {/* Description */}
          <p className={`mt-4 text-xs sm:text-sm leading-relaxed font-body ${
            isDark ? 'text-neutral-300' : 'text-slate-800 font-semibold'
          }`}>
            {current.description}
          </p>

          {/* Key Engineering Highlight Box */}
          <div className={`mt-6 p-4 rounded-xl backdrop-blur-md flex items-start gap-3.5 border transition-colors ${
            isDark 
              ? 'bg-white/[0.03] border-white/[0.08]' 
              : 'bg-slate-100 border-slate-300 shadow-sm'
          }`}>
            <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
              isDark ? 'bg-white/[0.05] text-white' : 'bg-red-50 text-red-600'
            }`}>
              <Compass size={16} />
            </div>
            <div>
              <span className={`block text-[10px] uppercase tracking-wider font-bold font-body ${
                isDark ? 'text-neutral-400' : 'text-slate-800'
              }`}>
                Chi Tiết Hoàn Thiện
              </span>
              <p className={`text-xs sm:text-sm mt-1 font-bold leading-normal font-body ${
                isDark ? 'text-neutral-200' : 'text-slate-950'
              }`}>
                {current.highlight}
              </p>
            </div>
          </div>

          {/* Quick Step Switcher Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {DESIGN_CARDS.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => selectStep(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer font-body ${
                  activeStep === idx
                    ? (isDark ? 'bg-white/15 text-white font-semibold border border-white/20 shadow-sm' : 'bg-slate-900 text-white font-semibold border border-slate-900 shadow-sm')
                    : (isDark ? 'bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-transparent' : 'bg-slate-200 text-slate-800 hover:text-slate-950 hover:bg-slate-300 border border-transparent')
                }`}
              >
                {card.number}. {card.category.split('&')[0]}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
