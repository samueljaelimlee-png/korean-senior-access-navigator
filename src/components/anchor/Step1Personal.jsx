import React from 'react';
import { useAnchor } from '@/lib/anchorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import NavButtons from './NavButtons';
import { lookupMuni, getMuniCounty } from '@/lib/anchorData';

export default function Step1Personal() {
  const { formData, updateField } = useAnchor();
  const autoFillMuni = () => {
    const m = lookupMuni(formData.city);
    if (m) updateField('muniCode', m.code);
  };

  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h2 className="text-lg font-bold text-amber-900">1단계 — 기본 정보</h2>
        <p className="text-xs text-amber-800/70">Step 1 — Personal Information</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm">본인 사회보장번호 끝 4자리 <span className="text-red-500 text-xs">필수</span> <span className="text-[11px] text-muted-foreground/60">Your SSN (last 4)</span></Label>
            <Input maxLength={4} placeholder="1234" className="font-mono" value={formData.ssnLast4} onChange={e => updateField('ssnLast4', e.target.value)} />
          </div>
          <div>
            <Label className="text-sm">배우자 SSN 끝 4자리 <span className="text-[11px] text-muted-foreground/60">Spouse SSN (last 4)</span></Label>
            <Input maxLength={4} placeholder="4321" className="font-mono" value={formData.spSsnLast4} onChange={e => updateField('spSsnLast4', e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm">성 (Last Name) <span className="text-red-500 text-xs">필수</span></Label>
            <Input placeholder="Kim" value={formData.lname} onChange={e => updateField('lname', e.target.value)} />
          </div>
          <div>
            <Label className="text-sm">이름 및 이니셜 (First Name & Initial) <span className="text-red-500 text-xs">필수</span></Label>
            <Input placeholder="Soo Young J" value={formData.fname} onChange={e => updateField('fname', e.target.value)} />
          </div>
        </div>

        <div>
          <Label className="text-sm">자택 주소 (Home Address) <span className="text-red-500 text-xs">필수</span> <span className="text-[11px] text-muted-foreground/60">Number & Street</span></Label>
          <Input placeholder="45 Broad Ave" value={formData.address} onChange={e => updateField('address', e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm">시/타운 (City) <span className="text-red-500 text-xs">필수</span></Label>
            <Input placeholder="Palisades Park" value={formData.city} onChange={e => updateField('city', e.target.value)} />
          </div>
          <div>
            <Label className="text-sm">주 (State)</Label>
            <Input value={formData.state} onChange={e => updateField('state', e.target.value)} />
          </div>
          <div>
            <Label className="text-sm">우편번호 (ZIP)</Label>
            <Input maxLength={5} placeholder="07650" className="font-mono" value={formData.zip} onChange={e => updateField('zip', e.target.value)} />
          </div>
        </div>

        <div>
          <Label className="text-sm">카운티/자치단체 코드 (County/Municipality Code) <span className="text-red-500 text-xs">필수</span> <span className="text-[11px] text-muted-foreground/60">4-digit code</span></Label>
          <div className="flex flex-wrap items-center gap-2">
            <Input maxLength={4} placeholder="0245" className="font-mono w-32" value={formData.muniCode} onChange={e => updateField('muniCode', e.target.value)} />
            <button onClick={autoFillMuni} className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-300 px-3 py-2 rounded-lg hover:bg-amber-100">시 이름으로 찾기 · Auto-fill</button>
            {formData.muniCode && <span className="text-xs text-muted-foreground">{getMuniCounty(formData.muniCode)}</span>}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Checkbox checked={formData.hasSpouse} onCheckedChange={v => updateField('hasSpouse', v)} id="hasSpouse" />
          <Label htmlFor="hasSpouse" className="text-sm cursor-pointer">배우자/CU 파트너 정보 입력 <span className="text-[11px] text-muted-foreground/60">Include spouse/CU partner</span></Label>
        </div>
        {formData.hasSpouse && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-6">
            <div>
              <Label className="text-sm">배우자 성 (Spouse Last Name) <span className="text-[11px] text-muted-foreground/60">only if different</span></Label>
              <Input placeholder="(같으면 공란)" value={formData.spLname} onChange={e => updateField('spLname', e.target.value)} />
            </div>
            <div>
              <Label className="text-sm">배우자 이름 (Spouse First Name)</Label>
              <Input placeholder="Min Hee" value={formData.spFname} onChange={e => updateField('spFname', e.target.value)} />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Checkbox checked={formData.diffAddress} onCheckedChange={v => updateField('diffAddress', v)} id="diffAddr" />
          <Label htmlFor="diffAddr" className="text-sm cursor-pointer">2025년 10월 1일 주요 주택 주소가 위와 다름 <span className="text-[11px] text-muted-foreground/60">Main home on Oct 1, 2025 is different</span></Label>
        </div>
        {formData.diffAddress && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-6">
            <div>
              <Label className="text-sm">다른 주소 (Street Address)</Label>
              <Input placeholder="120 Park St" value={formData.diffStreet} onChange={e => updateField('diffStreet', e.target.value)} />
            </div>
            <div>
              <Label className="text-sm">다른 카운티/자치단체 코드</Label>
              <Input maxLength={4} placeholder="0245" className="font-mono" value={formData.diffMuniCode} onChange={e => updateField('diffMuniCode', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      <NavButtons />
    </div>
  );
}