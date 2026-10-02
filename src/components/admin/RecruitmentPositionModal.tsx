import React, { useState, useEffect } from 'react';
import { RecruitmentPosition, generateSlug } from '../../lib/supabase';
import { X, Save, RefreshCw, Briefcase, DollarSign, MapPin, Users, Clock, AlertCircle } from 'lucide-react';
import { PostImageUploader } from './PostImageUploader';

interface RecruitmentPositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (position: Partial<RecruitmentPosition>) => Promise<void>;
  positionToEdit?: RecruitmentPosition | null;
}

const BADGE_PRESETS = [
  'Tuyển liên tục',
  'Ưu tiên đặc nhiệm',
  'Tuyển gấp',
  'Lương cao',
  'Có chỗ ở',
  'Chưa có kinh nghiệm',
];

export const RecruitmentPositionModal: React.FC<RecruitmentPositionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  positionToEdit,
}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [badge, setBadge] = useState('Tuyển liên tục');
  const [salaryRange, setSalaryRange] = useState('');
  const [quantity, setQuantity] = useState('20 người');
  const [location, setLocation] = useState('Hà Nội & KCN');
  const [workType, setWorkType] = useState('Xoay ca 8h - 12h / Ngày hoặc Đêm');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');
  const [deadline, setDeadline] = useState('Tuyển liên tục trong tháng');
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    setErrorMessage(null);
    if (positionToEdit) {
      setTitle(positionToEdit.title || '');
      setSlug(positionToEdit.slug || '');
      setBadge(positionToEdit.badge || 'Tuyển liên tục');
      setSalaryRange(positionToEdit.salary_range || '');
      setQuantity(positionToEdit.quantity || '20 người');
      setLocation(positionToEdit.location || 'Hà Nội');
      setWorkType(positionToEdit.work_type || 'Xoay ca');
      setDescription(positionToEdit.description || '');
      setRequirements(positionToEdit.requirements || '');
      setBenefits(positionToEdit.benefits || '');
      setDeadline(positionToEdit.deadline || 'Tuyển liên tục trong tháng');
      setImageUrl(positionToEdit.image_url || '');
      setIsActive(positionToEdit.is_active !== false);
      setDisplayOrder(positionToEdit.display_order || 1);
      setAutoSlug(false);
    } else {
      setTitle('');
      setSlug('');
      setBadge('Tuyển liên tục');
      setSalaryRange('7.500.000 - 10.000.000 VNĐ');
      setQuantity('20 người');
      setLocation('Hà Nội, Bắc Ninh, Hưng Yên');
      setWorkType('Xoay ca 8h - 12h / Ngày hoặc Đêm');
      setDescription('');
      setRequirements('');
      setBenefits('');
      setDeadline('Tuyển liên tục trong tháng');
      setImageUrl('');
      setIsActive(true);
      setDisplayOrder(1);
      setAutoSlug(true);
    }
  }, [positionToEdit, isOpen]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(generateSlug(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !salaryRange.trim() || !location.trim() || !description.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ: Tiêu đề, Mức lương, Địa điểm và Mô tả công việc.');
      return;
    }

    if (isUploadingImage) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await onSave({
        title: title.trim(),
        slug: slug.trim() || generateSlug(title),
        badge: badge.trim(),
        salary_range: salaryRange.trim(),
        quantity: quantity.trim(),
        location: location.trim(),
        work_type: workType.trim(),
        description: description.trim(),
        requirements: requirements.trim(),
        benefits: benefits.trim(),
        deadline: deadline.trim(),
        image_url: imageUrl.trim() || undefined,
        is_active: isActive,
        display_order: Number(displayOrder) || 1,
      });
      onClose();
    } catch (err: any) {
      console.error('Lỗi lưu vị trí tuyển dụng:', err);
      setErrorMessage(err.message || 'Lỗi lưu vị trí tuyển dụng.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 uppercase font-['Plus_Jakarta_Sans',sans-serif]">
                {positionToEdit ? 'Chỉnh Sửa Vị Trí Tuyển Dụng' : 'Thêm Vị Trí Tuyển Dụng Mới'}
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Cập nhật thông tin cơ hội việc làm hiển thị trên trang Tuyển dụng
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 border border-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-800 text-xs font-mono">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold">Lỗi: </span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}
          {/* Title & Slug */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                Tên vị trí tuyển dụng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="VD: Nhân Viên Bảo Vệ Mục Tiêu KCN..."
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900 font-medium transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                  Đường dẫn tĩnh (Slug)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setAutoSlug(false);
                    }}
                    placeholder="nhan-vien-bao-ve-muc-tieu"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setSlug(generateSlug(title))}
                    title="Tạo lại từ tiêu đề"
                    className="p-2 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                  Huy hiệu nổi bật (Badge)
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="Tuyển liên tục / Lương cao"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {BADGE_PRESETS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBadge(b)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                        badge === b
                          ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                          : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Banner Image / Cover Image via Supabase Storage */}
          <div className="pt-2 border-t border-slate-100">
            <PostImageUploader
              currentImageUrl={imageUrl}
              onImageChange={setImageUrl}
              onUploadStateChange={setIsUploadingImage}
            />
          </div>

          {/* Salary & Quantity & Location & Work Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-700" />
                  Mức thu nhập / Lương <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                placeholder="VD: 7.500.000 - 10.000.000 VNĐ"
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-700" />
                  Số lượng cần tuyển
                </span>
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="VD: 50 người / 15 người"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  Địa điểm làm việc <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="VD: Hà Nội, Bắc Ninh, Hưng Yên..."
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  Hình thức làm việc / Ca trực
                </span>
              </label>
              <input
                type="text"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                placeholder="VD: Xoay ca 8h - 12h / Ngày hoặc Đêm"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
              Mô tả công việc <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhiệm vụ tuần tra canh gác, kiểm soát luồng người và phương tiện, duy trì an ninh trật tự..."
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900 leading-relaxed"
            />
          </div>

          {/* Requirements & Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                Yêu cầu ứng viên
              </label>
              <textarea
                rows={4}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Nam từ 18-50 tuổi, sức khỏe tốt, lý lịch trong sạch, ưu tiên bộ đội xuất ngũ..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                Quyền lợi & Phúc lợi
              </label>
              <textarea
                rows={4}
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder="Chỗ ở miễn phí, BHXH, thưởng lễ tết, đào tạo võ thuật & cấp chứng chỉ hành nghề miễn phí..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900 leading-relaxed"
              />
            </div>
          </div>

          {/* Deadline & Display Order & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 items-center">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                Hạn nộp hồ sơ
              </label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="Tuyển liên tục trong tháng"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                Thứ tự hiển thị
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                min={1}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>

            <div className="pt-4 sm:pt-0">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                  {isActive ? 'Đang mở tuyển (Active)' : 'Tạm dừng tuyển'}
                </span>
              </label>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploadingImage}
              className="px-5 py-2 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting || isUploadingImage ? (
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isSubmitting ? 'Đang Lưu...' : isUploadingImage ? 'Đang Tải Ảnh...' : 'Lưu Vị Trí'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
