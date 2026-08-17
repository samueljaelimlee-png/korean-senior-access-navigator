import React from 'react';
import { useAnchor } from '@/lib/anchorContext';
import NavButtons from './NavButtons';
import { Home, KeyRound, XCircle } from 'lucide-react';

export default function Step4Residency() {
  const { formData, updateField } = useAnchor();
  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h2 className="text-lg font-bold text-amber-900">4단계 — 거주 정보</h2>
        <p className="text-xs text-amber-800/70">Step 4 — Residency Information</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold">5a. 2025년 10월 1일 기준 뉴저지에 주요 주택을 소유(또는 임차)하고 거주하셨나요?</p>
          <p className="text-[11px] text-muted-foreground/70">Did you own (or rent) and live in your main home in New Jersey on October 1, 2025?</p>
          <div className="flex gap-3">
            <button onClick={() => updateField('oct1Nj', true)} className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold ${formData.oct1Nj === true ? 'border-green-500 bg-green-50 text-green-700' : 'border-border'}`}>예 · Yes</button>
            <button onClick={() => updateField('oct1Nj', false)} className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold ${formData.oct1Nj === false ? 'border-red-500 bg-red-50 text-red-700' : 'border-border'}`}>아니오 · No</button>
          </div>
          {formData.oct1Nj === false && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-800">"아니오"인 경우 ANCHOR 혜택 대상이 아닙니다. 신청서를 제출하지 마세요.<br /><span className="text-red-700/70">If "No," you are not eligible. Do not file this application.</span></p>
            </div>
          )}
        </div>

        {formData.oct1Nj === true && (
          <div className="space-y-2 pt-2 border-t border-border">
            <p className="text-sm font-semibold">5b. 2025년 10월 1일 기준 거주 형태를 선택하세요.</p>
            <p className="text-[11px] text-muted-foreground/70">Indicate your residency status on October 1, 2025:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={() => updateField('homeType', 'homeowner')} className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 ${formData.homeType === 'homeowner' ? 'border-amber-500 bg-amber-50' : 'border-border'}`}>
                <Home className="w-7 h-7 text-amber-600" />
                <span className="text-sm font-bold">주택 소유자</span>
                <span className="text-[11px] text-muted-foreground/70">Homeowner</span>
              </button>
              <button onClick={() => updateField('homeType', 'renter')} className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 ${formData.homeType === 'renter' ? 'border-amber-500 bg-amber-50' : 'border-border'}`}>
                <KeyRound className="w-7 h-7 text-amber-600" />
                <span className="text-sm font-bold">임차인 / 모바일홈</span>
                <span className="text-[11px] text-muted-foreground/70">Renter / Mobile Home</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {formData.homeType && <NavButtons />}
    </div>
  );
}