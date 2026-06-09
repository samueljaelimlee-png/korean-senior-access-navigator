import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const SECTIONS = [
  {
    title: '신고 신분 (Filing Status)',
    items: [
      { line: '1', text: '2025년 NJ-1040의 신고 신분을 선택하세요:', sub: [
        'A. 미혼 (Single)',
        'B. 세대주 (Head of Household)',
        'C. 배우자 사망 후 자격 있는 생존 배우자 (Qualifying Widow(er))',
        'D. 기혼/CU 공동신고 (Married filing joint return)',
        'E. 기혼/CU 각자 신고 — 각자 별도 거주',
        'F. 기혼/CU 각자 신고 — 같은 거주지',
      ]},
    ],
  },
  {
    title: '나이 및 장애 여부 (Age and Disability Status)',
    items: [
      { line: '2', text: '본인의 출생 연도를 기입하세요. 배우자/CU 파트너의 출생 연도도 기입하세요.' },
      { line: '3a', text: '2025년 중 연방 사회보장 장애 급여(SSDI)를 수령하셨나요? 본인 / 배우자 각각 예/아니오 표시' },
      { line: '3b', text: '2025년 중 철도 퇴직 장애 급여(Railroad Retirement Disability)를 수령하셨나요? 본인 / 배우자 각각 예/아니오 표시' },
    ],
  },
  {
    title: '거주 정보 (Residency Information)',
    items: [
      { line: '4', text: '2025년 10월 1일에 뉴저지에서 본인의 주요 주택을 소유 또는 임차하셨나요? 예/아니오' },
      { line: '5', text: '2025년 10월 1일 기준 거주 상태를 표시하세요:', sub: [
        '주택 소유자 (Homeowner)',
        '모바일홈 소유자 (Mobile home owner)',
        '임차인 (Renter) — 서명 섹션으로 바로 이동',
      ]},
      { line: '6a', text: '2025년 1월 1일부터 12월 31일까지 같은 NJ 주택을 소유하며 거주하셨나요?', sub: [
        '예 → 7번으로 이동',
        '아니오 (주택 소유자) → 6b로 이동',
        '아니오 (모바일홈 소유자) → 서명 섹션으로 이동',
      ]},
      { line: '6b', text: '본인 또는 배우자가 1960년생 이하입니까?', sub: [
        '예 → 6c로 이동',
        '아니오 → 서명 섹션으로 이동',
      ]},
      { line: '6c', text: '2025년에 본인 소유의 NJ 주택에서 또 다른 본인 소유의 NJ 주택으로 이사하셨나요?', sub: [
        '예 → Schedule 1 작성',
        '아니오 → 서명 섹션으로 이동',
      ]},
      { line: '7', text: '작년 재산세 감면 혜택과 동일한 주택에 대해 이 신청서를 제출하시나요? 예/아니오' },
      { line: '8', text: '2025년 12월 31일 기준으로, 2022년 12월 31일 또는 그 이전부터 지금과 같은 NJ 주택을 소유하며 거주하고 계십니까? 예/아니오 ⭐ Senior Freeze 핵심 조건' },
      { line: '9', text: '2023년 1월 1일 ~ 2023년 12월 31일 사이에 현재 거주지로 이사하셨나요? 예/아니오' },
    ],
  },
  {
    title: '주요 거주지 (Principal Residence)',
    items: [
      { line: '10', text: '2025년 10월 1일 기준 주택이 협동조합(Co-op) 또는 지속 돌봄 은퇴 시설(CCRC)의 유닛이라면 유형을 표시하세요.' },
      { line: '11a', text: '2025년 10월 1일 기준 주요 거주지를 배우자/CU 파트너 이외의 다른 사람과 공동소유하셨나요? (2024/2025 두 해 모두 표시) 예/아니오' },
      { line: '11b', text: '예라면, 본인(및 배우자/CU 파트너)이 소유한 비율(%)을 기입하세요. (2024/2025)' },
      { line: '12a', text: '2025년 10월 1일 기준 주요 거주지가 다세대 주택이었나요? (2024/2025 두 해 모두 표시) 예/아니오' },
      { line: '12b', text: '예라면, 주요 거주지로 사용한 비율(%)을 기입하세요. (2024/2025)' },
    ],
  },
  {
    title: '재산세 (Property Taxes)',
    items: [
      { line: '13a', text: '2025년 10월 1일 기준 주요 거주지의 Block 번호, Block Suffix, Lot 번호, Lot Suffix, Qualifier를 기입하세요.' },
      { line: '13b', text: '추가 Lot에 대한 재산세도 청구하시나요? 예/아니오' },
      { line: '14', text: '2024년 10월 1일 기준 주요 거주지에 청구된 2024년 재산세를 기입하세요. (모바일홈 소유자는 총 부지 이용료의 18% 입력) ⭐ 기존 Senior Freeze 수령자: 변경하지 마세요.' },
      { line: '15', text: '2025년 10월 1일 기준 주요 거주지에 청구된 2025년 재산세를 기입하세요. (모바일홈 소유자는 총 부지 이용료의 18% 입력)' },
    ],
  },
  {
    title: 'P.I.L.O.T. (세금 대납금)',
    items: [
      { line: '16a', text: '2025년 주요 거주지에 P.I.L.O.T.(세금 대납금) 계약이 있었나요? 예/아니오' },
      { line: '16b', text: '예라면, 2025년 주요 거주지에 대한 P.I.L.O.T. 금액을 기입하세요.' },
    ],
  },
  {
    title: '2024년 소득 (2024 Income)',
    items: [
      { line: '17a', text: 'NJ 총소득 (NJ-1040 27번 줄 참조)' },
      { line: '17b', text: '면세 이자 소득 (Tax-exempt interest income)' },
      { line: '17c', text: 'Roth IRA 전환금 (설명서 참조)' },
      { line: '17d', text: '장애 연금 수령액 (설명서 참조)' },
      { line: '17e', text: '사회보장 급여 총액 — SSA-1099 Box 5 금액 기입 (Medicare Part B 보험료 포함)' },
      { line: '17f', text: '2024년 소득 합계 (17a~17e 합산) ⭐ 자격 기준: $168,268 이하' },
    ],
  },
  {
    title: '2025년 소득 (2025 Income)',
    items: [
      { line: '18a', text: 'NJ 총소득 (NJ-1040 27번 줄 참조)' },
      { line: '18b', text: '면세 이자 소득' },
      { line: '18c', text: 'Roth IRA 전환금' },
      { line: '18d', text: '장애 연금 수령액' },
      { line: '18e', text: '사회보장 급여 총액 — SSA-1099 Box 5' },
      { line: '18f', text: '2025년 소득 합계 (18a~18e 합산) ⭐ 자격 기준: $172,475 이하' },
    ],
  },
  {
    title: '서명 (Signature)',
    items: [
      { line: '', text: '위증 처벌을 감수하고, 본 재산세 감면 신청서(첨부 일정 및 진술 포함)를 검토하였으며, 본인의 지식과 신념에 따라 이 내용이 사실이고 정확하며 완전하다고 선언합니다.' },
      { line: '', text: '본인 서명, 날짜 기입. 공동신고 시 배우자도 서명 필요. 선택사항: 낮 시간 전화번호 및 이메일 주소.' },
      { line: '', text: '제출 마감일: 2026년 11월 2일\n우편 주소: NJ Division of Taxation / Revenue Processing Center / Property Tax Relief Application / PO Box 635 / Trenton, NJ 08646-0635' },
    ],
  },
];

