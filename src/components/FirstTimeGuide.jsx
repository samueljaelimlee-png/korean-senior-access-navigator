import React, { useState } from 'react';
import { X, Smartphone, Share, ChevronRight, QrCode, BookOpen } from 'lucide-react';

const STEPS = [
  {
    icon: '👋',
    title: '환영합니다!',
    titleEn: 'Welcome!',
    desc: '이 사이트는 뉴저지에 사시는 한인 어르신들을 위해 만들어졌습니다. 재산세 감면 신청, 정부 혜택 안내, 유언장 가이드를 한국어로 쉽게 도와드립니다.',
    descEn: 'This site is for Korean seniors living in New Jersey. We help with property tax relief applications, government benefits, and more — in Korean.',
  },
  {
    icon: '🏠',
    title: '메뉴 선택하기',
    titleEn: 'Select a Menu',
    desc: '화면 아래쪽(또는 위쪽)에 있는 메뉴를 누르면 원하는 페이지로 이동합니다.\n\n🏠 홈 — 첫 화면\n📋 PAS-1 신청 — 재산세 감면\n🎁 정부 혜택 안내',
    descEn: 'Tap the menu at the bottom (or top) to navigate.\n\n🏠 Home — Main page\n📋 PAS-1 — Property tax relief\n🎁 Benefits Guide',
  },
  {
    icon: '✍️',
    title: 'PAS-1 신청서 작성',
    titleEn: 'Filling Out the PAS-1 Application',
    desc: 'PAS-1 신청 메뉴를 누르면 단계별로 질문이 나옵니다. 어려운 영어는 "한글 번역 보기" 버튼을 누르면 한국어로 볼 수 있습니다. 끝까지 작성하면 인쇄나 PDF 저장이 가능합니다.',
    descEn: 'Tap PAS-1 to start step-by-step questions. Use "Korean Translation" to view in Korean. When finished, you can print or save as PDF.',
  },
  {
    icon: '📱',
    title: '스마트폰에 앱 설치하기',
    titleEn: 'Install on Your Smartphone',
    desc: '이 사이트를 스마트폰에서 앱처럼 바로 쓸 수 있습니다. 아래 설명을 따라 해보세요.',
    descEn: 'Use this site like an app on your smartphone. Follow the instructions below.',
  },
];

const INSTALL_STEPS_ANDROID = [
  { num: 1, text: '스마트폰에서 이 사이트를 열어요.', en: 'Open this site on your phone.' },
  { num: 2, text: '오른쪽 위 점 3개(⋮) 메뉴를 눌러요.', en: 'Tap the 3-dot menu (⋮) in the top right.' },
  { num: 3, text: '"홈 화면에 추가" 또는 "앱 설치"를 눌러요.', en: 'Tap "Add to Home screen" or "Install app".' },
  { num: 4, text: '홈 화면에 아이콘이 생기면 완료!', en: 'An icon appears on your home screen — done!' },
];

const INSTALL_STEPS_IOS = [
  { num: 1, text: 'iPhone에서 이 사이트를 열어요.', en: 'Open this site on your iPhone.' },
  { num: 2, text: '아래쪽 "공유" 버튼(📤)을 눌러요.', en: 'Tap the "Share" button (📤) at the bottom.' },
  { num: 3, text: '"홈 화면에 추가"를 눌러요.', en: 'Tap "Add to Home Screen".' },
  { num: 4, text: '"추가"를 누르면 홈 화면에 아이콘이 생겨요!', en: 'Tap "Add" — an icon appears on your home screen!' },
];

