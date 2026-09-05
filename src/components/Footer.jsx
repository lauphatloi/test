import React from 'react';
import { ArrowUp, Phone, MapPin, Mail, Shield, Award } from 'lucide-react';
import gsap from 'gsap';
import { soundFx } from '../utils/audio';

export default function Footer({ onOpenTestRide }) {
  const scrollToTop = () => {
    soundFx.playClick();
    gsap.to(window, {
      duration: 1.5,
      scrollTo: 0,
      ease: 'power3.inOut'
    });
  };

  return (
    <footer className="relative bg-black text-white pt-20 pb-12 border-t border-white/10 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Pre-Footer Action Banner */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/15 backdrop-blur-xl mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">
              TRẢI NGHIỆM ĐỘC QUYỀN
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white mt-1">
              Sẵn Sàng Làm Chủ Đỉnh Cao SH350i?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl">
              Liên hệ ngay hệ thống Cửa hàng Bán xe và Dịch vụ do Honda Ủy nhiệm (HEAD) trên toàn quốc để nhận tư vấn chuyên sâu và đặt lịch lái thử riêng biệt.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { soundFx.playRev(); onOpenTestRide(); }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Đăng Ký Lái Thử Ngay
            </button>
            <a
              href="tel:18008001"
              className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Phone size={14} className="text-emerald-400" />
              <span>Hotline: 1800 8001</span>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-xs">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-extrabold text-white tracking-tight">
                HONDA SH350i
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-red-600 rounded-full">
                eSP+
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Biểu tượng xe tay ga cỡ lớn sang trọng hàng đầu Việt Nam, mang đẳng cấp quý tộc Ý và sức mạnh công nghệ đột phá.
            </p>
            <div className="flex items-center gap-2 text-neutral-400">
              <Shield size={14} className="text-red-500" />
              <span>Bảo hành chính hãng 3 năm / 30.000 km</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#colors" className="hover:text-red-400 transition-colors">Bộ Sưu Tập Màu Sắc 3D</a></li>
              <li><a href="#design" className="hover:text-red-400 transition-colors">Ngôn Ngữ Thiết Kế Ý</a></li>
              <li><a href="#engine" className="hover:text-red-400 transition-colors">Động Cơ eSP+ 330cc</a></li>
              <li><a href="#technology" className="hover:text-red-400 transition-colors">Công Nghệ An Toàn Phanh ABS</a></li>
              <li><a href="#pricing" className="hover:text-red-400 transition-colors">Bảng Tính Phí Trả Góp</a></li>
            </ul>
          </div>

          {/* Col 3: Dịch vụ khách hàng */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Dịch Vụ & Hỗ Trợ
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>Ứng dụng My Honda+ Connect</li>
              <li>Chính sách bảo hành & bảo dưỡng</li>
              <li>Dịch vụ Cứu hộ khẩn cấp 24/7</li>
              <li>Phụ kiện & Đồ chơi chính hãng</li>
              <li>Hướng dẫn sử dụng xe an toàn</li>
            </ul>
          </div>

          {/* Col 4: Hotline & Liên hệ */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Tổng Đài Chăm Sóc
            </h4>
            <div className="space-y-2.5 text-neutral-400">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-red-500" />
                <span className="font-mono font-bold text-white">1800 8001 (Miễn phí)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-red-500" />
                <span>cr@honda.com.vn</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-red-500 shrink-0 mt-0.5" />
                <span>Mạng lưới hơn 800 đại lý HEAD trên toàn quốc</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© 2026 Honda Motor Vietnam Co., Ltd. Tất cả quyền được bảo lưu. Thiết kế phong cách Scrollytelling Nghệ Thuật GSAP.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Lên đầu trang</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
}
