/**
 * Technical SEO & Conversion Tracking Utilities
 * Standardized Google Tag Manager / GA4 DataLayer dispatcher
 */

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/**
 * Push an event payload to window.dataLayer safely
 */
export function pushDataLayer(eventName: string, payload: Record<string, any> = {}): void {
  try {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      const eventData = {
        event: eventName,
        timestamp: new Date().toISOString(),
        ...payload,
      };
      window.dataLayer.push(eventData);

      if (import.meta.env.DEV) {
        console.log('[Analytics dataLayer]', eventName, eventData);
      }
    }
  } catch (err) {
    console.warn('Failed to push to dataLayer:', err);
  }
}

/**
 * 1. Hoàn tất công cụ đánh giá rủi ro an ninh
 * Event: risk_tool_completed
 */
export function trackRiskToolCompleted(details: {
  facilityType?: string;
  facilityLabel?: string;
  areaSize?: string;
  riskScore?: number;
  riskLevel?: string;
  selectedRisksCount?: number;
} = {}): void {
  pushDataLayer('risk_tool_completed', {
    tool_name: 'Security Risk Assessment',
    category: 'Lead Generation',
    ...details,
  });
}

/**
 * 2. Gửi form báo giá hoặc khảo sát thực địa thành công
 * Event: b2b_quote_submitted
 */
export function trackQuoteSubmitted(details: {
  source: 'consultation_form' | 'quote_calculator' | 'risk_assessment_demo' | string;
  clientName?: string;
  serviceType?: string;
  totalEstimate?: number;
  region?: string;
} = { source: 'unknown' }): void {
  pushDataLayer('b2b_quote_submitted', {
    form_name: details.source,
    category: 'Lead Conversion',
    currency: 'VND',
    value: details.totalEstimate || 0,
    ...details,
  });
}

/**
 * 3. Bấm gọi hotline trực ban 24/7
 * Event: hotline_click
 */
export function trackHotlineClick(source: string, additional: Record<string, any> = {}): void {
  pushDataLayer('hotline_click', {
    source,
    phone_number: '0985.507.624',
    category: 'Call Conversion',
    ...additional,
  });
}

/**
 * 4. Bấm kết nối chat Zalo trực ban 24/7
 * Event: zalo_chat_click
 */
export function trackZaloChatClick(source: string, additional: Record<string, any> = {}): void {
  pushDataLayer('zalo_chat_click', {
    source,
    zalo_link: 'https://zalo.me/0985507624',
    category: 'Chat Conversion',
    ...additional,
  });
}
