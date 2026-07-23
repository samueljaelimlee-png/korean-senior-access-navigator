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

      {/* BODY CONTENT */}
      <div dangerouslySetInnerHTML={{ __html: IDME_CONTENT_HTML }} />
    </div>
  );
}