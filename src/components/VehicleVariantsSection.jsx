import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { Gauge, Zap, ShieldCheck, ArrowDown, ChevronRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VARIANTS = [
  {
    id: 'grey',
    number: '01',
    name: 'Xám Đương Đại',
    subname: 'Phiên Bản Thể Thao',
    image: './images/motorcycle-grey.png',
    accentColor: '#94a3b8',
    glowColor: 'rgba(148, 163, 184, 0.25)',
    tag: 'Phong cách đô thị hiện đại',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Sắc xám đương đại tinh tế, kết hợp hài hòa cùng các chi tiết hoàn thiện tỉ mỉ mang lại diện mạo đĩnh đạc và phong thái đĩnh đạc của người dẫn đầu.'
  },
  {
    id: 'dark-grey',
    number: '02',
    name: 'Đen Nhám Doanh Nhân',
    subname: 'Phiên Bản Đặc Biệt',
    image: './images/motorcycle-dark-grey.png',
    accentColor: '#c5a880',
    glowColor: 'rgba(197, 168, 128, 0.25)',
    tag: 'Đẳng cấp doanh nhân thành đạt',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Lớp sơn mờ Matte Black quý phái, điểm xuyết logo SH mạ đồng ánh kim thể hiện uy quyền kín đáo và sự tinh tế trong từng đường nét.'
  },
  {
    id: 'white',
    number: '03',
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
    number: '04',
    name: 'Xanh Lục Bảo Tinh Hoa',
    subname: 'Phiên Bản Giới Hạn',
    image: './images/motorcycle-green.png',
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.25)',
    tag: 'Độc bản quý phái',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Màu xanh lục bảo sâu thẳm hòa quyện cùng công nghệ sơn phủ tiên tiến từ Honda, tạo nên kiệt tác thẩm mỹ độc bản đầy kiêu hãnh.'
  }
];

export default function VehicleVariantsSection({ onOpenTestRide }) {
  const containerRef = useRef(null);
  const bikeRefs = useRef([]);
  const [activeVariant, setActiveVariant] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned scrollytelling timeline for the 4 vehicle versions
      const totalScroll = 300; // percent of viewport

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScroll}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
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

      // Initial setup: first variant visible, others hidden
      gsap.set(bikeRefs.current[0], { opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' });
      gsap.set(bikeRefs.current.slice(1), { opacity: 0, scale: 0.85, x: 100, filter: 'blur(10px)' });

      // Variant 0 -> Variant 1 (Đen Nhám)
      tl.to(bikeRefs.current[0], {
        opacity: 0,
        scale: 1.1,
        x: -100,
        filter: 'blur(10px)',
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

      // Variant 1 -> Variant 2 (Trắng Ngọc Trai)
      tl.to(bikeRefs.current[1], {
        opacity: 0,
        scale: 1.1,
        x: -100,
        filter: 'blur(10px)',
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

      // Variant 2 -> Variant 3 (Xanh Lục Bảo)
      tl.to(bikeRefs.current[2], {
        opacity: 0,
        scale: 1.1,
        x: -100,
        filter: 'blur(10px)',
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

  // Jump to specific variant scroll position
  const jumpToVariant = (index) => {
    soundFx.playClick();
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
      className="relative w-full h-screen overflow-hidden bg-[#07090e] select-none flex flex-col justify-between"
    >
      {/* 1. Standalone Studio Background (Clean Showroom Lighting, NOT banner-bg.jpg) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-slate-700/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-slate-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-tech-grid opacity-10" />
      </div>

      {/* 2. Main Stage Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pb-10 flex flex-col justify-between h-full">
        
        {/* Section Top Header Tag */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[2px] bg-red-600" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-400 font-body">
              BỘ SƯU TẬP PHIÊN BẢN MÀU SẮC • HONDA SH350i
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-400">
            {currentData.number} / 0{VARIANTS.length}
          </span>
        </div>

        {/* Center 2-Zone Layout: ZERO OVERLAP between text card & motorcycle image */}
        <div className="relative w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* ZONE 1: Left Column (5 Cols) - Vehicle Name, Description, Telemetry */}
          <div className="lg:col-span-5 order-2 lg:order-1 z-20">
            <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/[0.09] backdrop-blur-xl shadow-xl animate-in fade-in duration-300">
              
              {/* Badge & Edition */}
              <div className="flex items-center gap-2 mb-2">
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: currentData.accentColor }}
                />
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded bg-white/[0.06] text-neutral-200 border border-white/[0.06] font-body">
                  {currentData.subname}
                </span>
                <span className="text-[11px] text-neutral-400 font-body">| {currentData.tag}</span>
              </div>

              {/* Vehicle Name Headline */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                {currentData.name}
              </h2>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-body">
                {currentData.desc}
              </p>

              {/* Specs Telemetry Row */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] grid grid-cols-3 gap-3">
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
                    <ShieldCheck size={11} className="text-neutral-400" /> Mô-men
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white font-display mt-0.5">
                    {currentData.specs.torque}
                  </span>
                </div>
              </div>

              {/* Action Button inside card */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] text-neutral-400 font-body">Giá đề xuất đã có VAT:</span>
                <button
                  onClick={() => { soundFx.playRev(); onOpenTestRide(currentData.name); }}
                  className="px-4 py-1.5 rounded-lg honda-red-btn text-xs font-semibold uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 cursor-pointer font-display"
                >
                  Đăng Ký Bản Này
                </button>
              </div>

            </div>
          </div>

          {/* ZONE 2: Right Column (7 Cols) - Dedicated Vehicle Stage (Fully Unobstructed) */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative flex items-center justify-center h-[34vh] sm:h-[46vh] lg:h-[56vh] w-full">
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 5}deg)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              {/* Studio Ground Shadow & Soft Color Halo */}
              <div 
                className="absolute bottom-2 sm:bottom-6 w-[80%] h-12 rounded-full blur-2xl transition-all duration-700 opacity-60 pointer-events-none"
                style={{
                  backgroundColor: currentData.glowColor,
                }}
              />
              <div className="absolute bottom-4 sm:bottom-8 w-[70%] h-5 bg-black/90 rounded-full blur-md pointer-events-none" />

              {/* 4 Motorcycle Images - Preloaded & transitioned by GSAP */}
              {VARIANTS.map((variant, idx) => (
                <img
                  key={variant.id}
                  ref={(el) => (bikeRefs.current[idx] = el)}
                  src={variant.image}
                  alt={`Honda SH350i ${variant.name}`}
                  className="absolute max-w-full max-h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] will-change-transform select-none"
                />
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Swatches Dock & Navigation Guide */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Swatches Dock */}
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full glass-panel border border-white/[0.09] backdrop-blur-2xl shadow-xl">
            {VARIANTS.map((v, i) => {
              const isActive = activeVariant === i;
              return (
                <button
                  key={v.id}
                  onClick={() => jumpToVariant(i)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-white/15 shadow-sm border border-white/20' 
                      : 'hover:bg-white/[0.04] opacity-70 hover:opacity-100'
                  }`}
                >
                  <span 
                    className="block w-3.5 h-3.5 rounded-full border border-white/25 shadow-inner"
                    style={{ backgroundColor: v.accentColor }}
                  />
                  <span className={`text-[11px] font-medium tracking-wide font-body transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                  }`}>
                    {v.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Subdued scroll prompt */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] tracking-widest uppercase font-medium text-neutral-400 font-body">
            <ArrowDown size={12} className="text-neutral-400" />
            <span>Cuộn tiếp để khám phá Thiết kế & Động cơ eSP+</span>
          </div>
        </div>

      </div>
    </section>
  );
}
