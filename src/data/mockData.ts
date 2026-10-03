import {
  HeroSlide,
  Certification,
  StatItem,
  ProvinceLocation,
  ServiceItem,
  SolutionCategory,
  CaseStudy,
  ResearchArticle,
  NewsItem,
  ClientPartner,
} from '../types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    tag: '',
    title: 'Giải Pháp An Ninh Toàn Diện: An Toàn – Kỉ Luật – Trách Nhiệm',
    description: 'Đội ngũ vệ sĩ tuyển chọn từ lực lượng đặc nhiệm, tinh thông võ thuật thực chiến, chứng chỉ cứu thương quốc tế và kỹ năng lái xe phòng vệ chuyên nghiệp.',
    imageUrl: '/images/hero-1.jpg',
    ctaText: 'Dịch Vụ Bảo Vệ',
    secondaryCtaText: 'Đánh Giá Rủi Ro',
    category: 'Dịch vụ tiêu biểu',
  },
  {
    id: 'slide-2',
    tag: '',
    title: 'Dẫn đầu xu thế An Ninh 4.0',
    description: 'Triển khai lực lượng an ninh tinh nhuệ 500+ quân số tập trung 24/7 cho các mục tiêu trọng yếu dịp Quốc khánh và các sự kiện tầm cỡ quốc gia.',
    imageUrl: '/images/hero-2.jpg',
    ctaText: 'Dịch Vụ Bảo Vệ',
    secondaryCtaText: 'Đánh Giá Rủi Ro',
    category: 'Sự kiện lớn',
  },
  {
    id: 'slide-3',
    tag: '',
    title: 'Liên tục tuyển dụng Nhân viên Bảo vệ',
    description: 'Cơ hội việc làm với thu nhập ổn định, phúc lợi đảm bảo.',
    imageUrl: '/images/hero-3.jpg',
    ctaText: 'Dịch Vụ Bảo Vệ',
    secondaryCtaText: 'Đánh Giá Rủi Ro',
    category: 'Công nghệ cao',
  },
];

export const BREAKING_NEWS = [
  'Lâm Sơn Động vinh dự đón nhận Cúp Vàng "Thương hiệu Dịch vụ An ninh Uy tín Hàng đầu Việt Nam 2026"',
  'Triển khai thành công phương án bảo vệ an ninh trật tự Lễ hội Âm nhạc 200 khán giả',
  'Bộ Công An chứng nhận đạt chuẩn 100% về Điều kiện An ninh Trật tự & Nghiệp vụ PCCC cứu nạn',
  'Mở rộng hệ thống Trung tâm phản ứng nhanh cơ động tại các vùng kinh tế trọng điểm',
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Chuẩn Quản Lý Chất Lượng Dịch Vụ Bảo Vệ Quốc Tế',
    code: 'ISO 9001:2015',
    description: 'Hệ thống quy trình quản lý, kiểm soát chất lượng ca trực, đào tạo nghiệp vụ chuẩn hóa toàn diện.',
    organization: 'TUV Rheinland Cert',
    iconType: 'shield-check',
  },
  {
    id: 'cert-2',
    title: 'Đủ Điều Kiện An Ninh Trật Tự Toàn Quốc',
    code: 'C06 - BỘ CÔNG AN',
    description: 'Giấy phép hành nghề kinh doanh dịch vụ bảo vệ chuyên nghiệp do Cục Cảnh sát QLHC về TTXH cấp.',
    organization: 'Bộ Công An Việt Nam',
    iconType: 'badge-check',
  },
  {
    id: 'cert-3',
    title: 'Chứng Chỉ Nghiệp Vụ PCCC & Cứu Nạn Cứu Hộ 100%',
    code: 'PCCC TIÊU CHUẨN',
    description: '100% cán bộ nhân viên được đào tạo thực hành dập tắt đám cháy, sơ cứu nạn nhân và sơ tán khẩn cấp.',
    organization: 'Cảnh Sát PCCC',
    iconType: 'flame',
  },
  {
    id: 'cert-4',
    title: 'Chứng Nhận Huấn Luyện Võ Thuật & Tự Vệ Chuyên Nghiệp',
    code: 'VÕ THUẬT THỰC CHIẾN',
    description: '100% bảo vệ, vệ sĩ được đào tạo tinh hoa võ thuật cổ truyền Lâm Sơn Động và kỹ năng khống chế đối tượng.',
    organization: 'Hội Võ Thuật Cổ Truyền',
    iconType: 'award',
  },
];

export const KEY_STATS: StatItem[] = [
  {
    value: '300 +',
    label: 'Nhân sự bảo vệ & Vệ sĩ',
    description: 'Huấn luyện võ thuật, nghiệp vụ, pháp luật định kỳ',
    iconName: 'Users',
  },
  {
    value: '100 +',
    label: 'Mục tiêu trọng điểm bảo vệ',
    description: 'KCN, Cao ốc, Ngân hàng, Bệnh viện, Nhà máy 24/7',
    iconName: 'Building2',
  },
  {
    value: '100 %',
    label: 'Chứng chỉ PCCC & Võ thuật',
    description: 'Được cấp chứng chỉ hành nghề chính quy bởi Bộ Công An',
    iconName: 'ShieldAlert',
  },
  {
    value: '20+',
    label: 'Tỉnh thành phủ sóng',
    description: 'Đội cơ động phản ứng nhanh có mặt trong 15 phút',
    iconName: 'MapPin',
  },
];

export const PROVINCE_LOCATIONS: ProvinceLocation[] = [
  {
    id: 'hn',
    name: 'Hà Nội (Trụ sở chính)',
    region: 'Bắc',
    guardCount: '1,200+ quân số',
    targetCount: '180 mục tiêu',
    hotline: '0339.269.524',
    address: 'Tầng 18, Tháp V-Guard Tower, Phạm Hùng, Nam Từ Liêm, Hà Nội',
  },
  {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh (VP Miền Nam)',
    region: 'Nam',
    guardCount: '1,450+ quân số',
    targetCount: '220 mục tiêu',
    hotline: '0339.269.524',
    address: 'Số 88 Nguyễn Văn Linh, P. Tân Phong, Quận 7, TP. HCM',
  },
  {
    id: 'dn',
    name: 'Đà Nẵng (VP Miền Trung)',
    region: 'Trung',
    guardCount: '450+ quân số',
    targetCount: '65 mục tiêu',
    hotline: '0339.269.524',
    address: 'Số 126 Nguyễn Tri Phương, P. Chính Gián, Q. Thanh Khê, Đà Nẵng',
  },
  {
    id: 'bd',
    name: 'Bình Dương & Đồng Nai',
    region: 'Nam',
    guardCount: '600+ quân số',
    targetCount: '120 mục tiêu',
    hotline: '0339.269.524',
    address: 'KCN VSIP 1, TP. Thuận An, Bình Dương',
  },
  {
    id: 'hp',
    name: 'Hải Phòng & Quảng Ninh',
    region: 'Bắc',
    guardCount: '350+ quân số',
    targetCount: '55 mục tiêu',
    hotline: '0339.269.524',
    address: 'KCN Đình Vũ, Q. Hải An, TP. Hải Phòng',
  },
  {
    id: 'ct',
    name: 'Cần Thơ & Tây Nam Bộ',
    region: 'Nam',
    guardCount: '280+ quân số',
    targetCount: '40 mục tiêu',
    hotline: '0339.269.524',
    address: 'Đường 30/4, P. Hưng Lợi, Q. Ninh Kiều, TP. Cần Thơ',
  },
];

