import React, { useState, useEffect } from 'react';
import { createQuoteRequest } from '../lib/supabase';

interface ConsultationFormProps {
  initialData?: any;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ initialData }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [region, setRegion] = useState('Hà Nội & Miền Bắc');
  const [serviceType, setServiceType] = useState('Bảo vệ Khu Công Nghiệp & Nhà Máy');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      if (initialData.facilityType) {
        const facilityMap: Record<string, string> = {
          factory: 'Bảo vệ Khu Công Nghiệp & Nhà Máy',
          building: 'Bảo vệ Tòa Nhà Văn Phòng & Cao Ốc',
          warehouse: 'Bảo vệ Khu Công Nghiệp & Nhà Máy',
          bank: 'Áp Tải Tiền Mặt & Kim Loại Quý',
          retail: 'Bảo vệ Mục tiêu Cố định',
          event: 'Bảo Vệ Sự Kiện & Lễ Hội',
        };
        if (facilityMap[initialData.facilityType]) {
          setServiceType(facilityMap[initialData.facilityType]);
        }
      }

      const infoLines: string[] = [];
      if (initialData.metrics?.score) {
        infoLines.push(`Điểm đánh giá rủi ro: ${initialData.metrics.score}/100 (${initialData.metrics.level || ''})`);
      }
      if (initialData.facilityType) {
        infoLines.push(`Mô hình cơ sở: ${initialData.facilityType}`);
      }
      if (initialData.areaSize) {
        infoLines.push(`Quy mô diện tích: ${initialData.areaSize}`);
      }
      if (initialData.selectedRisks && initialData.selectedRisks.length > 0) {
        infoLines.push(`Mối lo ngại rủi ro: ${initialData.selectedRisks.join(', ')}`);
      }

      if (infoLines.length > 0) {
        setMessage(`[Thông tin khảo sát rủi ro ban đầu]:\n${infoLines.join('\n')}\n\nQuý công ty vui lòng liên hệ tư vấn phương án bố trí quân số và khảo sát thực địa miễn phí.`);
      }
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !phoneNumber.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ Họ và tên và Số điện thoại liên hệ!');
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9+.\s()-]{8,16}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      setErrorMessage('Số điện thoại không đúng định dạng. Vui lòng kiểm tra lại!');
      return;
    }

    setLoading(true);

    try {
      const res = await createQuoteRequest({
        source: 'consultation_form',
        client_name: fullName.trim(),
        phone: phoneNumber.trim(),
        email: email.trim() || undefined,
        company_name: companyName.trim() || undefined,
        service_needed: serviceType,
        message: message.trim() || undefined,
        status: 'new',
        contactName: fullName.trim(),
        contactPhone: phoneNumber.trim(),
        jobTitle: jobTitle.trim() || undefined,
        region: region,
      });

      if (res && res.error) {
        console.error('Error submitting quote request:', res.error);
        setErrorMessage('Không thể gửi yêu cầu lúc này. Vui lòng thử lại hoặc gọi trực tiếp Hotline 0339.269.524!');
        setLoading(false);
        return;
      }

      const newId = res?.data?.[0]?.id || `LSD-${Date.now().toString().slice(-6)}`;
      setSubmittedId(newId);
      setSubmitted(true);
      setLoading(false);
    } catch (err: any) {
      console.error('Unexpected submission error:', err);
      setErrorMessage('Đã xảy ra lỗi kết nối. Vui lòng thử lại sau giây lát!');
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setSubmittedId(null);
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setCompanyName('');
    setJobTitle('');
    setMessage('');
    setErrorMessage(null);
  };

  return (
    <section 
      id="consultation-section" 
      className="bg-white text-slate-900 py-16 sm:py-24 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* =============================================================== */}
          {/* LEFT: BRAND LOGO & COMMITMENTS (NO ICONS, NO BORDER BOX)        */}
          {/* =============================================================== */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Company Logo & Brand Name (Header Logo) */}
            <div className="flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="Logo Bảo Vệ Lâm Sơn Động" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm"
              />
              <div>
                <div className="text-base sm:text-lg font-black tracking-wide text-slate-950 uppercase font-['Plus_Jakarta_Sans',sans-serif]">
                  LÂM SƠN ĐỘNG
                </div>
                <div className="text-xs uppercase tracking-widest text-[#c5a059] font-bold mt-0.5">
                  DỊCH VỤ BẢO VỆ CHUYÊN NGHIỆP
                </div>
              </div>
            </div>

            {/* Commitments (Clean Numbered List, No Icons, No Borders) */}
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">
                  01. PHẢN HỒI & KHẢO SÁT TRONG 24 GIỜ
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tiếp nhận thông tin và cử cán bộ phòng nghiệp vụ đến tận nơi khảo sát mục tiêu.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">
                  02. CAM KẾT TRÁCH NHIỆM TOÀN DIỆN
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cam kết bồi thường 100% tài sản theo điều khoản hợp đồng bảo vệ chính thức.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">
                  03. LẬP PHƯƠNG ÁN & DỰ TOÁN CHI TIẾT
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bản vẽ bố trí vọng gác, ca trực, tuần tra và trang thiết bị PCCC chuyên dụng.
                </p>
              </div>
            </div>

            {/* Direct Hotline Contact (Clean Typography, No Heavy Border Box) */}
            <div className="pt-6 border-t border-slate-200 space-y-1">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                CẦN TƯ VẤN KHẨN CẤP?
              </div>
              <p className="text-xs text-slate-600">
                Liên hệ trực tiếp Hotline 24/7:
              </p>
              <a 
                href="tel:0339269524" 
                className="inline-block text-2xl font-mono font-black text-slate-950 hover:text-amber-700 transition-colors pt-1"
              >
                0339.269.524
              </a>
            </div>

          </div>

          {/* =============================================================== */}
          {/* RIGHT: HEADLINE, INTRO & CLEAN FORM (REF: IMAGE 2)              */}
          {/* =============================================================== */}
          <div className="lg:col-span-7">
            
            {/* Section Headline & Description */}
            <div>
              <h2 className="text-lg sm:text-2xl lg:text-[23px] xl:text-[27px] 2xl:text-3xl font-extrabold text-slate-950 uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif] leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                Yêu Cầu Khảo Sát & Báo Giá Miễn Phí
              </h2>

              <p className="mt-3.5 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Hãy chia sẻ yêu cầu an ninh mục tiêu của bạn. Chuyên gia nghiệp vụ Lâm Sơn Động sẽ trực tiếp đến khảo sát thực địa và lập phương án bố trí quân số hoàn toàn miễn phí trong vòng 24 giờ.
              </p>
            </div>

            {/* Form / Submitted Success View */}
            <div className="mt-8">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                      Cảm Ơn Quý Khách Đã Tin Tưởng Lâm Sơn Động!
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thông tin yêu cầu báo giá của bạn đã được ghi nhận trên hệ thống trung tâm quản trị an ninh (Mã phiếu: <span className="font-mono font-bold text-slate-900">{submittedId || 'LSD-QUOTE'}</span>).
                    </p>
                  </div>

                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 max-w-md mx-auto text-left space-y-1.5 font-mono">
                    <div><span className="text-slate-500">Khách hàng:</span> <span className="font-bold text-slate-900">{fullName}</span></div>
                    <div><span className="text-slate-500">Số điện thoại:</span> <span className="font-bold text-slate-900">{phoneNumber}</span></div>
                    <div><span className="text-slate-500">Dịch vụ:</span> <span className="text-slate-900">{serviceType}</span></div>
                    <div className="text-[11px] text-slate-600 font-sans mt-2 pt-2 border-t border-slate-200">
                      * Cán bộ phòng Nghiệp vụ An ninh sẽ liên hệ xác nhận và xếp lịch khảo sát thực địa trong vòng 24 giờ.
                    </div>
                  </div>

                  <button
                    onClick={handleResetForm}
                    className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase font-bold tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Gửi Thêm Yêu Cầu Khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                        Họ và tên người liên hệ <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form-fullname"
                        type="text"
                        required
                        placeholder="Họ và tên"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        required
                        placeholder="Số điện thoại"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                        Email công việc
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                        Tên công ty / Doanh nghiệp
                      </label>
                      <input
                        id="form-company"
                        type="text"
                        placeholder="Tên công ty"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Job Title & Region */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                        Chức vụ người liên hệ
                      </label>
                      <input
                        id="form-jobtitle"
                        type="text"
                        placeholder="Chức danh công việc"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                        Khu vực / Tỉnh thành
                      </label>
                      <select
                        id="form-region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                      >
                        <option value="Hà Nội & Miền Bắc">Hà Nội & Các tỉnh Miền Bắc</option>
                        <option value="TP.HCM & Miền Nam">TP. Hồ Chí Minh & Miền Nam</option>
                        <option value="Đà Nẵng & Miền Trung">Đà Nẵng & Miền Trung</option>
                        <option value="Bình Dương / Đồng Nai">Bình Dương / Đồng Nai / Long An</option>
                        <option value="Hải Phòng / Bắc Ninh / Quảng Ninh">Hải Phòng / Bắc Ninh / Quảng Ninh</option>
                        <option value="Cần Thơ & Tây Nam Bộ">Cần Thơ & Tây Nam Bộ</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Service Needed */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                      Dịch vụ an ninh cần báo giá
                    </label>
                    <select
                      id="form-service-type"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                    >
                      <option value="Bảo vệ Khu Công Nghiệp & Nhà Máy">Bảo vệ Khu Công Nghiệp & Nhà Máy</option>
                      <option value="Bảo vệ Tòa Nhà Văn Phòng & Cao Ốc">Bảo vệ Tòa Nhà Văn Phòng & Cao Ốc</option>
                      <option value="Dịch Vụ Vệ Sĩ VIP & Hộ Tống">Dịch Vụ Vệ Sĩ VIP & Hộ Tống</option>
                      <option value="Bảo Vệ Sự Kiện & Lễ Hội">Bảo Vệ Sự Kiện & Lễ Hội</option>
                      <option value="Áp Tải Tiền Mặt & Kim Loại Quý">Áp Tải Tiền Mặt & Kim Loại Quý</option>
                      <option value="Hệ Thống An Ninh Smart Patrol & Giám Sát SOC">Hệ Thống An Ninh Smart Patrol & Giám Sát SOC</option>
                    </select>
                  </div>

                  {/* Row 5: Message & Character Counter (Ref: Image 2) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                      Mô tả sơ bộ về mục tiêu & yêu cầu đặc biệt
                    </label>
                    <textarea
                      id="form-message"
                      rows={4}
                      maxLength={500}
                      placeholder="Ví dụ: Cần 4 vị trí bảo vệ 24/24 cho kho hàng 10.000m² tại KCN Tiên Sơn Bắc Ninh, yêu cầu trang bị tuần tra GPS và PCCC chuyên nghiệp..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                    ></textarea>
                    <div className="text-right text-xs text-slate-400 mt-1">
                      {message.length} trong số 500 từ tối đa.
                    </div>
                  </div>

                  {/* Privacy Disclaimer */}
                  <p className="text-xs text-slate-500 font-normal leading-relaxed pt-1">
                    Bằng cách gửi yêu cầu, bạn đồng ý cho phép Lâm Sơn Động xử lý thông tin để khảo sát và lập báo giá theo Chính sách Bảo mật Thông tin.
                  </p>

                  {/* Submit Button (Clean, No Icon) */}
                  <button
                    id="submit-consultation-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Đang gửi thông tin lên hệ thống...</span>
                    ) : (
                      <span>Gửi Yêu Cầu Báo Giá & Khảo Sát Miễn Phí</span>
                    )}
                  </button>

                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
