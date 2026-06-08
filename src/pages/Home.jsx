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

function AppHeader() {
  return (
    <header className="no-print bg-primary text-primary-foreground px-4 sm:px-6 py-3 sticky top-0 z-50 shadow-lg">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-sm sm:text-base font-bold flex items-center gap-2">
            🏠 NJ 재산세 감면 신청 도우미
          </h1>
          <p className="text-[11px] text-primary-foreground/70 mt-0.5">
            2025 Form PAS-1 | Senior Freeze · ANCHOR · Stay NJ
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full text-xs font-semibold text-white">
          <Calendar className="w-3 h-3" /> 마감 Nov 2, 2026
        </div>
      </div>
    </header>
  );
}

function StepRouter() {
  const { formData } = usePAS1();

  const steps = [
    Step0Eligibility,
    Step1Personal,
    Step2Filing,
    Step3Residency,
    Step4PropertyTax,
    Step5Income,
    Step6Signature,
    Step7Preview,
  ];

  const CurrentStep = steps[formData.step] || Step0Eligibility;
  return <CurrentStep />;
}

export default function Home() {
  return (
    <PAS1Provider>
      <div className="min-h-screen bg-background">
        <AppHeader />
        <ProgressBar />
        <main className="max-w-3xl mx-auto px-4 py-6 pb-20">
          <StepRouter />
        </main>
      </div>
    </PAS1Provider>
  );
}