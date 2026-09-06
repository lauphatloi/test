import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { ChevronRight, ArrowDown, Award, Gauge, ShieldCheck, Zap, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BannerSection({ onOpenTestRide }) {
  const { isDark } = useTheme();
  const bannerRef = useRef(null);
  const bgRef = useRef(null);
  const bannerContentRef = useRef(null);
  const portalLayerRef = useRef(null);
  const portalContentRef = useRef(null);
  const portalSvgRef = useRef(null);
  const portalGlowRingRef = useRef(null);
  const portalCoreRingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Calculate max radius needed to clear all four corners of viewport from center
      const getMaxRadius = () => (Math.hypot(window.innerWidth, window.innerHeight) / 2) * 1.15;

      const updateAperture = (r) => {
        const safeR = Math.max(0, Number(r) || 0);
        if (portalGlowRingRef.current) portalGlowRingRef.current.setAttribute('r', safeR);
        if (portalCoreRingRef.current) portalCoreRingRef.current.setAttribute('r', safeR);
        if (portalLayerRef.current) {
          const clip = `circle(${safeR}px at 50% 50%)`;
          portalLayerRef.current.style.clipPath = clip;
          portalLayerRef.current.style.webkitClipPath = clip;
        }
      };

      // Set initial aperture state (0px radius, hidden)
      updateAperture(0);
      gsap.set(portalSvgRef.current, { opacity: 0 });

      // Pinned ScrollTrigger:
      // 1. Banner zooms while pinned (zoom ghim cứng)
      // 2. High-precision vector aperture circle in the center opens up smoothly (no pixelation or blur)
      // 3. Showroom portal revealed with high-contrast text and edition preview chips
      // 4. Generous resting time for showroom portal
      // 5. Smooth layer overlap: portalContent drifts up & dims slightly while VehicleVariantsSection slides up over it
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top top',
          end: '+=320%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Stage 1: Banner Zoom while pinned (0.0 -> 1.1)
      // On vertical mobile screens, use a subtle zoom (1.06) so the motorcycle remains fully framed; on desktop use 1.28
      const isMobile = window.innerWidth < 640;
      tl.to(bgRef.current, {
        scale: isMobile ? 1.06 : 1.28,
        y: isMobile ? '2%' : '5%',
        ease: 'none',
        duration: 1.1,
      }, 0);

      // Banner text elements gently fade out and scale up
      tl.to(bannerContentRef.current, {
        opacity: 0,
        scale: 1.06,
        y: -35,
        filter: 'blur(8px)',
        duration: 0.5,
        ease: 'power2.inOut',
        pointerEvents: 'none',
      }, 0.05);

      // Stage 2: Central white vector ring appears cleanly at center
      tl.fromTo(portalSvgRef.current, {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 0.18,
        ease: 'power1.out',
      }, 0.2);

      // Stage 3: Smooth synchronized vector aperture expansion (0.25 to 1.3)
      // Pure mathematical vector radius - completely eliminates blurriness, stretching and raster pixelation
      const apertureState = { radius: 0 };
      tl.to(apertureState, {
        radius: () => getMaxRadius(),
        duration: 1.05,
        ease: 'power2.inOut',
        onUpdate: () => {
          updateAperture(apertureState.radius);
        },
      }, 0.25);

      // Stage 4: As the white ring expands past the screen edges, gently dissolve its stroke
      tl.to(portalSvgRef.current, {
        opacity: 0,
        ease: 'power1.in',
        duration: 0.25,
      }, 1.05);

      // Stage 5: Smooth Layer Overlap (Đè lớp) (2.2 to 3.2)
      // While VehicleVariantsSection slides up over BannerSection,
      // the showroom portal content subtly drifts up and dims for deep cinematic parallax
      if (portalContentRef.current) {
        tl.to(portalContentRef.current, {
          y: -80,
          scale: 0.95,
          opacity: 0.3,
          filter: 'blur(5px)',
          duration: 1.0,
          ease: 'power1.inOut',
        }, 2.2);
      }

    }, bannerRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll directly through the aperture to the vehicle versions section
  const scrollToVariants = () => {
    soundFx.playRev();
    const st = ScrollTrigger.getAll().find(t => t.trigger === bannerRef.current);
    if (st) {
      // Scroll past the banner pin to land right at #colors
      gsap.to(window, {
        duration: 1.6,
        scrollTo: st.end + 10,
        ease: 'power3.inOut',
      });
    } else {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: '#colors', offsetY: 0 },
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <section 
      id="banner" 
      ref={bannerRef}
      className="relative w-full h-screen overflow-hidden bg-[#08090d] select-none"
    >
      {/* ============================================================ */}
      {/* 1. PINNED BANNER LAYER (banner-bg.jpg with Zoom Pinned Effect) */}
      {/* ============================================================ */}
      <div 
        ref={bgRef}
        className={`absolute inset-0 w-full h-full will-change-transform scale-100 pointer-events-none bg-cover bg-no-repeat banner-bg-frame transition-all duration-500 ${
          isDark ? '' : 'brightness-[0.86] contrast-[1.03]'
        }`}
        style={{
          backgroundImage: `url('./images/banner-bg.jpg')`,
        }}
      >
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isDark 
            ? 'bg-gradient-to-t from-[#08090d] from-20% via-black/40 to-black/75 sm:via-black/35 sm:to-black/70' 
            : 'bg-gradient-to-t from-slate-950/90 from-15% via-slate-950/45 to-slate-950/65'
        }`} />
        <div className={`absolute inset-0 bg-radial-vignette transition-opacity duration-500 ${isDark ? 'opacity-85 sm:opacity-80' : 'opacity-65'}`} />
        <div className="absolute inset-0 bg-tech-grid opacity-15" />
      </div>

      {/* Banner Text Elements & Interactive Buttons */}
      <div 
        ref={bannerContentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-4 sm:pb-12 flex flex-col justify-between h-full pointer-events-auto"
      >
        {/* Top Tagline */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="w-5 sm:w-6 h-[2px] bg-red-600 shrink-0" />
          <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.16em] sm:tracking-[0.3em] uppercase font-body truncate text-slate-100 drop-shadow-md">
            HONDA MOTOR VIỆT NAM • THỦ LĨNH XE GA CAO CẤP
          </span>
        </div>

        {/* Center/Bottom Banner Messaging - Anchored comfortably below the motorcycle on mobile */}
        <div className="max-w-3xl sm:my-auto mt-auto mb-1 py-1 sm:py-6">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-4 backdrop-blur-md font-body bg-black/55 border border-white/25 text-white shadow-sm">
            <Award size={13} className="text-red-500 shrink-0" />
            <span>ĐẲNG CẤP CHÂU ÂU • VẺ ĐẸP SANG TRỌNG</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-6xl lg:text-7xl tracking-tight leading-tight uppercase text-white drop-shadow-lg">
            HONDA <span className="text-white drop-shadow-lg">SH350</span><span className="text-red-500 drop-shadow-lg">i</span>
          </h1>

          <p className="mt-2.5 sm:mt-4 text-xs sm:text-base font-body leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none text-slate-100 drop-shadow-md font-medium">
            Tuyệt tác kết hợp hài hòa giữa ngôn ngữ thiết kế điêu khắc thượng lưu nước Ý và sức mạnh động cơ eSP+ 330cc thế hệ mới. Khẳng định vị thế dẫn đầu và phong thái đĩnh đạc của chủ nhân trên mọi hành trình.
          </p>

          {/* Quick Specifications Pills */}
          <div className="mt-3.5 sm:mt-6 flex flex-wrap gap-2 sm:gap-3 text-[11px] sm:text-xs font-body">
            <div className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1.5 sm:gap-2 bg-black/60 border border-white/25 text-white shadow-sm font-medium">
              <Gauge size={13} className="text-red-500 shrink-0" />
              <span>Động cơ <strong>329.6cc eSP+</strong></span>
            </div>
            <div className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1.5 sm:gap-2 bg-black/60 border border-white/25 text-white shadow-sm font-medium">
              <ShieldCheck size={13} className="text-red-500 shrink-0" />
              <span>Phanh <strong>ABS 2 Kênh & HSTC</strong></span>
            </div>
            <div className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1.5 sm:gap-2 bg-black/60 border border-white/25 text-white shadow-sm font-medium">
              <Zap size={13} className="text-red-500 shrink-0" />
              <span>Chuẩn khí thải <strong>Euro 5</strong></span>
            </div>
          </div>

          {/* Banner Interactive Buttons */}
          <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
            <button
              onClick={scrollToVariants}
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full honda-red-btn text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-display"
            >
              <span>Khám Phá Các Phiên Bản Xe</span>
              <ChevronRight size={15} />
            </button>

            <button
              onClick={() => { soundFx.playRev(); onOpenTestRide(); }}
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer font-body text-center bg-white/15 hover:bg-white/25 border border-white/30 text-white backdrop-blur-md shadow-md"
            >
              Đăng Ký Lái Thử
            </button>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div 
          onClick={scrollToVariants}
          className="w-full flex items-center justify-center gap-2 text-xs font-body cursor-pointer transition-colors pt-2 text-slate-300 hover:text-white"
        >
          <ArrowDown size={14} className="text-red-600 animate-bounce" />
          <span className="tracking-wider text-xs font-medium">Cuộn xuống</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. VECTOR APERTURE RING AT CENTER (Razor-sharp, non-scaling) */}
      {/* ============================================================ */}
      <svg
        ref={portalSvgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible opacity-0"
        aria-hidden="true"
      >
        <defs>
          <filter id="portal-ring-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Luminous aura halo ring */}
        <circle
          ref={portalGlowRingRef}
          cx="50%"
          cy="50%"
          r="0"
          fill="none"
          stroke={isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(100, 116, 139, 0.45)"}
          strokeWidth="3.5"
          filter="url(#portal-ring-glow)"
        />

        {/* Razor-sharp core precision line */}
        <circle
          ref={portalCoreRingRef}
          cx="50%"
          cy="50%"
          r="0"
          fill="none"
          stroke={isDark ? "#ffffff" : "#64748b"}
          strokeWidth="2"
          strokeOpacity="0.95"
        />
      </svg>

      {/* ============================================================ */}
      {/* 3. PORTAL LAYER REVEALED BY THE CIRCULAR MASK               */}
      {/*    (Dedicated Studio Showroom Background - NOT banner-bg)    */}
      {/* ============================================================ */}
      <div 
        ref={portalLayerRef}
        className={`absolute inset-0 w-full h-full z-20 overflow-hidden pointer-events-none flex items-center justify-center will-change-[clip-path] transition-colors duration-500 ${
          isDark ? 'bg-[#07090e]' : 'bg-[#dce3ea]'
        }`}
        style={{
          clipPath: 'circle(0px at 50% 50%)',
          WebkitClipPath: 'circle(0px at 50% 50%)',
        }}
      >
        {/* Studio Lighting inside the portal */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] ${
            isDark ? 'bg-slate-700/20' : 'bg-slate-400/20'
          }`} />
          <div className="absolute inset-0 bg-tech-grid opacity-15" />
        </div>

        {/* Center Portal Content: Revealing the Vehicle Versions Preview */}
        <div 
          ref={portalContentRef}
          className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center justify-center translate-y-1 sm:translate-y-4 will-change-transform pointer-events-auto"
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 backdrop-blur-md font-body ${
            isDark ? 'bg-white/[0.08] border border-white/15 text-neutral-200' : 'bg-white/95 border border-slate-300 text-slate-900 shadow-sm'
          }`}>
            <Sparkles size={14} className="text-red-500" />
            <span>KHÔNG GIAN TRƯNG BÀY XE SANG</span>
          </div>

          <h2 className={`font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            BỘ SƯU TẬP PHIÊN BẢN SH350i
          </h2>
          
          <p className={`mt-2.5 sm:mt-3.5 text-xs sm:text-base font-body max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-neutral-300' : 'text-slate-800 font-semibold'
          }`}>
            Khám phá 4 phong thái màu sắc đương đại được chế tác tỉ mỉ cho từng đẳng cấp phong cách và uy quyền của thủ lĩnh.
          </p>

          {/* Minimalist Centered Scroll Indicator */}
          <div 
            onClick={scrollToVariants}
            className={`mt-8 sm:mt-12 flex flex-col items-center justify-center gap-2.5 text-xs font-body cursor-pointer transition-all duration-300 group select-none ${
              isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            <span className="tracking-[0.25em] text-[11px] sm:text-xs uppercase font-bold text-center">
              Cuộn xuống để khám phá
            </span>
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform ${
              isDark 
                ? 'border-white/20 bg-white/[0.04] group-hover:border-red-500/60' 
                : 'border-slate-300 bg-white/80 group-hover:border-red-600 shadow-xs'
            }`}>
              <ArrowDown size={15} className="text-red-600 animate-bounce" />
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
