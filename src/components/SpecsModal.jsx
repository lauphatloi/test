import React from 'react';
import { X, Sliders, Check } from 'lucide-react';
import { soundFx } from '../utils/audio';

const SPEC_SECTIONS = [
  {
    title: 'Kích Thước & Trọng Lượng',
    specs: [
      { label: 'Khối lượng bản thân', value: '172 kg' },
      { label: 'Dài x Rộng x Cao', value: '2.160 mm x 743 mm x 1.162 mm' },
      { label: 'Khoảng cách trục bánh xe', value: '1.450 mm' },
      { label: 'Độ cao yên', value: '805 mm' },
      { label: 'Khoảng sáng gầm xe', value: '132 mm' },
      { label: 'Dung tích bình xăng', value: '9.3 lít' },
    ]
  },
  {
    title: 'Động Cơ & Vận Hành',
    specs: [
      { label: 'Loại động cơ', value: 'eSP+, 4 kỳ, 4 van, làm mát bằng chất lỏng' },
      { label: 'Dung tích xi lanh', value: '329.6 cm³' },
      { label: 'Đường kính x hành trình piston', value: '77.0 mm x 70.7 mm' },
      { label: 'Tỷ số nén', value: '10.5:1' },
      { label: 'Công suất tối đa', value: '21.5 kW / 7.500 vòng/phút (29 HP)' },
      { label: 'Mô-men xoắn cực đại', value: '31.8 Nm / 5.250 vòng/phút' },
      { label: 'Hệ thống khởi động', value: 'Điện (ACG)' },
      { label: 'Mức tiêu thụ nhiên liệu', value: '3.48 L / 100 km' },
    ]
  },
  {
    title: 'Khung Xe & Hệ Thống Treo',
    specs: [
      { label: 'Cỡ lốp trước', value: '110/70-16 M/C 52S' },
      { label: 'Cỡ lốp sau', value: '130/70-16 M/C 61S' },
      { label: 'Hệ thống phuộc trước', value: 'Ống lồng đường kính 35mm, giảm chấn thủy lực' },
      { label: 'Hệ thống phuộc sau', value: 'Lò xo trụ đôi, giảm chấn thủy lực' },
      { label: 'Hệ thống phanh', value: 'Đĩa đơn trước & sau, tích hợp ABS 2 kênh' },
      { label: 'Hệ thống an toàn chủ động', value: 'HSTC (Honda Selectable Torque Control)' },
    ]
  }
];

export default function SpecsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-10 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => { soundFx.playClick(); onClose(); }}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sliders size={18} className="text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            HONDA MOTOR CORPORATION
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Bảng Thông Số Kỹ Thuật Chi Tiết SH350i
        </h3>
        <p className="mt-1 text-xs text-neutral-400">
          Các thông số tiêu chuẩn áp dụng cho phiên bản sản xuất chính hãng tại Việt Nam.
        </p>

        <div className="mt-8 space-y-8">
          {SPEC_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-red-400 pb-2 border-b border-white/10">
                {section.title}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {section.specs.map((item, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-white/5 text-xs">
                    <span className="text-neutral-400">{item.label}</span>
                    <span className="font-semibold text-neutral-200 text-right font-display ml-2">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
