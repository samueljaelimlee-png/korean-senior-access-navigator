import React, { useState } from 'react';
import { X, Printer } from 'lucide-react';
import PrintFormKorean from '@/components/pas1/PrintFormKorean';

const EMPTY_DATA = {};

export default function PAS1KoreanFormView({ onClose }) {
  const [printing, setPrinting] = useState(false);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrinting(false), 500);
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4 print:static print:bg-white print:p-0 print:block">
      <div className="bg-background w-full sm:max-w-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh] print:shadow-none print:max-h-none print:w-full print:max-w-none">
        {/* Header */}
        <div className="no-print flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-foreground">PAS-1 양식 (한국어 빈양식)</h2>
            <p className="text-xs text-muted-foreground mt-0.5">신청서 작성 전에 한국어로 전체 양식을 미리 확인하세요</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Printer className="w-4 h-4" /> 인쇄 / PDF
            </button>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Notice */}
        <div className="no-print mx-5 mt-4 flex-shrink-0 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800 leading-relaxed">
          📋 이 양식은 PAS-1 신청서를 한국어로 번역한 <strong>참고용 빈양식</strong>입니다. 실제 제출은 왼쪽 "PAS-1 신청 도우미"를 이용해 작성 후 인쇄하거나, <strong>propertytaxrelief.nj.gov</strong>에서 온라인으로 제출하세요.
        </div>

        {/* Scrollable form */}
        <div className="overflow-y-auto px-5 py-4 flex-1 print:overflow-visible print:px-0 print:py-0">
          <div className="print:shadow-none print:border-0" style={{ background: '#fff', borderRadius: '8px', border: '1px solid #ddd', overflow: 'hidden' }}>
            <PrintFormKorean data={EMPTY_DATA} printOnly={printing} blank={true} />
          </div>
          <div className="h-4 no-print" />
        </div>
      </div>
    </div>
  );
}