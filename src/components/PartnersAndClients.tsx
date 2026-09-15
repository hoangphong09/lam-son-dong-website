import React from 'react';

interface PartnerBrand {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}

const BRAND_ROW_1: PartnerBrand[] = [
  {
    id: 'samsung',
    name: 'Samsung Electronics',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[160px]" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="110" 
          y="33" 
          textAnchor="middle" 
          fill="#1428A0" 
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif" 
          fontWeight="900" 
          fontSize="26" 
          letterSpacing="4px"
        >
          SAMSUNG
        </text>
      </svg>
    ),
  },
  {
    id: 'lg-display',
    name: 'LG Display',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[170px]" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(18, 7)">
          <circle cx="18" cy="18" r="16" fill="#A50034" />
          <path d="M18 10v9h7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="12.5" cy="13.5" r="1.8" fill="white" />
          <text x="44" y="25" fill="#A50034" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="22" letterSpacing="0.5px">
            LG Display
          </text>
        </g>
      </svg>
    ),
  },
  {
    id: 'vingroup',
    name: 'Vingroup',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[165px]" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(22, 7)">
          <path d="M12 28L18 8l6 20-3.5-3.5L18 15l-2.5 9.5L12 28z" fill="#C5A059" />
          <path d="M6 14c4 1 8 4 12 10-3-6-6-8-12-10z" fill="#B8860B" />
          <path d="M30 14c-4 1-8 4-12 10 3-6 6-8 12-10z" fill="#B8860B" />
          <text x="38" y="24" fill="#C8102E" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="20" letterSpacing="1.5px">
            VINGROUP
          </text>
        </g>
      </svg>
    ),
  },
  {
    id: 'honda',
    name: 'Honda',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[150px]" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(35, 7)">
          <rect x="0" y="2" width="30" height="28" rx="5" stroke="#CC0000" strokeWidth="2.4" fill="none" />
          <path d="M7 8v16h4v-6h8v6h4V8h-4v6h-8V8H7z" fill="#CC0000" />
          <text x="40" y="25" fill="#CC0000" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="21" letterSpacing="2.5px">
            HONDA
          </text>
        </g>
      </svg>
    ),
  },
  {
    id: 'techcombank',
    name: 'Techcombank',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[185px]" viewBox="0 0 230 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(8, 7)">
          <path d="M14 2l12 12-12 12L2 14 14 2z" fill="#EA1C24" />
          <path d="M20 8l7 7-7 7-7-7 7-7z" fill="white" />
          <text x="36" y="24" fill="#0F172A" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="17.5" letterSpacing="1px">
            TECHCOMBANK
          </text>
        </g>
      </svg>
    ),
  },
  {
    id: 'shopee',
    name: 'Shopee',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[145px]" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(30, 8)">
          <path d="M8 11c0-3.5 2.8-6.5 6.5-6.5s6.5 3 6.5 6.5h-2.2c0-2.3-1.9-4.3-4.3-4.3s-4.3 2-4.3 4.3H8z" fill="#EE4D2D" />
          <path d="M4 10h21l-2.2 19H6.2L4 10z" fill="#EE4D2D" />
          <path d="M16 16.5c-1.6-.7-2.6-1-2.6-1.7 0-.5.5-.9 1.3-.9.9 0 1.7.3 2.2.8l1.1-1.3c-.9-.9-2-1.2-3.3-1.2-2 0-3.3 1.1-3.3 2.6 0 1.5 1.3 2.2 3 2.7 1.6.5 2.5 1 2.5 1.7s-.7 1-1.5 1c-1.1 0-2.1-.5-2.8-1.2l-1.2 1.3c1 1.1 2.4 1.6 4 1.6 2.2 0 3.6-1.2 3.6-2.7 0-1.7-1.4-2.3-2.9-2.7z" fill="white" />
          <text x="34" y="25" fill="#EE4D2D" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="23" letterSpacing="0.5px">
            Shopee
          </text>
        </g>
      </svg>
    ),
  },
  {
    id: 'aeon-mall',
    name: 'AEON Mall',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[155px]" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(20, 8)">
          <text x="0" y="26" fill="#E4007F" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="24" letterSpacing="1px">
            ÆON
          </text>
          <text x="70" y="26" fill="#0F172A" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="20" letterSpacing="1.5px">
            MALL
          </text>
        </g>
      </svg>
    ),
  },
];

