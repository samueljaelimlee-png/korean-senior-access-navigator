import React from 'react';
import { X, Info } from 'lucide-react';

export default function PAS1BenefitInfo({ onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="bg-background w-full sm:max-w-3xl sm:rounded-2xl shadow-2xl flex flex-col h-[92vh] sm:h-auto sm:max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">PAS-1 재산세 감면 혜택 안내</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-5 py-5 flex-1 min-h-0">
          <div className="text-lg leading-relaxed text-foreground space-y-5">
            <p className="text-xl font-bold text-primary">🏠 PAS-1 통합 신청서란?</p>

            <p>
              뉴저지주의 PAS-1 Form은 <strong>65세 이상 시니어 또는 장애인 납세자</strong>를 위해 기존의 대표적인
              재산세 감면 프로그램들을 하나로 통합한 <strong>단일 신청서(Combined Application)</strong>입니다.
            </p>
            <p>
              이 신청서 한 장을 제출하면 뉴저지 주정부(Division of Taxation)에서 신청자의 소득과 주거 조건 등을
              심사하여 <strong>가장 혜택이 큰 프로그램들을 자동으로 계산해 적용</strong>해 줍니다.
            </p>
            <p>
              PAS-1을 통해 절약(세금 환급 또는 감면)할 수 있는 금액은 본인이 어떤 프로그램의 자격 요건을 충족하느냐에 따라
              달라지며, 크게 <strong>세 가지 프로그램</strong>의 혜택을 받게 됩니다.
            </p>

            {/* 1. Stay NJ */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <p className="text-xl font-bold text-green-800 mb-2">1️⃣ Stay NJ (연 소득에 따라 최대 $4,000 ~ $6,500 감면)</p>
              <p className="mb-2">65세 이상 시니어를 위해 도입된 가장 강력한 재산세 감면 프로그램입니다. <span className="text-red-700 font-semibold">(※ 2026년 예산 조정으로 소득 제한 및 한도액이 변경되었습니다.)</span></p>
              <p className="mb-1"><strong className="text-green-800">절약 금액:</strong> 연간 총 납부하는 재산세 고지서 금액의 <strong>최대 50%까지 지원</strong>합니다. 실제 지급 시에는 시니어 프리즈(Senior Freeze)와 앵커(ANCHOR) 혜택을 먼저 계산한 뒤, 부족한 차액을 Stay NJ를 통해 추가로 지원받게 됩니다. 연 소득 구간에 따른 최대 지원 한도액(타 프로그램 혜택 합산 기준)은 다음과 같습니다.</p>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                <li>연 소득 <strong>10만 달러 이하</strong>: 최대 <strong>$6,500</strong> 지원</li>
                <li>연 소득 <strong>10만 ~ 15만 달러</strong>: 최대 <strong>$5,000</strong> 지원</li>
                <li>연 소득 <strong>15만 ~ 20만 달러</strong>: 최대 <strong>$4,000</strong> 지원</li>
              </ul>
              <p className="font-bold text-green-800 mt-2">자격 요건:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>65세 이상 뉴저지 거주자</li>
                <li>연 소득 $200,000 이하 (20만 달러 초과 시 Stay NJ 대상에서 제외)</li>
                <li>뉴저지에 본인 소유의 주택을 가지고 주거주지로 사용한 경우</li>
              </ul>
            </div>

            {/* 2. Senior Freeze */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <p className="text-xl font-bold text-blue-800 mb-2">2️⃣ Senior Freeze (재산세 동결 혜택 - 매년 상승분 전액 환급)</p>
              <p className="mb-2">재산세가 매년 오르더라도, 신청 첫해(Base Year) 기준의 재산세만 납부하도록 차액을 돌려주는 프로그램입니다.</p>
              <p className="mb-1"><strong className="text-blue-800">절약 금액:</strong> 기준 연도(Base Year) 이후로 인상된 <strong>재산세 상승분 전액을 매년 돌려받습니다.</strong> 오래 거주할수록 재산세 인상 폭이 커지므로 매년 세이브되는 금액이 수천 달러에 달할 수 있습니다.</p>
              <p className="font-bold text-blue-800 mt-2">자격 요건:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>65세 이상 또는 장애인</li>
                <li>해당 주택에 최소 3년 이상 소유 및 거주</li>
                <li>소득 제한 (2024년 기준 $168,268 이하, 2025년 기준 $172,475 이하)</li>
              </ul>
            </div>

            {/* 3. ANCHOR */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
              <p className="text-xl font-bold text-amber-800 mb-2">3️⃣ ANCHOR 프로그램 (최대 $1,750 환급)</p>
              <p className="mb-2">기존의 Homestead Benefit을 대체하는 주정부의 대표적인 재산세 환급 프로그램입니다.</p>
              <p className="mb-1"><strong className="text-amber-800">절약 금액 (65세 이상 시니어 기준):</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>연 소득 $150,000 이하 주택 소유자: <strong>$1,750</strong></li>
                <li>연 소득 $150,001 ~ $250,000 주택 소유자: <strong>$1,250</strong></li>
                <li>65세 이상 렌트 거주자: <strong>$700</strong></li>
              </ul>
              <p className="font-bold text-amber-800 mt-2">자격 요건:</p>
              <p>뉴저지 거주자로 소득 및 주거 형태(소유/렌트) 조건 충족</p>
            </div>

            {/* Summary */}
            <div className="bg-primary/5 border-2 border-primary/30 rounded-xl p-4">
              <p className="text-xl font-bold text-primary mb-2">💡 요약: 총 얼마나 아낄 수 있나요?</p>
              <p className="mb-2">
                PAS-1 신청서 한 장으로 세 가지 혜택(Stay NJ, Senior Freeze, ANCHOR)의 대상 여부가 모두 검토됩니다.
              </p>
              <p>
                만약 65세 이상이고 연 소득이 $100,000 이하인 주택 소유자라면, 기본 ANCHOR 혜택 $1,750과 Senior Freeze
                상승분 환급을 먼저 적용받고, 총 혜택이 해당 소득 구간 한도인 <strong>최대 $6,500(또는 재산세의 50%)</strong>에
                미치지 못할 경우 부족한 차액을 Stay NJ를 통해 추가로 세이브할 수 있게 됩니다.
              </p>
              <p className="mt-2">
                가족분들의 연령과 소득 수준을 고려하셔서 해당 요건에 맞다면{' '}
                <strong>2026년 11월 2일(월요일) 마감일</strong> 전에 온라인이나 우편을 통해 PAS-1을{' '}
                <strong>꼭 접수하시는 것을 권장</strong>합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}