export const FEATURED_SERVICES: ServiceItem[] = [
  {
    id: 'srv-factory',
    title: 'Bảo Vệ Khu Công Nghiệp & Nhà Máy',
    subtitle: 'Kiểm soát xuất nhập kho, tuần tra hàng rào và phòng chống thất thoát 24/7',
    category: 'Mục tiêu cố định',
    imageUrl: '/images/service-factory.jpg',
    summary: 'Giải pháp an ninh toàn diện cho nhà xưởng, khu chế xuất và kho bãi quy mô lớn với quy trình kiểm soát xe tải, công nhân và kiểm kê hàng hóa nghiêm ngặt.',
    description: 'Đảm bảo an toàn tài sản, dây chuyền sản xuất và trật tự nội bộ. Lực lượng bảo vệ được đào tạo bài bản về PCCC công nghiệp, kiểm soát cổng xuất nhập hàng, giám sát camera kho bãi và thực hiện tuần tra đêm khép kín.',
    targetAudience: ['Nhà máy FDI, liên doanh', 'Kho logistics & cảng cạn', 'Khu chế xuất, KCN công nghệ cao'],
    features: [
      'Kiểm soát 100% người & phương tiện ra vào bằng thẻ từ/nhận diện',
      'Tuần tra khép kín các điểm mù hàng rào bằng hệ thống chốt gác và thẻ tuần tra điện tử',
      'Đội PCCC cơ sở phản ứng tức thì khi có sự cố khói nhiệt',
      'Kiểm tra cốp xe, túi xách chống thất thoát linh kiện giá trị cao',
    ],
    workflow: [
      '1. Khảo sát thực địa, đánh giá các vị trí hiểm yếu và điểm mù',
      '2. Lập phương án bố trí quân số và sơ đồ chốt trực 24/7',
      '3. Ban hành nội quy ra vào & đào tạo nhân sự trực tiếp tại mục tiêu',
      '4. Vận hành, kiểm tra chất lượng đột xuất từ Đội Thanh tra Nghiệp vụ',
    ],
    guarantee: 'Bảo hiểm trách nhiệm pháp lý & bồi thường 100% tổn thất tài sản do lỗi an ninh.',
  },
  {
    id: 'srv-building',
    title: 'Bảo Vệ Tòa Nhà Văn Phòng & Cao Ốc',
    subtitle: 'Đảm bảo hình ảnh sang trọng, văn minh, đón tiếp chuyên nghiệp chuẩn 5 sao',
    category: 'Cao ốc & Bất động sản',
    imageUrl: '/images/service-office.jpg',
    summary: 'Nhân viên bảo vệ tác phong lịch sự, tiếng Anh giao tiếp cơ bản, hướng dẫn khách hàng chu đáo và quản trị bãi xe tầng hầm thông minh.',
    description: 'Tạo dựng môi trường làm việc an toàn, văn minh và sang trọng. Nhân sự được trang bị đồng phục chuẩn vest hoặc quân phục trang trọng, kết hợp vận hành hệ thống kiểm soát thang máy phân tầng, sảnh chính và tầng hầm.',
    targetAudience: ['Tòa nhà văn phòng hạng A/B', 'Khu căn hộ chung cư cao cấp', 'Trung tâm thương mại & phức hợp'],
    features: [
      'Tiếp đón khách, hướng dẫn đăng ký ra vào lịch thiệp',
      'Quản lý hệ thống đỗ xe tầng hầm, điều tiết giao thông giờ cao điểm',
      'Giám sát phòng điều khiển trung tâm và hệ thống camera 24/24',
      'Xử lý tình huống kẹt thang máy, báo cháy giả và gây rối trật tự',
    ],
    workflow: [
      '1. Phân tích lưu lượng khách & phương tiện theo khung giờ',
      '2. Chuẩn hóa quy trình giao tiếp, quy chuẩn hình ảnh sảnh chính',
      '3. Thiết lập liên lạc bộ đàm nội bộ và quy trình phối hợp BQL Tòa nhà',
      '4. Diễn tập sơ tán khẩn cấp định kỳ hàng quý cho cư dân/khách thuê',
    ],
    guarantee: 'Tác phong chuẩn mực, không ngủ gật, không bỏ vị trí - phạt 200% nếu vi phạm quy chế.',
  },
  {
    id: 'srv-bodyguard',
    title: 'Dịch Vụ Vệ Sĩ VIP & Hộ Tống Yếu Nhân',
    subtitle: 'Bảo vệ tính mạng, sức khỏe và đời tư với độ bảo mật tuyệt đối',
    category: 'Vệ sĩ chuyên nghiệp',
    imageUrl: '/images/service-vip.jpg',
    summary: 'Đội ngũ vệ sĩ ưu tú, võ thuật cao cấp, am hiểu tâm lý và kỹ năng đối kháng, luôn sẵn sàng làm lá chắn bảo vệ khách hàng trong mọi hoàn cảnh.',
    description: 'Dành riêng cho các Chủ tịch HĐQT, Tổng giám đốc, Chính khách, Ca sĩ, Diễn viên và Đoàn khách quốc tế. Kế hoạch di chuyển được bảo mật nghiêm ngặt với đội xe hộ tống chuyên dụng và lộ trình thoát hiểm dự phòng.',
    targetAudience: ['Doanh nhân thành đạt, Lãnh đạo cấp cao', 'Người nổi tiếng, Nghệ sĩ, Người có tầm ảnh hưởng', 'Nhân chứng quan trọng cần bảo vệ'],
    features: [
      'Vệ sĩ cao trên 1m78, võ thuật cận chiến, phản xạ tình huống cực nhạy',
      'Kỹ năng lái xe phòng thủ, kỹ năng sơ cấp cứu y tế khẩn cấp',
      'Bảo mật 100% lịch trình, thông tin cá nhân và tài liệu kinh doanh',
      'Tùy chọn trang phục: Vest doanh nhân lịch lãm hoặc Thường phục kín đáo',
    ],
    workflow: [
      '1. Tiếp nhận yêu cầu bảo mật, đánh giá mức độ đe dọa tiềm ẩn',
      '2. Lên kế hoạch lộ trình di chuyển, phương tiện và điểm an toàn',
      '3. Bố trí đội hình tiền trạm kiểm tra an ninh địa điểm đến trước 2h',
      '4. Hộ tống thực tế kèm hỗ trợ liên lạc vệ tinh liên tục',
    ],
    guarantee: 'Ký cam kết bảo mật thông tin trọn đời và chịu trách nhiệm an toàn tuyệt đối 100%.',
  },
  {
    id: 'srv-event',
    title: 'Bảo Vệ Sự Kiện, Lễ Hội & Triển Lãm',
    subtitle: 'Kiểm soát đám đông quy mô từ 500 đến 50.000 người, chống bạo loạn giẫm đạp',
    category: 'Sự kiện & Hội nghị',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    summary: 'Chuyên trách các đại nhạc hội, trận đấu thể thao, triển lãm quốc tế và hội nghị thượng đỉnh với hàng rào an ninh nhiều lớp.',
    description: 'Phân luồng vé, soi chiếu kim loại, ngăn chặn chất cấm, pháo sáng, vũ khí và kiểm soát trật tự khu vực khán đài lẫn hậu trường sân khấu nghệ sĩ.',
    targetAudience: ['Công ty tổ chức sự kiện', 'Ban tổ chức Lễ hội âm nhạc, Thể thao', 'Trung tâm hội chợ & triển lãm'],
    features: [
      'Cổng dò kim loại & máy quét an ninh cầm tay chuẩn quốc tế',
      'Hàng rào an ninh chống xô đẩy chuyên dụng chịu lực cao',
      'Đội cơ động phản ứng nhanh xử lý gây rối, trộm cắp móc túi',
      'Phối hợp nhịp nhàng với Công an địa phương và Cứu thương 115',
    ],
    workflow: [
      '1. Khảo sát sơ đồ mặt bằng sân khấu, cửa thoát hiểm và sức chứa',
      '2. Phân tầng kiểm soát an ninh (Vòng 1 - Soát vé, Vòng 2 - Sân khấu, Vòng 3 - Khu vực ưu tiên)',
      '3. Triển khai diễn tập tình huống giả định giẫm đạp, mất điện',
      '4. Thực thi an ninh từ lúc đón khách đến khi kết thúc dọn dẹp mặt bằng',
    ],
    guarantee: 'Cam kết sự kiện diễn ra thông suốt, không gián đoạn chương trình vì lý do an ninh.',
  },
  {
    id: 'srv-transit',
    title: 'Áp Tải Tiền Mặt & Kim Loại Quý, Hàng Giá Trị Cao',
    subtitle: 'Phương tiện bọc thép chuyên dụng, định vị vệ tinh giám sát hành trình và vũ trang hỗ trợ',
    category: 'Vận chuyển đặc biệt',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    summary: 'Dịch vụ vận chuyển an toàn cho tiền tệ ngân hàng, vàng bạc đá quý, cổ vật và tài liệu mật quốc gia.',
    description: 'Áp dụng xe chuyên dụng chống đạn, két sắt mã hóa và đội ngũ bảo vệ trang bị công cụ hỗ trợ theo đúng quy định pháp luật. Giám sát hành trình và khóa từ điều khiển từ xa từ trung tâm chỉ huy.',
    targetAudience: ['Hệ thống Ngân hàng thương mại', 'Tập đoàn vàng bạc trang sức, đá quý', 'Bảo tàng, Nhà đấu giá cổ vật'],
    features: [
      'Xe vận chuyển bọc thép, chống cạy phá, có camera 360 độ',
      'Đội ngũ áp tải trang bị dùi cui điện, áo giáp chống đâm, súng bắn hơi cay',
      'Hệ thống nút báo động khẩn cấp kết nối trực tiếp Cảnh sát 113',
      'Cam kết áp tải an toàn tuyệt đối và bảo đảm nguyên vẹn hàng hóa',
    ],
    workflow: [
      '1. Niêm phong hàng hóa trước sự chứng kiến của 2 bên',
      '2. Chọn 3 lộ trình di chuyển bí mật ngẫu nhiên không lặp lại',
      '3. Di chuyển liên tục không dừng đỗ trái phép, theo dõi GPS thời gian thực',
      '4. Bàn giao an toàn tại điểm đích với biên bản đối chiếu chữ ký số',
    ],
    guarantee: 'Bảo hiểm hàng hóa 100% giá trị trong suốt quá trình vận chuyển từ cửa đến cửa.',
  },
  {
    id: 'srv-smart-patrol',
    title: 'Hệ Thống Giám Sát An Ninh Thông Minh & Công Nghệ Số',
    subtitle: 'Kết hợp tuần tra thực địa và công nghệ nhận diện khuôn mặt, cảnh báo tự động',
    category: 'An ninh 4.0',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    summary: 'Giải pháp chuyển đổi số an ninh giúp doanh nghiệp tiết kiệm 30% chi phí quân số mà nâng cao hiệu quả giám sát 300%.',
    description: 'Ứng dụng thẻ tuần tra điện tử định vị chống gian lận ca trực, camera thông minh phát hiện xâm nhập hàng rào ảo, cảnh báo khói lửa sớm và báo cáo tuần tra tự động qua ứng dụng di động cho khách hàng.',
    targetAudience: ['Tập đoàn có chuỗi chi nhánh lớn', 'Khu đô thị sinh thái thông minh', 'Trang trại, Nông trường quy mô rộng'],
    features: [
      'Điểm danh tuần tra theo tọa độ định vị và quét mã QR tại các vị trí chốt',
      'Phần mềm tuần tra số hóa cập nhật tình trạng mục tiêu theo thời gian thực',
      'Trung tâm điều hành an ninh tập trung giám sát màn hình camera 24/7',
      'Báo cáo tự động hàng ngày gửi về điện thoại của Chủ đầu tư',
    ],
    workflow: [
      '1. Thiết lập các điểm tuần tra trọng yếu trên bản đồ số',
      '2. Cài đặt lịch trình tuần tra ngẫu nhiên chống quy luật',
      '3. Giám sát ca trực qua bảng điều khiển trung tâm và ứng dụng di động',
      '4. Phân tích dữ liệu an ninh hàng tháng để tối ưu hóa vị trí chốt',
    ],
    guarantee: 'Minh bạch 100% dữ liệu tuần tra, hoàn tiền nếu nhân viên bỏ điểm tuần tra.',
  },
];

