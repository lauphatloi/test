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

export default function EngineHighlight() {
  const containerRef = useRef(null);
  const shockwaveRef = useRef(null);
  const imageFrameRef = useRef(null);
  const hudCircleRef = useRef(null);
  const [activeMode, setActiveMode] = useState(0);
  const [rpmVal, setRpmVal] = useState(1200);
  const [isRevving, setIsRevving] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const { isDark } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      className={`relative w-full min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-black text-white' : 'bg-white text-slate-900'
      }`}
    >
      {/* Dynamic Background Grid & Subtle Ambient Glow */}
      <div className={`absolute inset-0 bg-tech-grid pointer-events-none ${isDark ? 'opacity-15' : 'opacity-[0.03]'}`} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none ${
        isDark ? 'bg-slate-700/10' : 'bg-red-500/5'
      }`} />
      
      {/* Shockwave expanding ring (Clean mechanical pulse on scroll) */}
      <div 
        ref={shockwaveRef}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border pointer-events-none blur-[1px] transition-colors ${
          isDark ? 'border-white/20' : 'border-slate-300/40'
        }`}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-4 font-body border transition-colors ${
            isDark 
              ? 'bg-white/[0.04] border-white/[0.08] text-neutral-300' 
              : 'bg-slate-100 border-slate-300 text-slate-800'
          }`}>
            <Cpu size={13} className={isDark ? 'text-neutral-400' : 'text-red-600'} />
            CƠ KHÍ CHÍNH XÁC • HONDA ADVANCED POWERTRAIN
          </div>

          <h2 className={`font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            ĐỘNG CƠ <span className="text-gradient-platinum">eSP+ 330CC</span> THẾ HỆ MỚI
          </h2>
          <p className={`mt-3 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-body ${
            isDark ? 'text-neutral-400' : 'text-slate-800 font-semibold'
          }`}>
            Sức mạnh bền bỉ, phản hồi ga êm ái và hiệu suất đốt cháy nhiên liệu tối ưu dựa trên triết lý kỹ thuật cơ khí chính xác hàng đầu của Honda.
          </p>
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
