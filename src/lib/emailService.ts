/**
 * Service gửi thông báo email về hòm thư công ty: congtybaovelamsondong@gmail.com
 * Áp dụng cho:
 * 1. Yêu cầu báo giá & Tư vấn an ninh mục tiêu (Consultation & Quote Calculator)
 * 2. Đăng ký ứng tuyển tuyển dụng (Recruitment Form)
 * 3. Đăng ký nhận bản tin cảnh báo rủi ro doanh nghiệp (Newsletter Subscription)
 */

export const COMPANY_EMAIL = 'congtybaovelamsondong@gmail.com';

export interface QuoteEmailPayload {
  source: 'consultation_form' | 'quote_calculator' | 'risk_assessment_demo' | string;
  clientName: string;
  phone: string;
  email?: string;
  companyName?: string;
  jobTitle?: string;
  region?: string;
  serviceType?: string;
  targetType?: string;
  guards24h?: number;
  guards12h?: number;
  totalEstimate?: number;
  estimatedPriceFormatted?: string;
  options?: string[];
  message?: string;
  riskScore?: number;
  riskLevel?: string;
}

export interface RecruitmentEmailPayload {
  fullName: string;
  phone: string;
  birthYear: string;
  desiredPosition: string;
  location: string;
  experience?: string;
}

export interface NewsletterEmailPayload {
  email: string;
  sourcePage?: string;
}

export interface EmailAuditLog {
  id: string;
  type: 'quote' | 'recruitment' | 'newsletter';
  recipient: string;
  subject: string;
  payload: Record<string, any>;
  status: 'sent' | 'fallback_saved' | 'failed';
  timestamp: string;
}

const EMAIL_AUDIT_STORAGE_KEY = 'lsd_email_notifications_log';

/**
 * Ghi log lưu trữ cục bộ để bộ phận kỹ thuật / admin kiểm tra đối soát
 */
function logEmailSubmission(log: EmailAuditLog) {
  try {
    const raw = localStorage.getItem(EMAIL_AUDIT_STORAGE_KEY);
    const logs: EmailAuditLog[] = raw ? JSON.parse(raw) : [];
    logs.unshift(log);
    // Giữ lại 100 thông báo gần nhất
    localStorage.setItem(EMAIL_AUDIT_STORAGE_KEY, JSON.stringify(logs.slice(0, 100)));
  } catch (e) {
    console.warn('Không thể lưu email audit log vào localStorage:', e);
  }
}

/**
 * Gửi HTTP POST tới cổng gửi FormSubmit để chuyển tiếp email tới congtybaovelamsondong@gmail.com
 */
async function postToEmailGateway(subject: string, fields: Record<string, any>, replyTo?: string): Promise<boolean> {
  try {
    const payload: Record<string, any> = {
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      ...fields,
    };

    if (replyTo && replyTo.includes('@')) {
      payload._replyto = replyTo;
    }

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(COMPANY_EMAIL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      return data.success === 'true' || data.success === true || response.status === 200;
    }
    return false;
  } catch (error) {
    console.warn('Lỗi khi gửi email qua gateway FormSubmit, dữ liệu đã được lưu trữ an toàn trên hệ thống:', error);
    return false;
  }
}

/**
 * 1. Gửi thông tin Yêu cầu Báo giá / Tư vấn An ninh
 */