export const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    id: 'cat-kcn',
    name: 'Khu Công Nghiệp & Nhà Máy',
    solutions: [
      {
        id: 'kcn-1',
        title: 'Quy Trình Kiểm Soát Cổng Chính Xuất Nhập Vật Tư',
        description: 'Tách biệt luồng công nhân, xe chuyên chở và khách thăm. Kiểm tra mã QR xe hàng, cân tải trọng và soi chiếu vật phẩm chống gian lận vật tư.',
        keySpecs: ['100% Soi quét hành lý ca tan tầm', 'Giảm 95% thời gian ùn tắc cổng', 'Hệ thống Barie tự động'],
        tag: 'Cổng chính',
      },
      {
        id: 'kcn-2',
        title: 'Tuần Tra Vành Đai Hàng Rào & Điểm Mù Cơ Sở',
        description: 'Bảo vệ đường bao 5km-20km bằng xe máy điện chuyên dụng, tuần tra ngẫu nhiên 30 phút/lượt kết hợp cảm biến hồng ngoại leo trèo.',
        keySpecs: ['Tuần tra định vị GPS', 'Chiếu sáng công suất cao', 'Đội phản ứng nhanh 3 phút'],
        tag: 'Hàng rào',
      },
      {
        id: 'kcn-3',
        title: 'Đội PCCC Cơ Sở & Xử Lý Sự Cố Hóa Chất 24/7',
        description: 'Lực lượng bảo vệ thường trực được huấn luyện chuyên sâu PCCC công nghiệp, kiểm tra định kỳ van vòi, bình chữa cháy và lối thoát hiểm.',
        keySpecs: ['Sẵn sàng trực chiến 24/24', 'Diễn tập PCCC định kỳ', 'Thành thạo đồ bảo hộ độc hại'],
        tag: 'PCCC cơ sở',
      },
      {
        id: 'kcn-4',
        title: 'Kiểm Soát Nhà Kho & Chống Thất Thoát Nội Bộ',
        description: 'Giám sát khu vực đóng gói, niêm phong container bằng kẹp chì điện tử, phối hợp kiểm toán kho đột xuất ngăn chặn móc nối trộm cắp.',
        keySpecs: ['Giảm 99.9% rủi ro thất thoát hàng', 'Niêm phong chì số', 'Camera góc siêu rộng'],
        tag: 'Chống thất thoát',
      },
    ],
  },
  {
    id: 'cat-building',
    name: 'Tòa Nhà Văn Phòng & Cao Ốc',
    solutions: [
      {
        id: 'bld-1',
        title: 'Lễ Tân An Ninh Sảnh & Hướng Dẫn Khách Chuẩn 5 Sao',
        description: 'Nhân viên bảo vệ ngoại hình sáng, tác phong lịch thiệp, thông thạo ngoại ngữ, tiếp đón và cấp phát thẻ từ thang máy phân tầng cho khách.',
        keySpecs: ['Chuẩn mực tác phong ngoại giao', 'Giao tiếp tiếng Anh cơ bản', 'Kiểm soát thẻ ra vào'],
        tag: 'Sảnh chính',
      },
      {
        id: 'bld-2',
        title: 'Điều Phối & Quản Lý Bãi Xe Thông Minh',
        description: 'Hướng dẫn sắp xếp ô tô, xe máy ngăn nắp, chống trầy xước va quẹt, xử lý sự cố cháy nổ xe điện và chống trộm cắp phụ tùng.',
        keySpecs: ['Phân luồng giờ cao điểm', 'Khu sạc xe điện an toàn', 'Kiểm soát biển số tự động'],
        tag: 'Tầng hầm',
      },
      {
        id: 'bld-3',
        title: 'Giám Sát Phòng Điều Khiển Trung Tâm & Hệ Thống Camera',
        description: 'Kíp trực 24/7 theo dõi hàng trăm mắt camera, kiểm soát hệ thống báo cháy, áp suất thang thoát hiểm và cảnh báo sự cố kỹ thuật.',
        keySpecs: ['Kíp trực 2 người/ca liên tục', 'Ghi nhật ký hệ thống', 'Kết nối khẩn cấp cứu hộ'],
        tag: 'Phòng điều khiển',
      },
      {
        id: 'bld-4',
        title: 'Tuần Tra Ban Đêm & Kiểm Tra Niêm Phong Văn Phòng',
        description: 'Kiểm tra từng tầng sau giờ làm việc, tắt đèn ngắt thiết bị điện quên tắt, kiểm tra niêm phong cửa các công ty thuê văn phòng.',
        keySpecs: ['Bảo mật tài liệu đối tác', 'Phòng chống chập cháy điện', 'Báo cáo chi tiết từng phòng'],
        tag: 'Tuần tra đêm',
      },
    ],
  },
  {
    id: 'cat-bank',
    name: 'Ngân Hàng & Tổ Chức Tài Chính',
    solutions: [
      {
        id: 'bnk-1',
        title: 'Bảo Vệ Phòng Giao Dịch & Quầy Thu Ngân 24/7',
        description: 'Nhân viên trang bị công cụ hỗ trợ, quan sát nhận diện các đối tượng khả nghi đeo khẩu trang/kính đen, hỗ trợ khách hàng an tâm giao dịch.',
        keySpecs: ['Cảnh giác cao độ 100%', 'Bảo vệ khách gửi/rút tiền lớn', 'Kích hoạt nút báo động ngầm'],
        tag: 'Quầy giao dịch',
      },
      {
        id: 'bnk-2',
        title: 'Áp Tải Tiếp Quỹ & Vận Chuyển Tiền Mặt Liên Ngân Hàng',
        description: 'Phương án áp tải bằng xe bọc thép chuyên dụng, lộ trình bí mật, có vệ sĩ bảo vệ vòng ngoài và sẵn sàng ứng phó cướp giật trên đường.',
        keySpecs: ['Xe đặc chủng bọc thép', 'Thời gian vận chuyển chính xác', 'Vũ trang công cụ theo luật'],
        tag: 'Tiếp quỹ ATM',
      },
      {
        id: 'bnk-3',
        title: 'Bảo Vệ Trụ ATM Ngoài Trời & Cảnh Báo Thiết Bị Lạ',
        description: 'Tuần tra kiểm tra khe cắm thẻ cây ATM chống gắn thiết bị lạ đánh cắp dữ liệu thẻ, đảm bảo an toàn cho khách hàng rút tiền ban đêm.',
        keySpecs: ['Phát hiện thiết bị lạ trong 1 giờ', 'Hỗ trợ khách hàng kẹt thẻ', 'Đèn chiếu sáng an ninh'],
        tag: 'An ninh ATM',
      },
      {
        id: 'bnk-4',
        title: 'Phương Án Xử Lý Tình Huống Khẩn Cấp Bắt Cóc & Cướp Ngân Hàng',
        description: 'Quy trình đối phó đặc biệt được tập huấn bởi Cục Cảnh sát Hình sự, ưu tiên hàng đầu bảo toàn tính mạng nhân viên & khách hàng.',
        keySpecs: ['Diễn tập giả định hàng quý', 'Khóa cửa tự động từ xa', 'Tín hiệu ngầm đến Cảnh sát 113'],
        tag: 'Khẩn cấp',
      },
    ],
  },
  {
    id: 'cat-event',
    name: 'Sự Kiện & Khách Mời Cấp Cao',
    solutions: [
      {
        id: 'evt-1',
        title: 'Phương Án Kiểm Soát Cửa Soi Chiếu & Quản Trị Đám Đông',
        description: 'Hệ thống barie chia luồng zíc-zắc, cửa từ dò kim loại, phân loại vé ưu tiên và vé phổ thông, kiểm soát đồ uống có cồn, chất cấm mang vào sân vận động.',
        keySpecs: ['Xử lý 500 khách/cửa/giờ', 'Máy quét kim loại cầm tay', 'Hàng rào chịu lực cao'],
        tag: 'Cửa soát vé',
      },
      {
        id: 'evt-2',
        title: 'Vệ Sĩ Cận Vệ Bảo Vệ Sân Khấu & Khu Vực Hậu Trường Nghệ Sĩ',
        description: 'Thiết lập vành đai bảo vệ bán kính 5m quanh nghệ sĩ, chống khán giả quá khích lao lên sân khấu, đảm bảo lối đi an toàn vào phòng chờ.',
        keySpecs: ['Bảo vệ cự ly gần 1:1', 'Chắn đạn & ô bảo hộ', 'Lối thoát hiểm riêng biệt'],
        tag: 'Sân khấu',
      },
      {
        id: 'evt-3',
        title: 'Đội Cơ Động Phản Ứng Nhanh & Phòng Chống Xô Đẩy Giẫm Đạp',
        description: 'Lực lượng cơ động trang bị bộ đàm công suất lớn, áo giáp, sẵn sàng can thiệp giải tỏa đám đông nghẽn thở và đưa người ngất xỉu ra lều y tế.',
        keySpecs: ['Phản ứng tức thì dưới 60s', 'Lều sơ cấp cứu tại chỗ', 'Loa phát thanh chỉ dẫn'],
        tag: 'Cứu nạn sự kiện',
      },
      {
        id: 'evt-4',
        title: 'Đoàn Xe Hộ Tống Doanh Nhân & Lãnh Đạo Cấp Cao',
        description: 'Đội xe chuyên dụng bọc hậu và dẫn đường, lái xe chuyên nghiệp xử lý tình huống truy đuổi hoặc tạt đầu trên cao tốc.',
        keySpecs: ['Kỹ năng lái xe phòng thủ', 'Lộ trình thoát hiểm cấp 1', 'Bảo mật thông tin khách sạn'],
        tag: 'Hộ tống xe hơi',
      },
    ],
  },
  {
    id: 'cat-retail',
    name: 'Chuỗi Bán Lẻ & Phòng Trưng Bày',
    solutions: [
      {
        id: 'ret-1',
        title: 'Bảo Vệ Đón Khách & Trông Giữ Xe Cửa Hàng Xe Sang, Vàng Bạc',
        description: 'Chào đón mở cửa xe cho khách hàng, dắt xe, giữ tài sản tư trang và tạo ấn tượng chu đáo, sang trọng ngay từ điểm chạm đầu tiên.',
        keySpecs: ['Dắt xe và che ô khi trời mưa', 'Thẻ xe điện tử', 'Tác phong thân thiện chuẩn mực'],
        tag: 'Phòng trưng bày',
      },
      {
        id: 'ret-2',
        title: 'Chống Thất Thoát & Giám Sát Quầy Hàng Giá Trị Cao',
        description: 'Nhân viên an ninh mặc thường phục hòa vào dòng người mua sắm, quan sát hành vi bóc tem tráo mã vạch hoặc giấu đồ vào túi áo.',
        keySpecs: ['Bảo vệ thường phục bí mật', 'Quan sát ngôn ngữ cơ thể', 'Không làm phiền khách mua'],
        tag: 'Chống trộm siêu thị',
      },
      {
        id: 'ret-3',
        title: 'Kiểm Soát Nhập Xuất Kho Hàng Bán Lẻ Hàng Ngày',
        description: 'Đối chiếu số lượng thùng hàng, mã vận đơn với hóa đơn giao nhận, kiểm tra niêm phong thùng hàng trước khi đưa lên quầy kệ.',
        keySpecs: ['Khớp số liệu 100%', 'Ký nhận biên bản 3 bên', 'Giám sát qua camera góc cận'],
        tag: 'Kho bán lẻ',
      },
      {
        id: 'ret-4',
        title: 'Đóng Cửa & Niêm Phong Két Sắt Doanh Thu Cuối Ngày',
        description: 'Đồng hành cùng Quản lý cửa hàng kiểm đếm doanh thu cuối ngày, hộ tống bàn giao két an toàn hoặc đưa đến cây nạp tiền tự động ngân hàng.',
        keySpecs: ['Áp tải doanh thu an toàn', 'Niêm phong cửa kính 2 lớp', 'Bật hệ thống báo động hồng ngoại'],
        tag: 'Khóa sổ cuối ngày',
      },
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'Thăm hỏi và trao quà tới các cựu chiến binh nhân ngày Thương Binh Liệt Sĩ',
    client: 'Tập đoàn Điện tử Công nghệ Cao (Hàn Quốc)',
    sector: 'Đời sống cộng đồng',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    challenge: 'Nhà máy diện tích 650.000m² với 8.000 công nhân thường xuyên bị thất thoát linh kiện vi mạch điện tử giá trị cao tại khâu thay đồ và cổng xuất hàng phế liệu.',
    solution: 'Lâm Sơn Động thiết lập hệ thống cổng soi quét từ tính đa tầng, bố trí bảo vệ mật phục tại các điểm mù và cài đặt Smart Patrol GPS kiểm soát 48 điểm tuần tra.',
    result: 'Bắt quả tang 3 vụ tuồn linh kiện ra ngoài, thu hồi 100% tài sản trị giá hơn 4.2 tỷ đồng, duy trì tỷ lệ thất thoát 0% liên tục 24 tháng qua.',
    readTime: '4 phút đọc',
  },
  {
    id: 'cs-2',
    title: 'Bảo vệ an toàn tuyệt đối Diễn đàn Thượng đỉnh Doanh nhân Quốc tế 2026',
    client: 'Hiệp hội Thương mại Quốc tế Châu Á - TBD',
    sector: 'Sự kiện & Hội nghị Thượng đỉnh',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    challenge: 'Sự kiện đón tiếp 1.500 đại biểu cấp cao và 50 tỷ phú quốc tế trong 3 ngày liên tiếp tại Trung tâm Hội nghị Quốc gia với yêu cầu an ninh cấp độ 1.',
    solution: 'Huy động 250 vệ sĩ tinh nhuệ, thiết lập 4 vành đai kiểm soát, 12 cổng dò kim loại, kết hợp 10 xe hộ tống bọc thép và hệ thống phá sóng flycam trái phép.',
    result: 'Sự kiện diễn ra thành công mỹ mãn, không phát sinh bất kỳ sự cố an ninh nào, nhận thư khen ngợi đặc biệt từ Trưởng ban tổ chức quốc tế.',
    readTime: '5 phút đọc',
  },
  {
    id: 'cs-3',
    title: 'Xử lý kịp thời sự cố chập điện, cứu hộ an toàn Tòa tháp Tài chính 42 Tầng',
    client: 'Tòa nhà Phức hợp Trung tâm Tài chính TP.HCM',
    sector: 'Tòa nhà & Bất động sản',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    challenge: 'Vào lúc 22h30, hệ thống cảnh báo cháy tầng hầm B2 phát tín hiệu khói lớn do chập tủ điện trạm biến áp, đe dọa 500 người đang làm việc ca đêm.',
    solution: 'Đội phản ứng nhanh Lâm Sơn Động có mặt tại nguồn cháy trong 90 giây, dùng bình CO2 chuyên dụng dập tắt đám cháy cục bộ và hướng dẫn sơ tán an toàn theo lối thang bộ.',
    result: 'Dập tắt đám cháy hoàn toàn trước khi xe cứu hỏa đến 8 phút, không có thương vong, bảo vệ nguyên vẹn hệ thống máy chủ tài chính hàng triệu USD.',
    readTime: '3 phút đọc',
  },
  {
    id: 'cs-4',
    title: 'Tối ưu 32% chi phí vận hành nhờ giải pháp An ninh Kết hợp Công nghệ Smart Patrol',
    client: 'Chuỗi 60 Siêu thị & Đại siêu thị Toàn quốc',
    sector: 'Chuỗi Bán Lẻ & Logistics',
    imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    summary: 'Giảm bớt các chốt gác tĩnh đơn điệu, thay thế bằng camera AI nhận diện khuôn mặt và đội cơ động tuần tra linh hoạt qua ứng dụng di động.',
    challenge: 'Chi phí bảo vệ truyền thống quá cao nhưng hiệu quả kiểm soát trộm cắp vặt và ngủ gật ban đêm tại các cửa hàng nhỏ lẻ vẫn chưa được giải quyết dứt điểm.',
    solution: 'Triển khai mô hình "Smart Security": Lắp đặt cảm biến đột nhập kết nối trung tâm giám sát SOC 24/7 và đội cơ động tuần tra luân phiên.',
    result: 'Giảm 32% tổng chi phí an ninh hàng năm cho chuỗi siêu thị, đồng thời nâng cao tốc độ phản ứng khi có sự cố từ 25 phút xuống còn 8 phút.',
    readTime: '4 phút đọc',
  },
];

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    id: 'art-1',
    category: 'Nghiên cứu & Báo cáo',
    title: 'Báo Cáo Toàn Cảnh Rủi Ro An Ninh Doanh Nghiệp & Chuỗi Cung Ứng 2026',
    date: '15/08/2026',
    summary: 'Phân tích các lỗ hổng an ninh phổ biến tại các nhà máy FDI, nguy cơ thất thoát sở hữu trí tuệ và bài học kinh nghiệm thiết lập chốt chặn an ninh.',
    readTime: '8 phút',
    author: 'Hội đồng Cố vấn An ninh Lâm Sơn Động',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    content: `Trong bối cảnh làn sóng đầu tư FDI và chuỗi cung ứng toàn cầu dịch chuyển mạnh mẽ về Việt Nam năm 2026, vấn đề an ninh tài sản và bí mật công nghệ tại các khu công nghiệp trọng điểm đang đối diện với những thách thức chưa từng có. Không còn đơn thuần là nạn trộm cắp vặt, các doanh nghiệp sản xuất và logistics quy mô lớn hiện phải đối mặt với các đường dây gian lận có tổ chức, móc nối từ bên trong lẫn bên ngoài, gây thiệt hại hàng chục tỷ đồng mỗi năm.\n\nBáo cáo này được tổng hợp từ dữ liệu giám sát và xử lý thực tế tại hơn 100 nhà máy, cảng cạn và kho tổng trên toàn quốc do Lâm Sơn Động trực tiếp vận hành.`,
    sections: [
      {
        heading: '1. Ba Lỗ Hổng Trọng Yếu Khiến Doanh Nghiệp Thất Thoát Tài Sản',
        body: 'Thứ nhất là lỗ hổng tại cổng kiểm soát xuất nhập hàng hóa ca đêm. Khi mật độ phương tiện container và xe tải tăng cao, việc kiểm tra thủ công bằng mắt thường dễ dẫn đến sơ hở, tạo điều kiện cho hiện tượng kẹp hàng lậu hoặc khai khống khối lượng xuất kho.\n\nThứ hai là các "điểm mù" vành đai tường rào. Nhiều nhà máy sở hữu chu vi hàng rào từ 3km đến 8km nhưng hệ thống chiếu sáng và camera quan sát chưa khép kín, thiếu lực lượng tuần tra cơ động ngẫu nhiên khiến kẻ gian dễ dàng cắt rào thép gai đột nhập.\n\nThứ ba là nguy cơ tiếp tay nội bộ. Theo thống kê nghiệp vụ, hơn 68% các vụ trộm cắp linh kiện điện tử và hàng hóa giá trị cao đều có sự thông đồng giữa nhân sự nội bộ nhà máy (công nhân kho, lái xe nội bộ) với các đối tượng tiêu thụ bên ngoài.'
      },
      {
        heading: '2. Mô Hình Phòng Thủ 4 Tầng Chuẩn Hóa Theo ISO 9001:2015',
        body: 'Để giải quyết triệt để vấn đề này, Lâm Sơn Động đã ứng dụng mô hình bảo vệ 4 tầng liên hoàn:\n- Tầng 1 (Vành đai ngoại vi): Triển khai hệ thống Smart Patrol định vị GPS kết hợp tuần tra cơ động bằng xe máy điện chuyên dụng, cam kết kiểm soát toàn tuyến 30 phút/lượt.\n- Tầng 2 (Cổng chính & Xuất nhập): Phân luồng triệt để xe hàng - xe nhân viên - khách vãng lai. Kiểm tra mã QR lệnh xuất kho, niêm chì điện tử và soi chiếu hành lý công nhân lúc tan tầm.\n- Tầng 3 (Giám sát trung tâm SOC 24/7): Tích hợp camera AI phân tích hành vi bất thường, phát hiện vượt rào ảo và cảnh báo nhiệt khẩn cấp.\n- Tầng 4 (Thanh tra đột xuất): Đội cơ động đặc nhiệm kiểm tra tác phong, kiểm toán kho ngẫu nhiên vào các khung giờ nhạy cảm từ 00h00 đến 04h00 sáng.'
      },
      {
        heading: '3. Cam Kết Trách Nhiệm Pháp Lý & Lời Khuyên Cho Nhà Quản Trị',
        body: 'Một hợp đồng dịch vụ an ninh chuyên nghiệp bắt buộc phải có điều khoản cam kết bồi thường 100% giá trị tài sản khi xảy ra rủi ro do lỗi bảo vệ. Doanh nghiệp cần chủ động rà soát lại hợp đồng hiện tại, yêu cầu công ty an ninh xuất trình giấy chứng nhận đủ điều kiện ANTT do Bộ Công An cấp và báo cáo bảo hiểm trách nhiệm công cộng hàng năm để đảm bảo quyền lợi pháp lý tối đa.'
      }
    ]
  },
  {
    id: 'art-2',
    category: 'Cẩm nang PCCC',
    title: 'Cẩm Nang Xử Lý Sự Cố PCCC & Kỹ Năng Thoát Hiểm Nhà Cao Tầng Cho Nhân Viên',
    date: '02/08/2026',
    summary: 'Hướng dẫn chuẩn hóa quy trình 4 bước tại chỗ khi phát hiện đám cháy: Báo động - Cắt điện - Dập lửa - Sơ tán thoát nạn.',
    readTime: '6 phút',
    author: 'Ban Cố Vấn An Ninh & PCCC',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    content: `Cháy nổ tại các tòa nhà cao ốc văn phòng, trung tâm thương mại và chung cư phức hợp là mối hiểm họa khôn lường có thể bùng phát bất cứ lúc nào từ chập điện, bình gas hay pin xe điện tầng hầm. Trong đám cháy nhà cao tầng, khói độc và khí CO chính là nguyên nhân gây tử vong hàng đầu (chiếm hơn 80% trường hợp), chứ không phải ngọn lửa trực tiếp.\n\nCẩm nang này cung cấp những kỹ năng sinh tồn thực chiến và hướng dẫn hành động chuẩn mực trong "3 phút vàng" đầu tiên khi chuông báo cháy reo.`,
    sections: [
      {
        heading: '1. Quy Trình 4 Bước Phản Ứng Nhanh Tại Chỗ',
        body: 'Bước 1: Báo động khẩn cấp - Lập tức nhấn nút báo cháy vách tường gần nhất hoặc hô hoán thông báo cho mọi người xung quanh, đồng thời gọi ngay đường dây nóng 114 và Ban Quản Lý mục tiêu.\n\nBước 2: Cắt điện cục bộ - Ngắt aptomat khu vực xảy ra chập cháy để ngăn ngừa hiện tượng phóng điện lan truyền và tránh nguy cơ điện giật cho lực lượng ứng cứu.\n\nBước 3: Sử dụng bình chữa cháy tại chỗ - Nếu đám cháy mới phát sinh ở diện tích nhỏ, sử dụng bình bột chữa cháy ABC hoặc bình khí CO2 hướng loa phun vào gốc lửa từ khoảng cách an toàn 1.5m - 2m.\n\nBước 4: Tổ chức sơ tán có trật tự - Nhanh chóng di chuyển theo chỉ dẫn của nhân viên an ninh tòa nhà, ưu tiên hỗ trợ người già, phụ nữ có thai và trẻ em.'
      },
      {
        heading: '2. Năm Sai Lầm Chết Người Cần Tuyệt Đối Tránh Khi Thoát Nạn',
        body: '1. Tuyệt đối KHÔNG sử dụng thang máy: Khi xảy ra hỏa hoạn, nguồn điện tòa nhà có thể bị ngắt bất cứ lúc nào, khiến thang máy kẹt lưng chừng và trở thành ống dẫn khói độc ngạt thở.\n\n2. KHÔNG chen lấn, xô đẩy tại cầu thang thoát hiểm: Hãy giữ bình tĩnh, bám tay vịn cầu thang bộ và di chuyển theo hàng lối để tránh thảm họa giẫm đạp.\n\n3. KHÔNG chạy ngược lên tầng mái nếu không chắc chắn cửa sân thượng mở: Luôn ưu tiên chạy xuống dưới mặt đất theo thang bộ thoát hiểm có điều áp chống khói.\n\n4. KHÔNG quay lại lấy tài sản có giá trị: Sinh mạng là trên hết, chỉ một vài giây chần chừ có thể tước đi lối thoát duy nhất của bạn.\n\n5. KHÔNG hít thở trực tiếp khí khói: Phải cúi thấp người (khói độc luôn bốc lên cao), dùng khăn ướt, khẩu trang hoặc vạt áo che kín mũi miệng để lọc khí độc.'
      },
      {
        heading: '3. Trách Nhiệm Thường Trực Của Đội Bảo Vệ Chuyên Nghiệp',
        body: 'Tại mọi mục tiêu do Lâm Sơn Động quản lý, 100% chiến sĩ bảo vệ đều đạt chứng chỉ PCCC & Cứu nạn cứu hộ chính quy do Công an PCCC sát hạch. Đội ngũ an ninh kiểm tra áp lực van vòi nước, bình bọt và hệ thống đèn Exit chiếu sáng khẩn cấp định kỳ thứ Hai hàng tuần, đồng thời chủ trì diễn tập thoát nạn thực tế mỗi quý một lần.'
      }
    ]
  },
  {
    id: 'art-3',
    category: 'Cảnh báo An ninh',
    title: 'Quy Định Pháp Luật Mới Về Quyền Hạn & Công Cụ Hỗ Trợ Của Nhân Viên Bảo Vệ',
    date: '28/07/2026',
    summary: 'Cập nhật Nghị định mới nhất về kinh doanh dịch vụ bảo vệ: Phạm vi được phép sử dụng công cụ hỗ trợ, bắt giữ người phạm tội quả tang.',
    readTime: '7 phút',
    author: 'Ban Pháp chế & Thanh tra Nghiệp vụ',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    content: `Trong công tác bảo vệ mục tiêu hiện đại, việc nắm vững hành lang pháp lý là yếu tố sống còn bảo đảm nhân viên an ninh vừa hoàn thành xuất sắc nhiệm vụ bảo vệ tài sản, vừa tuyệt đối tuân thủ pháp luật, không vượt quá giới hạn phòng vệ chính đáng.\n\nCẩm nang pháp lý này phân tích rõ các quy định hiện hành theo Nghị định 96/2016/NĐ-CP và Luật Quản lý, sử dụng vũ khí, vật liệu nổ và công cụ hỗ trợ áp dụng cho lực lượng bảo vệ chuyên nghiệp.`,
    sections: [
      {
        heading: '1. Phạm Vi Quyền Hạn Hợp Pháp Của Nhân Viên Bảo Vệ',
        body: 'Nhân viên bảo vệ có quyền kiểm tra giấy tờ, vé ra vào, đối chiếu lệnh công tác và kiểm tra phương tiện, hàng hóa ra vào mục tiêu theo đúng nội quy do doanh nghiệp ban hành.\n\nĐặc biệt, trong trường hợp phát hiện người có hành vi phạm tội quả tang (như trộm cắp, phá hoại tài sản, hành hung cố ý gây thương tích), nhân viên bảo vệ có toàn quyền tước vũ khí, khống chế, bắt giữ đối tượng và lập biên bản quả tang ngay tại chỗ, sau đó bàn giao ngay cho cơ quan Công an gần nhất theo Điều 111 Bộ luật Tố tụng Hình sự.'
      },
      {
        heading: '2. Nguyên Tắc Quản Lý & Sử Dụng Công Cụ Hỗ Trợ',
        body: 'Doanh nghiệp kinh doanh dịch vụ bảo vệ chỉ được phép trang bị và sử dụng công cụ hỗ trợ (như dùi cui cao su, gậy điện, khóa số 8, bình xịt hơi cay) khi đã được Phòng Cảnh sát QLHC về TTXH cấp Giấy phép sử dụng hợp lệ.\n\nNhân viên bảo vệ chỉ được sử dụng công cụ hỗ trợ trong các tình huống thực sự cần thiết nhằm ngăn chặn hành vi bạo lực hung hãn, phòng vệ chính đáng khi bản thân hoặc mục tiêu bị tấn công đe dọa trực tiếp đến tính mạng. Tuyệt đối nghiêm cấm lạm dụng công cụ hỗ trợ để xâm phạm thân thể, danh dự của công dân.'
      },
      {
        heading: '3. Chuẩn Hóa Pháp Lý Tại Lâm Sơn Động',
        body: 'Tại Lâm Sơn Động, 100% vệ sĩ và cán bộ chỉ huy đều trải qua khóa đào tạo pháp luật chuyên sâu, nắm vững ranh giới giữa phòng vệ chính đáng và vượt quá giới hạn phòng vệ. Mỗi mục tiêu đều được trang bị sổ quản lý công cụ hỗ trợ có dấu niêm phong và quy trình phối hợp khẩn cấp với lực lượng Công an phường/xã trên địa bàn.'
      }
    ]
  },
];

