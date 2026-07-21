import React from 'react';
import { incomeTotal } from '@/lib/pas1Data';

const money = (v) => {
  const n = parseFloat(String(v || 0).replace(/,/g, ''));
  if (!n || isNaN(n)) return '';
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const BASE = {
  fontFamily: "'Noto Sans KR', 'Malgun Gothic', Arial, sans-serif",
  fontSize: '9.5px',
  color: '#000',
  lineHeight: 1.4,
};

/* ─── Pink input box ─── */
const InputBox = ({ value = '', width = 80, height = 18 }) => (
  <span style={{
    display: 'inline-block', minWidth: width, height,
    border: '1px solid #c06', background: '#fff',
    verticalAlign: 'middle', padding: '1px 3px',
    fontSize: '10px', lineHeight: `${height - 2}px`, color: '#000',
  }}>{value}</span>
);

/* ─── Segmented digit boxes ─── */
const DigitBoxes = ({ value = '', count = 4 }) => (
  <span style={{ display: 'inline-flex', gap: '1px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{
        display: 'inline-block', width: 14, height: 16,
        border: '1px solid #c06', background: '#fff',
        textAlign: 'center', lineHeight: '14px', fontSize: '9px', fontFamily: 'monospace',
      }}>{value?.[i] || ''}</span>
    ))}
  </span>
);

/* ─── Money segmented boxes ─── */
const MoneyBoxes = ({ value }) => {
  const formatted = money(value);
  const [intPart = '', decPart = '00'] = formatted.split('.');
  const digits = intPart.replace(/,/g, '').padStart(7, '');
  const dec = decPart.padEnd(2, '0').slice(0, 2);
  const groups = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7)];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1px' }}>
      <DigitBoxes value={groups[0]} count={2} />
      <span style={{ fontSize: '9px', padding: '0 1px' }}>,</span>
      <DigitBoxes value={groups[1]} count={3} />
      <span style={{ fontSize: '9px', padding: '0 1px' }}>,</span>
      <DigitBoxes value={groups[2]} count={2} />
      <span style={{ fontSize: '9px', padding: '0 1px' }}>.</span>
      <DigitBoxes value={dec} count={2} />
    </span>
  );
};

/* ─── SSN box ─── */
const SSNBox = ({ last4 = '' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1px' }}>
    {[0,1,2].map(i => <span key={i} style={{ display:'inline-block', width:16, height:16, border:'1px solid #c06', background:'#fff', textAlign:'center', lineHeight:'14px', fontSize:'9px' }}>X</span>)}
    <span style={{ padding: '0 2px', fontSize: '9px' }}>-</span>
    {[0,1].map(i => <span key={i} style={{ display:'inline-block', width:16, height:16, border:'1px solid #c06', background:'#fff', textAlign:'center', lineHeight:'14px', fontSize:'9px' }}>X</span>)}
    <span style={{ padding: '0 2px', fontSize: '9px' }}>-</span>
    {[0,1,2,3].map(i => <span key={i} style={{ display:'inline-block', width:16, height:16, border:'1px solid #c06', background:'#fff', textAlign:'center', lineHeight:'14px', fontSize:'9px' }}>{last4?.[i] || ''}</span>)}
  </span>
);

/* ─── Checkbox ─── */
const CB = ({ checked }) => (
  <span style={{ display:'inline-block', width:14, height:14, border:'1px solid #c06', background:'#fff', textAlign:'center', lineHeight:'12px', fontSize:'9px', fontWeight:'bold', verticalAlign:'middle' }}>
    {checked ? 'X' : ''}
  </span>
);

/* ─── Page break ─── */
const PB = () => <div style={{ pageBreakAfter: 'always', borderTop: '1px dashed #999', margin: '16px 0 0' }} />;

/* ─── Repeating page header ─── */
const PageHeader = ({ page, name, ssn }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: '6px', gap: '8px' }}>
    <div style={{ border: '1px solid #999', padding: '2px 6px', fontSize: '8px', flex: 2 }}>
      <div style={{ color: '#666', fontSize: '7.5px' }}>재산세 감면 신청서상의 성명</div>
      <div style={{ fontWeight: '600', fontSize: '10px' }}>{name}</div>
    </div>
    <div style={{ border: '1px solid #999', padding: '2px 6px', fontSize: '8px', flex: 1 }}>
      <div style={{ color: '#666', fontSize: '7.5px' }}>본인 사회보장번호</div>
      <div style={{ fontWeight: '600', fontSize: '10px' }}>XXX-XX-{ssn}</div>
    </div>
    <div style={{ fontSize: '8px', fontWeight: '700', alignSelf: 'flex-end', paddingBottom: '2px', whiteSpace: 'nowrap' }}>
      PAS-1 (2025) {page}페이지
    </div>
  </div>
);

