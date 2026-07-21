import React, { useState } from 'react';
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
import PAS1KoreanPreview from '@/components/PAS1KoreanPreview';
import PAS1KoreanFormView from '@/components/pas1/PAS1KoreanFormView';
import { Calendar, BookOpen, FileText } from 'lucide-react';

function StepRouter() {
  const { formData } = usePAS1();
  const steps = [Step0Eligibility, Step1Personal, Step2Filing, Step3Residency, Step4PropertyTax, Step5Income, Step6Signature, Step7Preview];
  const CurrentStep = steps[formData.step] || Step0Eligibility;
  return <CurrentStep />;
}

export default function PAS1Page() {
  const [showPreview, setShowPreview] = useState(false);
  const [showFormView, setShowFormView] = useState(false);
  return (
    <PAS1Provider>
      <div className="min-h-screen bg-background">
        {showPreview && <PAS1KoreanPreview onClose={() => setShowPreview(false)} />}
        {showFormView && <PAS1KoreanFormView onClose={() => setShowFormView(false)} />}
        {/* Sub-header */}
        <div className="no-print bg-blue-700 text-white px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-sm font-bold">🏠 PAS-1 재산세 감면 신청 도우미</div>
              <div className="text-[10px] text-white/70">Senior Freeze · ANCHOR · Stay NJ</div>
              <div className="text-[9px] text-white/50">PAS-1 Property Tax Relief Application Helper</div>
            </div>
            <div className="flex flex-col items-center text-xs font-semibold bg-red-600 px-2.5 py-1 rounded-full flex-shrink-0">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Nov 2</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-1.5 text-xs font-bold bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full hover:bg-yellow-300 transition-colors shadow"
            >
              <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> 한글 번역 보기</span>
              <span className="text-[9px] text-yellow-900/60">Korean Translation</span>
            </button>
            <button
              onClick={() => setShowFormView(true)}
              className="flex items-center gap-1.5 text-xs font-bold bg-white text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors shadow border border-blue-300"
            >
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> 한국어 양식 보기</span>
              <span className="text-[9px] text-blue-700/60">Korean Form</span>
            </button>
          </div>
        </div>
        <ProgressBar />
        {/* Korean preview sticky banner */}
        <div className="no-print bg-yellow-50 border-b border-yellow-200 px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-xs text-yellow-800 leading-relaxed">
            📖 영문 질문 내용이 어려우신가요? <strong>한글 번역</strong>을 옆에 띄워두고 함께 작성하세요.
          </p>
          <p className="text-[11px] text-yellow-700/60 leading-relaxed">
            Having trouble with English questions? Open the <strong>Korean translation</strong> side-by-side.
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setShowPreview(true)}
              className="flex flex-col items-center gap-0 text-xs font-bold bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full hover:bg-yellow-300 transition-colors"
            >
              <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> 한글번역</span>
              <span className="text-[9px] text-yellow-900/60">Korean</span>
            </button>
            <button
              onClick={() => setShowFormView(true)}
              className="flex flex-col items-center gap-0 text-xs font-bold bg-white text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors border border-blue-300"
            >
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> 한국어 양식</span>
              <span className="text-[9px] text-blue-700/60">Korean Form</span>
            </button>
          </div>
        </div>
        <main className="max-w-3xl mx-auto px-4 py-6 pb-24">
          <StepRouter />
        </main>
      </div>
    </PAS1Provider>
  );
}