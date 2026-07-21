import React, { useState } from 'react';
import { usePAS1 } from '@/lib/pas1Context';
import { lookupMuni, getMuniCounty } from '@/lib/pas1Data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { User, MapPin } from 'lucide-react';
import NavButtons from './NavButtons';

export default function Step1Personal() {
  const { formData, updateField } = usePAS1();
  const [muniResult, setMuniResult] = useState(null);

  const age = formData.birthYear ? 2025 - parseInt(formData.birthYear) : null;

  const handleAddressBlur = (addr) => {
    if (!addr) return;
    const parts = addr.split(',');
    for (let i = 1; i < parts.length; i++) {
      const p = parts[i].trim().replace(/NJ/i, '').replace(/\d{5}/g, '').trim();
      if (p.length > 2) {
        const match = lookupMuni(p);
        if (match) {
          setMuniResult({ city: p, ...match });
          return;
        }
      }
    }
  };

  const applyMuni = () => {
    if (muniResult) {
      updateField('muniCode', muniResult.code);
      setMuniResult(null);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider pb-3 mb-4 border-b border-secondary">
        <User className="w-4 h-4" /> STEP 1 — 기본 정보
      <span className="block text-[10px] text-muted-foreground/60 normal-case tracking-normal ml-6">Personal Information</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <Label className="text-sm">성 (Last name) <span className="text-red-500 text-xs">필수</span> <span className="text-[11px] text-muted-foreground/60">Required</span></Label>
          <Input placeholder="Kim" value={formData.lname} onChange={e => updateField('lname', e.target.value)} />
        </div>
        <div>
          <Label className="text-sm">이름 (First name) <span className="text-red-500 text-xs">필수</span> <span className="text-[11px] text-muted-foreground/60">Required</span></Label>
          <Input placeholder="Soo Young" value={formData.fname} onChange={e => updateField('fname', e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <Label className="text-sm">생년도 <span className="text-red-500 text-xs">필수</span> <span className="text-[11px] text-muted-foreground/60">Birth Year — Required</span></Label>
          <Input placeholder="1958" maxLength={4} value={formData.birthYear} onChange={e => updateField('birthYear', e.target.value)} />
          {age && (
            <p className="text-xs text-muted-foreground mt-1">
              만 {age}세 {age >= 65 ? '— Senior Freeze · Stay NJ 연령 충족 ✓' : '— 장애급여 수급 조건 필요'}
              <span className="block text-[10px] text-muted-foreground/60">Age {age} {age >= 65 ? '— Meets age requirement ✓' : '— Disability benefit required'}</span>
            </p>
          )}
        </div>
        <div>
          <Label className="text-sm">전화번호 <span className="text-[11px] text-muted-foreground/60">Phone Number</span></Label>
          <Input placeholder="(201) 555-0100" value={formData.phone} onChange={e => updateField('phone', e.target.value)} />
        </div>
      </div>

      <div className="mb-3">
        <Label className="text-sm">주소 (Mailing address) <span className="text-red-500 text-xs">필수</span> <span className="text-[11px] text-muted-foreground/60">Required</span></Label>
        <Input
          placeholder="45 Broad Ave, Palisades Park, NJ 07650"
          value={formData.address}
          onChange={e => updateField('address', e.target.value)}
          onBlur={e => handleAddressBlur(e.target.value)}
        />
        {muniResult && (
          <div className="mt-2 p-2 bg-green-50 border border-green-500 rounded-lg flex items-center gap-2 text-sm text-green-800">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{muniResult.city} → {muniResult.county} | Code: {muniResult.code}</span>
            <button onClick={applyMuni} className="px-3 py-1 bg-green-800 text-white rounded text-xs font-semibold">적용 / Apply</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <Label className="text-sm">Municipality Code <span className="text-xs text-muted-foreground">(4자리)</span> <span className="text-[11px] text-muted-foreground/60">4-digit code</span></Label>
          <Input placeholder="0245" maxLength={4} className="font-mono w-24" value={formData.muniCode}
            onChange={e => updateField('muniCode', e.target.value)} />
          {formData.muniCode && (
            <p className="text-xs text-accent font-medium mt-1">{getMuniCounty(formData.muniCode)}</p>
          )}
        </div>
        <div>
          <Label className="text-sm">SSN 뒷 4자리 <span className="text-[11px] text-muted-foreground/60">Last 4 digits of SSN</span></Label>
          <Input placeholder="1234" maxLength={4} className="font-mono w-24" value={formData.ssnLast4}
            onChange={e => updateField('ssnLast4', e.target.value)} />
        </div>
      </div>

      <div className="border-t border-secondary pt-3 mt-3">
        <div className="flex items-center gap-2 mb-3">
          <Checkbox checked={formData.hasSpouse} onCheckedChange={v => updateField('hasSpouse', v)} />
          <Label className="text-sm font-medium cursor-pointer">배우자 / Civil Union Partner 포함 <span className="text-[11px] font-normal text-muted-foreground/60">Include Spouse / Partner</span></Label>
        </div>
        {formData.hasSpouse && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">배우자 성명 (영문) <span className="text-[11px] text-muted-foreground/60">Spouse Full Name</span></Label>
              <Input placeholder="Kim, Jae Won" value={formData.spName} onChange={e => updateField('spName', e.target.value)} />
            </div>
            <div>
              <Label className="text-sm">배우자 생년도 <span className="text-[11px] text-muted-foreground/60">Spouse Birth Year</span></Label>
              <Input placeholder="1956" maxLength={4} value={formData.spBirthYear} onChange={e => updateField('spBirthYear', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      <NavButtons showPrev={false} />
    </div>
  );
}