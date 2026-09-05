import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { Zap, Flame, Gauge, Shield, Cpu, Activity, Play, CheckCircle2 } from 'lucide-react';

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
      className="relative w-full min-h-screen bg-black py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dynamic Background Grid & Energy Glow */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/15 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Shockwave expanding ring (Triggered on scroll) */}
      <div 
        ref={shockwaveRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-2 border-red-500/80 pointer-events-none blur-sm"
      />

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Section Surprising Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(225,29,72,0.4)]">
            <Flame size={14} className="animate-bounce" />
            ĐỘT PHÁ CÔNG NGHỆ ĐỘNG CƠ • SURPRISING HIGHLIGHT
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
            ĐỘNG CƠ <span className="text-gradient-red">eSP+ 330CC</span> THỦ LĨNH
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Khám phá khối động cơ tân tiến mang lại cảm giác lái mãnh liệt, phản hồi ga tức thì nhưng êm ái mượt mà ở mọi dải tốc độ.
          </p>
        </div>

        {/* Center Stage: Engine Showcase & Interactive HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Engine Visual with 3D HUD Framing (7 Columns) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            
            {/* Rotating Tech Tachometer Circle */}
            <div 
              ref={hudCircleRef}
              className="absolute w-[360px] sm:w-[480px] lg:w-[560px] h-[360px] sm:h-[480px] lg:h-[560px] rounded-full border border-dashed border-red-500/20 pointer-events-none"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#06b6d4]" />
            </div>

            {/* The Engine Photograph Container */}
            <div 
              ref={imageFrameRef}
              className="relative w-full aspect-[16/10] max-h-[480px] rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] group"
            >
              <img 
                src="./images/dong-co.jpg" 
                alt="Động cơ Honda SH350i eSP+ 330cc" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 filter brightness-105"
              />

              {/* High-tech Vignette and Blue-red Lighting */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Floating Blueprint Markers */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                SYSTEM: eSP+ 4-VALVE SOHC
              </div>

              {/* Live Tachometer RPM Overlay on Image */}
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center gap-3">
                <Gauge size={22} className={`transition-colors ${isRevving ? 'text-red-500 animate-pulse' : 'text-neutral-400'}`} />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">Vòng Tua Máy</span>
                  <span className="font-mono text-lg font-extrabold text-white tracking-wider">
                    {rpmVal} <span className="text-xs text-red-400">RPM</span>
                  </span>
                </div>
              </div>

              {/* Interactive Rev Throttle Button */}
              <div className="absolute bottom-4 left-4">
                <button
                  onClick={handleRevEngine}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Play size={14} className={isRevving ? 'animate-spin' : ''} />
                  <span>{isRevving ? 'Đang Tăng Tốc...' : 'Thử Ga Động Cơ'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Technology Control & Modes (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Mode Switch Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6">
              {ENGINE_MODES.map((mode, idx) => (
                <button
                  key={mode.id}
                  onClick={() => { soundFx.playClick(); setActiveMode(idx); }}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer text-center ${
                    activeMode === idx
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {mode.name.split(' ')[0]} {mode.name.split(' ')[1]}
                </button>
              ))}
            </div>

            {/* Active Mode Details Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentMode.color }} />
                <span className="text-xs font-bold tracking-wider uppercase" style={{ color: currentMode.color }}>
                  {currentMode.name}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                {currentMode.title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-body">
                {currentMode.desc}
              </p>

              {/* Feature Bullet Points */}
              <div className="mt-6 space-y-2.5 pt-4 border-t border-white/10">
                {currentMode.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-200">
                    <CheckCircle2 size={14} className="text-red-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Telemetry Counter Cards (Live animated counters on scroll) */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {ENGINE_SPECS.map((spec, idx) => (
            <div 
              key={idx}
              className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 backdrop-blur-md hover:border-red-500/40 transition-all duration-300 group"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between mb-2">
                <span>{spec.label}</span>
                <Activity size={13} className="text-red-500 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-baseline gap-1.5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                <span>{counters[idx] || spec.value}</span>
                <span className="text-base sm:text-lg font-semibold text-red-500">{spec.unit}</span>
              </div>
              <p className="mt-2 text-[11px] sm:text-xs text-neutral-400 line-clamp-1">
                {spec.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
