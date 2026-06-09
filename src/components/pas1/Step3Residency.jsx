import React from 'react';
import { usePAS1 } from '@/lib/pas1Context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, AlertTriangle, Info, SkipForward, FileText } from 'lucide-react';
import NavButtons from './NavButtons';

/* ── Schedule 1 home entry ── */
function Sched1Home({ label, data, onChange }) {
  const upd = (field, val) => onChange({ ...data, [field]: val });
  return (
    <div className="border border-border rounded-lg p-3 space-y-3">
      <p className="text-xs font-bold text-foreground">{label}</p>
      <div>
        <Label className="text-xs">1. 주소 (Address)</Label>
        <Input className="mt-1 text-sm" placeholder="123 Main St, City, NJ" value={data.address} onChange={e => upd('address', e.target.value)} />
      </div>
      <div>
        <Label className="text-xs">2. Block / Lot / Qualifier</Label>
        <Input className="mt-1 text-sm font-mono" placeholder="Block 100 / Lot 5" value={data.blockLot} onChange={e => upd('blockLot', e.target.value)} />
      </div>
      <div>
        <Label className="text-xs">3. 2025년 거주 기간 (Dates lived in property)</Label>
        <Input className="mt-1 text-sm" placeholder="예: Jan 1 – Jun 30" value={data.dates} onChange={e => upd('dates', e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox checked={data.shared} onCheckedChange={v => upd('shared', v)} />
        <Label className="text-xs cursor-pointer">4. 배우자 외 공동소유 (Shared ownership)</Label>
      </div>
      {data.shared && (
        <div className="flex items-center gap-2 pl-5">
          <Label className="text-xs">5. 소유 비율</Label>
          <Input type="number" className="w-20 text-sm text-center font-mono" placeholder="50" value={data.sharePct} onChange={e => upd('sharePct', e.target.value)} />
          <span className="text-xs text-muted-foreground">%</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Checkbox checked={data.multiUnit} onCheckedChange={v => upd('multiUnit', v)} />
        <Label className="text-xs cursor-pointer">6. 다세대 주택 (Multiple units)</Label>
      </div>
      {data.multiUnit && (
        <div className="flex items-center gap-2 pl-5">
          <Label className="text-xs">7. 주거 사용 비율</Label>
          <Input type="number" className="w-20 text-sm text-center font-mono" placeholder="50" value={data.multiUnitPct} onChange={e => upd('multiUnitPct', e.target.value)} />
          <span className="text-xs text-muted-foreground">%</span>
        </div>
      )}
      <div>
        <Label className="text-xs">8. 2025년 재산세 합계 (Total property taxes billed) $</Label>
        <Input type="number" className="mt-1 text-sm font-mono" placeholder="5000" value={data.taxes} onChange={e => upd('taxes', e.target.value)} />
      </div>
      <div>
        <Label className="text-xs">9. P.I.L.O.T. 금액 (if applicable) $</Label>
        <Input type="number" className="mt-1 text-sm font-mono" placeholder="0" value={data.pilot} onChange={e => upd('pilot', e.target.value)} />
      </div>
    </div>
  );
}

export default function Step3Residency() {
  const { formData, updateField } = usePAS1();

  const updSched1 = (homeKey, val) => {
    updateField('sched1', { ...formData.sched1, [homeKey]: val });
  };

  // Determine current skip outcome for display
  const isRenter = formData.homeType === 'rent';
  const isMobile = formData.homeType === 'mobile';
  const is6aYes = formData.same2025 === true;
  const is6aNo = formData.same2025 === false;
  const is6bYes = formData.born1960 === true;
  const is6cYes = formData.movedWithin2025 === true;

  // What happens after 6a=No for homeowners
  const skipToSig_mobile_6aNo = isMobile && is6aNo;
  const skipToSig_6bNo = !is6aYes && formData.homeType === 'own' && is6aNo && !is6bYes;
  const skipToSig_6cNo = !is6aYes && formData.homeType === 'own' && is6aNo && is6bYes && !is6cYes;
  const showSched1 = formData.homeType === 'own' && is6aNo && is6bYes && is6cYes;

  const anySkipToSig = isRenter || skipToSig_mobile_6aNo || skipToSig_6bNo || skipToSig_6cNo;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5 space-y-5">
      <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider pb-3 border-b border-secondary">
        <Building className="w-4 h-4" /> STEP 3 — 거주 정보
      </div>

      {/* Line 4 */}
      <div className="flex items-center gap-2">
        <Checkbox checked={formData.oct1Nj} onCheckedChange={v => updateField('oct1Nj', v)} />
        <Label className="text-sm cursor-pointer">Line 4 — 2025년 10월 1일 현재 NJ 거주</Label>
      </div>

      {/* Line 5 — Home type */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Line 5 — 주거 유형</Label>
        <Select value={formData.homeType} onValueChange={v => updateField('homeType', v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="own">Homeowner — 주택 소유자</SelectItem>
            <SelectItem value="mobile">Mobile Home Owner — 모바일홈 소유자</SelectItem>
            <SelectItem value="rent">Renter — 임차인 (ANCHOR만 해당)</SelectItem>
          </SelectContent>
        </Select>
        {isRenter && (
          <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm mt-2">
            <SkipForward className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span><strong>임차인 → 서명 섹션으로 바로 이동합니다.</strong><br />
            ANCHOR만 신청 가능 (Senior Freeze · Stay NJ는 소유자만 해당)</span>
          </div>
        )}
      </div>

      {/* Lines 6a / 6b / 6c — only for homeowners and mobile home owners */}
      {!isRenter && (
        <>
          {/* 6a */}
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 space-y-3">
            <div>
              <p className="text-xs font-bold text-blue-900 mb-1">Line 6a</p>
              <p className="text-sm text-blue-900">2025년 1월 1일부터 12월 31일까지 동일한 NJ 주택을 소유하며 거주하셨나요?</p>
              <p className="text-[11px] text-blue-700 mt-1 italic">Did you own and live in the same main home in NJ from Jan 1 – Dec 31, 2025?</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => updateField('same2025', true)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${formData.same2025 === true ? 'bg-blue-700 text-white border-blue-700' : 'border-blue-300 text-blue-700 hover:bg-blue-100'}`}
              >Yes</button>
              <button
                onClick={() => updateField('same2025', false)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${formData.same2025 === false ? 'bg-blue-700 text-white border-blue-700' : 'border-blue-300 text-blue-700 hover:bg-blue-100'}`}
              >No</button>
            </div>
            {formData.same2025 === true && (
              <div className="flex items-center gap-1.5 text-xs text-blue-800 font-semibold">
                <Info className="w-3.5 h-3.5" /> Yes → Line 7로 바로 이동 (6b, 6c 건너뜀)
              </div>
            )}
          </div>

          {/* 6b — shown only when 6a = No AND homeowner */}
          {is6aNo && formData.homeType === 'own' && (
            <div className="border border-amber-200 rounded-lg p-4 bg-amber-50 space-y-3">
              <div>
                <p className="text-xs font-bold text-amber-900 mb-1">Line 6b</p>
                <p className="text-sm text-amber-900">본인 또는 배우자가 1960년생 이하입니까?</p>
                <p className="text-[11px] text-amber-700 mt-1 italic">Were you (or your spouse) born in 1960 or earlier?</p>
                <p className="text-[11px] text-amber-700">Yes → 6c 작성 &nbsp;|&nbsp; No → 서명 섹션으로 바로 이동</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => updateField('born1960', true)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${formData.born1960 === true ? 'bg-amber-600 text-white border-amber-600' : 'border-amber-400 text-amber-700 hover:bg-amber-100'}`}
                >Yes</button>
                <button
                  onClick={() => updateField('born1960', false)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${formData.born1960 === false ? 'bg-amber-600 text-white border-amber-600' : 'border-amber-400 text-amber-700 hover:bg-amber-100'}`}
                >No</button>
              </div>
              {skipToSig_6bNo && (
                <div className="flex items-center gap-1.5 text-xs text-red-700 font-semibold">
                  <SkipForward className="w-3.5 h-3.5" /> 6b = No → 서명 섹션으로 건너뜁니다 (재산세·소득 항목 생략)
                </div>
              )}
            </div>
          )}

          {/* 6c — shown only when 6a=No, homeowner, 6b=Yes */}
          {is6aNo && formData.homeType === 'own' && is6bYes && (
            <div className="border border-orange-200 rounded-lg p-4 bg-orange-50 space-y-3">
              <div>
                <p className="text-xs font-bold text-orange-900 mb-1">Line 6c</p>
                <p className="text-sm text-orange-900">2025년에 NJ 내 소유 주택에서 또 다른 NJ 소유 주택으로 이사하셨나요?</p>
                <p className="text-[11px] text-orange-700 mt-1 italic">Did you move from one owned NJ home to another owned NJ home in 2025?</p>
                <p className="text-[11px] text-orange-700">Yes → Schedule 1 작성 필요 &nbsp;|&nbsp; No → 서명 섹션으로 바로 이동</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => updateField('movedWithin2025', true)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${formData.movedWithin2025 === true ? 'bg-orange-600 text-white border-orange-600' : 'border-orange-400 text-orange-700 hover:bg-orange-100'}`}
                >Yes</button>
                <button
                  onClick={() => updateField('movedWithin2025', false)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${formData.movedWithin2025 === false ? 'bg-orange-600 text-white border-orange-600' : 'border-orange-400 text-orange-700 hover:bg-orange-100'}`}
                >No</button>
              </div>
              {skipToSig_6cNo && (
                <div className="flex items-center gap-1.5 text-xs text-red-700 font-semibold">
                  <SkipForward className="w-3.5 h-3.5" /> 6c = No → 서명 섹션으로 건너뜁니다 (재산세·소득 항목 생략)
                </div>
              )}
            </div>
          )}

          {/* 6a=No, mobile home owner → skip */}
          {skipToSig_mobile_6aNo && (
            <div className="flex gap-2 items-start p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
              <SkipForward className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span><strong>모바일홈 소유자 + 6a = No → 서명 섹션으로 바로 이동합니다.</strong></span>
            </div>
          )}
        </>
      )}

      {/* Schedule 1 — only when 6c = Yes */}
      {showSched1 && (
        <div className="border-2 border-primary/30 rounded-xl p-4 bg-primary/5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-primary">
            <FileText className="w-4 h-4" /> Schedule 1 — 2025년 이사 정보 (두 주택 모두 입력)
          </div>
          <p className="text-xs text-muted-foreground">2025년 NJ 내 소유 주택 간 이사를 하셨으므로 두 주택 모두의 정보를 아래에 입력하세요.</p>
          <Sched1Home
            label="Main Home 1 (이사 전 주택)"
            data={formData.sched1.home1}
            onChange={val => updSched1('home1', val)}
          />
          <Sched1Home
            label="Main Home 2 (이사 후 주택)"
            data={formData.sched1.home2}
            onChange={val => updSched1('home2', val)}
          />
        </div>
      )}

      {/* Skip-to-signature summary banner */}
      {anySkipToSig && (
        <div className="flex gap-2 items-start p-3 rounded-lg bg-slate-100 border border-slate-300 text-slate-700 text-sm">
          <SkipForward className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-500" />
          <div>
            <strong>다음 버튼을 누르면 재산세·소득 입력을 건너뛰고 서명 단계로 이동합니다.</strong>
            <p className="text-xs text-slate-500 mt-0.5">이는 PAS-1 양식의 공식 지시사항("Skip to Signature section")에 따른 것입니다.</p>
          </div>
        </div>
      )}

      {/* Lines 7, 8, 11a, 12a — normal residency questions (shown when not fully skipping or when 6a=Yes) */}
      {(is6aYes || showSched1) && (
        <div className="space-y-3 pt-2 border-t border-secondary">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">추가 거주 정보</p>
          <div className="flex items-center gap-2">
            <Checkbox checked={formData.sameAsLast} onCheckedChange={v => updateField('sameAsLast', v)} />
            <Label className="text-sm cursor-pointer">Line 7 — 작년 재산세 감면과 같은 주택</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={formData.since2022} onCheckedChange={v => updateField('since2022', v)} />
            <Label className="text-sm cursor-pointer">Line 8 — 2022년 12월 31일 이전부터 거주 <span className="text-green-700 font-semibold">(Senior Freeze 핵심 조건)</span></Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={formData.coOwn} onCheckedChange={v => updateField('coOwn', v)} />
            <Label className="text-sm cursor-pointer">Line 11a — 배우자 외 공동소유</Label>
          </div>
          {formData.coOwn && (
            <div className="flex items-center gap-2 pl-6">
              <Label className="text-sm">Line 11b — 본인 소유 비율</Label>
              <Input type="number" placeholder="50" className="w-20 text-center font-mono"
                value={formData.coPct} onChange={e => updateField('coPct', e.target.value)} />
              <span className="text-muted-foreground text-sm">%</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Checkbox checked={formData.multiUnit} onCheckedChange={v => updateField('multiUnit', v)} />
            <Label className="text-sm cursor-pointer">Line 12a — 다세대 주택 (multi-unit property)</Label>
          </div>
          {formData.multiUnit && (
            <div className="flex items-center gap-2 pl-6">
              <Label className="text-sm">Line 12b — 주거 사용 비율</Label>
              <Input type="number" placeholder="25" className="w-20 text-center font-mono"
                value={formData.multiUnitPct} onChange={e => updateField('multiUnitPct', e.target.value)} />
              <span className="text-muted-foreground text-sm">%</span>
            </div>
          )}
        </div>
      )}

      <NavButtons />
    </div>
  );
}