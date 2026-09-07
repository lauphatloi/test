import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { ShieldCheck, ChevronRight, ChevronLeft, Cpu, Lightbulb } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const DESIGN_COMPONENTS = [
  {
    id: 'headlight',
    number: '01',
    code: 'FRONT-LED-01',
    category: 'Mặt Nạ Trước & Đèn Pha',
    tag: 'Chữ S Quyền Lực',
    title: 'Cụm Đèn LED & Mặt Nạ Chrome Chữ S',
    shortTitle: 'Đèn LED & Mặt Nạ Chữ S',
    summary: 'Đường nét mạ chrome sáng bóng kết hợp dải LED định vị ban ngày tách biệt. Cấu trúc tạo khối chữ S trứ danh kiến tạo diện mạo quyền uy và ánh nhìn kiêu hãnh của thủ lĩnh.',
    shortSummary: 'Đèn Full LED 2 tầng kết hợp dải định vị ban ngày và mặt nạ chrome chữ S quyền uy.',
    icon: Lightbulb,
    mobileTags: ['Full LED 2 Tầng', 'Mạ Chrome Ánh Gương'],
    specs: [
      { label: 'Hệ thống', value: 'Full LED 2 Tầng' },
      { label: 'Hoàn thiện', value: 'Mạ Chrome Ánh Gương' },
      { label: 'Tầm nhìn', value: 'Chiếu sáng liên tục cao cấp' },
    ],
    image: './images/thiet-ke-dau.jpg',
  },
  {
    id: 'cockpit',
    number: '02',
    code: 'COCKPIT-LCD-02',
    category: 'Khoang Lái Kỹ Thuật Số',
    tag: 'Kết Nối My Honda+',
    title: 'Mặt Đồng Hồ Đôi LCD Đa Tầng Thông Minh',
    shortTitle: 'Mặt Đồng Hồ Đôi LCD',
    summary: 'Màn hình tinh thể lỏng hiển thị đa thông số hành trình sắc nét: vận tốc, mức tiêu hao, điện áp và cảnh báo HSTC. Hỗ trợ đồng bộ dữ liệu thông minh qua Bluetooth với My Honda+.',
    shortSummary: 'Màn hình LCD đôi sắc nét hiển thị đầy đủ thông số hành trình, đồng bộ My Honda+.',
    icon: Cpu,
    mobileTags: ['Dual LCD Kỹ Thuật Số', 'Bluetooth My Honda+'],
    specs: [
      { label: 'Hiển thị', value: 'Dual LCD Kỹ Thuật Số' },
      { label: 'Kết nối', value: 'Bluetooth • My Honda+' },
      { label: 'Chỉ số', value: 'Vận tốc, HSTC, điện áp' },
    ],
    image: './images/thiet-ke-mat-dong-ho.jpg',
  },
  {
    id: 'taillight',
    number: '03',
    code: 'REAR-ESS-03',
    category: 'Đuôi Xe & Đèn Hậu 3D',
    tag: 'Đèn Dừng Khẩn Cấp ESS',
    title: 'Cụm Đèn Hậu LED 3D & Tay Dắt Nhôm Đúc',
    shortTitle: 'Đèn Hậu LED 3D & Tay Dắt Nhôm',
    summary: 'Đuôi xe vuốt nhọn khí động học Grand Touring vững chãi. Đèn hậu LED 2 tầng phân cách viền chrome sang trọng, tích hợp đèn dừng khẩn cấp ESS tự động chớp nháy cảnh báo khi phanh gấp.',
    shortSummary: 'Đèn hậu LED 3D phân tầng thể thao kết hợp tay dắt nhôm đúc và cảnh báo phanh ESS.',
    icon: ShieldCheck,
    mobileTags: ['LED Đồ Họa 3D', 'Phanh Khẩn Cấp ESS'],
    specs: [
      { label: 'Đèn hậu', value: 'LED Đồ Họa 3D 2 Tầng' },
      { label: 'An toàn', value: 'Cảnh báo khẩn cấp ESS' },
      { label: 'Kết cấu', value: 'Tay dắt nhôm đúc nguyên khối' },
    ],
    image: './images/thiet-ke-duoi.jpg',
  },
];

