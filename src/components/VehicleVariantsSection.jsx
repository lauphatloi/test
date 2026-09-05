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
    glowColor: 'rgba(148, 163, 184, 0.45)',
    tag: 'Phong cách đô thị hiện đại',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Sắc xám đương đại tinh tế, kết hợp hài hòa cùng các chi tiết hoàn thiện tỉ mỉ mang lại diện mạo đĩnh đạc và phong thái đĩnh đạc của người dẫn đầu.',
    // Vệt loang màu ánh kim bạc hiện đại
    bleedGradient: 'radial-gradient(ellipse at 50% 50%, rgba(148, 163, 184, 0.65) 0%, rgba(71, 85, 105, 0.45) 35%, rgba(30, 41, 59, 0.15) 60%, transparent 75%)',
    bgGradient: 'radial-gradient(circle at 60% 45%, rgba(148, 163, 184, 0.18) 0%, rgba(15, 23, 42, 0.6) 50%, #07090e 100%)',
    floorGlow: 'rgba(148, 163, 184, 0.4)',
  },
  {
    id: 'dark-grey',
    number: '02',
    name: 'Đen Nhám Doanh Nhân',
    subname: 'Phiên Bản Đặc Biệt',
    image: './images/motorcycle-dark-grey.png',
    accentColor: '#c5a880',
    glowColor: 'rgba(197, 168, 128, 0.45)',
    tag: 'Đẳng cấp doanh nhân thành đạt',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Lớp sơn mờ Matte Black quý phái, điểm xuyết logo SH mạ đồng ánh kim thể hiện uy quyền kín đáo và sự tinh tế trong từng đường nét.',
    // Vệt loang màu đồng ánh kim sang trọng
    bleedGradient: 'radial-gradient(ellipse at 50% 50%, rgba(217, 119, 6, 0.65) 0%, rgba(180, 83, 9, 0.45) 35%, rgba(120, 53, 15, 0.15) 60%, transparent 75%)',
    bgGradient: 'radial-gradient(circle at 60% 45%, rgba(180, 83, 9, 0.22) 0%, rgba(26, 17, 10, 0.6) 50%, #07090e 100%)',
    floorGlow: 'rgba(217, 119, 6, 0.45)',
  },
  {
    id: 'white',
    number: '03',
    name: 'Trắng Ngọc Trai Thanh Lịch',
    subname: 'Phiên Bản Cao Cấp',
    image: './images/motorcycle-white.png',
    accentColor: '#cbd5e1',
    glowColor: 'rgba(203, 213, 225, 0.45)',
    tag: 'Vẻ đẹp thanh lịch vượt thời gian',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Ánh sơn trắng ngọc trai đa lớp phát sáng dịu nhẹ dưới ánh mặt trời, tôn vinh phong thái lịch lãm chuẩn mực theo phong cách Ý.',
    // Vệt loang màu ngọc trai ánh băng tinh khôi
    bleedGradient: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.75) 0%, rgba(186, 230, 253, 0.45) 35%, rgba(56, 189, 248, 0.15) 60%, transparent 75%)',
    bgGradient: 'radial-gradient(circle at 60% 45%, rgba(186, 230, 253, 0.2) 0%, rgba(12, 24, 38, 0.6) 50%, #07090e 100%)',
    floorGlow: 'rgba(226, 232, 240, 0.5)',
  },
  {
    id: 'green',
    number: '04',
    name: 'Xanh Lục Bảo Tinh Hoa',
    subname: 'Phiên Bản Giới Hạn',
    image: './images/motorcycle-green.png',
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    tag: 'Độc bản quý phái',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Màu xanh lục bảo sâu thẳm hòa quyện cùng công nghệ sơn phủ tiên tiến từ Honda, tạo nên kiệt tác thẩm mỹ độc bản đầy kiêu hãnh.',
    // Vệt loang màu xanh lục bảo quý phái
    bleedGradient: 'radial-gradient(ellipse at 50% 50%, rgba(52, 211, 153, 0.75) 0%, rgba(16, 185, 129, 0.45) 35%, rgba(4, 120, 87, 0.15) 60%, transparent 75%)',
    bgGradient: 'radial-gradient(circle at 60% 45%, rgba(16, 185, 129, 0.22) 0%, rgba(6, 26, 18, 0.6) 50%, #07090e 100%)',
    floorGlow: 'rgba(52, 211, 153, 0.45)',
  }
];

