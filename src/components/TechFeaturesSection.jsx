import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { ShieldCheck, Key, Box, BatteryCharging, ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TECH_ITEMS = [
  {
    id: 'abs',
    tag: 'AN TOÀN CHỦ ĐỘNG',
    icon: ShieldCheck,
    title: 'Hệ Thống Phanh ABS 2 Kênh & HSTC',
    sub: 'Làm Chủ Mọi Góc Cua & Điều Kiện Trơn Trượt',
    image: './images/cong-nghe-phanh-abs.jpg',
    desc: 'Trang bị phanh đĩa trước sau kích thước lớn tích hợp hệ thống chống bó cứng phanh ABS 2 kênh độc lập. Kết hợp công nghệ kiểm soát lực kéo HSTC tự động phát hiện trượt bánh sau, mang lại sự an tâm tuyệt đối khi phanh gấp trên đường ướt.',
    metrics: [
      { label: 'Cảm biến ABS', val: '2 Kênh độc lập' },
      { label: 'Kiểm soát HSTC', val: 'Chống trượt tức thì' },
      { label: 'Đĩa phanh', val: 'Đường kính 256mm' },
    ]
  },
  {
    id: 'smartkey',
    tag: 'BẢO MẬT THÔNG MINH',
    icon: Key,
    title: 'Khóa Thông Minh Honda SMART Key',
    sub: 'Công Nghệ Mã Hóa RFID Thế Hệ Mới',
    image: './images/cong-nghe-khoa-smartkey.jpg',
    desc: 'Hệ thống chìa khóa thông minh với núm xoay viền LED sang trọng. Tích hợp đầy đủ tính năng mở khóa từ xa, định vị tìm xe trong bãi đỗ với âm thanh và đèn báo, cùng tính năng cảnh báo chống dắt xe bằng còi báo động thông minh.',
    metrics: [
      { label: 'Khoảng cách nhận diện', val: 'Bán kính 2.5 mét' },
      { label: 'Tính năng định vị', val: 'Đèn & Còi báo hiệu' },
      { label: 'Bảo mật', val: 'Mã hóa chống sao chép' },
    ]
  },
  {
    id: 'ubox',
    tag: 'TIỆN NGHI THƯỢNG LƯU',
    icon: Box,
    title: 'Hộc Đựng Đồ U-Box Dung Tích Khủng',
    sub: 'Tích Hợp Đèn Soi Sáng LED Ban Đêm',
    image: './images/tien-ich-cop-xe-rong.jpg',
    desc: 'Không gian cốp xe rộng rãi có thể chứa trọn vẹn 1 mũ bảo hiểm full-face cỡ lớn cùng áo mưa, máy tính xách tay và nhiều vật dụng cá nhân. Đèn LED tích hợp tự động chiếu sáng hộc chứa khi mở yên trong bóng tối.',
    metrics: [
      { label: 'Dung tích cốp', val: '28.5 Lít siêu rộng' },
      { label: 'Chiếu sáng', val: 'Đèn LED tự động' },
      { label: 'Sức chứa', val: '1 Mũ bảo hiểm cả đầu' },
    ]
  },
  {
    id: 'typec',
    tag: 'KẾT NỐI LIÊN TỤC',
    icon: BatteryCharging,
    title: 'Cổng Sạc Siêu Tốc USB Type-C',
    sub: 'Luôn Đầy Năng Lượng Trong Mọi Hành Trình',
    image: './images/tien-ich-cong-sac-type-c.jpg',
    desc: 'Cổng sạc chuẩn USB Type-C hiện đại được bố trí tinh tế bên trong hộc để đồ có nắp đậy chống nước ở phía trước. Cung cấp dòng điện sạc nhanh an toàn cho mọi thiết bị di động thông minh ngay khi đang di chuyển.',
    metrics: [
      { label: 'Chuẩn kết nối', val: 'USB-C Fast Charge' },
      { label: 'Vị trí', val: 'Hộc đồ kín chống nước' },
      { label: 'Điện áp đầu ra', val: '5V - 3A ổn định' },
    ]
  }
];

export default function TechFeaturesSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll Experience with GSAP ScrollTrigger
      const track = trackRef.current;
      const cards = cardRefs.current;
      
      const scrollWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distanceToMove = scrollWidth - viewportWidth;

      if (distanceToMove > 0) {
        gsap.to(track, {
          x: -distanceToMove,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${distanceToMove + 400}`,
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        // 3D Parallax tilt and scale on each card during horizontal travel
        cards.forEach((card) => {
          gsap.fromTo(card, {
            rotateY: 8,
            scale: 0.95,
          }, {
            rotateY: -8,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getTweensOf(track)[0],
              start: 'left right',
              end: 'right left',
              scrub: true,
            }
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="technology" 
      ref={sectionRef}
      className="relative w-full h-screen bg-[#05070c] overflow-hidden select-none flex flex-col justify-center"
    >
      {/* Ambient background glows - Refined calm slate */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-slate-700/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-slate-600/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-tech-grid opacity-10" />
      </div>

      {/* Top Header Tag */}
      <div className="absolute top-8 sm:top-12 left-6 sm:left-12 lg:left-16 z-20">
        <div className="flex items-center gap-3">
          <span className="w-6 h-[2px] bg-red-600" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-neutral-400 font-body">
            CÔNG NGHỆ THÔNG MINH & AN TOÀN CHỦ ĐỘNG
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-2">
          GIẢI PHÁP TIÊN PHONG <span className="text-gradient-platinum">TỪ HONDA</span>
        </h2>
      </div>

      {/* Horizontal Cards Runway Track */}
      <div 
        ref={trackRef} 
        className="flex items-center gap-6 sm:gap-8 px-6 sm:px-12 lg:px-16 w-max pt-20 pb-8 will-change-transform"
      >
        {/* First Introductory Teaser Column */}
        <div className="w-[300px] sm:w-[360px] shrink-0 glass-panel p-8 rounded-3xl border border-white/[0.08] flex flex-col justify-between">
          <div>
            <span className="px-2.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-neutral-200 text-[11px] font-semibold uppercase tracking-wider font-body">
              An Toàn & Tiện Ích
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-4 leading-snug">
              Trải Nghiệm Tiện Nghi Đỉnh Cao
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-body">
              Mỗi tính năng trên Honda SH350i được chế tác nhằm nâng cao sự an tâm, bảo đảm kiểm soát tối đa trong mọi hành trình di chuyển đô thị hiện đại.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-400 font-body">
            <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
              Cuộn ngang để xem chi tiết
            </span>
            <ChevronRight size={16} className="text-neutral-400" />
          </div>
        </div>

        {/* 4 Feature High-Res Photographic Cards */}
        {TECH_ITEMS.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="w-[320px] sm:w-[420px] lg:w-[450px] shrink-0 glass-panel rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl group hover:border-white/20 transition-all duration-500"
            >
              {/* Image Frame */}
              <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f131a] via-transparent to-black/40" />

                {/* Tag Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.08] text-[10px] font-semibold text-neutral-200 font-body">
                  <IconComp size={13} className="text-white" />
                  <span>{item.tag}</span>
                </div>

                <div className="absolute top-4 right-4 text-[11px] font-mono text-neutral-400 bg-black/60 px-2.5 py-0.5 rounded border border-white/[0.08]">
                  0{idx + 1}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7">
                <span className="text-xs text-neutral-400 font-medium font-body">{item.sub}</span>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-white mt-1 group-hover:text-neutral-100 transition-colors">
                  {item.title}
                </h4>
                <p className="mt-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3 font-body">
                  {item.desc}
                </p>

                {/* Metrics Breakdown */}
                <div className="mt-5 pt-4 border-t border-white/[0.08] grid grid-cols-3 gap-2">
                  {item.metrics.map((m, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 truncate font-body">{m.label}</span>
                      <span className="text-xs font-semibold text-white mt-0.5 truncate font-display">
                        {m.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* End Runway Banner */}
        <div className="w-[280px] sm:w-[300px] shrink-0 glass-panel p-8 rounded-3xl border border-white/[0.08] flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-white/[0.05] text-white flex items-center justify-center mb-4 border border-white/10">
            <Sparkles size={18} />
          </div>
          <h4 className="font-display text-xl font-bold text-white">
            Chuẩn Mực Toàn Diện
          </h4>
          <p className="mt-2 text-xs text-neutral-400 font-body">
            Thiết kế vì người lái, khẳng định vị thế dẫn đầu phân khúc xe ga cao cấp.
          </p>
        </div>

      </div>
    </section>
  );
}
