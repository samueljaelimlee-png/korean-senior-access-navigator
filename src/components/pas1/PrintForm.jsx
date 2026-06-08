import React from 'react';
import { getEligiblePrograms, incomeTotal, formatMoney, FILING_STATUS_OPTIONS } from '@/lib/pas1Data';

function Section({ title }) {
  return (
    <div style={{ background: '#e8eef5', padding: '6px 14px', borderLeft: '4px solid #1a3a6b', fontSize: '10px', fontWeight: 700, color: '#1a3a6b', letterSpacing: '.04em', marginTop: '6px' }}>
      {title}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 14px', borderBottom: '1px solid #f0f3f8', fontSize: '12px' }}>
      <span style={{ color: '#666', flex: 1 }}>{label}</span>
      <span style={{ fontWeight: 500, color: '#222' }}>{value || '—'}</span>
    </div>
  );
}

function MoneyRow({ ln, desc, val }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 14px', borderBottom: '1px solid #f0f3f8', fontSize: '12px' }}>
      <div>
        <span style={{ fontWeight: 700, color: '#1a3a6b', marginRight: '8px' }}>{ln}</span>
        <span style={{ color: '#555' }}>{desc}</span>
      </div>
      <span style={{ fontFamily: 'monospace', fontWeight: 500, color: val === '—' ? '#bbb' : '#222' }}>{val}</span>
    </div>
  );
}

