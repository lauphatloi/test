import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, User, Phone, MapPin, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

const CITIES = [
  'Hà Nội (HEAD Kường Ngân, Thắng Lợi...)',
  'TP. Hồ Chí Minh (HEAD Phát Tiến, Visacoop...)',
  'Đà Nẵng (HEAD Tiến Thu...)',
  'Hải Phòng (HEAD Hương Giang...)',
  'Cần Thơ (HEAD Hóa Cần Thơ...)',
  'Bình Dương (HEAD Giáp Bình Dương...)',
  'Đồng Nai (HEAD Nam Hưng...)'
];

export default function TestRideModal({ isOpen, onClose, preselectedEdition }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    edition: preselectedEdition || 'Phiên Bản Đặc Biệt (Đen Nhám)',
    city: CITIES[0],
    date: new Date().toISOString().split('T')[0],
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFx.playRev();
    const code = 'SH350-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setSubmitted(true);
  };

  const resetAndClose = () => {
    soundFx.playClick();
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-8 text-white shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-red-400">
                ĐẶC QUYỀN TRẢI NGHIỆM HONDA SH350i
              </span>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Đăng Ký Lái Thử & Nhận Ưu Đãi
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              Nhận ngay voucher phụ kiện cao cấp 5.000.000 VNĐ khi hoàn tất đăng ký.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <User size={13} className="text-red-400" /> Họ và Tên Quý Khách
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Phone size={13} className="text-red-400" /> Số Điện Thoại
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0988 888 888"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-amber-400" /> Phiên Bản Quan Tâm
                  </label>
                  <select
                    value={formData.edition}
                    onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#11131a] border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 transition-colors"
                  >
                    <option value="Phiên Bản Thể Thao (Xám Xi Măng)">Bản Thể Thao (Xám Xi Măng)</option>
                    <option value="Phiên Bản Đặc Biệt (Đen Nhám)">Bản Đặc Biệt (Đen Nhám)</option>
                    <option value="Phiên Bản Cao Cấp (Trắng Ngọc Trai)">Bản Cao Cấp (Trắng Ngọc Trai)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar size={13} className="text-cyan-400" /> Ngày Dự Kiến Lái Thử
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#11131a] border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin size={13} className="text-emerald-400" /> Đại Lý Honda HEAD Tiếp Nhận
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#11131a] border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 transition-colors"
                >
                  {CITIES.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  Xác Nhận Đăng Ký Lái Thử
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="font-display text-2xl font-bold text-white">
              Đăng Ký Thành Công!
            </h3>
            
            <p className="mt-2 text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Cảm ơn quý khách <strong className="text-white">{formData.name}</strong>. Đại diện tư vấn Honda HEAD sẽ liên hệ xác nhận trong vòng 15 phút.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 inline-block text-left">
              <div className="text-[10px] text-neutral-400 uppercase font-semibold">Mã Lịch Hẹn Ưu Tiên</div>
              <div className="font-mono text-xl font-bold text-gradient-gold tracking-widest mt-0.5">
                {bookingCode}
              </div>
              <div className="text-[11px] text-neutral-300 mt-1">
                Dòng xe: {formData.edition}
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
