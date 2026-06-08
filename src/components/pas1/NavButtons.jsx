import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { usePAS1 } from '@/lib/pas1Context';

export default function NavButtons({ showPrev = true, nextLabel, nextVariant, onNext }) {
  const { prevStep, nextStep } = usePAS1();

  return (
    <div className="no-print flex gap-3 mt-6 justify-end">
      {showPrev && (
        <Button variant="outline" onClick={prevStep} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> 이전
        </Button>
      )}
      <Button
        onClick={onNext || nextStep}
        className={`gap-2 ${nextVariant === 'accent' ? 'bg-accent hover:bg-accent/90' : 'bg-primary hover:bg-primary/90'}`}
      >
        {nextVariant === 'accent' ? <Eye className="w-4 h-4" /> : null}
        {nextLabel || '다음'} 
        {nextVariant !== 'accent' && <ArrowRight className="w-4 h-4" />}
      </Button>
    </div>
  );
}