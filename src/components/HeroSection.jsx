import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { ChevronRight, Gauge, Zap, ShieldCheck, Sparkles, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VARIANTS = [
  {
    id: 'grey',
    name: 'Xám Xi Măng Thể Thao',
    subname: 'Sport Edition',
    image: './images/motorcycle-grey.png',
    accentColor: '#94a3b8',
    glowColor: 'rgba(148, 163, 184, 0.35)',
    tag: 'Phiên bản bán chạy nhất',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Sắc xám xi măng biểu tượng phong cách thể thao đương đại, kết hợp ngẫu hứng cùng tem đỏ nổi bật và kẹp phanh thể thao.'
  },
  {
    id: 'dark-grey',
    name: 'Đen Nhám Quyền Lực',
    subname: 'Special Edition',
    image: './images/motorcycle-dark-grey.png',
    accentColor: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.35)',
    tag: 'Phong cách doanh nhân',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Lớp sơn mờ Matte Black huyền bí, điểm xuyết chi tiết logo mạ vàng đồng tôn vinh quyền uy và đẳng cấp thượng lưu.'
  },
  {
    id: 'white',
    name: 'Trắng Ngọc Trai Quý Phái',
    subname: 'Premium Edition',
    image: './images/motorcycle-white.png',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    tag: 'Thanh lịch châu Âu',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Ánh trắng ngọc trai đa tầng phản chiếu ánh sáng lấp lánh như du thuyền sang trọng bên bờ vịnh Địa Trung Hải.'
  },
  {
    id: 'green',
    name: 'Xanh Lục Bảo Tinh Hoa',
    subname: 'Exclusive Edition',
    image: './images/motorcycle-green.png',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    tag: 'Độc bản giới hạn',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Sắc xanh lục bảo thẫm chiều sâu kết hợp các đường dập nổi cơ bắp, toát lên phong thái kiệt tác quý phái độc bản.'
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

      {/* Giant Architectural Watermark Typography */}
      <div className="absolute top-24 sm:top-28 left-0 right-0 z-10 flex flex-col items-center pointer-events-none text-center px-4">
        <span className="text-[11px] sm:text-xs tracking-[0.4em] uppercase font-bold text-red-500 mb-1 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]">
          The Apex of Luxury Scooter
        </span>
        <h1 
          className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tighter text-white/[0.08] leading-none uppercase select-none transition-transform duration-300"
          style={{
            transform: `translateX(${mousePos.x * -25}px) translateY(${mousePos.y * -15}px)`,
          }}
        >
          SH350i
        </h1>
      </div>

      {/* Main Motorcycle Display Stage with 3D Depth Float */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div 
          className="relative w-[92vw] max-w-[960px] h-[55vh] sm:h-[65vh] flex items-center justify-center"
          style={{
            transform: `perspective(1200px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 8}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Ground Contact Shadow & Neon Halo */}
          <div 
            className="absolute bottom-6 sm:bottom-10 w-[70%] h-12 rounded-full blur-2xl transition-all duration-700"
            style={{
              backgroundColor: currentData.glowColor,
              boxShadow: `0 25px 60px ${currentData.glowColor}`,
            }}
          />
          <div className="absolute bottom-8 w-[60%] h-6 bg-black/90 rounded-full blur-md" />

          {/* 4 Motorcycle Variants (Preloaded and Transitioned by GSAP) */}
          {VARIANTS.map((variant, idx) => (
            <img
              key={variant.id}
              ref={(el) => (bikeRefs.current[idx] = el)}
              src={variant.image}
              alt={`Honda SH350i ${variant.name}`}
              className="absolute max-w-full max-h-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] will-change-transform select-none"
            />
          ))}
        </div>
      </div>

      {/* Top Left Floating Edition Badge */}
      <div 
        ref={textGroupRef}
        className="absolute top-28 sm:top-36 left-4 sm:left-10 lg:left-16 z-30 max-w-md pointer-events-auto"
      >
        <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/15 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="flex items-center gap-2 mb-2">
            <span 
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: currentData.accentColor }}
            />
            <span 
              className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white/10"
              style={{ color: currentData.accentColor }}
            >
              {currentData.subname}
            </span>
            <span className="text-[11px] text-neutral-400">| {currentData.tag}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {currentData.name}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
            {currentData.desc}
          </p>

          {/* Mini Specs Pill Bar */}
          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                <Gauge size={11} className="text-red-400" /> Dung tích
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-display">
                {currentData.specs.speed}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                <Zap size={11} className="text-amber-400" /> Công suất
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-display">
                {currentData.specs.power}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                <ShieldCheck size={11} className="text-cyan-400" /> Mô-men
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-display">
                {currentData.specs.torque}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Color Variant Selector & Scrollytelling Progress */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 flex flex-col items-center gap-3 px-4 pointer-events-auto">
        {/* Floating Color Swatches Dock */}
        <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-full glass-panel border border-white/15 backdrop-blur-2xl shadow-2xl">
          {VARIANTS.map((v, i) => {
            const isActive = activeVariant === i;
            return (
              <button
                key={v.id}
                onClick={() => jumpToVariant(i)}
                onMouseEnter={() => soundFx.playHover()}
                className={`group relative flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-white/15 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'hover:bg-white/5 opacity-75 hover:opacity-100'
                }`}
              >
                {/* Color Dot with Ring */}
                <div className="relative">
                  <span 
                    className="block w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/40 shadow-inner"
                    style={{ backgroundColor: v.accentColor }}
                  />
                  {isActive && (
                    <span 
                      className="absolute -inset-1 rounded-full border-2 border-white animate-pulse"
                      style={{ borderColor: v.accentColor }}
                    />
                  )}
                </div>

                <span className={`text-[11px] sm:text-xs font-semibold tracking-wide transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                }`}>
                  {v.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll down prompt reminder */}
        <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase font-medium text-neutral-400 animate-bounce">
          <ArrowDown size={12} className="text-red-500" />
          <span>Cuộn chuột để trải nghiệm hiệu ứng Scrollytelling đa chiều</span>
          <ArrowDown size={12} className="text-red-500" />
        </div>
      </div>
    </section>
  );
}
