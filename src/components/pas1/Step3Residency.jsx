import React from 'react';
import { usePAS1 } from '@/lib/pas1Context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, AlertTriangle } from 'lucide-react';
import NavButtons from './NavButtons';

export default function Step3Residency() {
  const { formData, updateField } = usePAS1();

  const baseCheckItems = [
    { key: 'oct1Nj', label: 'Line 4 — 2025년 10월 1일 NJ 거주' },
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider pb-3 mb-4 border-b border-secondary">
        <Building className="w-4 h-4" /> STEP 3 — 거주 정보
      </div>

      <div className="mb-4">
        <Label className="text-sm font-medium mb-2 block">주거 유형 (Line 5)</Label>
        <Select value={formData.homeType} onValueChange={v => updateField('homeType', v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="own">Homeowner — 주택 소유자</SelectItem>
            <SelectItem value="mobile">Mobile Home Owner — 모바일홈 소유자</SelectItem>
            <SelectItem value="rent">Renter — 임차인</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.homeType === 'rent' && (
        <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 text-amber-800 text-sm mb-4">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>임차인은 ANCHOR만 신청 가능합니다. Senior Freeze · Stay NJ는 소유자만 해당됩니다.</span>
        </div>
      )}

      <div className="space-y-3 mb-4">
        {/* Line 4 */}
        {baseCheckItems.map(c => (
          <div key={c.key} className="flex items-center gap-2">
            <Checkbox checked={formData[c.key]} onCheckedChange={v => updateField(c.key, v)} />
            <Label className="text-sm cursor-pointer">{c.label}</Label>
          </div>
        ))}

        {/* Line 6a — 핵심 분기 질문 */}
        <div className="border border-blue-200 rounded-lg p-3 bg-blue-50 space-y-2">
          <p className="text-xs font-bold text-blue-800">Line 6a — 2025년 1월 1일~12월 31일 동안 같은 NJ 주택에 거주하고 소유하셨나요?</p>
          <p className="text-[11px] text-blue-700 leading-relaxed">
            ✅ Yes → Line 7로 바로 이동 (6b, 6c 건너뜀)<br />
            ❌ No (주택 소유자) → 6b, 6c 작성 필요<br />
            ❌ No (모바일홈 소유자) → 서명 섹션으로 바로 이동
          </p>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData.same2025 === true}
              onCheckedChange={v => updateField('same2025', v ? true : false)}
            />
            <Label className="text-sm cursor-pointer font-medium">Yes — 2025년 내내 같은 집 거주 및 소유</Label>
          </div>
        </div>

        {/* Line 6b, 6c — 6a가 No일 때만 표시 */}
        {formData.same2025 !== true && formData.homeType === 'own' && (
          <div className="border border-amber-200 rounded-lg p-3 bg-amber-50 space-y-2">
            <p className="text-xs font-bold text-amber-800">6a = No 해당 — 아래 추가 질문에 답하세요</p>
            <div className="flex items-center gap-2">
              <Checkbox checked={formData.born1960} onCheckedChange={v => updateField('born1960', v)} />
              <Label className="text-sm cursor-pointer">Line 6b — 본인 또는 배우자가 1960년생 이하</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={formData.movedWithin2025} onCheckedChange={v => updateField('movedWithin2025', v)} />
              <Label className="text-sm cursor-pointer">Line 6c — 2025년에 NJ 내 소유 주택에서 다른 소유 주택으로 이사</Label>
            </div>
          </div>
        )}

        {/* Line 7, 8, 11a, 12a */}
        <div className="flex items-center gap-2">
          <Checkbox checked={formData.sameAsLast} onCheckedChange={v => updateField('sameAsLast', v)} />
          <Label className="text-sm cursor-pointer">Line 7 — 작년 재산세 감면과 같은 주택</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox checked={formData.since2022} onCheckedChange={v => updateField('since2022', v)} />
          <Label className="text-sm cursor-pointer">Line 8 — 2022년 12월 31일 이전부터 거주 (Senior Freeze 핵심 조건)</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox checked={formData.coOwn} onCheckedChange={v => updateField('coOwn', v)} />
          <Label className="text-sm cursor-pointer">Line 11a — 배우자 외 공동소유</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox checked={formData.multiUnit} onCheckedChange={v => updateField('multiUnit', v)} />
          <Label className="text-sm cursor-pointer">Line 12a — 다세대 주택 (multi-unit property)</Label>
        </div>
      </div>

      {formData.coOwn && (
        <div className="mb-3">
          <Label className="text-sm">Line 11b — 본인 소유 비율</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input type="number" placeholder="50" className="w-20 text-center font-mono"
              value={formData.coPct} onChange={e => updateField('coPct', e.target.value)} />
            <span className="text-muted-foreground">%</span>
          </div>
        </div>
      )}

      {formData.multiUnit && (
        <div className="mb-3">
          <Label className="text-sm">Line 12b — 주거 사용 비율</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input type="number" placeholder="25" className="w-20 text-center font-mono"
              value={formData.multiUnitPct} onChange={e => updateField('multiUnitPct', e.target.value)} />
            <span className="text-muted-foreground">%</span>
          </div>
        </div>
      )}

      <NavButtons />
    </div>
  );
}