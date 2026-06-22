import React from 'react';
import { X } from 'lucide-react';
import PrintFormKorean from '@/components/pas1/PrintFormKorean';

const EMPTY_DATA = {};

export default function PAS1KoreanFormView({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="bg-background w-full sm:max-w-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-foreground">PAS-1 양식 (한국어 빈양식)</h2>
            <p className="text-xs text-muted-foreground mt-0.5">신청서 작성 전에 한국어로 전체 양식을 미리 확인하세요</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Notice */}
        <div className="mx-5 mt-4 flex-shrink-0 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800 leading-relaxed">
          📋 이 양식은 PAS-1 신청서를 한국어로 번역한 <strong>참고용 빈양식</strong>입니다. 실제 제출은 왼쪽 "PAS-1 신청 도우미"를 이용해 작성 후 인쇄하거나, <strong>propertytaxrelief.nj.gov</strong>에서 온라인으로 제출하세요.
        </div>

        {/* Scrollable form */}
        <div className="overflow-y-auto px-5 py-4 flex-1">
          <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #ddd', overflow: 'hidden' }}>
            <PrintFormKorean data={EMPTY_DATA} printOnly={false} />
          </div>
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}