export default function PrintForm({ data }) {
  const progs = getEligiblePrograms(data);
  const t24 = parseFloat(data.tax2024) || 0;
  const t25 = parseFloat(data.tax2025) || 0;
  const diff = t25 - t24;
  const inc24 = incomeTotal(data.inc?.[2024]);
  const inc25 = incomeTotal(data.inc?.[2025]);
  const age = data.birthYear ? 2025 - parseInt(data.birthYear) : null;
  const homeTypeMap = { own: 'Homeowner (주택 소유자)', mobile: 'Mobile Home Owner', rent: 'Renter (임차인)' };
  const fsLabel = FILING_STATUS_OPTIONS.find(o => o.value === data.filingStatus)?.label || data.filingStatus;

  const sigDateFormatted = data.sigDate 
    ? new Date(data.sigDate + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) 
    : '';

  return (
    <div className="print-only" style={{ fontFamily: "'Noto Sans KR', Helvetica Neue, Arial, sans-serif", maxWidth: '720px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '13px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}>State of New Jersey — 2025 Form PAS-1</div>
          <div style={{ color: '#a8c0e0', fontSize: '11px', marginTop: '2px' }}>Application for Property Tax Relief | Division of Taxation</div>
        </div>
        <div style={{ color: '#a8c0e0', fontSize: '10px', textAlign: 'right', lineHeight: 1.6 }}>
          APPLICANT COPY<br />참고용 본<br />Deadline: Nov 2, 2026
        </div>
      </div>

      {/* Programs */}
      <div style={{ background: '#e8eef5', padding: '8px 18px', borderLeft: '4px solid #1a3a6b', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: '#555', fontWeight: 500 }}>신청 가능 프로그램:</span>
        {progs.map(p => (
          <span key={p} style={{ display: 'inline-block', background: '#EAF3DE', color: '#27500A', border: '1px solid #3B6D11', fontSize: '11px', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
            {p}
          </span>
        ))}
      </div>

      <Section title="SECTION 1 — Applicant Information (신청인 기본 정보)" />
      <Row label="성명 (Name)" value={data.lname && data.fname ? `${data.lname}, ${data.fname}` : ''} />
      <Row label="SSN" value={data.ssnLast4 ? `XXX-XX-${data.ssnLast4}` : ''} />
      <Row label="생년도 / 나이" value={data.birthYear ? `${data.birthYear} (만 ${age}세)` : ''} />
      <Row label="주소 (Address)" value={data.address} />
      <Row label="Municipality Code" value={data.muniCode} />
      <Row label="전화번호" value={data.phone} />
      {data.hasSpouse && <Row label="배우자" value={`${data.spName} (${data.spBirthYear})`} />}

      <Section title="SECTION 2 — Filing Status" />
      <Row label="Line 1 — Filing Status" value={fsLabel} />
      <Row label="Line 3a — SSDI" value={data.ssdi ? 'Yes' : 'No'} />
      <Row label="Line 3b — Railroad Retirement Disability" value={data.rrd ? 'Yes' : 'No'} />

      <Section title="SECTION 3 — Residency (거주 정보)" />
      <Row label="Line 5 — Residency Type" value={homeTypeMap[data.homeType]} />
      <Row label="Line 6a — Same home entire 2025" value={data.same2025 ? 'Yes' : 'No'} />
      <Row label="Line 8 — Since Dec 31, 2022" value={data.since2022 ? 'Yes — Senior Freeze 거주 조건 충족' : 'No'} />
      {data.coOwn && data.coPct && <Row label="Line 11b — Co-ownership share" value={`${data.coPct}%`} />}

      <Section title="SECTION 4 — Property Tax (재산세)" />
      <Row label="Block / Lot" value={`Block ${data.block || '—'} / Lot ${data.lot || '—'}${data.qualifier ? ` / ${data.qualifier}` : ''}`} />
      <MoneyRow ln="Line 14" desc="2024 Property Tax billed" val={formatMoney(t24)} />
      <MoneyRow ln="Line 15" desc="2025 Property Tax billed" val={formatMoney(t25)} />
      {diff > 0 && (
        <div style={{ background: '#EAF3DE', padding: '7px 14px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#27500A' }}>
          <span>Senior Freeze 환급 예상액 (재산세 증가분)</span>
          <span>{formatMoney(diff)}</span>
        </div>
      )}

      <Section title="SECTION 5 — Income Worksheet (소득 정보)" />
      <div style={{ padding: '4px 14px', background: '#f8faff', fontSize: '11px', color: '#1a3a6b', fontWeight: 500 }}>Tax Year 2024</div>
      <MoneyRow ln="17a" desc="NJ Total Income" val={formatMoney(data.inc?.[2024]?.a)} />
      <MoneyRow ln="17e" desc="Social Security benefits" val={formatMoney(data.inc?.[2024]?.e)} />
      <div style={{ background: '#e8eef5', padding: '6px 14px', display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #1a3a6b' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#1a3a6b' }}>17f — Total 2024</span>
        <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'monospace', color: '#1a3a6b' }}>{formatMoney(inc24)}</span>
      </div>

      <div style={{ padding: '4px 14px', background: '#f8faff', fontSize: '11px', color: '#1a3a6b', fontWeight: 500, marginTop: '4px' }}>Tax Year 2025</div>
      <MoneyRow ln="18a" desc="NJ Total Income" val={formatMoney(data.inc?.[2025]?.a)} />
      <MoneyRow ln="18b" desc="Tax-exempt interest" val={formatMoney(data.inc?.[2025]?.b)} />
      <MoneyRow ln="18c" desc="Roth IRA rollovers" val={formatMoney(data.inc?.[2025]?.c)} />
      <MoneyRow ln="18d" desc="Disability pension" val={formatMoney(data.inc?.[2025]?.d)} />
      <MoneyRow ln="18e" desc="Social Security benefits" val={formatMoney(data.inc?.[2025]?.e)} />
      <div style={{ background: '#e8eef5', padding: '9px 14px', display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #1a3a6b' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a3a6b' }}>18f — Total 2025</span>
        <span style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'monospace', color: '#1a3a6b' }}>{formatMoney(inc25)}</span>
      </div>

      <Section title="SECTION 6 — Signature (서명)" />
      <div style={{ padding: '8px 14px', fontSize: '11px', color: '#6b4400', background: '#fff8e6', borderLeft: '3px solid #e0a800' }}>
        ⚠ 이 문서는 참고용입니다. 실제 서명은 공식 PAS-1 양식에 파란색/검정색 볼펜으로 직접 하세요.
      </div>
      <div style={{ padding: '18px 14px', display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '24px', alignItems: 'end' }}>
        <div>
          <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '18px', paddingBottom: '4px', borderBottom: '1.5px solid #333', minHeight: '30px' }}>
            {data.sigName}
          </div>
          <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Signature of Applicant (신청인 서명)</div>
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, paddingBottom: '4px', borderBottom: '1.5px solid #333', minHeight: '30px' }}>
            {sigDateFormatted}
          </div>
          <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Date (날짜)</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '2px solid #1a3a6b', padding: '9px 14px', background: '#e8eef5', fontSize: '10px', color: '#1a3a6b', lineHeight: 1.8 }}>
        <strong>Mail:</strong> NJ Division of Taxation, PO Box 635, Trenton, NJ 08646-0635 &nbsp;
        <strong>Online:</strong> propertytaxrelief.nj.gov &nbsp;
        <strong>Tel:</strong> 1-800-323-4400 &nbsp;
        <strong>Deadline:</strong> November 2, 2026
      </div>
    </div>
  );
}