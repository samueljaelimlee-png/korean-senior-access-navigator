import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Phone, MapPin } from 'lucide-react';

const BENEFITS = [
  {
    category: '🏥 의료 혜택',
    color: 'border-l-blue-500',
    items: [
      {
        name: 'Medicare (메디케어)',
        tag: '연방',
        tagColor: 'bg-blue-100 text-blue-700',
        summary: '65세 이상 또는 장애인을 위한 연방 건강보험',
        details: [
          'Part A: 입원, 요양원, 호스피스 (대부분 무료)',
          'Part B: 외래 진료, 예방 서비스 (월 보험료 약 $185)',
          'Part C: Medicare Advantage (민간 보험사 운영)',
          'Part D: 처방약 보험',
          '저소득층은 Extra Help로 Part D 보험료 지원 가능',
        ],
        contact: '1-800-MEDICARE (1-800-633-4227)',
        link: 'https://www.medicare.gov',
      },
      {
        name: 'Medicaid (메디케이드)',
        tag: '연방/주',
        tagColor: 'bg-purple-100 text-purple-700',
        summary: '저소득층을 위한 무료 또는 저비용 건강보험',
        details: [
          'NJ FamilyCare를 통해 신청',
          '소득 기준: 연방 빈곤선(FPL) 138% 이하',
          '의사 방문, 입원, 처방약, 치과, 시력 포함',
          'Long-Term Care (요양원) 비용 지원',
          'Dual Eligible: Medicare와 Medicaid 동시 가입 가능',
        ],
        contact: '1-800-701-0710 (NJ FamilyCare)',
        link: 'https://www.nj.gov/humanservices/dmahs/home/',
      },
      {
        name: 'PAAD (처방약 보조)',
        tag: 'NJ주',
        tagColor: 'bg-green-100 text-green-700',
        summary: '뉴저지 시니어 처방약 비용 지원 프로그램',
        details: [
          '65세 이상 NJ 거주자 대상',
          '소득 기준: 개인 $26,762 / 부부 $32,869 이하 (2025)',
          'Medicare Part D 본인부담금 대폭 절감',
          '매년 갱신 필요',
        ],
        contact: '1-800-792-9745',
        link: 'https://www.state.nj.us/health/pharm/paad/',
      },
    ],
  },
  {
    category: '🥗 식품 및 생활 지원',
    color: 'border-l-green-500',
    items: [
      {
        name: 'SNAP (식품 보조)',
        tag: '연방',
        tagColor: 'bg-blue-100 text-blue-700',
        summary: '식료품 구매를 위한 연방 지원 (구 Food Stamps)',
        details: [
          '65세 이상 시니어 특별 소득 기준 적용 (더 관대)',
          '월평균 $200 이상 식품 구매 지원 (가구 규모 따라 다름)',
          'NJ SNAP 신청: NJOneApp 온라인 또는 카운티 사무소',
          'EBT 카드로 대부분 슈퍼마켓에서 사용 가능',
          '자산 기준: 60세 이상 자산 제한 없음',
        ],
        contact: '1-800-687-9512 (NJ Hotline)',
        link: 'https://www.nj.gov/humanservices/dfd/programs/njsnap/',
      },
      {
        name: 'SSI (생활 보조비)',
        tag: '연방',
        tagColor: 'bg-blue-100 text-blue-700',
        summary: '65세 이상 또는 장애인 저소득층 월 현금 지원',
        details: [
          '2025년 기준 최대 월 $967 (개인) / $1,450 (부부)',
          'NJ 주 추가 지원 포함 시 더 많은 금액 수령 가능',
          '시민권자 또는 일정 자격 영주권자 신청 가능',
          '자산 기준: $2,000 이하 (개인) / $3,000 이하 (부부)',
        ],
        contact: '1-800-772-1213 (Social Security)',
        link: 'https://www.ssa.gov/ssi/',
      },
    ],
  },
  {
    category: '🏠 주거 및 에너지 지원',
    color: 'border-l-amber-500',
    items: [
      {
        name: 'LIHEAP (에너지 보조)',
        tag: '연방/NJ',
        tagColor: 'bg-orange-100 text-orange-700',
        summary: '겨울철 난방비 및 에너지 요금 지원',
        details: [
          '소득 기준: 연방 빈곤선 60% 이하',
          '가스, 전기, 석유 등 난방 연료 보조',
          'NJ USF (Universal Service Fund): 월 에너지 요금 할인',
          '신청 기간: 보통 11월~4월 (매년 확인 필요)',
        ],
        contact: '1-800-510-3102 (NJ LIHEAP)',
        link: 'https://www.nj.gov/dca/dhcr/offices/hea.shtml',
      },
      {
        name: 'Section 8 / HUD 주거 지원',
        tag: '연방',
        tagColor: 'bg-blue-100 text-blue-700',
        summary: '저소득 시니어를 위한 임대료 보조 바우처',
        details: [
          '소득의 30%만 임대료로 내고 나머지는 정부 지원',
          '대기자 명단이 길어 조기 신청 권장',
          '카운티 Housing Authority에 신청',
          '시니어 전용 공공주택 (62세 이상 우선)',
        ],
        contact: 'HUD: 1-800-569-4287',
        link: 'https://www.hud.gov',
      },
    ],
  },
  {
    category: '💰 재산세 감면 (NJ)',
    color: 'border-l-red-500',
    items: [
      {
        name: 'Senior Freeze (재산세 동결)',
        tag: 'NJ주',
        tagColor: 'bg-green-100 text-green-700',
        summary: '재산세가 올라도 기준년도 금액으로 동결 — PAS-1 신청',
        details: [
          '65세 이상 또는 장애 수당 수령자',
          '2022년 12월 31일 이전부터 같은 집 거주',
          '2025년 소득 기준: $172,475 이하',
          '2024년 소득 기준: $168,268 이하',
          'PAS-1 양식으로 신청 (이 앱에서 도움)',
        ],
        contact: '1-800-323-4400',
        link: 'https://propertytaxrelief.nj.gov',
      },
      {
        name: 'ANCHOR 혜택',
        tag: 'NJ주',
        tagColor: 'bg-green-100 text-green-700',
        summary: '주택 소유자 및 임차인 모두 신청 가능한 재산세 환급',
        details: [
          '주택 소유자: 최대 $1,750 환급',
          '임차인: 최대 $700 환급',
          '소득 기준: $250,000 이하',
          'PAS-1 통합 신청 가능',
        ],
        contact: '1-888-238-1233',
        link: 'https://propertytaxrelief.nj.gov',
      },
      {
        name: 'Stay NJ',
        tag: 'NJ주 신규',
        tagColor: 'bg-emerald-100 text-emerald-700',
        summary: '65세 이상 장기 거주자 재산세 50% 감면 (시행 예정)',
        details: [
          '65세 이상, NJ 10년 이상 거주',
          '소득 기준: $500,000 미만',
          '재산세의 50% 최대 $6,500 지원 예정',
          '예산 확정 후 2027년부터 지급 시작 예정',
        ],
        contact: '1-800-323-4400',
        link: 'https://propertytaxrelief.nj.gov',
      },
    ],
  },
  {
    category: '🚗 교통 및 기타 서비스',
    color: 'border-l-indigo-500',
    items: [
      {
        name: 'NJ Transit Senior Pass',
        tag: 'NJ주',
        tagColor: 'bg-indigo-100 text-indigo-700',
        summary: '65세 이상 버스·열차 50% 할인',
        details: [
          '62세 이상 Senior ID 카드 신청',
          '버스, NJ Transit 열차 50% 할인',
          'NY/NJ PATH 기차도 할인 적용',
          '카운티 senior ride 프로그램 별도 운영',
        ],
        contact: '1-800-772-2222 (NJ Transit)',
        link: 'https://www.njtransit.com',
      },
      {
        name: 'Meals on Wheels',
        tag: '지역',
        tagColor: 'bg-yellow-100 text-yellow-700',
        summary: '거동 불편 시니어를 위한 무료 또는 저렴한 식사 배달',
        details: [
          '주 5일 점심 및 저녁 배달',
          '한국 음식 제공 지역 일부 있음',
          '지역 Senior Center 또는 카운티 Aging 사무소 통해 신청',
          '소득 기준 없음 (기부 권장)',
        ],
        contact: '1-800-792-8820 (NJ Senior Helpline)',
        link: 'https://www.nj.gov/humanservices/doas/',
      },
    ],
  },
];

