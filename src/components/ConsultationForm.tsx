import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  PhoneCall, 
  Clock,
  AlertCircle,
  FileCheck2,
  Building,
  Mail,
  User
} from 'lucide-react';
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
        // Backwards compatibility fields
        contactName: fullName.trim(),
        contactPhone: phoneNumber.trim(),
        contactEmail: email.trim() || undefined,
        companyName: companyName.trim() || undefined,
        jobTitle: jobTitle.trim() || undefined,
        region,
        serviceType,
        targetType: serviceType,
      });

      if (res.success) {
        setSubmitted(true);
        if (res.data?.id) {
          setSubmittedId(res.data.id);
        }
      } else {
        setErrorMessage(res.error || 'Có lỗi khi gửi thông tin yêu cầu. Vui lòng thử lại hoặc gọi Hotline!');
      }
    } catch (err: any) {
      setErrorMessage('Lỗi kết nối máy chủ. Vui lòng gọi trực tiếp hotline 0903.298.899 để được hỗ trợ nhanh nhất!');
    } finally {
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
    <section id="consultation-section" className="bg-white text-slate-900 py-16 sm:py-24 border-b border-slate-200 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-sm p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-sm">
          {/* Background Watermark Shield Graphic */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 opacity-5 pointer-events-none text-amber-800">
            <ShieldCheck className="w-full h-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            {/* Left Info & Guarantees */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-900 uppercase tracking-[0.3em] bg-amber-100 border border-amber-300 px-3.5 py-1 rounded">
                  TƯ VẤN & KHẢO SÁT THỰC ĐỊA
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-4 font-['Plus_Jakarta_Sans']">
                  Yêu Cầu Khảo Sát & Báo Giá Miễn Phí
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  Hãy chia sẻ yêu cầu an ninh mục tiêu của bạn. Chuyên gia nghiệp vụ Lâm Sơn Động sẽ trực tiếp đến khảo sát thực địa và lập phương án bố trí quân số hoàn toàn miễn phí trong vòng 24 giờ.
                </p>
              </div>

              {/* Guarantees List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded shadow-xs">
                  <div className="w-8 h-8 border border-amber-300 bg-amber-50 flex items-center justify-center text-amber-800 rounded shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Phản Hồi & Khảo Sát Trong 24 Giờ</h4>
                    <p className="text-[11px] text-slate-600 font-normal mt-0.5">Tiếp nhận thông tin và cử cán bộ phòng nghiệp vụ đến tận nơi</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded shadow-xs">
                  <div className="w-8 h-8 border border-amber-300 bg-amber-50 flex items-center justify-center text-amber-800 rounded shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Bảo Hiểm Trách Nhiệm 20 Tỷ VNĐ</h4>
                    <p className="text-[11px] text-slate-600 font-normal mt-0.5">Cam kết bồi thường 100% tài sản theo hợp đồng bảo vệ</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded shadow-xs">
                  <div className="w-8 h-8 border border-amber-300 bg-amber-50 flex items-center justify-center text-amber-800 rounded shrink-0">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Lập Phương Án & Dự Toán Chi Tiết</h4>
                    <p className="text-[11px] text-slate-600 font-normal mt-0.5">Bản vẽ bố trí vọng gác, ca trực, tuần tra và trang thiết bị PCCC</p>
                  </div>
                </div>
              </div>

              {/* Direct Hotline Contact Box */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded text-slate-900 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900">
                  CẦN TƯ VẤN KHẨN CẤP?
                </span>
                <p className="text-xs text-slate-700">Liên hệ trực tiếp Hotline Trực Ban Tác Chiến 24/7:</p>
                <a 
                  href="tel:0903298899" 
                  className="text-lg font-black font-mono text-amber-900 flex items-center gap-2 hover:underline"
                >
                  <PhoneCall className="w-4 h-4 text-amber-700" />
                  0903.298.899
                </a>
              </div>
            </div>

            {/* Right: Consultation & Quote Request Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-slate-200 rounded shadow-sm">
              {submitted ? (
                <div className="py-10 px-4 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center rounded-full mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded">
                      GỬI YÊU CẦU THÀNH CÔNG
                    </span>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                      Cảm Ơn Quý Khách Đã Tin Tưởng Lâm Sơn Động!
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thông tin yêu cầu báo giá của bạn đã được ghi nhận trên hệ thống trung tâm quản trị an ninh (Mã phiếu: <span className="font-mono font-bold text-slate-900">{submittedId || 'LSD-QUOTE'}</span>).
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 max-w-md mx-auto text-left space-y-1 font-mono">
                    <div><span className="text-slate-500">Khách hàng:</span> <span className="font-bold text-slate-900">{fullName}</span></div>
                    <div><span className="text-slate-500">Số điện thoại:</span> <span className="font-bold text-amber-800">{phoneNumber}</span></div>
                    <div><span className="text-slate-500">Dịch vụ:</span> <span className="text-slate-900">{serviceType}</span></div>
                    <div className="text-[11px] text-emerald-700 font-sans mt-2 pt-2 border-t border-slate-200">
                      * Cán bộ phòng Nghiệp vụ An ninh sẽ liên hệ xác nhận và xếp lịch khảo sát thực địa trong vòng 24 giờ.
                    </div>
                  </div>

                  <button
                    onClick={handleResetForm}
                    className="mt-4 px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-mono text-xs uppercase font-bold tracking-wider rounded shadow transition-all"
                  >
                    Gửi Thêm Yêu Cầu Khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold uppercase tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                      Điền Thông Tin Yêu Cầu Báo Giá
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Vui lòng để lại thông tin liên hệ, chúng tôi sẽ bảo mật tuyệt đối dữ liệu doanh nghiệp của bạn.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-start gap-2 animate-fadeIn">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Họ và tên người liên hệ <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="form-fullname"
                          type="text"
                          required
                          placeholder="VD: Nguyễn Văn A"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-amber-600 outline-hidden transition-all placeholder:text-slate-400 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        required
                        placeholder="VD: 0912 xxx xxx"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-amber-600 outline-hidden transition-all placeholder:text-slate-400 font-mono rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email công việc
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        placeholder="VD: contact@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-amber-600 outline-hidden transition-all placeholder:text-slate-400 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Tên công ty / Doanh nghiệp
                      </label>
                      <input
                        id="form-company"
                        type="text"
                        placeholder="VD: Công ty Cổ phần ABC..."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-amber-600 outline-hidden transition-all placeholder:text-slate-400 rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Chức vụ người liên hệ
                      </label>
                      <input
                        id="form-jobtitle"
                        type="text"
                        placeholder="VD: Trưởng phòng HC-NS, GĐ Điều hành..."
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-amber-600 outline-hidden transition-all placeholder:text-slate-400 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Khu vực / Tỉnh thành
                      </label>
                      <select
                        id="form-region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-amber-600 outline-hidden transition-all rounded"
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

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Dịch vụ an ninh cần báo giá (service_needed)
                    </label>
                    <select
                      id="form-service-type"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-amber-600 outline-hidden transition-all rounded"
                    >
                      <option value="Bảo vệ Khu Công Nghiệp & Nhà Máy">Bảo vệ Khu Công Nghiệp & Nhà Máy</option>
                      <option value="Bảo vệ Tòa Nhà Văn Phòng & Cao Ốc">Bảo vệ Tòa Nhà Văn Phòng & Cao Ốc</option>
                      <option value="Dịch Vụ Vệ Sĩ VIP & Hộ Tống">Dịch Vụ Vệ Sĩ VIP & Hộ Tống</option>
                      <option value="Bảo Vệ Sự Kiện & Lễ Hội">Bảo Vệ Sự Kiện & Lễ Hội</option>
                      <option value="Áp Tải Tiền Mặt & Kim Loại Quý">Áp Tải Tiền Mặt & Kim Loại Quý</option>
                      <option value="Hệ Thống An Ninh Smart Patrol & Giám Sát SOC">Hệ Thống An Ninh Smart Patrol & Giám Sát SOC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Mô tả sơ bộ về mục tiêu & yêu cầu đặc biệt
                    </label>
                    <textarea
                      id="form-message"
                      rows={3}
                      placeholder="Ví dụ: Cần 4 vị trí bảo vệ 24/24 cho kho hàng 10.000m² tại KCN Tiên Sơn Bắc Ninh, yêu cầu trang bị tuần tra GPS và PCCC chuyên nghiệp..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-amber-600 outline-hidden transition-all placeholder:text-slate-400 rounded"
                    ></textarea>
                  </div>

                  <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                    Bằng cách gửi yêu cầu, bạn đồng ý cho phép Lâm Sơn Động Security xử lý thông tin để khảo sát và lập báo giá theo Chính sách Bảo mật Thông tin.
                  </p>

                  <button
                    id="submit-consultation-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-mono font-bold text-xs uppercase tracking-wider active:scale-[0.99] transition-all flex items-center justify-center gap-2 rounded shadow-xs disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Đang gửi thông tin lên hệ thống...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Gửi Yêu Cầu Báo Giá & Khảo Sát Miễn Phí</span>
                      </>
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
