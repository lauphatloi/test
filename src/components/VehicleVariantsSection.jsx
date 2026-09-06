import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { Gauge, Zap, ShieldCheck, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VARIANTS = [
  {
    id: 'grey',
    number: '01',
    name: 'Xám Đương Đại',
    subname: 'Phiên Bản Thể Thao',
    shapeSymbol: 'Khối Bát Giác • Khởi Nền Cơ Khí',
    image: './images/motorcycle-grey.png',
    accentColor: '#94a3b8',
    tag: 'Phong cách đô thị hiện đại',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Sắc xám đương đại tinh tế, kết hợp hài hòa cùng các chi tiết hoàn thiện tỉ mỉ mang lại diện mạo đĩnh đạc và phong thái đĩnh đạc của người dẫn đầu.',
    floorGlow: 'rgba(148, 163, 184, 0.45)',
  },
  {
    id: 'dark-grey',
    number: '02',
    name: 'Đen Nhám Doanh Nhân',
    subname: 'Phiên Bản Đặc Biệt',
    shapeSymbol: 'Khối Bát Giác • Bung Mở Từ Tâm',
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
    shapeSymbol: 'Khối Bát Giác • Thu Ngược Về Tâm',
    image: './images/motorcycle-white.png',
    accentColor: '#cbd5e1',
    tag: 'Vẻ đẹp thanh lịch vượt thời gian',
    specs: { power: '21.5 kW', torque: '31.8 Nm', speed: '329.6 cc' },
    desc: 'Ánh sơn trắng ngọc trai đa lớp phát sáng dịu nhẹ dưới ánh mặt trời, tôn vinh phong thái lịch lãm chuẩn mực theo phong cách Ý.',
    floorGlow: 'rgba(226, 232, 240, 0.55)',
  },
  {
    id: 'green',
    number: '04',
    name: 'Xanh Lục Bảo Tinh Hoa',
    subname: 'Phiên Bản Giới Hạn',
    shapeSymbol: 'Khối Bát Giác • Tái Mở Từ Tâm',
    image: './images/motorcycle-green.png',
    accentColor: '#34d399',
    tag: 'Độc bản quý phái',
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
      // SẢN PHẨM ĐỨNG IM TUYỆT ĐỐI (x: 0, y: 0, scale: 1, filter: none, không tilt, không xê dịch)
      gsap.set(bikeRefs.current[0], { opacity: 1, x: 0, y: 0, scale: 1, filter: 'none', force3D: true });
      gsap.set(bikeRefs.current.slice(1), { opacity: 0, x: 0, y: 0, scale: 1, filter: 'none', force3D: true });

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
      className="relative w-full h-screen overflow-hidden bg-[#07090e] select-none flex flex-col justify-between"
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
          className="absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 45%, #07090e 85%)',
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
                background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #e2e8f0 18%, #93c5fd 40%, #1e3a8a 68%, #0f172a 85%, #07090e 95%)',
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
                background: 'radial-gradient(circle at 50% 50%, #f59e0b 0%, #d97706 18%, #b45309 35%, #78350f 55%, #1f1206 75%, #07090e 92%)',
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
                background: 'radial-gradient(circle at 50% 50%, #34d399 0%, #10b981 18%, #059669 38%, #047857 58%, #032d22 78%, #07090e 92%)',
              }}
            />
          </div>
        </div>

        {/* Tech Grid Texture Overlay */}
        <div className="absolute inset-0 bg-tech-grid opacity-10 z-40 pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN STAGE CONTENT CONTAINER                              */}
      {/* ============================================================ */}
      <div className="relative z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pb-10 flex flex-col justify-between h-full">
        
        {/* Section Top Header Tag */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[2px] bg-red-600" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-400 font-body">
              BỘ SƯU TẬP PHIÊN BẢN MÀU SẮC • HONDA SH350i
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-400">
            {currentData.number} / 0{VARIANTS.length}
          </span>
        </div>

        {/* Center 2-Zone Layout: ZERO OVERLAP between text card & motorcycle image */}
        <div className="relative w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* ZONE 1: Left Column (5 Cols) - Vehicle Name, Description, Telemetry */}
          <div className="lg:col-span-5 order-2 lg:order-1 z-30">
            <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/[0.09] backdrop-blur-xl shadow-2xl min-h-[410px] sm:min-h-[430px] flex flex-col justify-between">
              
              <div>
                {/* Badge & Edition */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shadow-sm"
                    style={{ backgroundColor: currentData.accentColor }}
                  />
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded bg-white/[0.06] text-neutral-200 border border-white/[0.06] font-body">
                    {currentData.subname}
                  </span>
                  <span className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/[0.06] font-body">
                    {currentData.shapeSymbol}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-body hidden sm:inline">| {currentData.tag}</span>
                </div>

                {/* Vehicle Name Headline - Locked min height */}
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight min-h-[38px] sm:min-h-[46px] flex items-center">
                  {currentData.name}
                </h2>

                {/* Description - Locked min height to avoid ANY vertical layout shift */}
                <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-body min-h-[64px] sm:min-h-[72px]">
                  {currentData.desc}
                </p>
              </div>

              <div>
                {/* Specs Telemetry Row */}
                <div className="pt-4 border-t border-white/[0.08] grid grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-body">
                      <Gauge size={11} className="text-neutral-400" /> Dung tích
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white font-display mt-0.5">
                      {currentData.specs.speed}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-body">
                      <Zap size={11} className="text-neutral-400" /> Công suất
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white font-display mt-0.5">
                      {currentData.specs.power}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-body">
                      <ShieldCheck size={11} className="text-neutral-400" /> Mô-men
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white font-display mt-0.5">
                      {currentData.specs.torque}
                    </span>
                  </div>
                </div>

                {/* Action Button inside card */}
                <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 font-body">Giá đề xuất đã có VAT:</span>
                  <button
                    onClick={() => { soundFx.playRev(); onOpenTestRide(currentData.name); }}
                    className="px-4 py-1.5 rounded-lg honda-red-btn text-xs font-semibold uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 cursor-pointer font-display"
                  >
                    Đăng Ký Bản Này
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ZONE 2: Right Column (7 Cols) - Dedicated Vehicle Stage */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative flex items-center justify-center h-[34vh] sm:h-[46vh] lg:h-[56vh] w-full z-20">
            
            {/* Khung Xe: ĐỨNG IM TUYỆT ĐỐI TẠI TÂM (Cố định, không tilt chuột, không x, không blur) */}
            <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
              
              {/* Studio Ground Shadow & Floor Color Bleed Reflections */}
              {VARIANTS.map((variant, idx) => (
                <div 
                  key={`floor-${variant.id}`}
                  ref={(el) => (floorGlowRefs.current[idx] = el)}
                  className="absolute bottom-2 sm:bottom-6 w-[78%] h-12 rounded-full blur-2xl pointer-events-none will-change-opacity"
                  style={{
                    backgroundColor: variant.floorGlow,
                  }}
                />
              ))}
              <div className="absolute bottom-4 sm:bottom-8 w-[68%] h-5 bg-black/95 rounded-full blur-md pointer-events-none z-10" />

              {/* 4 Sản phẩm xe ĐỨNG IM TUYỆT ĐỐI (Locked coordinates, pure opacity dissolve) */}
              {VARIANTS.map((variant, idx) => (
                <img
                  key={variant.id}
                  ref={(el) => (bikeRefs.current[idx] = el)}
                  src={variant.image}
                  alt={`Honda SH350i ${variant.name}`}
                  className="absolute inset-0 m-auto max-w-full max-h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] will-change-opacity select-none pointer-events-none z-20"
                />
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Controls: Centered Swatches Dock & Centered Scroll Prompt */}
        <div className="flex flex-col items-center justify-center gap-2.5 pt-2">
          {/* Swatches Dock */}
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full glass-panel border border-white/[0.09] backdrop-blur-2xl shadow-xl">
            {VARIANTS.map((v, i) => {
              const isActive = activeVariant === i;
              return (
                <button
                  key={v.id}
                  onClick={() => jumpToVariant(i)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-white/15 shadow-sm border border-white/20' 
                      : 'hover:bg-white/[0.04] opacity-70 hover:opacity-100'
                  }`}
                >
                  <span 
                    className="block w-3.5 h-3.5 rounded-full border border-white/25 shadow-inner"
                    style={{ backgroundColor: v.accentColor }}
                  />
                  <span className={`text-[11px] font-medium tracking-wide font-body transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'
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
            className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 font-body cursor-pointer hover:text-white transition-colors"
          >
            <ArrowDown size={14} className="text-red-600 animate-bounce" />
            <span className="tracking-wider text-xs font-medium text-neutral-300">Cuộn xuống</span>
          </div>
        </div>

      </div>
    </section>
  );
}