export default function VehicleVariantsSection({ onOpenTestRide }) {
  const containerRef = useRef(null);
  const bikeRefs = useRef([]);
  const bleedRefs = useRef([]);
  const floorGlowRefs = useRef([]);
  const ambientRefs = useRef([]);
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
            else if (p < 0.57) index = 1;
            else if (p < 0.85) index = 2;
            else index = 3;
            setActiveVariant(index);
          }
        }
      });

      // 1. Initial setup: first variant visible, others hidden
      // SẢN PHẨM ĐỨNG TẠI CHỖ: x: 0, y: 0, scale: 1, filter: 'none' (KHÔNG chạy x, KHÔNG blur)
      gsap.set(bikeRefs.current[0], { opacity: 1, x: 0, y: 0, scale: 1, filter: 'none' });
      gsap.set(bikeRefs.current.slice(1), { opacity: 0, x: 0, y: 0, scale: 1, filter: 'none' });

      // Vệt loang màu: bản đầu tiên hiển thị, các bản sau sẵn sàng từ tâm (scale: 0.35, opacity: 0)
      gsap.set(bleedRefs.current[0], { scale: 1, opacity: 1, rotate: 0 });
      gsap.set(bleedRefs.current.slice(1), { scale: 0.35, opacity: 0, rotate: -10 });

      // Ánh sáng hắt sàn & nền ambient ban đầu
      gsap.set(floorGlowRefs.current[0], { opacity: 1 });
      gsap.set(floorGlowRefs.current.slice(1), { opacity: 0 });

      gsap.set(ambientRefs.current[0], { opacity: 1 });
      gsap.set(ambientRefs.current.slice(1), { opacity: 0 });

      // =========================================================================
      // GIAI ĐOẠN 1: Chuyển từ Xám Đương Đại -> Đen Nhám Doanh Nhân (từ 0.7 đến 1.3)
      // =========================================================================
      // Xe đứng yên tại chỗ, chuyển mượt mà độ trong suốt (không di chuyển, không blur)
      tl.to(bikeRefs.current[0], { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 0.7);
      tl.to(bikeRefs.current[1], { opacity: 1, duration: 0.6, ease: 'power1.inOut' }, 0.7);

      // Vệt loang màu: vệt xám cũ loang rộng ra và tan dần, vệt vàng đồng mới loang từ tâm ra
      tl.to(bleedRefs.current[0], { scale: 2.2, opacity: 0, duration: 0.8, ease: 'power2.in' }, 0.7);
      tl.fromTo(bleedRefs.current[1], 
        { scale: 0.35, opacity: 0, rotate: -10 }, 
        { scale: 1.25, opacity: 1, rotate: 10, duration: 0.8, ease: 'power2.out' }, 
        0.7
      );

      // Đồng bộ vệt loang hắt sàn & không gian nền
      tl.to(floorGlowRefs.current[0], { opacity: 0, duration: 0.6 }, 0.7);
      tl.to(floorGlowRefs.current[1], { opacity: 1, duration: 0.6 }, 0.7);
      tl.to(ambientRefs.current[0], { opacity: 0, duration: 0.8 }, 0.7);
      tl.to(ambientRefs.current[1], { opacity: 1, duration: 0.8 }, 0.7);

      // =========================================================================
      // GIAI ĐOẠN 2: Chuyển từ Đen Nhám -> Trắng Ngọc Trai (từ 1.7 đến 2.3)
      // =========================================================================
      // Xe đứng yên tại chỗ, chuyển mượt mà độ trong suốt
      tl.to(bikeRefs.current[1], { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 1.7);
      tl.to(bikeRefs.current[2], { opacity: 1, duration: 0.6, ease: 'power1.inOut' }, 1.7);

      // Vệt loang màu: vệt vàng đồng tan ra ngoài, vệt trắng ngọc trai băng tinh loang ra từ tâm
      tl.to(bleedRefs.current[1], { scale: 2.2, opacity: 0, duration: 0.8, ease: 'power2.in' }, 1.7);
      tl.fromTo(bleedRefs.current[2], 
        { scale: 0.35, opacity: 0, rotate: 10 }, 
        { scale: 1.25, opacity: 1, rotate: -10, duration: 0.8, ease: 'power2.out' }, 
        1.7
      );

      // Đồng bộ vệt loang hắt sàn & không gian nền
      tl.to(floorGlowRefs.current[1], { opacity: 0, duration: 0.6 }, 1.7);
      tl.to(floorGlowRefs.current[2], { opacity: 1, duration: 0.6 }, 1.7);
      tl.to(ambientRefs.current[1], { opacity: 0, duration: 0.8 }, 1.7);
      tl.to(ambientRefs.current[2], { opacity: 1, duration: 0.8 }, 1.7);

      // =========================================================================
      // GIAI ĐOẠN 3: Chuyển từ Trắng Ngọc Trai -> Xanh Lục Bảo (từ 2.7 đến 3.3)
      // =========================================================================
      // Xe đứng yên tại chỗ, chuyển mượt mà độ trong suốt
      tl.to(bikeRefs.current[2], { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 2.7);
      tl.to(bikeRefs.current[3], { opacity: 1, duration: 0.6, ease: 'power1.inOut' }, 2.7);

      // Vệt loang màu: vệt trắng tan ra ngoài, vệt xanh lục bảo ngọc bích loang ra từ tâm
      tl.to(bleedRefs.current[2], { scale: 2.2, opacity: 0, duration: 0.8, ease: 'power2.in' }, 2.7);
      tl.fromTo(bleedRefs.current[3], 
        { scale: 0.35, opacity: 0, rotate: -10 }, 
        { scale: 1.25, opacity: 1, rotate: 10, duration: 0.8, ease: 'power2.out' }, 
        2.7
      );

      // Đồng bộ vệt loang hắt sàn & không gian nền
      tl.to(floorGlowRefs.current[2], { opacity: 0, duration: 0.6 }, 2.7);
      tl.to(floorGlowRefs.current[3], { opacity: 1, duration: 0.6 }, 2.7);
      tl.to(ambientRefs.current[2], { opacity: 0, duration: 0.8 }, 2.7);
      tl.to(ambientRefs.current[3], { opacity: 1, duration: 0.8 }, 2.7);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse tilt micro-interaction (rất nhẹ nhàng giữ vững độ chắc chắn cho khung xe)
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
    const targets = [0.05, 0.40, 0.70, 0.95];
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
      {/* 1. Standalone Studio Background with Ambient Color Wash */}
      <div className="absolute inset-0 pointer-events-none">
        {VARIANTS.map((variant, idx) => (
          <div
            key={`ambient-${variant.id}`}
            ref={(el) => (ambientRefs.current[idx] = el)}
            className="absolute inset-0 will-change-opacity transition-opacity"
            style={{
              background: variant.bgGradient,
            }}
          />
        ))}
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
                  className="w-2 h-2 rounded-full shadow-sm"
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

          {/* ZONE 2: Right Column (7 Cols) - Dedicated Vehicle Stage */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative flex items-center justify-center h-[34vh] sm:h-[46vh] lg:h-[56vh] w-full">
            
            {/* Vệt Loang Màu Lan Tỏa từ tâm xe (Organic Color Bleed Aura) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
              {VARIANTS.map((variant, idx) => (
                <div
                  key={`bleed-${variant.id}`}
                  ref={(el) => (bleedRefs.current[idx] = el)}
                  className="absolute w-[360px] sm:w-[560px] lg:w-[740px] h-[260px] sm:h-[400px] lg:h-[520px] rounded-[48%_52%_58%_42%_/_46%_54%_46%_54%] blur-[65px] sm:blur-[90px] will-change-transform pointer-events-none"
                  style={{
                    background: variant.bleedGradient,
                  }}
                />
              ))}
            </div>

            {/* Khung Xe: Đứng Tại Chỗ Tuyệt Đối (Stationary Showroom Center) */}
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 4}deg) rotateX(${-mousePos.y * 3}deg)`,
                transition: 'transform 0.25s ease-out',
              }}
            >
              {/* Studio Ground Shadow & Floor Color Bleed Reflections */}
              {VARIANTS.map((variant, idx) => (
                <div 
                  key={`floor-${variant.id}`}
                  ref={(el) => (floorGlowRefs.current[idx] = el)}
                  className="absolute bottom-2 sm:bottom-6 w-[80%] h-12 rounded-full blur-2xl pointer-events-none will-change-opacity"
                  style={{
                    backgroundColor: variant.floorGlow,
                  }}
                />
              ))}
              <div className="absolute bottom-4 sm:bottom-8 w-[70%] h-5 bg-black/90 rounded-full blur-md pointer-events-none z-10" />

              {/* 4 Sản phẩm xe đứng tại chỗ: Hoàn toàn KHÔNG chạy tọa độ x, KHÔNG blur */}
              {VARIANTS.map((variant, idx) => (
                <img
                  key={variant.id}
                  ref={(el) => (bikeRefs.current[idx] = el)}
                  src={variant.image}
                  alt={`Honda SH350i ${variant.name}`}
                  className="absolute inset-0 m-auto max-w-full max-h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] will-change-opacity select-none z-20"
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