function Section({ sec }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-2 bg-muted/50 hover:bg-muted transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-sm font-semibold text-foreground">{sec.title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
      </button>
      {open && (
        <div className="divide-y divide-border">
          {sec.items.map((item, i) => (
            <div key={i} className="px-4 py-3 flex gap-3">
              {item.line && (
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded self-start mt-0.5 flex-shrink-0 min-w-[36px] text-center">
                  {item.line}
                </span>
              )}
              <div className="flex-1">
                <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
                {item.sub && (
                  <ul className="mt-1.5 space-y-1">
                    {item.sub.map((s, j) => (
                      <li key={j} className="flex gap-2 text-xs text-muted-foreground">
                        <span className="text-primary mt-0.5 flex-shrink-0">›</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PAS1KoreanPreview({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="bg-background w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-foreground">PAS-1 양식 한글 번역</h2>
            <p className="text-xs text-muted-foreground mt-0.5">각 항목을 눌러 내용을 확인하세요 (참고용)</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Notice */}
        <div className="mx-5 mt-4 flex-shrink-0 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800 leading-relaxed">
          📋 이 번역은 PAS-1 양식(2025년)의 각 질문을 한국어로 설명한 <strong>참고용</strong> 안내입니다. 실제 신청은 왼쪽 "PAS-1 신청 도우미"를 이용하거나 <strong>propertytaxrelief.nj.gov</strong>에서 직접 제출하세요.
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 py-4 space-y-3 flex-1">
          {SECTIONS.map((sec) => (
            <Section key={sec.title} sec={sec} />
          ))}

          {/* Schedule 1 */}
          <div className="border border-orange-200 rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-orange-50">
              <p className="text-sm font-semibold text-orange-900">Schedule 1 — 2025년 중 이사한 경우 (6c = Yes)</p>
              <p className="text-xs text-orange-700 mt-1">2025년에 본인 소유의 NJ 주택에서 또 다른 본인 소유의 NJ 주택으로 이사한 경우에만 작성합니다.</p>
              <ul className="mt-2 space-y-1 text-xs text-orange-800">
                {['1. 각 주택의 주소', '2. Block/Lot/Qualifier 번호', '3. 2025년 중 각 주택에 거주한 기간', '4. 배우자 외 공동소유 여부', '5. 공동소유 비율 (%)', '6. 다세대 주택 여부', '7. 주거 사용 비율 (%)', '8. 청구된 재산세 합계', '9. P.I.L.O.T. 금액'].map((t, i) => (
                  <li key={i} className="flex gap-2"><span className="text-orange-500">›</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}