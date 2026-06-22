import React from 'react';
import { incomeTotal, formatMoney } from '@/lib/pas1Data';

/* ─── helpers ─── */
const money = (v) => {
  const n = parseFloat(String(v || 0).replace(/,/g, ''));
  if (!n || isNaN(n)) return '';
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const s = {
  page: { fontFamily: "'Noto Sans KR', Arial, Helvetica, sans-serif", fontSize: '10px', color: '#000', background: '#fff', maxWidth: '720px', margin: '0 auto', padding: '24px 32px', lineHeight: 1.45 },
  h1: { fontSize: '22px', fontWeight: '700', margin: 0, lineHeight: 1 },
  h2: { fontSize: '15px', fontWeight: '700', borderBottom: '2px solid #000', paddingBottom: '2px', marginTop: '14px', marginBottom: '6px' },
  box: { border: '1px solid #b00', background: '#fff', display: 'inline-block', minWidth: '70px', height: '17px', verticalAlign: 'bottom', padding: '0 3px', fontSize: '11px', lineHeight: '17px' },
  boxSm: { border: '1px solid #b00', background: '#fff', display: 'inline-block', minWidth: '30px', height: '17px', verticalAlign: 'bottom', padding: '0 3px', fontSize: '11px', lineHeight: '17px' },
  moneyBox: { border: '1px solid #b00', background: '#fff', display: 'inline-block', minWidth: '130px', height: '17px', verticalAlign: 'bottom', padding: '0 4px', fontSize: '11px', lineHeight: '17px', textAlign: 'right', fontFamily: 'monospace' },
  checkBox: { border: '1px solid #b00', background: '#fff', display: 'inline-block', width: '14px', height: '14px', verticalAlign: 'middle', textAlign: 'center', lineHeight: '14px', fontSize: '10px', fontWeight: 'bold' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '4px 0', borderBottom: '1px dotted #ccc' },
  label: { flex: 1, paddingRight: '8px' },
  lineNum: { fontWeight: '700', minWidth: '28px', display: 'inline-block' },
  pageHeader: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '8px', fontSize: '9px', color: '#333' },
  dividerLine: { borderTop: '1px solid #000', margin: '10px 0' },
};

const CheckBox = ({ checked }) => (
  <span style={s.checkBox}>{checked ? 'X' : ''}</span>
);

const MoneyField = ({ value }) => (
  <span style={s.moneyBox}>{money(value)}</span>
);

const TextField = ({ value, width }) => (
  <span style={{ ...s.box, minWidth: width || '120px' }}>{value || ''}</span>
);

const SmallBox = ({ value, width }) => (
  <span style={{ ...s.boxSm, minWidth: width || '30px' }}>{value || ''}</span>
);

