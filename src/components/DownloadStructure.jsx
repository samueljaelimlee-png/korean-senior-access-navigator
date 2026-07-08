import React from 'react';
import { Download, FileCode } from 'lucide-react';

const APP_STRUCTURE = {
  name: 'Korean Senior Access Navigator',
  subtitle: '한인 시니어 복지 길라잡이',
  pages: [
    {
      path: '/',
      name: 'Landing (홈)',
      file: 'src/pages/Landing.jsx',
      desc: '메인 대시보드 — PAS-1 신청, 정부 혜택 안내, 유언장 가이드 3가지 메뉴 카드 제공. 처음 오신 분 이용 가이드 모달, PAS-1 한글 번역 보기, 한국어 양식 보기, 준비 서류 확인 모달 포함.',
      components: [
        'PAS1KoreanPreview — PAS-1 양식 한글 번역 모달',
        'PAS1PrepDocs — 필요 서류 안내 모달',
        'PAS1KoreanFormView — 한국어 빈양식 미리보기 모달',
        'FirstTimeGuide — 처음 오신 분 이용 가이드 (앱 설치, QR 코드)',
      ],
    },
    {
      path: '/pas1',
      name: 'PAS1Page (PAS-1 신청)',
      file: 'src/pages/PAS1Page.jsx',
      desc: 'NJ PAS-1 재산세 감면 신청 도우미 — 8단계 마법사 형태. 한글 번역 보기, 한국어 양식 보기 버튼 제공.',
      context: 'src/lib/pas1Context.jsx — PAS-1 폼 데이터 상태 관리',
      steps: [
        'Step0Eligibility — 자격 확인',
        'Step1Personal — 기본 정보 (이름, SSN, 생년, 주소)',
        'Step2Filing — 신고 상태 (Filing Status, 배우자)',
        'Step3Residency — 거주 정보 (주거 유형, Schedule 1)',
        'Step4PropertyTax — 재산세 (Block/Lot, 2024·2025 세액)',
        'Step5Income — 소득 (17f 항목)',
        'Step6Signature — 서명',
        'Step7Preview — 최종 확인 및 인쇄 (영문/한글)',
      ],
      components: [
        'ProgressBar — 8단계 진행 표시줄',
        'NavButtons — 이전/다음 이동 버튼',
        'YesNoButtons — Yes/No 선택 버튼',
        'PrintForm — 영문 PAS-1 인쇄용 양식',
        'PrintFormKorean — 한국어 PAS-1 인쇄용 양식',
        'PAS1KoreanPreview — 한글 번역 모달',
        'PAS1KoreanFormView — 한국어 빈양식 모달',
      ],
    },
    {
      path: '/benefits',
      name: 'BenefitsPage (정부 혜택 안내)',
      file: 'src/pages/BenefitsPage.jsx',
      desc: '정부 및 주정부 혜택 + Bergen County 지역 리소스를 탭으로 분리하여 제공.',
      tabs: [
        'Government Benefits — Medicare, Medicaid, SNAP, LIHEAP, SSI 등',
        'Bergen County Resources — 지역 사회복지, 정신건강, 법률, 위기 지원',
      ],
    },
    {
      path: '/will-guide',
      name: 'WillGuidePage (유언장 가이드)',
      file: 'src/pages/WillGuidePage.jsx',
      desc: '유언장 및 유산 계획 안내 — Will, Living Trust, 의료 위임장(POA), 상속 절차.',
    },
    {
      path: '/admin',
      name: 'AdminPage (관리자 대시보드)',
      file: 'src/pages/AdminPage.jsx',
      desc: '관리자 전용 — 방문자 및 PAS-1 완료 통계 (ProtectedRoute로 보호됨)',
      protected: true,
    },
    {
      path: '/login, /register, /forgot-password, /reset-password',
      name: '인증 페이지',
      desc: '로그인, 회원가입(OTP), 비밀번호 찾기/재설정 — Google OAuth 지원',
    },
  ],
  shared: [
    'AppShell — 전체 레이아웃 (헤더 네비게이션, 모바일 하단 네비)',
    'ProtectedRoute — 인증된 사용자만 접근 가능',
    'ScrollToTop — 페이지 이동 시 상단으로 스크롤',
    'UserNotRegisteredError — 미등록 사용자 에러 페이지',
  ],
  entities: [
    { name: 'Visit', desc: '방문자 추적 (session_id, page)' },
    { name: 'FormCompletion', desc: 'PAS-1 완료 추적 (session_id)' },
    { name: 'User', desc: '사용자 (내장 엔티티 — id, email, full_name, role)' },
  ],
  functions: [
    { name: 'trackActivity', desc: '방문 및 완료 추적 (visit / completion)' },
    { name: 'getAdminStats', desc: '관리자 통계 조회 (전체/오늘 방문자, 완료자)' },
  ],
};

