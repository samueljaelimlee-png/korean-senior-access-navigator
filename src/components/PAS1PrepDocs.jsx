import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, FileText } from 'lucide-react';

const DOCS = [
  {
    form: 'NJ-1040',
    name: '뉴저지 소득세 신고서',
    color: 'border-l-blue-500 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
    why: 'PAS-1의 소득 항목(17a/18a)에 NJ 총소득을 기입할 때 필요합니다.',
    details: [
      '뉴저지 주 소득세 신고서 (연방 1040과 별도)',
      '27번 줄(Line 27) — NJ Gross Income 금액을 확인하세요',
      '매년 4월 세금 신고 후 보관하세요',
      '없으면 NJ Division of Taxation (1-800-323-4400)에 문의',
    ],
  },
  {
    form: 'SSA-1099',
    name: '사회보장 급여 명세서',
    color: 'border-l-green-500 bg-green-50',
    badge: 'bg-green-100 text-green-700',
    why: '사회보장(Social Security) 수령액을 소득 항목(17e/18e)에 기입할 때 필요합니다.',
    details: [
      '매년 1월 Social Security Administration에서 우편 발송',
      'Box 5 — "Net Benefits" 금액을 확인하세요 (Medicare Part B 공제 전 총액)',
      'SSA.gov 계정에서 온라인 출력 가능',
      '분실 시 1-800-772-1213로 재발급 요청',
    ],
  },
  {
    form: '1099-R',
    name: '연금·퇴직소득 명세서',
    color: 'border-l-purple-500 bg-purple-50',
    badge: 'bg-purple-100 text-purple-700',
    why: 'IRA, 401(k), 연금 등 퇴직 소득을 NJ-1040에 기재할 때 사용됩니다. NJ-1040을 통해 PAS-1 소득 계산에 반영됩니다.',
    details: [
      '연금·IRA·401(k) 등 퇴직 계좌에서 수령 시 발급',
      '매년 1월 금융기관에서 우편 발송',
      'Box 1 — 총 수령액, Box 2a — 과세 대상 금액 확인',
      'Roth IRA 전환 금액은 별도로 17c/18c에 기입 필요',
    ],
  },
  {
    form: '재산세 고지서',
    name: 'Property Tax Bill',
    color: 'border-l-red-500 bg-red-50',
    badge: 'bg-red-100 text-red-700',
    why: '2024년·2025년 재산세 납부액(14·15번 줄)과 Block/Lot 번호를 입력할 때 필요합니다.',
    details: [
      '매년 카운티에서 우편 발송 (분기별 고지)',
      'Block 번호, Lot 번호, Qualifier 확인',
      '2024년 및 2025년 두 해 고지서 모두 준비',
      '분실 시 담당 Township Tax Collector에 문의',
    ],
  },
  {
    form: 'SSA/Medicare 카드',
    name: '메디케어 카드 또는 연금 수령 증빙',
    color: 'border-l-teal-500 bg-teal-50',
    badge: 'bg-teal-100 text-teal-700',
    why: '65세 미만의 경우 장애 급여(SSDI) 수령 여부를 증명하기 위해 필요할 수 있습니다 (3a/3b번 줄).',
    details: [
      '65세 이상이면 생년월일로 나이 증명 가능 (별도 서류 불필요)',
      '65세 미만 장애인은 SSDI 수령 증빙 서류 준비',
      'Medicare 카드의 수혜 시작일 확인',
    ],
  },
  {
    form: '1099-INT / 1099-DIV',
    name: '이자·배당소득 명세서',
    color: 'border-l-amber-500 bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
    why: '면세 이자 소득(17b/18b)을 기입할 때 필요합니다. 지방채(Municipal Bond) 이자 등이 해당됩니다.',
    details: [
      '은행·증권사에서 매년 1월 발송',
      '1099-INT Box 8 — 면세 이자 소득 확인',
      '1099-DIV Box 11 — 면세 배당금 확인',
      '해당 없으면 준비 불필요',
    ],
  },
  {
    form: '이전 PAS-1 신청서',
    name: '지난해 PAS-1 신청서 (있는 경우)',
    color: 'border-l-slate-500 bg-slate-50',
    badge: 'bg-slate-100 text-slate-700',
    why: '기존 Senior Freeze 수령자는 기준 연도 재산세 금액(14번 줄)을 변경하지 말아야 합니다. 이전 서류를 참고하면 실수를 방지할 수 있습니다.',
    details: [
      '기존 Senior Freeze 수령자: 14번 줄(2024 재산세)을 작년 신청서 그대로 유지',
      'Municipality Code(시군구 코드) 사전 확인 가능',
      '첫 신청자는 해당 없음',
    ],
  },
];

function DocCard({ doc }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-l-4 rounded-lg overflow-hidden border border-border ${doc.color}`}>
      <button
        className="w-full text-left px-4 py-3 flex items-start justify-between gap-3"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full font-mono ${doc.badge}`}>{doc.form}</span>
            <span className="text-sm font-semibold text-foreground">{doc.name}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{doc.why}</p>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
          : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0">
          <ul className="space-y-1.5">
            {doc.details.map((d, i) => (
              <li key={i} className="flex gap-2 text-xs text-foreground">
                <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function PAS1PrepDocs({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="bg-background w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-foreground">📋 신청 전 준비 서류</h2>
            <p className="text-xs text-muted-foreground mt-0.5">PAS-1 작성 전에 아래 서류를 미리 준비하세요</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Notice */}
        <div className="mx-5 mt-4 flex-shrink-0 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 leading-relaxed">
          💡 모든 서류가 반드시 필요하지는 않습니다. 본인 상황에 해당하는 서류만 준비하시면 됩니다. 카드를 클릭하면 자세한 내용을 확인할 수 있습니다.
        </div>

        {/* Must-have income docs for both years */}
        <div className="mx-5 mt-3 flex-shrink-0 p-4 bg-blue-50 border-2 border-blue-400 rounded-lg">
          <div className="flex items-center gap-2 mb-1.5">
            <FileText className="w-5 h-5 text-blue-700 flex-shrink-0" />
            <h3 className="text-sm font-bold text-blue-900">All 2024 &amp; 2025 Income Documentation</h3>
          </div>
          <p className="text-xs text-blue-800 leading-relaxed mb-1">
            PAS-1 신청에는 <strong>2024년과 2025년 두 해의 소득 서류가 모두 필요</strong>합니다.
          </p>
          <p className="text-xs text-blue-700 leading-relaxed">
            NJ-1040(s), 1099-R(s), and 1099-SSA(s)
          </p>
        </div>

        {/* List */}
        <div className="overflow-y-auto px-5 py-4 space-y-3 flex-1">
          {DOCS.map((doc) => (
            <DocCard key={doc.form} doc={doc} />
          ))}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}