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
          <p className="text-[11px] text-muted-foreground/70 mb-2">NJ-1040 Line 27 기준 — 2025년 1월~12월 전체 소득 (배우자 동거 시 합산)</p>
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