function generateHTML() {
  const s = APP_STRUCTURE;
  const pageCards = s.pages.map(p => `
    <div class="card">
      <div class="card-header">
        <span class="badge ${p.protected ? 'badge-red' : 'badge-blue'}">${p.path}</span>
        <h3>${p.name}</h3>
        ${p.file ? `<code class="file">${p.file}</code>` : ''}
      </div>
      <p class="desc">${p.desc}</p>
      ${p.context ? `<div class="tag context">Context: ${p.context}</div>` : ''}
      ${p.steps ? `<div class="section"><h4>단계 (${p.steps.length})</h4><ul>${p.steps.map(st => `<li>${st}</li>`).join('')}</ul></div>` : ''}
      ${p.tabs ? `<div class="section"><h4>탭</h4><ul>${p.tabs.map(t => `<li>${t}</li>`).join('')}</ul></div>` : ''}
      ${p.components ? `<div class="section"><h4>컴포넌트</h4><ul>${p.components.map(c => `<li>${c}</li>`).join('')}</ul></div>` : ''}
    </div>`).join('');

  const sharedList = s.shared.map(x => `<li>${x}</li>`).join('');
  const entityList = s.entities.map(e => `<li><strong>${e.name}</strong> — ${e.desc}</li>`).join('');
  const funcList = s.functions.map(f => `<li><strong>${f.name}</strong> — ${f.desc}</li>`).join('');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${s.name} — 앱 구조도</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Noto Sans KR', -apple-system, sans-serif; background: #f0f4f8; color: #1a2a44; line-height: 1.6; padding: 24px; }
  .header { background: linear-gradient(135deg, #1b365d, #1e56d0); color: #fff; border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 24px; }
  .header h1 { font-size: 28px; margin-bottom: 8px; }
  .header p { opacity: 0.8; font-size: 16px; }
  .header .meta { margin-top: 12px; font-size: 13px; opacity: 0.6; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 20px; margin-bottom: 32px; }
  .card { background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
  .card-header { margin-bottom: 12px; }
  .card-header h3 { font-size: 18px; margin: 8px 0 4px; }
  .badge { display: inline-block; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
  .badge-blue { background: #dbeafe; color: #1e40af; }
  .badge-red { background: #fee2e2; color: #b91c1c; }
  .file { display: block; font-size: 12px; color: #64748b; background: #f1f5f9; padding: 4px 8px; border-radius: 6px; margin-top: 4px; }
  .desc { font-size: 14px; color: #475569; margin-bottom: 12px; }
  .section { margin-top: 12px; }
  .section h4 { font-size: 13px; color: #1b365d; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
  .section ul { list-style: none; }
  .section li { font-size: 13px; color: #334155; padding: 3px 0 3px 16px; position: relative; }
  .section li::before { content: '▸'; position: absolute; left: 0; color: #1e56d0; }
  .tag { display: inline-block; font-size: 12px; padding: 2px 8px; border-radius: 4px; margin-top: 4px; }
  .tag.context { background: #fef3c7; color: #92400e; }
  .bottom-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }
  .bottom-card { background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
  .bottom-card h3 { font-size: 16px; color: #1b365d; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
  .bottom-card ul { list-style: none; }
  .bottom-card li { font-size: 14px; color: #334155; padding: 4px 0; }
  .footer { text-align: center; margin-top: 32px; font-size: 13px; color: #94a3b8; }
</style>
</head>
<body>
  <div class="header">
    <h1>🌿 ${s.name}</h1>
    <p>${s.subtitle}</p>
    <div class="meta">생성일: ${new Date().toLocaleString('ko-KR')} | 페이지 수: ${s.pages.length} | 엔티티: ${s.entities.length} | 백엔드 함수: ${s.functions.length}</div>
  </div>
  <div class="grid">${pageCards}</div>
  <div class="bottom-grid">
    <div class="bottom-card">
      <h3>공유 컴포넌트</h3>
      <ul>${sharedList}</ul>
    </div>
    <div class="bottom-card">
      <h3>엔티티 (데이터)</h3>
      <ul>${entityList}</ul>
    </div>
    <div class="bottom-card">
      <h3>백엔드 함수</h3>
      <ul>${funcList}</ul>
    </div>
  </div>
  <div class="footer">© ${new Date().getFullYear()} ${s.name} — Base44 플랫폼으로 제작</div>
</body>
</html>`;
}

export default function DownloadStructure({ className }) {
  const handleDownload = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'app-structure.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all ${className || ''}`}
    >
      <Download className="w-4 h-4" /> 앱 구조도 다운로드 (HTML)
    </button>
  );
}