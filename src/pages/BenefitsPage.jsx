import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Phone } from 'lucide-react';

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

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-3xl mb-2">🎁</div>
          <h1 className="text-xl font-bold mb-1">정부 및 주정부 혜택 안내</h1>
          <p className="text-white/70 text-sm">연방 및 뉴저지 시니어 복지 프로그램 모음</p>
        </div>
      </div>

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
          <div className="mt-2 text-[10px]">※ 혜택 금액 및 소득 기준은 매년 변경될 수 있습니다. 신청 전 반드시 최신 정보를 확인하세요.</div>
        </div>
      </div>
    </div>
  );
}