import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { ChevronRight, ArrowDown, Award, Gauge, ShieldCheck, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BannerSection({ onOpenTestRide }) {
  const bannerRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered zoom effect on the banner background and parallax on text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Banner background zoom effect upon scrolling
      tl.to(bgRef.current, {
        scale: 1.35,
        y: '10%',
        ease: 'none',
      }, 0);

      // Banner text elements float up with parallax
      tl.to(contentRef.current, {
        y: -100,
        opacity: 0.2,
        ease: 'none',
      }, 0);

    }, bannerRef);

    return () => ctx.revert();
  }, []);

  const scrollToVariants = () => {
    soundFx.playRev();
    gsap.to(window, {
      duration: 1.3,
      scrollTo: { y: '#colors', offsetY: 0 },
      ease: 'power3.inOut'
    });
  };

  return (
    <section 
      id="banner" 
      ref={bannerRef}
      className="relative w-full h-screen overflow-hidden bg-[#08090d] select-none flex flex-col justify-between"
    >
      {/* 1. Standalone Banner Background (banner-bg.jpg with Scroll Zoom Effect) */}
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
        {/* Subtle Natural Vignette & Atmosphere Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        <div className="absolute inset-0 bg-tech-grid opacity-15" />
      </div>

      {/* 2. Banner Content Stage (Text Elements & Interactive Button) */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 flex flex-col justify-between h-full"
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
          <span>Cuộn chuột để zoom và chuyển tiếp vào các phiên bản màu sắc</span>
        </div>
      </div>
    </section>
  );
}
