import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { ChevronRight, Gauge, Zap, ShieldCheck, Sparkles, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VARIANTS = [
  {
    id: 'grey',
    name: 'Xám Đương Đại',
    subname: 'Phiên Bản Thể Thao Cao Cấp',
    image: './images/motorcycle-grey.png',
    accentColor: '#94a3b8',
    glowColor: 'rgba(148, 163, 184, 0.2)',
    tag: 'Phong cách đô thị hiện đại',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Sắc xám đương đại tinh tế, kết hợp hài hòa cùng các chi tiết hoàn thiện tỉ mỉ mang lại diện mạo đĩnh đạc và phong thái đĩnh đạc của người dẫn đầu.'
  },
  {
    id: 'dark-grey',
    name: 'Đen Nhám Doanh Nhân',
    subname: 'Phiên Bản Đặc Biệt',
    image: './images/motorcycle-dark-grey.png',
    accentColor: '#c5a880',
    glowColor: 'rgba(197, 168, 128, 0.2)',
    tag: 'Đẳng cấp doanh nhân thành đạt',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Lớp sơn mờ Matte Black quý phái, điểm xuyết logo SH mạ đồng ánh kim thể hiện uy quyền kín đáo và sự tinh tế trong từng đường nét.'
  },
  {
    id: 'white',
    name: 'Trắng Ngọc Trai Thanh Lịch',
    subname: 'Phiên Bản Cao Cấp',
    image: './images/motorcycle-white.png',
    accentColor: '#cbd5e1',
    glowColor: 'rgba(203, 213, 225, 0.25)',
    tag: 'Vẻ đẹp thanh lịch vượt thời gian',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Ánh sơn trắng ngọc trai đa lớp phát sáng dịu nhẹ dưới ánh mặt trời, tôn vinh phong thái lịch lãm chuẩn mực theo phong cách Ý.'
  },
  {
    id: 'green',
    name: 'Xanh Lục Bảo Tinh Hoa',
    subname: 'Phiên Bản Giới Hạn',
    image: './images/motorcycle-green.png',
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.2)',
    tag: 'Độc bản quý phái',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Màu xanh lục bảo sâu thẳm hòa quyện cùng công nghệ sơn phủ tiên tiến từ Honda, tạo nên kiệt tác thẩm mỹ độc bản đầy kiêu hãnh.'
  }
];

