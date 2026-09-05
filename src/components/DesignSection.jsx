import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { Sparkles, Eye, Compass, Shield, ChevronRight, Layers } from 'lucide-react';

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
      className="relative w-full h-screen bg-[#07090e] overflow-hidden select-none"
    >
      {/* Background ambient lighting and grain */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-tech-grid opacity-15" />
      </div>

      {/* Floating Section Header Tag */}
      <div className="absolute top-8 sm:top-12 left-6 sm:left-12 lg:left-16 z-30 flex items-center gap-3">
        <span className="w-8 h-[2px] bg-red-600" />
        <span className="text-[11px] sm:text-xs font-bold tracking-[0.3em] uppercase text-neutral-400">
          SELECTION AREA 02 • THIẾT KẾ ĐỈNH CAO
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
          <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none -m-2 sm:-m-4" />
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-red-500 pointer-events-none" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-red-500 pointer-events-none" />

          {/* Cards Stack */}
          {DESIGN_CARDS.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex items-center justify-center p-3 sm:p-6"
            >
              {card.isPng ? (
                // Transparent PNG Showcase
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute w-[80%] h-12 bottom-6 bg-red-600/20 rounded-full blur-3xl" />
                  <img
                    src={card.image}
                    alt={card.title}
                    className="max-w-full max-h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] animate-float-subtle"
                  />
                </div>
              ) : (
                // High-res Detailed Photography
                <div className="relative w-full h-full rounded-xl overflow-hidden group">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                    <span className="font-mono text-[11px] text-white/60 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                      HONDA DESIGN ARCHITECTURE • {card.category.toUpperCase()}
                    </span>
                    <span className="text-red-400 font-bold flex items-center gap-1">
                      <Sparkles size={12} /> SH350i
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
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeStep === idx 
                    ? 'w-10 bg-red-600 shadow-[0_0_10px_rgba(225,29,72,0.8)]' 
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Xem ${item.category}`}
              />
            ))}
            <span className="ml-3 font-mono text-xs text-neutral-400">
              0{activeStep + 1} / 0{DESIGN_CARDS.length}
            </span>
          </div>

          {/* Badge & Category */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold tracking-wider uppercase">
              {current.category}
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              {current.subtitle}
            </span>
          </div>

          {/* Main Headline */}
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight transition-all duration-300">
            {current.title}
          </h3>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-body">
            {current.description}
          </p>

          {/* Key Engineering Highlight Box */}
          <div className="mt-6 p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-red-600/20 text-red-400 shrink-0 mt-0.5">
              <Compass size={18} />
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-widest text-neutral-400 font-bold">
                Điểm Nhấn Độc Quyền
              </span>
              <p className="text-xs sm:text-sm text-neutral-200 mt-1 font-medium leading-normal">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'bg-red-600 text-white font-semibold shadow-md'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
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
