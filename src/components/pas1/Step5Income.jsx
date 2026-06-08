import React from 'react';
import { usePAS1 } from '@/lib/pas1Context';
import { INCOME_ITEMS, incomeTotal, formatMoney } from '@/lib/pas1Data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import NavButtons from './NavButtons';

export default function Step5Income() {
  const { formData, updateField, updateIncome } = usePAS1();
  const yr = formData.activeIncYear;
  const d = formData.inc[yr] || {};
  const total = incomeTotal(d);
  const limit = yr === 2024 ? 168268 : 172475;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider pb-3 mb-4 border-b border-secondary">
        <DollarSign className="w-4 h-4" /> STEP 5 — 소득 정보
      </div>

      <div className="flex gap-2 items-start p-3 rounded-lg bg-blue-50 text-primary text-sm mb-4">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>소셜시큐리티만 받으시는 분: 17a에 0 입력, 17e에 SSA-1099 Box 5 금액을 입력하세요.</span>
      </div>

      {/* Year Tabs */}
      <div className="flex gap-2 mb-4">
        {[2024, 2025].map(y => (
          <button
            key={y}
            onClick={() => updateField('activeIncYear', y)}
            className={`flex-1 py-2 rounded-lg border-2 text-sm font-semibold transition-all
              ${yr === y ? 'border-primary bg-secondary text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}
          >
            {y}년 {(formData.inc[y]?.a > 0 || formData.inc[y]?.e > 0) ? '✓' : ''}
          </button>
        ))}
      </div>

      <div className="text-xs text-muted-foreground mb-3 p-2 bg-muted rounded">
        <strong>{yr}년</strong> 소득 입력 중 — NJ-1040, SSA-1099를 옆에 펼쳐두세요
      </div>

      {/* Income Table */}
      <div className="border border-border rounded-lg overflow-hidden mb-3">
        <div className="bg-primary px-4 py-2 flex justify-between items-center">
          <span className="text-primary-foreground text-sm font-semibold">PAS-1 Income — {yr}년</span>
        </div>
        {INCOME_ITEMS.map(item => (
          <div key={item.key} className="border-b border-secondary last:border-b-0">
            <div className="grid grid-cols-[40px_1fr_140px] items-center">
              <div className="px-2 py-2 text-xs font-bold text-primary">{item.ln}</div>
              <div className="px-2 py-2">
                <p className="text-sm text-foreground">{item.desc}</p>
                <p className="text-[10px] text-muted-foreground">{item.src1040}</p>
              </div>
              <div className="px-2 py-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">$</span>
                  <Input
                    type="number" step="0.01" min="0" placeholder="0"
                    className="font-mono text-sm text-right h-8"
                    value={d[item.key] || ''}
                    onChange={e => updateIncome(yr, item.key, e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Total Row */}
        <div className="bg-secondary grid grid-cols-[40px_1fr_140px] items-center border-t-2 border-primary">
          <div className="px-2 py-2 text-xs font-bold text-primary">17f</div>
          <div className="px-2 py-2 text-sm font-semibold text-primary">Total Income</div>
          <div className="px-2 py-2 text-right text-lg font-bold font-mono text-primary">
            {formatMoney(total)}
          </div>
        </div>
      </div>

      {total > 0 && (
        <div className={`flex gap-2 items-start p-3 rounded-lg text-sm ${
          total <= limit 
            ? 'bg-green-50 text-green-800' 
            : total < 500000 
              ? 'bg-amber-50 text-amber-800' 
              : 'bg-red-50 text-red-800'
        }`}>
          {total <= limit 
            ? <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            : <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          }
          <span>
            {total <= limit 
              ? `Senior Freeze 소득 기준 충족 (한도 $${limit.toLocaleString()})` 
              : total < 500000 
                ? 'Senior Freeze 기준 초과. ANCHOR/Stay NJ 가능 여부 확인' 
                : '$500,000 이상 — 모든 프로그램 신청 불가'}
          </span>
        </div>
      )}

      <NavButtons />
    </div>
  );
}