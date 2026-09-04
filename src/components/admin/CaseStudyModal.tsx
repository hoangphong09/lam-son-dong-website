import React, { useState, useEffect } from 'react';
import { CaseStudy } from '../../types';
import { X, Save, Image as ImageIcon } from 'lucide-react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (caseStudy: CaseStudy) => Promise<void>;
  caseStudy: CaseStudy | null;
}

const SAMPLE_CASE_IMAGES = [
  { label: 'Tổ hợp Nhà máy KCN', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Tòa nhà văn phòng Hạng A', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Ngân hàng & Trung tâm Dữ liệu', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Sự kiện Quốc tế', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80' },
];

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  caseStudy,
}) => {
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [sector, setSector] = useState('Khu Công Nghiệp');
  const [imageUrl, setImageUrl] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [result, setResult] = useState('');
  const [readTime, setReadTime] = useState('5 phút đọc');
  const [period, setPeriod] = useState('2023 - Nay');
  const [guardCount, setGuardCount] = useState('45 nhân sự');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (caseStudy) {
      setTitle(caseStudy.title || '');
      setClient(caseStudy.client || '');
      setSector(caseStudy.sector || 'Khu Công Nghiệp');
      setImageUrl(caseStudy.imageUrl || '');
      setChallenge(caseStudy.challenge || '');
      setSolution(caseStudy.solution || '');
      setResult(caseStudy.result || '');
      setReadTime(caseStudy.readTime || '5 phút đọc');
      setPeriod(caseStudy.period || '2023 - Nay');
      setGuardCount(caseStudy.guardCount || '45 nhân sự');
    } else {
      setTitle('');
      setClient('');
      setSector('Khu Công Nghiệp');
      setImageUrl(SAMPLE_CASE_IMAGES[0].url);
      setChallenge('');
      setSolution('');
      setResult('');
      setReadTime('5 phút đọc');
      setPeriod('2024 - Nay');
      setGuardCount('30 nhân sự');
    }
  }, [caseStudy, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !client.trim()) {
      alert('Vui lòng nhập đầy đủ tiêu đề và tên khách hàng/đối tác!');
      return;
    }

    setIsSubmitting(true);
    try {
      const recordToSave: CaseStudy = {
        id: caseStudy ? caseStudy.id : `cs-${Date.now()}`,
        title: title.trim(),
        client: client.trim(),
        sector: sector.trim(),
        imageUrl: imageUrl.trim(),
        challenge: challenge.trim(),
        solution: solution.trim(),
        result: result.trim(),
        readTime: readTime.trim(),
        period: period.trim(),
        guardCount: guardCount.trim(),
      };
      await onSave(recordToSave);
      onClose();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi lưu dự án.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-200 bg-slate-50/90 shrink-0">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-700 font-bold block mb-1">
              DỰ ÁN & CASE STUDY THỰC TẾ
            </span>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
              {caseStudy ? 'Chỉnh Sửa Dự Án Thực Tế' : 'Thêm Mới Dự Án Tiêu Biểu'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Quản trị minh chứng hiệu quả thực tế và case study năng lực an ninh
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
                Tên Dự Án / Tiêu Đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Kiểm soát an ninh KCN Điện Tử VSIP Bắc Ninh"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
                Tên Khách Hàng / Đối Tác <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="VD: Tập đoàn Công nghệ Foxconn / Pegatron"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
                Lĩnh Vực / Sector
              </label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="KCN, Tòa Nhà, Ngân Hàng..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm font-mono focus:bg-white focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
                Giai Đoạn Hợp Tác
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="2022 - Nay"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm font-mono focus:bg-white focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
                Quy Mô Quân Số
              </label>
              <input
                type="text"
                value={guardCount}
                onChange={(e) => setGuardCount(e.target.value)}
                placeholder="VD: 55 Vệ sĩ thường trực"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm font-mono focus:bg-white focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
              URL Hình Ảnh Dự Án
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm font-mono focus:bg-white focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all"
              />
            </div>
            {/* Quick sample pickers */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-xs text-slate-600 font-mono font-bold flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" /> Ảnh mẫu:
              </span>
              {SAMPLE_CASE_IMAGES.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImageUrl(img.url)}
                  className={`text-xs font-mono px-2.5 py-1 border rounded-md transition-all cursor-pointer ${
                    imageUrl === img.url
                      ? 'bg-[#c5a059] text-slate-950 border-[#c5a059] font-bold shadow-2xs'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-400'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>

            {/* Image Preview */}
            {imageUrl && (
              <div className="mt-4 relative h-36 sm:h-44 w-full bg-slate-900 border border-slate-200 overflow-hidden flex items-center justify-center rounded-xl shadow-xs">
                <img
                  src={imageUrl}
                  alt="Xem trước hình ảnh"
                  className="w-full h-full object-cover brightness-95"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Challenge */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
              Thách Thức Ban Đầu Của Khách Hàng
            </label>
            <textarea
              rows={3}
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              placeholder="VD: Khuôn viên rộng 25ha với hơn 8.000 công nhân ra vào mỗi ca, tỷ lệ thất thoát linh kiện cao..."
              className="w-full p-4 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm leading-relaxed focus:bg-white focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all resize-none"
            />
          </div>

          {/* Solution */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
              Giải Pháp Triển Khai Bởi Lâm Sơn Động
            </label>
            <textarea
              rows={3}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="VD: Thiết lập 3 vành đai bảo vệ nghiêm ngặt, tích hợp camera AI nhận diện khuôn mặt và cổng kiểm soát phân làn..."
              className="w-full p-4 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm leading-relaxed focus:bg-white focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all resize-none"
            />
          </div>

          {/* Result */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
              Kết Quả Đạt Được & Giá Trị Mang Lại
            </label>
            <textarea
              rows={3}
              value={result}
              onChange={(e) => setResult(e.target.value)}
              placeholder="VD: Giảm 100% tình trạng thất thoát tài sản sau 3 tháng, đạt chuẩn an ninh C-TPAT xuất khẩu thị trường Mỹ..."
              className="w-full p-4 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm leading-relaxed focus:bg-white focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 sm:px-7 py-2.5 sm:py-3 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest rounded-lg shadow-sm hover:shadow-md flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Đang lưu...' : 'Lưu Dự Án'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
