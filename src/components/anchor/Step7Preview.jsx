import React, { useEffect, useState } from 'react';
import { useAnchor } from '@/lib/anchorContext';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Eye, Printer, ArrowLeft, CheckCircle, Languages, ExternalLink } from 'lucide-react';
import PrintFormAnchor from './PrintFormAnchor';
import PrintFormAnchorKorean from './PrintFormAnchorKorean';
import { formatMoney, getAnchorEligible } from '@/lib/anchorData';

export default function Step7Preview() {
  const { formData, prevStep } = useAnchor();
  const [printLang, setPrintLang] = useState(null);

  useEffect(() => {
    if (printLang) {
      (async () => {
        try {
          let sessionId = localStorage.getItem('ksan_session_id');
          if (!sessionId) {
            sessionId = crypto.randomUUID();
            localStorage.setItem('ksan_session_id', sessionId);
          }
          await base44.functions.invoke('trackActivity', { type: 'completion', session_id: sessionId, form_type: 'anchor' });
        } catch (e) {}
      })();
      window.print();
    }
  }, [printLang]);

  const eligible = getAnchorEligible(formData);
  const homeTypeMap = { homeowner: 'Homeowner', renter: 'Renter/Mobile' };
  const rows = [
    ['성명', formData.lname && formData.fname ? `${formData.lname}, ${formData.fname}` : '—'],
    ['SSN', formData.ssnLast4 ? `XXX-XX-${formData.ssnLast4}` : '—'],
    ['신고 신분', formData.filingStatus || '—'],
    ['출생연도', formData.birthYear || '—'],
    ['거주 형태', homeTypeMap[formData.homeType] || '—'],
    ['2025 NJ 총소득', formatMoney(formData.njGrossIncome)],
    ...(formData.homeType === 'homeowner' ? [
      ['Block / Lot', formData.block && formData.lot ? `Block ${formData.block}${formData.blockSuffix ? '.' + formData.blockSuffix : ''} / Lot ${formData.lot}${formData.lotSuffix ? '.' + formData.lotSuffix : ''}` : '—'],
      ['2025 재산세', formatMoney(formData.propertyTax2025)],
    ] : []),
    ['자격 여부', eligible ? '✅ ANCHOR 대상' : '❌ 소득 초과 — 확인 필요'],
    ['서명 날짜', formData.sigDate || '—'],
  ];

  return (
    <div className="space-y-4">
      <div className="no-print bg-card rounded-xl border border-border shadow-sm p-5">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider pb-3 mb-4 border-b border-secondary">
          <Eye className="w-4 h-4" /> 최종 확인 — 신청 내용 요약
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {eligible ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-green-800 border border-green-500">
              <CheckCircle className="w-3 h-3" /> ANCHOR 신청 가능
            </span>
          ) : (
            <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-muted border border-border">소득 기준 확인 필요</span>
          )}
        </div>
        <table className="w-full text-sm">
          <tbody>
            {rows.map(([label, val], i) => (
              <tr key={i} className="border-b border-secondary last:border-b-0">
                <td className="py-2 text-xs text-muted-foreground w-[44%]">{label}</td>
                <td className="py-2 font-medium text-right">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="no-print flex flex-col gap-3">
        <Button onClick={() => setPrintLang('en')} className="w-full py-6 text-lg font-bold gap-3 bg-accent hover:bg-accent/90">
          <Printer className="w-5 h-5" /> ANC-1 양식 인쇄 / PDF 저장 (영문)
        </Button>
        <Button onClick={() => setPrintLang('ko')} variant="outline" className="w-full py-6 text-lg font-bold gap-3 border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white">
          <Languages className="w-5 h-5" /> ANC-1 양식 인쇄 / PDF 저장 (한글 번역)
        </Button>
        <p className="text-xs text-center text-muted-foreground">브라우저 인쇄 메뉴에서 "PDF로 저장"을 선택하시면 PDF로 저장됩니다.</p>
        <a href="https://anchor.nj.gov" target="_blank" rel="noopener noreferrer" className="text-xs text-center text-amber-600 underline inline-flex items-center justify-center gap-1">
          <ExternalLink className="w-3 h-3" /> 온라인 제출: anchor.nj.gov
        </a>
        <div className="text-center">
          <Button variant="outline" onClick={prevStep} className="gap-2"><ArrowLeft className="w-4 h-4" /> 이전</Button>
        </div>
      </div>

      <div>
        {printLang === 'ko' ? <PrintFormAnchorKorean data={formData} /> : <PrintFormAnchor data={formData} />}
      </div>
    </div>
  );
}