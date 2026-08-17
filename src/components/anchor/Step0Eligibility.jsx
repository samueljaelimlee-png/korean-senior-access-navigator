import React from 'react';
import { useAnchor } from '@/lib/anchorContext';
import { CheckCircle2, XCircle, Sparkles, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavButtons from './NavButtons';
import { SAMPLE_DATA } from '@/lib/anchorData';

export default function Step0Eligibility() {
  const { formData, updateField, fillSample } = useAnchor();
  const eligible = formData.q1 === 'no' && formData.q2 === 'no';
  const answered = formData.q1 && formData.q2;

  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h2 className="text-lg font-bold text-amber-900">ANCHOR 혜택 자격 확인</h2>
        <p className="text-xs text-amber-800/70">ANCHOR Eligibility Check (Under 65, No Disability Benefits)</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold">1. 본인 또는 배우자가 1960년 또는 그 이전에 출생하셨나요?</p>
          <p className="text-[11px] text-muted-foreground/70">Were you or your spouse/CU partner born in 1960 or before?</p>
          <div className="flex gap-3">
            <button onClick={() => updateField('q1', 'yes')} className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold ${formData.q1 === 'yes' ? 'border-red-500 bg-red-50 text-red-700' : 'border-border bg-card'}`}>예 · Yes</button>
            <button onClick={() => updateField('q1', 'no')} className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold ${formData.q1 === 'no' ? 'border-green-500 bg-green-50 text-green-700' : 'border-border bg-card'}`}>아니오 · No</button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">2. 2025년에 사회보장 장애급여(SSDI) 또는 철도퇴직 장애급여를 수령하셨나요?</p>
          <p className="text-[11px] text-muted-foreground/70">Were you receiving Social Security Disability or Railroad Retirement Disability benefits during 2025?</p>
          <div className="flex gap-3">
            <button onClick={() => updateField('q2', 'yes')} className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold ${formData.q2 === 'yes' ? 'border-red-500 bg-red-50 text-red-700' : 'border-border bg-card'}`}>예 · Yes</button>
            <button onClick={() => updateField('q2', 'no')} className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold ${formData.q2 === 'no' ? 'border-green-500 bg-green-50 text-green-700' : 'border-border bg-card'}`}>아니오 · No</button>
          </div>
        </div>

        {answered && (
          <div className={`rounded-lg p-4 ${eligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            {eligible ? (
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-green-800">ANCHOR 신청 대상입니다!</p>
                  <p className="text-xs text-green-700/80">You are eligible to file Form ANC-1. Let's start your application.</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-red-800">PAS-1 양식을 사용하세요</p>
                  <p className="text-xs text-red-700/80 mb-2">65세 이상 또는 장애급여 수령자는 ANC-1이 아닌 PAS-1을 신청해야 합니다.</p>
                  <Link to="/pas1" className="inline-flex items-center gap-1 text-xs font-bold text-white bg-red-600 px-3 py-1.5 rounded-full">
                    <FileText className="w-3.5 h-3.5" /> PAS-1 신청으로 이동
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button onClick={() => fillSample(SAMPLE_DATA)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-full hover:bg-amber-100">
          <Sparkles className="w-3.5 h-3.5" /> 예시 데이터 채우기 · Sample Data
        </button>
      </div>

      {eligible && <NavButtons showPrev={false} />}
    </div>
  );
}