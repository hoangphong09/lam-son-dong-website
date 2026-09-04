import React, { useState, useRef, useCallback } from 'react';
import {
  UploadCloud,
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Link2,
  FolderOpen,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { uploadPostImage, validateImageFile, POST_IMAGES_BUCKET } from '../../lib/storage';

interface PostImageUploaderProps {
  currentImageUrl: string;
  onImageChange: (url: string) => void;
  onUploadStateChange?: (isUploading: boolean) => void;
}

const SAMPLE_IMAGES = [
  { label: 'Hợp tác chiến lược', url: 'https://i.postimg.cc/RZmRSwWz/115bf4e4-5198-467e-bd43-500b7d169a5b.jpg' },
  { label: 'Đội ngũ vệ sĩ VIP', url: 'https://i.postimg.cc/DZ4sdzS5/0373a718-53f7-48e1-b2c9-9256c37285bc.jpg' },
  { label: 'Diễn tập PCCC & SOC', url: 'https://i.postimg.cc/J0csPHMZ/ba79cc9a-1504-4736-b837-5a813d13a59d.jpg' },
  { label: 'Đào tạo nghiệp vụ', url: 'https://i.postimg.cc/k5dkdVmG/7c332534-4aaa-48bc-9d3b-46c81b752efc.jpg' },
  { label: 'Hoạt động thiện nguyện', url: 'https://i.postimg.cc/ht7BnW74/de994ef0-6599-43b2-bee3-7dfd31b99313.jpg' },
];

export const PostImageUploader: React.FC<PostImageUploaderProps> = ({
  currentImageUrl,
  onImageChange,
  onUploadStateChange,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [uploadProgressText, setUploadProgressText] = useState('');
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [customUrl, setCustomUrl] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const setUploading = useCallback((state: boolean) => {
    setIsUploading(state);
    if (onUploadStateChange) {
      onUploadStateChange(state);
    }
  }, [onUploadStateChange]);

  const handleFileProcess = async (file: File) => {
    setUploadError(null);
    setUploadSuccess(false);

    // 1. Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Tệp không hợp lệ');
      return;
    }

    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    setUploading(true);
    setUploadProgressText('Đang kết nối và tải ảnh lên Supabase Storage...');

    try {
      // 2. Perform upload to Supabase Storage
      const publicUrl = await uploadPostImage(file);
      onImageChange(publicUrl);
      setUploadSuccess(true);
      setUploadProgressText('Tải lên thành công!');
    } catch (err: any) {
      console.error('Lỗi tải ảnh:', err);
      setUploadError(err.message || 'Không thể tải ảnh lên Supabase Storage.');
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileProcess(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileProcess(file);
    }
  };

  const handleRemoveImage = () => {
    onImageChange('');
    setFileName(null);
    setFileSize(null);
    setUploadSuccess(false);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onImageChange(customUrl.trim());
      setUploadSuccess(false);
      setUploadError(null);
    }
  };

  const isSupabaseStored = currentImageUrl.includes(POST_IMAGES_BUCKET) || currentImageUrl.includes('supabase');

  return (
    <div id="post-image-uploader" className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold">
          Ảnh bìa bài viết <span className="text-amber-700">*</span>
        </label>
        
        {/* Switch mode tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-mono">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
              mode === 'upload'
                ? 'bg-white text-slate-950 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tải từ thiết bị
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('url');
              setCustomUrl(currentImageUrl);
            }}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
              mode === 'url'
                ? 'bg-white text-slate-950 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Nhập URL / Ảnh mẫu
          </button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileInputChange}
        className="hidden"
        id="post-file-picker"
      />

      {/* Primary Mode: Local File Upload & Dropzone */}
      {mode === 'upload' && !currentImageUrl && (
        <div
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all cursor-pointer select-none ${
            isDragging
              ? 'border-amber-500 bg-amber-50/70 scale-[1.005]'
              : 'border-slate-300 hover:border-amber-600/70 bg-slate-50/70 hover:bg-slate-50'
          } ${isUploading ? 'pointer-events-none opacity-80' : ''}`}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform ${
              isDragging ? 'bg-amber-100 text-amber-700 scale-110' : 'bg-slate-200/80 text-slate-700'
            }`}>
              {isUploading ? (
                <RefreshCw className="w-7 h-7 animate-spin text-amber-600" />
              ) : (
                <UploadCloud className="w-7 h-7" />
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                {isUploading ? (
                  uploadProgressText || 'Đang tải ảnh lên Supabase Storage...'
                ) : isDragging ? (
                  'Thả tệp ảnh vào đây để tải lên...'
                ) : (
                  <>
                    <span className="text-amber-800 underline decoration-amber-400 font-extrabold">
                      Nhấp để chọn ảnh
                    </span>{' '}
                    hoặc kéo thả tệp vào đây
                  </>
                )}
              </p>
              <p className="text-xs text-slate-500 font-mono">
                Hỗ trợ định dạng JPEG, PNG, WebP hoặc GIF (Dung lượng tối đa: 5 MB)
              </p>
            </div>

            {!isUploading && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-mono font-bold rounded-lg shadow-2xs transition-all cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5 text-amber-600" />
                Duyệt tệp từ máy tính
              </button>
            )}
          </div>
        </div>
      )}

      {/* Alternative Mode: URL input and sample presets */}
      {mode === 'url' && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Link2 className="w-4 h-4" />
              </div>
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Dán đường dẫn ảnh trực tiếp (https://...)"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 focus:border-amber-600 text-slate-800 text-xs sm:text-sm font-mono focus:outline-hidden transition-all rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={handleApplyCustomUrl}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-mono font-bold rounded-lg transition-all cursor-pointer shrink-0"
            >
              Áp dụng
            </button>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Hoặc chọn ảnh mẫu có sẵn:
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_IMAGES.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    onImageChange(img.url);
                    setCustomUrl(img.url);
                    setUploadSuccess(false);
                    setUploadError(null);
                  }}
                  className={`text-xs font-mono px-2.5 py-1 border rounded-md transition-all cursor-pointer ${
                    currentImageUrl === img.url
                      ? 'bg-[#c5a059] text-slate-950 border-[#c5a059] font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-400'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Image Preview & Replacement Box */}
      {currentImageUrl && (
        <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs">
          <div className="relative h-44 sm:h-52 w-full bg-slate-900 flex items-center justify-center overflow-hidden group">
            <img
              src={currentImageUrl}
              alt="Ảnh bìa bài viết"
              className="w-full h-full object-cover brightness-95 transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Overlay tag */}
            <div className="absolute top-3 left-3 bg-slate-950/85 px-3 py-1.5 text-xs font-mono text-white border border-slate-700 flex items-center gap-2 rounded-md shadow-xs backdrop-blur-xs">
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>{isSupabaseStored ? 'Supabase Storage' : 'Ảnh bài viết'}</span>
              {isSupabaseStored && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </div>

            {/* Quick Actions floating on preview */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <a
                href={currentImageUrl}
                target="_blank"
                rel="noreferrer"
                title="Mở xem ảnh kích thước đầy đủ"
                className="w-8 h-8 bg-slate-900/80 hover:bg-slate-900 text-white rounded-md flex items-center justify-center border border-slate-700 transition-all cursor-pointer backdrop-blur-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={handleRemoveImage}
                title="Xóa ảnh này"
                className="w-8 h-8 bg-red-900/80 hover:bg-red-800 text-white rounded-md flex items-center justify-center border border-red-700 transition-all cursor-pointer backdrop-blur-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Replace button overlay */}
            <div className="absolute bottom-3 right-3">
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 bg-white/95 hover:bg-white text-slate-900 font-mono font-bold text-xs rounded-md shadow-sm border border-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                    <span>Đang tải...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 text-slate-700" />
                    <span>Thay đổi ảnh</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Details Bar */}
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-600">
            <div className="truncate flex items-center gap-2">
              {uploadSuccess ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đã tải lên thành công:
                </span>
              ) : (
                <span className="text-slate-700 font-bold shrink-0">Đường dẫn:</span>
              )}
              <span className="truncate text-slate-500" title={currentImageUrl}>
                {fileName ? `${fileName} (${fileSize || ''})` : currentImageUrl}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-red-700 hover:text-red-900 hover:underline font-bold transition-colors cursor-pointer"
              >
                Xóa ảnh này
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error alert */}
      {uploadError && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-800">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold mb-0.5">Lỗi tải ảnh:</p>
            <p className="leading-relaxed">{uploadError}</p>
          </div>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-red-500 hover:text-red-800 p-0.5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
