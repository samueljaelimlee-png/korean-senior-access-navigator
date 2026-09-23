import React from 'react';
import { usePAS1 } from '@/lib/pas1Context';
import { Link } from 'react-router-dom';
import { SAMPLE_DATA } from '@/lib/pas1Data';
import YesNoButtons from './YesNoButtons';
import { Button } from '@/components/ui/button';
import { Info, CheckCircle, AlertCircle, Wand2, ArrowRight, Home, KeyRound } from 'lucide-react';

const QUESTIONS = [
  { key: 'age65', text: '2025년 12월 31일 기준 만 65세 이상이신가요?', en: 'Were you 65 or older as of Dec 31, 2025?', sub: '1960년 12월 31일 이전 출생이면 해당됩니다.', subEn: 'Born on or before Dec 31, 1960 qualifies.' },
  { key: 'disability', text: '2025년에 SSDI 또는 Railroad Retirement Disability 급여를 수령하셨나요?', en: 'Did you receive SSDI or Railroad Retirement Disability benefits in 2025?', sub: '65세 미만인 경우 이 조건이 충족되어야 합니다.', subEn: 'Required if under 65.', showIf: (d) => d.age65 === false },
  { key: 'njResident', text: '뉴저지 주 거주자이신가요?', en: 'Are you a New Jersey resident?', sub: '주 거주지(main home)가 NJ에 있어야 합니다.', subEn: 'Your main home must be in NJ.' },
  { key: 'homeowner', text: '2025년 10월 1일 기준 NJ 주택을 소유 또는 임차하셨나요?', en: 'Did you own or rent a NJ home as of Oct 1, 2025?', sub: '해당하는 항목을 선택해 주세요.', subEn: 'Select the option that applies to you.', type: 'ownership' },
  { key: 'incRent150', text: 'ANCHOR 확인 — 2025년 연간 총소득이 $150,000 이하이신가요?', en: 'ANCHOR check — Was your 2025 total annual income $150,000 or less?', sub: '세입자 ANCHOR 소득 한도입니다.', subEn: 'This is the ANCHOR income limit for renters.', showIf: (d) => d.homeowner === 'rent' },
  { key: 'incomeLow', text: 'ANCHOR 확인 — 2025년 연간 총소득이 $250,000 이하이신가요?', en: 'ANCHOR check — Was your 2025 total annual income $250,000 or less?', sub: '주택 소유자 ANCHOR 소득 한도입니다.', subEn: 'This is the ANCHOR income limit for homeowners.', showIf: (d) => !!d.homeowner && d.homeowner !== 'rent' },
  { key: 'stayInc200', text: 'Stay NJ 확인 — 2025년 연간 총소득이 $200,000 이하이신가요?', en: 'Stay NJ check — Was your 2025 total annual income $200,000 or less?', sub: 'Stay NJ 소득 한도입니다.', subEn: 'This is the Stay NJ income limit.', showIf: (d) => d.homeowner === 'own' },
  { key: 'stayLive2025', text: 'Stay NJ 확인 — 2025년 1월 1일부터 12월 31일까지 내내 같은 주택을 소유·거주하셨나요?', en: 'Stay NJ check — Did you own and live in the same home for all of 2025 (Jan 1 – Dec 31)?', sub: 'Stay NJ 핵심 거주 조건입니다.', subEn: 'Core Stay NJ residency requirement.', showIf: (d) => d.homeowner === 'own' },
  { key: 'sfLive2022', text: 'Senior Freeze 확인 — 2022년 12월 31일부터 지금까지 같은 주택을 소유·거주하셨나요?', en: 'Senior Freeze check — Have you owned and lived in the same home since Dec 31, 2022?', sub: 'Senior Freeze 핵심 거주 조건입니다.', subEn: 'Core Senior Freeze residency requirement.', showIf: (d) => !!d.homeowner && d.homeowner !== 'rent' },
  { key: 'sfInc2024', text: 'Senior Freeze 확인 — 2024년 연간 총소득이 $168,268 이하이신가요?', en: 'Senior Freeze check — Was your 2024 total annual income $168,268 or less?', sub: '2024년 소득 기준입니다.', subEn: '2024 income limit.', showIf: (d) => !!d.homeowner && d.homeowner !== 'rent' },
  { key: 'sfInc2025', text: 'Senior Freeze 확인 — 2025년 연간 총소득이 $172,475 이하이신가요?', en: 'Senior Freeze check — Was your 2025 total annual income $172,475 or less?', sub: '2025년 소득 기준입니다.', subEn: '2025 income limit.', showIf: (d) => !!d.homeowner && d.homeowner !== 'rent' },
  { key: 'propTax', text: '해당 주택에 재산세(Property Tax)가 부과되고 있나요?', en: 'Are property taxes charged on this home?', sub: '100% 장애 재향군인 재산세 면제자는 해당 없음', subEn: '100% disabled veteran exemptions do not qualify.', showIf: (d) => !!d.homeowner && d.homeowner !== 'rent' },
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

function ProgRow({ ok, name, okText, noText }) {
  return (
    <div className={`flex gap-2 items-start p-3 rounded-lg border-l-4 text-sm ${ok ? 'bg-green-50 border-green-500' : 'bg-slate-50 border-slate-400'}`}>
      {ok
        ? <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
        : <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-500" />}
      <div>
        <p className={`font-semibold ${ok ? 'text-green-800' : 'text-slate-600'}`}>{name} — {ok ? '신청 가능' : '해당 없음'}</p>
        <p className={`text-xs mt-0.5 leading-relaxed ${ok ? 'text-green-700' : 'text-slate-500'}`}>{ok ? okText : noText}</p>
      </div>
    </div>
  );
}

export default function Step0Eligibility() {
  const { formData, updateField, nextStep, fillSample } = usePAS1();

  const visible = QUESTIONS.filter(q => !q.showIf || q.showIf(formData));
  const allAnswered = visible.every(q => formData[q.key] !== null);
  const isRenter = formData.homeowner === 'rent';
  const isOwner = formData.homeowner === 'own';

  const baseEligible = formData.age65 === true || formData.disability === true;
  const anchorOK = isRenter
    ? formData.incRent150 === true
    : formData.incomeLow === true && formData.propTax === true;
  const anchorEligible = baseEligible && formData.njResident === true && !!formData.homeowner && anchorOK;
  const sfEligible = anchorEligible && !isRenter && formData.sfLive2022 === true && formData.sfInc2024 === true && formData.sfInc2025 === true;
  const stayEligible = anchorEligible && isOwner && formData.age65 === true && formData.stayInc200 === true && formData.stayLive2025 === true;

  return (
    <div className="space-y-4">
      <button
        onClick={() => fillSample(SAMPLE_DATA)}
        className="no-print w-full py-3 rounded-lg border-2 border-dashed border-primary bg-secondary text-primary text-sm font-semibold flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
      >
        <Wand2 className="w-4 h-4" /> 샘플 데이터 자동 채우기 (Kim, Soo Young · Palisades Park)
        <span className="block text-[10px] font-normal opacity-60">Auto-fill Sample Data</span>
      </button>

      <div className="bg-card rounded-xl border border-border shadow-sm p-5">
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider pb-3 mb-4 border-b border-secondary">
          <CheckCircle className="w-4 h-4" /> STEP 0 — 자격조건 확인
        <span className="text-[10px] text-muted-foreground/60 normal-case tracking-normal ml-6">Eligibility Check</span>
        </div>

        <div className="flex gap-2 items-start p-3 rounded-lg bg-blue-50 text-primary text-sm mb-4">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>해당 여부를 선택하면 신청 가능 프로그램을 자동으로 판별해드립니다.
            <span className="block text-[11px] text-muted-foreground/60 mt-0.5">Select your answers to automatically determine which programs you qualify for.</span>
          </span>
        </div>

        <div className="space-y-4">
          {visible.map(q => (
            <div key={q.key}>
              <label className="text-sm font-medium text-foreground block mb-1">{q.text}</label>
              {q.en && <p className="text-[11px] text-muted-foreground/60 mb-1">{q.en}</p>}
              {q.sub && <p className="text-xs text-muted-foreground mb-2">{q.sub}</p>}
              {q.subEn && <p className="text-[11px] text-muted-foreground/60 mb-2">{q.subEn}</p>}
              {q.type === 'ownership' ? (
                <OwnershipButtons value={formData[q.key]} onChange={(v) => updateField(q.key, v)} />
              ) : (
                <YesNoButtons value={formData[q.key]} onChange={(v) => updateField(q.key, v)} />
              )}
            </div>
          ))}
        </div>



        {allAnswered && (
          <div className="mt-4 space-y-2">
            <ProgRow
              ok={anchorEligible}
              name="ANCHOR"
              okText={isRenter
                ? '세입자 소득 한도($150,000 이하) 충족 · Income limit for renters met (≤ $150,000)'
                : '소유자 소득 한도($250,000 이하) 충족 · Income limit for homeowners met (≤ $250,000)'}
              noText="소득 한도 초과 — 세입자 $150,000 이하 / 소유자 $250,000 이하만 해당 · Income limit exceeded (renters ≤ $150,000 / homeowners ≤ $250,000)"
            />
            <ProgRow
              ok={sfEligible}
              name="Senior Freeze"
              okText="2022년 12월 31일부터 같은 주택 소유·거주 + 2024년 소득 $168,268 이하 + 2025년 소득 $172,475 이하 모두 충족"
              noText={isRenter
                ? '세입자는 신청 대상 아님 (소유자 전용) · Renters are not eligible'
                : '조건 미충족: 2022년 12월 31일부터 같은 주택 소유·거주 · 2024년 소득 $168,268 이하 · 2025년 소득 $172,475 이하'}
            />
            <ProgRow
              ok={stayEligible}
              name="Stay NJ"
              okText="65세 이상 + 2025년 한 해 내내 같은 주택 소유·거주 + 소득 $200,000 이하 모두 충족"
              noText={formData.homeowner !== 'own'
                ? '세입자·모바일홈 소유자는 신청 대상 아님 (주택 소유자 전용) · Renters and mobile home owners are not eligible'
                : '조건 미충족: 65세 이상 · 2025년 한 해 내내 같은 주택 소유·거주 · 소득 $200,000 이하'}
            />
          </div>
        )}

        {allAnswered && anchorEligible && (
          <>
            <div className="mt-4 flex gap-2 items-start p-3 rounded-lg bg-green-50 border-l-4 border-green-500">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-800">PAS-1 신청 가능합니다</p>
                <p className="text-[11px] text-green-600">You are eligible to apply for PAS-1</p>
                <p className="text-sm text-green-700">{isRenter ? '신청자 정보를 먼저 입력하세요.' : '아래 단계를 계속 진행하세요.'} 마감일: 2026년 11월 2일</p>
                <p className="text-[11px] text-green-600/70">Deadline: November 2, 2026</p>
              </div>
            </div>
            {isRenter ? (
              <div className="mt-4 flex flex-col gap-3 p-4 rounded-lg bg-blue-50 border-2 border-blue-300">
                <p className="text-base font-bold text-blue-900">🙋 세입자(Renter) 신청 안내</p>
                <p className="text-[11px] text-blue-700/60 font-medium">Renter Application Guide</p>
                <p className="text-sm text-blue-800 leading-relaxed">
                  세입자는 <strong>1~3단계(신청자 정보 · 신고 신분 · 거주 정보)</strong>를 모두 입력한 뒤, <strong>주택 소유자 전용 항목(재산세 · 소득)만 건너뛰고</strong> 서명 단계로 이동합니다. 신청자 정보를 건너뛰지 마세요.
                </p>
                <p className="text-sm text-blue-700/60 leading-relaxed">
                  Renters complete Steps 1–3 (personal info, filing status, residency), then skip only the homeowner sections (property tax & income) and sign.
                </p>
                <Button
                  onClick={() => { updateField('homeType', 'rent'); nextStep(); }}
                  className="gap-2 bg-blue-700 hover:bg-blue-800 self-start"
                >
                  1단계 시작 <ArrowRight className="w-4 h-4" />
                  <span className="block text-[10px] font-normal opacity-70">Start Step 1</span>
                </Button>
              </div>
            ) : (
              <div className="mt-4">
                <Button onClick={nextStep} className="gap-2 bg-primary hover:bg-primary/90">
                  STEP 1 시작 <ArrowRight className="w-4 h-4" />
                  <span className="block text-[10px] font-normal opacity-70">Start Step 1</span>
                </Button>
              </div>
            )}
          </>
        )}

        {allAnswered && !anchorEligible && (
          <div className="mt-4 flex gap-2 items-start p-3 rounded-lg bg-red-50 border-l-4 border-red-500">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-red-800">PAS-1 신청 대상이 아닙니다</p>
              <p className="text-[11px] text-red-600">You are not eligible for PAS-1</p>
              {!baseEligible ? (
                <>
                  <p className="text-sm text-red-700">65세 미만이며 장애급여 미수급자는 ANCHOR 단독 신청(ANC-1)으로 신청하세요.</p>
                  <p className="text-[11px] text-red-600/70">If under 65 without disability benefits, apply with the ANCHOR (ANC-1) application.</p>
                  <Link to="/anchor" className="inline-flex items-center gap-1 text-xs font-bold text-white bg-red-600 px-3 py-1.5 rounded-full mt-2">
                    ANCHOR 신청 페이지로 이동 <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </>
              ) : !formData.homeowner ? (
                <p className="text-sm text-red-700">2025년 10월 1일 기준 NJ 주택 소유 또는 임차에 해당하지 않습니다. 문의: 1-800-323-4400</p>
              ) : (
                <p className="text-sm text-red-700">소득 한도를 초과했습니다. 문의: 1-800-323-4400</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}