/* ─── Section heading (big bold like official Korean form) ─── */
const H2 = ({ children }) => (
  <div style={{ fontSize: '16px', fontWeight: '900', margin: '12px 0 5px', borderBottom: '1.5px solid #000', paddingBottom: '2px' }}>
    {children}
  </div>
);

/* ─── Row ─── */
const Row = ({ children, style = {} }) => (
  <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', ...style }}>
    {children}
  </div>
);

const Ln = ({ n }) => <span style={{ fontWeight: '700', minWidth: '30px', display: 'inline-block' }}>{n}</span>;

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function PrintFormKorean({ data, printOnly = true, blank = false }) {
  const t24 = parseFloat(data.tax2024) || 0;
  const t25 = parseFloat(data.tax2025) || 0;
  const inc24 = data.inc?.[2024] || {};
  const inc25 = data.inc?.[2025] || {};
  const fullName = data.lname && data.fname ? `${data.lname}, ${data.fname}` : '';
  const sigDate = data.sigDate
    ? new Date(data.sigDate + 'T00:00:00').toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    : '';
  const fs = data.filingStatus;
  const cb = (v) => blank ? false : v;

  return (
    <div className={printOnly ? 'print-only' : ''} style={{ ...BASE, maxWidth: '740px', margin: '0 auto', padding: '20px 28px', background: '#fff' }}>

      {/* ══ 1페이지 ══ */}
      {/* 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
        <div style={{ border: '2px solid #000', padding: '4px 8px', lineHeight: 1.1 }}>
          <div style={{ fontSize: '22px', fontWeight: '900' }}>2025</div>
          <div style={{ fontSize: '13px', fontWeight: '700' }}>PAS-1</div>
        </div>
        <div style={{ textAlign: 'right', flex: 1, marginLeft: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700' }}>뉴저지주</div>
          <div style={{ fontSize: '20px', fontWeight: '900', lineHeight: 1.1 }}>재산세 감면 신청서</div>
          <div style={{ fontSize: '10px', fontWeight: '600' }}>시니어 및 일부 장애 수급자 대상</div>
        </div>
      </div>

      {/* 작성 조건 */}
      <div style={{ fontSize: '8.5px', marginBottom: '8px', lineHeight: 1.6 }}>
        <strong>다음 중 하나에 해당할 때만 작성하세요:</strong><br />
        • 본인 또는 배우자/CU 파트너가 1960년 이전 출생, <strong>또는</strong><br />
        • 2025년에 사회보장 장애급여를 수령, <strong>또는</strong><br />
        • 2025년에 철도 퇴직 장애급여를 수령한 경우.
      </div>

      {/* 상단 정보 테이블 */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #c06', marginBottom: '6px', fontSize: '8.5px' }}>
        <tbody>
          <tr>
            <td style={{ width: '32%', border: '1px solid #c06', padding: '4px 6px', verticalAlign: 'top' }}>
              <div style={{ fontSize: '7.5px', color: '#555', marginBottom: '3px' }}>본인 사회보장번호</div>
              <SSNBox last4={data.ssnLast4} />
              <div style={{ fontSize: '7.5px', color: '#555', margin: '5px 0 3px' }}>배우자/CU 파트너 사회보장번호</div>
              <SSNBox last4={''} />
              <div style={{ fontSize: '7.5px', color: '#555', margin: '5px 0 3px' }}>카운티/자치단체 코드 (안내서 15쪽 표)</div>
              <DigitBoxes value={data.muniCode} count={4} />
            </td>
            <td style={{ border: '1px solid #c06', padding: '4px 6px', verticalAlign: 'top' }}>
              <div style={{ fontSize: '7.5px', color: '#555', marginBottom: '2px' }}>성, 이름 및 이니셜 (공동 신고자는 각 이름/중간 이니셜)</div>
              <InputBox value={fullName} width={320} height={20} />
              <div style={{ fontSize: '7.5px', color: '#555', margin: '4px 0 2px' }}>자택 주소 (번지 및 도로명, 아파트 번호 포함)</div>
              <InputBox value={data.address} width={320} height={20} />
              <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '7.5px', color: '#555' }}>
                <span>시, 타운, 우체국명</span>
                <span>주: NJ</span>
                <span>우편번호</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontSize: '8.5px', marginBottom: '6px' }}>
        2025년 10월 1일 기준 주요 주택 주소가 위 주소와 다를 때만 기입하세요.<br />
        도로명 주소: <InputBox value="" width={280} /> &nbsp; 카운티/자치단체 코드: <DigitBoxes value="" count={4} />
      </div>

      <div style={{ fontSize: '8px', marginBottom: '8px', lineHeight: 1.5, borderTop: '1px solid #000', paddingTop: '4px' }}>
        <strong>이 신청서는 Property Tax Reimbursement (Senior Freeze), ANCHOR Benefit, Stay NJ 프로그램을 함께 신청하는 통합 신청서입니다.</strong> 세무국은 자격 여부를 판정하고 해당 혜택을 지급하기 위해 이 정보를 사용합니다.
      </div>

      {/* 신고 신분 */}
      <H2>신고 신분</H2>
      <div style={{ fontSize: '9px', marginBottom: '6px' }}>
        <div style={{ marginBottom: '4px' }}>1. &nbsp;2025년 NJ-1040 신고서상 신분:</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', paddingLeft: '12px' }}>
          <div><CB checked={cb(fs==='A')} /> &nbsp;A. &nbsp;미혼</div>
          <div style={{ fontSize: '8.5px' }}>기혼/CU 별도 신고:</div>
          <div><CB checked={cb(fs==='B')} /> &nbsp;B. &nbsp;세대주</div>
          <div><CB checked={cb(fs==='E')} /> &nbsp;E. &nbsp;각자 별도 거주지 유지</div>
          <div><CB checked={cb(fs==='C')} /> &nbsp;C. &nbsp;자격 있는 생존 배우자/CU 파트너</div>
          <div><CB checked={cb(fs==='F')} /> &nbsp;F. &nbsp;같은 거주지에서 함께 거주</div>
          <div><CB checked={cb(fs==='D')} /> &nbsp;D. &nbsp;기혼/CU 공동 신고</div>
        </div>
      </div>

      {/* 나이 및 장애 */}
      <H2>나이 및 장애 상태 (해당 사항 모두 표시)</H2>
      <div style={{ fontSize: '9px' }}>
        <Row>
          <span><Ln n="2." /> 본인 출생연도: <DigitBoxes value={data.birthYear} count={4} />
          &nbsp;&nbsp;&nbsp; 배우자/CU 파트너 출생연도: <DigitBoxes value={data.spBirthYear} count={4} /></span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="3a." /> 2025년에 연방 사회보장 장애급여(SSDI)를 <strong>수령</strong>하셨나요?</span>
          <span style={{ whiteSpace: 'nowrap' }}>본인 &nbsp;<CB checked={cb(data.ssdi)} /> 예 &nbsp;<CB checked={cb(!data.ssdi)} /> 아니오 &nbsp;&nbsp; 배우자/CU &nbsp;<CB checked={cb(false)} /> 예 &nbsp;<CB checked={cb(true)} /> 아니오</span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="3b." /> 2025년에 철도 퇴직 장애급여를 <strong>수령</strong>하셨나요?</span>
          <span style={{ whiteSpace: 'nowrap' }}>본인 &nbsp;<CB checked={cb(data.rrd)} /> 예 &nbsp;<CB checked={cb(!data.rrd)} /> 아니오 &nbsp;&nbsp; 배우자/CU &nbsp;<CB checked={cb(false)} /> 예 &nbsp;<CB checked={cb(true)} /> 아니오</span>
        </Row>
      </div>

      {/* 거주 정보 */}
      <H2>거주 정보</H2>
      <div style={{ fontSize: '9px' }}>
        <Row>
          <span style={{ flex: 1 }}><Ln n="4." /> 2025년 <strong>10월 1일</strong> 기준으로 뉴저지에 주요 주택을 소유 또는 임차하고 계셨나요? "예"이면 5번. "아니오"이면 혜택 대상이 아닙니다.</span>
          <span><CB checked={cb(data.oct1Nj)} /> 예 &nbsp;<CB checked={cb(!data.oct1Nj)} /> 아니오</span>
        </Row>
        <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0' }}>
          <Ln n="5." /> 2025년 <strong>10월 1일</strong> 기준 거주 상태:
          &nbsp;&nbsp;<CB checked={cb(data.homeType==='own')} /> 주택 소유자
          &nbsp;&nbsp;<CB checked={cb(data.homeType==='mobile')} /> 모바일홈 소유자
          &nbsp;&nbsp;<CB checked={cb(data.homeType==='rent')} /> 임차인 — 서명란으로 이동
        </div>
        <div style={{ fontSize: '8px', fontWeight: '700', padding: '3px 0', borderBottom: '1px dotted #bbb' }}>주택 소유자 및 모바일홈 소유자</div>
        <Row>
          <span style={{ flex: 1 }}>
            <Ln n="6a." /> 2025년 <strong>1월 1일부터 12월 31일까지</strong> 같은 NJ 주요 주택을 소유하고 거주하셨나요?
            <span style={{ display: 'block', fontSize: '7.5px', color: '#555', marginTop: '1px' }}>"예"이면 7번. "아니오"이고 주택 소유자이면 6b. 모바일홈 소유자이면 서명란으로 이동.</span>
          </span>
          <span style={{ whiteSpace: 'nowrap' }}><CB checked={cb(data.same2025)} /> 예 &nbsp;<CB checked={cb(!data.same2025)} /> 아니오</span>
        </Row>
        <Row style={{ opacity: data.same2025 ? 0.4 : 1 }}>
          <span style={{ flex: 1 }}><Ln n="6b." /> 본인 또는 배우자가 1960년 이전 출생입니까? "예"이면 6c. "아니오"이면 서명란으로 이동.</span>
          <span style={{ whiteSpace: 'nowrap' }}><CB checked={cb(!data.same2025 && parseInt(data.birthYear) <= 1960)} /> 예 &nbsp;<CB checked={cb(!data.same2025 && parseInt(data.birthYear) > 1960)} /> 아니오</span>
        </Row>
        <Row style={{ opacity: data.same2025 ? 0.4 : 1 }}>
          <span style={{ flex: 1 }}><Ln n="6c." /> 2025년에 본인이 <strong>소유한</strong> NJ 주택에서 또 다른 본인 소유 NJ 주택으로 이사하셨나요? "예"이면 Schedule 1. "아니오"이면 서명란으로 이동.</span>
          <span style={{ whiteSpace: 'nowrap' }}><CB checked={cb(!data.same2025 && data.movedWithin2025)} /> 예 &nbsp;<CB checked={cb(!data.same2025 && !data.movedWithin2025)} /> 아니오</span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="7." /> 작년 재산세 감면 혜택과 같은 주택으로 신청하십니까?</span>
          <span><CB checked={cb(data.sameAsLast)} /> 예 &nbsp;<CB checked={cb(!data.sameAsLast)} /> 아니오</span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="8." /> 2025년 12월 31일 기준, <strong>2022년 12월 31일 또는 그 이전부터</strong> 같은 NJ 주택을 소유하고 거주하고 계십니까?</span>
          <span><CB checked={cb(data.since2022)} /> 예 &nbsp;<CB checked={cb(!data.since2022)} /> 아니오</span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="9." /> <strong>2023년 중</strong> 현재 주택으로 이사하셨나요?</span>
          <span><CB checked={cb(data.moved2023)} /> 예 &nbsp;<CB checked={cb(!data.moved2023)} /> 아니오</span>
        </Row>
      </div>

      <PB />

      {/* ══ 2페이지 ══ */}
      <PageHeader page={2} name={fullName} ssn={data.ssnLast4} />
      <H2>주요 거주지 (본인 거주지)</H2>
      <div style={{ fontSize: '9px' }}>
        <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0' }}>
          <Ln n="10." /> 2025년 10월 1일 기준 주택이 Co-op 또는 지속 돌봄 은퇴시설(CCRC) 유닛이면 유형과 시설명을 적으세요. 아니면 공란으로 두세요:<br />
          <span style={{ paddingLeft: '28px' }}><CB checked={cb(false)} /> Co-op &nbsp; 또는 &nbsp; <CB checked={cb(false)} /> 지속 돌봄 은퇴시설</span>
        </div>

        {/* 11-12 테이블 */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginTop: '6px' }}>
          <thead>
            <tr>
              <th style={{ width: '55%', textAlign: 'left', fontWeight: 'normal', paddingBottom: '2px' }}></th>
              <th style={{ textAlign: 'center', fontWeight: '700', borderBottom: '1.5px solid #000', padding: '2px 4px' }}>2024</th>
              <th style={{ textAlign: 'center', fontWeight: '700', borderBottom: '1.5px solid #000', padding: '2px 4px' }}>2025</th>
            </tr>
          </thead>
          <tbody>
            {[
              { n: '11a.', text: '2025년 10월 1일 기준 주요 주택을 배우자/CU 파트너 이외의 사람과 공동 소유하셨나요? (모바일홈 소유자는 안내서 참조)', v: data.coOwn },
              { n: '11b.', text: '"예"이면 본인(및 배우자/CU)이 소유한 지분 비율(%)을 적으세요.', pct: data.coOwn ? data.coPct : '' },
              { n: '12a.', text: '2025년 10월 1일 기준 주요 주택이 다세대 주택이었나요?', v: data.multiUnit },
              { n: '12b.', text: '"예"이면 본인(및 배우자/CU)이 주요 거주지로 사용한 비율(%)을 적으세요.', pct: data.multiUnit ? data.multiUnitPct : '' },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px dotted #bbb' }}>
                <td style={{ padding: '4px 0' }}><Ln n={r.n} /> {r.text}</td>
                {r.pct !== undefined ? (
                  <>
                    <td style={{ textAlign: 'center', padding: '4px' }}><InputBox value={r.pct} width={30} /> %</td>
                    <td style={{ textAlign: 'center', padding: '4px' }}><InputBox value={r.pct} width={30} /> %</td>
                  </>
                ) : (
                  <>
                    <td style={{ textAlign: 'center', padding: '4px', whiteSpace: 'nowrap' }}><CB checked={cb(r.v)} /> 예 &nbsp;<CB checked={cb(!r.v)} /> 아니오</td>
                    <td style={{ textAlign: 'center', padding: '4px', whiteSpace: 'nowrap' }}><CB checked={cb(r.v)} /> 예 &nbsp;<CB checked={cb(!r.v)} /> 아니오</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>재산세</H2>
      <div style={{ fontSize: '9px' }}>
        <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0' }}>
          <div style={{ marginBottom: '3px' }}><Ln n="13a." /> 2025년 10월 1일 기준 주요 주택 주소의 Block 및 Lot 번호를 적으세요.</div>
          <div style={{ display: 'flex', gap: '10px', paddingLeft: '28px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <span>Block<br /><InputBox value={data.block} width={55} /></span>
            <span>Block Suffix<br /><InputBox value="" width={40} /></span>
            <span style={{ paddingBottom: '2px' }}>.</span>
            <span>Lot<br /><InputBox value={data.lot} width={55} /></span>
            <span>Lot Suffix<br /><InputBox value="" width={40} /></span>
            <span style={{ paddingBottom: '2px' }}>.</span>
            <span>Qualifier<br /><InputBox value={data.qualifier} width={55} /></span>
          </div>
        </div>
        <Row>
          <span style={{ flex: 1 }}><Ln n="13b." /> 추가 Lot에 대한 재산세도 청구하시나요? (안내서 참조)</span>
          <span><CB checked={cb(data.additionalLots)} /> 예 &nbsp;<CB checked={cb(!data.additionalLots)} /> 아니오</span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}>
            <Ln n="14." /> 2024년 10월 1일 기준 주요 주택에 청구된 <strong>2024년</strong> 재산세를 적으세요.
            <span style={{ display: 'block', fontSize: '7.5px', color: '#555' }}>(모바일홈 소유자는 총 site fee의 18% 입력) &nbsp; <strong>기존 Senior Freeze 수령자: 변경하지 마세요.</strong></span>
          </span>
          <MoneyBoxes value={t24} />
        </Row>
        <Row>
          <span style={{ flex: 1 }}>
            <Ln n="15." /> 2025년 10월 1일 기준 주요 주택에 청구된 <strong>2025년</strong> 재산세를 적으세요.
            <span style={{ display: 'block', fontSize: '7.5px', color: '#555' }}>(모바일홈 소유자는 총 site fee의 18% 입력)</span>
          </span>
          <MoneyBoxes value={t25} />
        </Row>
      </div>

      <H2>P.I.L.O.T. (세금 대체 납부금)</H2>
      <div style={{ fontSize: '9px' }}>
        <Row>
          <span style={{ flex: 1 }}><Ln n="16a." /> 2025년 주요 주택에 Payment-in-Lieu-of-Taxes (P.I.L.O.T.) 계약이 있었나요?</span>
          <span><CB checked={cb(data.pilot)} /> 예 &nbsp;<CB checked={cb(!data.pilot)} /> 아니오</span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="16b." /> "예"이면 2025년 주요 주택에 대해 납부해야 하는 P.I.L.O.T. 금액을 적으세요.</span>
          <MoneyBoxes value={data.pilot ? data.pilotAmount : ''} />
        </Row>
      </div>

      <PB />

      {/* ══ 3페이지 ══ */}
      <PageHeader page={3} name={fullName} ssn={data.ssnLast4} />

      <H2>2024년 소득</H2>
      <div style={{ fontSize: '8px', marginBottom: '6px', lineHeight: 1.5 }}>
        2024년 연간 소득을 적으세요. 안내서를 참조하세요. 신고할 소득이 없으면 17f에 "0.00"을 적으세요. 손실은 총소득에서 차감할 수 없습니다. 기혼/CU이고 같은 집에 살았다면 두 사람의 소득을 합산하세요.
      </div>
      <div style={{ fontSize: '9px' }}>
        {[
          { ln: '17a.', label: '뉴저지 총소득 (안내서 참조)', key: 'a' },
          { ln: '17b.', label: '면세 이자 소득', key: 'b' },
          { ln: '17c.', label: 'Roth IRA 전환금 (안내서 참조)', key: 'c' },
          { ln: '17d.', label: '장애 연금 수령액 (안내서 참조)', key: 'd' },
          { ln: '17e.', label: '사회보장 급여 (Medicare Part B 보험료 포함) — 1040 Line 6a 또는 SSA-1099 Box 5 총액', key: 'e' },
        ].map(({ ln, label, key }) => (
          <Row key={ln}>
            <span style={{ flex: 1 }}><Ln n={ln} /> {label}</span>
            <MoneyBoxes value={inc24[key]} />
          </Row>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderTop: '2px solid #000', marginTop: '4px' }}>
          <strong><Ln n="17f." /> 2024년 소득 합계 (17a-17e 합산)</strong>
          <MoneyBoxes value={incomeTotal(inc24)} />
        </div>
      </div>

      <div style={{ borderTop: '1.5px solid #000', margin: '10px 0' }} />

      <H2>2025년 소득</H2>
      <div style={{ fontSize: '8px', marginBottom: '6px', lineHeight: 1.5 }}>
        2025년 연간 소득을 적으세요. 안내서를 참조하세요. 신고할 소득이 없으면 18f에 "0.00"을 적으세요. 손실은 총소득에서 차감할 수 없습니다. 기혼/CU이고 같은 집에 살았다면 두 사람의 소득을 합산하세요.
      </div>
      <div style={{ fontSize: '9px' }}>
        {[
          { ln: '18a.', label: '뉴저지 총소득 (안내서 참조)', key: 'a' },
          { ln: '18b.', label: '면세 이자 소득', key: 'b' },
          { ln: '18c.', label: 'Roth IRA 전환금 (안내서 참조)', key: 'c' },
          { ln: '18d.', label: '장애 연금 수령액 (안내서 참조)', key: 'd' },
          { ln: '18e.', label: '사회보장 급여 (Medicare Part B 보험료 포함) — 1040 Line 6a 또는 SSA-1099 Box 5 총액', key: 'e' },
        ].map(({ ln, label, key }) => (
          <Row key={ln}>
            <span style={{ flex: 1 }}><Ln n={ln} /> {label}</span>
            <MoneyBoxes value={inc25[key]} />
          </Row>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderTop: '2px solid #000', marginTop: '4px' }}>
          <strong><Ln n="18f." /> 2025년 소득 합계 (18a-18e 합산)</strong>
          <MoneyBoxes value={incomeTotal(inc25)} />
        </div>
      </div>

      <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '12px', marginTop: '18px' }}>서명 섹션을 완성하세요.</div>

      <PB />

      {/* ══ 4페이지 ══ */}
      <PageHeader page={4} name={fullName} ssn={data.ssnLast4} />

      {/* Schedule 1 */}
      <H2>Schedule 1</H2>
      <div style={{ fontSize: '8.5px', marginBottom: '6px' }}>
        2025년에 본인이 <strong>소유한</strong> 주요 주택에서 또 다른 본인 소유 주요 주택으로 이사한 경우에만 작성하세요. 그 외에는 공란으로 두세요.
      </div>
      {(() => {
        const h1 = data.sched1?.home1 || {};
        const h2 = data.sched1?.home2 || {};
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginBottom: '10px' }}>
            <thead>
              <tr>
                <th style={{ width: '35%', borderBottom: '1.5px solid #000', padding: '3px 4px', textAlign: 'left' }}></th>
                <th style={{ border: '1px solid #999', padding: '4px', textAlign: 'center', fontWeight: '700', background: '#f5f5f5' }}>주요 주택 1</th>
                <th style={{ border: '1px solid #999', padding: '4px', textAlign: 'center', fontWeight: '700', background: '#f5f5f5' }}>주요 주택 2</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: '1. 주소', v1: h1.address, v2: h2.address, type: 'text' },
                { label: '2. Block/Lot/Qualifier 번호', v1: h1.blockLot, v2: h2.blockLot, type: 'text' },
                { label: '3. 2025년 중 해당 주택 거주 기간', v1: h1.dates, v2: h2.dates, type: 'text' },
                { label: '4. 공동 소유 여부', v1: h1.shared, v2: h2.shared, type: 'yesno' },
                { label: '5. 소유 비율 (%)', v1: h1.shared ? h1.sharePct : '', v2: h2.shared ? h2.sharePct : '', type: 'pct' },
                { label: '6. 다세대 주택 여부', v1: h1.multiUnit, v2: h2.multiUnit, type: 'yesno' },
                { label: '7. 주거 사용 비율 (%)', v1: h1.multiUnit ? h1.multiUnitPct : '', v2: h2.multiUnit ? h2.multiUnitPct : '', type: 'pct' },
                { label: '8. 청구된 재산세 합계', v1: h1.taxes, v2: h2.taxes, type: 'money' },
                { label: '9. P.I.L.O.T. 금액', v1: h1.pilot, v2: h2.pilot, type: 'money' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '4px', border: '1px solid #ccc', fontSize: '8.5px' }}>{row.label}</td>
                  {['v1', 'v2'].map((k) => (
                    <td key={k} style={{ padding: '4px', border: '1px solid #ccc', textAlign: row.type === 'money' || row.type === 'pct' ? 'right' : 'left', minHeight: '22px', height: '22px' }}>
                      {row.type === 'yesno' && <><CB checked={cb(row[k])} /> 예 &nbsp;<CB checked={cb(!row[k])} /> 아니오</>}
                      {row.type === 'pct' && (row[k] ? `${row[k]}%` : '')}
                      {row.type === 'money' && (row[k] ? `$${parseFloat(row[k]).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '')}
                      {row.type === 'text' && (row[k] || '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      })()}

      <div style={{ fontWeight: '700', fontSize: '10px', marginBottom: '10px' }}>PAS-1 2페이지 10번으로 돌아가 계속 작성하세요.</div>

      {/* 서명 */}
      <div style={{ border: '1.5px solid #000', padding: '8px 10px' }}>
        <div style={{ fontWeight: '700', fontSize: '11px', textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '5px', marginBottom: '6px' }}>
          서명 — 이 신청서의 모든 프로그램은 뉴저지 주 예산 배정에 따라 달라질 수 있습니다.
        </div>
        <div style={{ fontSize: '8.5px', marginBottom: '6px' }}>
          <CB checked={cb(false)} /> 사망한 신청자의 사망증명서 사본을 동봉하는 경우 체크하세요. (안내서 참조)
        </div>
        <div style={{ fontSize: '8px', marginBottom: '8px', lineHeight: 1.6, maxWidth: '68%' }}>
          위증 처벌을 감수하고 본 재산세 감면 신청서와 첨부 서류를 검토했으며, 본인의 지식과 믿음에 따라 내용이 사실이고 정확하며 완전하다고 선언합니다.
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '8px' }}>
          <div style={{ flex: 2, minWidth: '180px' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '15px', borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '26px', color: '#00008b' }}>{data.sigName}</div>
            <div style={{ fontSize: '7.5px', color: '#555', marginTop: '2px' }}>본인 서명</div>
          </div>
          <div style={{ flex: 1, minWidth: '90px' }}>
            <div style={{ borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '26px', fontSize: '10px' }}>{sigDate}</div>
            <div style={{ fontSize: '7.5px', color: '#555', marginTop: '2px' }}>날짜</div>
          </div>
          <div style={{ flex: 2, minWidth: '180px' }}>
            <div style={{ borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '26px' }}></div>
            <div style={{ fontSize: '7.5px', color: '#555', marginTop: '2px' }}>배우자/CU 파트너 서명 (공동 신고 시 양쪽 모두 서명 필요)</div>
          </div>
        </div>
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '7.5px', color: '#555' }}>낮 시간 전화번호 및/또는 이메일 주소 (선택사항)</div>
          <div style={{ borderBottom: '1px solid #000', minHeight: '16px', fontSize: '10px', paddingBottom: '1px' }}>{data.phone}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: '#f5f5f5', border: '1px solid #ccc', padding: '6px 10px', fontSize: '8px', lineHeight: 1.8, textAlign: 'left', maxWidth: '230px' }}>
            <strong>제출 마감일: 2026년 11월 2일</strong><br />
            완성된 신청서를 다음 주소로 우편 발송:<br />
            NJ Division of Taxation<br />
            Revenue Processing Center<br />
            Property Tax Relief Application<br />
            PO Box 635<br />
            Trenton, NJ 08646-0635
          </div>
        </div>
      </div>

      <div style={{ marginTop: '8px', fontSize: '7.5px', color: '#666', textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '5px' }}>
        ※ 이 문서는 입력하신 내용을 공식 PAS-1 양식 형식으로 한국어 번역하여 정리한 참고용입니다. 실제 제출 전에 공식 PAS-1 양식에 직접 옮겨 적거나 propertytaxrelief.nj.gov 에서 온라인으로 제출하세요.
      </div>
    </div>
  );
}