export const NEWS_EVENTS: NewsItem[] = [
  {
    id: 'news-4',
    title: 'Hội Thao Võ Thuật & Kỹ Năng Đặc Nhiệm Lâm Sơn Động Toàn Quốc 2026',
    date: '18/09/2026',
    category: 'Hoạt động nội bộ',
    summary: 'Hơn 300 cán bộ, chỉ huy và vệ sĩ tiêu biểu toàn quốc tranh tài quyền thuật, đối kháng thực chiến, kỹ thuật khống chế vũ khí và bắn súng ứng dụng.',
    imageUrl: '/images/hero-2.jpg',
    isFeatured: true,
    author: 'Ban Huấn Luyện & Tác Chiến Đặc Nhiệm',
    readTime: '6 phút đọc',
    content: 'Nhằm không ngừng tôi luyện bản lĩnh người vệ sĩ và sát hạch chất lượng nghiệp vụ thực chiến trên toàn quốc, sáng ngày 18/09/2026, Lâm Sơn Động đã long trọng khai mạc "Hội Thao Võ Thuật & Kỹ Năng Đặc Nhiệm Toàn Quốc 2026". Hội thao quy tụ hơn 300 gương mặt xuất sắc đại diện cho lực lượng an ninh tại hơn 20 tỉnh thành, mang đến những màn tranh tài nảy lửa, khẳng định sức mạnh kỷ luật và tinh thần thượng võ kiên cường của toàn thể chiến sĩ.',
    sections: [
      {
        heading: '1. Khởi Tranh Quyền Thuật Cổ Truyền & Thực Chiến Đối Kháng',
        body: 'Phần thi quyền thuật và đối kháng thực chiến không vũ trang diễn ra sôi nổi ngay từ vòng mở màn. Kế thừa tinh hoa võ thuật cổ truyền Lâm Sơn Động kết hợp cùng các thế võ cận chiến hiện đại, các chiến sĩ đã thể hiện khả năng di chuyển linh hoạt, né đòn chuẩn xác và tung ra những đòn khóa triệt hạ đối phương nhanh chóng trong phạm vi hẹp. Đây là kỹ năng cốt lõi giúp nhân viên bảo vệ xử lý êm thấm các tình huống gây rối trật tự công cộng mà không gây nguy hiểm quá mức đến tính mạng.'
      },
      {
        heading: '2. Diễn Tập Phương Án Lá Chắn Bảo Vệ VIP & Hộ Tống Khẩn Cấp',
        body: 'Tình huống giả định đưa ra là đoàn xe hộ tống lãnh đạo cấp cao bị nhóm đối tượng quá khích chặn đầu và tấn công bất ngờ bằng hung khí nguy hiểm. Đội hình đặc nhiệm Lâm Sơn Động đã nhanh chóng triển khai đội hình "lá chắn sống" kim cương khép kín, vừa che chắn toàn diện cho yếu nhân, vừa chủ động dùng công cụ hỗ trợ vô hiệu hóa đối tượng cầm đầu và mở lối thoát hiểm đưa VIP lên xe bọc thép rời khỏi hiện trường an toàn chỉ trong 45 giây.'
      },
      {
        heading: '3. Kiểm Tra Kỹ Năng Sơ Cấp Cứu Y Tế & Khen Thưởng Thi Đua',
        body: 'Bên cạnh sức mạnh cơ bắp và võ thuật, hội thao còn đánh giá khắt khe kỹ năng sơ cấp cứu chấn thương, hồi sức tim phổi CPR và kỹ thuật cầm máu nhanh trước khi lực lượng 115 tiếp cận. Kết thúc ngày thi đấu, Ban Giám Đốc đã biểu dương và trao thưởng cho các tập thể đạt thành tích vượt trội, tiếp thêm động lực để toàn thể nhân viên nỗ lực cống hiến vì sự bình yên của quý khách hàng.'
      }
    ]
  },
  {
    id: 'news-5',
    title: 'Tập Huấn Chuyên Sâu Công Nghệ Giám Sát AI & Tuần Tra GPS Smart Patrol',
    date: '10/09/2026',
    category: 'Công nghệ an ninh',
    summary: 'Chuyển giao và chuẩn hóa hệ thống quản lý ca trực số hóa, kết hợp camera AI cảnh báo hành vi đột nhập thời gian thực cho đội ngũ chỉ huy KCN.',
    imageUrl: '/images/hero-1.jpg',
    author: 'Trung Tâm R&D & Chuyển Đổi Số An Ninh',
    readTime: '5 phút đọc',
    content: 'Cuộc cách mạng công nghiệp 4.0 đang thay đổi căn bản cách thức vận hành an ninh trên thế giới. Nhận thức rõ xu thế đó, Lâm Sơn Động đã tổ chức chương trình tập huấn chuyển giao toàn diện công nghệ AI và hệ thống tuần tra định vị vệ tinh Smart Patrol cho toàn bộ đội ngũ Đội trưởng và Chỉ huy mục tiêu KCN.',
    sections: [
      {
        heading: '1. Xóa Bỏ Hoàn Toàn Điểm Mù Ca Trực Bằng GPS & Thẻ Chip RFID',
        body: 'Hệ thống Smart Patrol do Lâm Sơn Động triển khai tích hợp định vị vệ tinh GPS kết hợp quét mã chip RFID gắn cố định tại các góc khuất, trạm biến áp và hàng rào xa nhất của nhà máy. Nhân viên tuần tra bắt buộc phải có mặt tại tọa độ thực tế để kích hoạt xác nhận ca trực. Nếu phát sinh độ trễ hoặc bỏ sót điểm, máy chủ trung tâm sẽ lập tức phát cảnh báo về máy tính của Đội trưởng mục tiêu và ứng dụng di động của khách hàng, đảm bảo tính minh bạch 100% không thể làm giả.'
      },
      {
        heading: '2. Tích Hợp Camera AI Cảnh Báo Sớm Tại Trung Tâm SOC 24/7',
        body: 'Khóa đào tạo hướng dẫn chuyên sâu cho nhân viên kỹ thuật vận hành hệ thống camera AI nhận diện biển số xe container, phát hiện người leo trèo hàng rào ảo và đo nhiệt độ cảnh báo cháy nổ tại các kho hóa chất. Hệ thống tự động khoanh vùng mục tiêu khả nghi và truyền hình ảnh thời gian thực đến bộ đàm của tổ tuần tra gần nhất trong vòng dưới 10 giây.'
      },
      {
        heading: '3. Tối Ưu Hóa Ngân Sách An Ninh Cho Doanh Nghiệp',
        body: 'Sự kết hợp giữa công nghệ cao và con người kỷ luật giúp các nhà máy tiết kiệm từ 20% đến 35% chi phí quân số bảo vệ mà vẫn nâng cao hiệu quả kiểm soát an ninh gấp nhiều lần, mang lại sự an tâm tuyệt đối cho các tập đoàn FDI.'
      }
    ]
  },
  {
    id: 'news-6',
    title: 'Khen Thưởng Đội Cơ Động Dũng Cảm Bắt Giữ Đối Tượng Đột Nhập Trộm Cắp Tại KCN',
    date: '28/08/2026',
    category: 'Chiến công nghiệp vụ',
    summary: 'Ban Giám Đốc Lâm Sơn Động trực tiếp trao thưởng nóng cho kíp trực ca đêm đã kịp thời phát hiện và khống chế nhóm đột nhập kho vật tư công nghệ cao.',
    imageUrl: '/images/service-factory.jpg',
    author: 'Ban Thanh Tra & An Ninh Mục Tiêu',
    readTime: '6 phút đọc',
    content: 'Rạng sáng ngày 25/08/2026, kíp trực tuần tra cơ động Lâm Sơn Động tại Nhà máy sản xuất linh kiện vi mạch KCN VSIP đã lập chiến công xuất sắc: mưu trí, dũng cảm phát hiện và tóm gọn nhóm đối tượng đột nhập có vũ khí, bảo toàn 100% kho hàng trị giá gần 3 tỷ đồng cho doanh nghiệp.',
    sections: [
      {
        heading: '1. Khoảnh Khắc Phát Hiện Vết Cắt Hàng Rào Trong Đêm Tối',
        body: 'Vào lúc 02h15 rạng sáng, trong khi thực hiện chuyến tuần tra định kỳ theo lộ trình Smart Patrol, chiến sĩ bảo vệ phát hiện hàng rào thép gai tại góc phía Tây nhà xưởng có dấu hiệu bị kìm cộng lực cắt đứt. Nhận định đối tượng đã lọt vào bên trong khuôn viên, kíp trực lập tức giữ bí mật, không hô hoán đánh động mà nhẹ nhàng kích hoạt mã báo động khẩn cấp qua bộ đàm về phòng chỉ huy trung tâm.'
      },
      {
        heading: '2. Chốt Chặn Vòng Vây & Khống Chế Đối Tượng Quả Tang',
        body: 'Chỉ sau 2 phút, 4 chiến sĩ thuộc Đội Phản Ứng Nhanh cơ động đã có mặt, khép chặt các lối thoát hiểm xung quanh kho vật tư. Phát hiện bị bao vây, 2 đối tượng hung hãn rút dao găm chống trả quyết liệt hòng tẩu thoát. Bằng các thế võ khống chế cổ tay và quật ngã điêu luyện của môn phái Lâm Sơn Động, các chiến sĩ đã nhanh chóng tước vũ khí, quật ngã và khóa chặt đối tượng xuống đất an toàn, thu giữ toàn bộ tang vật gồm 6 thùng linh kiện điện tử nguyên đai nguyên kiện.'
      },
      {
        heading: '3. Biểu Dương Khen Thưởng & Bài Học Về Tinh Thần Cảnh Giác',
        body: 'Sáng ngày 28/08, đại diện Ban Giám Đốc Công ty và Ban Quản Lý KCN đã đến tận mục tiêu trao giấy khen và thưởng nóng 30 triệu đồng cho kíp trực. Tinh thần trách nhiệm, quả cảm và phản ứng nhanh nhạy của các chiến sĩ là minh chứng hùng hồn cho cam kết bảo vệ an toàn tài sản tuyệt đối của Lâm Sơn Động.'
      }
    ]
  },
  {
    id: 'news-1',
    title: 'Tăng cường đào tạo văn hoá giao tiếp và kĩ năng nghiệp vụ cho nhân viên Quý 2 2026',
    date: '20/08/2026',
    category: 'Huấn luyện & Đào tạo',
    summary: 'Chương trình chuẩn hóa tác phong quân ngũ, văn hóa ứng xử văn minh và kỹ năng xử lý tình huống khẩn cấp cho hơn 800 cán bộ, nhân viên bảo vệ.',
    imageUrl: '/images/training.jpg',
    author: 'Ban Đào Tạo & Phát Triển Nguồn Nhân Lực',
    readTime: '5 phút đọc',
    content: 'Một dịch vụ an ninh đẳng cấp không chỉ dừng lại ở sự an toàn mà còn nằm ở sự tôn trọng và hình ảnh chuyên nghiệp đại diện cho chính khách hàng. Trong tháng 8/2026, Lâm Sơn Động đã tổ chức đợt đào tạo quy mô lớn về "Văn Hóa Giao Tiếp Chuẩn Mực & Kỹ Năng Nghiệp Vụ Chuẩn 5 Sao" cho hơn 800 cán bộ, nhân viên.',
    sections: [
      {
        heading: '1. Văn Hóa Chào Đón & Tác Phong Ngoại Giao Tại Sảnh',
        body: 'Nhân viên an ninh tại các cao ốc văn phòng, trung tâm thương mại và khách sạn cao cấp là người đầu tiên tiếp xúc với đối tác, cư dân và khách hàng. Chương trình đào tạo chuẩn hóa từng nụ cười, cử chỉ cúi chào 15 độ lịch thiệp, giọng nói nhã nhặn, cách hướng dẫn khách đỗ xe và hỗ trợ người khuyết tật, người già chu đáo, mang đến cảm giác an tâm và thiện cảm ngay từ ánh nhìn đầu tiên.'
      },
      {
        heading: '2. Nghệ Thuật Hóa Giải Xung Đột & Xử Lý Tình Huống Văn Minh',
        body: 'Khóa học cung cấp các bài tập tình huống thực tế về việc giải quyết khiếu nại, xử lý các trường hợp khách hàng nóng giận hoặc mất bình tĩnh tại quầy giao dịch. Nhân viên được huấn luyện phương pháp lắng nghe tích cực, hạ nhiệt căng thẳng bằng lời nói hòa nhã, kiên quyết nhưng mềm mỏng theo đúng chuẩn mực văn hóa ứng xử hiện đại.'
      },
      {
        heading: '3. Giữ Vững Kỷ Luật Thép Song Hành Cùng Sự Tận Tâm',
        body: 'Tại Lâm Sơn Động, tác phong quân sự nghiêm trang luôn song hành cùng thái độ phục vụ tận tâm. Khóa đào tạo kết thúc với kỳ sát hạch nghiêm ngặt, 100% học viên đạt tiêu chuẩn mới được phân công về lại các mục tiêu trọng điểm.'
      }
    ]
  },
  {
    id: 'news-7',
    title: 'Hợp Tác Chiến Lược Cung Cấp Dịch Vụ An Ninh Cho Chuỗi Trung Tâm Thương Mại',
    date: '15/08/2026',
    category: 'Hợp tác đối tác',
    summary: 'Ký kết hợp đồng bảo vệ 24/7 và triển khai phương án kiểm soát luồng khách tham quan, phương án PCCC hiện đại tại hệ thống đại siêu thị toàn quốc.',
    imageUrl: '/images/service-office.jpg',
    author: 'Ban Phát Triển Khách Hàng Doanh Nghiệp',
    readTime: '6 phút đọc',
    content: 'Lâm Sơn Động chính thức ký kết thỏa thuận hợp tác an ninh chiến lược dài hạn giai đoạn 2026 - 2028 với chuỗi trung tâm thương mại cao cấp với tổng diện tích mặt sàn quản lý trên 150.000m².',
    sections: [
      {
        heading: '1. Quy Mô Triển Khai & Bố Trí Nhân Sự Tinh Nhuệ',
        body: 'Theo thỏa thuận, Lâm Sơn Động bố trí hơn 180 nhân sự bảo vệ tác phong chuẩn mực, giao tiếp lịch thiệp tại các sảnh chính, cửa ra vào và hệ thống bãi đỗ xe thông minh. Lực lượng thường trực duy trì kiểm soát luồng người mua sắm, ngăn ngừa tình trạng trộm cắp móc túi và hướng dẫn khách hàng tận tình.'
      },
      {
        heading: '2. Phương Án Cơ Động Bí Mật & Kiểm Soát Gian Lận',
        body: 'Bên cạnh lực lượng mặc quân phục đứng chốt công khai, Lâm Sơn Động còn bố trí các trinh sát an ninh mặc thường phục tuần tra bí mật tại các gian hàng bán lẻ có hàng hóa giá trị cao, kịp thời phát hiện và ngăn chặn các hành vi gian lận mã vạch hay tuồn hàng ra ngoài.'
      },
      {
        heading: '3. Thường Trực Đội PCCC Cơ Sở & Cam Kết Bồi Thường 100%',
        body: 'Thành lập tổ PCCC cơ sở túc trực 24/24, phối hợp định kỳ diễn tập thoát hiểm giả định cho hàng nghìn lượt khách mua sắm. Bản hợp đồng đi kèm cam kết bồi thường 100% tài sản có bảo hiểm trách nhiệm pháp lý vững chắc.'
      }
    ]
  },
  {
    id: 'news-2',
    title: 'Lâm Sơn Động đồng hành cùng Chuyến xe thiện nguyện vì cộng đồng vùng cao',
    date: '12/08/2026',
    category: 'Cộng Đồng',
    summary: 'Cán bộ và nhân viên Lâm Sơn Động trao tặng 500 suất quà, học bổng và trang thiết bị sưởi ấm cho các em học sinh có hoàn cảnh khó khăn.',
    imageUrl: '/images/charity.jpg',
    author: 'Ban Chấp Hành Công Đoàn Lâm Sơn Động',
    readTime: '4 phút đọc',
    content: 'Phát huy tinh thần "Tương thân tương ái" và trách nhiệm xã hội của doanh nghiệp, Ban Chấp Hành Công Đoàn Lâm Sơn Động đã tổ chức hành trình "Áo Ấm Vùng Cao" tại các điểm trường khó khăn.',
    sections: [
      {
        heading: '1. Chuyến Xe Yêu Thương Vượt Đèo Lên Điểm Trường Xa',
        body: 'Đoàn thiện nguyện đã vượt hàng trăm cây số đường đèo quanh co để mang hơn 500 áo khoác ấm, cặp sách, ủng đi mưa và dụng cụ học tập đến tận tay các em học sinh dân tộc thiểu số tại các bản vùng cao còn nhiều thiếu thốn.'
      },
      {
        heading: '2. Hỗ Trợ Xây Dựng Cơ Sở Vật Chất Thiết Yếu',
        body: 'Công đoàn công ty đã trích quỹ tài trợ sửa chữa 2 phòng học bán trú kiên cố và lắp đặt hệ thống máy lọc nước sạch tinh khiết, giúp các thầy cô và học sinh yên tâm sinh hoạt và học tập trong mùa đông giá rét.'
      },
      {
        heading: '3. Nét Đẹp Văn Hóa Doanh Nghiệp Gắn Liền Với Cộng Đồng',
        body: 'Đây là hoạt động thường niên được Lâm Sơn Động duy trì bền bỉ suốt hơn 15 năm qua, khẳng định triết lý phát triển bền vững song hành cùng trách nhiệm chia sẻ với xã hội.'
      }
    ]
  },
  {
    id: 'news-3',
    title: 'Ký Kết Hợp Đồng Bảo Vệ Chiến Lược và Tham Gia Diễn Tập PCCC Thường Niên',
    date: '05/08/2026',
    category: 'Hợp tác đối tác',
    summary: 'Lâm Sơn Động phối hợp cùng Cảnh sát PCCC TP. Hà Nội triển khai diễn tập quy mô lớn với kịch bản sơ tán 2.000 người tại tổ hợp nhà máy FDI.',
    imageUrl: '/images/hero-3.jpg',
    author: 'Ban Nghiệp Vụ & An Toàn Lao Động',
    readTime: '5 phút đọc',
    content: 'Sáng ngày 05/08, Lâm Sơn Động cùng Phòng Cảnh sát PCCC & CNCH đã tổ chức buổi diễn tập phương án chữa cháy và cứu nạn cứu hộ thường niên tại KCN Nội Bài với sự tham gia của hơn 2.000 cán bộ công nhân viên.',
    sections: [
      {
        heading: '1. Kịch Bản Diễn Tập Tình Huống Giả Định Phức Tạp',
        body: 'Tình huống giả định xảy ra sự cố chập điện tại xưởng sơn tầng 2, sinh ra đám cháy lớn kèm theo nhiều khói độc lan nhanh sang kho hóa chất kế cận. Nguy cơ cháy lan và gây ngạt khí cho hàng trăm công nhân đang làm việc đòi hỏi phản ứng cực kỳ chuẩn xác.'
      },
      {
        heading: '2. Lực Lượng Cơ Sở Lâm Sơn Động Phản Ứng Sau 15 Giây',
        body: 'Ngay khi chuông báo cháy reo, đội PCCC cơ sở Lâm Sơn Động đã có mặt tại hiện trường chỉ sau 15 giây. Lực lượng chia làm 3 mũi giáp công: mũi 1 hướng dẫn sơ tán an toàn 2.000 công nhân theo lối thoát hiểm; mũi 2 ngắt điện cục bộ và dùng 6 lăng chữa cháy vách tường khoanh vùng ngọn lửa; mũi 3 phối hợp cùng lực lượng chuyên nghiệp đón 4 xe cứu hỏa tiếp cận dập tắt hoàn toàn đám cháy sau 12 phút.'
      },
      {
        heading: '3. Nâng Cao Ý Thức Tự Vệ Cho Người Lao Động',
        body: 'Buổi diễn tập thành công rực rỡ, được Cảnh sát PCCC biểu dương đánh giá loại Xuất sắc, củng cố thêm niềm tin tuyệt đối của Ban Lãnh Đạo nhà máy FDI vào năng lực phòng cháy chữa cháy của Lâm Sơn Động.'
      }
    ]
  },
  {
    id: 'news-8',
    title: 'Bảo Vệ Thành Công Đại Nhạc Hội & Sự Kiện Văn Hóa Quốc Tế 25.000 Khán Giả',
    date: '02/08/2026',
    category: 'Bảo vệ sự kiện',
    summary: 'Huy động 250 vệ sĩ đặc nhiệm lập hàng rào an ninh đa lớp, kiểm soát vé điện tử và đảm bảo an toàn tuyệt đối cho các nghệ sĩ quốc tế.',
    imageUrl: '/images/service-vip.jpg',
    author: 'Ban Chỉ Huy An Ninh Sự Kiện',
    readTime: '5 phút đọc',
    content: 'Tối ngày 02/08, đêm đại nhạc hội giao lưu văn hóa quốc tế với sự tham gia của hơn 25.000 khán giả trẻ và nhiều nghệ sĩ nổi tiếng trong nước và quốc tế đã diễn ra thành công tốt đẹp tại Hà Nội.',
    sections: [
      {
        heading: '1. Phân Luồng Khán Giả Đa Tầng & Kiểm Soát Cổng Từ',
        body: 'Lực lượng an ninh thiết lập 12 cổng từ an ninh và hệ thống quét vé QR code tốc độ cao, ngăn chặn 100% chất cấm, pháo sáng và vật sắc nhọn vào bên trong khán đài, giữ luồng di chuyển thông suốt không xảy ra chen lấn.'
      },
      {
        heading: '2. Hành Lang Bảo Vệ Yếu Nhân & Hậu Trường Sân Khấu',
        body: 'Bố trí 40 vệ sĩ ưu tú hộ tống xe nghệ sĩ từ khách sạn đến sân khấu, lập vành đai bảo vệ nghiêm ngặt khu vực hậu trường VIP, bảo đảm sự riêng tư và an toàn tuyệt đối cho các ngôi sao biểu diễn.'
      },
      {
        heading: '3. Phản Ứng Nhanh & Kết Thúc Sự Kiện Bình An',
        body: 'Biệt đội cơ động phản ứng nhanh kịp thời hỗ trợ y tế cho 5 khán giả ngất xỉu vì say nắng và giải tán êm thấm 3 nhóm xô đẩy. Đảm bảo an ninh trật tự hoàn hảo suốt 6 tiếng liên tục đến khi khán giả ra về an toàn.'
      }
    ]
  },
];

