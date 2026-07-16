import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, ArrowRight, BookOpen, FileText, MessageCircle, Info } from 'lucide-react';
import PAS1KoreanPreview from '@/components/PAS1KoreanPreview';
import PAS1PrepDocs from '@/components/PAS1PrepDocs';
import PAS1KoreanFormView from '@/components/pas1/PAS1KoreanFormView';
import FirstTimeGuide from '@/components/FirstTimeGuide';
import ContactForm from '@/components/ContactForm';
import PAS1BenefitInfo from '@/components/PAS1BenefitInfo';

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
];

export default function Landing() {
  const [showPAS1Preview, setShowPAS1Preview] = useState(false);
  const [showPAS1Prep, setShowPAS1Prep] = useState(false);
  const [showPAS1FormView, setShowPAS1FormView] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showBenefitInfo, setShowBenefitInfo] = useState(false);
  return (
    <div className="min-h-screen bg-background pb-20">
      {showGuide && <FirstTimeGuide onClose={() => setShowGuide(false)} />}
      {showContact && <ContactForm onClose={() => setShowContact(false)} />}
      {showPAS1Preview && <PAS1KoreanPreview onClose={() => setShowPAS1Preview(false)} />}
      {showPAS1Prep && <PAS1PrepDocs onClose={() => setShowPAS1Prep(false)} />}
      {showPAS1FormView && <PAS1KoreanFormView onClose={() => setShowPAS1FormView(false)} />}
      {showBenefitInfo && <PAS1BenefitInfo onClose={() => setShowBenefitInfo(false)} />}
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
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowGuide(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-primary rounded-full text-base font-bold hover:bg-primary-foreground/90 transition-colors shadow-lg"
            >
              <BookOpen className="w-5 h-5" /> 처음 오신 분 이용 가이드
            </button>
            <button
              onClick={() => setShowBenefitInfo(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-amber-400 text-amber-950 rounded-full text-base font-bold hover:bg-amber-300 transition-colors shadow-lg"
            >
              <Info className="w-5 h-5" /> PAS-1 혜택 자세히 보기
            </button>
          </div>
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

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Link
                  to={sec.path}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${sec.btnColor}`}
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
                    <button
                      onClick={() => setShowPAS1FormView(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-green-300 text-green-700 bg-green-50 hover:bg-green-100 transition-all"
                    >
                      <FileText className="w-4 h-4" /> 한국어 양식 보기
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer info — contact inquiry button */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <button
          onClick={() => setShowContact(true)}
          className="w-full bg-primary text-primary-foreground rounded-xl p-4 flex items-center justify-center gap-2 text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          <MessageCircle className="w-5 h-5" /> 문의하기
        </button>
      </div>
    </div>
  );
}