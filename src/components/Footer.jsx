import React from 'react';
import { ArrowUp, Phone, MapPin, Mail, Shield, Award } from 'lucide-react';
import gsap from 'gsap';
import { soundFx } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

export default function Footer({ onOpenTestRide }) {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    soundFx.playClick();
    gsap.to(window, {
      duration: 1.5,
      scrollTo: 0,
      ease: 'power3.inOut'
    });
  };

  return (
    <footer className={`relative pt-20 pb-12 overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-black text-white border-t border-white/10' : 'bg-slate-100 text-slate-900 border-t border-slate-200'
    }`}>
      {/* Background ambient accents */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent ${
        isDark ? 'via-red-500/50' : 'via-red-600/40'
      } to-transparent`} />
      <div className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[140px] pointer-events-none ${
        isDark ? 'bg-red-600/10' : 'bg-red-500/5'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Pre-Footer Action Banner */}
        <div className={`p-8 sm:p-12 rounded-3xl backdrop-blur-xl mb-16 flex flex-col lg:flex-row items-center justify-between gap-6 transition-all ${
          isDark 
            ? 'glass-panel border border-white/[0.08]' 
            : 'bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50'
        }`}>
          <div>
            <span className={`text-[11px] font-semibold uppercase tracking-[0.2em] font-body ${
              isDark ? 'text-neutral-400' : 'text-slate-500'
            }`}>
              HONDA VIỆT NAM • ĐẶC QUYỀN TRẢI NGHIỆM
            </span>
            <h3 className={`font-display text-2xl sm:text-3xl font-bold mt-1 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Khám Phá Trực Tiếp Tại Honda HEAD
            </h3>
            <p className={`mt-2 text-xs sm:text-sm max-w-xl font-body ${
              isDark ? 'text-neutral-400' : 'text-slate-600'
            }`}>
              Liên hệ ngay hệ thống Cửa hàng Bán xe và Dịch vụ do Honda Ủy nhiệm (HEAD) trên toàn quốc để nhận tư vấn chuyên sâu và đặt lịch lái thử riêng biệt.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { soundFx.playRev(); onOpenTestRide(); }}
              className="px-6 py-3 rounded-xl honda-red-btn text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer font-display"
            >
              Đăng Ký Lái Thử
            </button>
            <a
              href="tel:18008001"
              className={`px-5 py-3 rounded-xl border text-xs font-medium transition-colors flex items-center gap-2 font-body ${
                isDark 
                  ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Phone size={13} className={isDark ? 'text-neutral-400' : 'text-slate-500'} />
              <span>Hotline: 1800 8001 (Miễn phí)</span>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b text-xs ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className={`font-display text-2xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                HONDA SH350i
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-red-600 text-white rounded-full">
                eSP+
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              Biểu tượng xe tay ga cỡ lớn sang trọng hàng đầu Việt Nam, mang đẳng cấp quý tộc Ý và sức mạnh công nghệ đột phá.
            </p>
            <div className={`flex items-center gap-2 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              <Shield size={14} className="text-red-600" />
              <span>Bảo hành chính hãng 3 năm / 30.000 km</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className={`font-bold uppercase tracking-wider mb-3 text-xs ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Khám Phá
            </h4>
            <ul className={`space-y-2 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              <li><a href="#colors" className="hover:text-red-600 transition-colors">Bộ Sưu Tập Màu Sắc 3D</a></li>
              <li><a href="#design" className="hover:text-red-600 transition-colors">Ngôn Ngữ Thiết Kế Ý</a></li>
              <li><a href="#engine" className="hover:text-red-600 transition-colors">Động Cơ eSP+ 330cc</a></li>
              <li><a href="#technology" className="hover:text-red-600 transition-colors">Công Nghệ An Toàn Phanh ABS</a></li>
              <li><a href="#pricing" className="hover:text-red-600 transition-colors">Bảng Tính Phí Trả Góp</a></li>
            </ul>
          </div>

          {/* Col 3: Dịch vụ khách hàng */}
          <div>
            <h4 className={`font-bold uppercase tracking-wider mb-3 text-xs ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Dịch Vụ & Hỗ Trợ
            </h4>
            <ul className={`space-y-2 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              <li>Ứng dụng My Honda+ Connect</li>
              <li>Chính sách bảo hành & bảo dưỡng</li>
              <li>Dịch vụ Cứu hộ khẩn cấp 24/7</li>
              <li>Phụ kiện & Đồ chơi chính hãng</li>
              <li>Hướng dẫn sử dụng xe an toàn</li>
            </ul>
          </div>

          {/* Col 4: Hotline & Liên hệ */}
          <div>
            <h4 className={`font-bold uppercase tracking-wider mb-3 text-xs ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Tổng Đài Chăm Sóc
            </h4>
            <div className={`space-y-2.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-red-600" />
                <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>1800 8001 (Miễn phí)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-red-600" />
                <span>cr@honda.com.vn</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-red-600 shrink-0 mt-0.5" />
                <span>Mạng lưới hơn 800 đại lý HEAD trên toàn quốc</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Back to Top */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] ${
          isDark ? 'text-neutral-500' : 'text-slate-500'
        }`}>
          <p>© 2026 Honda Motor Vietnam Co., Ltd. Tất cả quyền được bảo lưu. Thiết kế phong cách Scrollytelling Nghệ Thuật GSAP.</p>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white' 
                : 'bg-white hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm'
            }`}
          >
            <span>Lên đầu trang</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
}
