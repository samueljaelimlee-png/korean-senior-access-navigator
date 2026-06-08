import React from 'react';
import { usePAS1 } from '@/lib/pas1Context';
import { FILING_STATUS_OPTIONS } from '@/lib/pas1Data';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import NavButtons from './NavButtons';

export default function Step2Filing() {
  const { formData, updateField } = usePAS1();

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider pb-3 mb-4 border-b border-secondary">
        <FileText className="w-4 h-4" /> STEP 2 — 신고 상태
      </div>

      <div className="mb-4">
        <Label className="text-sm font-medium mb-2 block">Filing Status (Line 1)</Label>
        <div className="space-y-2">
          {FILING_STATUS_OPTIONS.map(o => (
            <label
              key={o.value}
              onClick={() => updateField('filingStatus', o.value)}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all
                ${formData.filingStatus === o.value 
                  ? 'border-primary bg-secondary' 
                  : 'border-border hover:bg-muted'}`}
            >
              <input
                type="radio" name="fs" value={o.value}
                checked={formData.filingStatus === o.value}
                onChange={() => updateField('filingStatus', o.value)}
                className="mt-1 accent-primary"
              />
              <div>
                <p className={`text-sm font-medium ${formData.filingStatus === o.value ? 'text-primary' : ''}`}>{o.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{o.sub}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-secondary pt-3">
        <Label className="text-sm font-medium mb-2 block">장애급여 수령 여부</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox checked={formData.ssdi} onCheckedChange={v => updateField('ssdi', v)} />
            <Label className="text-sm cursor-pointer">Line 3a — SSDI (Social Security Disability) 수급 중</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={formData.rrd} onCheckedChange={v => updateField('rrd', v)} />
            <Label className="text-sm cursor-pointer">Line 3b — Railroad Retirement Disability 수급 중</Label>
          </div>
        </div>
      </div>

      <NavButtons />
    </div>
  );
}