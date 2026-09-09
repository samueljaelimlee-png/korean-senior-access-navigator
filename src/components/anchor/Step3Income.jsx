import React from 'react';
import { useAnchor } from '@/lib/anchorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';
import NavButtons from './NavButtons';
import { formatMoney, HOMEOWNER_INCOME_LIMIT, RENTER_INCOME_LIMIT } from '@/lib/anchorData';

export default function Step3Income() {
  const { formData, updateField } = useAnchor();
  const inc = parseFloat(formData.njGrossIncome) || 0;

  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h2 className="text-lg font-bold text-amber-900">3단계 — 2025년 소득</h2>
        <p className="text-xs text-amber-800/70">Step 3 — 2025 New Jersey Gross Income</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 space-y-4">
        <div>
          <Label className="text-sm font-semibold">4. 2025년 뉴저지 총소득 (NJ Gross Income) <span className="text-red-500 text-xs">필수</span></Label>
          <p className="text-[11px] text-muted-foreground/70 mb-1">2025년 NJ-1040 <strong>Line 29</strong>의 뉴저지 총소득 금액을 적으세요. 별도 신고를 했더라도 같은 주요 주택을 유지한 배우자는 합산 소득을 입력해야 합니다. 2025년 연간 소득이 신고 기준액(filing threshold)을 넘지 않으면 0을 입력하세요.</p>
          <p className="text-[10px] text-muted-foreground/60 mb-2">Enter the amount of your 2025 New Jersey gross income from Line 29 of your 2025 NJ-1040. Spouses who filed separately but maintained the same main home must enter combined income. If your income for the entire year for 2025 was not over the filing threshold, enter zero.</p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">$</span>
            <Input type="number" placeholder="65000" className="font-mono text-lg pl-7" value={formData.njGrossIncome} onChange={e => updateField('njGrossIncome', e.target.value)} />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-blue-800 space-y-1">
            <p><strong>소득 기준 (Income Limits):</strong></p>
            <p>🏠 주택 소유자: {formatMoney(HOMEOWNER_INCOME_LIMIT)} 이하</p>
            <p>🔑 임차인/모바일홈: {formatMoney(RENTER_INCOME_LIMIT)} 이하</p>
          </div>
        </div>

        {inc > 0 && (
          <p className="text-sm text-muted-foreground">입력하신 소득: <strong className="text-foreground">{formatMoney(inc)}</strong></p>
        )}
      </div>

      <NavButtons />
    </div>
  );
}