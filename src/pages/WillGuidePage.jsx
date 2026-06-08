import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Phone, ExternalLink } from 'lucide-react';

const SECTIONS = [
  {
    id: 'why',
    icon: '❓',
    title: '왜 유언장이 필요한가요?',
    color: 'border-l-red-400',
    alert: { type: 'warning', text: '"우리 자녀들은 다 알아서 나누겠지"라고 생각하시나요? 미국에서는 법대로 처리됩니다. 자녀들 사이 분쟁도 빈번합니다.' },
    content: [
      {
        subtitle: '유언장 없이 사망하면 (Intestate)',
        points: [
          '뉴저지 주법에 따라 재산이 자동 배분됩니다 — 본인 의사 무관',
          '배우자에게 전부 가지 않을 수 있습니다 (자녀가 있으면 나뉨)',
          '법원 Probate 절차가 길어지고 비용이 많이 듭니다',
          '한국에 있는 가족에게 재산을 남기기 매우 어려워집니다',
          '미성년 자녀가 있다면 후견인을 지정할 수 없습니다',
        ],
      },
      {
        subtitle: '유언장이 있으면',
        points: [
          '내가 원하는 사람에게 원하는 만큼 재산을 남길 수 있습니다',
          '한국 가족, 종교 단체, 자선 기관에도 기증 가능',
          '집행인(Executor)을 직접 지정해 신뢰하는 사람에게 맡깁니다',
          '장례 방식(화장, 매장 등)을 미리 지정할 수 있습니다',
        ],
      },
    ],
  },
  {
    id: 'types',
    icon: '📋',
    title: '주요 서류 종류',
    color: 'border-l-blue-400',
    content: [
      {
        subtitle: '① 유언장 (Last Will and Testament)',
        points: [
          '가장 기본적인 유언 서류',
          '서명 + 2인 증인 필요 (공증 권장)',
          '사망 후 Probate 법원을 거쳐 실행됨',
          '뉴저지에서 자필 유언장(Holographic Will)도 일부 인정되나 변호사 작성 권장',
        ],
      },
      {
        subtitle: '② Revocable Living Trust (생전 신탁)',
        points: [
          '생전에 신탁을 만들어 재산을 이전, 사망 시 Probate 없이 바로 배분',
          '재산이 많거나 부동산이 여러 주에 있는 경우 특히 유용',
          '본인이 살아있는 동안 직접 관리하고 변경 가능',
        ],
      },
      {
        subtitle: '③ Durable Power of Attorney (재정 위임장)',
        points: [
          '본인이 판단 능력을 잃었을 때 재정 결정을 맡길 사람 지정',
          '은행 거래, 세금 신고, 부동산 처리 등 대행 가능',
          '"Durable"이 있어야 무능력 상태에서도 유효',
        ],
      },
      {
        subtitle: '④ Healthcare Proxy / Living Will',
        points: [
          'Healthcare Proxy: 의료 결정을 맡길 사람(대리인) 지정',
          'Living Will: 연명치료, 인공호흡기 등에 대한 본인 의사 표현',
          '두 서류를 합쳐 Advance Directive라고도 함',
          '병원에 사본을 미리 제출해 두는 것이 좋습니다',
        ],
      },
    ],
  },
  {
    id: 'process',
    icon: '📝',
    title: '유언장 작성 절차',
    color: 'border-l-green-400',
    alert: { type: 'info', text: '변호사 없이 스스로 작성(DIY)하면 법적 효력이 없거나 나중에 분쟁이 생길 수 있습니다. 한국어 가능 Elder Law 변호사 상담을 강력 권장합니다.' },
    content: [
      {
        subtitle: '단계별 안내',
        points: [
          '1단계: 재산 목록 작성 — 부동산, 은행 계좌, 투자, 차량, 귀중품 등',
          '2단계: 수혜자(Beneficiary) 결정 — 누구에게 무엇을 얼마나 남길지',
          '3단계: 집행인(Executor) 지정 — 유언 집행 책임자',
          '4단계: 변호사 상담 — 한국어 가능 Elder Law 변호사 권장',
          '5단계: 서명 및 증인 — 18세 이상 증인 2명 (수혜자 제외)',
          '6단계: 안전 보관 — 원본은 금고나 변호사 사무실, 사본은 집행인에게',
          '7단계: 정기 업데이트 — 이혼, 재혼, 자녀 출생, 재산 변동 시 갱신',
        ],
      },
    ],
  },
  {
    id: 'cost',
    icon: '💰',
    title: '비용 안내',
    color: 'border-l-amber-400',
    content: [
      {
        subtitle: '일반적인 비용 범위 (뉴저지 기준)',
        points: [
          '기본 Will 패키지: $500 ~ $1,500 (변호사 작성)',
          'Living Trust 포함 풀 패키지: $1,500 ~ $3,500',
          'LegalZoom 등 온라인 DIY: $100 ~ $500 (단순한 경우만)',
          'Legal Aid (무료 법률 서비스): 소득 기준 충족 시 무료 지원',
        ],
      },
      {
        subtitle: '무료/저비용 자원',
        points: [
          'NJ Legal Services: 저소득층 무료 법률 상담',
          'Rutgers Law 무료 클리닉: 노인 전용 법률 서비스',
          'AARP 무료 법률 서비스: 각 카운티 Senior Center에서 운영',
          '한인 변호사 협회: 무료 또는 할인 상담 가능',
        ],
      },
    ],
  },
  {
    id: 'checklist',
    icon: '✅',
    title: '준비 체크리스트',
    color: 'border-l-purple-400',
    checklist: [
      '현재 재산 목록 작성 (부동산, 은행, 투자, 연금, 생명보험)',
      '수혜자 목록 결정 (이름, 관계, 비율 또는 항목)',
      '집행인(Executor) 결정 및 동의 받기',
      'Healthcare 대리인(Proxy) 결정 및 동의 받기',
      '한국어 가능 Elder Law 변호사 예약',
      '서명용 증인 2명 미리 준비 (수혜자 아닌 성인)',
      '완성된 서류 원본 안전 보관',
      '가족에게 위치 알리기',
      '5년마다 또는 큰 변화 있을 때 재검토',
    ],
  },
  {
    id: 'contacts',
    icon: '📞',
    title: '도움이 되는 연락처',
    color: 'border-l-teal-400',
    contacts: [
      { name: 'NJ Legal Services (무료 법률 구조)', phone: '1-888-576-5529', url: 'https://www.lsnj.org' },
      { name: 'AARP Legal Counsel for the Elderly', phone: '1-877-926-8300', url: 'https://www.aarp.org' },
      { name: 'Rutgers Law Free Clinic', phone: '(856) 225-6375', url: 'https://law.rutgers.edu' },
      { name: 'NJ State Bar Association Referral', phone: '1-800-792-8315', url: null },
      { name: 'NJ Elder Law Hotline', phone: '1-800-792-8820', url: null },
    ],
  },
];

