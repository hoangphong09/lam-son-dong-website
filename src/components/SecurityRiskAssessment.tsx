import React, { useState } from 'react';
import { 
  Check,
  CheckCircle2, 
  ArrowRight, 
  RotateCcw,
  PhoneCall,
  Send,
  AlertCircle,
  Clock
} from 'lucide-react';
import { createQuoteRequest } from '../lib/supabase';

interface SecurityRiskAssessmentProps {
  onOpenConsultationWithData: (riskData: any) => void;
}

const FACILITY_OPTIONS = [
  { id: 'factory', label: 'Khu Công Nghiệp & Nhà Máy', desc: 'Kiểm soát hàng rào, xuất nhập kho, công nhân' },
  { id: 'building', label: 'Tòa Nhà Văn Phòng & Cao Ốc', desc: 'Kiểm soát thang máy, hầm xe, sảnh chính' },
  { id: 'warehouse', label: 'Kho Bãi Vận Tải & Cảng Biển', desc: 'Chống thất thoát hàng hóa, niêm phong thùng hàng' },
  { id: 'bank', label: 'Ngân Hàng & Phòng Giao Dịch', desc: 'An ninh quầy quỹ, cướp giật, áp tải tiền' },
  { id: 'retail', label: 'Chuỗi Cửa Hàng & Trung Tâm Thương Mại', desc: 'Chống trộm cắp vặt, giữ xe, đón khách' },
  { id: 'event', label: 'Sự Kiện & Khách Mời Cấp Cao', desc: 'Bảo vệ cự ly gần, phân luồng người tham dự' },
];

const AREA_OPTIONS = [
  { id: 'small', label: 'Dưới 2.000 m² (Văn phòng, Phòng trưng bày nhỏ)' },
  { id: 'medium', label: '2.000 m² - 20.000 m² (Nhà xưởng vừa, Tòa nhà 10 tầng)' },
  { id: 'large', label: 'Trên 20.000 m² (KCN, Kho bãi lớn, Dự án phức hợp)' },
];

const GUARD_OPTIONS = [
  { id: 'none', label: 'Chưa có bảo vệ chuyên nghiệp (Tự quản)' },
  { id: 'internal', label: 'Bảo vệ nội bộ tự tuyển (Chưa qua đào tạo bài bản)' },
  { id: 'other_company', label: 'Đang thuê công ty khác nhưng chưa hài lòng chất lượng' },
];