const SSNBox = ({ last4 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1px', fontSize: '11px' }}>
    <span style={s.boxSm}>X</span><span style={s.boxSm}>X</span><span style={s.boxSm}>X</span>
    <span style={{ padding: '0 2px' }}>-</span>
    <span style={s.boxSm}>X</span><span style={s.boxSm}>X</span>
    <span style={{ padding: '0 2px' }}>-</span>
    <span style={s.boxSm}>{last4?.[0] || ''}</span>
    <span style={s.boxSm}>{last4?.[1] || ''}</span>
    <span style={s.boxSm}>{last4?.[2] || ''}</span>
    <span style={s.boxSm}>{last4?.[3] || ''}</span>
  </span>
);

const PageBreak = () => (
  <div style={{ pageBreakAfter: 'always', borderTop: '1px dashed #999', marginTop: '24px', paddingTop: '0' }} />
);

const PageHeader = ({ page, name, ssn }) => (
  <div style={s.pageHeader}>
    <div>
      <span style={{ marginRight: '40px' }}>재산세 감면 신청서상 성명: <strong>{name}</strong></span>
    </div>
    <div>본인 사회보장번호: <strong>XXX-XX-{ssn}</strong></div>
    <div style={{ marginLeft: '20px', fontWeight: '700' }}>PAS-1 (2025) {page}페이지</div>
  </div>
);

export default function PrintFormKorean({ data }) {
  const t24 = parseFloat(data.tax2024) || 0;
  const t25 = parseFloat(data.tax2025) || 0;
  const inc24 = data.inc?.[2024] || {};
  const inc25 = data.inc?.[2025] || {};
  const fullName = data.lname && data.fname ? `${data.lname}, ${data.fname}` : '';
  const sigDateFormatted = data.sigDate
    ? new Date(data.sigDate + 'T00:00:00').toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    : '';

  const fs = data.filingStatus;

  return (
    <div className="print-only" style={s.page}>

      {/* ══════════════════════════════════════
          PAGE 1
      ══════════════════════════════════════ */}
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <div style={s.h1}>2025</div>
          <div style={{ fontSize: '14px', fontWeight: '700', marginTop: '2px' }}>PAS-1</div>
        </div>
        <div style={{ textAlign: 'center', flex: 1, marginLeft: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700' }}>뉴저지 주 (State of New Jersey)</div>
          <div style={{ fontSize: '18px', fontWeight: '900' }}>재산세 감면 신청서</div>
          <div style={{ fontSize: '11px' }}>시니어 및 특정 장애 수급자 대상</div>
        </div>
      </div>

      <div style={{ fontSize: '9px', marginBottom: '8px', lineHeight: 1.6, background: '#fffde6', border: '1px solid #e6c200', padding: '6px 8px', borderRadius: '4px' }}>
        <strong>⚠️ 이 신청서는 다음 조건 중 하나에 해당할 때만 작성하세요:</strong><br />
        • 본인 또는 배우자가 1960년 이전 출생이거나, <strong>또는</strong><br />
        • 2025년 중 사회보장 장애 급여를 수령 중이거나, <strong>또는</strong><br />
        • 2025년 중 철도 퇴직 장애 급여를 수령 중인 경우.
      </div>

      {/* Top grid: SSN + Name/Address */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #b00', marginBottom: '8px' }}>
        <tbody>
          <tr>
            <td style={{ width: '35%', padding: '4px 6px', border: '1px solid #b00', verticalAlign: 'top' }}>
              <div style={{ fontSize: '9px', color: '#555', marginBottom: '2px' }}>본인 사회보장번호 (SSN)</div>
              <SSNBox last4={data.ssnLast4} />
              <div style={{ fontSize: '9px', color: '#555', margin: '6px 0 2px' }}>배우자/CU 파트너 사회보장번호</div>
              <SSNBox last4={''} />
              <div style={{ fontSize: '9px', color: '#555', margin: '6px 0 2px' }}>카운티/자치단체 코드 (15페이지 표 참조)</div>
              <span style={s.box}>{data.muniCode}</span>
            </td>
            <td style={{ padding: '4px 6px', border: '1px solid #b00', verticalAlign: 'top' }}>
              <div style={{ fontSize: '9px', color: '#555', marginBottom: '2px' }}>성, 이름 및 이니셜 (Last Name, First Name, Initial)</div>
              <div style={{ fontSize: '12px', fontWeight: '600', minHeight: '18px', borderBottom: '1px solid #ddd', paddingBottom: '2px' }}>{fullName}</div>
              <div style={{ fontSize: '9px', color: '#555', margin: '4px 0 2px' }}>자택 주소 (번지 및 도로명, 아파트 번호 포함)</div>
              <div style={{ fontSize: '11px', minHeight: '16px', borderBottom: '1px solid #ddd', paddingBottom: '2px' }}>{data.address}</div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '4px', fontSize: '9px', color: '#555' }}>
                <span>시/읍/면</span>
                <span>주: NJ</span>
                <span>우편번호</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginBottom: '8px', fontSize: '10px' }}>
        2025년 10월 1일 기준 주요 주택의 주소가 위와 다른 경우에만 입력하세요.<br />
        <span>도로명 주소: </span>
        <span style={{ ...s.box, minWidth: '300px' }}></span>
        &nbsp;&nbsp;카운티/자치단체 코드: <span style={s.box}></span>
      </div>

      <div style={{ fontSize: '9px', marginBottom: '10px', lineHeight: 1.5, borderTop: '1px solid #000', paddingTop: '4px' }}>
        <strong>이 신청서는 재산세 환급(Senior Freeze), ANCHOR 혜택, Stay NJ 프로그램을 함께 신청하는 통합 신청서입니다.</strong> 세무청에서 이 혜택들의 자격 여부를 판단하는 데 필요한 정보를 수집합니다.
      </div>

      {/* Filing Status */}
      <div style={s.h2}>신고 신분 (Filing Status)</div>
      <div style={{ marginBottom: '6px', fontSize: '10px' }}>
        <div><span style={s.lineNum}>1.</span> 2025년 NJ-1040 신고서상 본인의 신고 신분을 선택하세요:</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginTop: '4px', paddingLeft: '16px' }}>
          <div><CheckBox checked={fs === 'A'} /> A.&nbsp;&nbsp;미혼 (Single)</div>
          <div><CheckBox checked={fs === 'E'} /> E.&nbsp;&nbsp;기혼/CU 각자 신고 — <strong>별도</strong> 거주지 유지</div>
          <div><CheckBox checked={fs === 'B'} /> B.&nbsp;&nbsp;세대주 (Head of Household)</div>
          <div><CheckBox checked={fs === 'F'} /> F.&nbsp;&nbsp;같은 거주지에서 <strong>함께</strong> 거주</div>
          <div><CheckBox checked={fs === 'C'} /> C.&nbsp;&nbsp;자격 있는 생존 배우자 (Qualifying Widow(er))</div>
          <div></div>
          <div><CheckBox checked={fs === 'D'} /> D.&nbsp;&nbsp;기혼/CU 공동 신고 (joint return)</div>
        </div>
      </div>

      {/* Age & Disability */}
      <div style={s.h2}>나이 및 장애 여부 (해당하는 항목 모두 표시)</div>
      <div style={{ fontSize: '10px', marginBottom: '6px' }}>
        <div style={{ display: 'flex', gap: '40px', marginBottom: '4px' }}>
          <div><span style={s.lineNum}>2.</span> 본인 출생 연도: <span style={s.box}>{data.birthYear}</span></div>
          <div>배우자/CU 파트너 출생 연도: <span style={s.box}>{data.spBirthYear}</span></div>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>3a.</span> 2025년 중 연방 사회보장 장애 급여(SSDI)를 <strong>수령</strong>하셨나요?</span>
          <span>본인 &nbsp;<CheckBox checked={data.ssdi} /> 예 &nbsp;<CheckBox checked={!data.ssdi} /> 아니오 &nbsp;&nbsp;&nbsp; 배우자 &nbsp;<CheckBox checked={false} /> 예 &nbsp;<CheckBox checked={true} /> 아니오</span>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>3b.</span> 2025년 중 철도 퇴직 장애 급여를 <strong>수령</strong>하셨나요?</span>
          <span>본인 &nbsp;<CheckBox checked={data.rrd} /> 예 &nbsp;<CheckBox checked={!data.rrd} /> 아니오 &nbsp;&nbsp;&nbsp; 배우자 &nbsp;<CheckBox checked={false} /> 예 &nbsp;<CheckBox checked={true} /> 아니오</span>
        </div>
      </div>

      {/* Residency Information */}
      <div style={s.h2}>거주 정보 (Residency Information)</div>
      <div style={{ fontSize: '10px' }}>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>4.</span> 2025년 <strong>10월 1일</strong> 기준으로 뉴저지에 주요 주택(본인 거주지)을 소유 또는 임차하고 계셨나요?</span>
          <span><CheckBox checked={data.oct1Nj} /> 예 &nbsp;<CheckBox checked={!data.oct1Nj} /> 아니오</span>
        </div>
        <div style={{ padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
          <span style={s.lineNum}>5.</span> 2025년 <strong>10월 1일</strong> 기준 거주 상태를 표시하세요:
          &nbsp;&nbsp;
          <CheckBox checked={data.homeType === 'own'} /> 주택 소유자 &nbsp;&nbsp;
          <CheckBox checked={data.homeType === 'mobile'} /> 모바일홈 소유자 &nbsp;&nbsp;
          <CheckBox checked={data.homeType === 'rent'} /> 임차인 → 서명 섹션으로 이동
        </div>
        <div style={s.row}>
          <span style={s.label}>
            <span style={s.lineNum}>6a.</span> 2025년 <strong>1월 1일부터 12월 31일까지</strong> 같은 뉴저지 주택을 소유하며 거주하셨나요?
            <span style={{ fontSize: '8px', color: '#555', display: 'block', marginTop: '2px' }}>
              "예" → 7번으로 이동 &nbsp;|&nbsp; "아니오"(주택 소유자) → 6b로 이동 &nbsp;|&nbsp; "아니오"(모바일홈 소유자) → 서명 섹션으로 이동
            </span>
          </span>
          <span><CheckBox checked={data.same2025} /> 예 &nbsp;<CheckBox checked={!data.same2025} /> 아니오</span>
        </div>
        <div style={{ ...s.row, opacity: data.same2025 ? 0.35 : 1 }}>
          <span style={s.label}>
            <span style={s.lineNum}>6b.</span> 본인(또는 배우자)이 1960년 이전 출생입니까?
            {data.same2025 && <span style={{ fontSize: '8px', color: '#b00', marginLeft: '6px' }}>(건너뜀 — 6a = 예)</span>}
          </span>
          <span>
            <CheckBox checked={!data.same2025 && parseInt(data.birthYear) <= 1960} /> 예 &nbsp;
            <CheckBox checked={!data.same2025 && parseInt(data.birthYear) > 1960} /> 아니오
          </span>
        </div>
        <div style={{ ...s.row, opacity: data.same2025 ? 0.35 : 1 }}>
          <span style={s.label}>
            <span style={s.lineNum}>6c.</span> 2025년에 본인이 <strong>소유한</strong> 뉴저지 주택에서 또 다른 본인 소유의 뉴저지 주택으로 이사하셨나요?
            {data.same2025 && <span style={{ fontSize: '8px', color: '#b00', marginLeft: '6px' }}>(건너뜀 — 6a = 예)</span>}
          </span>
          <span>
            <CheckBox checked={!data.same2025 && data.movedWithin2025} /> 예 &nbsp;
            <CheckBox checked={!data.same2025 && !data.movedWithin2025} /> 아니오
          </span>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>7.</span> 작년 재산세 감면 혜택과 동일한 주택에 대해 이 신청서를 제출하시나요?</span>
          <span><CheckBox checked={data.sameAsLast} /> 예 &nbsp;<CheckBox checked={!data.sameAsLast} /> 아니오</span>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>8.</span> 2025년 12월 31일 기준, <strong>2022년 12월 31일 또는 그 이전부터</strong> 같은 뉴저지 주택을 소유하며 거주하고 계십니까? ⭐ Senior Freeze 핵심 조건</span>
          <span><CheckBox checked={data.since2022} /> 예 &nbsp;<CheckBox checked={!data.since2022} /> 아니오</span>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>9.</span> <strong>2023년 1월 1일 ~ 2023년 12월 31일</strong> 사이에 현재 거주지로 이사하셨나요?</span>
          <span><CheckBox checked={data.moved2023} /> 예 &nbsp;<CheckBox checked={!data.moved2023} /> 아니오</span>
        </div>
      </div>

      <PageBreak />

      {/* ══════════════════════════════════════
          PAGE 2
      ══════════════════════════════════════ */}
      <PageHeader page={2} name={fullName} ssn={data.ssnLast4} />

      <div style={s.h2}>주요 거주지 (Principal Residence / Main Home)</div>
      <div style={{ fontSize: '10px' }}>
        <div style={{ padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
          <span style={s.lineNum}>10.</span> 2025년 10월 1일 기준 주택이 협동조합(Co-op) 또는 지속 돌봄 은퇴 시설(CCRC)의 유닛이라면 유형을 표시하세요:
          &nbsp;<CheckBox checked={false} /> 협동조합(Co-op) &nbsp; 또는 &nbsp;<CheckBox checked={false} /> 지속 돌봄 은퇴 시설
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '6px', fontSize: '10px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', fontWeight: 'normal', paddingRight: '8px' }}></th>
              <th style={{ width: '100px', textAlign: 'center', fontWeight: '700', borderBottom: '1px solid #000' }}>2024</th>
              <th style={{ width: '100px', textAlign: 'center', fontWeight: '700', borderBottom: '1px solid #000' }}>2025</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px dotted #ccc' }}>
              <td style={{ padding: '4px 0' }}><span style={s.lineNum}>11a.</span> 2025년 10월 1일 기준 주요 거주지를 배우자/CU 파트너 이외의 다른 사람과 공동 소유하셨나요?</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><CheckBox checked={data.coOwn} /> 예 &nbsp;<CheckBox checked={!data.coOwn} /> 아니오</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><CheckBox checked={data.coOwn} /> 예 &nbsp;<CheckBox checked={!data.coOwn} /> 아니오</td>
            </tr>
            <tr style={{ borderBottom: '1px dotted #ccc' }}>
              <td style={{ padding: '4px 0' }}><span style={s.lineNum}>11b.</span> "예"라고 답한 경우, 본인(및 배우자)이 소유한 비율(%)을 기입하세요.</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><span style={s.boxSm}>{data.coOwn ? data.coPct : ''}</span> %</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><span style={s.boxSm}>{data.coOwn ? data.coPct : ''}</span> %</td>
            </tr>
            <tr style={{ borderBottom: '1px dotted #ccc' }}>
              <td style={{ padding: '4px 0' }}><span style={s.lineNum}>12a.</span> 2025년 10월 1일 기준 주요 거주지가 다세대 주택이었나요?</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><CheckBox checked={data.multiUnit} /> 예 &nbsp;<CheckBox checked={!data.multiUnit} /> 아니오</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><CheckBox checked={data.multiUnit} /> 예 &nbsp;<CheckBox checked={!data.multiUnit} /> 아니오</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}><span style={s.lineNum}>12b.</span> "예"라고 답한 경우, 주요 거주지로 사용한 비율(%)을 기입하세요.</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><span style={s.boxSm}>{data.multiUnit ? data.multiUnitPct : ''}</span> %</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><span style={s.boxSm}>{data.multiUnit ? data.multiUnitPct : ''}</span> %</td>
            </tr>
          </tbody>
        </table>
        {data.coOwn || data.multiUnit ? (
          <div style={{ fontSize: '9px', fontWeight: '700', margin: '4px 0' }}>11a 또는 12a에 "예"라고 답한 경우, 14~16b번 작성 전에 안내서를 참조하세요.</div>
        ) : null}
      </div>

      <div style={s.h2}>재산세 (Property Taxes)</div>
      <div style={{ fontSize: '10px' }}>
        <div style={{ padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
          <div style={{ marginBottom: '4px' }}><span style={s.lineNum}>13a.</span> 2025년 10월 1일 기준 주요 거주지의 Block 및 Lot 번호를 기입하세요.</div>
          <div style={{ display: 'flex', gap: '16px', paddingLeft: '16px', flexWrap: 'wrap' }}>
            <span>Block: <TextField value={data.block} width="60px" /></span>
            <span>Block Suffix: <TextField value="" width="50px" /></span>
            <span>Lot: <TextField value={data.lot} width="60px" /></span>
            <span>Lot Suffix: <TextField value="" width="50px" /></span>
            <span>Qualifier: <TextField value={data.qualifier} width="60px" /></span>
          </div>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>13b.</span> 추가 Lot에 대한 재산세도 청구하시나요?</span>
          <span><CheckBox checked={data.additionalLots} /> 예 &nbsp;<CheckBox checked={!data.additionalLots} /> 아니오</span>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>14.</span> 2024년 10월 1일 기준 주요 거주지에 청구된 <strong>2024년</strong> 재산세를 기입하세요.<br />
            <span style={{ fontSize: '9px' }}>(모바일홈 소유자는 총 부지 이용료의 18% 입력) — <strong>기존 Senior Freeze 수령자: 변경하지 마세요.</strong></span>
          </span>
          <MoneyField value={t24} />
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>15.</span> 2025년 10월 1일 기준 주요 거주지에 청구된 <strong>2025년</strong> 재산세를 기입하세요.<br />
            <span style={{ fontSize: '9px' }}>(모바일홈 소유자는 총 부지 이용료의 18% 입력)</span>
          </span>
          <MoneyField value={t25} />
        </div>
      </div>

      <div style={s.h2}>세금 대납금 (P.I.L.O.T. — Payment-in-Lieu-of-Taxes)</div>
      <div style={{ fontSize: '10px' }}>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>16a.</span> 2025년 주요 거주지에 P.I.L.O.T.(세금 대납금) 계약이 있었나요?</span>
          <span><CheckBox checked={data.pilot} /> 예 &nbsp;<CheckBox checked={!data.pilot} /> 아니오</span>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>16b.</span> "예"라고 답한 경우, 2025년 주요 거주지에 대한 P.I.L.O.T. 금액을 기입하세요.</span>
          <MoneyField value={data.pilot ? data.pilotAmount : ''} />
        </div>
      </div>

      <PageBreak />

      {/* ══════════════════════════════════════
          PAGE 3
      ══════════════════════════════════════ */}
      <PageHeader page={3} name={fullName} ssn={data.ssnLast4} />

      {/* 2024 Income */}
      <div style={s.h2}>2024년 소득 (2024 Income)</div>
      <div style={{ fontSize: '9px', marginBottom: '6px', lineHeight: 1.5 }}>
        2024년 연간 소득을 기입하세요. 소득 원천과 금액 산정 방법은 안내서를 참조하세요. 신고할 소득이 없으면 17f에 "0.00"을 기입하세요. 한 항목의 손실은 총소득에서 차감할 수 없으며, 순손실이 있는 항목은 공란으로 두세요. 2024년 12월 31일 기준 기혼/동거 중이면 양쪽 소득을 합산하세요.
      </div>
      <div style={{ fontSize: '10px' }}>
        {[
          { ln: '17a.', label: '뉴저지 총소득 (안내서 참조)', key: 'a' },
          { ln: '17b.', label: '면세 이자 소득', key: 'b' },
          { ln: '17c.', label: 'Roth IRA 전환금 (안내서 참조)', key: 'c' },
          { ln: '17d.', label: '장애 연금 수령액 (안내서 참조)', key: 'd' },
          { ln: '17e.', label: '사회보장 급여 (Medicare Part B 보험료 포함)\nSSA-1099 Box 5 총액 기입', key: 'e' },
        ].map(({ ln, label, key }) => (
          <div key={ln} style={s.row}>
            <span style={s.label}><span style={s.lineNum}>{ln}</span> {label}</span>
            <MoneyField value={inc24[key]} />
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '2px solid #000', marginTop: '6px' }}>
          <strong><span style={s.lineNum}>17f.</span> 2024년 소득 합계 (17a~17e 합산) ⭐ 자격 기준: $168,268 이하</strong>
          <MoneyField value={incomeTotal(inc24)} />
        </div>
      </div>

      <div style={s.dividerLine} />

      {/* 2025 Income */}
      <div style={s.h2}>2025년 소득 (2025 Income)</div>
      <div style={{ fontSize: '9px', marginBottom: '6px', lineHeight: 1.5 }}>
        2025년 연간 소득을 기입하세요. 신고할 소득이 없으면 18f에 "0.00"을 기입하세요. 2025년 12월 31일 기준 기혼/동거 중이면 양쪽 소득을 합산하세요.
      </div>
      <div style={{ fontSize: '10px' }}>
        {[
          { ln: '18a.', label: '뉴저지 총소득 (안내서 참조)', key: 'a' },
          { ln: '18b.', label: '면세 이자 소득', key: 'b' },
          { ln: '18c.', label: 'Roth IRA 전환금 (안내서 참조)', key: 'c' },
          { ln: '18d.', label: '장애 연금 수령액 (안내서 참조)', key: 'd' },
          { ln: '18e.', label: '사회보장 급여 (Medicare Part B 보험료 포함)\nSSA-1099 Box 5 총액 기입', key: 'e' },
        ].map(({ ln, label, key }) => (
          <div key={ln} style={s.row}>
            <span style={s.label}><span style={s.lineNum}>{ln}</span> {label}</span>
            <MoneyField value={inc25[key]} />
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '2px solid #000', marginTop: '6px' }}>
          <strong><span style={s.lineNum}>18f.</span> 2025년 소득 합계 (18a~18e 합산) ⭐ 자격 기준: $172,475 이하</strong>
          <MoneyField value={incomeTotal(inc25)} />
        </div>
      </div>

      <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '13px', marginTop: '20px' }}>서명 섹션을 완성하세요.</div>

      <PageBreak />

      {/* ══════════════════════════════════════
          PAGE 4 — Signature
      ══════════════════════════════════════ */}
      <PageHeader page={4} name={fullName} ssn={data.ssnLast4} />

      {/* Schedule 1 */}
      <div style={s.h2}>Schedule 1 — 2025년 중 이사한 경우</div>
      <div style={{ fontSize: '9px', marginBottom: '8px' }}>
        2025년에 본인이 <strong>소유한</strong> 주택에서 또 다른 본인 소유의 주택으로 이사한 경우에만 작성하세요. 그 외에는 공란으로 두세요.
      </div>
      {(() => {
        const h1 = data.sched1?.home1 || {};
        const h2 = data.sched1?.home2 || {};
        const rows = [
          { label: '1. 주소', v1: h1.address, v2: h2.address },
          { label: '2. Block/Lot/Qualifier 번호', v1: h1.blockLot, v2: h2.blockLot },
          { label: '3. 2025년 중 해당 주택 거주 기간', v1: h1.dates, v2: h2.dates },
          { label: '4. 공동 소유 여부', v1: h1.shared ? '예' : '아니오', v2: h2.shared ? '예' : '아니오' },
          { label: '5. 소유 비율 (%)', v1: h1.shared ? (h1.sharePct + '%') : '', v2: h2.shared ? (h2.sharePct + '%') : '' },
          { label: '6. 다세대 주택 여부', v1: h1.multiUnit ? '예' : '아니오', v2: h2.multiUnit ? '예' : '아니오' },
          { label: '7. 주거 사용 비율 (%)', v1: h1.multiUnit ? (h1.multiUnitPct + '%') : '', v2: h2.multiUnit ? (h2.multiUnitPct + '%') : '' },
          { label: '8. 청구된 재산세 합계', v1: h1.taxes ? ('$' + parseFloat(h1.taxes).toLocaleString('en-US',{minimumFractionDigits:2})) : '', v2: h2.taxes ? ('$' + parseFloat(h2.taxes).toLocaleString('en-US',{minimumFractionDigits:2})) : '' },
          { label: '9. P.I.L.O.T. 금액', v1: h1.pilot || '', v2: h2.pilot || '' },
        ];
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', marginBottom: '10px' }}>
            <thead>
              <tr>
                <th style={{ width: '40%' }}></th>
                <th style={{ textAlign: 'center', padding: '3px', border: '1px solid #000', fontWeight: '700' }}>주요 주택 1</th>
                <th style={{ textAlign: 'center', padding: '3px', border: '1px solid #000', fontWeight: '700' }}>주요 주택 2</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '4px', border: '1px solid #ccc', fontSize: '9px' }}>{row.label}</td>
                  <td style={{ padding: '4px', border: '1px solid #ccc', fontSize: '10px', minHeight: '20px', height: '22px' }}>{row.v1}</td>
                  <td style={{ padding: '4px', border: '1px solid #ccc', fontSize: '10px', minHeight: '20px', height: '22px' }}>{row.v2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      })()}

      <div style={{ fontWeight: '700', fontSize: '11px', marginBottom: '12px' }}>2페이지 10번 항목으로 돌아가 계속 작성하세요.</div>

      {/* Signature Section */}
      <div style={{ border: '1px solid #000', padding: '10px', marginTop: '8px' }}>
        <div style={{ fontWeight: '700', fontSize: '11px', textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '6px', marginBottom: '8px' }}>
          서명 (Signature) — 이 재산세 감면 신청서에 포함된 모든 프로그램은 주 예산 배정에 따라 달라집니다.
        </div>

        <div style={{ fontSize: '9px', marginBottom: '8px' }}>
          <CheckBox checked={false} /> 사망한 신청자의 사망증명서 사본을 동봉하는 경우 체크하세요. (안내서 참조)
        </div>

        <div style={{ fontSize: '9px', marginBottom: '10px', lineHeight: 1.6, maxWidth: '75%' }}>
          위증 처벌을 감수하고, 본 재산세 감면 신청서(첨부 일정 및 진술 포함)를 검토하였으며, 본인의 지식과 신념에 따라 이 내용이 사실이고 정확하며 완전하다고 선언합니다.
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: '2', minWidth: '200px' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '16px', borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '28px', color: '#00008b' }}>
              {data.sigName}
            </div>
            <div style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>본인 서명</div>
          </div>
          <div style={{ flex: '1', minWidth: '100px' }}>
            <div style={{ borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '28px', fontSize: '11px' }}>{sigDateFormatted}</div>
            <div style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>날짜</div>
          </div>
          <div style={{ flex: '2', minWidth: '200px' }}>
            <div style={{ borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '28px' }}></div>
            <div style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>배우자/CU 파트너 서명 (공동 신고 시 양쪽 모두 서명 필요)</div>
          </div>
        </div>

        <div style={{ marginTop: '8px' }}>
          <div style={{ fontSize: '9px', color: '#555' }}>낮 시간 전화번호 및/또는 이메일 주소 (선택사항)</div>
          <div style={{ borderBottom: '1px solid #000', minHeight: '18px', fontSize: '11px', paddingBottom: '2px' }}>{data.phone}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
          <div>
            <div style={{ borderBottom: '1px solid #000', minHeight: '18px' }}></div>
            <div style={{ fontSize: '9px', color: '#555' }}>대리인 서명 (Paid Preparer)</div>
          </div>
          <div>
            <div style={{ borderBottom: '1px solid #000', minHeight: '18px' }}></div>
            <div style={{ fontSize: '9px', color: '#555' }}>연방 식별 번호</div>
          </div>
          <div>
            <div style={{ borderBottom: '1px solid #000', minHeight: '18px' }}></div>
            <div style={{ fontSize: '9px', color: '#555' }}>대리인 회사명</div>
          </div>
          <div>
            <div style={{ borderBottom: '1px solid #000', minHeight: '18px' }}></div>
            <div style={{ fontSize: '9px', color: '#555' }}>회사 연방 고용주 식별 번호 (FEIN)</div>
          </div>
        </div>

        <div style={{ marginTop: '10px', padding: '6px', background: '#f5f5f5', border: '1px solid #ccc', fontSize: '9px', lineHeight: 1.7 }}>
          <strong>제출 마감일: 2026년 11월 2일</strong><br />
          완성된 신청서를 다음 주소로 우편 발송하세요:<br />
          NJ Division of Taxation / Revenue Processing Center<br />
          Property Tax Relief Application / PO Box 635 / Trenton, NJ 08646-0635
        </div>
      </div>

      {/* Disclaimer note */}
      <div style={{ marginTop: '10px', fontSize: '8px', color: '#666', textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '6px' }}>
        ※ 이 문서는 입력하신 내용을 PAS-1 양식 형식으로 한국어 번역하여 정리한 참고용입니다. 실제 제출 전에 공식 PAS-1 양식에 직접 옮겨 적거나, propertytaxrelief.nj.gov 에서 온라인으로 제출하세요.
      </div>
    </div>
  );
}