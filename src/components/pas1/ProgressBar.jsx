import React from 'react';
import { Check } from 'lucide-react';
import { usePAS1 } from '@/lib/pas1Context';

const STEPS = [
  { label: '자격확인' },
  { label: '기본정보' },
  { label: '신고상태' },
  { label: '거주정보' },
  { label: '재산세' },
  { label: '소득' },
  { label: '서명' },
  { label: '완료' },
];

export default function ProgressBar() {
  const { formData, setStep } = usePAS1();
  const current = formData.step;

  return (
    <div className="no-print bg-secondary/50 px-4 py-3 border-b border-border overflow-x-auto">
      <div className="flex items-center gap-0 max-w-3xl mx-auto">
        {STEPS.map((s, i) => {
          const isDone = i < current;
          const isActive = i === current;
          return (
            <React.Fragment key={i}>
              <div
                className="flex flex-col items-center min-w-0 flex-1 cursor-pointer"
                onClick={() => { if (i <= current + 1) setStep(i); }}
              >
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all
                  ${isDone ? 'bg-accent text-accent-foreground' : ''}
                  ${isActive ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary/30' : ''}
                  ${!isDone && !isActive ? 'bg-card border-2 border-border text-muted-foreground' : ''}
                `}>
                  {isDone ? <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> : i}
                </div>
                <span className={`text-[9px] sm:text-[10px] mt-1 text-center truncate max-w-[44px] sm:max-w-[56px]
                  ${isDone ? 'text-accent font-medium' : ''}
                  ${isActive ? 'text-primary font-semibold' : ''}
                  ${!isDone && !isActive ? 'text-muted-foreground' : ''}
                `}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mb-4 transition-colors ${i < current ? 'bg-accent' : 'bg-border'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}