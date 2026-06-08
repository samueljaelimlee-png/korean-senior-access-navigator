import React from 'react';
import { usePAS1 } from '@/lib/pas1Context';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pen, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import NavButtons from './NavButtons';

const CHECKLIST = [
  { label: '모든 필수 항목(SSN, 주소, 재산세, 소득)이 입력되었습니다' },
  { label: '파란색 또는 검정색 볼펜으로 직접 서명할 준비가 되었습니다', sub: '복사 서명 불가 — 반드시 원본 서명' },
  { label: '재산세 고지서 원본은 동봉 불필요합니다' },
  { label: '배우자 사망 시 사망진단서 사본 첨부 (해당 없으면 체크)' },
  { label: 'Life Estate / Trust 소유자 Deed 첨부 (해당 없으면 체크)' },
  { label: '마감일 2026년 11월 2일 이전에 제출합니다', sub: '온라인: 11:59 PM / 우편: 소인 기준' },
];

const TIMELINE = [
  { date: '2026년 11월 2일', title: 'PAS-1 신청 마감', sub: '온라인 11:59 PM / 우편 소인 기준', status: 'pending' },
  { date: '2026년 가을', title: '혜택 금액 통지서 발송', sub: '', status: 'future' },
  { date: '2026년 7월 (예정)', title: 'Senior Freeze 환급 지급', sub: '', status: 'future' },
  { date: '2026년 9월 (예정)', title: 'ANCHOR 지급', sub: '', status: 'future' },
  { date: '2027년 초 (예정)', title: 'Stay NJ 지급 시작', sub: '주 예산 확정 후', status: 'future' },
];

export default function Step6Signature() {
  const { formData, updateField, nextStep } = usePAS1();
  const allChecked = formData.checks.every(Boolean);

  const toggleCheck = (i) => {
    const newChecks = [...formData.checks];
    newChecks[i] = !newChecks[i];
    updateField('checks', newChecks);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider pb-3 mb-4 border-b border-secondary">
        <Pen className="w-4 h-4" /> STEP 6 — 서명
      </div>

      <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 text-amber-800 text-sm mb-4">
        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>서명은 반드시 파란색/검정색 볼펜으로 직접 하세요. 복사 서명은 무효 처리됩니다.</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <Label className="text-sm">서명용 성명 (영문)</Label>
          <Input placeholder="Soo Young Kim" value={formData.sigName}
            onChange={e => updateField('sigName', e.target.value)} />
        </div>
        <div>
          <Label className="text-sm">서명 날짜</Label>
          <Input type="date" value={formData.sigDate}
            onChange={e => updateField('sigDate', e.target.value)} />
        </div>
      </div>

      <div className="border-t border-secondary pt-3 mb-4">
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">제출 전 체크리스트</p>
        {CHECKLIST.map((ck, i) => (
          <div key={i} onClick={() => toggleCheck(i)}
            className="flex items-start gap-3 py-2 border-b border-secondary last:border-b-0 cursor-pointer">
            <div className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center mt-0.5 transition-all
              ${formData.checks[i] ? 'bg-accent border-accent' : 'border-border bg-card'}`}>
              {formData.checks[i] && <span className="text-white text-xs">✓</span>}
            </div>
            <div>
              <p className={`text-sm ${formData.checks[i] ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{ck.label}</p>
              {ck.sub && <p className="text-xs text-muted-foreground mt-0.5">{ck.sub}</p>}
            </div>
          </div>
        ))}
        {allChecked && (
          <div className="flex gap-2 items-start p-3 rounded-lg bg-green-50 text-green-800 text-sm mt-3">
            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>모든 항목 확인 완료!</span>
          </div>
        )}
      </div>

      <div className="border-t border-secondary pt-3">
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">지급 일정 안내</p>
        {TIMELINE.map((t, i) => (
          <div key={i} className="flex gap-3 py-2 border-b border-secondary last:border-b-0">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${t.status === 'pending' ? 'bg-amber-500' : 'bg-border'}`} />
            <div>
              <p className="text-xs font-semibold text-primary">{t.date}</p>
              <p className="text-sm text-foreground">{t.title}</p>
              {t.sub && <p className="text-xs text-muted-foreground">{t.sub}</p>}
            </div>
          </div>
        ))}
      </div>

      <NavButtons nextLabel="최종 확인" nextVariant="accent" />
    </div>
  );
}