const RISK_OPTIONS = [
  { 
    id: 'blind_spots', 
    title: 'Điểm mù camera & hàng rào dễ đột nhập',
    desc: 'Thiếu camera góc khuất, tường rào thấp, chiếu sáng ban đêm chưa khép kín',
    category: 'Vành đai & Ngoại vi'
  },
  { 
    id: 'theft', 
    title: 'Nguy cơ tuồn hàng, trộm cắp nội bộ ca đêm',
    desc: 'Lỗ hổng kiểm soát công nhân, xe chở hàng, niêm phong kho bãi lỏng lẻo',
    category: 'Kiểm soát tài sản'
  },
  { 
    id: 'pccc', 
    title: 'Rủi ro chập cháy điện, vi phạm quy định PCCC',
    desc: 'Hệ thống báo cháy, bình bọt chưa kiểm định, thiếu phương án ứng phó khẩn',
    category: 'An toàn PCCC'
  },
  { 
    id: 'guard_attitude', 
    title: 'Bảo vệ ngủ gật, lơ là, tác phong thiếu lịch sự',
    desc: 'Nhân viên trực thiếu kỷ luật, bỏ vị trí, giao tiếp thiếu chuyên nghiệp',
    category: 'Kỷ luật nhân sự'
  },
  { 
    id: 'traffic_jam', 
    title: 'Ùn tắc cổng chính vào giờ cao điểm xuất nhập',
    desc: 'Quy trình kiểm tra thủ công gây chậm luồng xe giao nhận hàng hóa',
    category: 'Điều tiết giao thông'
  },
  { 
    id: 'asset_damage', 
    title: 'Không có cam kết bồi thường rủi ro tài sản',
    desc: 'Hợp đồng thiếu rõ ràng về trách nhiệm đền bù khi xảy ra mất mát hàng hóa',
    category: 'Trách nhiệm pháp lý'
  },
];

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

  // Fast Lead Contact States (Step 4 Demo Conversion)
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactNote, setContactNote] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

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
    let levelColor = 'text-amber-800';
    let badgeBg = 'bg-amber-100 border-amber-300';

    if (score >= 70) {
      level = 'Rất Cao - Nguy cơ tiềm ẩn lớn';
      levelColor = 'text-red-700';
      badgeBg = 'bg-red-100 border-red-300';
    } else if (score < 50) {
      level = 'Thấp đến Trung Bình';
      levelColor = 'text-emerald-700';
      badgeBg = 'bg-emerald-100 border-emerald-300';
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
    setContactSubmitted(false);
    setContactError(null);
  };

  const getFacilityLabel = (id: string) => FACILITY_OPTIONS.find((f) => f.id === id)?.label || id;
  const getAreaLabel = (id: string) => AREA_OPTIONS.find((a) => a.id === id)?.label || id;
  const getGuardLabel = (id: string) => GUARD_OPTIONS.find((g) => g.id === id)?.label || id;
  const getRiskLabel = (id: string) => RISK_OPTIONS.find((r) => r.id === id)?.title || id;

  const handleSubmitFastContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPhone.trim()) {
      setContactError('Vui lòng nhập số điện thoại để chuyên gia liên hệ hỗ trợ!');
      return;
    }

    const phoneRegex = /^[0-9+.\s()-]{8,16}$/;
    if (!phoneRegex.test(contactPhone.trim())) {
      setContactError('Số điện thoại không hợp lệ. Vui lòng kiểm tra lại!');
      return;
    }

    setIsSubmittingContact(true);
    setContactError(null);

    try {
      const summaryRisks = selectedRisks.map((r) => getRiskLabel(r)).join(', ');
      const detailedMessage = `[Khảo sát rủi ro an ninh]: Điểm ${metrics.score}/100 (${metrics.level})\n- Cơ sở: ${getFacilityLabel(facilityType)}\n- Quy mô: ${getAreaLabel(areaSize)}\n- Hiện trạng: ${getGuardLabel(currentGuards)}\n- Rủi ro quan ngại: ${summaryRisks}${contactNote.trim() ? `\n- Ghi chú khách: ${contactNote.trim()}` : ''}`;

      const res = await createQuoteRequest({
        source: 'risk_assessment_demo',
        client_name: contactName.trim() || 'Khách hàng (Khảo sát trực tuyến)',
        phone: contactPhone.trim(),
        company_name: contactCompany.trim() || undefined,
        service_needed: getFacilityLabel(facilityType),
        message: detailedMessage,
        status: 'new',
        contactName: contactName.trim() || 'Khách hàng (Khảo sát trực tuyến)',
        contactPhone: contactPhone.trim(),
        companyName: contactCompany.trim() || undefined,
        serviceType: getFacilityLabel(facilityType),
      });

      if (res.success) {
        setContactSubmitted(true);
      } else {
        setContactError(res.error || 'Không thể gửi thông tin. Quý khách vui lòng gọi trực tiếp hotline 0903.298.899!');
      }
    } catch (err: any) {
      setContactError('Lỗi kết nối. Quý khách vui lòng gọi trực tiếp hotline 0903.298.899 để được hỗ trợ tức thì!');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const handleForwardToConsultation = () => {
    onOpenConsultationWithData({
      facilityType,
      areaSize,
      currentGuards,
      selectedRisks,
      metrics
    });
  };

  return (
    <section 
      id="risk-assessment-section" 
      className="bg-slate-50 text-slate-900 py-20 border-b border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
            Kiểm Tra Mức Độ Rủi Ro An Ninh Cho Doanh Nghiệp
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Doanh nghiệp của bạn có đang đối mặt với nguy cơ thất thoát tài sản, xâm nhập trái phép hay sự cố PCCC? Kiểm tra ngay chỉ trong 1 phút để nhận phương án bố trí lực lượng tối ưu.
          </p>
        </div>

        {/* Interactive Scanner Console */}
        <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 lg:p-10 shadow-lg relative">
          {/* Scanner Header Steps - NO ICON BEFORE TITLE */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-8 flex-wrap gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight font-mono">
                ĐÁNH GIÁ RỦI RO AN NINH MỤC TIÊU
              </h3>
              <p className="text-xs text-slate-600 font-normal mt-0.5">
                Hệ thống phân tích rủi ro an ninh & đề xuất bố trí phương án bảo vệ
              </p>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center gap-2 text-xs font-bold font-mono">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex items-center justify-center w-8 h-8 transition-all rounded border ${
                    step === s
                      ? 'bg-[#c5a059] text-slate-950 border-[#b8860b] font-black shadow-xs'
                      : step > s
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                >
                  {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Chọn loại hình mục tiêu - NO ICON IN TITLE */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Bước 1: Chọn mô hình cơ sở & mục tiêu cần bảo vệ
                </h4>
                <p className="text-xs text-slate-600 font-normal">
                  Mỗi loại hình có đặc thù rủi ro và tiêu chuẩn kiểm soát hoàn toàn khác nhau.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {FACILITY_OPTIONS.map((item) => (
                  <div
                    key={item.id}
                    id={`facility-option-${item.id}`}
                    onClick={() => setFacilityType(item.id)}
                    className={`p-4 sm:p-4.5 border rounded-xl cursor-pointer transition-all duration-200 select-none ${
                      facilityType === item.id
                        ? 'bg-gradient-to-r from-amber-50/90 via-amber-50/40 to-white border-amber-400 ring-2 ring-amber-400/25 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300/80 hover:bg-slate-50/70 hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-bold text-xs uppercase tracking-wide ${facilityType === item.id ? 'text-slate-950 font-black' : 'text-slate-900'}`}>{item.label}</span>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ml-2 transition-all ${facilityType === item.id ? 'bg-[#c5a059] text-white' : 'border border-slate-300'}`}>
                        {facilityType === item.id && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  id="risk-step1-next-btn"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs uppercase tracking-widest px-6 py-3 transition-all rounded-lg shadow cursor-pointer hover:shadow-md"
                >
                  <span>Tiếp tục: Quy mô & Diện tích</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Quy mô & Hiện trạng lực lượng - NO ICON IN TITLE */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Bước 2: Quy mô diện tích & Hiện trạng an ninh
                </h4>
                <p className="text-xs text-slate-600 font-normal">
                  Cung cấp thông tin diện tích để ước tính số lượng chốt gác cần thiết.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
                    Diện tích mục tiêu
                  </label>
                  <div className="space-y-2.5">
                    {AREA_OPTIONS.map((sz) => (
                      <div
                        key={sz.id}
                        onClick={() => setAreaSize(sz.id)}
                        className={`p-3.5 border rounded-xl cursor-pointer text-xs font-semibold transition-all duration-200 flex items-center justify-between select-none ${
                          areaSize === sz.id
                            ? 'bg-gradient-to-r from-amber-50/90 to-white border-amber-400 text-amber-950 ring-2 ring-amber-400/25 shadow-xs font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-slate-50/70'
                        }`}
                      >
                        <span>{sz.label}</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ml-2 ${
                          areaSize === sz.id ? 'bg-[#c5a059] text-white' : 'border border-slate-300 bg-white'
                        }`}>
                          {areaSize === sz.id && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
                    Hiện trạng lực lượng bảo vệ hiện tại
                  </label>
                  <div className="space-y-2.5">
                    {GUARD_OPTIONS.map((cg) => (
                      <div
                        key={cg.id}
                        onClick={() => setCurrentGuards(cg.id)}
                        className={`p-3.5 border rounded-xl cursor-pointer text-xs font-semibold transition-all duration-200 flex items-center justify-between select-none ${
                          currentGuards === cg.id
                            ? 'bg-gradient-to-r from-amber-50/90 to-white border-amber-400 text-amber-950 ring-2 ring-amber-400/25 shadow-xs font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-slate-50/70'
                        }`}
                      >
                        <span>{cg.label}</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ml-2 ${
                          currentGuards === cg.id ? 'bg-[#c5a059] text-white' : 'border border-slate-300 bg-white'
                        }`}>
                          {currentGuards === cg.id && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 rounded-lg cursor-pointer transition-all"
                >
                  Quay lại
                </button>
                <button
                  id="risk-step2-next-btn"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs uppercase tracking-widest px-6 py-3 transition-all rounded-lg shadow cursor-pointer hover:shadow-md"
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1 border-b border-slate-100">
                <div>
                  <h4 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                    Bước 3: Các mối lo ngại an ninh mục tiêu đang gặp phải (Chọn nhiều)
                  </h4>
                  <p className="text-xs text-slate-600 font-normal mt-0.5">
                    Hệ thống đối chiếu với cơ sở dữ liệu các sự cố an ninh thực tế để đưa ra cảnh báo chính xác.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-100 border border-slate-200 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Đã chọn: <strong className="text-amber-800 font-bold">{selectedRisks.length}</strong> / {RISK_OPTIONS.length}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {RISK_OPTIONS.map((item) => {
                  const isChecked = selectedRisks.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      id={`risk-item-${item.id}`}
                      onClick={() => toggleRisk(item.id)}
                      className={`group relative p-4 sm:p-4.5 rounded-xl border cursor-pointer select-none transition-all duration-200 flex items-start gap-3.5 ${
                        isChecked
                          ? 'bg-gradient-to-r from-amber-50/90 via-amber-50/40 to-white border-amber-400 ring-2 ring-amber-400/25 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-amber-300/80 hover:bg-slate-50/70 hover:shadow-2xs'
                      }`}
                    >
                      {/* Modern Custom Checkbox Box */}
                      <div className="pt-0.5 shrink-0">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 border ${
                            isChecked
                              ? 'bg-gradient-to-br from-[#c5a059] to-[#b8860b] border-[#996515] shadow-xs scale-105'
                              : 'border-slate-300 bg-white group-hover:border-amber-400 group-hover:bg-slate-50'
                          }`}
                        >
                          {isChecked && (
                            <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                          )}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight transition-colors leading-snug ${
                            isChecked ? 'text-slate-950 font-black' : 'text-slate-800 group-hover:text-slate-900'
                          }`}>
                            {item.title}
                          </h5>
                          {item.category && (
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm shrink-0 border transition-colors ${
                              isChecked
                                ? 'bg-amber-100 text-amber-900 border-amber-200 font-semibold'
                                : 'bg-slate-100 text-slate-500 border-slate-200 group-hover:bg-slate-200/60'
                            }`}>
                              {item.category}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-1.5 leading-relaxed transition-colors ${
                          isChecked ? 'text-slate-700' : 'text-slate-500'
                        }`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 rounded-lg cursor-pointer transition-all"
                >
                  Quay lại
                </button>
                <button
                  id="risk-scan-complete-btn"
                  onClick={handleFinishScan}
                  className="flex items-center gap-2 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs uppercase tracking-widest px-7 py-3 transition-all rounded-lg shadow cursor-pointer hover:shadow-md"
                >
                  <span>Xem Báo Cáo Đánh Giá Rủi Ro Tức Thì</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RESULT DASHBOARD & CONTACT CONVERSION WORKFLOW */}
          {step === 4 && (
            <div className="space-y-8 animate-in zoom-in-95 duration-400">
              {/* Score Header */}
              <div className="bg-slate-50 border border-slate-200 rounded p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  {/* Circular Score Gauge */}
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center bg-white border-2 border-amber-500 rounded">
                    <div className="text-center">
                      <span className="text-2xl font-black text-slate-900 font-mono">
                        {metrics.score}
                      </span>
                      <span className="text-[9px] block text-slate-500 uppercase font-mono">/ 100 Điểm</span>
                    </div>
                  </div>

                  <div>
                    <span className={`inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase border mb-2 rounded ${metrics.badgeBg} ${metrics.levelColor}`}>
                      Cảnh báo: {metrics.level}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 uppercase tracking-tight">
                      Báo Cáo Đánh Giá Rủi Ro Cơ Sở Ban Đầu
                    </h4>
                    <p className="text-xs text-slate-600 font-normal mt-1 max-w-md leading-relaxed">
                      Dựa trên phân tích 1.200+ sự cố an ninh thực tế, cơ sở của bạn cần khẩn trương kiện toàn các chốt kiểm soát cổng và tăng cường tuần tra đêm.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-amber-800 border border-slate-300 hover:border-amber-600 px-3.5 py-2 transition-all font-mono uppercase rounded bg-white cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khảo sát lại</span>
                </button>
              </div>

              {/* Recommended Security Layout & Guard Allocation - NO ICONS BEFORE TITLES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded p-5">
                  <h5 className="text-amber-800 font-bold text-xs uppercase mb-3 font-mono tracking-wider">
                    Phương Án Bố Trí Đề Xuất
                  </h5>
                  <ul className="space-y-2.5 text-xs text-slate-700 font-normal">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700 font-mono font-bold text-xs shrink-0">—</span>
                      <span><strong>02 Vị trí Chốt Cổng:</strong> Kiểm soát người & phương tiện ra vào 24/7</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700 font-mono font-bold text-xs shrink-0">—</span>
                      <span><strong>01 Vị trí Tuần Tra Cơ Động:</strong> Tuần tra hàng rào điểm mù bằng Smart Patrol</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700 font-mono font-bold text-xs shrink-0">—</span>
                      <span><strong>01 Vị trí Trực Camera / SOC:</strong> Giám sát báo động khẩn cấp</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded p-5">
                  <h5 className="text-amber-800 font-bold text-xs uppercase mb-3 font-mono tracking-wider">
                    Kiện Toàn An Toàn & PCCC
                  </h5>
                  <ul className="space-y-2.5 text-xs text-slate-700 font-normal">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700 font-mono font-bold text-xs shrink-0">—</span>
                      <span>Kiểm tra áp lực van vòi PCCC & bình bọt định kỳ thứ Hai hàng tuần</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700 font-mono font-bold text-xs shrink-0">—</span>
                      <span>Tập huấn sơ tán khẩn cấp cho toàn bộ nhân viên nhà máy/tòa nhà</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700 font-mono font-bold text-xs shrink-0">—</span>
                      <span>Cam kết bồi thường 100% tài sản nếu xảy ra sai sót theo hợp đồng</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded p-5 flex flex-col justify-between">
                  <div>
                    <h5 className="text-amber-800 font-bold text-xs uppercase mb-3 font-mono tracking-wider">
                      Ước Tính Ngân Sách
                    </h5>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">
                      Tiết kiệm <strong>25% - 35%</strong> so với chi phí tự tuyển dụng, đào tạo và chịu rủi ro bồi thường tài sản.
                    </p>
                    <div className="mt-3 p-3 bg-white border border-slate-200 rounded text-center">
                      <span className="text-[10px] text-slate-500 uppercase font-mono block">Dự toán sơ bộ</span>
                      <span className="text-sm font-black text-amber-800 font-mono">Từ 16.000.000 VNĐ / Vị trí 24/7</span>
                    </div>
                  </div>

                  <button
                    id="receive-detailed-plan-btn"
                    onClick={handleForwardToConsultation}
                    className="w-full mt-4 py-3 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs uppercase tracking-widest transition-all text-center rounded shadow cursor-pointer"
                  >
                    Nhận Bản Phương Án Chi Tiết
                  </button>
                </div>
              </div>

              {/* REWORKED WORKFLOW: CLEARLY POSITIONED AS A DEMO STEP WHOSE PRIMARY GOAL IS CONTACTING THE COMPANY */}
              <div className="mt-8 border border-amber-200 bg-amber-50/70 rounded-xl p-6 sm:p-8 space-y-6">
                <div className="max-w-3xl">
                  <span className="text-[11px] font-mono font-bold text-amber-900 uppercase tracking-widest block mb-1">
                    Lưu ý quan trọng từ Ban Nghiệp Vụ An Ninh Lâm Sơn Động
                  </span>
                  <h4 className="text-lg sm:text-xl font-black uppercase text-slate-900 font-['Plus_Jakarta_Sans']">
                    Bản Đánh Giá Trên Mang Tính Chất Sơ Bộ Ban Đầu
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-normal mt-2 leading-relaxed">
                    Mỗi mục tiêu thực tế (nhà máy, tòa nhà hay kho bãi) đều có sơ đồ mặt bằng, góc khuất camera và lưu lượng giao thông hoàn toàn khác biệt. Để có <strong>phương án tác chiến chính xác 100%</strong> và <strong>báo giá cạnh tranh sát với thực tế</strong>, quý khách vui lòng liên hệ hoặc để lại thông tin để cán bộ chỉ huy an ninh Lâm Sơn Động trực tiếp đến <strong>khảo sát thực địa miễn phí</strong> trong vòng 24 giờ.
                  </p>
                </div>

                {/* Direct Contact Form or Hotline options */}
                {contactSubmitted ? (
                  <div className="p-6 bg-white border border-emerald-300 rounded-lg space-y-3 animate-in fade-in">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>ĐÃ TIẾP NHẬN YÊU CẦU TƯ VẤN THỰC ĐỊA THÀNH CÔNG!</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Thông số đánh giá rủi ro sơ bộ của Quý khách đã được gửi tới Ban Chỉ Huy Nghiệp Vụ Lâm Sơn Động. Chuyên viên phụ trách khu vực sẽ liên hệ lại qua số điện thoại <strong className="text-slate-900 font-mono">{contactPhone}</strong> trong vòng <strong>15 - 30 phút</strong> để tư vấn phương án bảo vệ và xếp lịch khảo sát thực địa miễn phí.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-3">
                      <a
                        href="tel:0903298899"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-mono font-bold rounded transition-all"
                      >
                        <PhoneCall className="w-4 h-4" />
                        Gọi ngay Hotline khẩn cấp: 0903.298.899
                      </a>
                      <button
                        type="button"
                        onClick={() => setContactSubmitted(false)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold rounded transition-all cursor-pointer"
                      >
                        Gửi thêm thông tin
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 space-y-4 shadow-2xs">
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
                        Để Lại Thông Tin - Chuyên Gia Gọi Lại Tư Vấn Trong 15 Phút
                      </h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Chúng tôi cam kết bảo mật tuyệt đối dữ liệu khảo sát và thông tin doanh nghiệp.
                      </p>
                    </div>

                    {contactError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                        <span>{contactError}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmitFastContact} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Họ và tên
                          </label>
                          <input
                            type="text"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="VD: Nguyễn Văn A"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded focus:bg-white focus:border-amber-600 outline-hidden transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Số điện thoại <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            placeholder="VD: 0912 xxx xxx"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded focus:bg-white focus:border-amber-600 outline-hidden font-mono transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Tên Doanh Nghiệp
                          </label>
                          <input
                            type="text"
                            value={contactCompany}
                            onChange={(e) => setContactCompany(e.target.value)}
                            placeholder="VD: Nhà máy / Công ty ABC..."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded focus:bg-white focus:border-amber-600 outline-hidden transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Nhu cầu cụ thể hoặc thời gian hẹn khảo sát (tùy chọn)
                        </label>
                        <input
                          type="text"
                          value={contactNote}
                          onChange={(e) => setContactNote(e.target.value)}
                          placeholder="VD: Cần khảo sát thực tế vào thứ Năm tuần này tại KCN Bắc Ninh..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded focus:bg-white focus:border-amber-600 outline-hidden transition-all"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={isSubmittingContact}
                          className="w-full sm:w-auto px-6 py-3 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs uppercase tracking-widest rounded shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isSubmittingContact ? (
                            <span>Đang gửi thông tin...</span>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Gửi Thông Tin Nhận Tư Vấn Thực Địa & Báo Giá</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-4 text-xs font-mono">
                          <span className="text-slate-500">Hoặc gọi Hotline 24/7:</span>
                          <a
                            href="tel:0903298899"
                            className="font-bold text-amber-900 hover:underline flex items-center gap-1.5"
                          >
                            <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
                            0903.298.899
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