export const CLIENT_PARTNERS: ClientPartner[] = [
  { name: 'SAMSUNG Electronics', type: 'Quốc tế', logoPlaceholder: 'SAMSUNG', industry: 'Công nghệ & Điện tử' },
  { name: 'LG Display Vietnam', type: 'Quốc tế', logoPlaceholder: 'LG ELECTRONICS', industry: 'Sản xuất công nghiệp' },
  { name: 'HONDA Motor Vietnam', type: 'Quốc tế', logoPlaceholder: 'HONDA', industry: 'Sản xuất ô tô xe máy' },
  { name: 'PANASONIC Life Solutions', type: 'Quốc tế', logoPlaceholder: 'PANASONIC', industry: 'Điện tử gia dụng' },
  { name: 'VINGROUP Corporation', type: 'Trong nước', logoPlaceholder: 'VINGROUP', industry: 'Bất động sản & Dịch vụ' },
  { name: 'TECHCOMBANK', type: 'Trong nước', logoPlaceholder: 'TECHCOMBANK', industry: 'Tài chính Ngân hàng' },
  { name: 'MASAN Group', type: 'Trong nước', logoPlaceholder: 'MASAN GROUP', industry: 'Hàng tiêu dùng nhanh' },
  { name: 'SHOPEE & SPX Express', type: 'Quốc tế', logoPlaceholder: 'SHOPEE LOGISTICS', industry: 'Thương mại điện tử' },
  { name: 'MASTERISE Homes', type: 'Trong nước', logoPlaceholder: 'MASTERISE', industry: 'Bất động sản cao cấp' },
  { name: 'AEON Mall Vietnam', type: 'Quốc tế', logoPlaceholder: 'AEON MALL', industry: 'Trung tâm thương mại' },
];

