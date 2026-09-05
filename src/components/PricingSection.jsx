import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../utils/audio';
import { Check, DollarSign, Calculator, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EDITIONS = [
  {
    id: 'premium',
    name: 'Phiên Bản Cao Cấp',
    sub: 'Premium Edition',
    price: 150990000,
    priceFormatted: '150.990.000',
    colors: ['Trắng Đen', 'Đỏ Đen'],
    badge: 'Thanh lịch hoàng gia',
    popular: false,
    colorAccent: '#38bdf8',
    features: [
      'Động cơ eSP+ 330cc 4 van làm mát dung dịch',
      'Hệ thống phanh ABS 2 kênh độc lập',
      'Khóa thông minh Honda SMART Key',
      'Mặt đồng hồ đôi kỹ thuật số LCD đa tầng',
      'Mâm xe màu bạc kim loại quý tộc',
      'Bảo hành chính hãng 3 năm hoặc 30.000 km'
    ]
  },
  {
    id: 'special',
    name: 'Phiên Bản Đặc Biệt',
    sub: 'Special Edition',
    price: 151990000,
    priceFormatted: '151.990.000',
    colors: ['Đen Nhám (Matte Black)', 'Bạc Đen'],
    badge: 'Lựa chọn nhiều nhất',
    popular: true,
    colorAccent: '#d97706',
    features: [
      'Toàn bộ trang bị của bản Cao Cấp',
      'Lớp sơn phủ mờ Matte Black siêu mịn độc bản',
      'Logo SH350i đúc nổi mạ vàng đồng sang trọng',
      'Kẹp phanh thể thao sơn đỏ tương phản',
      'Hệ thống kiểm soát lực xoắn HSTC',
      'Cổng sạc siêu tốc USB Type-C tích hợp'
    ]
  },
  {
    id: 'sport',
    name: 'Phiên Bản Thể Thao',
    sub: 'Sport Edition',
    price: 152490000,
    priceFormatted: '152.490.000',
    colors: ['Xám Xi Măng Độc Quyền'],
    badge: 'Đỉnh cao phong cách',
    popular: false,
    colorAccent: '#ef4444',
    features: [
      'Màu sơn xám xi măng biểu tượng thời thượng',
      'Tem thể thao SH phong cách đường đua châu Âu',
      'Cặp phuộc lò xo sau sơn đỏ nổi bật',
      'Kẹp phanh trước & sau sơn đỏ thể thao',
      'Vành đúc đen bóng viền chỉ đỏ khí động học',
      'Gói đặc quyền bảo dưỡng miễn phí 1 năm đầu'
    ]
  }
];

const PACKAGES = [
  { id: 'card', name: 'Thẻ Tín Dụng (Lãi suất 0%)', rate: 0.0, desc: 'Áp dụng cho 25 ngân hàng liên kết' },
  { id: 'hdsaison', name: 'Gói Tài Chính Ưu Đãi (0.65%/tháng)', rate: 0.0065, desc: 'Hồ sơ duyệt nhanh trong 15 phút' },
  { id: 'shinhan', name: 'Gói Vay Linh Hoạt (0.79%/tháng)', rate: 0.0079, desc: 'Không cần chứng minh thu nhập' },
];

export default function PricingSection({ onOpenTestRide }) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const calcRef = useRef(null);

  const [selectedEdition, setSelectedEdition] = useState(1); // Special edition default
  const [downPercent, setDownPercent] = useState(30);
  const [loanMonths, setLoanMonths] = useState(12);
  const [selectedPackage, setSelectedPackage] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Staggered Reveal of Pricing Cards on Scroll
      gsap.fromTo(cardsRef.current, {
        y: 80,
        opacity: 0,
        rotateY: 15,
        scale: 0.9,
      }, {
        y: 0,
        opacity: 1,
        rotateY: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse'
        }
      });

      // Reveal installment calculator container
      gsap.fromTo(calcRef.current, {
        y: 60,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: calcRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Calculation formulas
  const basePrice = EDITIONS[selectedEdition].price;
  const downPayment = Math.round((basePrice * downPercent) / 100);
  const loanAmount = basePrice - downPayment;
  const monthlyInterestRate = PACKAGES[selectedPackage].rate;
  const monthlyPrincipal = Math.round(loanAmount / loanMonths);
  const monthlyInterest = Math.round(loanAmount * monthlyInterestRate);
  const totalMonthly = monthlyPrincipal + monthlyInterest;

  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num) + ' VNĐ';
  };

  return (
    <section 
      id="pricing" 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#030509] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Lighting - Subtle executive ambience */}
      <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-slate-700/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 font-body">
            <DollarSign size={13} className="text-neutral-400" />
            HONDA FINANCIAL SERVICES • CHÍNH SÁCH BÁN HÀNG
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase">
            BẢNG GIÁ & <span className="text-gradient-platinum">DỰ TOÁN TRẢ GÓP</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed font-body">
            Sở hữu Honda SH350i với các giải pháp tài chính linh hoạt, thủ tục tinh gọn và minh bạch từ hệ thống Honda HEAD trên toàn quốc.
          </p>
        </div>

        {/* Pricing Cards Grid (Staggered 3D Reveal) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20 perspective-1500">
          {EDITIONS.map((edition, idx) => {
            const isSelected = selectedEdition === idx;
            return (
              <div
                key={edition.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                onClick={() => { soundFx.playClick(); setSelectedEdition(idx); }}
                className={`relative rounded-3xl transition-all duration-500 cursor-pointer flex flex-col justify-between p-6 sm:p-8 backdrop-blur-xl border ${
                  edition.popular 
                    ? 'glass-panel-glow border-white/20 shadow-xl md:-translate-y-2' 
                    : 'glass-panel border-white/[0.08] hover:border-white/20 hover:-translate-y-1'
                } ${isSelected ? 'ring-1 ring-white/40' : ''}`}
              >
                {/* Popular Highlight Badge */}
                {edition.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 font-body">
                    <Sparkles size={11} /> {edition.badge}
                  </div>
                )}

                <div>
                  {/* Top Category */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-body">
                      {edition.sub}
                    </span>
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: edition.colorAccent }}
                    />
                  </div>

                  {/* Edition Name */}
                  <h3 className="font-display text-2xl font-bold text-white mt-2">
                    {edition.name}
                  </h3>

                  {/* Color Options Available */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {edition.colors.map((c, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/[0.06] font-body">
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Price Tag */}
                  <div className="mt-6 pt-6 border-t border-white/[0.08]">
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold font-body">Giá Bán Lẻ Đề Xuất</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        {edition.priceFormatted}
                      </span>
                      <span className="text-xs font-semibold text-neutral-400 font-body">VNĐ</span>
                    </div>
                    <span className="block text-[11px] text-neutral-400 mt-0.5 font-body">
                      Đã bao gồm VAT 10%
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-6 space-y-2.5 pt-4 border-t border-white/[0.08]">
                    {edition.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 font-body">
                        <Check size={13} className="text-white/80 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playRev();
                      onOpenTestRide(edition.name);
                    }}
                    className={`w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-display ${
                      edition.popular
                        ? 'honda-red-btn'
                        : 'bg-white/[0.06] text-white hover:bg-white/[0.1] border border-white/10'
                    }`}
                  >
                    <span>Đăng Ký Đặt Xe</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Real-time Interactive Installment Calculator Box */}
        <div 
          ref={calcRef}
          className="glass-panel rounded-3xl border border-white/15 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-red-400 mb-1">
                <Calculator size={16} /> BỘ CÔNG CỤ TÍNH TRẢ GÓP TỰ ĐỘNG
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Dự Toán Chi Phí Hàng Tháng
              </h3>
            </div>

            {/* Selected Bike Pill */}
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
              <span className="text-xs text-neutral-400">Đang chọn:</span>
              <span className="text-xs font-bold text-white font-display">
                {EDITIONS[selectedEdition].name}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
            
            {/* Left Controls: Sliders & Tenure (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Down Payment Slider */}
              <div>
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="font-semibold text-neutral-300">Tỷ Lệ Trả Trước:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-400 font-mono text-sm">{downPercent}%</span>
                    <span className="text-neutral-400">({formatVND(downPayment)})</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="20"
                  max="70"
                  step="5"
                  value={downPercent}
                  onChange={(e) => setDownPercent(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                  <span>20% (Tối thiểu)</span>
                  <span>40%</span>
                  <span>60%</span>
                  <span>70% (Tối đa)</span>
                </div>
              </div>

              {/* Loan Term Selector */}
              <div>
                <span className="block text-xs font-semibold text-neutral-300 mb-2">
                  Thời Gian Vay:
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {[6, 12, 18, 24, 36].map((months) => (
                    <button
                      key={months}
                      onClick={() => { soundFx.playClick(); setLoanMonths(months); }}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        loanMonths === months
                          ? 'bg-red-600 text-white shadow-lg shadow-red-600/40'
                          : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                      }`}
                    >
                      {months} tháng
                    </button>
                  ))}
                </div>
              </div>

              {/* Finance Partner Option */}
              <div>
                <span className="block text-xs font-semibold text-neutral-300 mb-2">
                  Chương Trình Lãi Suất Ưu Đãi:
                </span>
                <div className="space-y-2">
                  {PACKAGES.map((pkg, idx) => (
                    <div
                      key={pkg.id}
                      onClick={() => { soundFx.playClick(); setSelectedPackage(idx); }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedPackage === idx
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">{pkg.name}</span>
                        <span className="text-[11px] text-neutral-400">{pkg.desc}</span>
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedPackage === idx ? 'border-red-500 bg-red-500' : 'border-white/30'
                      }`}>
                        {selectedPackage === idx && <Check size={10} className="text-white" />}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Summary Table (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-black/50 border border-white/10">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block pb-2 border-b border-white/10">
                  Chi Tiết Khoản Thanh Toán
                </span>

                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Giá trị xe niêm yết:</span>
                  <span className="font-semibold text-white">{formatVND(basePrice)}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Số tiền trả trước ({downPercent}%):</span>
                  <span className="font-semibold text-amber-400">{formatVND(downPayment)}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Số tiền vay còn lại:</span>
                  <span className="font-semibold text-white">{formatVND(loanAmount)}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Tiền gốc hàng tháng:</span>
                  <span className="font-semibold text-white">{formatVND(monthlyPrincipal)}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Tiền lãi ước tính hàng tháng:</span>
                  <span className="font-semibold text-white">{formatVND(monthlyInterest)}</span>
                </div>
              </div>

              {/* Total Monthly Payment Big Box */}
              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <span className="text-[10px] uppercase font-semibold text-neutral-400 block font-body">
                  Tổng Trả Góp Ước Tính Hàng Tháng
                </span>
                <div className="font-display text-3xl sm:text-4xl font-bold text-gradient-platinum mt-1">
                  {formatVND(totalMonthly)}
                  <span className="text-xs font-normal text-neutral-400 ml-1 font-body">/tháng</span>
                </div>

                <button
                  onClick={() => { soundFx.playRev(); onOpenTestRide(EDITIONS[selectedEdition].name); }}
                  className="mt-5 w-full py-3 rounded-xl honda-red-btn text-white text-xs font-semibold uppercase tracking-wider hover:scale-[1.01] active:scale-95 transition-all cursor-pointer font-display"
                >
                  Nhận Báo Giá Lăn Bánh Chi Tiết
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
