import React from 'react';

const IDME_HTML_URL = 'https://media.base44.com/files/public/6a27775287dfd1eb2ad7dece/67ea9deea_IDme_Guide_KoreanSenior.html';

export default function IDmePage() {
  return (
    <div className="w-full h-[calc(100vh-7rem)] sm:h-[calc(100vh-3.5rem)] bg-background">
      <iframe
        src={IDME_HTML_URL}
        title="ID.me 계정 만들기 가이드 — ID.me Account & Verification Guide"
        className="w-full h-full border-0"
      />
    </div>
  );
}