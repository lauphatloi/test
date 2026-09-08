import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { Gauge, Zap, ShieldCheck, ArrowDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const VARIANTS = [
  {
    id: 'grey',
    number: '01',
    name: 'Xám Đương Đại',
    subname: 'Phiên Bản Thể Thao',
    editionTag: 'Sport Edition',
    price: '152.490.000',
    image: './images/motorcycle-grey.png',
    accentColor: '#94a3b8',
    tag: 'Phong cách thể thao đường đua',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Sắc xám thời thượng kết hợp cùng các chi tiết sơn đỏ thể thao tương phản, toát lên phong thái đĩnh đạc và uy quyền của thủ lĩnh.',
    floorGlow: 'rgba(148, 163, 184, 0.45)',
  },
  {
    id: 'dark-grey',
    number: '02',
    name: 'Đen Nhám Doanh Nhân',
    subname: 'Phiên Bản Đặc Biệt',
    editionTag: 'Special Edition',
    price: '151.990.000',
    image: './images/motorcycle-dark-grey.png',
    accentColor: '#c5a880',
    tag: 'Đẳng cấp doanh nhân thành đạt',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Lớp sơn mờ Matte Black quý phái, điểm xuyết logo SH mạ đồng ánh kim thể hiện uy quyền kín đáo và sự tinh tế trong từng đường nét.',
    floorGlow: 'rgba(217, 119, 6, 0.5)',
  },
  {
    id: 'white',
    number: '03',
    name: 'Trắng Ngọc Trai Thanh Lịch',
    subname: 'Phiên Bản Cao Cấp',
    editionTag: 'Premium Edition',
    price: '150.990.000',
    image: './images/motorcycle-white.png',
    accentColor: '#cbd5e1',
    tag: 'Vẻ đẹp thanh lịch vượt thời gian',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Ánh sơn trắng ngọc trai đa lớp phát sáng dịu nhẹ dưới ánh mặt trời, tôn vinh phong thái lịch lãm chuẩn mực theo phong cách Ý.',
    floorGlow: 'rgba(100, 116, 139, 0.35)',
  },
  {
    id: 'green',
    number: '04',
    name: 'Xanh Lục Bảo Tinh Hoa',
    subname: 'Phiên Bản Giới Hạn',
    editionTag: 'Exclusive Emerald',
    price: '154.990.000',
    image: './images/motorcycle-green.png',
    accentColor: '#34d399',
    tag: 'Độc bản quý phái kiêu hãnh',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Màu xanh lục bảo sâu thẳm hòa quyện cùng công nghệ sơn phủ tiên tiến từ Honda, tạo nên kiệt tác thẩm mỹ độc bản đầy kiêu hãnh.',
    floorGlow: 'rgba(52, 211, 153, 0.5)',
  }
];

export default function VehicleVariantsSection({ onOpenTestRide }) {
  const containerRef = useRef(null);
  const unifiedStageRef = useRef(null);
  const splitDoorsContainerRef = useRef(null);
  const doorLeftRef = useRef(null);
  const doorRightRef = useRef(null);
  const [activeVariant, setActiveVariant] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scrollytelling timeline:
      // - 0.0s to 10.0s: Showcase of the 4 vehicle versions on unifiedStage (zero seam, zero divider)
      // - 10.0s to 12.0s: The Surprise Gate Split (tách đôi sang 2 bên như cánh cổng mở ra)
      // - Simultaneously pushes up and scales DesignSection from underneath
      const totalScroll = 560;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScroll}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            let index = 0;
            if (p < 0.19) index = 0;
            else if (p < 0.43) index = 1;
            else if (p < 0.67) index = 2;
            else index = 3;
            setActiveVariant((prev) => (prev !== index ? index : prev));
          }
        }
      });

      // 1. Initial setup:
      const isMobile = window.innerWidth < 640;
      const bikeScale = isMobile ? 1.15 : 1;

      gsap.set(unifiedStageRef.current, { autoAlpha: 1 });
      gsap.set(splitDoorsContainerRef.current, { autoAlpha: 0 });
      gsap.set([doorLeftRef.current, doorRightRef.current], { xPercent: 0, force3D: true });

      gsap.set('.variant-bike-0', { opacity: 1, x: 0, y: 0, scale: bikeScale, filter: 'none', force3D: true });
      gsap.set(['.variant-bike-1', '.variant-bike-2', '.variant-bike-3'], { opacity: 0, x: 0, y: 0, scale: bikeScale, filter: 'none', force3D: true });

      // 2. High-performance octagonal background shapes
      gsap.set('.variant-bleed-1', { scale: 0, opacity: 1, rotate: -8, transformOrigin: '50% 50%', force3D: true });
      gsap.set('.variant-bleed-2', { scale: 1.35, opacity: 0, rotate: 0, transformOrigin: '50% 50%', force3D: true });
      gsap.set('.variant-bleed-3', { scale: 0, opacity: 1, rotate: -15, transformOrigin: '50% 50%', force3D: true });

      // 3. Ground floor glows
      gsap.set('.variant-floor-0', { opacity: 1 });
      gsap.set(['.variant-floor-1', '.variant-floor-2', '.variant-floor-3'], { opacity: 0 });

      // =========================================================================
      // BẢN 01 (Xám Đương Đại): Dừng tĩnh thư thái từ 0.0s đến 1.2s (Buffer 1.2s)
      // =========================================================================

      // =========================================================================
      // GIAI ĐOẠN 1: Chuyển sang Bản 02 (Đen Nhám Doanh Nhân) (1.2s -> 2.6s)
      // =========================================================================
      tl.to('.variant-bleed-1', {
        scale: 1.35,
        rotate: 12,
        duration: 1.4,
        ease: 'none',
        force3D: true,
      }, 1.2);

      tl.to('.variant-bike-0', { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 1.5);
      tl.to('.variant-bike-1', { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 1.5);
      tl.to('.variant-floor-0', { opacity: 0, duration: 0.8 }, 1.5);
      tl.to('.variant-floor-1', { opacity: 1, duration: 0.8 }, 1.5);
      tl.to('.variant-bleed-2', { opacity: 1, duration: 0.1 }, 2.5);

      // =========================================================================
      // BẢN 02 (Đen Nhám): Dừng tĩnh thư thái từ 2.6s đến 4.2s (Buffer 1.6s)
      // =========================================================================

      // =========================================================================
      // GIAI ĐOẠN 2: Chuyển sang Bản 03 (Trắng Ngọc Trai) (4.2s -> 5.6s)
      // =========================================================================
      tl.to('.variant-bleed-1', {
        scale: 0,
        rotate: -8,
        duration: 1.4,
        ease: 'none',
        force3D: true,
      }, 4.2);

      tl.to('.variant-bike-1', { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 4.5);
      tl.to('.variant-bike-2', { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 4.5);
      tl.to('.variant-floor-1', { opacity: 0, duration: 0.8 }, 4.5);
      tl.to('.variant-floor-2', { opacity: 1, duration: 0.8 }, 4.5);

      // =========================================================================
      // BẢN 03 (Trắng Ngọc Trai): Dừng tĩnh thư thái từ 5.6s đến 7.2s (Buffer 1.6s)
      // =========================================================================

      // =========================================================================
      // GIAI ĐOẠN 3: Chuyển sang Bản 04 (Xanh Lục Bảo) (7.2s -> 8.6s)
      // =========================================================================
      tl.to('.variant-bleed-3', {
        scale: 1.35,
        rotate: 18,
        duration: 1.4,
        ease: 'none',
        force3D: true,
      }, 7.2);

      tl.to('.variant-bike-2', { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 7.5);
      tl.to('.variant-bike-3', { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 7.5);
      tl.to('.variant-floor-2', { opacity: 0, duration: 0.8 }, 7.5);
      tl.to('.variant-floor-3', { opacity: 1, duration: 0.8 }, 7.5);

      // =========================================================================
      // BẢN 04 (Xanh Lục Bảo): Dừng tĩnh từ 8.6s đến 10.0s (Buffer 1.4s)
      // =========================================================================

      // =========================================================================
      // GIAI ĐOẠN 4: THE SURPRISE GATE SPLIT (TÁCH ĐÔI BẤT NGỜ KHI CUỘN TỚI)
      // - Suốt từ 0.0s đến 10.0s: Hoàn toàn bình thường mượt mà trên unifiedStage (KHÔNG CÓ VÁCH NGĂN)
      // - Đúng 10.0s: Chuyển giao sang 2 cánh cổng khép kín hoàn hảo
      // - 10.0s -> 12.0s: Cánh cổng tách đôi sang 2 bên như cánh cổng mở ra bất ngờ
      // - Section Thiết kế (#design) bên dưới được đẩy lên đầy uy lực
      // =========================================================================
      tl.set(splitDoorsContainerRef.current, { autoAlpha: 1 }, 10.0);
      tl.set(unifiedStageRef.current, { autoAlpha: 0 }, 10.0);

      // Fade out bottom swatches controls during split
      tl.to('.variant-controls', {
        opacity: 0,
        scale: 0.94,
        duration: 0.35,
        ease: 'power1.out',
      }, 10.0);

      // Cánh cổng trái tách sang trái
      tl.to(doorLeftRef.current, {
        xPercent: -102,
        duration: 2.0,
        ease: 'power2.inOut',
        force3D: true,
      }, 10.0);

      // Cánh cổng phải tách sang phải
      tl.to(doorRightRef.current, {
        xPercent: 102,
        duration: 2.0,
        ease: 'power2.inOut',
        force3D: true,
      }, 10.0);

      // Phần DesignSection (#design) bên dưới được đẩy lên như cánh cổng mở ra
      const revealEl = document.getElementById('design-reveal-stage') || document.getElementById('design');
      if (revealEl) {
        tl.fromTo(revealEl, {
          scale: 0.93,
          y: isMobile ? 50 : 100,
          opacity: 0.35,
          filter: 'blur(4px)',
        }, {
          scale: 1.0,
          y: 0,
          opacity: 1.0,
          filter: 'blur(0px)',
          duration: 2.0,
          ease: 'power2.out',
          force3D: true,
        }, 10.0);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Jump to specific variant scroll position
  const jumpToVariant = React.useCallback((index) => {
    soundFx.playClick();
    const targets = [0.05, 0.28, 0.52, 0.77];
    const trigger = ScrollTrigger.getAll().find(t => t.trigger === containerRef.current);
    if (trigger) {
      const targetScroll = trigger.start + (trigger.end - trigger.start) * targets[index];
      if (window.__lenis) {
        window.__lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: targetScroll,
          ease: 'power3.inOut'
        });
      }
    }
  }, []);

// Memoized stage view to prevent re-rendering the split doors when variant changes
const VehicleStageView = React.memo(function VehicleStageView({
  side,
  activeVariant,
  fixedVariantIndex,
  isDark,
  jumpToVariant,
  onOpenTestRide
}) {
  const isSplit = side === 'split-left' || side === 'split-right';
  const displayIndex = fixedVariantIndex !== undefined ? fixedVariantIndex : activeVariant;
  const currentData = VARIANTS[displayIndex];
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;

    return (
      <div className={`relative w-full h-full flex flex-col justify-between overflow-hidden transition-colors duration-500 border-t border-slate-200 dark:border-white/15 ${
        isDark ? 'bg-[#07090e]' : 'bg-[#f8fafc]'
      }`}>
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ contain: 'paint layout', transform: 'translateZ(0)' }}
        >
          <div 
            className="absolute inset-0 z-0 transition-opacity duration-500"
            style={{
              background: isDark 
                ? 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 45%, #07090e 85%)'
                : 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 35%, #e2e8f0 70%, #cbd5e1 100%)',
            }}
          />

          {isSplit ? (
            <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                style={{
                  width: '180vmax',
                  height: '180vmax',
                  transform: 'translate(-50%, -50%) scale(1.35) rotate(18deg)',
                  transformOrigin: '50% 50%',
                }}
              >
                <div 
                  className="w-full h-full"
                  style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                    background: isDark 
                      ? 'radial-gradient(circle at 50% 50%, #34d399 0%, #10b981 18%, #059669 38%, #047857 58%, #032d22 78%, #07090e 92%)'
                      : 'radial-gradient(circle at 50% 50%, #ffffff 0%, #ecfdf5 30%, #f1f5f9 70%, #e2e8f0 100%)',
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                <div
                  className="variant-bleed-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none flex items-center justify-center"
                  style={{
                    width: '180vmax',
                    height: '180vmax',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <div 
                    className="w-full h-full"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                      background: isDark 
                        ? 'radial-gradient(circle at 50% 50%, #ffffff 0%, #e2e8f0 18%, #93c5fd 40%, #1e3a8a 68%, #0f172a 85%, #07090e 95%)'
                        : 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f0f9ff 35%, #e2e8f0 70%, #cbd5e1 100%)',
                    }}
                  />
                </div>
              </div>

              <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                <div
                  className="variant-bleed-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none flex items-center justify-center"
                  style={{
                    width: '180vmax',
                    height: '180vmax',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <div 
                    className="w-full h-full"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                      background: isDark
                        ? 'radial-gradient(circle at 50% 50%, #f59e0b 0%, #d97706 18%, #b45309 35%, #78350f 55%, #1f1206 75%, #07090e 92%)'
                        : 'radial-gradient(circle at 50% 50%, #ffffff 0%, #fef3c7 30%, #f3f4f6 70%, #e2e8f0 100%)',
                    }}
                  />
                </div>
              </div>

              <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
                <div
                  className="variant-bleed-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none flex items-center justify-center"
                  style={{
                    width: '180vmax',
                    height: '180vmax',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <div 
                    className="w-full h-full"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                      background: isDark
                        ? 'radial-gradient(circle at 50% 50%, #34d399 0%, #10b981 18%, #059669 38%, #047857 58%, #032d22 78%, #07090e 92%)'
                        : 'radial-gradient(circle at 50% 50%, #ffffff 0%, #ecfdf5 30%, #f1f5f9 70%, #e2e8f0 100%)',
                    }}
                  />
                </div>
              </div>
            </>
          )}

          <div className={`absolute inset-0 bg-tech-grid z-40 pointer-events-none ${isDark ? 'opacity-10' : 'opacity-[0.04]'}`} />
        </div>

        <div className="relative z-50 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-[68px] sm:pt-20 lg:pt-24 pb-2 sm:pb-6 flex flex-col justify-between h-full pointer-events-auto">
          
          <div className={`flex items-center justify-between border-b pb-2 sm:pb-3 shrink-0 transition-colors ${
            isDark ? 'border-white/[0.08]' : 'border-slate-400'
          }`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-5 sm:w-6 h-[2px] bg-red-600" />
              <span className={`text-[10px] sm:text-xs font-black tracking-[0.2em] sm:tracking-[0.25em] uppercase font-body ${
                isDark ? 'text-neutral-300' : 'text-slate-950'
              }`}>
                BỘ SƯU TẬP PHIÊN BẢN MÀU SẮC • SH350i
              </span>
            </div>
            <span className={`font-mono text-[11px] sm:text-xs font-bold ${
              isDark ? 'text-neutral-400' : 'text-slate-800'
            }`}>
              {currentData.number} / 0{VARIANTS.length}
            </span>
          </div>

          <div className="relative w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-6 lg:gap-10 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1 z-30">
              <div className={`p-3.5 sm:p-5 lg:p-7 rounded-2xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between lg:min-h-[410px] ${
                isDark 
                  ? 'glass-panel border border-white/[0.1] shadow-2xl text-white' 
                  : 'bg-white/95 border border-slate-300 shadow-xl shadow-slate-900/10 text-slate-900'
              }`}>
                
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span 
                        className="w-2.5 h-2.5 rounded-full shadow-sm ring-2 ring-white/20 shrink-0"
                        style={{ backgroundColor: currentData.accentColor }}
                      />
                      <span className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded font-body ${
                        isDark 
                          ? 'bg-white/[0.08] text-white border border-white/[0.1]' 
                          : 'bg-slate-200 text-slate-950 border border-slate-300'
                      }`}>
                        {currentData.subname}
                      </span>
                      <span className={`text-[10px] sm:text-[11px] font-bold font-body hidden xs:inline ${
                        isDark ? 'text-neutral-400' : 'text-slate-800'
                      }`}>
                        {currentData.editionTag}
                      </span>
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-bold font-body hidden sm:inline ${
                      isDark ? 'text-neutral-400' : 'text-slate-800'
                    }`}>
                      {currentData.tag}
                    </span>
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <h3 className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black font-display tracking-tight transition-colors ${
                      isDark ? 'text-white' : 'text-slate-950'
                    }`}>
                      {currentData.name}
                    </h3>
                  </div>

                  <p className={`text-[11px] sm:text-xs lg:text-sm font-body leading-relaxed mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3 transition-colors ${
                    isDark ? 'text-neutral-300' : 'text-slate-900 font-semibold'
                  }`}>
                    {currentData.desc}
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3 pt-1">
                  <div className={`grid grid-cols-3 gap-1 sm:gap-2 py-2 sm:py-2.5 px-2 rounded-xl transition-colors ${
                    isDark ? 'bg-white/[0.05] border border-white/[0.08]' : 'bg-slate-100/90 border border-slate-300/80 shadow-sm'
                  }`}>
                    <div className="flex flex-col items-center text-center px-1">
                      <span className={`text-[9px] sm:text-[10px] flex items-center gap-1 font-body font-bold ${
                        isDark ? 'text-neutral-400' : 'text-slate-800'
                      }`}>
                        <Gauge size={11} className="text-red-500 shrink-0" /> Dung tích
                      </span>
                      <span className={`text-xs sm:text-sm font-black font-display mt-0.5 tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-950'
                      }`}>
                        {currentData.specs.speed}
                      </span>
                      <span className={`text-[9px] font-mono hidden xs:block font-bold ${
                        isDark ? 'text-neutral-500' : 'text-slate-700'
                      }`}>eSP+ 4-van</span>
                    </div>
                    <div className="flex flex-col items-center text-center px-1">
                      <span className={`text-[9px] sm:text-[10px] flex items-center gap-1 font-body font-bold ${
                        isDark ? 'text-neutral-400' : 'text-slate-800'
                      }`}>
                        <Zap size={11} className="text-amber-500 shrink-0" /> Công suất
                      </span>
                      <span className={`text-xs sm:text-sm font-black font-display mt-0.5 tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-950'
                      }`}>
                        {currentData.specs.power}
                      </span>
                      <span className={`text-[9px] font-mono hidden xs:block font-bold ${
                        isDark ? 'text-neutral-500' : 'text-slate-700'
                      }`}>@7.500 rpm</span>
                    </div>
                    <div className="flex flex-col items-center text-center px-1">
                      <span className={`text-[9px] sm:text-[10px] flex items-center gap-1 font-body font-bold ${
                        isDark ? 'text-neutral-400' : 'text-slate-800'
                      }`}>
                        <ShieldCheck size={11} className="text-emerald-500 shrink-0" /> Mô-men
                      </span>
                      <span className={`text-xs sm:text-sm font-black font-display mt-0.5 tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-950'
                      }`}>
                        {currentData.specs.torque}
                      </span>
                      <span className={`text-[9px] font-mono hidden xs:block font-bold ${
                        isDark ? 'text-neutral-500' : 'text-slate-700'
                      }`}>@5.250 rpm</span>
                    </div>
                  </div>

                  <div className={`pt-2 sm:pt-3 border-t flex items-center justify-between gap-3 transition-colors ${
                    isDark ? 'border-white/[0.08]' : 'border-slate-300'
                  }`}>
                    <div className="flex flex-col">
                      <span className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-body font-bold ${
                        isDark ? 'text-neutral-400' : 'text-slate-800'
                      }`}>
                        Giá đề xuất (đã có VAT)
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-sm sm:text-base lg:text-lg font-black font-display tracking-tight ${
                          isDark ? 'text-white' : 'text-slate-950'
                        }`}>
                          {currentData.price}
                        </span>
                        <span className="text-[10px] font-bold text-red-600 font-mono">VNĐ</span>
                      </div>
                    </div>
                    <button
                      onClick={() => { soundFx.playRev(); onOpenTestRide(currentData.name); }}
                      className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl honda-red-btn text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer font-display shadow-lg shadow-red-900/30 flex items-center gap-1.5 shrink-0"
                    >
                      <span>Đăng Ký Bản Này</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 relative flex items-center justify-center h-[28vh] sm:h-[38vh] lg:h-[54vh] max-h-[255px] sm:max-h-[360px] lg:max-h-none w-full z-20 my-1 sm:my-0">
              
              <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                
                {isSplit ? (
                  <>
                    <div 
                      className="absolute bottom-1 sm:bottom-4 w-[86%] sm:w-[78%] h-10 sm:h-12 rounded-full blur-2xl pointer-events-none"
                      style={{ backgroundColor: VARIANTS[3].floorGlow }}
                    />
                    <div className={`absolute bottom-2 sm:bottom-6 w-[76%] sm:w-[68%] h-4 sm:h-5 rounded-full blur-md pointer-events-none z-10 ${
                      isDark ? 'bg-black/95' : 'bg-slate-950/45'
                    }`} />
                    <img
                      src={VARIANTS[3].image}
                      alt={`Honda SH350i ${VARIANTS[3].name}`}
                      decoding="async"
                      loading="eager"
                      className={`absolute inset-0 m-auto max-w-full max-h-full object-contain select-none pointer-events-none z-20 ${
                        isDark 
                          ? 'drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]' 
                          : 'drop-shadow-[0_20px_35px_rgba(15,23,42,0.45)]'
                      }`}
                      style={{ transform: `scale(${isMobile ? 1.15 : 1}) translate3d(0,0,0)` }}
                    />
                  </>
                ) : (
                  <>
                    {VARIANTS.map((variant, idx) => (
                      <div 
                        key={`${side}-floor-${variant.id}`}
                        className={`variant-floor-${idx} absolute bottom-1 sm:bottom-4 w-[86%] sm:w-[78%] h-10 sm:h-12 rounded-full blur-2xl pointer-events-none will-change-opacity`}
                        style={{
                          backgroundColor: variant.floorGlow,
                        }}
                      />
                    ))}
                    <div className={`absolute bottom-2 sm:bottom-6 w-[76%] sm:w-[68%] h-4 sm:h-5 rounded-full blur-md pointer-events-none z-10 ${
                      isDark ? 'bg-black/95' : 'bg-slate-950/45'
                    }`} />

                    {VARIANTS.map((variant, idx) => (
                      <img
                        key={`${side}-bike-${variant.id}`}
                        src={variant.image}
                        alt={`Honda SH350i ${variant.name}`}
                        decoding="async"
                        loading="eager"
                        className={`variant-bike-${idx} absolute inset-0 m-auto max-w-full max-h-full object-contain will-change-opacity select-none pointer-events-none z-20 ${
                          isDark 
                            ? 'drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]' 
                            : 'drop-shadow-[0_20px_35px_rgba(15,23,42,0.45)]'
                        }`}
                        style={{ transform: 'translate3d(0,0,0)' }}
                      />
                    ))}
                  </>
                )}
              </div>

            </div>

          </div>

          <div className="variant-controls flex flex-col items-center justify-center gap-1 sm:gap-2 pt-1 sm:pt-2 shrink-0 transition-opacity">
            <div className={`flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full backdrop-blur-2xl transition-all duration-300 ${
              isDark 
                ? 'glass-panel border border-white/[0.09] shadow-xl' 
                : 'bg-white/95 border border-slate-300 shadow-md'
            }`}>
              {VARIANTS.map((v, i) => {
                const isActive = (isSplit ? displayIndex : activeVariant) === i;
                return (
                  <button
                    key={`${side}-swatch-${v.id}`}
                    onClick={() => {
                      if (!isSplit) jumpToVariant(i);
                    }}
                    onMouseEnter={() => {
                      if (!isSplit) soundFx.playHover();
                    }}
                    className={`group relative flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full transition-all duration-300 ${
                      isSplit ? 'cursor-default pointer-events-none' : 'cursor-pointer'
                    } ${
                      isActive 
                        ? (isDark ? 'bg-white/15 shadow-sm border border-white/20' : 'bg-slate-200 shadow-sm border border-slate-400 text-slate-950')
                        : (isDark ? 'hover:bg-white/[0.04] opacity-70 hover:opacity-100' : 'hover:bg-slate-100 opacity-80 hover:opacity-100')
                    }`}
                  >
                    <span 
                      className="block w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border border-white/25 shadow-inner shrink-0"
                      style={{ backgroundColor: v.accentColor }}
                    />
                    <span className={`text-[10px] sm:text-[11px] tracking-wide font-body transition-colors ${
                      isActive 
                        ? (isDark ? 'text-white font-semibold' : 'text-slate-950 font-black') 
                        : (isDark ? 'text-neutral-400 group-hover:text-white' : 'text-slate-800 group-hover:text-slate-950 font-bold')
                    }`}>
                      {v.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div 
              onClick={() => {
                if (isSplit) return;
                const trigger = ScrollTrigger.getAll().find(t => t.trigger === containerRef.current);
                if (trigger) {
                  if (window.__lenis) {
                    window.__lenis.scrollTo(trigger.end + 5, { duration: 1.4 });
                  } else {
                    gsap.to(window, {
                      duration: 1.4,
                      scrollTo: trigger.end + 5,
                      ease: 'power2.inOut'
                    });
                  }
                } else {
                  const el = document.getElementById('design');
                  if (el) {
                    if (window.__lenis) {
                      window.__lenis.scrollTo(el, { duration: 1.4 });
                    } else {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }
              }}
              className={`flex items-center justify-center gap-1 text-[10px] sm:text-xs font-body cursor-pointer transition-colors ${
                isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-800 hover:text-black font-bold'
              }`}
            >
              <ArrowDown size={12} className="text-red-600 animate-bounce" />
              <span className={`tracking-wider text-[11px] sm:text-xs font-bold ${
                isDark ? 'text-neutral-300' : 'text-slate-900'
              }`}>Cuộn xuống</span>
            </div>
          </div>

        </div>
      </div>
    );
});

  return (
    <section 
      id="colors" 
      ref={containerRef} 
      className="relative z-30 w-full h-screen overflow-hidden select-none bg-transparent"
      style={{
        marginTop: '-100vh',
      }}
    >
      <div 
        ref={unifiedStageRef}
        className="absolute inset-0 w-full h-full z-20 pointer-events-auto"
      >
        <VehicleStageView
          side="main"
          activeVariant={activeVariant}
          isDark={isDark}
          jumpToVariant={jumpToVariant}
          onOpenTestRide={onOpenTestRide}
        />
      </div>

      <div 
        ref={splitDoorsContainerRef}
        className="absolute inset-0 w-full h-full z-30 pointer-events-none opacity-0 invisible"
      >
        <div 
          ref={doorLeftRef}
          className="absolute inset-y-0 left-0 w-1/2 overflow-hidden pointer-events-none will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <div className="absolute inset-y-0 left-0 w-[100vw] h-full pointer-events-none">
            <VehicleStageView
              side="split-left"
              fixedVariantIndex={3}
              isDark={isDark}
              jumpToVariant={jumpToVariant}
              onOpenTestRide={onOpenTestRide}
            />
          </div>
        </div>

        <div 
          ref={doorRightRef}
          className="absolute inset-y-0 right-0 w-1/2 overflow-hidden pointer-events-none will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <div className="absolute inset-y-0 right-0 w-[100vw] h-full pointer-events-none">
            <VehicleStageView
              side="split-right"
              fixedVariantIndex={3}
              isDark={isDark}
              jumpToVariant={jumpToVariant}
              onOpenTestRide={onOpenTestRide}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