export const FOOTER_DATA = {
  companyInfo: {
    headquarters: 'Số 14, 422/14/10 Ngô Gia Tự, Long Biên, Hà Nội, Việt Nam',
    hotline: '0339.269.524',
    email: 'congtybaovelamsondong@gmail.com',
    license: 'Giấy phép C06/BCA số 118/GCN-ANBV cấp bởi Cục Cảnh sát QLHC về TTXH - Bộ Công An',
    taxId: '0108992348 - Sở Kế hoạch & Đầu tư TP. Hà Nội',
  },
  services: [
    'Bảo vệ Khu Công Nghiệp & Nhà Máy',
    'Bảo vệ Tòa Nhà Văn Phòng & Cao Ốc',
    'Dịch Vụ Vệ Sĩ VIP & Yếu Nhân',
    'Bảo Vệ Sự Kiện, Lễ Hội & Triển Lãm',
    'Áp Tải Tiền Mặt & Kim Loại Quý',
  ],
  solutions: [
    'Giải pháp An ninh KCN & Nhà máy FDI',
    'Giải pháp Kiểm soát Cao ốc & Tòa nhà',
    'An ninh Ngân hàng & Hệ thống Quầy quỹ',
    'Bảo vệ Đại nhạc hội & Sự kiện lớn',
    'Chống thất thoát Chuỗi bán lẻ & Siêu thị'
  ]
};

