import React from 'react';
import { usePAS1 } from '@/lib/pas1Context';
import { formatMoney } from '@/lib/pas1Data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Receipt, FileText, CheckCircle } from 'lucide-react';
import NavButtons from './NavButtons';

export default function Step4PropertyTax() {
  const { formData, updateField } = usePAS1();

  const t24 = parseFloat(formData.tax2024) || 0;
  const t25 = parseFloat(formData.tax2025) || 0;
  const diff = t25 - t24;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider pb-3 mb-4 border-b border-secondary">
        <Receipt className="w-4 h-4" /> STEP 4 — 재산세 정보
      </div>

      <div className="flex gap-2 items-start p-3 rounded-lg bg-muted text-muted-foreground text-sm mb-4">
        <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>재산세 고지서(Property Tax Bill)를 준비해두시면 Block/Lot 번호와 납부액을 쉽게 입력할 수 있습니다.</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <Label className="text-sm">Block <span className="text-red-500 text-xs">필수</span></Label>
          <Input placeholder="2204" className="font-mono" value={formData.block}
            onChange={e => updateField('block', e.target.value)} />
        </div>
        <div>
          <Label className="text-sm">Lot <span className="text-red-500 text-xs">필수</span></Label>
          <Input placeholder="8" className="font-mono" value={formData.lot}
            onChange={e => updateField('lot', e.target.value)} />
        </div>
        <div>
          <Label className="text-sm">Qualifier <span className="text-xs text-muted-foreground">(콘도)</span></Label>
          <Input placeholder="C001" className="font-mono" value={formData.qualifier}
            onChange={e => updateField('qualifier', e.target.value)} />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Checkbox checked={formData.additionalLots} onCheckedChange={v => updateField('additionalLots', v)} />
        <Label className="text-sm cursor-pointer">Line 13b — 추가 Lot 재산세 포함</Label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <Label className="text-sm">Line 14 — 2024년 재산세 <span className="text-red-500 text-xs">필수</span></Label>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-muted-foreground text-sm">$</span>
            <Input type="number" placeholder="11250" step="0.01" className="font-mono text-right"
              value={formData.tax2024} onChange={e => updateField('tax2024', e.target.value)} />
          </div>
        </div>
        <div>
          <Label className="text-sm">Line 15 — 2025년 재산세 <span className="text-red-500 text-xs">필수</span></Label>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-muted-foreground text-sm">$</span>
            <Input type="number" placeholder="11840" step="0.01" className="font-mono text-right"
              value={formData.tax2025} onChange={e => updateField('tax2025', e.target.value)} />
          </div>
        </div>
      </div>

      {diff > 0 && (
        <div className="flex gap-2 items-start p-3 rounded-lg bg-green-50 text-green-800 text-sm mb-4">
          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>Senior Freeze 환급 예상액: <strong>{formatMoney(diff)}</strong> (재산세 증가분)</span>
        </div>
      )}

      <div className="border-t border-secondary pt-3">
        <div className="flex items-center gap-2 mb-2">
          <Checkbox checked={formData.pilot} onCheckedChange={v => updateField('pilot', v)} />
          <Label className="text-sm cursor-pointer">Line 16a — P.I.L.O.T. (Payment-in-Lieu-of-Taxes) 해당</Label>
        </div>
        {formData.pilot && (
          <div>
            <Label className="text-sm">Line 16b — P.I.L.O.T. 금액</Label>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-muted-foreground text-sm">$</span>
              <Input type="number" placeholder="0" step="0.01" className="font-mono text-right w-40"
                value={formData.pilotAmount} onChange={e => updateField('pilotAmount', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      <NavButtons />
    </div>
  );
}