const BRAND_ROW_2: PartnerBrand[] = [
  {
    id: 'panasonic',
    name: 'Panasonic',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[160px]" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="110" 
          y="32" 
          textAnchor="middle" 
          fill="#004098" 
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif" 
          fontWeight="900" 
          fontSize="24" 
          letterSpacing="1px"
        >
          Panasonic
        </text>
      </svg>
    ),
  },
  {
    id: 'masan',
    name: 'Masan Group',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[155px]" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(30, 8)">
          <path d="M8 8c5 0 9 4 9 9s-4 9-9 9" stroke="#E31E24" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M12 12c3 0 5 2.2 5 5s-2 5-5 5" stroke="#F68B1F" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <text x="28" y="24" fill="#0F172A" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="20" letterSpacing="1.5px">
            MASAN
          </text>
        </g>
      </svg>
    ),
  },
  {
    id: 'masterise',
    name: 'Masterise Homes',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[170px]" viewBox="0 0 230 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(15, 6)">
          <path d="M6 28V8l8 11 8-11v20" stroke="#B38838" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="30" y="23" fill="#1E293B" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="16" letterSpacing="1px">
            MASTERISE
          </text>
          <text x="30" y="32" fill="#B38838" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="700" fontSize="9" letterSpacing="3px">
            HOMES
          </text>
        </g>
      </svg>
    ),
  },
  {
    id: 'vinfast',
    name: 'VinFast',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[155px]" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(25, 8)">
          <path d="M6 6l8 19 8-19-4 1-4 12-4-12-4-1z" fill="#1B5EE2" />
          <path d="M2 8l12 19 12-19-2 0-10 15L4 8H2z" fill="#0F172A" />
          <text x="32" y="24" fill="#1B5EE2" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="19" letterSpacing="1.5px">
            VINFAST
          </text>
        </g>
      </svg>
    ),
  },
  {
    id: 'foxconn',
    name: 'Foxconn',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[155px]" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="100" 
          y="33" 
          textAnchor="middle" 
          fill="#005A9C" 
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif" 
          fontWeight="900" 
          fontSize="24" 
          letterSpacing="1.5px"
        >
          Foxconn
        </text>
      </svg>
    ),
  },
  {
    id: 'canon',
    name: 'Canon',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[145px]" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="100" 
          y="33" 
          textAnchor="middle" 
          fill="#CC0000" 
          fontFamily="'Plus Jakarta Sans', Georgia, serif" 
          fontWeight="900" 
          fontSize="26" 
          letterSpacing="2px"
        >
          Canon
        </text>
      </svg>
    ),
  },
  {
    id: 'viettel',
    name: 'Viettel',
    renderLogo: () => (
      <svg className="h-7 sm:h-8 w-auto max-w-[145px]" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="100" 
          y="33" 
          textAnchor="middle" 
          fill="#EE0033" 
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif" 
          fontWeight="900" 
          fontSize="25" 
          letterSpacing="1px"
        >
          viettel
        </text>
      </svg>
    ),
  },
];

export const PartnersAndClients: React.FC = () => {
  return (
    <section id="partners-section" className="bg-white text-slate-900 py-14 sm:py-18 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 uppercase tracking-wide sm:tracking-wider leading-[1.35] sm:leading-[1.3] font-['Plus_Jakarta_Sans',sans-serif]">
          LÂM SƠN ĐỘNG TỰ HÀO ĐỒNG HÀNH CÙNG CÁC DOANH NGHIỆP HÀNG ĐẦU
        </h2>
        <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
          Hơn 50+ tập đoàn đa quốc gia FDI và thương hiệu đầu ngành tin tưởng trao gửi sứ mệnh bảo vệ an ninh.
        </p>
      </div>

      {/* Infinite Marquee Track Container with Smooth Mask Gradients on Both Edges */}
      <div className="relative w-full overflow-hidden marquee-container py-3">
        {/* Left & Right Soft Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />

        {/* Row 1: Scrolling Left (Seamless Loop by Doubling the Array) */}
        <div className="flex items-center marquee-track-left mb-6">
          {[...BRAND_ROW_1, ...BRAND_ROW_1].map((brand, idx) => (
            <div
              key={`${brand.id}-row1-${idx}`}
              className="w-[180px] sm:w-[220px] h-[64px] sm:h-[72px] shrink-0 mx-4 sm:mx-6 flex items-center justify-center cursor-pointer opacity-90 hover:opacity-100 hover:scale-108 transition-all duration-300"
              title={brand.name}
            >
              {brand.renderLogo()}
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right (Seamless Loop by Doubling the Array) */}
        <div className="flex items-center marquee-track-right">
          {[...BRAND_ROW_2, ...BRAND_ROW_2].map((brand, idx) => (
            <div
              key={`${brand.id}-row2-${idx}`}
              className="w-[180px] sm:w-[220px] h-[64px] sm:h-[72px] shrink-0 mx-4 sm:mx-6 flex items-center justify-center cursor-pointer opacity-90 hover:opacity-100 hover:scale-108 transition-all duration-300"
              title={brand.name}
            >
              {brand.renderLogo()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
