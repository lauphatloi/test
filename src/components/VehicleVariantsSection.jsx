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
  const bikeRefs = useRef([]);
  const bleed1Ref = useRef(null);
  const bleed2Ref = useRef(null);
  const bleed3Ref = useRef(null);
  const floorGlowRefs = useRef([]);
  const [activeVariant, setActiveVariant] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scrollytelling timeline for the 4 vehicle versions
      // Giữ nguyên cuộn thủ công tự nhiên (scrub), loại bỏ hoàn toàn snap tự động theo phản hồi người dùng
      // Mở rộng khoảng đệm dừng tĩnh (dwell buffer ~1.2s - 1.4s) và tăng hành trình cuộn để chống trôi/lố phiên bản
      const totalScroll = 440;

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
            if (p < 0.20) index = 0;
            else if (p < 0.50) index = 1;
            else if (p < 0.80) index = 2;
            else index = 3;
            setActiveVariant((prev) => (prev !== index ? index : prev));
          }
        }
      });

      // 1. Initial setup: 
      // SẢN PHẨM ĐỨNG IM TUYỆT ĐỐI (x: 0, y: 0, filter: none, không tilt, không xê dịch)
      // Tối ưu kích thước trên mobile: Phóng lớn hơn ~15% để nhìn rõ và cân đối với card
      const isMobile = window.innerWidth < 640;
      const bikeScale = isMobile ? 1.15 : 1;
      gsap.set(bikeRefs.current[0], { opacity: 1, x: 0, y: 0, scale: bikeScale, filter: 'none', force3D: true });
      gsap.set(bikeRefs.current.slice(1), { opacity: 0, x: 0, y: 0, scale: bikeScale, filter: 'none', force3D: true });

      // 2. KHỐI BÁT GIÁC HIỆU NĂNG CAO (Không lag, chuẩn GPU transform):
      // Bản 02: Bát Giác Đen Nhám (bleed1Ref) - Khởi điểm từ tâm (scale: 0, rotate: -8)
      gsap.set(bleed1Ref.current, { scale: 0, opacity: 1, rotate: -8, transformOrigin: '50% 50%', force3D: true });
      // Bản 03: Bát Giác Trắng Ngọc Trai (bleed2Ref) - Đặt ở lớp dưới sẵn sàng (scale: 1.35, opacity: 0, rotate: 0)
      gsap.set(bleed2Ref.current, { scale: 1.35, opacity: 0, rotate: 0, transformOrigin: '50% 50%', force3D: true });
      // Bản 04: Bát Giác Xanh Lục Bảo (bleed3Ref) - Khởi điểm từ tâm (scale: 0, opacity: 1, rotate: -15)
      gsap.set(bleed3Ref.current, { scale: 0, opacity: 1, rotate: -15, transformOrigin: '50% 50%', force3D: true });

      // 3. Ánh sáng hắt sàn ban đầu
      gsap.set(floorGlowRefs.current[0], { opacity: 1 });
      gsap.set(floorGlowRefs.current.slice(1), { opacity: 0 });

      // =========================================================================
      // BẢN 01 (Xám Đương Đại): Dừng tĩnh thư thái từ 0.0s đến 1.2s (Buffer 1.2s)
      // =========================================================================

      // =========================================================================
      // GIAI ĐOẠN 1: Chuyển sang Bản 02 (Đen Nhám Doanh Nhân - Vàng Đồng)
      // HOẠT ẢNH: Khối Bát Giác bung mở từ tâm (1.2s -> 2.8s)
      // =========================================================================
      tl.to(bleed1Ref.current, {
        scale: 1.35,
        rotate: 12,
        duration: 1.6,
        ease: 'none',
        force3D: true,
      }, 1.2);

      // Xe đứng im tại chỗ, chuyển mượt mà độ trong suốt
      tl.to(bikeRefs.current[0], { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 1.6);
      tl.to(bikeRefs.current[1], { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 1.6);

      // Sàn hắt ánh vàng đồng theo vệt loang
      tl.to(floorGlowRefs.current[0], { opacity: 0, duration: 0.8 }, 1.6);
      tl.to(floorGlowRefs.current[1], { opacity: 1, duration: 0.8 }, 1.6);

      // Kích hoạt ngầm lớp Trắng Ngọc Trai bên dưới khi bleed1Ref đang che kín màn hình
      tl.to(bleed2Ref.current, { opacity: 1, duration: 0.1 }, 2.7);

      // =========================================================================
      // BẢN 02 (Đen Nhám): Dừng tĩnh thư thái trọn vẹn từ 2.8s đến 4.2s (Buffer 1.4s)
      // =========================================================================

      // =========================================================================
      // GIAI ĐOẠN 2: Chuyển sang Bản 03 (Trắng Ngọc Trai - Băng Tinh Pearl Ice)
      // HOẠT ẢNH: Khối Bát Giác Đen Nhám thu ngược về tâm (4.2s -> 5.8s)
      // =========================================================================
      tl.to(bleed1Ref.current, {
        scale: 0,
        rotate: -8,
        duration: 1.6,
        ease: 'none',
        force3D: true,
      }, 4.2);

      // Xe đứng im tại chỗ, hòa tan độ trong suốt
      tl.to(bikeRefs.current[1], { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 4.6);
      tl.to(bikeRefs.current[2], { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 4.6);

      // Sàn hắt ánh ngọc trai
      tl.to(floorGlowRefs.current[1], { opacity: 0, duration: 0.8 }, 4.6);
      tl.to(floorGlowRefs.current[2], { opacity: 1, duration: 0.8 }, 4.6);

      // =========================================================================
      // BẢN 03 (Trắng Ngọc Trai): Dừng tĩnh thư thái trọn vẹn từ 5.8s đến 7.2s (Buffer 1.4s)
      // =========================================================================

      // =========================================================================
      // GIAI ĐOẠN 3: Chuyển sang Bản 04 (Xanh Lục Bảo - Emerald Jade)
      // HOẠT ẢNH: Khối Bát Giác Xanh Lục Bảo bung mở từ tâm (7.2s -> 8.8s)
      // =========================================================================
      tl.to(bleed3Ref.current, {
        scale: 1.35,
        rotate: 18,
        duration: 1.6,
        ease: 'none',
        force3D: true,
      }, 7.2);

      // Xe đứng im tại chỗ, hòa tan độ trong suốt
      tl.to(bikeRefs.current[2], { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 7.6);
      tl.to(bikeRefs.current[3], { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 7.6);

      // Sàn hắt ánh ngọc bích
      tl.to(floorGlowRefs.current[2], { opacity: 0, duration: 0.8 }, 7.6);
      tl.to(floorGlowRefs.current[3], { opacity: 1, duration: 0.8 }, 7.6);

      // =========================================================================
      // BẢN 04 (Xanh Lục Bảo): Dừng tĩnh thư thái trọn vẹn từ 8.8s đến 10.0s (Buffer 1.2s)
      // =========================================================================

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Jump to specific variant scroll position
  const jumpToVariant = (index) => {
    soundFx.playClick();
    const targets = [0.06, 0.35, 0.65, 0.94];
    const trigger = ScrollTrigger.getAll().find(t => t.trigger === containerRef.current);
    if (trigger) {
      const targetScroll = trigger.start + (trigger.end - trigger.start) * targets[index];
      gsap.to(window, {
        duration: 1.2,
        scrollTo: targetScroll,
        ease: 'power3.inOut'
      });
    }
  };

  const currentData = VARIANTS[activeVariant];

  return (
    <section 
      id="colors" 
      ref={containerRef} 
      className={`relative z-30 w-full h-screen overflow-hidden select-none flex flex-col justify-between transition-colors duration-500 shadow-[0_-30px_80px_rgba(0,0,0,0.6)] border-t border-white/15 dark:border-white/15 light:border-slate-300 ${
        isDark ? 'bg-[#07090e]' : 'bg-[#dce3ea]'
      }`}
      style={{
        marginTop: '-100vh',
      }}
    >
      {/* ============================================================ */}
      {/* 1. KHỐI BÁT GIÁC ĐỒNG BỘ HIỆU NĂNG CAO (GPU OPTIMIZED)        */}
      {/*    Hoạt ảnh xen kẽ: Bung mở -> Thu ngược về tâm -> Bung mở   */}
      {/* ============================================================ */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ contain: 'paint layout', transform: 'translateZ(0)' }}
      >
        {/* Lớp 01: Nền khởi đầu - Bản Xám Đương Đại (z-0) */}
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            background: isDark 
              ? 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 45%, #07090e 85%)'
              : 'radial-gradient(circle at 50% 50%, #d5dce6 0%, #c4cfdc 35%, #94a3b8 70%, #64748b 100%)',
          }}
        />

        {/* Lớp 03: KHỐI BÁT GIÁC BĂNG TINH - BẢN TRẮNG NGỌC TRAI (z-10) */}
        {/* Nằm ở lớp dưới, sẵn sàng lộ diện khi Khối Bát Giác Đen Nhám thu ngược về tâm */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <div
            ref={bleed2Ref}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none flex items-center justify-center"
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
                  : 'radial-gradient(circle at 50% 50%, #cfdae6 0%, #b8c7d7 35%, #889eb4 70%, #52677d 100%)',
              }}
            />
          </div>
        </div>

        {/* Lớp 02: KHỐI BÁT GIÁC HOÀNG GIA - BẢN ĐEN NHÁM DOANH NHÂN (z-20) */}
        {/* Nở từ tâm ra (0 -> 1.35) ở Giai đoạn 1, sau đó zoom ngược lại vào tâm (1.35 -> 0) ở Giai đoạn 2 */}
        <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
          <div
            ref={bleed1Ref}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none flex items-center justify-center"
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
                  : 'radial-gradient(circle at 50% 50%, #d8d0c2 0%, #c4b8a4 35%, #9e8e75 70%, #6f6048 100%)',
              }}
            />
          </div>
        </div>

        {/* Lớp 04: KHỐI BÁT GIÁC BẢO THẠCH - BẢN XANH LỤC BẢO (z-30) */}
        {/* Xen kẽ nhịp điệu: Lại bung mở từ tâm ra (0 -> 1.35) ở Giai đoạn 3 bao trùm toàn bộ */}
        <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
          <div
            ref={bleed3Ref}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none flex items-center justify-center"
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
                  : 'radial-gradient(circle at 50% 50%, #c8d8cf 0%, #adc4b8 35%, #7e9f8e 70%, #4a6d5c 100%)',
              }}
            />
          </div>
        </div>

        {/* Tech Grid Texture Overlay */}
        <div className={`absolute inset-0 bg-tech-grid z-40 pointer-events-none ${isDark ? 'opacity-10' : 'opacity-[0.04]'}`} />
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN STAGE CONTENT CONTAINER                              */}
      {/* ============================================================ */}
      <div className="relative z-50 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-[68px] sm:pt-20 lg:pt-24 pb-2 sm:pb-6 flex flex-col justify-between h-full">
        
        {/* Section Top Header Tag */}
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

        {/* Center 2-Zone Layout: ZERO OVERLAP between text card & motorcycle image */}
        <div className="relative w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-6 lg:gap-10 items-center">
          
          {/* ZONE 1: Left Column (5 Cols) - Vehicle Name, Description, Telemetry */}
          <div className="lg:col-span-5 order-2 lg:order-1 z-30">
            <div className={`p-3.5 sm:p-5 lg:p-7 rounded-2xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between lg:min-h-[410px] ${
              isDark 
                ? 'glass-panel border border-white/[0.1] shadow-2xl text-white' 
                : 'bg-white/95 border border-slate-300 shadow-xl shadow-slate-900/10 text-slate-900'
            }`}>
              
              <div>
                {/* Badge & Edition Tag Row */}
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

                {/* Vehicle Name Headline */}
                <h2 className={`font-display text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight flex items-center ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}>
                  {currentData.name}
                </h2>

                {/* Description */}
                <p className={`mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed font-body line-clamp-2 sm:line-clamp-3 lg:line-clamp-none ${
                  isDark ? 'text-neutral-300' : 'text-slate-800 font-semibold'
                }`}>
                  {currentData.desc}
                </p>
              </div>

              <div>
                {/* Specs Telemetry Row - Designed as high-end automotive telemetry panel */}
                <div className={`my-2.5 sm:my-3 py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-xl border grid grid-cols-3 divide-x transition-colors ${
                  isDark 
                    ? 'bg-white/[0.03] border-white/[0.08] divide-white/[0.08]' 
                    : 'bg-slate-100/90 border border-slate-300 divide-slate-300'
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
                    }`}>eSP+ 4 van</span>
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

                {/* Price & Action Button inside card */}
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

          {/* ZONE 2: Right Column (7 Cols) - Dedicated Vehicle Stage */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative flex items-center justify-center h-[28vh] sm:h-[38vh] lg:h-[54vh] max-h-[255px] sm:max-h-[360px] lg:max-h-none w-full z-20 my-1 sm:my-0">
            
            {/* Khung Xe: ĐỨNG IM TUYỆT ĐỐI TẠI TÂM (Cố định, không tilt chuột, không x, không blur) */}
            <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
              
              {/* Studio Ground Shadow & Floor Color Bleed Reflections */}
              {VARIANTS.map((variant, idx) => (
                <div 
                  key={`floor-${variant.id}`}
                  ref={(el) => (floorGlowRefs.current[idx] = el)}
                  className="absolute bottom-1 sm:bottom-4 w-[86%] sm:w-[78%] h-10 sm:h-12 rounded-full blur-2xl pointer-events-none will-change-opacity"
                  style={{
                    backgroundColor: variant.floorGlow,
                  }}
                />
              ))}
              <div className={`absolute bottom-2 sm:bottom-6 w-[76%] sm:w-[68%] h-4 sm:h-5 rounded-full blur-md pointer-events-none z-10 ${
                isDark ? 'bg-black/95' : 'bg-slate-950/45'
              }`} />

              {/* 4 Sản phẩm xe ĐỨNG IM TUYỆT ĐỐI (Locked coordinates, pure opacity dissolve) */}
              {VARIANTS.map((variant, idx) => (
                <img
                  key={variant.id}
                  ref={(el) => (bikeRefs.current[idx] = el)}
                  src={variant.image}
                  alt={`Honda SH350i ${variant.name}`}
                  className={`absolute inset-0 m-auto max-w-full max-h-full object-contain will-change-opacity select-none pointer-events-none z-20 ${
                    isDark 
                      ? 'drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]' 
                      : 'drop-shadow-[0_20px_35px_rgba(15,23,42,0.45)]'
                  }`}
                />
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Controls: Centered Swatches Dock & Centered Scroll Prompt */}
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 pt-1 sm:pt-2 shrink-0">
          {/* Swatches Dock */}
          <div className={`flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full backdrop-blur-2xl transition-all duration-300 ${
            isDark 
              ? 'glass-panel border border-white/[0.09] shadow-xl' 
              : 'bg-white/95 border border-slate-300 shadow-md'
          }`}>
            {VARIANTS.map((v, i) => {
              const isActive = activeVariant === i;
              return (
                <button
                  key={v.id}
                  onClick={() => jumpToVariant(i)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`group relative flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
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

          {/* Centered Scroll Prompt: Mũi tên đỏ và chữ "Cuộn xuống" tối giản ở trung tâm */}
          <div 
            onClick={() => {
              const el = document.getElementById('design');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
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
    </section>
  );
}
