// ID.me 가이드 — 원본 단독 HTML의 CSS와 본문 콘텐츠를 앱 내 렌더링용으로 보존.
// 언어 토글은 React 상태로 .idme-wrap 에 show-ko/show-en 클래스를 부여해 작동.

export const IDME_CSS = `
:root {
  --navy: #1B3A5C;
  --gold: #C8922A;
  --red: #C0392B;
  --green: #1A7A43;
  --sky: #EAF3FC;
  --gold-pale: #FEF3D0;
  --red-pale: #FDECEA;
  --green-pale: #EBF7F0;
  --orange: #E67E22;
  --orange-pale: #FEF0E4;
  --text: #1C2B38;
  --muted: #5D6D7E;
  --border: #D0E2F0;
  --white: #FFFFFF;
}
.idme-wrap, .idme-wrap * { margin:0; padding:0; box-sizing:border-box; }

.idme-wrap {
  font-family: 'Noto Sans KR', 'Source Sans 3', sans-serif;
  background: #F0F5FA;
  color: #1C2B38;
  font-size: 18px;
  line-height: 1.75;
  width: 100%;
  max-width: 56rem; /* max-w-4xl */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem; /* px-4 */
  padding-right: 1rem;
}

/* LANG TOGGLE */
.idme-wrap #lang-bar {
  background: #1B3A5C;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  border-radius: 12px;
  margin: 16px 0;
}
.idme-wrap .lbtn {
  padding: 6px 20px;
  border-radius: 24px;
  border: 2px solid rgba(255,255,255,0.35);
  background: transparent;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
}
.idme-wrap .lbtn.active { background: #C8922A; border-color: #C8922A; color: #1B3A5C; }
.idme-wrap .helper-badge {
  margin-left: auto;
  background: rgba(200,146,42,0.2);
  border: 1px solid #C8922A;
  color: #C8922A;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 700;
}

/* LANGUAGE CLASSES */
.idme-wrap .ko { display: block; }
.idme-wrap .en { display: none; }
.idme-wrap.show-en .ko { display: none !important; }
.idme-wrap.show-en .en { display: block !important; }

/* DISCLAIMER */
.idme-wrap .disclaimer {
  background: #FFF8E1;
  border: 2px solid #C8922A;
  border-radius: 12px;
  padding: 16px 20px;
  margin: 16px 0;
  font-size: 14px;
  color: #5D4E00;
  line-height: 1.7;
}
.idme-wrap .disclaimer strong { display: block; margin-bottom: 4px; font-size: 15px; }

/* HEADER */
.idme-wrap .app-header {
  background: linear-gradient(135deg, #1B3A5C, #2A618F);
  color: #fff;
  padding: 28px 20px 24px;
  text-align: center;
  border-radius: 16px;
  margin: 16px 0;
}
.idme-wrap .app-header .title-ko { font-size: 26px; font-weight: 900; margin-bottom: 6px; }
.idme-wrap .app-header .title-en { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
.idme-wrap .app-header .sub { font-size: 15px; opacity: 0.75; line-height: 1.6; }
.idme-wrap .app-header .why-box {
  background: rgba(200,146,42,0.15);
  border: 1px solid #C8922A;
  border-radius: 10px;
  padding: 14px 16px;
  margin-top: 16px;
  font-size: 15px;
  color: #F0D080;
  text-align: left;
  line-height: 1.8;
}

/* NAV STEPS */
.idme-wrap .step-nav {
  background: #fff;
  padding: 16px 20px;
  display: flex;
  gap: 6px;
  overflow-x: auto;
  border: 2px solid #D0E2F0;
  border-radius: 12px;
  margin: 16px 0;
  position: relative;
}
.idme-wrap .step-nav a {
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: 20px;
  background: #EAF3FC;
  color: #1B3A5C;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
}
.idme-wrap .step-nav a:hover { background: #1B3A5C; color: #fff; }

/* PREP SECTION */
.idme-wrap .prep-section {
  background: #fff;
  margin: 16px 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
}
.idme-wrap .prep-header {
  background: #1B3A5C;
  color: #fff;
  padding: 18px 22px;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 12px;
}
.idme-wrap .prep-body { padding: 20px 22px; }
.idme-wrap .prep-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid #D0E2F0;
  font-size: 17px;
}
.idme-wrap .prep-item:last-child { border-bottom: none; }
.idme-wrap .prep-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #EAF3FC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
.idme-wrap .prep-text { flex: 1; }
.idme-wrap .prep-text strong { display: block; font-size: 17px; margin-bottom: 3px; }
.idme-wrap .prep-text span { font-size: 14px; color: #5D6D7E; }

/* STEP CARD */
.idme-wrap .step-card {
  background: #fff;
  margin: 16px 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
}
.idme-wrap .step-header { padding: 18px 22px; display: flex; align-items: center; gap: 16px; }
.idme-wrap .step-header.navy { background: #1B3A5C; color: #fff; }
.idme-wrap .step-header.gold { background: #C8922A; color: #1B3A5C; }
.idme-wrap .step-header.green { background: #1A7A43; color: #fff; }
.idme-wrap .step-header.red { background: #C0392B; color: #fff; }
.idme-wrap .step-header.orange { background: #E67E22; color: #fff; }
.idme-wrap .step-number {
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; font-weight: 900; flex-shrink: 0;
}
.idme-wrap .step-title { font-size: 20px; font-weight: 900; line-height: 1.3; }
.idme-wrap .step-body { padding: 22px 22px; }

/* INSTRUCTION ITEMS */
.idme-wrap .instr { display: flex; gap: 14px; margin-bottom: 16px; align-items: flex-start; }
.idme-wrap .instr:last-child { margin-bottom: 0; }
.idme-wrap .instr-num {
  width: 32px; height: 32px; border-radius: 50%;
  background: #1B3A5C; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 900; flex-shrink: 0; margin-top: 2px;
}
.idme-wrap .instr-text { font-size: 17px; line-height: 1.8; }
.idme-wrap .instr-text strong { color: #1B3A5C; }

/* SCREEN MOCKUP */
.idme-wrap .screen-mock {
  background: #F8F9FA; border: 2px solid #D0E2F0; border-radius: 12px;
  padding: 16px; margin: 14px 0; font-size: 15px; color: #5D6D7E;
}
.idme-wrap .screen-mock .screen-title {
  font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  color: #5D6D7E; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
}
.idme-wrap .screen-btn {
  display: inline-block; background: #1B3A5C; color: #fff;
  padding: 8px 20px; border-radius: 8px; font-size: 15px; font-weight: 700; margin: 4px 0;
}
.idme-wrap .screen-btn.gold { background: #C8922A; color: #1B3A5C; }
.idme-wrap .screen-btn.green { background: #1A7A43; }

/* TIP / WARNING / INFO BOXES */
.idme-wrap .tip-box {
  border-radius: 10px; padding: 14px 18px; margin: 14px 0;
  display: flex; gap: 12px; align-items: flex-start;
  font-size: 16px; line-height: 1.7;
}
.idme-wrap .tip-box.green { background: #EBF7F0; border-left: 4px solid #1A7A43; }
.idme-wrap .tip-box.red { background: #FDECEA; border-left: 4px solid #C0392B; }
.idme-wrap .tip-box.gold { background: #FEF3D0; border-left: 4px solid #C8922A; }
.idme-wrap .tip-box.orange { background: #FEF0E4; border-left: 4px solid #E67E22; }
.idme-wrap .tip-box.navy { background: #EAF3FC; border-left: 4px solid #1B3A5C; }
.idme-wrap .tip-icon { font-size: 22px; flex-shrink: 0; margin-top: 2px; }
.idme-wrap .tip-content strong { display: block; margin-bottom: 4px; font-size: 16px; }

/* SCAM REASSURANCE */
.idme-wrap .scam-box {
  background: linear-gradient(135deg, #1B3A5C, #2A618F);
  color: #fff; border-radius: 14px; padding: 22px 20px; margin: 16px 0;
}
.idme-wrap .scam-box .scam-title {
  font-size: 20px; font-weight: 900; color: #F0D080; margin-bottom: 14px;
  display: flex; align-items: center; gap: 10px;
}
.idme-wrap .scam-check { display: flex; gap: 10px; margin-bottom: 10px; font-size: 16px; line-height: 1.7; }
.idme-wrap .scam-check::before {
  content: '✓'; color: #6BCF8E; font-weight: 900; font-size: 18px; flex-shrink: 0; margin-top: 1px;
}
.idme-wrap .scam-quote {
  background: rgba(200,146,42,0.15); border-left: 3px solid #C8922A;
  padding: 10px 14px; border-radius: 0 8px 8px 0;
  font-size: 15px; color: rgba(255,255,255,0.85); margin-top: 12px; font-style: italic;
}

/* LANG REQUEST BOX */
.idme-wrap .lang-request {
  background: #EBF7F0; border: 2px solid #1A7A43; border-radius: 12px;
  padding: 18px 20px; margin: 14px 0; font-size: 17px;
}
.idme-wrap .lang-request .lang-title { font-size: 18px; font-weight: 900; color: #1A7A43; margin-bottom: 10px; }
.idme-wrap .lang-script {
  background: #fff; border-radius: 8px; padding: 12px 16px;
  font-size: 16px; font-weight: 700; color: #1B3A5C;
  border: 1px solid #D0E2F0; margin: 6px 0;
}

/* COMPLETION */
.idme-wrap .completion-card {
  background: linear-gradient(135deg, #1A7A43, #2ECC71);
  color: #fff; border-radius: 16px; margin: 16px 0; padding: 28px 22px; text-align: center;
}
.idme-wrap .completion-card .big-check { font-size: 56px; margin-bottom: 12px; }
.idme-wrap .completion-card .comp-title { font-size: 24px; font-weight: 900; margin-bottom: 12px; }
.idme-wrap .completion-card .comp-body { font-size: 16px; opacity: 0.9; line-height: 1.8; }
.idme-wrap .comp-services { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 16px 0; text-align: left; }
.idme-wrap .comp-service { background: rgba(255,255,255,0.15); border-radius: 8px; padding: 8px 12px; font-size: 14px; font-weight: 700; }

/* STUCK SECTION */
.idme-wrap .stuck-section { background: #fff; margin: 16px 0; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.07); }
.idme-wrap .stuck-header { background: #C0392B; color: #fff; padding: 18px 22px; font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 12px; }
.idme-wrap .stuck-body { padding: 20px 22px; }
.idme-wrap .stuck-item { background: #FDECEA; border-radius: 10px; padding: 14px 18px; margin-bottom: 12px; font-size: 16px; line-height: 1.7; }
.idme-wrap .stuck-item strong { display: block; color: #C0392B; margin-bottom: 4px; font-size: 17px; }
.idme-wrap .stuck-item:last-child { margin-bottom: 0; }

/* HELPER SECTION */
.idme-wrap .helper-section { background: #1B3A5C; margin: 16px 0; border-radius: 16px; padding: 24px 22px; color: #fff; }
.idme-wrap .helper-title { font-size: 18px; font-weight: 900; color: #F0D080; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
.idme-wrap .helper-item { font-size: 15px; margin-bottom: 10px; padding-left: 20px; position: relative; line-height: 1.7; opacity: 0.9; }
.idme-wrap .helper-item::before { content: '▸'; position: absolute; left: 0; color: #C8922A; }

/* FOOTER */
.idme-wrap .footer {
  background: #1B3A5C; color: rgba(255,255,255,0.6);
  padding: 24px 20px; text-align: center; font-size: 13px; line-height: 1.8;
  margin: 16px 0; border-radius: 16px;
}
.idme-wrap .footer a { color: #C8922A; }

/* CONTACT BUTTON */
.idme-wrap .contact-btn {
  display: block; background: #C8922A; color: #1B3A5C; text-align: center;
  padding: 16px; border-radius: 12px; font-size: 18px; font-weight: 900;
  margin: 12px 0; text-decoration: none; cursor: pointer;
}
.idme-wrap .contact-btn.outline { background: transparent; border: 2px solid #C8922A; color: #C8922A; }

@media (max-width: 480px) {
  .idme-wrap { font-size: 17px; }
  .idme-wrap .app-header .title-ko { font-size: 22px; }
  .idme-wrap .step-title { font-size: 18px; }
  .idme-wrap .comp-services { grid-template-columns: 1fr; }
}
`;