function SectionCard({ sec }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        className={`w-full text-left p-4 flex items-center justify-between gap-3 border-l-4 ${sec.color}`}
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{sec.icon}</span>
          <span className="font-bold text-base text-foreground">{sec.title}</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
      </button>

      {open && (
        <div className="p-4 border-t border-border space-y-4">
          {sec.alert && (
            <div className={`flex gap-2 p-3 rounded-lg text-sm ${sec.alert.type === 'warning' ? 'bg-amber-50 text-amber-800' : 'bg-blue-50 text-blue-800'}`}>
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{sec.alert.text}</span>
            </div>
          )}

          {sec.content?.map((c, i) => (
            <div key={i}>
              <h3 className="text-sm font-bold text-primary mb-2">{c.subtitle}</h3>
              <ul className="space-y-1.5">
                {c.points.map((p, j) => (
                  <li key={j} className="flex gap-2 text-sm">
                    <span className="text-accent flex-shrink-0 mt-0.5">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {sec.checklist && (
            <div className="space-y-2">
              {sec.checklist.map((item, i) => (
                <div key={i} className="flex gap-3 items-start text-sm">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {sec.contacts && (
            <div className="space-y-3">
              {sec.contacts.map((c, i) => (
                <div key={i} className="flex flex-wrap items-center justify-between gap-2 p-3 bg-muted rounded-lg">
                  <div>
                    <div className="text-sm font-semibold text-foreground">{c.name}</div>
                    <div className="flex items-center gap-1 text-primary text-sm mt-0.5">
                      <Phone className="w-3 h-3" /> {c.phone}
                    </div>
                  </div>
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-accent font-semibold hover:underline">
                      <ExternalLink className="w-3 h-3" /> 웹사이트
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function WillGuidePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-3xl mb-2">📜</div>
          <h1 className="text-xl font-bold mb-1">유언장 및 유산 계획 가이드</h1>
          <p className="text-white/70 text-sm">미래를 준비하는 현명한 선택 — Will &amp; Estate Planning</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-900 flex gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <strong>법적 조언 면책 고지:</strong> 이 가이드는 일반 교육 정보 제공 목적으로만 사용하며, 법적 조언이 아닙니다.
            실제 유언장 작성을 위해서는 반드시 뉴저지 자격증을 보유한 변호사와 상담하시기 바랍니다.
          </div>
        </div>

        <div className="space-y-4">
          {SECTIONS.map((sec) => (
            <SectionCard key={sec.id} sec={sec} />
          ))}
        </div>
      </div>
    </div>
  );
}