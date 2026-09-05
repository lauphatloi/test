import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sliders, Calendar, ArrowUpRight, Menu, X } from 'lucide-react';
import { soundFx } from '../utils/audio';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar({ onOpenTestRide, onOpenSpecs }) {
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
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: targetId, offsetY: 70 },
      ease: 'power3.inOut'
    });
  };

  const navLinks = [
    { label: 'Màu Sắc 3D', id: '#colors' },
    { label: 'Thiết Kế', id: '#design' },
    { label: 'Động Cơ eSP+', id: '#engine' },
    { label: 'Công Nghệ', id: '#technology' },
    { label: 'Bảng Giá & Trả Góp', id: '#pricing' },
  ];

  return (
    <>
      {/* Top Scroll Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/5">
        <div 
          className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled 
            ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
            : 'py-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); scrollToSection(0); }}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-[0.3em] text-red-500 uppercase transition-colors group-hover:text-red-400">
                HONDA MOTORS
              </span>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-gradient-silver transition-all">
                  SH350i
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-full shadow-[0_0_12px_rgba(225,29,72,0.6)]">
                  eSP+
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                onMouseEnter={() => soundFx.playHover()}
                className="px-4 py-2 text-xs font-medium tracking-wider text-neutral-300 hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundActive ? "Tắt âm thanh môi trường" : "Bật âm thanh động cơ chân thực"}
              className={`relative p-2.5 rounded-full border transition-all cursor-pointer flex items-center gap-2 ${
                soundActive 
                  ? 'border-red-500/50 bg-red-500/10 text-red-400 shadow-[0_0_15px_rgba(225,29,72,0.4)]' 
                  : 'border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:border-white/20'
              }`}
            >
              {soundActive ? <Volume2 size={16} className="animate-pulse" /> : <VolumeX size={16} />}
              <span className="text-[11px] font-medium hidden md:inline">
                {soundActive ? 'Audio ON' : 'Audio OFF'}
              </span>
            </button>

            {/* Quick Specs Trigger */}
            <button
              onClick={() => { soundFx.playClick(); onOpenSpecs(); }}
              className="px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-neutral-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders size={14} className="text-amber-400" />
              <span>Thông Số</span>
            </button>

            {/* Book Test Ride CTA */}
            <button
              onClick={() => { soundFx.playRev(); onOpenTestRide(); }}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(225,29,72,0.8)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Calendar size={14} />
                Lái Thử Ngay
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-neutral-300 hover:text-white bg-white/[0.05] rounded-xl border border-white/10"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Slideout Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-4 pb-6 bg-black/95 border-b border-white/10 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-4 py-3 text-left text-sm font-medium text-neutral-200 hover:text-red-400 hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs text-neutral-400">Âm thanh động cơ</span>
                  <button
                    onClick={handleSoundToggle}
                    className="p-2 rounded-lg border border-white/10 bg-white/5 text-xs flex items-center gap-2"
                  >
                    {soundActive ? <Volume2 size={16} className="text-red-400" /> : <VolumeX size={16} />}
                    <span>{soundActive ? 'BẬT' : 'TẮT'}</span>
                  </button>
                </div>
                <button
                  onClick={() => { onOpenSpecs(); setMobileMenuOpen(false); }}
                  className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-wider text-neutral-200"
                >
                  Xem Thông Số Kỹ Thuật
                </button>
                <button
                  onClick={() => { onOpenTestRide(); setMobileMenuOpen(false); }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/40"
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
