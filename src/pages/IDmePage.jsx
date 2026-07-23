import React, { useState, useEffect } from 'react';
import { IDME_CSS, IDME_CONTENT_HTML } from '@/lib/idmeGuide';

export default function IDmePage() {
  const [lang, setLang] = useState('ko');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className={`idme-wrap show-${lang}`}>
      <style>{IDME_CSS}</style>

      {/* LANG BAR */}
      <div id="lang-bar">
        <button className={`lbtn ${lang === 'ko' ? 'active' : ''}`} onClick={() => setLang('ko')}>
          🇰🇷 한국어
        </button>
        <button className={`lbtn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>
          🇺🇸 English
        </button>
        <span className="helper-badge ko">📋 헬퍼 매뉴얼 포함</span>
        <span className="helper-badge en">📋 Helper Manual</span>
      </div>

      {/* GUIDE VIDEO */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md" style={{ margin: '16px 0' }}>
        <div style={{ background: '#1B3A5C', color: '#fff', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>🎬</span>
          <div>
            <div className="ko" style={{ fontSize: '18px', fontWeight: 900 }}>가이드 영상 보기</div>
            <div className="en" style={{ fontSize: '18px', fontWeight: 900 }}>Watch the Guide Video</div>
          </div>
        </div>
        <div style={{ padding: '12px' }}>
          <video
            src="https://media.base44.com/videos/public/6a27775287dfd1eb2ad7dece/a1671e939_PAS1_IDme___.mp4"
            controls
            playsInline
            preload="metadata"
            style={{ width: '100%', maxHeight: '70vh', borderRadius: '12px', background: '#000', display: 'block' }}
          />
          <p className="ko" style={{ fontSize: '14px', color: '#5D6D7E', marginTop: '8px', textAlign: 'center' }}>
            영상 재생 버튼(▶)을 눌러 단계별 안내를 함께 보세요.
          </p>
          <p className="en" style={{ fontSize: '14px', color: '#5D6D7E', marginTop: '4px', textAlign: 'center' }}>
            Press play (▶) to follow along with the step-by-step guide.
          </p>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div dangerouslySetInnerHTML={{ __html: IDME_CONTENT_HTML }} />
    </div>
  );
}