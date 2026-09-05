import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { ChevronRight, ArrowDown, Award, Gauge, ShieldCheck, Zap, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BannerSection({ onOpenTestRide }) {
  const bannerRef = useRef(null);
  const bgRef = useRef(null);
  const bannerContentRef = useRef(null);
  const portalLayerRef = useRef(null);
  const portalRingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned ScrollTrigger:
      // 1. Banner zooms while pinned (zoom ghim cứng)
      // 2. A circle in the center opens up as user scrolls (vòng tròn ở trung tâm mở ra theo cuộn)
      // 3. Transitions smoothly into the vehicle versions section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Stage 1: Banner Zoom while pinned (0.0 -> 0.6)
      tl.to(bgRef.current, {
        scale: 1.3,
        y: '5%',
        ease: 'none',
        duration: 1.5,
      }, 0);

      // Banner text elements gently fade out and scale up
      tl.to(bannerContentRef.current, {
        opacity: 0,
        scale: 1.06,
        y: -35,
        filter: 'blur(8px)',
        duration: 0.6,
        ease: 'power2.inOut',
        pointerEvents: 'none',
      }, 0.05);

      // Stage 2: Central white border ring (vòng tròn viền trắng ở trung tâm)
      tl.fromTo(portalRingRef.current, {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
        ease: 'power1.out',
      }, 0.35);

      // Mở rộng kích thước đồng bộ cùng hành trình 1.4s (từ 0.4 đến 1.8)
      tl.to(portalRingRef.current, {
        scale: 18,
        ease: 'power2.inOut',
        duration: 1.4,
      }, 0.4);

      // Khi đi được 3/10 hành trình (0.4 + 1.4 * 0.3 = 0.82) thì bắt đầu mờ dần,
      // tới 7/10 hành trình (0.4 + 1.4 * 0.7 = 1.38) bắt buộc phải mất hoàn toàn (opacity: 0)
      tl.to(portalRingRef.current, {
        opacity: 0,
        ease: 'power1.in',
        duration: 0.56,
      }, 0.82);

      // Stage 3: Circle at the center opens up according to scroll (clipPath: 0% -> 150%)
      tl.fromTo(portalLayerRef.current, {
        clipPath: 'circle(0% at 50% 50%)',
      }, {
        clipPath: 'circle(140% at 50% 50%)',
        duration: 1.4,
        ease: 'power2.inOut',
      }, 0.4);

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
        className="absolute inset-0 w-full h-full will-change-transform scale-100 pointer-events-none"
        style={{
          backgroundImage: `url('./images/banner-bg.jpg')`,
          backgroundPosition: 'center 45%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        <div className="absolute inset-0 bg-tech-grid opacity-15" />
      </div>

      {/* Banner Text Elements & Interactive Buttons */}
      <div 
        ref={bannerContentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 flex flex-col justify-between h-full pointer-events-auto"
      >
        {/* Top Tagline */}
        <div className="flex items-center gap-3">
          <span className="w-6 h-[2px] bg-red-600" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-neutral-300 font-body">
            HONDA MOTOR VIỆT NAM • THỦ LĨNH XE GA CAO CẤP
          </span>
        </div>

        {/* Center Banner Messaging */}
        <div className="max-w-3xl my-auto py-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-neutral-200 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md font-body">
            <Award size={13} className="text-white" />
            <span>ĐẲNG CẤP CHÂU ÂU • VẺ ĐẸP SANG TRỌNG</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-tight uppercase">
            HONDA <span className="text-gradient-platinum">SH350i</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-body leading-relaxed max-w-2xl">
            Tuyệt tác kết hợp hài hòa giữa ngôn ngữ thiết kế điêu khắc thượng lưu nước Ý và sức mạnh động cơ eSP+ 330cc thế hệ mới. Khẳng định vị thế dẫn đầu và phong thái đĩnh đạc của chủ nhân trên mọi hành trình.
          </p>

          {/* Quick Specifications Pills */}
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-body text-neutral-300">
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

          {/* Banner Interactive Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToVariants}
              className="px-7 py-3.5 rounded-full honda-red-btn text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-display"
            >
              <span>Khám Phá Các Phiên Bản Xe</span>
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

        {/* Bottom Scroll Cue */}
        <div 
          onClick={scrollToVariants}
          className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-400 font-body cursor-pointer hover:text-white transition-colors"
        >
          <ArrowDown size={13} className="animate-bounce" />
          <span>Cuộn chuột để mở vòng tròn trung tâm vào phần các phiên bản</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. CIRCULAR PORTAL RING AT CENTER (Opens up as you scroll)  */}
      {/* ============================================================ */}
      <div 
        ref={portalRingRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/90 shadow-[0_0_25px_rgba(255,255,255,0.5)] pointer-events-none z-30 opacity-0 will-change-transform"
      />

      {/* ============================================================ */}
      {/* 3. PORTAL LAYER REVEALED BY THE CIRCULAR MASK               */}
      {/*    (Dedicated Studio Showroom Background - NOT banner-bg)    */}
      {/* ============================================================ */}
      <div 
        ref={portalLayerRef}
        className="absolute inset-0 w-full h-full z-20 overflow-hidden bg-[#07090e] pointer-events-none flex items-center justify-center will-change-[clip-path]"
        style={{
          clipPath: 'circle(0% at 50% 50%)',
        }}
      >
        {/* Studio Lighting inside the portal */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-slate-700/20 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-tech-grid opacity-15" />
        </div>

        {/* Center Portal Content: Revealing the Vehicle Versions Preview */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-neutral-200 text-xs font-semibold uppercase tracking-wider mb-3 backdrop-blur-md font-body">
            <Sparkles size={13} className="text-white" />
            <span>KHÔNG GIAN TRƯNG BÀY XE SANG</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
            BỘ SƯU TẬP PHIÊN BẢN SH350i
          </h2>
          
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-body max-w-lg mx-auto">
            Khám phá 4 phong thái màu sắc đương đại được chế tác tỉ mỉ cho từng đẳng cấp phong cách.
          </p>

          {/* Vehicle Silhouette & Shadow Preview */}
          <div className="relative w-[85vw] max-w-[650px] h-[32vh] sm:h-[40vh] my-4 flex items-center justify-center">
            <div className="absolute bottom-4 w-[75%] h-8 bg-slate-400/20 rounded-full blur-xl" />
            <div className="absolute bottom-6 w-[65%] h-4 bg-black/90 rounded-full blur-md" />
            <img 
              src="./images/motorcycle-grey.png" 
              alt="Honda SH350i" 
              className="max-w-full max-h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400 font-body animate-bounce">
            <ArrowDown size={14} className="text-red-500" />
            <span>Tiếp tục cuộn để tương tác và chọn phiên bản</span>
            <ArrowDown size={14} className="text-red-500" />
          </div>
        </div>

      </div>

    </section>
  );
}
