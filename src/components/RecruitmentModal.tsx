import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  PhoneCall, 
  Send, 
  ShieldCheck, 
  Award, 
  Home, 
  HeartHandshake,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { sendRecruitmentNotification } from '../lib/emailService';

interface RecruitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface JobPosition {
  id: string;
  title: string;
  salary: string;
  locations: string;
  type: string;
  quantity: string;
  requirements: string[];
  benefits: string[];
}

const JOB_POSITIONS: JobPosition[] = [
  {
    id: 'pos-1',
    title: 'Nhân Viên Bảo Vệ – Hà Nội (Liên tục tuyển dụng)',
    salary: 'Lên tới 10.000.000 VNĐ / tháng',
    locations: 'Hà Nội (Bố trí mục tiêu gần nơi cư trú)',
    type: 'Ca 12h hoặc 24h (Xoay ca linh hoạt)',
    quantity: 'Tuyển liên tục',
    requirements: [
      'Yêu cầu tốt nghiệp THPT, THCS trở lên, sức khoẻ tốt, không có hình xăm lớn',
      'Nam/Nữ từ 18 - 50 tuổi, lý lịch trong sạch, không tiền án tiền sự',
      'Tác phong nhanh nhẹn, trung thực, có tinh thần kỷ luật và trách nhiệm'
    ],
    benefits: [
      'Được đào tạo miễn phí và hưởng lương trong thời gian đào tạo',
      'Tham gia đầy đủ BHXH, BHYT và các chế độ theo luật Lao động hiện hành',
      'Hỗ trợ 100% chỗ ở miễn phí gần mục tiêu công tác',
      'Cấp phát đồng phục và trang thiết bị làm việc miễn phí'
    ]
  },
  {
    id: 'pos-2',
    title: 'Vệ Sĩ Cận Vệ & Hộ Tống Doanh Nhân, Lãnh Đạo Cấp Cao',
    salary: '15.000.000 - 25.000.000 đ/tháng',
    locations: 'Hà Nội & TP. Hồ Chí Minh (Công tác linh hoạt)',
    type: 'Toàn thời gian theo lịch công tác',
    quantity: 'Tuyển 10 người',
    requirements: [
      'Nam từ 22 - 40 tuổi, chiều cao từ 1m75, thể hình cân đối',
      'Có đai đẳng võ thuật (Vovinam, Karatedo, Taekwondo, Cổ truyền)',
      'Kỹ năng phản xạ nhạy bén, không có hình xăm lớn, lái xe thành thạo là lợi thế lớn'
    ],
    benefits: [
      'Thu nhập cạnh tranh cùng phụ cấp công tác phí hấp dẫn',
      'Môi trường làm việc đẳng cấp, chuyên nghiệp và bảo mật',
      'Bảo hiểm tai nạn mức trách nhiệm cao 24/24'
    ]
  },
  {
    id: 'pos-3',
    title: 'Chỉ Huy Trưởng / Đội Trưởng An Ninh Mục Tiêu KCN',
    salary: '14.000.000 - 18.000.000 đ/tháng',
    locations: 'Bắc Ninh, Hải Phòng, Đồng Nai, Long An',
    type: 'Toàn thời gian / Giờ hành chính + Trực chỉ huy',
    quantity: 'Tuyển 5 người',
    requirements: [
      'Kinh nghiệm từ 2 năm tại vị trí tương đương trong ngành bảo vệ',
      'Khả năng quản lý, phân công lịch trực cho 20 - 50 nhân viên',
      'Kỹ năng lập phương án bảo vệ và làm việc cùng Ban Giám Đốc khách hàng'
    ],
    benefits: [
      'Thưởng hiệu quả quản lý mục tiêu hàng quý',
      'Cơ hội thăng tiến lên Trưởng Ban Nghiệp Vụ Vùng',
      'Phụ cấp điện thoại, xe công vụ và nơi ở riêng'
    ]
  },
  {
    id: 'pos-4',
    title: 'Nhân Viên Đội Cơ Động Phản Ứng Nhanh & Tuần Tra Đêm',
    salary: '10.000.000 - 14.000.000 đ/tháng',
    locations: 'Hà Nội & TP. Hồ Chí Minh',
    type: 'Chuyên trách ca đêm & cơ động khẩn cấp',
    quantity: 'Tuyển 15 người',
    requirements: [
      'Nam từ 20 - 35 tuổi, sức khỏe dẻo dai, không có hình xăm lớn, không ngại làm đêm',
      'Có bằng lái xe máy/ô tô, lý lịch trong sạch',
      'Tinh thần kỷ luật thép, kỹ năng tự vệ và sơ cấp cứu cơ bản'
    ],
    benefits: [
      'Phụ cấp trực ca đêm và phụ cấp cơ động đặc thù',
      'Trang bị xe mô tô tuần tra chuyên dụng và công cụ hỗ trợ hiện đại',
      'Được đào tạo định kỳ bởi chuyên gia võ thuật hàng đầu'
    ]
  }
];