export default function HeroSection({ onOpenTestRide }) {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const bikeRefs = useRef([]);
  const textGroupRef = useRef(null);
  const [activeVariant, setActiveVariant] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main ScrollTrigger pinned timeline
      const totalScroll = 320; // percent of viewport
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScroll}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Determine active variant based on scroll progress
            const p = self.progress;
            let index = 0;
            if (p < 0.28) index = 0;
            else if (p < 0.55) index = 1;
            else if (p < 0.82) index = 2;
            else index = 3;
            
            setActiveVariant(index);
          }
        }
      });

      // Background Zoom Effect: continuous zoom-in creating immense spatial depth
      tl.to(bgRef.current, {
        scale: 1.48,
        y: '6%',
        ease: 'none',
        duration: 3
      }, 0);

      // Transitions between 4 motorcycle color variants
      // Variant 0 is visible initially
      gsap.set(bikeRefs.current[0], { opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' });
      gsap.set(bikeRefs.current.slice(1), { opacity: 0, scale: 0.85, x: 120, filter: 'blur(10px)' });

      // Transition 0 -> 1
      tl.to(bikeRefs.current[0], {
        opacity: 0,
        scale: 1.15,
        x: -120,
        filter: 'blur(12px)',
        duration: 0.8,
        ease: 'power2.inOut'
      }, 0.8);
      tl.to(bikeRefs.current[1], {
        opacity: 1,
        scale: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out'
      }, 0.9);

      // Transition 1 -> 2
      tl.to(bikeRefs.current[1], {
        opacity: 0,
        scale: 1.15,
        x: -120,
        filter: 'blur(12px)',
        duration: 0.8,
        ease: 'power2.inOut'
      }, 1.7);
      tl.to(bikeRefs.current[2], {
        opacity: 1,
        scale: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out'
      }, 1.8);

      // Transition 2 -> 3
      tl.to(bikeRefs.current[2], {
        opacity: 0,
        scale: 1.15,
        x: -120,
        filter: 'blur(12px)',
        duration: 0.8,
        ease: 'power2.inOut'
      }, 2.5);
      tl.to(bikeRefs.current[3], {
        opacity: 1,
        scale: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out'
      }, 2.6);

      // Ambient light ray flash between shifts
      tl.fromTo('.lens-flash', 
        { opacity: 0, scaleX: 0.2 }, 
        { opacity: 0.7, scaleX: 1.8, yoyo: true, repeat: 2, duration: 0.4, ease: 'power1.inOut' }, 
        0.8
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse tilt micro-interaction
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const jumpToVariant = (index) => {
    soundFx.playClick();
    if (!containerRef.current) return;
    const st = ScrollTrigger.getById(containerRef.current);
    // Calculate target scroll position
    const targets = [0.1, 0.4, 0.68, 0.95];
    const trigger = ScrollTrigger.getAll().find(t => t.trigger === containerRef.current);
    if (trigger) {
      const targetScroll = trigger.start + (trigger.end - trigger.start) * targets[index];
      gsap.to(window, {
        duration: 1.2,
        scrollTo: targetScroll,
        ease: 'power3.inOut'
      });
    }
  };

  const currentData = VARIANTS[activeVariant];

  return (
    <section 
      id="colors" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-black select-none"
    >
      {/* Background Image with Depth Zoom Effect */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full will-change-transform scale-105 pointer-events-none"
        style={{
          backgroundImage: `url('./images/banner-bg.jpg')`,
          backgroundPosition: 'center 45%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark radial depth overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        
        {/* Tech Grid Floor Glow */}
        <div 
          className="absolute inset-0 bg-tech-grid opacity-20"
          style={{
            transform: `perspective(1000px) rotateX(60deg) translateY(${mousePos.y * 30}px) scale(1.5)`,
            transformOrigin: 'bottom center',
          }}
        />
      </div>

      {/* Dynamic Light Sweep Bar */}
      <div 
        className="lens-flash absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-0 blur-xl will-change-transform" 
      />

      {/* Architectural Typography - Clean Modern Horizon */}
      <div className="absolute top-24 sm:top-28 left-0 right-0 z-10 flex flex-col items-center pointer-events-none text-center px-4">
        <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase font-semibold text-neutral-400 mb-1">
          Biểu Tượng Sang Trọng & Đẳng Cấp Đô Thị
        </span>
        <h1 
          className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white/[0.07] leading-none uppercase select-none transition-transform duration-300"
          style={{
            transform: `translateX(${mousePos.x * -18}px) translateY(${mousePos.y * -10}px)`,
          }}
        >
          HONDA SH350i
        </h1>
      </div>

      {/* Main Motorcycle Display Stage with 3D Depth Float */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div 
          className="relative w-[90vw] max-w-[920px] h-[55vh] sm:h-[65vh] flex items-center justify-center"
          style={{
            transform: `perspective(1200px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 6}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          {/* Subtle Ground Contact Shadow */}
          <div 
            className="absolute bottom-6 sm:bottom-10 w-[70%] h-10 rounded-full blur-2xl transition-all duration-700 opacity-60"
            style={{
              backgroundColor: currentData.glowColor,
            }}
          />
          <div className="absolute bottom-8 w-[60%] h-5 bg-black/90 rounded-full blur-md" />

          {/* 4 Motorcycle Variants */}
          {VARIANTS.map((variant, idx) => (
            <img
              key={variant.id}
              ref={(el) => (bikeRefs.current[idx] = el)}
              src={variant.image}
              alt={`Honda SH350i ${variant.name}`}
              className="absolute max-w-full max-h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] will-change-transform select-none"
            />
          ))}
        </div>
      </div>

      {/* Top Left Floating Edition Badge - Professional Modern Card */}
      <div 
        ref={textGroupRef}
        className="absolute top-24 sm:top-32 left-4 sm:left-10 lg:left-16 z-30 max-w-md pointer-events-auto"
      >
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/[0.09] backdrop-blur-xl shadow-xl animate-in fade-in duration-500">
          <div className="flex items-center gap-2 mb-2">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentData.accentColor }}
            />
            <span 
              className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded bg-white/[0.06] text-neutral-200 border border-white/[0.06]"
            >
              {currentData.subname}
            </span>
            <span className="text-[11px] text-neutral-400 font-body">| {currentData.tag}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
            {currentData.name}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed font-body line-clamp-2 sm:line-clamp-3">
            {currentData.desc}
          </p>

          {/* Mini Specs Pill Bar - Clean Precision Engineering */}
          <div className="mt-4 pt-4 border-t border-white/[0.08] grid grid-cols-3 gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-body">
                <Gauge size={11} className="text-neutral-400" /> Dung tích
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white font-display mt-0.5">
                {currentData.specs.speed}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-body">
                <Zap size={11} className="text-neutral-400" /> Công suất
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white font-display mt-0.5">
                {currentData.specs.power}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-body">
                <ShieldCheck size={11} className="text-neutral-400" /> Mô-men xoắn
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white font-display mt-0.5">
                {currentData.specs.torque}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Color Variant Selector & Scrollytelling Progress */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 flex flex-col items-center gap-3 px-4 pointer-events-auto">
        {/* Floating Color Swatches Dock - Professional Luxury Automotive Style */}
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full glass-panel border border-white/[0.09] backdrop-blur-2xl shadow-xl">
          {VARIANTS.map((v, i) => {
            const isActive = activeVariant === i;
            return (
              <button
                key={v.id}
                onClick={() => jumpToVariant(i)}
                onMouseEnter={() => soundFx.playHover()}
                className={`group relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-white/10 shadow-sm border border-white/15' 
                    : 'hover:bg-white/[0.04] opacity-70 hover:opacity-100'
                }`}
              >
                {/* Color Dot */}
                <span 
                  className="block w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-white/20 shadow-inner"
                  style={{ backgroundColor: v.accentColor }}
                />

                <span className={`text-[11px] sm:text-xs font-medium tracking-wide font-body transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                }`}>
                  {v.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll down indicator - Subdued elegance */}
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-widest uppercase font-medium text-neutral-400 font-body">
          <ArrowDown size={11} className="text-neutral-400" />
          <span>Cuộn trang để khám phá chi tiết</span>
          <ArrowDown size={11} className="text-neutral-400" />
        </div>
      </div>
    </section>
  );
}
