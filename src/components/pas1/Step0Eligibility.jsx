import React from 'react';
import { usePAS1 } from '@/lib/pas1Context';
import { SAMPLE_DATA } from '@/lib/pas1Data';
import YesNoButtons from './YesNoButtons';
import { Button } from '@/components/ui/button';
import { Info, CheckCircle, AlertCircle, Wand2, ArrowRight, Home, KeyRound } from 'lucide-react';

const QUESTIONS = [
  { key: 'age65', text: '2025년 12월 31일 기준 만 65세 이상이신가요?', sub: '1960년 12월 31일 이전 출생이면 해당됩니다.' },
  { key: 'disability', text: '2025년에 SSDI 또는 Railroad Retirement Disability 급여를 수령하셨나요?', sub: '65세 미만인 경우 이 조건이 충족되어야 합니다.', showIf: (d) => d.age65 === false },
  { key: 'njResident', text: '뉴저지 주 거주자이신가요?', sub: '주 거주지(main home)가 NJ에 있어야 합니다.' },
  { key: 'homeowner', text: '2025년 10월 1일 기준 NJ 주택을 소유 또는 임차하셨나요?', sub: '해당하는 항목을 선택해 주세요.', type: 'ownership' },
  { key: 'incomeLow', text: '2025년 연간 총소득이 $500,000 미만이신가요?', sub: '부부 합산 기준', showIf: (d) => d.homeowner !== 'rent' },
  { key: 'propTax', text: '해당 주택에 재산세(Property Tax)가 부과되고 있나요?', sub: '100% 장애 재향군인 재산세 면제자는 해당 없음', showIf: (d) => d.homeowner !== 'rent' },
];

const OWNERSHIP_OPTIONS = [
  { value: 'own', label: '소유 (Own)', icon: Home },
  { value: 'rent', label: '임차 (Rent)', icon: KeyRound },
  { value: false, label: '아니요 (No)', icon: AlertCircle },
];

function OwnershipButtons({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {OWNERSHIP_OPTIONS.map((opt) => {
        const Icon = opt.icon;
        const selected = value === opt.value;
        return (
          <button
            key={String(opt.value)}
            onClick={() => onChange(opt.value)}
            className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border-2 text-sm font-semibold transition-all
              ${selected
                ? 'bg-green-50 border-green-500 text-green-700'
                : 'bg-white border-gray-300 text-foreground hover:border-gray-400'}`}
          >
            <Icon className="w-5 h-5" />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function Step0Eligibility() {
  const { formData, updateField, nextStep, fillSample, setStep } = usePAS1();

  const visible = QUESTIONS.filter(q => !q.showIf || q.showIf(formData));
  const allAnswered = visible.every(q => formData[q.key] !== null);
  const isRenter = formData.homeowner === 'rent';

  const baseEligible = formData.age65 === true || formData.disability === true;
  const eligible = allAnswered && baseEligible && formData.njResident && formData.homeowner && formData.incomeLow && formData.propTax;

  return (
    <div className="space-y-4">
      <button
        onClick={() => fillSample(SAMPLE_DATA)}
        className="no-print w-full py-3 rounded-lg border-2 border-dashed border-primary bg-secondary text-primary text-sm font-semibold flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
      >
        <Wand2 className="w-4 h-4" /> 샘플 데이터 자동 채우기 (Kim, Soo Young · Palisades Park)
      </button>

      <div className="bg-card rounded-xl border border-border shadow-sm p-5">
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider pb-3 mb-4 border-b border-secondary">
          <CheckCircle className="w-4 h-4" /> STEP 0 — 자격조건 확인
        </div>

        <div className="flex gap-2 items-start p-3 rounded-lg bg-blue-50 text-primary text-sm mb-4">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>해당 여부를 선택하면 신청 가능 프로그램을 자동으로 판별해드립니다.</span>
        </div>

        <div className="space-y-4">
          {visible.map(q => (
            <div key={q.key}>
              <label className="text-sm font-medium text-foreground block mb-1">{q.text}</label>
              {q.sub && <p className="text-xs text-muted-foreground mb-2">{q.sub}</p>}
              {q.type === 'ownership' ? (
                <OwnershipButtons value={formData[q.key]} onChange={(v) => updateField(q.key, v)} />
              ) : (
                <YesNoButtons value={formData[q.key]} onChange={(v) => updateField(q.key, v)} />
              )}
            </div>
          ))}
        </div>

        {isRenter && (
          <div className="mt-4 flex flex-col gap-3 p-4 rounded-lg bg-blue-50 border-2 border-blue-300">
            <p className="text-base font-bold text-blue-900">🙋‍♂️ 세입자(Renter)이신가요? 여기서 끝입니다!</p>
            <p className="text-sm text-blue-800 leading-relaxed">
              세입자는 주택 소유주용 스케줄(Schedule)을 작성할 필요가 없습니다. 바로 마지막 페이지로 가서 서명과 날짜만 적고 우편으로 발송하시면 신청이 완료됩니다.
            </p>
            <Button
              onClick={() => { updateField('homeType', 'rent'); setStep(6); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="gap-2 bg-blue-700 hover:bg-blue-800 self-start"
            >
              서명 페이지로 바로 이동 <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {allAnswered && !isRenter && (
          <div className="mt-4">
            {eligible ? (
              <>
                <div className="flex gap-2 items-start p-3 rounded-lg bg-green-50 border-l-4 border-green-500">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800">PAS-1 신청 가능합니다</p>
                    <p className="text-sm text-green-700">아래 단계를 계속 진행하세요. 마감일: 2026년 11월 2일</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={nextStep} className="gap-2 bg-primary hover:bg-primary/90">
                    STEP 1 시작 <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex gap-2 items-start p-3 rounded-lg bg-red-50 border-l-4 border-red-500">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-800">PAS-1 신청 대상이 아닙니다</p>
                  <p className="text-sm text-red-700">65세 미만이며 장애급여 미수급자인 경우 ANCHOR 단독 신청은 2026년 여름에 별도 오픈됩니다.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}