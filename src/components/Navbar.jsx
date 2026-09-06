import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sliders, Calendar, ArrowUpRight, Menu, X } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Navbar({ onOpenTestRide, onOpenSpecs }) {
  const { isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = soundFx.toggle();
    setSoundActive(active);
  };

  const scrollToSection = (targetId) => {
    soundFx.playClick();
    setMobileMenuOpen(false);

    if (targetId === '#colors' || targetId === '#design') {
      const elId = targetId.replace('#', '');
      const st = ScrollTrigger.getAll().find(t => t.trigger && (t.trigger.id === elId || t.trigger === document.getElementById(elId)));
      if (st) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: st.start + 2,
          ease: 'power3.inOut'
        });
        return;
      }
    }

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: targetId, offsetY: 70 },
      ease: 'power3.inOut'
    });
  };

  const navLinks = [
    { label: 'Tổng Quan', id: '#banner' },
    { label: 'Phiên Bản Màu', id: '#colors' },
    { label: 'Thiết Kế', id: '#design' },
    { label: 'Động Cơ eSP+', id: '#engine' },
    { label: 'Công Nghệ', id: '#technology' },
    { label: 'Bảng Giá & Trả Góp', id: '#pricing' },
  ];

  return (
    <>
      {/* Top Scroll Indicator - Clean refined Honda red */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/5">
        <div 
          className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-slate-200 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled 
            ? (isDark 
                ? 'py-3 bg-[#08090d]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-lg text-white' 
                : 'py-3 bg-white/92 backdrop-blur-xl border-b border-slate-200 shadow-sm text-slate-900')
            : (isDark 
                ? 'py-5 sm:py-6 bg-gradient-to-b from-[#08090d]/90 via-[#08090d]/40 to-transparent text-white' 
                : 'py-5 sm:py-6 bg-gradient-to-b from-white/95 via-white/50 to-transparent text-slate-900')
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - Official Honda Corporate Style */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); scrollToSection(0); }}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="flex flex-col">
              <span className={`text-[10px] font-semibold tracking-[0.25em] uppercase transition-colors ${
                isDark ? 'text-neutral-400 group-hover:text-white' : 'text-slate-500 group-hover:text-red-600'
              }`}>
                HONDA MOTOR
              </span>
              <div className="flex items-center gap-2">
                <span className={`font-display text-xl sm:text-2xl font-bold tracking-tight transition-all ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  SH350i
                </span>
                <span className={`px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase rounded ${
                  isDark ? 'bg-white/10 text-neutral-200 border border-white/10' : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  eSP+
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-1 p-1 rounded-full backdrop-blur-md ${
            isDark ? 'bg-white/[0.03] border border-white/[0.07]' : 'bg-slate-100/90 border border-slate-200/90 shadow-sm'
          }`}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-4 py-1.5 text-xs font-medium tracking-wide rounded-full transition-all cursor-pointer font-body ${
                  isDark 
                    ? 'text-neutral-300 hover:text-white hover:bg-white/[0.06]' 
                    : 'text-slate-700 hover:text-red-600 hover:bg-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundActive ? "Tắt âm thanh môi trường" : "Bật âm thanh động cơ"}
              className={`relative p-2 rounded-full border transition-all cursor-pointer flex items-center gap-2 text-xs font-medium ${
                isDark 
                  ? (soundActive 
                      ? 'border-white/20 bg-white/10 text-white' 
                      : 'border-white/[0.08] bg-white/[0.02] text-neutral-400 hover:text-white hover:border-white/15')
                  : (soundActive 
                      ? 'border-red-300 bg-red-50 text-red-600 shadow-sm' 
                      : 'border-slate-300 bg-white text-slate-800 hover:text-slate-950 hover:border-slate-400 shadow-sm font-semibold')
              }`}
            >
              {soundActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span className="text-[11px] hidden md:inline font-body">
                {soundActive ? 'Audio ON' : 'Audio OFF'}
              </span>
            </button>

            {/* Quick Specs Trigger */}
            <button
              onClick={() => { soundFx.playClick(); onOpenSpecs(); }}
              className={`px-3.5 py-2 rounded-full border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer font-body ${
                isDark 
                  ? 'border-white/[0.08] bg-white/[0.02] text-neutral-300 hover:text-white hover:border-white/20' 
                  : 'border-slate-300 bg-white text-slate-800 hover:text-slate-950 hover:border-slate-400 shadow-sm'
              }`}
            >
              <Sliders size={13} className={isDark ? "text-neutral-400" : "text-slate-600"} />
              <span>Thông Số</span>
            </button>

            {/* Book Test Ride CTA - Clean Refined Honda Red */}
            <button
              onClick={() => { soundFx.playRev(); onOpenTestRide(); }}
              className="relative group overflow-hidden px-5 py-2 rounded-full honda-red-btn text-xs font-semibold tracking-wide uppercase transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center gap-1.5 font-display"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Calendar size={13} />
                Lái Thử Xe
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Right Controls: Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl border transition-all ${
                isDark 
                  ? 'text-neutral-300 hover:text-white bg-white/[0.05] border-white/10' 
                  : 'text-slate-800 hover:text-slate-950 bg-slate-100 border-slate-300 shadow-sm'
              }`}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slideout Nav */}
        {mobileMenuOpen && (
          <div className={`lg:hidden px-4 pt-4 pb-6 border-b backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-300 ${
            isDark ? 'bg-black/95 border-white/10 text-white' : 'bg-white/98 border-slate-200 text-slate-900 shadow-2xl'
          }`}>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 py-3 text-left text-sm font-semibold rounded-xl transition-all ${
                    isDark 
                      ? 'text-neutral-200 hover:text-red-400 hover:bg-white/5' 
                      : 'text-slate-800 hover:text-red-600 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className={`pt-3 mt-2 border-t flex flex-col gap-2.5 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between px-2">
                  <span className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-slate-700'}`}>Âm thanh động cơ</span>
                  <button
                    onClick={handleSoundToggle}
                    className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
                      isDark ? 'border-white/10 bg-white/5' : 'border-slate-300 bg-slate-50 text-slate-800'
                    }`}
                  >
                    {soundActive ? <Volume2 size={16} className="text-red-500" /> : <VolumeX size={16} />}
                    <span>{soundActive ? 'BẬT' : 'TẮT'}</span>
                  </button>
                </div>

                <button
                  onClick={() => { onOpenSpecs(); setMobileMenuOpen(false); }}
                  className={`w-full py-3 rounded-xl border text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'border-white/10 bg-white/5 text-neutral-200' : 'border-slate-200 bg-slate-100 text-slate-700'
                  }`}
                >
                  Xem Thông Số Kỹ Thuật
                </button>
                <button
                  onClick={() => { onOpenTestRide(); setMobileMenuOpen(false); }}
                  className="w-full py-3.5 rounded-xl honda-red-btn text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/30"
                >
                  Đăng Ký Lái Thử Ngay
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
