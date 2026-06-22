import React, { useRef } from 'react';
import { usePAS1 } from '@/lib/pas1Context';
import { base44 } from '@/api/base44Client';
import { getEligiblePrograms, incomeTotal, formatMoney } from '@/lib/pas1Data';
import { Button } from '@/components/ui/button';
import { Eye, Printer, ArrowLeft, CheckCircle } from 'lucide-react';
import PrintForm from './PrintForm';

export default function Step7Preview() {
  const { formData, prevStep } = usePAS1();
  const printRef = useRef();

  const progs = getEligiblePrograms(formData);
  const t24 = parseFloat(formData.tax2024) || 0;
  const t25 = parseFloat(formData.tax2025) || 0;
  const diff = t25 - t24;
  const age = formData.birthYear ? 2025 - parseInt(formData.birthYear) : null;
  const homeTypeMap = { own: 'Homeowner', mobile: 'Mobile Home Owner', rent: 'Renter' };

  const rows = [
    ['성명', formData.lname && formData.fname ? `${formData.lname}, ${formData.fname}` : '—'],
    ['SSN', formData.ssnLast4 ? `XXX-XX-${formData.ssnLast4}` : '—'],
    ['생년도 / 나이', formData.birthYear ? `${formData.birthYear} (만 ${age}세)` : '—'],
    ['주소', formData.address || '—'],
    ['Municipality Code', formData.muniCode || '—'],
    ['배우자', formData.hasSpouse ? formData.spName || '—' : '—'],
    ['Filing Status', formData.filingStatus || '—'],
    ['주거 유형', homeTypeMap[formData.homeType] || '—'],
    ['2022년 이전 거주', formData.since2022 ? 'Yes — Senior Freeze 조건 충족' : 'No'],
    ['Block / Lot', formData.block && formData.lot ? `Block ${formData.block} / Lot ${formData.lot}` : '—'],
    ['2024년 재산세', formatMoney(t24)],
    ['2025년 재산세', formatMoney(t25)],
    ['재산세 증가분 (Senior Freeze)', diff > 0 ? formatMoney(diff) : '—'],
    ['2024 소득 합계 (17f)', formatMoney(incomeTotal(formData.inc?.[2024]))],
    ['2025 소득 합계 (17f)', formatMoney(incomeTotal(formData.inc?.[2025]))],
    ['서명 날짜', formData.sigDate || '—'],
  ];

  const handlePrint = async () => {
    try {
      let sessionId = localStorage.getItem('ksan_session_id');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('ksan_session_id', sessionId);
      }
      await base44.functions.invoke('trackActivity', { type: 'completion', session_id: sessionId });
    } catch (e) {}
    window.print();
  };

  return (
    <div className="space-y-4">
      <div className="no-print bg-card rounded-xl border border-border shadow-sm p-5">
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider pb-3 mb-4 border-b border-secondary">
          <Eye className="w-4 h-4" /> 최종 확인 — 신청 내용 요약
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {progs.length > 0 ? progs.map(p => (
            <span key={p} className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-green-800 border border-green-500">
              <CheckCircle className="w-3 h-3" /> {p}
            </span>
          )) : (
            <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-muted border border-border">자격 조건 확인 필요</span>
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
        <Button onClick={handlePrint} className="w-full py-6 text-lg font-bold gap-3 bg-accent hover:bg-accent/90">
          <Printer className="w-5 h-5" /> PAS-1 양식 인쇄 / PDF 저장
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          브라우저 인쇄 메뉴에서 &quot;PDF로 저장&quot;을 선택하시면 PDF 파일로 저장됩니다.
        </p>
        <p className="text-xs text-center text-muted-foreground">
          온라인 제출:{' '}
          <a href="https://propertytaxrelief.nj.gov" target="_blank" rel="noopener noreferrer" className="text-primary underline">
            propertytaxrelief.nj.gov
          </a>
          {' '}| 전화: 1-800-323-4400
        </p>
        <div className="text-center">
          <Button variant="outline" onClick={prevStep} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> 이전
          </Button>
        </div>
      </div>

      {/* Print-only form */}
      <div ref={printRef}>
        <PrintForm data={formData} />
      </div>
    </div>
  );
}