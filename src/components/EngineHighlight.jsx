import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { Zap, Flame, Gauge, Shield, Cpu, Activity, Play, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const ENGINE_SPECS = [
  { label: 'Dung Tích Xi Lanh', value: 329.6, unit: 'cc', desc: 'Xi lanh đơn, 4 van SOHC' },
  { label: 'Công Suất Cực Đại', value: 21.5, unit: 'kW', desc: '@ 7.500 vòng/phút (29 mã lực)' },
  { label: 'Mô-Men Xoắn Cực Đại', value: 31.8, unit: 'Nm', desc: '@ 5.250 vòng/phút bứt phá tức thì' },
  { label: 'Chuẩn Khí Thải', value: 5, unit: 'Euro', desc: 'Thân thiện môi trường quốc tế' },
];

const ENGINE_MODES = [
  {
    id: 'esp',
    name: 'Công Nghệ eSP+ 4 Van',
    color: '#ef4444',
    title: 'Trái Tim Sức Mạnh Đỉnh Cao Thế Hệ Mới',
    desc: 'Tích hợp công nghệ giảm thiểu ma sát vượt trội với xi-lanh lệch tâm, cò mổ con lăn và hệ thống căng xích cam thủy lực tự động. Tối ưu lưu lượng hòa khí nạp - xả, cho khả năng tăng tốc vượt trội đầy phấn khích.',
    features: ['Hành trình piston tối ưu 77.0 x 70.7 mm', 'Tỷ số nén 10.5:1 đốt cháy triệt để', 'Hệ thống làm mát bằng dung dịch công suất cao']
  },
  {
    id: 'hstc',
    name: 'Hệ Thống HSTC Độc Quyền',
    color: '#f59e0b',
    title: 'Kiểm Soát Lực Kéo An Toàn Tuyệt Đối',
    desc: 'Hệ thống kiểm soát lực xoắn Honda Selectable Torque Control liên tục tính toán độ trượt bánh sau thông qua cảm biến vòng quay. Tự động điều chỉnh lượng phun nhiên liệu để khôi phục độ bám đường tức thì.',
    features: ['Phát hiện độ trượt bánh trong mili-giây', 'Có thể chủ động bật/tắt bằng công tắc', 'Tăng cường an toàn khi trời mưa trơn trượt']
  },
  {
    id: 'eco',
    name: 'Phun Xăng Điện Tử PGM-FI',
    color: '#06b6d4',
    title: 'Vận Hành Êm Ái & Tiết Kiệm Nhiên Liệu',
    desc: 'Bộ điều khiển trung tâm ECU 32-bit tính toán lượng phun xăng chính xác đến từng micro-giây dựa trên nhiệt độ khí nạp, vị trí bướm ga và cảm biến oxy xả, đảm bảo hiệu suất tối đa với mức tiêu thụ tối ưu.',
    features: ['Mức tiêu hao chỉ 3.48 lít / 100km', 'Đáp ứng chuẩn khí thải Euro 5 nghiêm ngặt', 'Hệ thống khởi động ACG êm ái không tiếng động']
  }
];

const ROLLING_TEXTS = [
  {
    prefix: 'ĐỘNG CƠ',
    highlight: 'eSP+ 330CC',
    suffix: 'THẾ HỆ MỚI',
    subtext: '4-Van SOHC • Xi-lanh đơn làm mát bằng dung dịch hiệu suất cao',
    badge: '329.6 CC • 4-VAN',
    color: '#ef4444',
  },
  {
    prefix: 'CÔNG SUẤT',
    highlight: '21.5 kW (29 HP)',
    suffix: '@ 7.500 VÒNG/PHÚT',
    subtext: 'Bứt phá tốc độ dũng mãnh, dẫn đầu phân khúc tay ga cao cấp',
    badge: 'MAX POWER',
    color: '#f59e0b',
  },
  {
    prefix: 'MÔ-MEN XOẮN',
    highlight: '31.8 Nm CỰC ĐẠI',
    suffix: '@ 5.250 VÒNG/PHÚT',
    subtext: 'Gia tốc tức thì, phản hồi tay ga nhạy bén vượt bậc mọi cung đường',
    badge: 'PEAK TORQUE',
    color: '#10b981',
  },
  {
    prefix: 'CÔNG NGHỆ',
    highlight: 'HSTC & PGM-FI',
    suffix: 'CHUẨN KHÍ THẢI EURO 5',
    subtext: 'Kiểm soát lực kéo chống trượt độc quyền và phun xăng điện tử 32-bit',
    badge: 'SMART TECH',
    color: '#06b6d4',
  },
];

export default function EngineHighlight() {
  const containerRef = useRef(null);
  const titleContainerRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const shockwaveRef = useRef(null);
  const imageFrameRef = useRef(null);
  const hudCircleRef = useRef(null);
  const [activeMode, setActiveMode] = useState(0);
  const [activeRollIdx, setActiveRollIdx] = useState(0);
  const [scrollPower, setScrollPower] = useState(0);
  const [rpmVal, setRpmVal] = useState(1200);
  const [isRevving, setIsRevving] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const { isDark } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Kinetic Parallax Typography Streams (Scroll-Driven)
      if (marquee1Ref.current) {
        gsap.to(marquee1Ref.current, {
          xPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          }
        });
      }

      if (marquee2Ref.current) {
        gsap.to(marquee2Ref.current, {
          xPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          }
        });
      }

      // 2. Title Kinetic 3D Roll & Power Tachometer (Scroll-Driven)
      if (titleContainerRef.current) {
        ScrollTrigger.create({
          trigger: titleContainerRef.current,
          start: 'top 85%',
          end: 'bottom 20%',
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollPower(Math.round(p * 100));
            let idx = 0;
            if (p < 0.25) idx = 0;
            else if (p < 0.5) idx = 1;
            else if (p < 0.75) idx = 2;
            else idx = 3;
            setActiveRollIdx((prev) => (prev !== idx ? idx : prev));
          }
        });
      }

      // Surprising scroll-triggered transition: screen enters dark high-voltage void,
      // shockwave expands, HUD draws in, and engine image bursts with 3D depth
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'top 20%',
          scrub: 1,
          onEnter: () => {
            // Trigger numeric counter roll up
            gsap.to({ val0: 0, val1: 0, val2: 0, val3: 0 }, {
              val0: ENGINE_SPECS[0].value,
              val1: ENGINE_SPECS[1].value,
              val2: ENGINE_SPECS[2].value,
              val3: ENGINE_SPECS[3].value,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function() {
                setCounters([
                  this.targets()[0].val0.toFixed(1),
                  this.targets()[0].val1.toFixed(1),
                  this.targets()[0].val2.toFixed(1),
                  Math.round(this.targets()[0].val3)
                ]);
              }
            });
          }
        }
      });

      // Shockwave ring explosion
      tl.fromTo(shockwaveRef.current, {
        scale: 0.2,
        opacity: 1,
      }, {
        scale: 2.2,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
      }, 0);

      // Engine image frame 3D reveal
      tl.fromTo(imageFrameRef.current, {
        scale: 0.8,
        y: 80,
        rotateX: 20,
        opacity: 0,
        filter: 'brightness(0.3) blur(10px)'
      }, {
        scale: 1,
        y: 0,
        rotateX: 0,
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        duration: 1.5,
        ease: 'power3.out'
      }, 0.2);

      // HUD Circle rotation
      gsap.to(hudCircleRef.current, {
        rotation: 360,
        repeat: -1,
        duration: 25,
        ease: 'none'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Interactive Engine Rev sound & animation
  const handleRevEngine = () => {
    if (isRevving) return;
    setIsRevving(true);
    soundFx.playRev();

    // Animate RPM tachometer
    gsap.to({ rpm: 1200 }, {
      rpm: 7800,
      duration: 0.35,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
      onUpdate: function() {
        setRpmVal(Math.round(this.targets()[0].rpm));
      },
      onComplete: () => {
        setRpmVal(1200);
        setIsRevving(false);
      }
    });

    // Slight vibration pulse on image
    if (imageFrameRef.current) {
      gsap.to(imageFrameRef.current, {
        x: 'random(-4, 4)',
        y: 'random(-4, 4)',
        repeat: 5,
        yoyo: true,
        duration: 0.05,
        onComplete: () => {
          gsap.set(imageFrameRef.current, { x: 0, y: 0 });
        }
      });
    }
  };

  const currentMode = ENGINE_MODES[activeMode];

  return (
    <section 
      id="engine" 
      ref={containerRef} 
      className={`relative w-full min-h-screen pt-28 sm:pt-36 lg:pt-40 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-black text-white' : 'bg-white text-slate-900'
      }`}
    >
      {/* Dynamic Background Grid & Subtle Ambient Glow */}
      <div className={`absolute inset-0 bg-tech-grid pointer-events-none ${isDark ? 'opacity-15' : 'opacity-[0.03]'}`} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none ${
        isDark ? 'bg-slate-700/10' : 'bg-red-500/5'
      }`} />

      {/* Full-width Background Kinetic Typography Scroll Streams (Parallax Scrub) */}
      <div className="absolute top-8 sm:top-12 left-0 right-0 overflow-hidden pointer-events-none select-none z-0 opacity-20 dark:opacity-15">
        <div 
          ref={marquee1Ref}
          className="whitespace-nowrap font-display font-black text-3xl sm:text-5xl lg:text-7xl uppercase tracking-widest text-transparent will-change-transform"
          style={{
            WebkitTextStroke: isDark ? '1px rgba(255,255,255,0.45)' : '1px rgba(15,23,42,0.35)',
          }}
        >
          HONDA ADVANCED POWERTRAIN • 330CC eSP+ 4-VALVE SOHC • 7500 RPM • 21.5 kW POWER • LIQUID COOLED • HIGH COMPRESSION 10.5:1 • HONDA ADVANCED POWERTRAIN • 330CC eSP+ 4-VALVE SOHC •
        </div>
        <div 
          ref={marquee2Ref}
          className="whitespace-nowrap font-display font-black text-3xl sm:text-5xl lg:text-7xl uppercase tracking-widest text-transparent mt-1 sm:mt-2 will-change-transform"
          style={{
            WebkitTextStroke: isDark ? '1px rgba(239,68,68,0.45)' : '1px rgba(220,38,38,0.35)',
          }}
        >
          • 31.8 Nm TORQUE @ 5250 RPM • PGM-FI FUEL INJECTION • HSTC TRACTION CONTROL • EURO 5 EMISSION • RACING PRECISION • 31.8 Nm TORQUE @ 5250 RPM •
        </div>
      </div>
      
      {/* Shockwave expanding ring (Clean mechanical pulse on scroll) */}
      <div 
        ref={shockwaveRef}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border pointer-events-none blur-[1px] transition-colors ${
          isDark ? 'border-white/20' : 'border-slate-300/40'
        }`}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Scroll-Driven Title Header with 3D Kinetic Roll & Power Tachometer */}
        <div ref={titleContainerRef} className="relative text-center max-w-4xl mx-auto mb-14 sm:mb-20 px-2 sm:px-4">
          
          {/* Top Tech Badge */}
          <div className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-3 sm:mb-4 font-body border transition-colors ${
            isDark 
              ? 'bg-white/[0.04] border-white/[0.08] text-neutral-300' 
              : 'bg-slate-100 border-slate-300 text-slate-800'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            <Cpu size={12} className={isDark ? 'text-red-400' : 'text-red-600'} />
            <span>CƠ KHÍ CHÍNH XÁC • HONDA ADVANCED POWERTRAIN</span>
          </div>

          {/* 3D Kinetic Rolling Drum Container */}
          <div className="relative py-1 sm:py-2">
            
            {/* Dynamic Prefix and Spec Pill */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase px-2 sm:px-2.5 py-0.5 rounded-md border transition-all duration-300 ${
                isDark ? 'bg-white/10 border-white/15 text-neutral-300' : 'bg-slate-200 border-slate-300 text-slate-800'
              }`}>
                {ROLLING_TEXTS[activeRollIdx].prefix}
              </span>
              <span 
                className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-md text-white shadow-sm transition-colors duration-300"
                style={{ backgroundColor: ROLLING_TEXTS[activeRollIdx].color }}
              >
                {ROLLING_TEXTS[activeRollIdx].badge}
              </span>
            </div>

            {/* 3D Cylinder Text Roller Viewport */}
            <div 
              className="relative h-14 xs:h-16 sm:h-20 lg:h-24 w-full overflow-hidden flex items-center justify-center"
              style={{ perspective: '1100px' }}
            >
              {/* Mechanical Drum housing gradient masks */}
              <div className="absolute top-0 left-0 right-0 h-2 sm:h-3 bg-gradient-to-b from-white dark:from-black to-transparent z-10 pointer-events-none opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 h-2 sm:h-3 bg-gradient-to-t from-white dark:from-black to-transparent z-10 pointer-events-none opacity-80" />

              {ROLLING_TEXTS.map((item, idx) => {
                const diff = idx - activeRollIdx;
                const isCurrent = diff === 0;
                return (
                  <div
                    key={idx}
                    className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none will-change-transform px-2"
                    style={{
                      transform: `translate3d(0, ${diff * 110}%, ${-Math.abs(diff) * 65}px) rotateX(${-diff * 75}deg)`,
                      opacity: isCurrent ? 1 : Math.max(0, 0.2 - Math.abs(diff) * 0.1),
                      filter: isCurrent ? 'none' : 'blur(4px)',
                    }}
                  >
                    <h2 
                      className={`font-display text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight uppercase select-none transition-colors text-center ${
                        isCurrent 
                          ? (isDark ? 'text-white' : 'text-slate-950')
                          : 'text-neutral-500'
                      }`}
                    >
                      <span className="text-gradient-platinum inline-block mr-1.5 sm:mr-3">
                        {item.highlight}
                      </span>
                      <span className={`text-xs xs:text-sm sm:text-2xl lg:text-3xl font-black tracking-normal opacity-90 inline-block ${
                        isDark ? 'text-neutral-300' : 'text-slate-800'
                      }`}>
                        {item.suffix}
                      </span>
                    </h2>
                  </div>
                );
              })}
            </div>

            {/* Subtext describing the active rolled state */}
            <p className={`mt-1.5 text-xs sm:text-sm font-body font-semibold max-w-2xl mx-auto transition-all duration-300 min-h-[22px] px-2 ${
              isDark ? 'text-neutral-400' : 'text-slate-700'
            }`}>
              {ROLLING_TEXTS[activeRollIdx].subtext}
            </p>
          </div>

          {/* Interactive Mechanical Swatch Selector Tabs */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mt-3.5 sm:mt-4 flex-wrap">
            {ROLLING_TEXTS.map((item, idx) => {
              const isActive = activeRollIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveRollIdx(idx);
                  }}
                  className={`group relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? (isDark 
                          ? 'bg-white/15 text-white border border-white/30 shadow-lg' 
                          : 'bg-slate-900 text-white border border-slate-950 shadow-md')
                      : (isDark 
                          ? 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.08] hover:bg-white/[0.08]' 
                          : 'bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-300 hover:bg-slate-200/70')
                  }`}
                >
                  <span 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'scale-125 ring-2 ring-white/30' : 'opacity-60'}`}
                    style={{ backgroundColor: item.color }}
                  />
                  <span>0{idx + 1} {item.highlight.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Mechanical Power Tachometer Line (Scrubbed with Scroll) */}
          <div className="max-w-md mx-auto mt-5 px-3">
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold tracking-wider mb-1.5 transition-colors">
              <span className={isDark ? 'text-neutral-400' : 'text-slate-600'}>0 RPM</span>
              <span className="text-red-500 font-extrabold flex items-center gap-1">
                <Flame size={11} className="animate-pulse text-red-500" />
                REV {Math.round(1200 + (scrollPower / 100) * 6300)} RPM
              </span>
              <span className="text-red-600 font-black tracking-widest">7.5K REDLINE</span>
            </div>
            <div className={`relative h-2 w-full rounded-full overflow-hidden p-0.5 border ${
              isDark ? 'bg-white/[0.06] border-white/10' : 'bg-slate-200 border-slate-300'
            }`}>
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(239,68,68,0.7)]"
                style={{ width: `${Math.max(6, scrollPower)}%` }}
              />
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 relative flex items-center justify-center">
            
            <div 
              ref={hudCircleRef}
              className={`absolute w-[360px] sm:w-[480px] lg:w-[540px] h-[360px] sm:h-[480px] lg:h-[540px] rounded-full border border-dashed pointer-events-none transition-colors ${
                isDark ? 'border-white/10' : 'border-slate-300'
              }`}
            >
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${isDark ? 'bg-white/60' : 'bg-red-500'}`} />
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isDark ? 'bg-neutral-400' : 'bg-slate-400'}`} />
            </div>

            <div 
              ref={imageFrameRef}
              className={`relative w-full aspect-[16/10] max-h-[480px] rounded-3xl overflow-hidden group transition-all duration-300 ${
                isDark 
                  ? 'glass-panel border border-white/[0.1] shadow-2xl' 
                  : 'bg-white border border-slate-300 shadow-xl shadow-slate-300/40'
              }`}
            >
              <img 
                src="./images/dong-co-esp.jpg" 
                alt="Động cơ Honda eSP+ 330cc" 
                className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.08] text-[10px] font-mono text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                SYSTEM: eSP+ 4-VALVE SOHC PGM-FI
              </div>

              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-white/[0.08] flex items-center gap-3">
                <Gauge size={18} className="text-neutral-400" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold font-body">Vòng Tua Máy</span>
                  <span className="font-mono text-base sm:text-lg font-bold text-white tracking-wider">
                    {rpmVal} <span className="text-[10px] text-neutral-400">vòng/phút</span>
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4">
                <button
                  onClick={handleRevEngine}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide flex items-center gap-2 backdrop-blur-md border border-white/15 transition-all cursor-pointer font-body"
                >
                  <Activity size={13} className={isRevving ? 'animate-pulse text-red-400' : 'text-neutral-400'} />
                  <span>{isRevving ? 'Kiểm Tra Vận Hành...' : 'Mô Phỏng Vận Hành'}</span>
                </button>
              </div>

            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className={`flex items-center gap-1.5 p-1 rounded-xl backdrop-blur-md mb-6 border transition-colors ${
              isDark 
                ? 'bg-white/[0.03] border-white/[0.07]' 
                : 'bg-slate-100 border-slate-300'
            }`}>
              {ENGINE_MODES.map((mode, idx) => (
                <button
                  key={mode.id}
                  onClick={() => { soundFx.playClick(); setActiveMode(idx); }}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs tracking-wide transition-all cursor-pointer text-center font-body ${
                    activeMode === idx
                      ? (isDark ? 'bg-white/15 text-white shadow-sm border border-white/10 font-semibold' : 'bg-white text-slate-950 shadow border border-slate-300 font-bold')
                      : (isDark ? 'text-neutral-400 hover:text-white hover:bg-white/[0.04]' : 'text-slate-800 hover:text-slate-950 hover:bg-slate-200/80 font-bold')
                  }`}
                >
                  {mode.name.split(' ')[0]} {mode.name.split(' ')[1]}
                </button>
              ))}
            </div>

            <div className={`p-6 sm:p-7 rounded-2xl backdrop-blur-xl animate-in fade-in duration-300 border transition-all ${
              isDark 
                ? 'glass-panel border-white/[0.08] shadow-xl' 
                : 'bg-white border-slate-300 shadow-md shadow-slate-300/30'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentMode.color }} />
                <span className={`text-[11px] font-bold tracking-wider uppercase font-body ${
                  isDark ? 'text-neutral-300' : 'text-slate-950'
                }`}>
                  {currentMode.name}
                </span>
              </div>

              <h3 className={`font-display text-xl sm:text-2xl font-black tracking-tight leading-snug ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                {currentMode.title}
              </h3>

              <p className={`mt-2.5 text-xs sm:text-sm leading-relaxed font-body ${
                isDark ? 'text-neutral-300' : 'text-slate-800 font-semibold'
              }`}>
                {currentMode.desc}
              </p>

              <div className={`mt-5 space-y-2 pt-4 border-t ${
                isDark ? 'border-white/[0.08]' : 'border-slate-300'
              }`}>
                {currentMode.features.map((feat, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs font-body ${
                    isDark ? 'text-neutral-300' : 'text-slate-800 font-semibold'
                  }`}>
                    <CheckCircle2 size={13} className={`shrink-0 ${isDark ? 'text-neutral-400' : 'text-red-500'}`} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {ENGINE_SPECS.map((spec, idx) => (
            <div 
              key={idx}
              className={`p-5 sm:p-6 rounded-2xl backdrop-blur-md transition-all duration-300 group border ${
                isDark 
                  ? 'glass-panel border-white/[0.08] hover:border-white/20' 
                  : 'bg-white border-slate-300 hover:border-slate-400 shadow-sm'
              }`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-wider flex items-center justify-between mb-2 font-body ${
                isDark ? 'text-neutral-400' : 'text-slate-800'
              }`}>
                <span>{spec.label}</span>
                <Activity size={12} className={`transition-colors ${
                  isDark ? 'text-neutral-500 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-900'
                }`} />
              </div>
              <div className={`flex items-baseline gap-1.5 font-display text-3xl sm:text-4xl lg:text-5xl font-black ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                <span>{counters[idx] || spec.value}</span>
                <span className={`text-sm sm:text-base font-bold font-body ${
                  isDark ? 'text-neutral-400' : 'text-slate-700'
                }`}>{spec.unit}</span>
              </div>
              <p className={`mt-2 text-[11px] font-body font-semibold leading-normal ${
                isDark ? 'text-neutral-400' : 'text-slate-700'
              }`}>
                {spec.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