export default function FirstTimeGuide({ onClose }) {
  const [showQR, setShowQR] = useState(false);
  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(appUrl)}`;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-xl font-bold">처음 오신 분 이용 가이드</h1>
            <p className="text-[11px] text-primary-foreground/60">First-Time User Guide</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="닫기"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Welcome banner */}
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-5 text-center">
            <div className="text-5xl mb-3">🌿</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">환영합니다!</h2>
            <p className="text-sm text-muted-foreground/60 mb-2">Welcome!</p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              처음 오신 분들을 위해<br />쉽게 사용하는 방법을 알려드립니다.
            </p>
            <p className="text-sm text-muted-foreground/60 leading-relaxed">
              Here's a simple guide for first-time users.
            </p>
          </div>

          {/* Steps */}
          {STEPS.map((step, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border shadow-sm p-5">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{step.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  {step.titleEn && <p className="text-sm text-muted-foreground/60 mb-2">{step.titleEn}</p>}
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {step.desc}
                  </p>
                  {step.descEn && (
                    <p className="text-sm text-muted-foreground/60 leading-relaxed whitespace-pre-line mt-2">
                      {step.descEn}
                    </p>
                  )}
                </div>
              </div>

              {/* Install instructions */}
              {step.title.includes('스마트폰') && (
                <div className="mt-5 space-y-4">
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Smartphone className="w-6 h-6 text-green-700" />
                      <h4 className="text-lg font-bold text-green-800">갤럭시 (Android) 설치 방법</h4>
                      <p className="text-[11px] text-green-700/60">Galaxy (Android) Installation</p>
                    </div>
                    <ol className="space-y-3">
                      {INSTALL_STEPS_ANDROID.map((s) => (
                        <li key={s.num} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-600 text-white text-base font-bold flex items-center justify-center">
                            {s.num}
                          </span>
                          <div>
                            <span className="text-lg text-foreground leading-relaxed">{s.text}</span>
                            <span className="block text-sm text-muted-foreground/60 leading-relaxed">{s.en}</span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Smartphone className="w-6 h-6 text-blue-700" />
                      <h4 className="text-lg font-bold text-blue-800">아이폰 (iPhone) 설치 방법</h4>
                      <p className="text-[11px] text-blue-700/60">iPhone (iOS) Installation</p>
                    </div>
                    <ol className="space-y-3">
                      {INSTALL_STEPS_IOS.map((s) => (
                        <li key={s.num} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-base font-bold flex items-center justify-center">
                            {s.num}
                          </span>
                          <div>
                            <span className="text-lg text-foreground leading-relaxed">{s.text}</span>
                            <span className="block text-sm text-muted-foreground/60 leading-relaxed">{s.en}</span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <p className="text-base text-muted-foreground text-center leading-relaxed">
                     💡 설치하면 인터넷 브라우저를 열지 않아도<br />바로 이 사이트를 쓸 수 있어요!
                  </p>
                  <p className="text-sm text-muted-foreground/60 text-center leading-relaxed">
                     💡 Once installed, you can use this site directly without opening a browser!
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* QR Code Section */}
          <div className="bg-accent text-accent-foreground rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <QrCode className="w-6 h-6" />
              <h3 className="text-xl font-bold">다른 분과 함께 쓰세요!</h3>
              <p className="text-[11px] text-accent-foreground/60">Share with others!</p>
            </div>
            <p className="text-lg leading-relaxed mb-1">
              아래 QR 코드를 스마트폰 카메라로 찍으면 이 사이트로 바로 올 수 있습니다. 다른 어르신들께도 공유해 주세요.
            </p>
            <p className="text-sm text-accent-foreground/60 leading-relaxed mb-4">
              Scan the QR code below with your phone camera to visit this site. Please share with other seniors.
            </p>
            <div className="bg-white rounded-xl p-4 flex flex-col items-center gap-3">
              <img src={qrUrl} alt="QR 코드" className="w-48 h-48" />
              <p className="text-base text-muted-foreground text-center">
                 📷 카메라로 이 코드를 찍으세요
              </p>
              <p className="text-xs text-muted-foreground/60 text-center">
                📷 Scan this code with your camera
              </p>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: '한인 시니어 복지 길라잡이', url: appUrl }).catch(() => {});
                } else {
                  navigator.clipboard?.writeText(appUrl);
                  alert('주소가 복사되었습니다: ' + appUrl);
                }
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 py-4 bg-white text-accent rounded-xl text-lg font-bold hover:bg-white/90 transition-colors"
            >
              <Share className="w-5 h-5" /> 공유하기 <span className="text-sm font-normal opacity-70">/ Share</span>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl text-xl font-bold hover:bg-primary/90 transition-colors"
          >
            이제 사용하기
            <span className="block text-sm font-normal opacity-70">Start Using</span>
          </button>
        </div>
      </div>
    </div>
  );
}