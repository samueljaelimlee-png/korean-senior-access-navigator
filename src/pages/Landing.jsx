import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, ScrollText, ArrowRight, Phone, BookOpen, FileText } from 'lucide-react';
import PAS1KoreanPreview from '@/components/PAS1KoreanPreview';
import PAS1PrepDocs from '@/components/PAS1PrepDocs';

const SECTIONS = [
  {
    path: '/pas1',
    icon: '🏠',
    iconColor: 'bg-blue-50 border-blue-200',
    badge: '마감 Nov 2, 2026',
    badgeColor: 'bg-red-100 text-red-700',
    title: 'PAS-1 재산세 감면 신청',
    subtitle: 'Property Tax Relief Application',
    desc: 'Senior Freeze · ANCHOR · Stay NJ 세 가지 재산세 혜택을 한 번에 신청하세요. 단계별 안내로 쉽게 작성하고 프린트까지 도와드립니다.',
    highlights: ['Senior Freeze (재산세 동결)', 'ANCHOR 혜택', 'Stay NJ 프로그램'],
    color: 'from-blue-600 to-blue-800',
    btnColor: 'bg-blue-700 hover:bg-blue-800',
  },
  {
    path: '/benefits',
    icon: '🎁',
    iconColor: 'bg-green-50 border-green-200',
    badge: '최신 업데이트',
    badgeColor: 'bg-green-100 text-green-700',
    title: '정부 및 주정부 혜택 안내',
    subtitle: 'Federal & State Benefits Guide',
    desc: '연방 정부와 뉴저지 주정부가 제공하는 시니어 혜택을 한눈에 확인하세요. 의료, 식품, 주거, 에너지 보조 등 다양한 프로그램을 안내합니다.',
    highlights: ['Medicare / Medicaid', 'SNAP 식품 보조', '에너지 보조 (LIHEAP)', 'SSI / SSD'],
    color: 'from-green-600 to-green-800',
    btnColor: 'bg-green-700 hover:bg-green-800',
  },
  {
    path: '/will-guide',
    icon: '📜',
    iconColor: 'bg-amber-50 border-amber-200',
    badge: '필독 가이드',
    badgeColor: 'bg-amber-100 text-amber-700',
    title: '유언장 & 유산 계획 가이드',
    subtitle: 'Will & Estate Planning Guide',
    desc: '미국에서 유언장 작성이 왜 필요한지, 어떻게 준비하는지 한국어로 쉽게 설명합니다. 자녀에게 짐을 남기지 않기 위한 첫 걸음을 도와드립니다.',
    highlights: ['유언장 (Will) 작성 안내', 'Living Trust 이해', '의료 위임장 (POA)', '상속 절차 안내'],
    color: 'from-amber-600 to-amber-800',
    btnColor: 'bg-amber-700 hover:bg-amber-800',
  },
];

export default function Landing() {
  const [showPAS1Preview, setShowPAS1Preview] = useState(false);
  const [showPAS1Prep, setShowPAS1Prep] = useState(false);
  return (
    <div className="min-h-screen bg-background pb-20">
      {showPAS1Preview && <PAS1KoreanPreview onClose={() => setShowPAS1Preview(false)} />}
      {showPAS1Prep && <PAS1PrepDocs onClose={() => setShowPAS1Prep(false)} />}
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground px-4 py-10 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-3">🌿</div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
            Korean Senior Access Navigator
          </h1>
          <p className="text-primary-foreground/80 text-sm sm:text-base mb-1">
            한인 시니어를 위한 복지 정보 길라잡이
          </p>
          <p className="text-primary-foreground/60 text-xs sm:text-sm">
            뉴저지 거주 시니어 여러분께 꼭 필요한 정보를 한국어로 제공합니다
          </p>
        </div>
      </div>

      {/* 3 Section Cards */}
      <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 gap-6">
        {SECTIONS.map((sec) => (
          <div key={sec.path} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className={`h-1.5 bg-gradient-to-r ${sec.color}`} />
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`text-3xl w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${sec.iconColor}`}>
                    {sec.icon}
                  </div>
                  <div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sec.badgeColor}`}>
                      {sec.badge}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-foreground mt-1 leading-tight">
                      {sec.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">{sec.subtitle}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {sec.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {sec.highlights.map((h) => (
                  <span key={h} className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full border border-border">
                    {h}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to={sec.path}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${sec.btnColor}`}
                >
                  바로 가기 <ArrowRight className="w-4 h-4" />
                </Link>
                {sec.path === '/pas1' && (
                  <>
                    <button
                      onClick={() => setShowPAS1Prep(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-all"
                    >
                      <FileText className="w-4 h-4" /> 준비 서류 확인
                    </button>
                    <button
                      onClick={() => setShowPAS1Preview(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 transition-all"
                    >
                      <BookOpen className="w-4 h-4" /> PAS-1폼 한글번역보기
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <div className="bg-muted rounded-xl p-4 text-xs text-muted-foreground text-center leading-relaxed">
          <div className="flex items-center justify-center gap-1 mb-1 font-semibold text-foreground">
            <Phone className="w-3 h-3" /> 도움이 필요하시면
          </div>
          NJ Division of Taxation: <strong>1-800-323-4400</strong> &nbsp;|&nbsp;
          NJ Senior Help Line: <strong>1-800-792-8820</strong>
        </div>
      </div>
    </div>
  );
}