export const IDME_CONTENT_HTML = `
<!-- DISCLAIMER -->
<div class="disclaimer">
  <strong class="ko">⚠️ 안내 사항</strong>
  <strong class="en">⚠️ Disclaimer</strong>
  <span class="ko">이 가이드는 한인 시니어 접근성 연구(Korean Senior Access Navigator)의 일환으로 제작된 독립 교육 자료입니다. ID.me의 공식 서비스가 아니며, ID.me와 무관한 자료입니다. 실제 인증은 ID.me 공식 사이트에서만 이루어집니다.</span>
  <span class="en">This guide is an independent educational resource produced as part of the Korean Senior Access Navigator project. It is not affiliated with or endorsed by ID.me. All actual verification occurs on ID.me's official website only.</span>
</div>

<!-- HEADER -->
<div class="app-header">
  <div class="ko">
    <div class="title-ko">🔐 ID.me 계정 만들기</div>
    <div class="sub">단계별 한국어 안내<br>헬퍼와 함께 따라하세요</div>
    <div class="why-box">
      <strong style="color:#F0D080; display:block; margin-bottom:8px;">📌 왜 ID.me 계정이 필요한가요?</strong>
      ID.me 계정이 있으면 앞으로 이 모든 서비스를 <strong style="color:#fff;">혼자</strong> 신청할 수 있습니다:<br>
      시니어 프리즈(PAS-1) · ANCHOR · Stay NJ · 소셜 시큐리티 · IRS 세금 환급 · 메디케어 · 메디케이드<br>
      <span style="font-size:14px; opacity:0.8;">계정 한 번 만들면 — 평생 사용 가능합니다.</span>
    </div>
  </div>
  <div class="en">
    <div class="title-en">🔐 Creating Your ID.me Account</div>
    <div class="sub">Step-by-Step Guide in Korean & English<br>Follow along with your helper</div>
    <div class="why-box">
      <strong style="color:#F0D080; display:block; margin-bottom:8px;">📌 Why do you need an ID.me account?</strong>
      With an ID.me account, you can independently apply for:<br>
      Senior Freeze (PAS-1) · ANCHOR · Stay NJ · Social Security · IRS refunds · Medicare · Medicaid<br>
      <span style="font-size:14px; opacity:0.8;">Create it once — use it for life.</span>
    </div>
  </div>
</div>

<!-- STEP NAV -->
<div class="step-nav">
  <a href="#prep">📋 준비물</a>
  <a href="#step1">1. 이메일</a>
  <a href="#step2">2. 접속</a>
  <a href="#step3">3. 계정생성</a>
  <a href="#step4">4. 신분증</a>
  <a href="#step5">5. 셀피</a>
  <a href="#step6">6. 화상통화</a>
  <a href="#step7">7. 완료</a>
  <a href="#stuck">도움받기</a>
</div>

<!-- ── STEP 0: PREP ── -->
<div class="prep-section" id="prep">
  <div class="prep-header">
    <span>📋</span>
    <div>
      <div class="ko">시작 전 준비물 체크리스트</div>
      <div class="en">Before You Start — Checklist</div>
    </div>
  </div>
  <div class="prep-body">
    <div class="prep-item">
      <div class="prep-icon">📱</div>
      <div class="prep-text">
        <strong class="ko">스마트폰 (카메라 있는 것)</strong>
        <strong class="en">Smartphone with camera</strong>
        <span class="ko">신분증 사진과 화상통화에 사용합니다</span>
        <span class="en">Used for ID photo and video call</span>
      </div>
    </div>
    <div class="prep-item">
      <div class="prep-icon">📧</div>
      <div class="prep-text">
        <strong class="ko">이메일 주소 (없으면 STEP 1에서 만들기)</strong>
        <strong class="en">Email address (create one in STEP 1 if needed)</strong>
        <span class="ko">Gmail 추천 · 비밀번호를 기억해두세요</span>
        <span class="en">Gmail recommended · Remember your password</span>
      </div>
    </div>
    <div class="prep-item">
      <div class="prep-icon">🪪</div>
      <div class="prep-text">
        <strong class="ko">신분증 (아래 중 하나)</strong>
        <strong class="en">Photo ID (one of the following)</strong>
        <span class="ko">운전면허증 · 여권 · 주정부 발급 ID 카드 · 영주권</span>
        <span class="en">Driver's license · Passport · State ID · Green Card</span>
      </div>
    </div>
    <div class="prep-item">
      <div class="prep-icon">🔢</div>
      <div class="prep-text">
        <strong class="ko">소셜 시큐리티 번호 (SSN)</strong>
        <strong class="en">Social Security Number (SSN)</strong>
        <span class="ko">외우고 계시거나 카드를 준비해주세요</span>
        <span class="en">Know it by heart or have your card ready</span>
      </div>
    </div>
    <div class="prep-item">
      <div class="prep-icon">🌐</div>
      <div class="prep-text">
        <strong class="ko">인터넷 연결 (WiFi 또는 데이터)</strong>
        <strong class="en">Internet connection (WiFi or mobile data)</strong>
        <span class="ko">안정적인 WiFi 환경 권장</span>
        <span class="en">Stable WiFi connection recommended</span>
      </div>
    </div>
    <div class="tip-box gold" style="margin-top:8px;">
      <div class="tip-icon">⏱️</div>
      <div class="tip-content">
        <strong class="ko">소요 시간: 약 30~60분</strong>
        <strong class="en">Time needed: approximately 30–60 minutes</strong>
        <span class="ko">여유롭게 시간을 잡으세요. 서두르지 않아도 됩니다.</span>
        <span class="en">Set aside enough time. There's no need to rush.</span>
      </div>
    </div>
  </div>
</div>

<!-- ── STEP 1: EMAIL ── -->
<div class="step-card" id="step1">
  <div class="step-header navy">
    <div class="step-number">1</div>
    <div>
      <div class="step-title ko">이메일 계정 확인 / 만들기</div>
      <div class="step-title en">Check / Create Email Account</div>
    </div>
  </div>
  <div class="step-body">
    <div class="tip-box green">
      <div class="tip-icon">✅</div>
      <div class="tip-content">
        <strong class="ko">이미 이메일이 있으면 STEP 2로 넘어가세요</strong>
        <strong class="en">If you already have email, skip to STEP 2</strong>
      </div>
    </div>
    <p class="ko" style="font-size:17px; margin-bottom:14px;">이메일이 없으시면 Gmail을 먼저 만드세요:</p>
    <p class="en" style="font-size:17px; margin-bottom:14px;">If you don't have email, create Gmail first:</p>
    <div class="instr">
      <div class="instr-num">1</div>
      <div class="instr-text ko">스마트폰에서 <strong>Gmail 앱</strong>을 찾거나, 인터넷 브라우저에서 <strong>gmail.com</strong>을 입력하세요.</div>
      <div class="instr-text en">Find the <strong>Gmail app</strong> on your phone, or type <strong>gmail.com</strong> in your browser.</div>
    </div>
    <div class="instr">
      <div class="instr-num">2</div>
      <div class="instr-text ko"><strong>"계정 만들기"</strong> 또는 <strong>"Create account"</strong> 버튼을 누르세요.</div>
      <div class="instr-text en">Tap <strong>"Create account"</strong> button.</div>
    </div>
    <div class="instr">
      <div class="instr-num">3</div>
      <div class="instr-text ko">이름, 생년월일, 원하는 이메일 주소, 비밀번호를 입력하세요.<br><strong>비밀번호를 종이에 적어두세요!</strong></div>
      <div class="instr-text en">Enter your name, birthday, email address, and password.<br><strong>Write down your password on paper!</strong></div>
    </div>
    <div class="tip-box gold">
      <div class="tip-icon">💡</div>
      <div class="tip-content">
        <strong class="ko">이메일 주소 예시</strong>
        <strong class="en">Email address example</strong>
        <span class="ko">홍길동이라면: gildonghong1950@gmail.com 같은 형식</span>
        <span class="en">Something simple you'll remember: yourname1950@gmail.com</span>
      </div>
    </div>
  </div>
</div>

<!-- ── STEP 2: ACCESS ── -->
<div class="step-card" id="step2">
  <div class="step-header navy">
    <div class="step-number">2</div>
    <div>
      <div class="step-title ko">ID.me 사이트 접속</div>
      <div class="step-title en">Go to ID.me Website</div>
    </div>
  </div>
  <div class="step-body">
    <div class="instr">
      <div class="instr-num">1</div>
      <div class="instr-text ko">스마트폰 인터넷 브라우저(사파리 또는 크롬)를 열어주세요.</div>
      <div class="instr-text en">Open your phone's internet browser (Safari or Chrome).</div>
    </div>
    <div class="instr">
      <div class="instr-num">2</div>
      <div class="instr-text ko">주소 칸에 정확히 입력하세요: <strong style="color:#1B3A5C; font-size:19px;">id.me</strong></div>
      <div class="instr-text en">In the address bar, type exactly: <strong style="color:#1B3A5C; font-size:19px;">id.me</strong></div>
    </div>
    <div class="screen-mock">
      <div class="screen-title">🌐 <span class="ko">브라우저 주소창</span><span class="en">Browser address bar</span></div>
      <div style="background:#fff; border:2px solid #1B3A5C; border-radius:8px; padding:10px 14px; font-size:18px; font-weight:700; color:#1B3A5C;">🔒 id.me</div>
    </div>
    <div class="tip-box red">
      <div class="tip-icon">⚠️</div>
      <div class="tip-content">
        <strong class="ko">주의: 반드시 직접 입력하세요</strong>
        <strong class="en">Important: Always type it yourself</strong>
        <span class="ko">이메일이나 문자로 받은 링크는 누르지 마세요. 항상 직접 id.me를 입력해서 접속하세요.</span>
        <span class="en">Never click links from emails or texts. Always type id.me directly in the address bar.</span>
      </div>
    </div>
  </div>
</div>

<!-- ── STEP 3: CREATE ACCOUNT ── -->
<div class="step-card" id="step3">
  <div class="step-header navy">
    <div class="step-number">3</div>
    <div>
      <div class="step-title ko">계정 만들기 · 이메일 인증</div>
      <div class="step-title en">Create Account · Verify Email</div>
    </div>
  </div>
  <div class="step-body">
    <div class="instr">
      <div class="instr-num">1</div>
      <div class="instr-text ko">화면에서 <strong>"Create an account"</strong> 또는 <strong>"Sign up"</strong> 버튼을 누르세요.</div>
      <div class="instr-text en">Tap <strong>"Create an account"</strong> or <strong>"Sign up"</strong> on the screen.</div>
    </div>
    <div class="instr">
      <div class="instr-num">2</div>
      <div class="instr-text ko">이메일 주소와 비밀번호를 입력하세요.</div>
      <div class="instr-text en">Enter your email address and password.</div>
    </div>
    <div class="instr">
      <div class="instr-num">3</div>
      <div class="instr-text ko">이메일로 인증 코드(숫자 6자리)가 와요. 이메일을 열어서 코드를 확인하고 입력하세요.</div>
      <div class="instr-text en">A 6-digit verification code will be sent to your email. Open your email, find the code, and enter it.</div>
    </div>
    <div class="tip-box gold">
      <div class="tip-icon">📬</div>
      <div class="tip-content">
        <strong class="ko">이메일에서 코드 찾는 법</strong>
        <strong class="en">How to find the code in your email</strong>
        <span class="ko">Gmail을 열고 받은편지함을 확인하세요. "ID.me"라는 발신자의 이메일을 찾으면 됩니다. 코드는 보통 5~10분 내에 도착해요.</span>
        <span class="en">Open Gmail and check your inbox. Find an email from "ID.me". The code usually arrives within 5–10 minutes.</span>
      </div>
    </div>
  </div>
</div>

<!-- ── STEP 4: ID UPLOAD ── -->
<div class="step-card" id="step4">
  <div class="step-header gold">
    <div class="step-number">4</div>
    <div>
      <div class="step-title ko">신분증 촬영 · 업로드</div>
      <div class="step-title en">Take Photo of ID · Upload</div>
    </div>
  </div>
  <div class="step-body">
    <div class="instr">
      <div class="instr-num">1</div>
      <div class="instr-text ko">신분증 종류를 선택하세요 (운전면허증, 여권 등).</div>
      <div class="instr-text en">Select your ID type (driver's license, passport, etc.).</div>
    </div>
    <div class="instr">
      <div class="instr-num">2</div>
      <div class="instr-text ko"><strong>"사진 찍기"</strong> 버튼을 눌러 신분증 앞면을 촬영하세요.</div>
      <div class="instr-text en">Tap <strong>"Take Photo"</strong> and photograph the front of your ID.</div>
    </div>
    <div class="instr">
      <div class="instr-num">3</div>
      <div class="instr-text ko">뒷면도 요청하면 촬영하세요.</div>
      <div class="instr-text en">If asked, photograph the back too.</div>
    </div>
    <div class="tip-box navy">
      <div class="tip-icon">📸</div>
      <div class="tip-content">
        <strong class="ko">좋은 사진 찍는 법</strong>
        <strong class="en">Tips for a good photo</strong>
        <span class="ko">• 밝은 곳에서 찍으세요<br>• 신분증 전체가 화면 안에 들어오도록<br>• 반사나 그림자 없이 선명하게<br>• 원본 신분증만 가능, 복사본 불가</span>
        <span class="en">• Take in bright light<br>• Fit the entire ID in the frame<br>• Keep it clear, no glare or shadows<br>• Original ID only, no photocopies</span>
      </div>
    </div>
    <div class="tip-box red">
      <div class="tip-icon">🔒</div>
      <div class="tip-content">
        <strong class="ko">개인정보 안전 안내</strong>
        <strong class="en">Privacy safety note</strong>
        <span class="ko">이 앱은 신분증 정보를 저장하지 않습니다. 모든 사진은 ID.me 공식 서버로만 전송됩니다.</span>
        <span class="en">This app does not store any ID information. All photos go directly to ID.me's official servers only.</span>
      </div>
    </div>
  </div>
</div>

<!-- ── STEP 5: SELFIE ── -->
<div class="step-card" id="step5">
  <div class="step-header gold">
    <div class="step-number">5</div>
    <div>
      <div class="step-title ko">셀피 촬영 (얼굴 사진)</div>
      <div class="step-title en">Take a Selfie (Face Photo)</div>
    </div>
  </div>
  <div class="step-body">
    <div class="instr">
      <div class="instr-num">1</div>
      <div class="instr-text ko">전면 카메라가 얼굴을 향하도록 스마트폰을 들어주세요.</div>
      <div class="instr-text en">Hold your phone so the front camera faces your face.</div>
    </div>
    <div class="instr">
      <div class="instr-num">2</div>
      <div class="instr-text ko">화면에 얼굴 윤곽선이 나타나면 얼굴을 그 안에 맞추세요.</div>
      <div class="instr-text en">Align your face inside the oval outline on the screen.</div>
    </div>
    <div class="instr">
      <div class="instr-num">3</div>
      <div class="instr-text ko">자동으로 촬영됩니다. 잠시 가만히 있어주세요.</div>
      <div class="instr-text en">It will photograph automatically. Hold still for a moment.</div>
    </div>
    <div class="tip-box navy">
      <div class="tip-icon">💡</div>
      <div class="tip-content">
        <strong class="ko">왜 얼굴 사진이 필요한가요?</strong>
        <strong class="en">Why is a face photo needed?</strong>
        <span class="ko">신분증 사진과 본인 얼굴을 비교해서 실제 본인임을 확인하기 위해서입니다. 이 정보는 정부 서비스 인증에만 사용됩니다.</span>
        <span class="en">To confirm you are the person on the ID by comparing photos. This is used only for government service verification.</span>
      </div>
    </div>
  </div>
</div>

<!-- ── STEP 6: VIDEO CALL ── -->
<div class="step-card" id="step6">
  <div class="step-header green">
    <div class="step-number">6</div>
    <div>
      <div class="step-title ko">화상 통화 — 에이전트와 인증</div>
      <div class="step-title en">Video Call — Verification with Agent</div>
    </div>
  </div>
  <div class="step-body">
    <div class="scam-box">
      <div class="scam-title">🛡️ <span class="ko">이것은 스캠이 아닙니다</span><span class="en">This is NOT a scam</span></div>
      <div class="ko">
        <div class="scam-check">에이전트가 집에서 편한 복장으로 연결해도 정상입니다. ID.me 에이전트들은 재택근무를 합니다.</div>
        <div class="scam-check">늦은 시간에 연결되어도 정상입니다. 24시간 운영됩니다.</div>
        <div class="scam-check">에이전트가 신분증을 보여달라고 해도 정상입니다. 본인 확인 절차입니다.</div>
        <div class="scam-check">한국어로 말해도 됩니다. 아래 안내를 참고하세요.</div>
        <div class="scam-quote">연구 인터뷰에서 발견된 사실: 에이전트의 외관이 스캠처럼 보여서 통화를 끊으신 분들이 계셨습니다. 이건 완전히 이해할 수 있는 반응이에요. 하지만 ID.me 에이전트는 진짜입니다. 헬퍼와 함께하시면 걱정 없이 완료할 수 있습니다.</div>
      </div>
      <div class="en">
        <div class="scam-check">It's normal if the agent appears casually dressed or working from home. ID.me agents work remotely.</div>
        <div class="scam-check">It's normal if it's late at night. ID.me operates 24 hours.</div>
        <div class="scam-check">It's normal if they ask to see your ID. This is the verification process.</div>
        <div class="scam-check">You can speak Korean — see the guide below.</div>
        <div class="scam-quote">Research finding: Some seniors hung up because the agent looked like a scammer. This is completely understandable. But ID.me agents are real and legitimate. With your helper beside you, you can complete this confidently.</div>
      </div>
    </div>

    <div class="lang-request">
      <div class="lang-title ko">🗣️ 한국어로 진행하는 방법</div>
      <div class="lang-title en">🗣️ How to request Korean</div>
      <div class="ko">에이전트가 연결되면 바로 이렇게 말하세요:</div>
      <div class="en">When the agent joins, say this immediately:</div>
      <div class="lang-script ko">"Please provide a Korean interpreter."</div>
      <div class="lang-script en">"Please provide a Korean interpreter."</div>
      <div style="font-size:15px; margin-top:8px; color:#5D6D7E;" class="ko">통역사가 연결됩니다. ID.me는 240개 언어를 지원합니다.</div>
      <div style="font-size:15px; margin-top:8px; color:#5D6D7E;" class="en">An interpreter will join. ID.me supports 240 languages.</div>
    </div>

    <div class="instr" style="margin-top:16px;">
      <div class="instr-num">1</div>
      <div class="instr-text ko">화면에서 <strong>"Join video call"</strong>을 누르세요. 대기 시간이 표시됩니다.</div>
      <div class="instr-text en">Tap <strong>"Join video call"</strong>. An estimated wait time will appear.</div>
    </div>
    <div class="instr">
      <div class="instr-num">2</div>
      <div class="instr-text ko">에이전트가 연결되면 "Korean interpreter" 요청을 먼저 하세요.</div>
      <div class="instr-text en">When agent joins, first request a Korean interpreter.</div>
    </div>
    <div class="instr">
      <div class="instr-num">3</div>
      <div class="instr-text ko">에이전트가 이름, 생년월일, 주소, SSN을 물어봅니다. 대답하세요.</div>
      <div class="instr-text en">The agent will ask your name, date of birth, address, and SSN. Answer clearly.</div>
    </div>
    <div class="instr">
      <div class="instr-num">4</div>
      <div class="instr-text ko">신분증을 카메라에 보여주세요. 글자가 잘 보이도록 들어주세요.</div>
      <div class="instr-text en">Show your ID to the camera. Hold it steady so the text is visible.</div>
    </div>
    <div class="instr">
      <div class="instr-num">5</div>
      <div class="instr-text ko">에이전트가 완료라고 하면 통화가 끝납니다.</div>
      <div class="instr-text en">When the agent says you're done, the call will end.</div>
    </div>

    <div class="tip-box orange">
      <div class="tip-icon">⏳</div>
      <div class="tip-content">
        <strong class="ko">대기 시간이 길 수 있어요</strong>
        <strong class="en">Wait time may be long</strong>
        <span class="ko">바쁜 시간에는 30분 이상 기다릴 수 있어요. <strong>"Schedule an appointment"</strong>를 선택하면 원하는 시간에 예약도 가능합니다.</span>
        <span class="en">During busy times, you may wait 30+ minutes. You can also select <strong>"Schedule an appointment"</strong> to book a specific time.</span>
      </div>
    </div>
  </div>
</div>

<!-- ── STEP 7: COMPLETE ── -->
<div class="completion-card" id="step7">
  <div class="big-check">🎉</div>
  <div class="comp-title ko">ID.me 계정 완료!</div>
  <div class="comp-title en">ID.me Account Complete!</div>
  <div class="comp-body ko">축하합니다! 이제 이 모든 서비스를 혼자 신청할 수 있습니다:</div>
  <div class="comp-body en">Congratulations! You can now independently access all these services:</div>
  <div class="comp-services">
    <div class="comp-service">✓ 시니어 프리즈 (PAS-1)</div>
    <div class="comp-service">✓ ANCHOR</div>
    <div class="comp-service">✓ Stay NJ</div>
    <div class="comp-service">✓ IRS 세금 환급</div>
    <div class="comp-service">✓ 소셜 시큐리티</div>
    <div class="comp-service">✓ 메디케어·메디케이드</div>
  </div>
  <div class="comp-body" style="font-size:14px; margin-top:8px; opacity:0.8;" class="ko">계정을 만든 후 마감일 전에 각 프로그램에 별도로 신청하셔야 합니다.</div>
  <div class="comp-body" style="font-size:14px; margin-top:8px; opacity:0.8;" class="en">After creating your account, you still need to apply to each program before its deadline.</div>
</div>

<!-- ── STUCK SECTION ── -->
<div class="stuck-section" id="stuck">
  <div class="stuck-header">
    <span>🆘</span>
    <div>
      <div class="ko">막혔을 때 — 상황별 해결법</div>
      <div class="en">When You're Stuck — Solutions by Situation</div>
    </div>
  </div>
  <div class="stuck-body">
    <div class="stuck-item">
      <strong class="ko">📧 이메일 인증 코드가 안 와요</strong>
      <strong class="en">📧 Verification code not arriving</strong>
      <span class="ko">받은편지함 외에 스팸함도 확인하세요. 5~10분 기다려 보세요. "코드 재발송" 버튼을 누르세요.</span>
      <span class="en">Check your spam folder. Wait 5–10 minutes. Press "Resend code" button.</span>
    </div>
    <div class="stuck-item">
      <strong class="ko">📸 신분증 사진이 계속 거부돼요</strong>
      <strong class="en">📸 ID photo keeps getting rejected</strong>
      <span class="ko">밝은 곳으로 이동하세요. 신분증을 평평한 곳에 놓고 위에서 찍어보세요. 반사(빛 번짐)가 없도록 하세요.</span>
      <span class="en">Move to a brighter area. Place ID flat on a surface and photograph from above. Avoid glare from lighting.</span>
    </div>
    <div class="stuck-item">
      <strong class="ko">📷 셀피 인식이 안 돼요</strong>
      <strong class="en">📷 Selfie not being recognized</strong>
      <span class="ko">밝은 조명 앞에 서세요. 안경을 벗어보세요. 카메라가 얼굴 정면을 향하도록 하세요.</span>
      <span class="en">Stand in front of bright light. Try removing glasses. Make sure camera faces directly at your face.</span>
    </div>
    <div class="stuck-item">
      <strong class="ko">📞 화상통화 중간에 끊겼어요</strong>
      <strong class="en">📞 Video call disconnected</strong>
      <span class="ko">처음부터 다시 접속할 필요 없어요. ID.me 앱을 다시 열고 로그인하면 이어서 할 수 있어요. 또는 "Schedule appointment"로 다시 예약하세요.</span>
      <span class="en">You don't need to start over. Re-open ID.me and log in — it will continue where you left off. Or schedule a new appointment.</span>
    </div>
    <div style="margin-top:16px;">
      <a class="contact-btn outline" href="mailto:samueljaelimlee@gmail.com">
        ✉️ samueljaelimlee@gmail.com
      </a>
    </div>
  </div>
</div>

<!-- ── HELPER MANUAL ── -->
<div class="helper-section">
  <div class="helper-title">
    📋 <span class="ko">헬퍼 매뉴얼 — 세션 진행 안내</span>
    <span class="en">Helper Manual — Session Guide</span>
  </div>
  <div class="ko">
    <div class="helper-item">세션 시작 전: 준비물 체크리스트를 함께 확인하세요. 빠진 서류가 있으면 세션을 다음으로 미루세요.</div>
    <div class="helper-item">이메일이 없는 분: STEP 1부터 함께 Gmail을 만들어드리세요. 비밀번호를 종이에 적어드리세요.</div>
    <div class="helper-item">신분증 촬영: 어르신이 직접 찍을 수 있도록 안내하세요. 헬퍼가 직접 찍으면 안 됩니다.</div>
    <div class="helper-item">SSN 입력: 어르신이 직접 입력하도록 하세요. 헬퍼는 화면을 보지 않도록 배려하세요.</div>
    <div class="helper-item">화상통화: 스캠이 아니라고 먼저 설명하세요. "제가 옆에 있으니 괜찮아요"라고 말씀드리세요.</div>
    <div class="helper-item">막혔을 때: 당황하지 마세요. 이 가이드의 "막혔을 때" 섹션을 참고하세요.</div>
    <div class="helper-item">완료 후: 축하해드리고, 다음 단계(PAS-1 신청)로 안내해드리세요.</div>
  </div>
  <div class="en">
    <div class="helper-item">Before session: Review the checklist together. If any documents are missing, reschedule.</div>
    <div class="helper-item">No email: Complete STEP 1 together to create Gmail. Write down the password on paper.</div>
    <div class="helper-item">ID photo: Guide them to take it themselves. Helpers should not handle the senior's phone for this step.</div>
    <div class="helper-item">SSN entry: Let them type it themselves. Look away to give them privacy.</div>
    <div class="helper-item">Video call: Explain it's not a scam first. Say "I'm right here, it's going to be fine."</div>
    <div class="helper-item">When stuck: Don't panic. Refer to the "When Stuck" section.</div>
    <div class="helper-item">After completion: Congratulate them and guide to next step (PAS-1 application).</div>
  </div>
</div>

<!-- FOOTER -->
<div class="footer">
  <div class="ko">
    Korean Senior Access Navigator<br>
    이 가이드는 한인 시니어 디지털 접근성 연구의 일환으로 제작됐습니다.<br>
    개발: Samuel Lee · 감독: John Yoon, CPA · Jenny H. Kim, EY Managing Director<br>
    <span style="opacity:0.5;">이 앱은 ID.me와 무관하며 정부 서비스가 아닙니다.</span>
  </div>
  <div class="en">
    Korean Senior Access Navigator<br>
    This guide was created as part of independent research on Korean senior digital accessibility.<br>
    Developer: Samuel Lee · Supervisors: John Yoon, CPA · Jenny H. Kim, EY Managing Director<br>
    <span style="opacity:0.5;">This app is not affiliated with ID.me or any government agency.</span>
  </div>
</div>
`;