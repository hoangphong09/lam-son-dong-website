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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden rounded-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              {caseStudy ? 'Chỉnh Sửa Dự Án Thực Tế' : 'Thêm Mới Dự Án Tiêu Biểu'}
            </h3>
            <p className="text-xs text-slate-500 font-light mt-0.5">
              Quản trị minh chứng hiệu quả thực tế và case study năng lực
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Tên Dự Án / Tiêu Đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Kiểm soát an ninh KCN Điện Tử VSIP Bắc Ninh"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Tên Khách Hàng / Đối Tác <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="VD: Tập đoàn Công nghệ Foxconn / Pegatron"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Lĩnh Vực / Sector
              </label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="KCN, Tòa Nhà, Ngân Hàng..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Giai Đoạn Hợp Tác
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="2022 - Nay"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Quy Mô Quân Số
              </label>
              <input
                type="text"
                value={guardCount}
                onChange={(e) => setGuardCount(e.target.value)}
                placeholder="VD: 55 Vệ sĩ thường trực"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              URL Hình Ảnh Dự Án
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
            </div>
            {/* Quick sample pickers */}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <ImageIcon className="w-3 h-3" /> Chọn nhanh:
              </span>
              {SAMPLE_CASE_IMAGES.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImageUrl(img.url)}
                  className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 rounded transition-colors"
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          {/* Challenge */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Thách Thức Ban Đầu Của Khách Hàng
            </label>
            <textarea
              rows={2}
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              placeholder="VD: Khuôn viên rộng 25ha với hơn 8.000 công nhân ra vào mỗi ca, tỷ lệ thất thoát linh kiện cao..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>

          {/* Solution */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Giải Pháp Triển Khai Bởi Lâm Sơn Động
            </label>
            <textarea
              rows={2}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="VD: Thiết lập 3 vành đai bảo vệ nghiêm ngặt, tích hợp camera AI nhận diện khuôn mặt và cổng kiểm soát phân làn..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>

          {/* Result */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Kết Quả Đạt Được & Giá Trị Mang Lại
            </label>
            <textarea
              rows={2}
              value={result}
              onChange={(e) => setResult(e.target.value)}
              placeholder="VD: Giảm 100% tình trạng thất thoát tài sản sau 3 tháng, đạt chuẩn an ninh C-TPAT xuất khẩu thị trường Mỹ..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-bold text-xs uppercase tracking-wider rounded shadow flex items-center gap-1.5 transition-all disabled:opacity-50"
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