export default function DesignSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const textRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const mm = gsap.matchMedia();

    // DESKTOP ONLY: 3D Pinned Scrollytelling (zero mobile overhead / zero lag)
    mm.add('(min-width: 1024px)', () => {
      const getPose = (slot) => {
        if (slot === 0) {
          return {
            xPercent: 0,
            y: 0,
            z: 60,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px) brightness(1)',
            zIndex: 30,
          };
        }
        if (slot === 1) {
          return {
            xPercent: 58,
            y: 20,
            z: -190,
            rotateY: -32,
            rotateX: 6,
            rotateZ: 1,
            scale: 0.82,
            opacity: 0.45,
            filter: 'blur(3px) brightness(0.85)',
            zIndex: 20,
          };
        }
        if (slot === -1) {
          return {
            xPercent: -58,
            y: -20,
            z: -190,
            rotateY: 32,
            rotateX: -6,
            rotateZ: -1,
            scale: 0.82,
            opacity: 0.45,
            filter: 'blur(3px) brightness(0.85)',
            zIndex: 20,
          };
        }
        if (slot > 1) {
          return {
            xPercent: 115,
            y: 38,
            z: -360,
            rotateY: -46,
            rotateX: 10,
            rotateZ: 2,
            scale: 0.68,
            opacity: 0.15,
            filter: 'blur(6px) brightness(0.7)',
            zIndex: 10,
          };
        }
        // slot < -1
        return {
          xPercent: -115,
          y: -38,
          z: -360,
          rotateY: 46,
          rotateX: -10,
          rotateZ: -2,
          scale: 0.68,
          opacity: 0.15,
          filter: 'blur(6px) brightness(0.7)',
          zIndex: 10,
        };
      };

      // Set initial positions:
      gsap.set(cardRefs.current[0], getPose(0));
      gsap.set(cardRefs.current[1], getPose(1));
      gsap.set(cardRefs.current[2], getPose(2));

      gsap.set(textRefs.current[0], { opacity: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto' });
      gsap.set(textRefs.current[1], { opacity: 0, y: 25, filter: 'blur(8px)', pointerEvents: 'none' });
      gsap.set(textRefs.current[2], { opacity: 0, y: 25, filter: 'blur(8px)', pointerEvents: 'none' });

      // Pinned Desktop Scrollytelling Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            let current = 0;
            if (p < 0.35) current = 0;
            else if (p < 0.68) current = 1;
            else current = 2;
            setActiveStep((prev) => (prev !== current ? current : prev));
          },
        },
      });

      // Giai đoạn 1: Card 1 -> Slot -1, Card 2 -> Slot 0, Card 3 -> Slot 1
      tl.to(cardRefs.current[0], { ...getPose(-1), duration: 1.0, ease: 'power1.inOut' }, 0.3);
      tl.to(cardRefs.current[1], { ...getPose(0), duration: 1.0, ease: 'power1.inOut' }, 0.3);
      tl.to(cardRefs.current[2], { ...getPose(1), duration: 1.0, ease: 'power1.inOut' }, 0.3);

      tl.to(textRefs.current[0], {
        opacity: 0,
        y: -25,
        filter: 'blur(6px)',
        duration: 0.55,
        ease: 'power1.inOut',
        pointerEvents: 'none',
      }, 0.3);
      tl.to(textRefs.current[1], {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.65,
        ease: 'power2.out',
        pointerEvents: 'auto',
      }, 0.65);

      // Giai đoạn 2: Card 1 -> Slot -2, Card 2 -> Slot -1, Card 3 -> Slot 0
      tl.to(cardRefs.current[0], { ...getPose(-2), duration: 1.0, ease: 'power1.inOut' }, 1.6);
      tl.to(cardRefs.current[1], { ...getPose(-1), duration: 1.0, ease: 'power1.inOut' }, 1.6);
      tl.to(cardRefs.current[2], { ...getPose(0), duration: 1.0, ease: 'power1.inOut' }, 1.6);

      tl.to(textRefs.current[1], {
        opacity: 0,
        y: -25,
        filter: 'blur(6px)',
        duration: 0.55,
        ease: 'power1.inOut',
        pointerEvents: 'none',
      }, 1.6);
      tl.to(textRefs.current[2], {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.65,
        ease: 'power2.out',
        pointerEvents: 'auto',
      }, 1.95);
    });

    return () => mm.revert();
  }, []);

  const selectStep = (index) => {
    soundFx.playClick();
    setActiveStep(index);
    const st = ScrollTrigger.getAll().find(t => t.trigger === sectionRef.current);
    if (st) {
      const stepFraction = [0.08, 0.50, 0.92][index];
      const targetScroll = st.start + (st.end - st.start) * stepFraction;
      gsap.to(window, {
        duration: 1.0,
        scrollTo: targetScroll,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section 
      id="design" 
      ref={sectionRef} 
      className={`relative w-full overflow-hidden select-none transition-colors duration-500 scroll-mt-20 ${
        isDark ? 'bg-[#07090e]' : 'bg-[#eef2f6]'
      } py-14 sm:py-20 lg:py-0 lg:h-screen lg:flex lg:flex-col lg:justify-between`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full blur-[160px] ${
          isDark ? 'bg-red-950/15' : 'bg-red-500/5'
        }`} />
        <div className={`absolute bottom-1/4 -right-40 w-[600px] h-[600px] rounded-full blur-[160px] ${
          isDark ? 'bg-slate-800/30' : 'bg-slate-300/40'
        }`} />
        <div className={`absolute inset-0 bg-tech-grid ${isDark ? 'opacity-15' : 'opacity-[0.04]'}`} />
      </div>

      {/* ============================================================ */}
      {/* 1. MOBILE VIEW (lg:hidden) - 3 HIGH-TECH VERTICAL CARDS      */}
      {/* ============================================================ */}
      <div className="lg:hidden relative z-20 w-full max-w-lg mx-auto px-4 sm:px-6 flex flex-col gap-6">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2.5 bg-red-600/10 border border-red-600/25 text-red-600 dark:text-red-400 font-body">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>KIẾN TRÚC NGOẠI THẤT</span>
          </div>

          <h2 className={`font-display text-2xl sm:text-3xl font-black uppercase tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            3 Điểm Nhấn Thiết Kế Đỉnh Cao
          </h2>

          <p className={`mt-2 text-xs sm:text-sm font-body max-w-sm ${
            isDark ? 'text-neutral-400' : 'text-slate-600'
          }`}>
            Từng đường nét được tạo tác tinh xảo, tôn vinh vị thế thủ lĩnh và phong thái sang trọng của SH350i.
          </p>
        </div>

        {/* 3 Sequential Tech Cards */}
        <div className="flex flex-col gap-5">
          {DESIGN_COMPONENTS.map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <div 
                key={`mob-card-${comp.id}`} 
                className={`w-full rounded-2xl p-4 sm:p-5 border transition-all ${
                  isDark 
                    ? 'bg-slate-900/95 border-white/15 text-white shadow-xl shadow-black/40' 
                    : 'bg-white border-slate-300 text-slate-900 shadow-lg shadow-slate-900/5'
                }`}
              >
                {/* Tech Bar Header with Code and Counter */}
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200 dark:border-white/10 text-[11px] font-mono tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    <span className="font-bold text-red-600 dark:text-red-400 font-display">
                      {comp.code}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold font-body px-2.5 py-0.5 rounded-full ${
                    isDark ? 'bg-white/10 text-neutral-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    CHI TIẾT 0{idx + 1} / 03
                  </span>
                </div>

                {/* Tech Card Box with 4 Corner Brackets & Image */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-black border border-white/10">
                  <span className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-red-500 rounded-tl pointer-events-none z-10" />
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-red-500 rounded-tr pointer-events-none z-10" />
                  <span className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-red-500 rounded-bl pointer-events-none z-10" />
                  <span className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-red-500 rounded-br pointer-events-none z-10" />

                  <img
                    src={comp.image}
                    alt={comp.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase backdrop-blur-md bg-black/70 text-white border border-white/20">
                      {comp.tag}
                    </span>
                    <span className="text-xs font-black text-white font-display">
                      SH350i • 2026
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="mt-3.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 bg-red-600/10 border border-red-600/25 text-red-600 dark:text-red-400 font-body">
                    <Icon size={12} className="text-red-500 shrink-0" />
                    <span>{comp.category}</span>
                  </div>

                  <h3 className={`font-display text-lg font-black tracking-tight uppercase leading-snug ${
                    isDark ? 'text-white' : 'text-slate-950'
                  }`}>
                    {comp.title}
                  </h3>

                  <p className={`mt-1.5 text-[13px] leading-relaxed font-body ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}>
                    {comp.summary}
                  </p>

                  {/* 3 Tech Specs Chips */}
                  <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
                    {comp.specs.map((s, sIdx) => (
                      <div
                        key={sIdx}
                        className={`p-2 rounded-xl border flex flex-col justify-between ${
                          isDark
                            ? 'bg-white/[0.04] border-white/10 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      >
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${
                          isDark ? 'text-neutral-400' : 'text-slate-500'
                        }`}>
                          {s.label}
                        </span>
                        <span className="font-bold text-[11px] sm:text-xs mt-0.5 font-display line-clamp-2">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Subtle Bottom Guidance */}
        <div className="pt-2 pb-1 flex items-center justify-center gap-2 text-xs font-body tracking-wider text-slate-500 dark:text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          <span>Cuộn tiếp để khám phá Động cơ eSP+ 330cc</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. DESKTOP VIEW (hidden lg:flex) - Full Pinned 3D Stage       */}
      {/* ============================================================ */}
      <div className="hidden lg:flex flex-col justify-between w-full h-full">
        {/* Floating Section Header Tag */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[2px] bg-red-600" />
            <span className={`text-xs font-black tracking-[0.2em] uppercase font-body ${
              isDark ? 'text-neutral-300' : 'text-slate-950'
            }`}>
              KIẾN TRÚC THIẾT KẾ • 3 ĐIỂM NHẤN HOÀN THIỆN
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold">
            <span className="text-red-500">0{activeStep + 1}</span>
            <span className={isDark ? 'text-neutral-500' : 'text-slate-400'}>/</span>
            <span className={isDark ? 'text-neutral-400' : 'text-slate-800'}>03</span>
          </div>
        </div>

        {/* Main 3D Space Stage */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 my-auto grid grid-cols-12 gap-10 items-center">
          {/* ZONE 1: 3D FLOATING CARDS STAGE */}
          <div 
            ref={stageRef}
            className="col-span-7 relative flex items-center justify-center w-full h-[62vh] pointer-events-none"
            style={{
              perspective: '1400px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            <div className={`absolute bottom-0 w-[80%] h-12 rounded-full blur-3xl ${
              isDark ? 'bg-red-600/10' : 'bg-slate-400/25'
            }`} />

            {DESIGN_COMPONENTS.map((comp, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={comp.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  onClick={() => selectStep(idx)}
                  className={`absolute w-[480px] max-w-[500px] rounded-3xl p-3 transition-shadow duration-500 will-change-transform cursor-pointer pointer-events-auto ${
                    isDark 
                      ? 'bg-slate-900/80 border border-white/20 shadow-2xl backdrop-blur-xl' 
                      : 'bg-white/95 border border-slate-300 shadow-xl shadow-slate-900/15 backdrop-blur-xl'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Tech Bracket Accents */}
                  <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-red-500/80 rounded-tl-sm pointer-events-none" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-red-500/80 rounded-tr-sm pointer-events-none" />
                  <span className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-red-500/80 rounded-bl-sm pointer-events-none" />
                  <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-red-500/80 rounded-br-sm pointer-events-none" />

                  {/* Top HUD Bar */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 mb-1.5 border-b border-white/10 text-[10px] font-mono tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`} />
                      <span className={isDark ? 'text-neutral-300 font-bold' : 'text-slate-800 font-bold'}>
                        {comp.code}
                      </span>
                    </div>
                    <span className={`font-semibold uppercase tracking-widest ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                      SH350i • 2026
                    </span>
                  </div>

                  {/* High-Res Image Container */}
                  <div className="relative w-full aspect-[16/9.5] rounded-2xl overflow-hidden group">
                    <img
                      src={comp.image}
                      alt={comp.title}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-body tracking-wider uppercase backdrop-blur-md bg-black/65 text-white border border-white/20">
                        {comp.tag}
                      </span>
                      <span className="text-xs font-black text-white drop-shadow font-display">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ZONE 2: TECH HUD TEXT DATA TERMINAL */}
          <div className="col-span-5 relative w-full flex flex-col justify-center min-h-[380px]">
            <div className="relative w-full">
              {DESIGN_COMPONENTS.map((comp, idx) => {
                const Icon = comp.icon;
                return (
                  <div
                    key={`text-${comp.id}`}
                    ref={(el) => (textRefs.current[idx] = el)}
                    className={`w-full transition-colors ${
                      idx === 0 ? 'relative' : 'absolute inset-0'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md font-body bg-red-600/10 border border-red-600/25 text-red-600 dark:text-red-400">
                      <Icon size={13} className="text-red-500 shrink-0" />
                      <span>{comp.category}</span>
                    </div>

                    <h3 className={`font-display text-3xl font-black tracking-tight leading-snug uppercase ${
                      isDark ? 'text-white' : 'text-slate-950'
                    }`}>
                      {comp.title}
                    </h3>

                    <p className={`mt-3 text-[15px] leading-relaxed font-body ${
                      isDark ? 'text-neutral-300' : 'text-slate-800 font-medium'
                    }`}>
                      {comp.summary}
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-body">
                      {comp.specs.map((s, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${
                            isDark 
                              ? 'bg-white/[0.04] border-white/10 text-white' 
                              : 'bg-white border-slate-300 text-slate-900 shadow-sm'
                          }`}
                        >
                          <span className={`text-[9px] font-bold uppercase tracking-wider ${
                            isDark ? 'text-neutral-400' : 'text-slate-700'
                          }`}>
                            {s.label}
                          </span>
                          <span className="font-bold text-xs mt-0.5 font-display line-clamp-2">
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Tabs */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {DESIGN_COMPONENTS.map((comp, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={`btn-${comp.id}`}
                      onClick={() => selectStep(idx)}
                      onMouseEnter={() => soundFx.playHover()}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-body flex items-center gap-1.5 ${
                        isActive
                          ? (isDark 
                              ? 'bg-white text-black shadow-md' 
                              : 'bg-slate-900 text-white shadow-md')
                          : (isDark 
                              ? 'bg-white/[0.06] text-neutral-300 hover:text-white hover:bg-white/[0.12] border border-white/10' 
                              : 'bg-slate-200/90 text-slate-800 hover:text-slate-950 hover:bg-slate-300 border border-slate-300')
                      }`}
                    >
                      <span>0{idx + 1}</span>
                      <span className="font-medium">
                        {idx === 0 ? 'Mặt Nạ LED' : idx === 1 ? 'Đồng Hồ LCD' : 'Đèn Hậu 3D'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div 
                onClick={() => selectStep((activeStep + 1) % DESIGN_COMPONENTS.length)}
                className={`flex items-center gap-1 text-[11px] font-semibold font-body cursor-pointer transition-colors ${
                  isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <span>Tiếp theo</span>
                <ChevronRight size={14} className="text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Hint */}
        <div className="relative z-30 w-full pb-3 flex items-center justify-center gap-2 text-xs font-body tracking-wider text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          <span className={isDark ? 'text-neutral-400' : 'text-slate-800'}>
            Cuộn chuột để xoay chuyển góc nhìn 3D
          </span>
        </div>
      </div>
    </section>
  );
}
