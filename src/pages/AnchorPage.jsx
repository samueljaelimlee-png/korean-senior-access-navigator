import React from 'react';
import { AnchorProvider, useAnchor } from '@/lib/anchorContext';
import ProgressBar from '@/components/anchor/ProgressBar';
import Step0Eligibility from '@/components/anchor/Step0Eligibility';
import Step1Personal from '@/components/anchor/Step1Personal';
import Step2Filing from '@/components/anchor/Step2Filing';
import Step3Income from '@/components/anchor/Step3Income';
import Step4Residency from '@/components/anchor/Step4Residency';
import Step5Property from '@/components/anchor/Step5Property';
import Step6Signature from '@/components/anchor/Step6Signature';
import Step7Preview from '@/components/anchor/Step7Preview';
import { Calendar, ExternalLink } from 'lucide-react';

function StepRouter() {
  const { formData } = useAnchor();
  const steps = [Step0Eligibility, Step1Personal, Step2Filing, Step3Income, Step4Residency, Step5Property, Step6Signature, Step7Preview];
  const CurrentStep = steps[formData.step] || Step0Eligibility;
  return <CurrentStep />;
}

export default function AnchorPage() {
  return (
    <AnchorProvider>
      <div className="min-h-screen bg-background">
        {/* Sub-header */}
        <div className="no-print bg-amber-600 text-white px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-sm font-bold">🏡 ANCHOR 혜택 신청 도우미 (65세 미만)</div>
              <div className="text-[10px] text-white/70">ANC-1 · Homeowners &amp; Renters Under 65</div>
              <div className="text-[9px] text-white/50">NJ ANCHOR Benefit Application Helper</div>
            </div>
            <div className="flex flex-col items-center text-xs font-semibold bg-red-600 px-2.5 py-1 rounded-full flex-shrink-0">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Nov 2</span>
            </div>
          </div>
          <a href="https://anchor.nj.gov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold bg-white text-amber-700 px-3 py-1.5 rounded-full hover:bg-amber-50 transition-colors shadow">
            <span className="flex items-center gap-1.5"><ExternalLink className="w-3.5 h-3.5" /> 온라인 신청</span>
            <span className="text-[9px] text-amber-700/60">anchor.nj.gov</span>
          </a>
        </div>
        <ProgressBar />
        <main className="max-w-3xl mx-auto px-4 py-6 pb-24">
          <StepRouter />
        </main>
      </div>
    </AnchorProvider>
  );
}