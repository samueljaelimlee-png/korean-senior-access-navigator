import React from 'react';
import { useAnchor } from '@/lib/anchorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import NavButtons from './NavButtons';
import { FILING_STATUS_OPTIONS } from '@/lib/anchorData';

export default function Step2Filing() {
  const { formData, updateField } = useAnchor();
  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h2 className="text-lg font-bold text-amber-900">2단계 — 신고 신분 & 나이/장애</h2>
        <p className="text-xs text-amber-800/70">Step 2 — Filing Status, Age & Disability</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-semibold">1. 2025 NJ-1040 신고서상 신분 <span className="text-[11px] font-normal text-muted-foreground/60">Filing Status</span></Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {FILING_STATUS_OPTIONS.map(opt => (
              <button key={opt.value} onClick={() => updateField('filingStatus', opt.value)}
                className={`text-left px-3 py-2.5 rounded-lg border-2 text-sm ${formData.filingStatus === opt.value ? 'border-amber-500 bg-amber-50' : 'border-border bg-card'}`}>
                <span className="font-semibold">{opt.label}</span>
                <span className="block text-[11px] text-muted-foreground">{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
          <div>
            <Label className="text-sm">2. 본인 출생연도 (Your Birth Year) <span className="text-red-500 text-xs">필수</span></Label>
            <Input maxLength={4} placeholder="1970" className="font-mono" value={formData.birthYear} onChange={e => updateField('birthYear', e.target.value)} />
          </div>
          {formData.hasSpouse && (
            <div>
              <Label className="text-sm">배우자 출생연도 (Spouse Birth Year)</Label>
              <Input maxLength={4} placeholder="1972" className="font-mono" value={formData.spBirthYear} onChange={e => updateField('spBirthYear', e.target.value)} />
            </div>
          )}
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <Label className="text-sm font-semibold">3. 2025년 12월 31일 기준 실명 또는 장애 상태 (Line 3) <span className="text-[11px] font-normal text-muted-foreground/60">Blind or disabled</span></Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6">
            <div className="flex items-center gap-2">
              <Checkbox checked={formData.blindSelf} onCheckedChange={v => updateField('blindSelf', v)} id="blindSelf" />
              <Label htmlFor="blindSelf" className="text-sm cursor-pointer">본인 실명/장애 · Yourself</Label>
            </div>
            {formData.hasSpouse && (
              <div className="flex items-center gap-2">
                <Checkbox checked={formData.blindSpouse} onCheckedChange={v => updateField('blindSpouse', v)} id="blindSpouse" />
                <Label htmlFor="blindSpouse" className="text-sm cursor-pointer">배우자 실명/장애 · Spouse</Label>
              </div>
            )}
          </div>
        </div>
      </div>

      <NavButtons />
    </div>
  );
}