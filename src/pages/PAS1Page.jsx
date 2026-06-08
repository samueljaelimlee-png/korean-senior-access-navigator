import React from 'react';
import { PAS1Provider, usePAS1 } from '@/lib/pas1Context';
import ProgressBar from '@/components/pas1/ProgressBar';
import Step0Eligibility from '@/components/pas1/Step0Eligibility';
import Step1Personal from '@/components/pas1/Step1Personal';
import Step2Filing from '@/components/pas1/Step2Filing';
import Step3Residency from '@/components/pas1/Step3Residency';
import Step4PropertyTax from '@/components/pas1/Step4PropertyTax';
import Step5Income from '@/components/pas1/Step5Income';
import Step6Signature from '@/components/pas1/Step6Signature';
import Step7Preview from '@/components/pas1/Step7Preview';
import { Calendar } from 'lucide-react';

function StepRouter() {
  const { formData } = usePAS1();
  const steps = [Step0Eligibility, Step1Personal, Step2Filing, Step3Residency, Step4PropertyTax, Step5Income, Step6Signature, Step7Preview];
  const CurrentStep = steps[formData.step] || Step0Eligibility;
  return <CurrentStep />;
}

export default function PAS1Page() {
  return (
    <PAS1Provider>
      <div className="min-h-screen bg-background">
        {/* Sub-header */}
        <div className="no-print bg-blue-700 text-white px-4 py-2 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold">🏠 PAS-1 재산세 감면 신청 도우미</div>
            <div className="text-[10px] text-white/70">Senior Freeze · ANCHOR · Stay NJ</div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold bg-red-600 px-2.5 py-1 rounded-full">
            <Calendar className="w-3 h-3" /> 마감 Nov 2, 2026
          </div>
        </div>
        <ProgressBar />
        <main className="max-w-3xl mx-auto px-4 py-6 pb-24">
          <StepRouter />
        </main>
      </div>
    </PAS1Provider>
  );
}