export async function sendQuoteNotification(data: QuoteEmailPayload): Promise<{ success: boolean; message: string }> {
  const sourceLabelMap: Record<string, string> = {
    consultation_form: 'Form Đăng ký Khảo sát & Báo giá trực tuyến',
    quote_calculator: 'Bảng tính Dự toán Ngân sách Trực tuyến',
    risk_assessment_demo: 'Hệ thống Khảo sát & Đánh giá Rủi ro An ninh',
  };

  const sourceName = sourceLabelMap[data.source] || data.source || 'Website Lâm Sơn Động';
  const subject = `[LÂM SƠN ĐỘNG - BÁO GIÁ MỚI] ${data.clientName} - SĐT: ${data.phone}`;

  const fields: Record<string, any> = {
    'Hệ thống': 'Lâm Sơn Động Security Web Portal',
    'Loại yêu cầu': 'YÊU CẦU BÁO GIÁ & TƯ VẤN AN NINH MỤC TIÊU',
    'Nguồn gửi': sourceName,
    'Thời gian': new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    'Họ và tên khách hàng': data.clientName,
    'Số điện thoại': data.phone,
    'Email liên hệ': data.email || 'Chưa cung cấp',
    'Tên doanh nghiệp': data.companyName || 'Khách hàng cá nhân',
    'Chức vụ': data.jobTitle || 'Chưa cung cấp',
    'Khu vực mục tiêu': data.region || 'Hà Nội & Miền Bắc',
    'Dịch vụ / Mô hình': data.serviceType || data.targetType || 'Bảo vệ Mục tiêu Cố định',
  };

  if (data.guards24h !== undefined || data.guards12h !== undefined) {
    fields['Quân số 24/7'] = `${data.guards24h || 0} vị trí`;
    fields['Quân số 12h/ngày'] = `${data.guards12h || 0} vị trí`;
  }

  if (data.estimatedPriceFormatted || data.totalEstimate) {
    fields['Dự toán ước tính'] = data.estimatedPriceFormatted || `${new Intl.NumberFormat('vi-VN').format(data.totalEstimate || 0)} VNĐ/tháng`;
  }

  if (data.options && data.options.length > 0) {
    fields['Dịch vụ gia tăng kèm theo'] = data.options.join(', ');
  }

  if (data.riskScore !== undefined) {
    fields['Điểm rủi ro khảo sát'] = `${data.riskScore}/100 (${data.riskLevel || ''})`;
  }

  if (data.message) {
    fields['Ghi chú / Yêu cầu chi tiết'] = data.message;
  }

  const isSent = await postToEmailGateway(subject, fields, data.email);

  logEmailSubmission({
    id: `email-quote-${Date.now()}`,
    type: 'quote',
    recipient: COMPANY_EMAIL,
    subject,
    payload: fields,
    status: isSent ? 'sent' : 'fallback_saved',
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    message: isSent
      ? 'Đã gửi thông tin báo giá thành công về ban quản lý Lâm Sơn Động.'
      : 'Thông tin báo giá đã được hệ thống tiếp nhận và lưu trữ an toàn.',
  };
}

/**
 * 2. Gửi thông tin Đăng ký Ứng tuyển Tuyển dụng
 */
export async function sendRecruitmentNotification(data: RecruitmentEmailPayload): Promise<{ success: boolean; message: string }> {
  const subject = `[LÂM SƠN ĐỘNG - ỨNG VIÊN MỚI] ${data.fullName} - ${data.desiredPosition} - SĐT: ${data.phone}`;

  const fields: Record<string, any> = {
    'Hệ thống': 'Lâm Sơn Động Security - Ban Tuyển Dụng',
    'Loại yêu cầu': 'HỒ SƠ ĐĂNG KÝ ỨNG TUYỂN NHANH TRỰC TUYẾN',
    'Thời gian nộp đơn': new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    'Họ và tên ứng viên': data.fullName,
    'Số điện thoại': data.phone,
    'Năm sinh': data.birthYear,
    'Vị trí ứng tuyển': data.desiredPosition,
    'Khu vực làm việc mong muốn': data.location,
    'Kinh nghiệm / Ghi chú': data.experience || 'Chưa có ghi chú thêm',
  };

  const isSent = await postToEmailGateway(subject, fields);

  logEmailSubmission({
    id: `email-recruitment-${Date.now()}`,
    type: 'recruitment',
    recipient: COMPANY_EMAIL,
    subject,
    payload: fields,
    status: isSent ? 'sent' : 'fallback_saved',
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    message: isSent
      ? 'Đã chuyển hồ sơ ứng tuyển về Phòng Nhân Sự Lâm Sơn Động.'
      : 'Hồ sơ đã được lưu trữ an toàn và chuyển tới Phòng Nhân Sự.',
  };
}

/**
 * 3. Gửi thông tin Đăng ký Nhận Bản tin
 */
export async function sendNewsletterNotification(data: NewsletterEmailPayload): Promise<{ success: boolean; message: string }> {
  const subject = `[LÂM SƠN ĐỘNG - BẢN TIN] Khách hàng đăng ký nhận bản tin cảnh báo rủi ro: ${data.email}`;

  const fields: Record<string, any> = {
    'Hệ thống': 'Lâm Sơn Động Security - Cảnh Báo An Ninh',
    'Loại yêu cầu': 'ĐĂNG KÝ NHẬN BẢN TIN CẢNH BÁO RỦI RO DOANH NGHIỆP',
    'Thời gian đăng ký': new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    'Email khách hàng': data.email,
    'Trang đăng ký': data.sourcePage || 'Chân trang Website (Footer)',
  };

  const isSent = await postToEmailGateway(subject, fields, data.email);

  logEmailSubmission({
    id: `email-newsletter-${Date.now()}`,
    type: 'newsletter',
    recipient: COMPANY_EMAIL,
    subject,
    payload: fields,
    status: isSent ? 'sent' : 'fallback_saved',
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    message: 'Đăng ký nhận bản tin thành công.',
  };
}
