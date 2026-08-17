import React from 'react';
import { useAnchor } from '@/lib/anchorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import NavButtons from './NavButtons';

export default function Step5Property() {
  const { formData, updateField } = useAnchor();
  const isHomeowner = formData.homeType === 'homeowner';

  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h2 className="text-lg font-bold text-amber-900">5단계 — {isHomeowner ? '주택 정보' : '임차 정보'}</h2>
        <p className="text-xs text-amber-800/70">Step 5 — {isHomeowner ? 'Homeowner Details' : 'Renter Details'}</p>
      </div>

      {isHomeowner ? (
        <div className="bg-card rounded-xl border border-border p-5 space-y-5">
          <div className="flex items-center gap-2">
            <Checkbox checked={formData.sameAsLast} onCheckedChange={v => updateField('sameAsLast', v)} id="same" />
            <Label htmlFor="same" className="text-sm cursor-pointer">6. 작년 ANCHOR 혜택과 같은 주택으로 신청 <span className="text-[11px] text-muted-foreground/60">Same home as last year</span></Label>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">7. Block / Lot 번호 <span className="text-red-500 text-xs">필수</span> <span className="text-[11px] font-normal text-muted-foreground/60">e.g. 00600.07</span></Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label className="text-xs">Block · Block Suffix</Label>
                <div className="flex items-center gap-1 mt-1">
                  <Input placeholder="00600" className="font-mono" value={formData.block} onChange={e => updateField('block', e.target.value)} />
                  <span className="text-muted-foreground font-mono">.</span>
                  <Input placeholder="07" className="font-mono w-20" value={formData.blockSuffix} onChange={e => updateField('blockSuffix', e.target.value)} />
                </div>
              </div>
              <div>
                <Label className="text-xs">Lot · Lot Suffix</Label>
                <div className="flex items-center gap-1 mt-1">
                  <Input placeholder="0008" className="font-mono" value={formData.lot} onChange={e => updateField('lot', e.target.value)} />
                  <span className="text-muted-foreground font-mono">.</span>
                  <Input placeholder="00" className="font-mono w-20" value={formData.lotSuffix} onChange={e => updateField('lotSuffix', e.target.value)} />
                </div>
              </div>
              <div>
                <Label className="text-xs">Qualifier (콘도)</Label>
                <Input placeholder="C001" className="font-mono mt-1" value={formData.qualifier} onChange={e => updateField('qualifier', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox checked={formData.coOwn} onCheckedChange={v => updateField('coOwn', v)} id="coOwn" />
              <Label htmlFor="coOwn" className="text-sm cursor-pointer">8a. 배우자 외 공동 소유 <span className="text-[11px] text-muted-foreground/60">Shared ownership</span></Label>
            </div>
            {formData.coOwn && (
              <div className="flex items-center gap-2 pl-6">
                <Label className="text-sm">8b. 본인 소유 비율</Label>
                <Input type="number" placeholder="50" className="w-20 text-center font-mono" value={formData.coPct} onChange={e => updateField('coPct', e.target.value)} />
                <span className="text-muted-foreground text-sm">%</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox checked={formData.multiUnit} onCheckedChange={v => updateField('multiUnit', v)} id="mu" />
              <Label htmlFor="mu" className="text-sm cursor-pointer">9a. 다세대 주택 <span className="text-[11px] text-muted-foreground/60">Multiple units</span></Label>
            </div>
            {formData.multiUnit && (
              <div className="flex items-center gap-2 pl-6">
                <Label className="text-sm">9b. 주거 사용 비율</Label>
                <Input type="number" placeholder="25" className="w-20 text-center font-mono" value={formData.multiUnitPct} onChange={e => updateField('multiUnitPct', e.target.value)} />
                <span className="text-muted-foreground text-sm">%</span>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <Label className="text-sm font-semibold">10. Co-op 또는 은퇴시설 (해당 시만) <span className="text-[11px] font-normal text-muted-foreground/60">Co-op / CCRC</span></Label>
            <div className="flex flex-wrap items-center gap-4 pl-6">
              <div className="flex items-center gap-2">
                <Checkbox checked={formData.coopType === 'coop'} onCheckedChange={() => updateField('coopType', formData.coopType === 'coop' ? '' : 'coop')} id="coop" />
                <Label htmlFor="coop" className="text-sm cursor-pointer">Co-op</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked={formData.coopType === 'ccrc'} onCheckedChange={() => updateField('coopType', formData.coopType === 'ccrc' ? '' : 'ccrc')} id="ccrc" />
                <Label htmlFor="ccrc" className="text-sm cursor-pointer">지속 돌봄 은퇴시설 (CCRC)</Label>
              </div>
            </div>
            {formData.coopType && (
              <div className="pl-6">
                <Label className="text-xs">시설명 (Name of facility)</Label>
                <Input placeholder="facility name" value={formData.coopName} onChange={e => updateField('coopName', e.target.value)} />
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <Label className="text-sm font-semibold">11. 2025년 재산세 (2025 Property Taxes) <span className="text-red-500 text-xs">필수</span></Label>
            <p className="text-[11px] text-muted-foreground/70">2025년 10월 1일 기준 주요 주택에 청구된 재산세</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">$</span>
              <Input type="number" placeholder="9800" className="font-mono text-lg pl-7" value={formData.propertyTax2025} onChange={e => updateField('propertyTax2025', e.target.value)} />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border p-5 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox checked={formData.nameOnLease} onCheckedChange={v => updateField('nameOnLease', v)} id="lease" />
              <Label htmlFor="lease" className="text-sm cursor-pointer">12. 본인 이름이 임대 계약서 또는 대여 계약서에 등록되어 있나요? <span className="text-[11px] text-muted-foreground/60">Name on lease</span></Label>
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Checkbox checked={formData.sharedRent} onCheckedChange={v => updateField('sharedRent', v)} id="shared" />
              <Label htmlFor="shared" className="text-sm cursor-pointer">13. 배우자 외 다른 사람이 임차 주택 또는 모바일홈을 함께 점유하고 임대료를 분담했나요? <span className="text-[11px] text-muted-foreground/60">Others shared rent</span></Label>
            </div>
          </div>
        </div>
      )}

      <NavButtons />
    </div>
  );
}