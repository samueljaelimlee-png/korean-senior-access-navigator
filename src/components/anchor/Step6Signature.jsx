import React from 'react';
import { useAnchor } from '@/lib/anchorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NavButtons from './NavButtons';

export default function Step6Signature() {
  const { formData, updateField } = useAnchor();
  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h2 className="text-lg font-bold text-amber-900">6단계 — 서명</h2>
        <p className="text-xs text-amber-800/70">Step 6 — Signature</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 space-y-5">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
          위증 처벌을 감수하고 본 신청서의 정보가 사실이고 정확하며, 2025년 10월 1일 기준 본인이 소유(또는 임차)한 주택을 주요 주택으로 점유했음을 선언합니다.
          <br /><span className="text-blue-700/70">Under penalties of perjury, I declare the information is true and I owned/rented and occupied the property as my main home on October 1, 2025.</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm">본인 서명 (이름 입력) <span className="text-red-500 text-xs">필수</span> <span className="text-[11px] text-muted-foreground/60">Your Signature</span></Label>
            <Input placeholder="Soo Young Kim" value={formData.sigName} onChange={e => updateField('sigName', e.target.value)} />
          </div>
          <div>
            <Label className="text-sm">날짜 (Date) <span className="text-red-500 text-xs">필수</span></Label>
            <Input type="date" value={formData.sigDate} onChange={e => updateField('sigDate', e.target.value)} />
          </div>
        </div>

        {formData.hasSpouse && (
          <div>
            <Label className="text-sm">배우자/CU 파트너 서명 (공동 신고 시) <span className="text-[11px] text-muted-foreground/60">Spouse Signature (if filing jointly)</span></Label>
            <Input placeholder="Min Hee Kim" value={formData.spSigName} onChange={e => updateField('spSigName', e.target.value)} />
          </div>
        )}

        <div>
          <Label className="text-sm">낮 시간 전화번호 및/또는 이메일 (선택) <span className="text-[11px] text-muted-foreground/60">Daytime phone/email (optional)</span></Label>
          <Input placeholder="(201) 555-0148" value={formData.phone} onChange={e => updateField('phone', e.target.value)} />
        </div>
      </div>

      <NavButtons nextLabel="최종 확인" nextVariant="accent" />
    </div>
  );
}