const BERGEN_RESOURCES = [
  {
    category: '🍎 음식 지원',
    color: 'border-l-orange-500',
    items: [
      {
        name: '버겐 카운티 주거·보건·인력 서비스 센터',
        nameEn: 'Bergen County Housing, Health & Human Services Center',
        services: ['음식', '주거', '건강 서비스', '공과금 지원', '케이스 관리'],
        address: 'One Bergen County Plaza, 2nd Floor, Hackensack, NJ 07601',
        phone: '201-336-7600',
        emergency: '',
        link: 'https://habcnj.org/bergen-county-housing-health-and-human-services-center/',
      },
      {
        name: '가톨릭 자선단체',
        nameEn: 'Catholic Charities',
        services: ['음식', '주거', '재향군인 지원', '의뢰 서비스'],
        address: '590 North 7th Street, Newark, NJ 07107',
        phone: '973-596-4100',
        emergency: '',
        link: 'http://www.ccannj.com/',
      },
      {
        name: '푸드 액션 센터',
        nameEn: 'Center for Food Action',
        services: ['음식', '주거', '공과금 지원', '케이스 관리', '의뢰 서비스'],
        address: '192 W. Demarest Avenue, Englewood, NJ 07631',
        phone: '(201) 569-1804',
        emergency: '',
        link: 'https://cfanj.org/',
      },
      {
        name: '헬핑 핸즈 푸드 팬트리',
        nameEn: 'Helping Hands Food Pantry',
        services: ['음식'],
        address: '1400 Palisade Avenue, Teaneck, NJ 07666',
        phone: '201-837-4818',
        emergency: '',
        link: 'https://teaneckpantry.com/contact-us/',
      },
      {
        name: '유대인 가족 서비스 (북부 뉴저지)',
        nameEn: 'Jewish Family Services of Northern New Jersey',
        services: ['음식', '정신건강', '취업 지원', '케이스 관리', '의뢰 서비스'],
        address: '1485 Teaneck Road, Teaneck, NJ 07666',
        phone: '201-837-9090',
        emergency: '',
        link: 'https://www.jfcsnnj.org/',
      },
      {
        name: '오피스 오브 컨선',
        nameEn: 'Office of Concern',
        services: ['음식'],
        address: '55 West Demarest Ave, Englewood, NJ 07631',
        phone: '201-568-1465',
        emergency: '',
        link: 'http://officeofconcern.com/',
      },
      {
        name: '버겐 카운티 식품 안보 사무소',
        nameEn: 'Bergen County Office of Food Security',
        services: ['음식 지원', '자원봉사', '최근접 음식 제공처 안내'],
        address: '1 Bergen County Plaza, 2nd Floor, Hackensack, NJ 07601',
        phone: '201-336-7474',
        emergency: '',
        link: 'https://www.co.bergen.nj.us/bergen-county-office-of-food-security',
      },
      {
        name: 'NJHELPS (혜택 자격 확인)',
        nameEn: 'NJ Helps',
        services: ['SNAP(푸드스탬프) 신청', '현금 지원', '건강보험(메디케이드) 자격 확인'],
        address: '온라인 신청 가능',
        phone: '',
        emergency: '',
        link: 'https://www.njhelps.org/',
      },
    ],
  },
  {
    category: '🏥 의료 및 정신건강',
    color: 'border-l-blue-500',
    items: [
      {
        name: '버겐 카운티 보건국',
        nameEn: 'Bergen County Division of Health Services',
        services: ['건강 서비스 전반'],
        address: 'One Bergen County Plaza, Hackensack, NJ 07601',
        phone: '201-336-6000',
        emergency: '',
        link: 'https://www.co.bergen.nj.us/departments-and-services/about-health-services',
      },
      {
        name: '버겐 카운티 정신건강 및 중독 서비스',
        nameEn: 'Bergen County Division of Mental Health Services',
        services: ['정신건강', '중독 치료', '법률 서비스', '케이스 관리', '24/7 위기 상담'],
        address: 'One Bergen County Plaza, 4th Floor, Hackensack, NJ 07601',
        phone: '201-634-2600',
        emergency: '24/7 위기 상담: 201-262-HELP (4357)',
        link: 'https://www.co.bergen.nj.us/mental-health-services/about-mental-health-services',
      },
      {
        name: '버겐 뉴 브리지 의료 센터',
        nameEn: 'Bergen New Bridge Medical Center',
        services: ['급성 의료', '정신건강', '약물 중독 치료', '재활 서비스', '퇴역군인 의료', '여성 건강'],
        address: '230 East Ridgewood Avenue, Paramus, NJ 07652',
        phone: '201-597-4130',
        emergency: '',
        link: 'https://www.newbridgehealth.org/',
      },
      {
        name: '케어플러스 NJ',
        nameEn: 'CarePlus NJ',
        services: ['정신건강', '약물 중독 치료', '케이스 관리', '취업 지원'],
        address: '610 Valley Health Plaza, Paramus, NJ 07652',
        phone: '201-265-8200',
        emergency: '24/7 위기 상담: 201-262-4357',
        link: 'https://careplusnj.org/',
      },
      {
        name: 'CBH케어 웰니스 드롭인 센터',
        nameEn: 'CBHCare Wellness Drop-in Center',
        services: ['정신건강 위기 지원', '성인/아동 서비스', '워크샵'],
        address: '569 Broadway, Westwood, NJ 07675',
        phone: '201-957-1800',
        emergency: '',
        link: 'https://www.cbhcare.com/',
      },
      {
        name: '뱅티지 헬스 시스템',
        nameEn: 'Vantage Health System',
        services: ['정신건강', '중독 서비스', '시니어 서비스', '주거 지원', '보호자 지원 그룹'],
        address: '93 W Palisade Ave, Englewood, NJ 07631',
        phone: '201-567-0059',
        emergency: '',
        link: 'https://www.vantagenj.org/',
      },
      {
        name: '웨스트 버겐 정신건강',
        nameEn: 'West Bergen Mental Healthcare',
        services: ['트라우마 치료', '우울증', '불안장애', 'LGBTQ+ 서비스', '성인 주간 치료'],
        address: '120 Chestnut St, Ridgewood, NJ 07450',
        phone: '201-444-3550',
        emergency: '',
        link: '',
      },
      {
        name: '해밀턴 행동 건강',
        nameEn: 'Hamilton Behavioral Health',
        services: ['정신과 원격 진료', '개인/집단 치료', '약물 관리', '아동·가족 서비스'],
        address: '300 Forest Ave, Paramus, NJ 07653',
        phone: '201-490-5158',
        emergency: '',
        link: 'https://hamiltonbehavioral.com/',
      },
      {
        name: '988 자살 및 위기 상담 전화',
        nameEn: '988 Suicide and Crisis Lifeline',
        services: ['24/7 무료 비밀 위기 상담'],
        address: '전국 서비스',
        phone: '',
        emergency: '988 (전화 또는 문자)',
        link: 'https://988lifeline.org/',
      },
      {
        name: '버겐 카운티 LGBTQ+ 연합',
        nameEn: 'Bergen County LGBTQ+ Alliance',
        services: ['상담', '시니어 모임 (60세+)', '청소년 서비스', '커뮤니티 프로그램'],
        address: '156 Forest Ave #1, Paramus, NJ 07652',
        phone: '201-375-3549',
        emergency: '',
        link: 'https://www.bergencountylgbtq.org/home',
      },
    ],
  },
  {
    category: '🏠 주거 지원',
    color: 'border-l-amber-500',
    items: [
      {
        name: '버겐 카운티 주거 당국',
        nameEn: 'Housing Authority of Bergen County',
        services: ['저렴한 주거', '주택 바우처(섹션 8)', 'HIV/AIDS 거주자 지원'],
        address: 'One Bergen County Plaza, 2nd Floor, Hackensack, NJ 07601',
        phone: '201-336-7600',
        emergency: '',
        link: 'https://habcnj.org/',
      },
      {
        name: '버겐 홈리스 방지 연합',
        nameEn: 'Alliance Against Homelessness of Bergen County',
        services: ['주거', '취업 지원', '의뢰 서비스'],
        address: 'One Bergen County Plaza, 2nd Floor, Hackensack, NJ 07601',
        phone: '201-336-7600',
        emergency: '',
        link: 'https://habcnj.org/bergen-county-housing-health-and-human-services-center/',
      },
      {
        name: '그레이터 버겐 커뮤니티 액션',
        nameEn: 'Greater Bergen Community Action',
        services: ['주거', '에너지 절약 지원', '재정 상담', '조기 교육'],
        address: '392 Main Street, Hackensack, NJ 07601',
        phone: '201-968-0200',
        emergency: '',
        link: 'https://www.greaterbergen.org/',
      },
      {
        name: '해비타트 포 휴머니티 (버겐 카운티)',
        nameEn: 'Habitat for Humanity of Bergen County',
        services: ['주거 지원', '공과금 지원'],
        address: '121 Carver Avenue, Westwood, NJ 07675',
        phone: '(201) 457-1020',
        emergency: '',
        link: 'https://www.habitatbergen.org/',
      },
      {
        name: '리빌딩 투게더 (북부 뉴저지)',
        nameEn: 'Rebuilding Together - North Jersey',
        services: ['주거 수리', '집 보수'],
        address: 'PO Box 1389, Ridgewood NJ 07451',
        phone: '201-447-8886',
        emergency: '',
        link: 'http://rtnorthjersey.org/',
      },
      {
        name: '유나이티드 웨이 (버겐 카운티)',
        nameEn: 'United Way of Bergen County',
        services: ['주거', '공과금 지원', '건강 서비스'],
        address: '6 Forest Avenue, Suite 220, Paramus, NJ 07652',
        phone: '(201) 291-4050',
        emergency: '',
        link: 'https://bergenunitedway.org/',
      },
      {
        name: '버겐 카운티 가족 약속',
        nameEn: 'Family Promise of Bergen County',
        services: ['주거', '음식', '교통', '케이스 관리', '취업 지원'],
        address: '100 Dayton Street, Ridgewood, NJ 07450',
        phone: '(201) 833-8009',
        emergency: '',
        link: 'https://www.bergenfamilypromise.org/',
      },
    ],
  },
  {
    category: '👴 시니어 전용 서비스',
    color: 'border-l-purple-500',
    items: [
      {
        name: '버겐 카운티 시니어 서비스국',
        nameEn: 'Bergen County Division of Senior Services',
        services: ['음식', '주거', '건강 서비스', '교통', '시니어 센터', '케이스 관리'],
        address: 'One Bergen County Plaza, 2nd Floor, Hackensack, NJ 07601',
        phone: '201-336-7474',
        emergency: '',
        link: 'https://www.co.bergen.nj.us/division-of-senior-services',
      },
      {
        name: '버겐 가족 센터 (성인 서비스)',
        nameEn: 'Bergen Family Center, Older Adult Services',
        services: ['음식', '주간 프로그램', '지원 서비스'],
        address: '44 Armory St., Englewood, NJ 07631',
        phone: '201-568-0817',
        emergency: '',
        link: '',
      },
      {
        name: '버겐 카운티 시니어 활동 안내',
        nameEn: 'Activities and Services for Seniors in Bergen County',
        services: ['시니어 활동 및 서비스 종합 안내'],
        address: 'The Shops at Riverside, 2nd Floor Unit 310, Hackensack, NJ 07601',
        phone: '(201) 342-0962',
        emergency: '',
        link: '',
      },
    ],
  },
  {
    category: '⚖️ 법률 및 재정 지원',
    color: 'border-l-red-500',
    items: [
      {
        name: '뉴저지 법률 서비스 (LSNJ)',
        nameEn: 'Legal Services of New Jersey',
        services: ['무료 법률 상담', '법률 지원'],
        address: '190 Moore Street, Hackensack, NJ 07601',
        phone: '201-487-2166',
        emergency: '무료 법률 상담: 1-888-576-5529',
        link: 'https://www.lsnj.org/',
      },
      {
        name: '북동부 NJ 법률 서비스',
        nameEn: 'Northeast New Jersey Legal Services',
        services: ['주거', '가족법', '공공혜택', '시니어 법률', '소비자 보호', '이민', '세금'],
        address: '190 Moore St., Suite 100, Hackensack, NJ 07601',
        phone: '201-487-2166',
        emergency: '',
        link: 'https://www.northeastnjlegalservices.org/our-services',
      },
      {
        name: '버겐 카운티 정신건강 법률 프로젝트',
        nameEn: 'Bergen County Mental Health Law Project',
        services: ['소셜 시큐리티 신청', '가족법', '채무 문제', '사전 지시서 작성', '공증 서비스'],
        address: 'One Bergen County Plaza, 4th Floor Rm. 424, Hackensack, NJ 07601',
        phone: '201-634-2762',
        emergency: '',
        link: 'https://www.co.bergen.nj.us/mental-health-law-project',
      },
      {
        name: 'NJ 범죄 피해자 보상 사무소',
        nameEn: 'NJ Victims of Crime Compensation Office',
        services: ['범죄 피해자 재정 지원', '의료비', '이사비', '상담비'],
        address: '',
        phone: '신청: 973-648-2107',
        emergency: '지원: 1-877-658-2221',
        link: 'https://www.njoag.gov/vcco/',
      },
      {
        name: '공정 주거 위원회 (북부 NJ)',
        nameEn: 'Fair Housing Council of Northern New Jersey',
        services: ['주거', '법률 서비스', '차별 금지'],
        address: '',
        phone: '',
        emergency: '',
        link: 'https://fairhousingnj.org/',
      },
    ],
  },
  {
    category: '🚨 가정폭력 지원',
    color: 'border-l-pink-500',
    items: [
      {
        name: '버겐 카운티 가정폭력 대안 서비스',
        nameEn: 'Bergen County Division of Alternatives to Domestic Violence',
        services: ['24/7 핫라인', '위기 개입', '법률 지원', '상담 프로그램', '안전 계획'],
        address: 'One Bergen County Plaza, 2nd Floor, Hackensack, NJ 07601',
        phone: '',
        emergency: '24/7 핫라인: 201-336-7575',
        link: 'https://www.co.bergen.nj.us/adv',
      },
      {
        name: '희망과 안전 센터',
        nameEn: 'Center for Hope and Safety',
        services: ['긴급 쉼터', '임시 주거', '법률 서비스', '취업 훈련', '아동 지원 프로그램'],
        address: '12 Overlook Avenue, Rochelle Park, NJ',
        phone: '(201) 498-9247',
        emergency: '24시간 핫라인: 201-944-9600',
        link: 'https://www.hopeandsafetynj.org/',
      },
      {
        name: 'YWCA healingSPACE (성폭력 지원)',
        nameEn: 'YWCA Northern New Jersey healingSPACE',
        services: ['성폭력 상담', '그룹 치료', '법률 지원', '트라우마 치료'],
        address: '214 State Street Suite 27, Hackensack, NJ',
        phone: '',
        emergency: '24/7 핫라인: 201-487-2227',
        link: 'https://ywcannj.org/healingspace/',
      },
    ],
  },
  {
    category: '👨‍👩‍👧 가족 및 아동 서비스',
    color: 'border-l-teal-500',
    items: [
      {
        name: '버겐 카운티 가족 지도국',
        nameEn: 'Bergen County Division of Family Guidance',
        services: ['청소년 위기 개입', '가족 치료', '약물 남용 치료'],
        address: 'One Bergen County Plaza, 2nd Floor, Hackensack, NJ 07601',
        phone: '201-336-7350',
        emergency: '',
        link: '',
      },
      {
        name: '버겐 카운티 사회 서비스 위원회',
        nameEn: 'Bergen County Board of Social Services',
        services: ['SNAP(푸드스탬프)', '메디케이드', '긴급 지원', '아동 지원', '교통 지원'],
        address: '218 Route 17 North, Rochelle Park, NJ 07662',
        phone: '201-368-4200',
        emergency: '',
        link: 'https://www.bcbss.com',
      },
      {
        name: 'WIC (여성·영아·아동 영양 프로그램)',
        nameEn: 'Special Supplemental Nutrition Program for Women, Infants, and Children',
        services: ['임신부·수유부 식품 지원', '5세 미만 아동 지원', '건강 돌봄 연계'],
        address: '',
        phone: '973-754-4575',
        emergency: '',
        link: 'https://www.stjosephshealth.org/clinical-focuses/pediatric-services/item/1503-wic',
      },
      {
        name: 'NJ PerformCare (아동 정신건강)',
        nameEn: 'NJ System of Care - PerformCare',
        services: ['아동 정신건강 서비스 연계', '행동 건강 지원'],
        address: '',
        phone: '',
        emergency: '24/7: 1-877-652-7624',
        link: 'https://www.performcarenj.org/families/behavioral/index.aspx',
      },
    ],
  },
];

function BenefitCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        className="w-full text-left p-4 flex items-start justify-between gap-3"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-foreground">{item.name}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor}`}>{item.tag}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{item.summary}</p>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0 border-t border-border">
          <ul className="text-sm text-foreground space-y-1.5 mt-3 mb-3">
            {item.details.map((d, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent mt-0.5 flex-shrink-0">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 text-xs">
            {item.contact && (
              <div className="flex items-center gap-1 text-primary font-semibold">
                <Phone className="w-3 h-3" /> {item.contact}
              </div>
            )}
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent hover:underline font-semibold">
                <ExternalLink className="w-3 h-3" /> 웹사이트 방문
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ResourceCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
      <button
        className="w-full text-left p-4 flex items-start justify-between gap-3"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex-1">
          <p className="font-semibold text-sm text-foreground leading-snug">{item.name}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5 italic">{item.nameEn}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {item.services.slice(0, 3).map((s, i) => (
              <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{s}</span>
            ))}
            {item.services.length > 3 && (
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">+{item.services.length - 3}개 더</span>
            )}
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0 border-t border-border space-y-3">
          <div className="mt-3">
            <p className="text-xs font-semibold text-foreground mb-1.5">제공 서비스</p>
            <div className="flex flex-wrap gap-1">
              {item.services.map((s, i) => (
                <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{s}</span>
              ))}
            </div>
          </div>
          <div className="space-y-2 text-xs">
            {item.address && (
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{item.address}</span>
              </div>
            )}
            {item.phone && (
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <span>{item.phone}</span>
              </div>
            )}
            {item.emergency && (
              <div className="flex items-center gap-2 text-red-600 font-bold">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <span>{item.emergency}</span>
              </div>
            )}
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent hover:underline font-semibold">
                <ExternalLink className="w-3 h-3" /> 웹사이트 방문
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BenefitsPage() {
  const [activeTab, setActiveTab] = useState('government');

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-3xl mb-2">🎁</div>
          <h1 className="text-xl font-bold mb-1">정부 및 지역 혜택 안내</h1>
          <p className="text-white/70 text-sm">연방·뉴저지 혜택 및 버겐 카운티 지역 자원 모음</p>
        </div>
      </div>

      {/* 탭 */}
      <div className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="max-w-2xl mx-auto flex">
          <button
            onClick={() => setActiveTab('government')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === 'government'
                ? 'text-green-700 border-b-2 border-green-700 bg-green-50'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            🏛️ 정부 혜택
          </button>
          <button
            onClick={() => setActiveTab('bergen')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === 'bergen'
                ? 'text-green-700 border-b-2 border-green-700 bg-green-50'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            📍 버겐 카운티 자원
          </button>
        </div>
      </div>

      {/* 정부 혜택 탭 */}
      {activeTab === 'government' && (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {BENEFITS.map((cat) => (
            <div key={cat.category}>
              <h2 className={`text-sm font-bold text-foreground mb-3 pl-3 border-l-4 ${cat.color} py-1`}>
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <BenefitCard key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}

          <div className="bg-muted rounded-xl p-4 text-xs text-muted-foreground text-center leading-relaxed">
            <strong className="text-foreground block mb-1">📞 도움이 필요하시면</strong>
            NJ Senior Helpline: <strong>1-800-792-8820</strong> (한국어 통역 요청 가능)<br />
            NJ Division of Taxation: <strong>1-800-323-4400</strong>
            <div className="mt-2 text-[10px]">혜택 금액 및 소득 기준은 매년 변경될 수 있습니다. 신청 전 반드시 최신 정보를 확인하세요.</div>
          </div>
        </div>
      )}

      {/* 버겐 카운티 자원 탭 */}
      {activeTab === 'bergen' && (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800 leading-relaxed">
            <strong className="block mb-1">📌 버겐 카운티 지역 자원 안내</strong>
            아래 기관들은 버겐 카운티 주민을 위한 다양한 서비스를 제공합니다. 카드를 눌러 주소, 전화번호, 웹사이트를 확인하세요.
          </div>

          {BERGEN_RESOURCES.map((cat) => (
            <div key={cat.category}>
              <h2 className={`text-sm font-bold text-foreground mb-3 pl-3 border-l-4 ${cat.color} py-1`}>
                {cat.category}
                <span className="text-[11px] font-normal text-muted-foreground ml-2">({cat.items.length}개 기관)</span>
              </h2>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <ResourceCard key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-center leading-relaxed">
            <strong className="text-red-800 block mb-2">🆘 긴급 도움이 필요하시면</strong>
            <div className="space-y-1 text-red-700">
              <div>가정폭력 위기 핫라인: <strong>201-336-7575</strong></div>
              <div>정신건강 위기 핫라인: <strong>201-262-4357</strong></div>
              <div>자살 예방 전화: <strong>988</strong></div>
            </div>
            <div className="mt-3 text-[10px] text-muted-foreground">
              출처: Bergen County Resource Guide / Community Resource Guide (Bergen County Dept. of Human Services)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}