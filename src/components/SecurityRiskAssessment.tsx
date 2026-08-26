import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Flame, 
  Eye, 
  Lock, 
  ArrowRight, 
  FileCheck, 
  Zap, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface SecurityRiskAssessmentProps {
  onOpenConsultationWithData: (riskData: any) => void;
}

export const SecurityRiskAssessment: React.FC<SecurityRiskAssessmentProps> = ({ 
  onOpenConsultationWithData 
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  
  // Form values
  const [facilityType, setFacilityType] = useState<string>('factory');
  const [areaSize, setAreaSize] = useState<string>('medium');
  const [currentGuards, setCurrentGuards] = useState<string>('internal');
  const [selectedRisks, setSelectedRisks] = useState<string[]>([
    'blind_spots',
    'theft'
  ]);

  const toggleRisk = (riskKey: string) => {
    if (selectedRisks.includes(riskKey)) {
      setSelectedRisks(selectedRisks.filter((r) => r !== riskKey));
    } else {
      setSelectedRisks([...selectedRisks, riskKey]);
    }
  };

  // Calculate dynamic security risk score based on inputs
  const calculateRiskMetrics = () => {
    let score = 40;
    if (facilityType === 'factory' || facilityType === 'warehouse') score += 20;
    if (facilityType === 'bank' || facilityType === 'jewelry') score += 25;
    if (facilityType === 'building') score += 15;

    if (areaSize === 'large') score += 20;
    if (areaSize === 'medium') score += 10;

    if (currentGuards === 'none') score += 25;
    if (currentGuards === 'internal') score += 15;

    score += selectedRisks.length * 8;

    score = Math.min(Math.max(score, 25), 96);

    let level = 'Trung Bình';
    let levelColor = 'text-amber-400';
    let badgeBg = 'bg-amber-950/80 border-amber-500/40';

    if (score >= 70) {
      level = 'Rất Cao - Nguy cơ tiềm ẩn lớn';
      levelColor = 'text-[#c5a059]';
      badgeBg = 'bg-[#c5a059]/10 border-[#c5a059]/40';
    } else if (score < 50) {
      level = 'Thấp đến Trung Bình';
      levelColor = 'text-emerald-400';
      badgeBg = 'bg-emerald-950/80 border-emerald-500/40';
    }

    return { score, level, levelColor, badgeBg };
  };

  const metrics = calculateRiskMetrics();

  const handleFinishScan = () => {
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedRisks(['blind_spots', 'theft']);
  };

  return (
    <section 
      id="risk-assessment-section" 
      className="bg-[#0d0d0f] text-white py-20 border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 bg-[#111114] border border-white/10 text-[#c5a059] text-[10px] font-bold uppercase tracking-[0.25em] font-mono mb-3">
            CÔNG CỤ QUÉT AN NINH TRỰC TUYẾN
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-['Plus_Jakarta_Sans']">
            Kiểm Tra Mức Độ Rủi Ro An Ninh Cho Doanh Nghiệp
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Doanh nghiệp của bạn có đang đối mặt với nguy cơ thất thoát tài sản, xâm nhập trái phép hay sự cố PCCC? Kiểm tra ngay chỉ trong 1 phút để nhận phương án bố trí lực lượng tối ưu.
          </p>
        </div>

        {/* Interactive Scanner Console */}
        <div className="bg-[#111114] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl relative">
          {/* Scanner Header Steps */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#c5a059]/40 bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight font-mono">
                  ĐÁNH GIÁ RỦI RO
                </h3>
                <p className="text-xs text-gray-400 font-light">
                  Hệ thống phân tích rủi ro an ninh & đề xuất bố trí phương án bảo vệ
                </p>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center gap-2 text-xs font-bold font-mono">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex items-center justify-center w-8 h-8 transition-all border ${
                    step === s
                      ? 'bg-[#c5a059] text-black border-[#c5a059] font-black'
                      : step > s
                      ? 'bg-[#0d0d0f] text-[#c5a059] border-[#c5a059]/40'
                      : 'bg-[#0d0d0f] text-gray-600 border-white/5'
                  }`}
                >
                  {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Chọn loại hình mục tiêu */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="text-base font-bold text-white uppercase tracking-wider mb-1">
                  Bước 1: Chọn mô hình cơ sở & mục tiêu cần bảo vệ
                </h4>
                <p className="text-xs text-gray-400 font-light">
                  Mỗi loại hình có đặc thù rủi ro và tiêu chuẩn kiểm soát hoàn toàn khác nhau.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { id: 'factory', label: 'Khu Công Nghiệp & Nhà Máy', desc: 'Kiểm soát hàng rào, xuất nhập kho, công nhân' },
                  { id: 'building', label: 'Tòa Nhà Văn Phòng & Cao Ốc', desc: 'Kiểm soát thang máy, hầm xe, sảnh chính' },
                  { id: 'warehouse', label: 'Kho Bãi Logistics & Cảng', desc: 'Chống thất thoát hàng hóa, niêm phong container' },
                  { id: 'bank', label: 'Ngân Hàng & Phòng Giao Dịch', desc: 'An ninh quầy quỹ, cướp giật, áp tải tiền' },
                  { id: 'retail', label: 'Chuỗi Cửa Hàng & TTTM', desc: 'Chống trộm cắp vặt, giữ xe, đón khách' },
                  { id: 'event', label: 'Sự Kiện & Yếu Nhân VIP', desc: 'Bảo vệ cự ly gần, phân luồng khán giả' },
                ].map((item) => (
                  <div
                    key={item.id}
                    id={`facility-option-${item.id}`}
                    onClick={() => setFacilityType(item.id)}
                    className={`p-4 border cursor-pointer transition-all ${
                      facilityType === item.id
                        ? 'bg-[#c5a059]/10 border-[#c5a059] text-white'
                        : 'bg-[#0d0d0f] border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs uppercase tracking-wide text-white">{item.label}</span>
                      {facilityType === item.id && <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />}
                    </div>
                    <p className="text-xs text-gray-400 font-light">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  id="risk-step1-next-btn"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 bg-[#c5a059] hover:brightness-110 text-black font-black text-xs uppercase tracking-widest px-6 py-3 transition-all"
                >
                  <span>Tiếp tục: Quy mô & Diện tích</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Quy mô & Hiện trạng lực lượng */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="text-base font-bold text-white uppercase tracking-wider mb-1">
                  Bước 2: Quy mô diện tích & Hiện trạng an ninh
                </h4>
                <p className="text-xs text-gray-400 font-light">
                  Cung cấp thông tin diện tích để ước tính số lượng chốt gác cần thiết.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Diện tích mục tiêu
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'small', label: 'Dưới 2.000 m² (Văn phòng, Showroom nhỏ)' },
                      { id: 'medium', label: '2.000 m² - 20.000 m² (Nhà xưởng vừa, Tòa nhà 10 tầng)' },
                      { id: 'large', label: 'Trên 20.000 m² (KCN, Kho lớn, Dự án phức hợp)' },
                    ].map((sz) => (
                      <div
                        key={sz.id}
                        onClick={() => setAreaSize(sz.id)}
                        className={`p-3.5 border cursor-pointer text-xs font-semibold transition-all ${
                          areaSize === sz.id
                            ? 'bg-[#c5a059]/10 border-[#c5a059] text-white'
                            : 'bg-[#0d0d0f] border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {sz.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Hiện trạng lực lượng bảo vệ hiện tại
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'none', label: 'Chưa có bảo vệ chuyên nghiệp (Tự quản)' },
                      { id: 'internal', label: 'Bảo vệ nội bộ tự tuyển (Chưa qua đào tạo bài bản)' },
                      { id: 'other_company', label: 'Đang thuê công ty khác nhưng chưa hài lòng chất lượng' },
                    ].map((cg) => (
                      <div
                        key={cg.id}
                        onClick={() => setCurrentGuards(cg.id)}
                        className={`p-3.5 border cursor-pointer text-xs font-semibold transition-all ${
                          currentGuards === cg.id
                            ? 'bg-[#c5a059]/10 border-[#c5a059] text-white'
                            : 'bg-[#0d0d0f] border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {cg.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider hover:bg-white/5"
                >
                  Quay lại
                </button>
                <button
                  id="risk-step2-next-btn"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 bg-[#c5a059] hover:brightness-110 text-black font-black text-xs uppercase tracking-widest px-6 py-3 transition-all"
                >
                  <span>Tiếp tục: Chọn các lỗ hổng lo ngại</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Lỗ hổng & Nguy cơ an ninh */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="text-base font-bold text-white uppercase tracking-wider mb-1">
                  Bước 3: Các mối lo ngại an ninh mục tiêu đang gặp phải (Chọn nhiều)
                </h4>
                <p className="text-xs text-gray-400 font-light">
                  Hệ thống đối chiếu với cơ sở dữ liệu các sự cố an ninh thực tế để đưa ra cảnh báo chính xác.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'blind_spots', title: 'Điểm mù camera & hàng rào dễ đột nhập', icon: Eye },
                  { id: 'theft', title: 'Nguy cơ tuồn hàng, trộm cắp nội bộ ca đêm', icon: Lock },
                  { id: 'pccc', title: 'Rủi ro chập cháy điện, vi phạm quy định PCCC', icon: Flame },
                  { id: 'guard_attitude', title: 'Bảo vệ ngủ gật, lơ là, tác phong thiếu lịch sự', icon: AlertTriangle },
                  { id: 'traffic_jam', title: 'Ùn tắc cổng chính vào giờ cao điểm xuất nhập', icon: Activity },
                  { id: 'asset_damage', title: 'Không có bảo hiểm bồi thường rủi ro tài sản', icon: ShieldAlert },
                ].map((item) => {
                  const Icon = item.icon;
                  const isChecked = selectedRisks.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      id={`risk-item-${item.id}`}
                      onClick={() => toggleRisk(item.id)}
                      className={`p-4 border cursor-pointer flex items-center gap-3 transition-all ${
                        isChecked
                          ? 'bg-[#c5a059]/10 border-[#c5a059] text-white'
                          : 'bg-[#0d0d0f] border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-4 h-4 flex items-center justify-center border ${isChecked ? 'bg-[#c5a059] border-[#c5a059] text-black' : 'border-white/20'}`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <Icon className={`w-4 h-4 ${isChecked ? 'text-[#c5a059]' : 'text-gray-500'}`} />
                      <span className="text-xs font-medium">{item.title}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider hover:bg-white/5"
                >
                  Quay lại
                </button>
                <button
                  id="risk-scan-complete-btn"
                  onClick={handleFinishScan}
                  className="flex items-center gap-2 bg-[#c5a059] hover:brightness-110 text-black font-black text-xs uppercase tracking-widest px-7 py-3 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Xem Báo Cáo Đánh Giá Rủi Ro Tức Thì</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RESULT DASHBOARD */}
          {step === 4 && (
            <div className="space-y-8 animate-in zoom-in-95 duration-400">
              {/* Score Header */}
              <div className="bg-[#0d0d0f] border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  {/* Circular Score Gauge */}
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center bg-[#111114] border-2 border-[#c5a059]">
                    <div className="text-center">
                      <span className="text-2xl font-black text-white font-mono">
                        {metrics.score}
                      </span>
                      <span className="text-[9px] block text-gray-400 uppercase font-mono">/ 100 Điểm</span>
                    </div>
                  </div>

                  <div>
                    <span className={`inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase border mb-2 ${metrics.badgeBg} ${metrics.levelColor}`}>
                      Cảnh báo: {metrics.level}
                    </span>
                    <h4 className="text-base font-bold text-white uppercase tracking-tight">
                      Báo Cáo Đánh Giá Rủi Ro Cơ Sở Của Bạn
                    </h4>
                    <p className="text-xs text-gray-400 font-light mt-1 max-w-md leading-relaxed">
                      Dựa trên phân tích 1.200+ sự cố an ninh thực tế, cơ sở của bạn cần khẩn trương kiện toàn các chốt kiểm soát cổng và tăng cường tuần tra đêm.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#c5a059] border border-white/10 hover:border-[#c5a059]/50 px-3 py-2 transition-all font-mono uppercase"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Kiểm tra lại</span>
                </button>
              </div>

              {/* Recommended Security Layout & Guard Allocation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0d0d0f] border border-white/10 p-5">
                  <div className="flex items-center gap-2 text-[#c5a059] font-bold text-xs uppercase mb-3 font-mono">
                    <Lock className="w-4 h-4" />
                    <span>Phương Án Bố Trí Đề Xuất</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-300 font-light">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c5a059] font-mono font-bold text-xs shrink-0">—</span>
                      <span><strong>02 Vị trí Chốt Cổng:</strong> Kiểm soát người & phương tiện ra vào 24/7</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c5a059] font-mono font-bold text-xs shrink-0">—</span>
                      <span><strong>01 Vị trí Tuần Tra Cơ Động:</strong> Tuần tra hàng rào điểm mù bằng Smart Patrol</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c5a059] font-mono font-bold text-xs shrink-0">—</span>
                      <span><strong>01 Vị trí Trực Camera / SOC:</strong> Giám sát báo động khẩn cấp</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#0d0d0f] border border-white/10 p-5">
                  <div className="flex items-center gap-2 text-[#c5a059] font-bold text-xs uppercase mb-3 font-mono">
                    <Flame className="w-4 h-4" />
                    <span>Kiện Toàn An Toàn & PCCC</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-300 font-light">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c5a059] font-mono font-bold text-xs shrink-0">—</span>
                      <span>Kiểm tra áp lực van vòi PCCC & bình bọt định kỳ thứ Hai hàng tuần</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c5a059] font-mono font-bold text-xs shrink-0">—</span>
                      <span>Tập huấn sơ tán khẩn cấp cho toàn bộ nhân viên nhà máy/tòa nhà</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c5a059] font-mono font-bold text-xs shrink-0">—</span>
                      <span>Bảo hiểm trách nhiệm 20 Tỷ cam kết bồi thường 100% tài sản</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#0d0d0f] border border-white/10 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#c5a059] font-bold text-xs uppercase mb-3 font-mono">
                      <FileCheck className="w-4 h-4" />
                      <span>Ước Tính Ngân Sách</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      Tiết kiệm <strong>25% - 35%</strong> so với chi phí tự tuyển dụng, đào tạo và chịu rủi ro bồi thường tài sản.
                    </p>
                    <div className="mt-3 p-3 bg-[#111114] border border-white/10 text-center">
                      <span className="text-[10px] text-gray-400 uppercase font-mono block">Dự toán sơ bộ</span>
                      <span className="text-sm font-black text-[#c5a059] font-mono">Từ 16.000.000 VNĐ / Vị trí 24/7</span>
                    </div>
                  </div>

                  <button
                    id="receive-detailed-plan-btn"
                    onClick={() => onOpenConsultationWithData({
                      facilityType,
                      areaSize,
                      selectedRisks,
                      metrics
                    })}
                    className="w-full mt-4 py-3 bg-[#c5a059] hover:brightness-110 text-black font-black text-xs uppercase tracking-widest transition-all text-center"
                  >
                    Nhận Bản Phương Án Chi Tiết
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