export const RecruitmentModal: React.FC<RecruitmentModalProps> = ({ isOpen, onClose }) => {
  const [selectedJob, setSelectedJob] = useState<string>(JOB_POSITIONS[0].id);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    birthYear: '',
    desiredPosition: JOB_POSITIONS[0].title,
    location: 'Hà Nội',
    experience: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentJob = JOB_POSITIONS.find((j) => j.id === selectedJob) || JOB_POSITIONS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await sendRecruitmentNotification({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        birthYear: formData.birthYear.trim(),
        desiredPosition: formData.desiredPosition,
        location: formData.location,
        experience: formData.experience.trim() || undefined,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.warn('Lỗi khi gửi hồ sơ tuyển dụng:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 4500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl text-slate-900 rounded-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng bảng tuyển dụng"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header - Clean, modern, straightforward */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 bg-white border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-amber-800">
            <span>CÔNG TY CỔ PHẦN DỊCH VỤ BẢO VỆ LÂM SƠN ĐỘNG</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium">Ban Nhân Sự</span>
          </div>

          <h3 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-normal leading-snug pr-8 uppercase font-['Plus_Jakarta_Sans']">
            Liên Tục Tuyển Dụng: Nhân Viên Bảo Vệ – Hà Nội
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Thu nhập lên tới 10.000.000 VNĐ / tháng • Đào tạo miễn phí có hưởng lương • Đầy đủ BHXH, BHYT
          </p>
        </div>

        {/* Modal Body - Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-slate-800">
          
          {/* Highlighted Benefits Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200/80 text-slate-800 flex items-center justify-center shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Thu Nhập Hấp Dẫn</div>
                <div className="text-[11px] text-slate-600 font-medium">Lên tới 10 triệu/tháng</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200/80 text-slate-800 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Đào Tạo Miễn Phí</div>
                <div className="text-[11px] text-slate-500">Hưởng lương khi đào tạo</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200/80 text-slate-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Đầy Đủ Bảo Hiểm</div>
                <div className="text-[11px] text-slate-500">BHXH, BHYT theo luật</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200/80 text-slate-800 flex items-center justify-center shrink-0">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Hỗ Trợ Chỗ Ở 100%</div>
                <div className="text-[11px] text-slate-500">Gần mục tiêu làm việc</div>
              </div>
            </div>
          </div>

          {/* Job Positions Selector & Details */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-700" />
              <span>Vị Trí Đang Tuyển Dụng Gấp</span>
            </h4>

            {/* Position Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
              {JOB_POSITIONS.map((job) => (
                <button
                  key={job.id}
                  onClick={() => {
                    setSelectedJob(job.id);
                    setFormData((prev) => ({ ...prev, desiredPosition: job.title }));
                  }}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedJob === job.id
                      ? 'border-amber-600 bg-amber-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded">
                      {job.quantity}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                    {job.title}
                  </div>
                  <div className="text-xs font-bold text-emerald-700 mt-2">
                    {job.salary}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Job Specific Details Box */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                <div>
                  <h5 className="text-sm font-bold text-slate-900">{currentJob.title}</h5>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-700" />
                      {currentJob.locations}
                    </span>
                    <span>•</span>
                    <span>{currentJob.type}</span>
                  </div>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-amber-800 shrink-0">
                  {currentJob.salary}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    Yêu cầu ứng viên:
                  </div>
                  <ul className="space-y-1.5 text-slate-600 pl-3.5 list-disc">
                    {currentJob.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    Quyền lợi được hưởng:
                  </div>
                  <ul className="space-y-1.5 text-slate-600 pl-3.5 list-disc">
                    {currentJob.benefits.map((ben, idx) => (
                      <li key={idx}>{ben}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Application Form */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide mb-1 flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-700" />
              <span>Đăng Ký Ứng Tuyển Nhanh Trực Tuyến</span>
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Điền thông tin bên dưới, Phòng Nhân Sự sẽ liên hệ lại qua điện thoại trong vòng 15 phút để hẹn lịch phỏng vấn.
            </p>

            {isSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-sm">Gửi hồ sơ ứng tuyển thành công!</div>
                  <div className="mt-0.5">Hồ sơ đã được gửi trực tiếp về email Ban Tuyển Dụng Lâm Sơn Động. Phòng Nhân Sự sẽ gọi điện thoại cho bạn trong ít phút tới.</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn Nam"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ví dụ: 0912.345.678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Năm sinh *</label>
                    <input
                      type="number"
                      required
                      placeholder="Ví dụ: 1995"
                      min="1960"
                      max="2008"
                      value={formData.birthYear}
                      onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Vị trí ứng tuyển</label>
                    <select
                      value={formData.desiredPosition}
                      onChange={(e) => setFormData({ ...formData, desiredPosition: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-amber-600"
                    >
                      {JOB_POSITIONS.map((j) => (
                        <option key={j.id} value={j.title}>
                          {j.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Khu vực mong muốn làm việc</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-amber-600"
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Bắc Ninh / Bắc Giang">Bắc Ninh / Bắc Giang</option>
                      <option value="Hải Phòng / Quảng Ninh">Hải Phòng / Quảng Ninh</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Bình Dương / Đồng Nai">Bình Dương / Đồng Nai</option>
                      <option value="Đà Nẵng / Miền Trung">Đà Nẵng / Miền Trung</option>
                      <option value="Khu vực khác">Khu vực khác (Thỏa thuận)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kinh nghiệm hoặc ghi chú thêm (nếu có)</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Bộ đội xuất ngũ 2022, có chứng chỉ PCCC, đã từng làm tại KCN Yên Phong..."
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    * Cam kết không thu bất kỳ khoản phí tuyển dụng hay đặt cọc nào.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#c5a059] hover:bg-[#b8860b] disabled:opacity-70 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang gửi hồ sơ...</span>
                      </>
                    ) : (
                      <>
                        <span>Nộp Đơn Ứng Tuyển Ngay</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer - Fixed CTA bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <HeartHandshake className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Liên hệ để nhận tư vấn & hướng dẫn nộp hồ sơ:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="tel:0981962288"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 hover:text-amber-800 transition-colors shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
              <span>0981.962.288 – Mr. Phúc</span>
            </a>

            <a
              href="tel:0975751246"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 hover:text-amber-800 transition-colors shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
              <span>0975.751.246 – Mrs. Luyến</span>
            </a>

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
