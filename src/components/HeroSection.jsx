import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { Gauge, Zap, ShieldCheck, ArrowDown, ChevronRight, Sparkles, SlidersHorizontal, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VARIANTS = [
  {
    id: 'grey',
    number: '01',
    name: 'Xám Đương Đại',
    subname: 'Phiên Bản Thể Thao',
    image: './images/motorcycle-grey.png',
    accentColor: '#94a3b8',
    glowColor: 'rgba(148, 163, 184, 0.2)',
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
    glowColor: 'rgba(197, 168, 128, 0.2)',
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
    glowColor: 'rgba(52, 211, 153, 0.2)',
    tag: 'Độc bản quý phái',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Màu xanh lục bảo sâu thẳm hòa quyện cùng công nghệ sơn phủ tiên tiến từ Honda, tạo nên kiệt tác thẩm mỹ độc bản đầy kiêu hãnh.'
  }
];

export default function HeroSection({ onOpenTestRide }) {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const bannerContentRef = useRef(null);
  const vehiclesStageRef = useRef(null);
  const bikeRefs = useRef([]);
  const [activeVariant, setActiveVariant] = useState(0);
  const [isInVehiclesStage, setIsInVehiclesStage] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Total scroll distance: 420% allows generous room for:
      // Phase 1: Banner Presentation -> Zoom-in transition to vehicles
      // Phase 2: Sequential showcase of 4 color variants
      const totalScroll = 420;

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

            // Determine if in banner or vehicle versions phase
            if (p < 0.25) {
              setIsInVehiclesStage(false);
              setActiveVariant(0);
            } else {
              setIsInVehiclesStage(true);
              // In vehicle versions phase (0.25 - 1.0)
              const vehicleProgress = (p - 0.25) / 0.75;
              if (vehicleProgress < 0.28) setActiveVariant(0);
              else if (vehicleProgress < 0.55) setActiveVariant(1);
              else if (vehicleProgress < 0.82) setActiveVariant(2);
              else setActiveVariant(3);
            }
          }
        }
      });

      // Set initial states
      gsap.set(bannerContentRef.current, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' });
      gsap.set(vehiclesStageRef.current, { opacity: 0, scale: 0.85, y: 60, pointerEvents: 'none' });
      gsap.set(bikeRefs.current[0], { opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' });
      gsap.set(bikeRefs.current.slice(1), { opacity: 0, scale: 0.85, x: 100, filter: 'blur(10px)' });

      // ==========================================
      // SECTION 1 - STAGE A: BANNER ZOOM TRANSITION
      // ==========================================
      // 0.0 -> 0.8 of timeline: Banner pushes into camera, text dissolves out
      tl.to(bannerContentRef.current, {
        opacity: 0,
        scale: 1.12,
        y: -40,
        filter: 'blur(10px)',
        duration: 0.8,
        ease: 'power2.inOut',
        pointerEvents: 'none',
      }, 0.2);

      // Background camera push-in zoom: starts at 1.05 and zooms in deeply
      tl.to(bgRef.current, {
        scale: 1.6,
        y: '8%',
        ease: 'none',
        duration: 4.0
      }, 0);

      // Flash beam during spatial zoom entry
      tl.fromTo('.lens-flash', 
        { opacity: 0, scaleX: 0.2 }, 
        { opacity: 0.5, scaleX: 1.8, yoyo: true, repeat: 1, duration: 0.5, ease: 'power1.inOut' }, 
        0.8
      );

      // Vehicles stage emerges into focus from the depth of the zoom
      tl.to(vehiclesStageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.8,
        ease: 'power2.out',
      }, 0.85);

      // ==========================================
      // SECTION 1 - STAGE B: VEHICLE VERSIONS SCROLLYTELLING
      // ==========================================
      // Variant 0 -> Variant 1 (Đen Nhám)
      tl.to(bikeRefs.current[0], {
        opacity: 0,
        scale: 1.12,
        x: -100,
        filter: 'blur(10px)',
        duration: 0.8,
        ease: 'power2.inOut'
      }, 1.6);
      tl.to(bikeRefs.current[1], {
        opacity: 1,
        scale: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out'
      }, 1.7);

      // Variant 1 -> Variant 2 (Trắng Ngọc Trai)
      tl.to(bikeRefs.current[1], {
        opacity: 0,
        scale: 1.12,
        x: -100,
        filter: 'blur(10px)',
        duration: 0.8,
        ease: 'power2.inOut'
      }, 2.5);
      tl.to(bikeRefs.current[2], {
        opacity: 1,
        scale: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out'
      }, 2.6);

      // Variant 2 -> Variant 3 (Xanh Lục Bảo)
      tl.to(bikeRefs.current[2], {
        opacity: 0,
        scale: 1.12,
        x: -100,
        filter: 'blur(10px)',
        duration: 0.8,
        ease: 'power2.inOut'
      }, 3.3);
      tl.to(bikeRefs.current[3], {
        opacity: 1,
        scale: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out'
      }, 3.4);

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

  // Button on Banner: Zoom transition straight to Vehicle Versions
  const handleExploreClick = () => {
    soundFx.playRev();
    const trigger = ScrollTrigger.getAll().find(t => t.trigger === containerRef.current);
    if (trigger) {
      const targetScroll = trigger.start + (trigger.end - trigger.start) * 0.32;
      gsap.to(window, {
        duration: 1.4,
        scrollTo: targetScroll,
        ease: 'power3.inOut'
      });
    }
  };

  // Switcher dock buttons: jump to exact vehicle variant
  const jumpToVariant = (index) => {
    soundFx.playClick();
    const targets = [0.32, 0.54, 0.76, 0.96];
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
      className="relative w-full h-screen overflow-hidden bg-[#08090d] select-none"
    >
      {/* ============================================================ */}
      {/* 1. CINEMATIC BACKGROUND (banner-bg.jpg with Camera Zoom Depth) */}
      {/* ============================================================ */}
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
        {/* Natural gradient vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-black/40 to-[#08090d]/80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-85" />
        
        {/* Subtle Architectural Grid Floor */}
        <div 
          className="absolute inset-0 bg-tech-grid opacity-15"
          style={{
            transform: `perspective(1000px) rotateX(60deg) translateY(${mousePos.y * 20}px) scale(1.4)`,
            transformOrigin: 'bottom center',
          }}
        />
      </div>

      {/* Light sweep flash bar during zoom transition */}
      <div 
        className="lens-flash absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-0 blur-xl will-change-transform" 
      />

      {/* ============================================================ */}
      {/* 2. BANNER STAGE (Initial State: Text Elements & Interactive Button) */}
      {/* ============================================================ */}
      <div 
        ref={bannerContentRef}
        className="absolute inset-0 z-30 flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 pointer-events-auto"
      >
        {/* Banner Top Brand Badge */}
        <div className="flex items-center gap-3">
          <span className="w-6 h-[2px] bg-red-600" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-neutral-300 font-body">
            HONDA MOTOR VIỆT NAM • THỦ LĨNH XE GA CAO CẤP
          </span>
        </div>

        {/* Banner Center Title, Description & Key Points */}
        <div className="max-w-3xl my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md font-body">
            <Award size={13} className="text-white" />
            <span>ĐẲNG CẤP CHÂU ÂU • PHONG THÁI VƯƠNG GIẢ</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-tight uppercase">
            HONDA <span className="text-gradient-platinum">SH350i</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-body leading-relaxed max-w-2xl">
            Sự giao thoa hoàn hảo giữa ngôn ngữ thiết kế điêu khắc thượng lưu nước Ý và khối động cơ eSP+ 330cc thế hệ mới. Trải nghiệm vị thế dẫn đầu trong từng chuyển động uy nghi trên mọi cung đường.
          </p>

          {/* Quick Specifications Pill Summary */}
          <div className="mt-6 flex flex-wrap gap-3 sm:gap-4 text-xs font-body text-neutral-300">
            <div className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-center gap-2">
              <Gauge size={14} className="text-neutral-400" />
              <span>Động cơ <strong>329.6cc eSP+</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-center gap-2">
              <ShieldCheck size={14} className="text-neutral-400" />
              <span>Phanh <strong>ABS 2 Kênh & HSTC</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-center gap-2">
              <Zap size={14} className="text-neutral-400" />
              <span>Chuẩn khí thải <strong>Euro 5</strong></span>
            </div>
          </div>

          {/* Banner Interactive CTA Button */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={handleExploreClick}
              className="px-7 py-3.5 rounded-full honda-red-btn text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-display"
            >
              <span>Khám Phá Các Phiên Bản 3D</span>
              <ChevronRight size={15} />
            </button>

            <button
              onClick={() => { soundFx.playRev(); onOpenTestRide(); }}
              className="px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white text-xs font-medium tracking-wide transition-all cursor-pointer font-body"
            >
              Đăng Ký Lái Thử
            </button>
          </div>
        </div>

        {/* Banner Bottom Scroll Prompt */}
        <div 
          onClick={handleExploreClick}
          className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-400 font-body cursor-pointer hover:text-white transition-colors"
        >
          <ArrowDown size={13} className="animate-bounce" />
          <span>Cuộn trang để zoom chuyển tiếp vào các phiên bản màu xe</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. VEHICLE VERSIONS STAGE (Rearranged: ZERO Overlap Layout)   */}
      {/* ============================================================ */}
      <div 
        ref={vehiclesStageRef}
        className="absolute inset-0 z-20 flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pb-10"
      >
        {/* Top Floating Mini Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-400 font-body">
              BỘ SƯU TẬP MÀU SẮC HONDA SH350i
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-400">
            {currentData.number} / 0{VARIANTS.length}
          </span>
        </div>

        {/* Main 2-Zone Body: Left Info (Non-overlapping) & Right/Center Vehicle Display */}
        <div className="relative w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* ZONE 1: Vehicle Name & Technical Telemetry (Clean Left Column - 5 Cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1 z-30">
            <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/[0.09] backdrop-blur-xl shadow-xl animate-in fade-in duration-300">
              {/* Badge & Edition Tag */}
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

              {/* Vehicle Variant Name */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                {currentData.name}
              </h2>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-body">
                {currentData.desc}
              </p>

              {/* Technical Specifications Grid (Clean, readable, non-obtrusive) */}
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
                <span className="text-[11px] text-neutral-400 font-body">Giá niêm yết từ:</span>
                <button
                  onClick={() => { soundFx.playRev(); onOpenTestRide(currentData.name); }}
                  className="px-4 py-1.5 rounded-lg honda-red-btn text-xs font-semibold uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 cursor-pointer font-display"
                >
                  Đăng Ký Bản Này
                </button>
              </div>
            </div>
          </div>

          {/* ZONE 2: Dedicated Vehicle Visual Stage (Clean Right Column - 7 Cols, completely unobstructed) */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative flex items-center justify-center h-[34vh] sm:h-[45vh] lg:h-[54vh] w-full">
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 5}deg)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              {/* Ground Shadow & Ambient Halo under bike */}
              <div 
                className="absolute bottom-2 sm:bottom-6 w-[80%] h-10 rounded-full blur-2xl transition-all duration-700 opacity-60 pointer-events-none"
                style={{
                  backgroundColor: currentData.glowColor,
                }}
              />
              <div className="absolute bottom-4 sm:bottom-8 w-[70%] h-4 bg-black/90 rounded-full blur-md pointer-events-none" />

              {/* 4 Motorcycle Images - Preloaded and smooth transitioned by GSAP */}
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

        </div>

        {/* Bottom Dock: Color Switcher & Scroll Guide */}
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
