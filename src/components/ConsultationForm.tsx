import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  PhoneCall, 
  Clock
} from 'lucide-react';

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !companyName) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Tên doanh nghiệp!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="consultation-section" className="bg-[#0d0d0f] text-white py-16 sm:py-24 border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111114] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          {/* Background Watermark Shield Graphic */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 opacity-5 pointer-events-none text-[#c5a059]">
            <ShieldCheck className="w-full h-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            {/* Left Info & Guarantees */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#c5a059] uppercase tracking-[0.3em] bg-[#c5a059]/10 border border-[#c5a059]/30 px-3.5 py-1">
                  TƯ VẤN & KHẢO SÁT THỰC ĐỊA
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-4 font-['Plus_Jakarta_Sans']">
                  Kết Nối Với Chuyên Gia An Ninh LÂM SƠN ĐỘNG
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                  Hãy chia sẻ với chúng tôi về yêu cầu an ninh mục tiêu của bạn. Chuyên gia an ninh Lâm Sơn Động sẽ trực tiếp đến khảo sát thực địa và lập phương án bố trí quân số hoàn toàn miễn phí.
                </p>
              </div>

              {/* Guarantees List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 bg-[#0d0d0f] border border-white/5">
                  <div className="w-8 h-8 border border-[#c5a059]/30 bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">Phản Hồi & Khảo Sát Trong 24 Giờ</h4>
                    <p className="text-[11px] text-gray-400 font-light mt-0.5">Tiếp nhận thông tin và cử cán bộ phòng nghiệp vụ đến tận nơi</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-[#0d0d0f] border border-white/5">
                  <div className="w-8 h-8 border border-[#c5a059]/30 bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">Bảo Hiểm Trách Nhiệm 20 Tỷ VNĐ</h4>
                    <p className="text-[11px] text-gray-400 font-light mt-0.5">Cam kết bồi thường 100% tài sản theo hợp đồng bảo vệ</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-[#0d0d0f] border border-white/5">
                  <div className="w-8 h-8 border border-[#c5a059]/30 bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">Hotline Trực Ban 24/7</h4>
                    <p className="text-[11px] text-gray-400 font-light mt-0.5">Liên hệ khẩn cấp: <strong className="text-[#c5a059] font-mono font-bold">0908.113.888</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-[#0d0d0f] border border-white/10 p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-[#c5a059]/10 border border-[#c5a059]/40 text-[#c5a059] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                    Gửi Yêu Cầu Khảo Sát Thành Công!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto font-light">
                    Cảm ơn quý khách <strong className="text-white">{fullName}</strong> ({companyName}). Chuyên viên an ninh cấp cao của Lâm Sơn Động sẽ liên hệ qua số điện thoại <strong className="text-[#c5a059] font-mono">{phoneNumber}</strong> trong vòng 15 phút.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-[#c5a059] text-black font-black text-xs uppercase tracking-widest hover:brightness-110"
                  >
                    Gửi thêm yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                        Họ và tên <span className="text-[#c5a059]">*</span>
                      </label>
                      <input
                        id="form-fullname"
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 text-white text-xs focus:border-[#c5a059] outline-none transition-all placeholder:text-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                        Số điện thoại <span className="text-[#c5a059]">*</span>
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        required
                        placeholder="09xx xxx xxx"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 text-white text-xs focus:border-[#c5a059] outline-none transition-all placeholder:text-white/30 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                        Email công việc <span className="text-[#c5a059]">*</span>
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        placeholder="contact@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 text-white text-xs focus:border-[#c5a059] outline-none transition-all placeholder:text-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                        Tên công ty / Doanh nghiệp <span className="text-[#c5a059]">*</span>
                      </label>
                      <input
                        id="form-company"
                        type="text"
                        required
                        placeholder="Tập đoàn ABC..."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 text-white text-xs focus:border-[#c5a059] outline-none transition-all placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                        Chức danh công việc
                      </label>
                      <input
                        id="form-jobtitle"
                        type="text"
                        placeholder="Tổng giám đốc / Trưởng phòng HC-NS"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 text-white text-xs focus:border-[#c5a059] outline-none transition-all placeholder:text-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                        Khu vực cần bảo vệ
                      </label>
                      <select
                        id="form-region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 text-white text-xs focus:border-[#c5a059] outline-none transition-all"
                      >
                        <option value="Hà Nội & Miền Bắc" className="bg-[#111114] text-white">Hà Nội & Các tỉnh Miền Bắc</option>
                        <option value="TP.HCM & Miền Nam" className="bg-[#111114] text-white">TP. Hồ Chí Minh & Miền Nam</option>
                        <option value="Đà Nẵng & Miền Trung" className="bg-[#111114] text-white">Đà Nẵng & Miền Trung</option>
                        <option value="Bình Dương / Đồng Nai" className="bg-[#111114] text-white">Bình Dương / Đồng Nai / Long An</option>
                        <option value="Hải Phòng / Quảng Ninh" className="bg-[#111114] text-white">Hải Phòng / Quảng Ninh / Bắc Ninh</option>
                        <option value="Cần Thơ & Tây Nam Bộ" className="bg-[#111114] text-white">Cần Thơ & Tây Nam Bộ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Loại hình dịch vụ quan tâm
                    </label>
                    <select
                      id="form-service-type"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 text-white text-xs focus:border-[#c5a059] outline-none transition-all"
                    >
                      <option value="Bảo vệ Khu Công Nghiệp & Nhà Máy" className="bg-[#111114] text-white">Bảo vệ Khu Công Nghiệp & Nhà Máy</option>
                      <option value="Bảo vệ Tòa Nhà Văn Phòng & Cao Ốc" className="bg-[#111114] text-white">Bảo vệ Tòa Nhà Văn Phòng & Cao Ốc</option>
                      <option value="Dịch Vụ Vệ Sĩ VIP & Hộ Tống" className="bg-[#111114] text-white">Dịch Vụ Vệ Sĩ VIP & Hộ Tống</option>
                      <option value="Bảo Vệ Sự Kiện & Lễ Hội" className="bg-[#111114] text-white">Bảo Vệ Sự Kiện & Lễ Hội</option>
                      <option value="Áp Tải Tiền Mặt & Kim Loại Quý" className="bg-[#111114] text-white">Áp Tải Tiền Mặt & Kim Loại Quý</option>
                      <option value="Hệ Thống An Ninh Smart Patrol & SOC" className="bg-[#111114] text-white">Hệ Thống An Ninh Smart Patrol & SOC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Mô tả sơ bộ về mục tiêu & yêu cầu đặc biệt (tùy chọn)
                    </label>
                    <textarea
                      id="form-message"
                      rows={3}
                      placeholder="Ví dụ: Cần 4 vị trí bảo vệ 24/24 cho nhà máy may 5.000m² tại KCN VSIP, yêu cầu có chứng chỉ PCCC..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 text-white text-xs focus:border-[#c5a059] outline-none transition-all placeholder:text-white/30"
                    ></textarea>
                  </div>

                  <p className="text-[10px] text-gray-400 font-light leading-relaxed">
                    Bằng cách gửi biểu mẫu này, bạn đồng ý với Điều khoản bảo mật thông tin khách hàng và chính sách bảo vệ dữ liệu của Lâm Sơn Động Security.
                  </p>

                  <button
                    id="submit-consultation-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#c5a059] text-black font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Đang xử lý yêu cầu...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Xác Nhận Gửi Yêu Cầu Khảo Sát Miễn Phí</span>
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

